import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.disable('x-powered-by');
app.use(cors({ origin: ['https://kstudio-light.com', 'https://www.kstudio-light.com'] }));
// Middleware: exige token de admin en rutas de escritura
const requireAdmin = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

// --- CRM: hash de contrasenas (scrypt nativo, sin dependencias nuevas) ---
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

// Sesiones activas del CRM (en memoria; se reinician si el servidor reinicia)
const crmSessions = new Set<string>();

// Middleware: exige una sesion valida de CRM
const requireCrm = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token || !crmSessions.has(token)) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

// Sembrar un usuario CRM inicial si la tabla esta vacia
const seedCrmUser = async () => {
  const existing = await pool.query('SELECT COUNT(*) FROM crm_users');
  if (parseInt(existing.rows[0].count, 10) > 0) return;
  const user = process.env.CRM_DEFAULT_USER || 'cliente';
  const pass = process.env.CRM_SEED_PASSWORD;
  if (!pass) {
    console.warn('CRM_SEED_PASSWORD no definido: no se pudo crear el usuario CRM inicial.');
    return;
  }
  await pool.query(
    'INSERT INTO crm_users (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
    [user, hashPassword(pass)]
  );
  console.log(`Usuario CRM inicial creado: ${user}`);
};

app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Init Database Table
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS content (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'image',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS crm_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name TEXT, email TEXT, phone TEXT,
        date TEXT, time TEXT, designer_id TEXT,
        project_type TEXT, notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT, phone TEXT, project_type TEXT,
        location TEXT, message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await seedCrmUser();
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};
initDb();

// --- API ROUTES ---

// 1. Get all content
app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value, type FROM content');
    const contentMap: Record<string, string> = {};
    result.rows.forEach(row => {
      contentMap[row.key] = row.value;
    });
    res.json(contentMap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// 2. Update content (text or existing image URL)
app.post('/api/content', requireAdmin, async (req, res) => {
  const { key, value, type } = req.body;
  if (!key || !value) return res.status(400).json({ error: 'Key and value required' });
  
  try {
    await pool.query(`
      INSERT INTO content (key, value, type) 
      VALUES ($1, $2, $3)
      ON CONFLICT (key) DO UPDATE 
      SET value = EXCLUDED.value, type = EXCLUDED.type, updated_at = CURRENT_TIMESTAMP
    `, [key, value, type || 'text']);
    res.json({ success: true, key, value });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// 3. Upload image
app.post('/api/upload', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  
  const { key } = req.body; // e.g., 'hero_bg'
  if (!key) {
    // If no key is provided, just return the URL so frontend can use it
    const imageUrl = `/uploads/${req.file.filename}`;
    return res.json({ success: true, url: imageUrl });
  }

  try {
    // If a key is provided, automatically update the content table
    const imageUrl = `/uploads/${req.file.filename}`;
    await pool.query(`
      INSERT INTO content (key, value, type) 
      VALUES ($1, $2, 'image')
      ON CONFLICT (key) DO UPDATE 
      SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
    `, [key, imageUrl]);
    
    res.json({ success: true, key, url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save image reference in database' });
  }
});


// --- CRM: autenticacion ---
app.post('/api/crm/login', async (req: any, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const r = await pool.query('SELECT password_hash FROM crm_users WHERE username = $1', [username]);
    if (r.rows.length === 0 || !verifyPassword(password, r.rows[0].password_hash)) {
      return res.status(401).json({ error: 'Usuario o contrasena incorrectos' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    crmSessions.add(token);
    res.json({ token });
  } catch (e) { res.status(500).json({ error: 'Error al iniciar sesion' }); }
});

app.post('/api/crm/change-password', requireCrm, async (req: any, res: any) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username || !currentPassword || !newPassword) return res.status(400).json({ error: 'Faltan datos' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'La nueva contrasena debe tener al menos 8 caracteres' });
  try {
    const r = await pool.query('SELECT password_hash FROM crm_users WHERE username = $1', [username]);
    if (r.rows.length === 0 || !verifyPassword(currentPassword, r.rows[0].password_hash)) {
      return res.status(401).json({ error: 'La contrasena actual no es correcta' });
    }
    await pool.query('UPDATE crm_users SET password_hash = $1 WHERE username = $2', [hashPassword(newPassword), username]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Error al cambiar la contrasena' }); }
});

// --- BOOKINGS (citas) ---
app.post('/api/bookings', async (req: any, res: any) => {
  const { name, email, phone, date, time, designerId, projectType, notes } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ error: 'Faltan datos' });
  try {
    await pool.query(
      `INSERT INTO bookings (name,email,phone,date,time,designer_id,project_type,notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [name, email, phone, date, time, designerId, projectType, notes]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'No se pudo guardar la cita' }); }
});

app.get('/api/bookings', requireCrm, async (_req: any, res: any) => {
  try {
    const r = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: 'Error al leer citas' }); }
});

app.delete('/api/bookings/:id', requireCrm, async (req: any, res: any) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Error al borrar' }); }
});

// --- INQUIRIES (consultas de contacto) ---
app.post('/api/inquiries', async (req: any, res: any) => {
  const { name, phone, projectType, location, message } = req.body;
  if (!name || !phone || !message) return res.status(400).json({ error: 'Faltan datos' });
  try {
    await pool.query(
      `INSERT INTO inquiries (name,phone,project_type,location,message)
       VALUES ($1,$2,$3,$4,$5)`,
      [name, phone, projectType, location, message]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'No se pudo guardar la consulta' }); }
});

app.get('/api/inquiries', requireCrm, async (_req: any, res: any) => {
  try {
    const r = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(r.rows);
  } catch (e) { res.status(500).json({ error: 'Error al leer consultas' }); }
});

app.delete('/api/inquiries/:id', requireCrm, async (req: any, res: any) => {
  try {
    await pool.query('DELETE FROM inquiries WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Error al borrar' }); }
});

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', '..', 'dist');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  
  // Catch-all route to serve React's index.html for unknown routes (React Router support)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

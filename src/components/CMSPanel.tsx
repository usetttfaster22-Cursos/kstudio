import React, { useState, useRef } from 'react';
import { useContent } from '../ContentContext';
import { Image, Upload, CheckCircle2, Loader2, Lock, KeyRound } from 'lucide-react';

const CMSPanel = () => {
  const { content, updateContent } = useContent();
  const [uploading, setUploading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // --- Puerta de acceso: token de administrador (solo en memoria) ---
  const [token, setToken] = useState<string>('');
  const [authed, setAuthed] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const handleEnter = () => {
    if (!tokenInput.trim()) return;
    setToken(tokenInput.trim());
    setAuthed(true);
    setAuthError(null);
    setTokenInput('');
  };

  const handleLogout = () => {
    setToken('');
    setAuthed(false);
    setAuthError(null);
  };

  const imageKeys = [
    { key: 'hero_bg', label: 'Fondo del Hero' },
    { key: 'nosotros_img', label: 'Imagen Nosotros' },
    { key: 'servicios_img_1', label: 'Servicio: Lighting Design' },
    { key: 'servicios_img_2', label: 'Servicio: Visualización' },
    { key: 'servicios_img_3', label: 'Servicio: Diseño Visual' },
    { key: 'contacto_img', label: 'Imagen Contacto' },
    { key: 'aliado_tensolight_logo', label: 'Aliado: Logo TENSOLIGHT' },
    { key: 'aliado_tensolight_estetica_img1', label: 'Aliado: Belleza Estética - Img 1' },
    { key: 'aliado_tensolight_estetica_img2', label: 'Aliado: Belleza Estética - Img 2' },
    { key: 'aliado_tensolight_diseno_img1', label: 'Aliado: Aporte al Diseño - Img 1' },
    { key: 'aliado_tensolight_diseno_img2', label: 'Aliado: Aporte al Diseño - Img 2' },
    { key: 'aliado_tensolight_tecnicos_img1', label: 'Aliado: Beneficios Técnicos - Img 1' },
    { key: 'aliado_tensolight_tecnicos_img2', label: 'Aliado: Beneficios Técnicos - Img 2' },
    { key: 'aliado_tensolight_materiales_img1', label: 'Aliado: Materiales Premium - Img 1' },
    { key: 'aliado_tensolight_materiales_img2', label: 'Aliado: Materiales Premium - Img 2' },
    { key: 'designer_dg4', label: 'Equipo: Mauricio Gil' },
    { key: 'designer_dg5', label: 'Equipo: Diego Eslava' },
    { key: 'designer_dg1', label: 'Equipo: Jean Carlos C.' },
    { key: 'designer_dg2', label: 'Equipo: Polaris Gálvez' },
    { key: 'designer_dg3', label: 'Equipo: Ana D. Edezma' },
  ];

  const handleFileClick = (key: string) => {
    setActiveKey(key);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeKey) return;

    setUploading(activeKey);
    setSuccess(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', activeKey);

    try {
      const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/upload' : '/api/upload';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          // El token NO va en el body; viaja en el header Authorization
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        // Token inválido o expirado: volver a la puerta de acceso
        setAuthError('Token inválido. Ingrésalo de nuevo.');
        handleLogout();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        updateContent(activeKey, data.url);
        setSuccess(activeKey);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        alert('Error subiendo la imagen (código ' + response.status + ')');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Error subiendo la imagen');
    } finally {
      setUploading(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // --- Pantalla de acceso: se muestra si aún no hay token válido en memoria ---
  if (!authed) {
    return (
      <div className="space-y-6">
        <div className="border-b border-outline-variant pb-2">
          <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider flex items-center gap-2">
            <Lock size={14} /> Acceso restringido
          </h4>
          <p className="text-xs text-on-surface-variant mt-1">
            Ingresa el token de administrador para gestionar las imágenes del sitio.
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleEnter(); }}
              placeholder="Token de administrador"
              className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface"
              autoFocus
            />
          </div>

          {authError && (
            <p className="text-xs text-red-600">{authError}</p>
          )}

          <button
            onClick={handleEnter}
            disabled={!tokenInput.trim()}
            className="w-full bg-primary text-on-primary px-3 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Entrar
          </button>

          <p className="text-[11px] text-outline leading-relaxed">
            Por seguridad, el token se guarda solo mientras esta ventana esté abierta.
            Si recargas la página, deberás ingresarlo de nuevo.
          </p>
        </div>
      </div>
    );
  }

  // --- Panel de gestión (visible solo tras ingresar el token) ---
  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant pb-2 flex items-start justify-between gap-2">
        <div>
          <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider">Gestión de Imágenes</h4>
          <p className="text-xs text-on-surface-variant mt-1">Sube nuevas imágenes para sustituir las existentes en la página.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[11px] text-outline hover:text-on-surface underline shrink-0 mt-1"
          title="Cerrar acceso de administrador"
        >
          Salir
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="space-y-4">
        {imageKeys.map(({ key, label }) => (
          <div key={key} className="p-3 bg-surface border border-outline-variant flex flex-col gap-3 group hover:border-primary transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-on-surface flex items-center gap-2">
                <Image size={14} className="text-primary" />
                {label}
              </span>
              <button
                onClick={() => handleFileClick(key)}
                disabled={uploading === key}
                className="text-xs bg-primary text-on-primary px-3 py-1.5 flex items-center gap-1 hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {uploading === key ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : success === key ? (
                  <CheckCircle2 size={12} className="text-green-300" />
                ) : (
                  <Upload size={12} />
                )}
                {uploading === key ? 'Subiendo...' : success === key ? 'Listo' : 'Cambiar'}
              </button>
            </div>
            {/* Preview */}
            <div className="h-24 w-full bg-surface-variant overflow-hidden">
              <img
                src={content[key]}
                alt={label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSPanel;

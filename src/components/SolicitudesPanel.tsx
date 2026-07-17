import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Calendar, User, Phone, Mail, Trash2, ShieldCheck, MapPin, Briefcase,
  Database, LayoutTemplate, Lock, KeyRound, LogOut, Loader2,
} from 'lucide-react';
import { Designer } from '../types';
import CMSPanel from './CMSPanel';

interface BookingRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  designer_id: string;
  project_type: string;
  notes: string;
  created_at: string;
}

interface InquiryRow {
  id: number;
  name: string;
  phone: string;
  project_type: string;
  location: string;
  message: string;
  created_at: string;
}

interface SolicitudesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  designers: Designer[];
}

export default function SolicitudesPanel({ isOpen, onClose, designers }: SolicitudesPanelProps) {
  const [activeTab, setActiveTab] = useState<'crm' | 'cms'>('crm');

  const [token, setToken] = useState<string>('');
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [showChangePass, setShowChangePass] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [changeMsg, setChangeMsg] = useState<string | null>(null);

  const getDesignerName = (id: string) => designers.find((d) => d.id === id)?.name || 'Especialista General';

  const handleLogin = async () => {
    if (!loginUser.trim() || !loginPass.trim()) return;
    setLoggingIn(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser.trim(), password: loginPass }),
      });
      if (!res.ok) {
        setAuthError('Usuario o contraseña incorrectos.');
        setLoggingIn(false);
        return;
      }
      const data = await res.json();
      setToken(data.token);
      setUsername(loginUser.trim());
      setAuthed(true);
      setLoginPass('');
    } catch {
      setAuthError('No se pudo conectar. Intenta de nuevo.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setAuthed(false);
    setBookings([]);
    setInquiries([]);
    setShowChangePass(false);
  };

  const loadData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [bRes, iRes] = await Promise.all([
        fetch('/api/bookings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (bRes.status === 401 || iRes.status === 401) {
        handleLogout();
        return;
      }
      setBookings(await bRes.json());
      setInquiries(await iRes.json());
    } catch (err) {
      console.error('Error cargando datos del CRM', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (authed && activeTab === 'crm') loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, activeTab]);

  const handleDeleteBooking = async (id: number) => {
    await fetch(`/api/bookings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDeleteInquiry = async (id: number) => {
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const handleChangePassword = async () => {
    setChangeMsg(null);
    if (!currentPass || !newPass) return;
    if (newPass.length < 8) {
      setChangeMsg('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    try {
      const res = await fetch('/api/crm/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username, currentPassword: currentPass, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setChangeMsg(data.error || 'No se pudo cambiar la contraseña.');
        return;
      }
      setChangeMsg('Contraseña actualizada correctamente.');
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setShowChangePass(false), 1500);
    } catch {
      setChangeMsg('No se pudo conectar. Intenta de nuevo.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-screen max-w-md"
            >
              <div className="h-full flex flex-col bg-white shadow-2xl border-l border-outline-variant">
                <div className="p-6 bg-surface border-b border-outline-variant flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="text-primary" size={20} />
                      <h3 className="font-display text-headline-sm text-on-surface">Panel de Administración</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:text-primary text-outline transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex space-x-2 border-b border-outline-variant">
                    <button
                      onClick={() => setActiveTab('crm')}
                      className={`px-4 py-2 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'crm' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'}`}
                    >
                      <Database size={14} /> Solicitudes CRM
                    </button>
                    <button
                      onClick={() => setActiveTab('cms')}
                      className={`px-4 py-2 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'cms' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'}`}
                    >
                      <LayoutTemplate size={14} /> Gestor de Contenidos
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {activeTab === 'crm' ? (
                    !authed ? (
                      <div className="space-y-6">
                        <div className="border-b border-outline-variant pb-2">
                          <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider flex items-center gap-2">
                            <Lock size={14} /> Acceso al CRM
                          </h4>
                          <p className="text-xs text-on-surface-variant mt-1">
                            Ingresa tu usuario y contraseña para ver las citas y consultas.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                            <input
                              type="text"
                              value={loginUser}
                              onChange={(e) => setLoginUser(e.target.value)}
                              placeholder="Usuario"
                              className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface"
                            />
                          </div>
                          <div className="relative">
                            <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                            <input
                              type="password"
                              value={loginPass}
                              onChange={(e) => setLoginPass(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                              placeholder="Contraseña"
                              className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface"
                            />
                          </div>
                          {authError && <p className="text-xs text-red-600">{authError}</p>}
                          <button
                            onClick={handleLogin}
                            disabled={loggingIn || !loginUser.trim() || !loginPass.trim()}
                            className="w-full bg-primary text-on-primary px-3 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {loggingIn ? <Loader2 size={14} className="animate-spin" /> : null}
                            Entrar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                          <span className="text-xs text-on-surface-variant">
                            Sesión: <strong className="text-on-surface">{username}</strong>
                          </span>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setShowChangePass((v) => !v)}
                              className="text-[11px] text-outline hover:text-on-surface underline"
                            >
                              Cambiar contraseña
                            </button>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-1 text-[11px] text-outline hover:text-error"
                            >
                              <LogOut size={12} /> Salir
                            </button>
                          </div>
                        </div>

                        {showChangePass && (
                          <div className="space-y-3 bg-surface border border-outline-variant p-4">
                            <input
                              type="password"
                              value={currentPass}
                              onChange={(e) => setCurrentPass(e.target.value)}
                              placeholder="Contraseña actual"
                              className="w-full px-3 py-2 text-sm bg-white border border-outline-variant focus:border-primary outline-none"
                            />
                            <input
                              type="password"
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              placeholder="Nueva contraseña (mín. 8 caracteres)"
                              className="w-full px-3 py-2 text-sm bg-white border border-outline-variant focus:border-primary outline-none"
                            />
                            {changeMsg && <p className="text-xs text-on-surface-variant">{changeMsg}</p>}
                            <button
                              onClick={handleChangePassword}
                              className="w-full bg-primary text-on-primary px-3 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
                            >
                              Actualizar contraseña
                            </button>
                          </div>
                        )}

                        {loadingData ? (
                          <div className="flex justify-center py-10 text-outline">
                            <Loader2 size={20} className="animate-spin" />
                          </div>
                        ) : (
                          <>
                            <div className="space-y-4">
                              <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider">
                                Citas de Asesoría ({bookings.length})
                              </h4>
                              {bookings.length === 0 ? (
                                <p className="text-xs text-on-surface-variant italic py-2">No hay citas agendadas aún.</p>
                              ) : (
                                <div className="space-y-3">
                                  {bookings.map((b) => (
                                    <div key={b.id} className="p-4 bg-background border border-outline-variant relative group space-y-2">
                                      <button
                                        onClick={() => handleDeleteBooking(b.id)}
                                        className="absolute top-3 right-3 text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div className="flex items-center space-x-2">
                                        <Calendar size={14} className="text-primary" />
                                        <span className="text-xs font-semibold text-on-surface">{b.date} a las {b.time}</span>
                                      </div>
                                      <div className="space-y-1 text-xs text-on-surface-variant">
                                        <div className="flex items-center space-x-2"><User size={12} /><span className="font-medium text-on-surface">{b.name}</span></div>
                                        <div className="flex items-center space-x-2"><Mail size={12} /><span>{b.email}</span></div>
                                        <div className="flex items-center space-x-2"><Phone size={12} /><span>{b.phone}</span></div>
                                        <div className="flex items-center space-x-2 pt-1">
                                          <Briefcase size={12} className="text-secondary" />
                                          <span className="text-secondary font-medium">{b.project_type} — {getDesignerName(b.designer_id)}</span>
                                        </div>
                                      </div>
                                      {b.notes && (
                                        <div className="text-[11px] bg-white p-2 border-l border-primary/30 text-on-surface-variant">
                                          <strong>Nota:</strong> {b.notes}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-4 border-t border-outline-variant/30 pt-8">
                              <h4 className="font-display font-semibold text-sm text-primary uppercase tracking-wider">
                                Consultas de Contacto ({inquiries.length})
                              </h4>
                              {inquiries.length === 0 ? (
                                <p className="text-xs text-on-surface-variant italic py-2">No hay consultas aún.</p>
                              ) : (
                                <div className="space-y-3">
                                  {inquiries.map((i) => (
                                    <div key={i.id} className="p-4 bg-background border border-outline-variant relative group space-y-2">
                                      <button
                                        onClick={() => handleDeleteInquiry(i.id)}
                                        className="absolute top-3 right-3 text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div className="flex items-center space-x-2">
                                        <User size={14} className="text-primary" />
                                        <span className="text-xs font-semibold text-on-surface">{i.name}</span>
                                      </div>
                                      <div className="space-y-1 text-xs text-on-surface-variant">
                                        <div className="flex items-center space-x-2"><Phone size={12} /><span>{i.phone}</span></div>
                                        <div className="flex items-center space-x-2"><MapPin size={12} /><span>{i.location}</span></div>
                                        <div className="flex items-center space-x-2"><Briefcase size={12} className="text-secondary" /><span className="text-secondary font-medium">{i.project_type}</span></div>
                                      </div>
                                      <div className="text-[11px] bg-white p-2 border-l border-primary/30 text-on-surface-variant">
                                        {i.message}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <CMSPanel />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

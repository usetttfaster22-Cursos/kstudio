import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { Booking, Designer } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  designers: Designer[];
  onSuccess: (booking: Booking) => void;
}

export default function BookingModal({ isOpen, onClose, designers, onSuccess }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [designerId, setDesignerId] = useState('');
  const [projectType, setProjectType] = useState('Residencial');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time || !designerId) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }
    setError('');

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      date,
      time,
      designerId,
      projectType,
      notes,
    };

    // Save to local storage
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date, time, designerId, projectType, notes }),
      });
    } catch (err) {
      console.error('No se pudo enviar la cita', err);
    }

    setIsSuccess(true);
    onSuccess(newBooking);

    // Reset fields after some time or immediate
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTime('');
      setDesignerId('');
      setProjectType('Residencial');
      setNotes('');
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg p-8 rounded-none border border-outline-variant shadow-2xl z-10 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-2"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {!isSuccess ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-primary font-semibold block">K° STUDIO</span>
                  <h3 className="font-display text-headline-md text-on-surface">Agendar Consulta de Iluminación</h3>
                  <p className="font-sans text-sm text-on-surface-variant">
                    Seleccione la fecha, hora y el especialista para diseñar la iluminación ideal para su espacio.
                  </p>
                </div>

                {error && (
                  <div className="bg-error-container text-on-error-container p-3 text-sm font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Nombre Completo *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ej. Carlos Mendoza"
                        className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Correo Electrónico *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="carlos@example.com"
                          className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Teléfono *</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+507 6000-0000"
                          className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Fecha Deseada *</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Hora Deseada *</label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <select
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors"
                        >
                          <option value="">Seleccione hora...</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:30">10:30 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="14:30">02:30 PM</option>
                          <option value="16:00">04:00 PM</option>
                          <option value="17:30">05:30 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Designer & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Especialista *</label>
                      <select
                        required
                        value={designerId}
                        onChange={(e) => setDesignerId(e.target.value)}
                        className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none px-3 py-2 text-sm transition-colors"
                      >
                        <option value="">Elegir Diseñador...</option>
                        {designers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.role})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Tipo de Proyecto</label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none px-3 py-2 text-sm transition-colors"
                      >
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Hotelería">Hotelería</option>
                        <option value="Oficinas">Oficinas</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-medium tracking-wider text-on-surface-variant block">Notas Adicionales</label>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3 top-3 text-outline" />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describa brevemente su espacio o requerimientos"
                        rows={3}
                        className="w-full bg-pearl-grey/20 border border-outline-variant focus:border-primary focus:outline-none pl-10 pr-4 py-2 text-sm transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-3 px-6 hover:shadow-[0_0_20px_rgba(115,92,0,0.3)] transition-all uppercase tracking-widest font-sans font-semibold text-xs mt-4"
                  >
                    Agendar Cita de Asesoría
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
              >
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle2 size={40} className="stroke-primary" />
                </div>
                <h3 className="font-display text-headline-sm text-on-surface">¡Cita Agendada con Éxito!</h3>
                <p className="font-sans text-sm text-on-surface-variant max-w-xs">
                  Su solicitud ha sido registrada. Nos pondremos en contacto para confirmar los detalles de la reunión.
                </p>
                <span className="font-mono text-xs text-primary bg-primary-container/10 px-3 py-1 mt-4">
                  K° STUDIO | Circadian Wellness
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

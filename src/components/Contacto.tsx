import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, CheckSquare, Instagram, ExternalLink, Send } from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactoProps {
  onSuccessInquiry: (inquiry: ContactInquiry) => void;
}

export default function Contacto({ onSuccessInquiry }: ContactoProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Residencial');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setToastMsg('Por favor complete su Nombre, Teléfono y Mensaje.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newInquiry: ContactInquiry = {
      id: crypto.randomUUID(),
      name,
      phone,
      projectType,
      location,
      message,
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to local storage
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, projectType, location, message }),
      });
    } catch (err) {
      console.error('No se pudo enviar la consulta', err);
    }

    onSuccessInquiry(newInquiry);

    // Reset Form
    setName('');
    setPhone('');
    setProjectType('Residencial');
    setLocation('');
    setMessage('');

    setToastMsg('¡Solicitud enviada! Nos comunicaremos a la brevedad.');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const instagramPosts = [
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9rrrYvxvbI6sbFfvgbQGo_alkncyeyemqginTU4VdCJGIEhpXVdVq4OHG0mMab1Hks6-nKS0Evmmr5xwSswvbzsrrAMAZ9AY0GiquPMGGy7xGE9z4IRyKQRSjgT6yGNSGGJNHFFMS04RplQBzyICBYvmlXW005ab8ayQrwkAV8s0IU1_hvSgjiS2Pv0cw1LEAfKEVYaf58zwUtGYTjIntqFnvpsHlBG3o4e9yZTyhLlTZlFWsw_kX7AOWEiZoNOdi4Dry2M4yZtM',
      alt: 'Warm amber-lit library with custom integrated bookcase illumination'
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZX3FhxWbA3JO4pHkHVV2HNp6xMDsU_mHiDz_fL-6r_yPgKNyGtqpbSS6D6Enz8C_v6bFZ7yQghSk9boC-PK72Dy8wUu3x0qjBrB45i3lL-WW7M93haEZzM_cK0skWe3wOdq8mhKASNBM-a0d7RDCdeeYaPSmV6NGa7D8Tki4JtJlNYYBsoq73QvinV6aXBDEn52wpnOB9ZzyPwAi4ThweyCRfB9MftEBfUkXYL7JzxjHSYTj4wssbHjmdaQFv-C0Gv0vntbyscg',
      alt: 'Abstract copper lighting fixture detail'
    },
    {
      id: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOiYwIwZwywnkqDnlyZ55EVlPvChVbbVGTiCrnv97pDLf-l8ziEVsaA7SLlNCol4dIjd60WH-op9zpRNCJZK9D1MK1po2aALSOPt5tsDJCMNEATsdZnHLSvzyWFmxMfs-CeEShSyOZAC64AGrg9L-Rwq39tUqRhqiljkc4rXnMa4M-A4YI2CQ2nSXTgs6b-mshEYngZLwQu0ztCAsY0cySBaYohFGbofp_9JjJDWMQuyVcu38lg7L5t-2zaqRoJXrhdpqNnsMBNwI',
      alt: 'Luxury corporate office lobby showing high CRI tunable white system'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-background relative" id="contacto">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-white px-6 py-4 shadow-2xl flex items-center gap-3 border border-outline-variant/30"
          >
            <CheckSquare size={18} className="text-primary-container" />
            <span className="font-sans text-xs uppercase tracking-widest font-bold">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Form Column */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
                Iniciemos su proyecto
              </h2>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Estamos listos para asesorarle en la creación de espacios saludables, eficientes y estéticamente superiores.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2 border-b border-outline-variant/60 focus-within:border-primary transition-colors pb-1">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Su nombre completo"
                    className="w-full bg-transparent outline-none py-2 font-sans text-sm text-on-surface"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2 border-b border-outline-variant/60 focus-within:border-primary transition-colors pb-1">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+507 6900-0000"
                    className="w-full bg-transparent outline-none py-2 font-sans text-sm text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Project Type */}
                <div className="space-y-2 border-b border-outline-variant/60 focus-within:border-primary transition-colors pb-1">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                    Tipo de Proyecto
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-transparent outline-none py-2 font-sans text-sm text-on-surface cursor-pointer"
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Hotelería">Hotelería</option>
                    <option value="Oficinas">Oficinas</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2 border-b border-outline-variant/60 focus-within:border-primary transition-colors pb-1">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="ej. Ciudad de Panamá"
                    className="w-full bg-transparent outline-none py-2 font-sans text-sm text-on-surface"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 border-b border-outline-variant/60 focus-within:border-primary transition-colors pb-1">
                <label className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                  Mensaje
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describa brevemente las particularidades de su espacio"
                  rows={4}
                  className="w-full bg-transparent outline-none py-2 font-sans text-sm text-on-surface resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-on-primary px-12 py-4 font-sans text-xs uppercase tracking-widest font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Enviar Solicitud
              </button>
            </form>
          </div>

          {/* Social Details / Instagram Column */}
          <div className="space-y-12">
            {/* Instagram Mockup */}
            <div className="bg-pearl-grey p-8 border border-outline-variant/45">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-on-surface">
                    Síguenos en Instagram
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant">
                    @k_studio_lighting
                  </p>
                </div>
                <Instagram size={20} className="text-primary" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {instagramPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square bg-white border border-outline-variant/30 overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      alt={post.alt}
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink size={14} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-pearl-grey text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold text-on-surface mb-1">
                    Oficina Central
                  </p>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Panamá, Ciudad de Panamá. Calle 50, Edificio Global Plaza.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-pearl-grey text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold text-on-surface mb-1">
                    Teléfono
                  </p>
                  <a
                    href="tel:+50769583287"
                    className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    +507 6958-3287
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

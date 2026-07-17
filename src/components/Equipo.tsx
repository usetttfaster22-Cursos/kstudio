import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Mail, Check } from 'lucide-react';
import { Designer } from '../types';

interface EquipoProps {
  designers: Designer[];
}

export default function Equipo({ designers }: EquipoProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (designer: Designer) => {
    const text = `${designer.name} - ${designer.role} en K° STUDIO (Neuroiluminación y Arquitectura). Contacto: ${designer.email}`;
    navigator.clipboard.writeText(text);
    setCopiedId(designer.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Separate Co-Directors from the rest of the team
  const directors = designers.filter(d => d.role.toLowerCase().includes('co-director'));
  const team = designers.filter(d => !d.role.toLowerCase().includes('co-director'));

  const renderDesignerCard = (designer: Designer) => (
    <div
      key={designer.id}
      className="flex flex-col items-center group text-center w-full sm:w-[320px] shrink-0"
    >
      {/* Profile Image with architectural offset background rectangle */}
      <div className="relative mb-10 w-48 h-60">
        {/* Decorative offset card */}
        <div className="absolute top-3.5 left-3.5 w-48 h-60 bg-[#c7c6c4]/40 -z-10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
        
        {/* Main image border wrapper */}
        <div className="w-48 h-60 bg-pearl-grey relative overflow-hidden border border-outline-variant/60 shadow-md">
          <img
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
            alt={`Retrato profesional de ${designer.name}`}
            src={designer.image}
          />
        </div>
      </div>

      {/* Bio Details */}
      <div className="space-y-4 flex-1 flex flex-col items-center w-full px-2">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold text-on-surface tracking-tight uppercase">
            {designer.name}
          </h3>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-on-surface-variant font-bold leading-normal min-h-[32px] flex items-center justify-center">
            {designer.role}
          </p>
        </div>

        <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-sm font-light uppercase tracking-wider text-[#666] dark:text-[#888]">
          {designer.bio}
        </p>

        {/* Interactive Sharing Actions */}
        <div className="flex gap-5 justify-center pt-3 mt-auto">
          <button
            onClick={() => handleShare(designer)}
            className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest font-semibold text-outline hover:text-primary transition-colors p-1"
            title="Copiar datos de perfil"
          >
            {copiedId === designer.id ? (
              <>
                <Check size={13} className="text-primary" />
                <span className="text-primary font-bold">Copiado</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span>Compartir</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${designer.email}`}
            className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest font-semibold text-outline hover:text-primary transition-colors p-1"
            title={`Contactar a ${designer.name}`}
          >
            <Mail size={13} />
            <span>Mensaje</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 sm:py-32 bg-white" id="equipo">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        <div className="mb-24 text-center sm:text-left">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary font-bold block mb-3 pl-1">
            Liderazgo
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Nuestro Equipo
          </h2>
        </div>

        {/* Seccion 1: Co-Directores */}
        {directors.length > 0 && (
          <div className="mb-24">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#888] font-bold block mb-12 text-center sm:text-left pl-1">
              Dirección General
            </span>
            <div className="flex flex-wrap justify-center gap-y-20 gap-x-8 lg:gap-x-16">
              {directors.map(renderDesignerCard)}
            </div>
          </div>
        )}

        {/* Seccion 2: Equipo de Diseño y Especialistas */}
        {team.length > 0 && (
          <div className="border-t border-outline-variant/30 pt-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#888] font-bold block mb-12 text-center sm:text-left pl-1">
              Diseñadores & Especialistas
            </span>
            <div className="flex flex-wrap justify-center gap-y-20 gap-x-8 lg:gap-x-16">
              {team.map(renderDesignerCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

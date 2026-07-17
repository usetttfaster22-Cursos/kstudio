import React from 'react';
import { ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const aliadosEstrategicos = [
    { name: 'Cromatica', desc: 'Diseño y Construcción' },
    { name: '11 tuESPACIO', desc: '' },
    { name: 'GEOMETRIC', desc: 'STUDIO' }
  ];

  const marcasRepresentadas = [
    { name: 'arquitelas', desc: 'telas para arquitectura' },
    { name: 'GENERAL LIGHTING', desc: 'General Lighting Electronic Co.,Ltd.' },
    { name: 'REEONGE', desc: 'Quality that delivers' },
    { name: 'EMITEVER', desc: '' }
  ];

  return (
    <footer className="bg-pearl-grey border-t border-outline-variant/60">
      {/* Brands & Alliances Banner */}
      <div className="py-20 border-b border-outline-variant/45 bg-surface-bright">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 space-y-16">
          
          {/* Aliados Estratégicos */}
          <div className="space-y-10">
            <p className="text-center font-sans text-sm uppercase tracking-widest font-bold text-on-surface-variant">
              Aliados Estratégicos
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
              {aliadosEstrategicos.map((aliado) => (
                <div key={aliado.name} className="flex flex-col items-center justify-center text-center">
                  <span className="font-display text-2xl font-bold tracking-widest text-on-surface uppercase">
                    {aliado.name}
                  </span>
                  {aliado.desc && (
                    <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">
                      {aliado.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-24 h-px bg-outline-variant/60 mx-auto" />

          {/* Marcas Representadas */}
          <div className="space-y-10">
            <p className="text-center font-sans text-sm uppercase tracking-widest font-bold text-on-surface-variant">
              Marcas Representadas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
              {marcasRepresentadas.map((marca) => (
                <div key={marca.name} className="flex flex-col items-center justify-center text-center">
                  <span className="font-display text-xl font-bold tracking-wider text-on-surface uppercase">
                    {marca.name}
                  </span>
                  {marca.desc && (
                    <span className="font-sans text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">
                      {marca.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 py-16 max-w-[1280px] mx-auto w-full gap-8">
        <div className="text-center md:text-left space-y-4">
          <Logo variant="navbar" height={42} />
          <p className="font-sans text-xs text-on-surface-variant">
            © {new Date().getFullYear()} K° STUDIO. Neuroiluminación y Arquitectura.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 items-center">
          <a
            href="#"
            className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Términos
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
          >
            Instagram
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}

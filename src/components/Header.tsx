import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  activeMethodologyStep: string;
  onSelectMethodologyStep: (stepNumber: string) => void;
}

export default function Header({ 
  onOpenBooking, 
  onOpenAdmin,
  activeMethodologyStep,
  onSelectMethodologyStep
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Metodología', href: '#metodologia' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const methodologySteps = [
    { number: '01', name: 'Análisis' },
    { number: '02', name: 'Conceptualización' },
    { number: '03', name: 'Desarrollo Técnico' },
    { number: '04', name: 'Implementación' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-outline-variant py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="flex justify-between items-center px-6 sm:px-12 max-w-[1280px] mx-auto w-full">
          {/* Logo */}
          <a
            href="#"
            className="transition-opacity hover:opacity-90 flex items-center"
          >
            <Logo variant="navbar" height={42} />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              if (link.name === 'Metodología') {
                return (
                  <div key={link.name} className="relative group/menu py-2">
                    <a
                      href={link.href}
                      className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors hover:opacity-85 flex items-center gap-1.5"
                    >
                      {link.name}
                      <svg 
                        className="w-2.5 h-2.5 transition-transform duration-300 group-hover/menu:rotate-180 text-on-surface-variant/70" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform scale-95 group-hover/menu:scale-100 pointer-events-none group-hover/menu:pointer-events-auto z-50">
                      <div className="bg-white border border-outline-variant/60 shadow-xl py-3 px-1 rounded-xs">
                        {methodologySteps.map((step) => (
                          <button
                            key={step.number}
                            onClick={() => {
                              onSelectMethodologyStep(step.number);
                              const el = document.getElementById('metodologia');
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={`w-full text-left font-sans text-[11px] uppercase tracking-widest font-bold py-2.5 px-4 transition-all duration-200 flex items-center gap-3 rounded-xs ${
                              activeMethodologyStep === step.number
                                ? 'bg-primary/5 text-primary'
                                : 'text-on-surface-variant hover:bg-pearl-grey/40 hover:text-primary'
                            }`}
                          >
                            <span className="font-mono text-[9px] text-outline">{step.number}</span>
                            <span>{step.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary transition-colors hover:opacity-85"
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={onOpenBooking}
              className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Agendar Cita
            </button>

            {/* Micro Admin link for client preview/interactivity */}
            <button
              onClick={onOpenAdmin}
              className="text-outline hover:text-primary transition-colors font-sans text-[10px] uppercase tracking-widest font-semibold border border-outline-variant/50 px-2 py-1"
              title="Ver Solicitudes de Clientes"
            >
              Citas
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-on-surface p-2 transition-colors hover:text-primary"
            aria-label="Alternar menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-outline-variant absolute top-full left-0 right-0 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col py-6 px-8 space-y-4">
                {navLinks.map((link) => {
                  if (link.name === 'Metodología') {
                    return (
                      <div key={link.name} className="flex flex-col space-y-1">
                        <span className="font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-2">
                          {link.name}
                        </span>
                        {/* Nested Submenu */}
                        <div className="pl-4 border-l border-outline-variant/50 ml-1 flex flex-col space-y-1">
                          {methodologySteps.map((step) => (
                            <button
                              key={step.number}
                              onClick={() => {
                                setIsOpen(false);
                                onSelectMethodologyStep(step.number);
                                const el = document.getElementById('metodologia');
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className={`text-left font-sans text-xs uppercase tracking-widest py-2 px-3 flex items-center gap-2.5 rounded transition-colors ${
                                activeMethodologyStep === step.number
                                  ? 'bg-primary/5 text-primary font-bold'
                                  : 'text-on-surface-variant hover:text-primary'
                              }`}
                            >
                              <span className="font-mono text-[10px] text-outline/70">{step.number}</span>
                              <span>{step.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant hover:text-primary py-2 transition-colors"
                    >
                      {link.name}
                    </a>
                  );
                })}

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full bg-primary-container text-on-primary-container py-3 rounded-full font-sans text-xs uppercase tracking-widest font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calendar size={14} />
                    Agendar Cita
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full border border-outline-variant text-on-surface-variant py-2.5 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-pearl-grey/25 transition-colors"
                  >
                    Ver Citas Agendadas
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

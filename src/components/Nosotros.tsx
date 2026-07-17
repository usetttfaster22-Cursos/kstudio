import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Users, Lightbulb, Brain, Leaf, Heart, Shield, Sun, Moon, Clock } from 'lucide-react';
import { ValueItem } from '../types';
import Logo from './Logo';
import { useContent } from '../ContentContext';

export default function Nosotros() {
  const { content } = useContent();
  // Circadian state for the interactive simulator
  const [circadianTime, setCircadianTime] = useState(12); // hours: 6 to 22

  const values: ValueItem[] = [
    { name: 'Calidad', description: 'Búsqueda incansable de la perfección técnica y estética en cada detalle lumínico.', iconName: 'Award' },
    { name: 'Equipo', description: 'Sinergia entre arquitectos, ingenieros y diseñadores para un enfoque integral.', iconName: 'Users' },
    { name: 'Innovación', description: 'Investigación constante en tecnologías y neurociencia del bienestar.', iconName: 'Lightbulb' },
    { name: 'Ética', description: 'Compromiso profesional, transparencia y respeto por las normas biológicas.', iconName: 'Brain' },
    { name: 'Ambiente', description: 'Sistemas eficientes de bajo consumo y mínimo impacto ambiental.', iconName: 'Leaf' },
    { name: 'Empatía', description: 'Diseño centrado exclusivamente en el bienestar de los ocupantes.', iconName: 'Heart' },
    { name: 'Integridad', description: 'Relaciones sólidas y honestas con clientes, proveedores y colaboradores.', iconName: 'Shield' },
  ];

  // Helper to map icon name to Lucide Component
  const renderValueIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="text-primary" size={28} />;
      case 'Users': return <Users className="text-primary" size={28} />;
      case 'Lightbulb': return <Lightbulb className="text-primary" size={28} />;
      case 'Brain': return <Brain className="text-primary" size={28} />;
      case 'Leaf': return <Leaf className="text-primary" size={28} />;
      case 'Heart': return <Heart className="text-primary" size={28} />;
      case 'Shield': return <Shield className="text-primary" size={28} />;
      default: return <Lightbulb className="text-primary" size={28} />;
    }
  };

  // Get circadian parameters based on slider hour
  const getCircadianData = (hour: number) => {
    if (hour >= 6 && hour < 10) {
      return {
        label: 'Amanecer / Mañana',
        temp: '3200 K° - 4500 K°',
        biological: 'Incremento de Cortisol, inhibición de Melatonina. Despertar natural y aumento de energía.',
        color: 'from-amber-100 to-amber-200/50',
        textColor: 'text-amber-800',
        icon: <Sun size={24} className="text-amber-500 animate-spin-slow" />,
        desc: 'La luz cálida-neutra con componente azul moderado estimula el despertar fisiológico gradual.',
        previewStyle: { background: 'rgba(253, 224, 71, 0.15)', boxShadow: 'inset 0 0 50px rgba(253, 186, 116, 0.4)' }
      };
    } else if (hour >= 10 && hour < 15) {
      return {
        label: 'Mediodía / Enfoque',
        temp: '5500 K° - 6500 K°',
        biological: 'Máximo nivel de Cortisol. Alta concentración, agudeza visual y estimulación cognitiva.',
        color: 'from-sky-100 to-sky-200/30',
        textColor: 'text-sky-800',
        icon: <Sun size={24} className="text-amber-400" />,
        desc: 'Luz blanca fría de alta intensidad que imita el cielo despejado. Ideal para entornos de alta productividad.',
        previewStyle: { background: 'rgba(224, 242, 254, 0.25)', boxShadow: 'inset 0 0 50px rgba(186, 230, 253, 0.5)' }
      };
    } else if (hour >= 15 && hour < 19) {
      return {
        label: 'Atardecer / Transición',
        temp: '3000 K° - 2700 K°',
        biological: 'Disminución de Cortisol. Preparación del cuerpo para el reposo nocturno.',
        color: 'from-orange-100 to-orange-200/40',
        textColor: 'text-orange-800',
        icon: <Sun size={24} className="text-orange-500" />,
        desc: 'Luz cálida y suave. Los tonos ámbar reducen la fatiga ocular y favorecen la relajación mental.',
        previewStyle: { background: 'rgba(254, 215, 170, 0.2)', boxShadow: 'inset 0 0 50px rgba(251, 146, 60, 0.3)' }
      };
    } else {
      return {
        label: 'Noche / Descanso (Fase Melatonina)',
        temp: '2200 K° - 1800 K°',
        biological: 'Secreción activa de Melatodina (Hormona del Sueño). Regeneración celular profunda.',
        color: 'from-indigo-950/20 to-indigo-900/10',
        textColor: 'text-night-accent',
        icon: <Moon size={24} className="text-indigo-400" />,
        desc: 'Luz ámbar ultra cálida indirecta. Cero emisiones de luz azul para asegurar la calidad del ciclo de sueño.',
        previewStyle: { background: 'rgba(49, 46, 129, 0.08)', boxShadow: 'inset 0 0 50px rgba(30, 27, 75, 0.2)' }
      };
    }
  };

  const circadian = getCircadianData(circadianTime);

  return (
    <section className="py-24 sm:py-32 bg-white" id="nosotros">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 sm:mb-32">
          <div className="space-y-6">
            <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold block">Filosofía</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
              Human Centric Lighting (HCL)
            </h2>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              En K° STUDIO, entendemos que la luz no es solo funcional; es biológica. Nuestro enfoque se basa en cómo la iluminación afecta el ritmo circadiano, el estado de ánimo y la salud cognitiva.
            </p>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Diseñamos entornos que respiran, adaptándose a las necesidades naturales del ser humano, creando armonía entre la arquitectura y quienes la habitan.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square bg-pearl-grey overflow-hidden relative border border-outline-variant/60 shadow-lg">
              <img
                className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                alt="Reflejo del iris humano con luz arquitectónica"
                src={content.nosotros_img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCLLrSaXW-ISN_bLHbIi8-bj4V9chdROBNlgOwqZ0IvHe5a9qgYMxAkOeN1PUPf7uP7g44sv7uf0yBClDm2UcAParHomXTKR1tAbINFhlBuA20O8VxBGR4G3l-bXIWun14fxU8ROm255ijyMZjvlZz8WT6f8mWito-nO1pqNoZIJItOB5hTAJwNq8TxfQdxjOQcMygchVGIqlwkQiwWFD9nR0BzWfMTxraQ3vFdigGYEVUjdSc2ygaBGNWL4CRRsrRBgYDRqZNcEn0"}
              />
            </div>
            {/* Overlay badge matching mock */}
            <div className="absolute -bottom-6 -left-6 bg-primary-container p-6 sm:p-8 shadow-xl hidden sm:block">
              <p className="font-display text-3xl sm:text-4xl font-bold text-on-primary-container">15+</p>
              <p className="font-sans text-[10px] sm:text-xs text-on-primary-container font-semibold uppercase tracking-widest">
                Años de Innovación
              </p>
            </div>
            {/* Official Stacked Brand Logo Emblem */}
            <div className="absolute -bottom-10 -right-6 hidden sm:block z-20 transform hover:scale-105 transition-transform duration-300">
              <Logo variant="stacked" height={90} />
            </div>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 sm:mb-32">
          <div className="p-10 bg-surface-container-lowest border border-outline-variant hover:border-primary transition-all duration-300 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 text-primary">Misión</h3>
            <p className="text-on-surface-variant font-sans text-sm sm:text-base leading-relaxed">
              Elevar la experiencia humana en el entorno construido mediante soluciones de iluminación vanguardistas que integran tecnología, sostenibilidad y bienestar neurofisiológico.
            </p>
          </div>

          <div className="p-10 bg-surface-container-lowest border border-outline-variant hover:border-primary transition-all duration-300 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 text-primary">Visión</h3>
            <p className="text-on-surface-variant font-sans text-sm sm:text-base leading-relaxed">
              Ser el referente latinoamericano en el diseño de iluminación centrado en el ser humano, transformando la percepción de la arquitectura a través de la luz.
            </p>
          </div>
        </div>

        {/* --- DYNAMIC INTERACTIVE CIRCADIAN CLOCK WIDGET --- */}
        <div className="border border-outline-variant/60 bg-pearl-grey/25 p-8 sm:p-12 mb-24 sm:mb-32">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold inline-flex items-center gap-1.5 bg-secondary-container/10 px-3 py-1">
                <Clock size={12} /> Demostración Interactiva
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-on-surface">Simulador de Ritmo Circadiano</h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant">
                Arrastre el deslizador para ver cómo diseñamos la temperatura y la intensidad de la luz (Tunable White) para sincronizar con su biología.
              </p>
            </div>

            {/* Simulated Workspace Preview Area */}
            <div
              style={circadian.previewStyle}
              className="relative aspect-[21/9] w-full border border-outline-variant flex flex-col justify-between p-6 transition-all duration-500 overflow-hidden"
            >
              {/* Sun/Moon indicator */}
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center space-x-2">
                  {circadian.icon}
                  <span className="font-sans text-xs sm:text-sm font-bold text-on-surface">{circadian.label}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold bg-white px-3 py-1 border border-outline-variant">
                  {circadianTime.toString().padStart(2, '0')}:00 hrs | <span className="text-primary">{circadian.temp}</span>
                </div>
              </div>

              {/* Biological label */}
              <div className="z-10 bg-white/95 border-l-2 border-primary p-3 space-y-1 max-w-lg shadow-sm">
                <p className="font-sans text-[10px] uppercase tracking-wider text-primary font-bold">Estado Biológico Estimulado:</p>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {circadian.biological}
                </p>
              </div>

              {/* Ambient rays back-glow */}
              <div className="absolute inset-0 bg-radial from-transparent to-white/10 pointer-events-none" />
            </div>

            {/* Slider Control */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-outline">
                <span>06:00 Amanecer</span>
                <span>12:00 Mediodía</span>
                <span>18:00 Atardecer</span>
                <span>22:00 Noche</span>
              </div>
              <input
                type="range"
                min="6"
                max="22"
                step="1"
                value={circadianTime}
                onChange={(e) => setCircadianTime(parseInt(e.target.value))}
                className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="font-sans text-xs text-on-surface-variant text-center italic">
                "{circadian.desc}"
              </p>
            </div>
          </div>
        </div>

        {/* Valores Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">Nuestros Valores</h3>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {values.map((v) => (
              <div
                key={v.name}
                className="flex flex-col items-center justify-start p-6 bg-pearl-grey/35 text-center hover:bg-white hover:shadow-xl hover:border hover:border-outline-variant/65 transition-all duration-300 group"
              >
                <div className="h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {renderValueIcon(v.iconName)}
                </div>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-widest font-bold text-on-surface mt-2 mb-1">
                  {v.name}
                </p>
                <p className="font-sans text-[10px] text-on-surface-variant leading-normal hidden group-hover:block transition-all pt-2 border-t border-outline-variant/45 w-full">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

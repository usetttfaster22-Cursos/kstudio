import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

export default function Portafolio() {
  const [filter, setFilter] = useState<string>('Todos');

  const projects: Project[] = [
    {
      id: 'p1',
      title: 'Penthouse Los Olivos',
      category: 'Residencial',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDom_CvFTKXCtVPfp6NpgaSY32ZiT8zZ6-OQKUysJqfxvuJnR_9Z9SgwO1hdR3PF7xl64JKVv79mtEfenoersRQCON4w_mxxCXx3OyICpx0I151TYof85dihBnavwLM0fr3ZapIN3cqfpZOq8CBLRot97RGgkCGfEijVW7TPLr86PefiN44C_f34jU23KaX3Wu8SJZyLU4wkCn6ICybo-wNTnndZf7Bdp8MaLjL0r1xSorgLto5K16hZC5jmk-nqYDkIX5f0h_vst8',
      description: 'Proyecto de iluminación residencial de lujo integrando domótica circadiana, control de color sintonizable y fajas LED indirectas.'
    },
    {
      id: 'p2',
      title: 'Lobby Hotel Grand Luxe',
      category: 'Hotelería',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWtXabRHtoO2oE5HwGA_OlF9vOCa4hoTMHOb3dieOW_WgaBT9yXQJgQvOUmCdXw1MsacznutrIj28KrRWid1UTKejGs__vCehHZ3-nsP_W9-eBd8a0nCy62LMEo7bJhpk987TvK2145gsvCM4HtBd5Ix39AA6x5hlBKpE4tLO66X1fMNSltwtbDCK671qC66rf8edkvPLM7DoTKF0xfsIzDhYNnGuixnb2M1DVirBvD6PlAyVwjkc1_CgVpr0iGDkgx-1_JGSLiu8',
      description: 'Ambiente de recepción exclusivo con orbes de luz dorada suspendidos, complementados con acentuaciones sobre maderas nobles.'
    },
    {
      id: 'p3',
      title: 'Galería de Arte Contemporáneo',
      category: 'Público',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFgJpH7dTSCMFzDMOINPTiPH03OhTwCTRMTVreLYZGq9tBQbYzJMqOJ-OO_2FIAGFHCRMGkHdoH6HtyRTBRQEhFaOXAU1ozKSX57jCrKZqdGW6xzmoHn4K_4LsRbJ4XgbwlNVIkXNSzRYCbqS6Rdph76MVj6_G7TpJpFYVuhqJuI7-g4UrfeRlDgign_kIaAbBhO_VunF6T_LMTWEJo_WvfnoFqngME0uIFn1kATswHsXde7pzKSrCeVNImej0gXiyk9M-sgfcwWQ',
      description: 'Luz difusa lineal rítmica en techos, diseñada para una perfecta reproducción cromática (CRI > 98) sin deslumbramientos.'
    }
  ];

  const categories = ['Todos', 'Residencial', 'Hotelería', 'Público'];

  const filteredProjects = filter === 'Todos'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-24 sm:py-32 bg-surface-bright" id="portafolio">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        {/* Header and filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold block">
              Portafolio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Proyectos que inspiran
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 border-b border-outline-variant/30 pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-300 pb-1 relative ${
                  filter === cat
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary hover:opacity-90'
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={proj.id}
                className="group relative overflow-hidden bg-pearl-grey aspect-[4/5] rounded-none border border-outline-variant/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:border-primary/40 transition-all duration-500 cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt={proj.title}
                  src={proj.image}
                />

                {/* Ambient Golden Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Pop up title overlay card */}
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <div className="bg-white p-6 w-full transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 border border-outline-variant/50 shadow-lg">
                    <p className="font-sans text-[10px] text-primary uppercase font-bold tracking-widest mb-1">
                      {proj.category}
                    </p>
                    <h4 className="font-display text-base sm:text-lg font-bold text-on-surface mb-2">
                      {proj.title}
                    </h4>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

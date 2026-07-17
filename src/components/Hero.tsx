import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useContent } from '../ContentContext';

export default function Hero() {
  const { content } = useContent();

  return (
    <header className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-10000 ease-out scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('${content.hero_bg || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFM7cmkIbPdHtuCtOqGCA_rIBhUNuA1Ry7Y_JGqtZNZuhoeP_TWsV6kZNkW40Nck10cVQIFgGlhf612tIM9odaL_Anf96uMWWkj_jEsC4K1woYpCglMLSC4SzOi7mgD22XMfU6QlpIFcpLfvMH6a1e_gbf71bvvMaDQn9qQBStpqY8_xmFCNPzrai1ukj6lgsN3J6-m44XuUZE8MSMfNnQnHXSxQUKui3ZTgTkkUMZ89Z1BEYiU7OlLKho8ixItb_qqtGd0FvcZZQ'}')`,
          }}
        />
        {/* Soft, ambient gradient overlay for optimal text contrast and high-end photographic mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/65 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 sm:px-12 max-w-[1280px] mx-auto w-full">
        <div className="max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-on-surface">
              Iluminación y bienestar con <span className="text-primary block sm:inline">sentido humano</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Transformamos espacios a través de la Neuroiluminación, fusionando ciencia y estética para mejorar la calidad de vida y el rendimiento humano.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-4 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#servicios"
              className="bg-primary text-on-primary px-8 py-4 rounded-none font-sans text-xs uppercase tracking-widest font-bold text-center hover:shadow-[0_0_20px_rgba(115,92,0,0.35)] hover:bg-primary/95 transition-all"
            >
              Consulta nuestros servicios
            </a>
            <a
              href="#portafolio"
              className="border border-outline px-8 py-4 rounded-none font-sans text-xs uppercase tracking-widest font-bold text-center hover:bg-surface-variant hover:border-primary transition-all text-on-surface"
            >
              Ver Proyectos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Animated Down Arrow */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center space-y-1">
        <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-semibold">Descubrir K°</span>
        <ChevronDown size={20} className="text-primary" />
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useContent } from '../ContentContext';

interface Specialty {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  defaultImage: string;
  alt: string;
}

export default function Servicios() {
  const [activeAcc, setActiveAcc] = useState<string | null>('acc1');
  const { content } = useContent();

  const specialties: Specialty[] = [
    {
      id: 'acc1',
      title: 'Diseño y Asesoría',
      description: 'Desarrollo de proyectos integrales de iluminación para arquitectura residencial, comercial y corporativa. Aplicamos principios de neuro-iluminación para optimizar el bienestar, regulando los flujos circadianos y la respuesta neurocognitiva.',
      imageKey: 'servicios_img_1',
      defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXA4ull1CMe7QPeIzVlqPOiX_eDb7QdekhQNrE6nZNwn7liaClqmBaUL464SAO-Xd3hBbQRKuAndpvbJpI2zUarC00gNacdri1etnyvJy4jlm6lN84d8KTthLzHJFwqsm_pimkryp4Ys5rpIA0tdpbi0tEYooiYwTiqUS1nPFMoS3r3C4Vt_Q0BvE9G-8b45_dFqZQLTLiZJ3_FkyV0ioAsGbwlT_E51yYokL299dAqw9xZKLHy1Tm_-lAYtqjqiNfulLueQqf6Fw',
      alt: 'Blueprint laying on table with technical light measuring instruments'
    },
    {
      id: 'acc2',
      title: 'Sistemas de Control',
      description: 'Automatización inteligente que permite escenas dinámicas, control de ahorro energético y sintonización de color según la hora del día (Tunable White), regulado mediante interfaces domóticas de alta gama y sensores.',
      imageKey: 'servicios_img_2',
      defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQE3e3sn8pl35ZwFjJNv9pxrr5XQqXG-YCQDHw_hbNe6ikaF9sMvE5p5gsCj7JIscHEOyLZ4cjeIvggjNIEuGY4IkN87-Z9yUKziStCl-r1AyBiOec2c1wUIS7AagwtJB8jCEpmFz5XC0LypXPT06A1TN1MMMJlOcZiZ4p5e74YkTycbfdjn-buTNyGExKyubaS-XdQzxq4C3SIr6JOCIXxFRZNNGTVWG3ySwxQ7Cn-FNIAVrAEWvB5IbIONaYdOZ3rjBj69H7iP4',
      alt: 'Smart home control panel integrated in white wall'
    },
    {
      id: 'acc3',
      title: 'Telas Tensadas Iluminadas',
      description: 'Soluciones lumínicas de gran superficie que transforman techos y paredes en fuentes de luz difusa y perfectamente homogénea, creando atmósferas envolventes y reduciendo sombras duras en vestíbulos u oficinas.',
      imageKey: 'servicios_img_3',
      defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrED82vSte8TgU1KeET7yUsmc6EQ6Dbhi25fcQsx4p4KMSTHM-MN2mg1nOj4oRWKtGlkGWRzxXcNdhQzgGHSpJ9bd1DWPH4RVCajHRdApiH8GHo0QMeonNSrlLhZqXnU0WS2EcSZSJ5vWkoWc26Kx4cqqmNyKPDhh_p7_B3VAEp2DUGS6pfGk39RCaIfIzk1oJFOEvuvo9ldkh1p54tA0DeM7KftfWnPKn6ysh1MiGubv0alMcl16YYtZW8Evk_4RsgXYeLvCC3vY',
      alt: 'Minimalist stretching fabric ceiling lighting in public space'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAcc(activeAcc === id ? null : id);
  };

  return (
    <section className="py-24 sm:py-32 bg-pearl-grey" id="servicios">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold block">
              Nuestra Experiencia
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Especialidades
            </h2>
          </div>

          <div className="space-y-4">
            {specialties.map((spec) => {
              const isOpen = activeAcc === spec.id;
              return (
                <div
                  key={spec.id}
                  className="bg-white overflow-hidden border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(spec.id)}
                    className="w-full px-6 sm:px-8 py-8 flex justify-between items-center group text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
                        isOpen ? 'text-secondary' : 'text-on-surface group-hover:text-primary'
                      }`}
                    >
                      {spec.title}
                    </span>
                    <span
                      className={`transition-all duration-300 ${
                        isOpen ? 'text-secondary rotate-180' : 'text-outline group-hover:text-primary'
                      }`}
                    >
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 sm:px-8 pb-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-pearl-grey pt-6">
                            <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                              {spec.description}
                            </p>
                            <div className="h-48 sm:h-56 overflow-hidden border border-outline-variant/40 rounded-lg">
                              <img
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                referrerPolicy="no-referrer"
                                alt={spec.alt}
                                src={content[spec.imageKey] || spec.defaultImage}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

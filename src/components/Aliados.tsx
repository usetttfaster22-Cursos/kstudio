import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, Eye, Zap, Shapes, ShieldCheck,
  Sparkles, Layers, Wrench, Package, ImageIcon,
} from 'lucide-react';
import { useContent } from '../ContentContext';

interface TabItem {
  title: string;
  detail: string;
}

interface AliadoTab {
  id: string;
  label: string;
  items: TabItem[];
  img1Key: string;
  img2Key: string;
}

interface Aliado {
  id: string;
  name: string;
  logoKey: string;
  tagline: string;
  description: string;
  features: string[];
  applications: string[];
  website: string;
  websiteLabel: string;
  tabs: AliadoTab[];
}

const ALIADOS: Aliado[] = [
  {
    id: 'tensolight',
    name: 'TENSOLIGHT',
    logoKey: 'aliado_tensolight_logo',
    tagline: 'La luz que define los espacios',
    description:
      'Membranas tensionadas que transforman el techo en una superficie luminosa continua, donde la luz deja de ser un elemento técnico para convertirse en arquitectura.',
    features: ['Confort visual', 'Eficiencia energética', 'Diseño libre', 'Durabilidad'],
    applications: ['Hoteles', 'Residencias de lujo', 'Restaurantes', 'Oficinas', 'Retail', 'Espacios corporativos'],
    website: 'https://www.tensolight.com',
    websiteLabel: 'www.tensolight.com',
    tabs: [
      {
        id: 'estetica',
        label: 'Belleza Estética',
        img1Key: 'aliado_tensolight_estetica_img1',
        img2Key: 'aliado_tensolight_estetica_img2',
        items: [
          { title: 'Amplitud y ligereza', detail: 'Sensación de mayor amplitud y ligereza en el espacio.' },
          { title: 'Geometrías puras', detail: 'Formas minimalistas y limpias que ordenan el espacio.' },
          { title: 'Sin deslumbramiento', detail: 'Eliminación del deslumbramiento para un confort visual pleno.' },
          { title: 'Luz natural difusa', detail: 'Apariencia de luz natural suave y homogénea.' },
        ],
      },
      {
        id: 'diseno',
        label: 'Aporte al Diseño',
        img1Key: 'aliado_tensolight_diseno_img1',
        img2Key: 'aliado_tensolight_diseno_img2',
        items: [
          { title: 'Libertad de formas', detail: 'Cuadradas, circulares, orgánicas o suspendidas.' },
          { title: 'Elementos icónicos', detail: 'Permite crear espacios únicos y memorables.' },
          { title: 'Integración total', detail: 'Se integra con climatización, acústica e iluminación.' },
          { title: 'Adaptación total', detail: 'Se adapta a cualquier lenguaje arquitectónico.' },
        ],
      },
      {
        id: 'tecnicos',
        label: 'Beneficios Técnicos',
        img1Key: 'aliado_tensolight_tecnicos_img1',
        img2Key: 'aliado_tensolight_tecnicos_img2',
        items: [
          { title: 'Alta eficiencia energética', detail: 'Menor consumo, mayor rendimiento.' },
          { title: 'Fácil mantenimiento', detail: 'Superficies lavables y de acceso sencillo.' },
          { title: 'Tecnología LED', detail: 'Compatible con sistemas inteligentes de control de luz.' },
          { title: 'Uniformidad lumínica', detail: 'Distribución homogénea y sin sombras.' },
          { title: 'Peso reducido', detail: 'No sobrecarga la estructura.' },
        ],
      },
      {
        id: 'materiales',
        label: 'Materiales Premium',
        img1Key: 'aliado_tensolight_materiales_img1',
        img2Key: 'aliado_tensolight_materiales_img2',
        items: [
          { title: 'Ignífugas', detail: 'Membranas resistentes al fuego.' },
          { title: 'Anti-hongos', detail: 'Tratadas contra la aparición de hongos.' },
          { title: 'Acústicas', detail: 'Contribuyen al confort sonoro del espacio.' },
          { title: 'Reciclables', detail: 'Materiales de alta calidad y responsables.' },
        ],
      },
    ],
  },
];

const featureIcons = [Eye, Zap, Shapes, ShieldCheck];
const tabIcons = [Sparkles, Layers, Wrench, Package];

function TabImage({ src, label }: { src?: string; label: string }) {
  return (
    <div className="w-full h-full min-h-[180px] bg-surface border border-outline-variant/40 overflow-hidden flex items-center justify-center">
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-outline/40">
          <ImageIcon size={28} strokeWidth={1.2} />
        </div>
      )}
    </div>
  );
}

function AliadoCard({ aliado }: { aliado: Aliado }) {
  const { content } = useContent();
  const logo = content[aliado.logoKey];
  const [activeTab, setActiveTab] = useState(aliado.tabs[0]?.id ?? '');

  const current = aliado.tabs.find((t) => t.id === activeTab) ?? aliado.tabs[0];
  const half = Math.ceil(current.items.length / 2);
  const colA = current.items.slice(0, half);
  const colB = current.items.slice(half);

  const renderItems = (items: TabItem[]) => (
    <div className="flex flex-col gap-5 justify-center">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-1 border-l-2 border-primary/30 pl-4">
          <span className="font-sans text-xs uppercase tracking-wider text-on-surface font-bold">
            {item.title}
          </span>
          <span className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
            {item.detail}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border border-outline-variant/60 shadow-sm p-8 sm:p-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="w-full aspect-[3/2] bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-outline-variant/40">
            {logo ? (
              <img src={logo} alt={`Logo de ${aliado.name}`} className="w-full h-full object-contain p-8" />
            ) : (
              <span className="font-display text-2xl tracking-[0.2em] text-white/80 uppercase">
                {aliado.name}
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight uppercase">
              {aliado.name}
            </h3>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-primary font-bold">
              {aliado.tagline}
            </p>
          </div>

          <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-light max-w-xl">
            {aliado.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {aliado.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div key={feature} className="flex flex-col items-start gap-2">
                  <Icon size={18} className="text-primary" />
                  <span className="font-sans text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold leading-snug">
                    {feature}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pestanas */}
      <div className="mt-12 border-t border-outline-variant/40 pt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {aliado.tabs.map((tab, i) => {
            const Icon = tabIcons[i % tabIcons.length];
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-wider font-bold border transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-transparent text-outline border-outline-variant/60 hover:text-on-surface hover:border-on-surface/40'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid: texto | imagen | texto | imagen */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"
        >
          <div className="lg:col-span-1">{renderItems(colA)}</div>
          <div className="lg:col-span-1">
            <TabImage src={content[current.img1Key]} label={`${aliado.name} - ${current.label} 1`} />
          </div>
          <div className="lg:col-span-1">{renderItems(colB)}</div>
          <div className="lg:col-span-1">
            <TabImage src={content[current.img2Key]} label={`${aliado.name} - ${current.label} 2`} />
          </div>
        </motion.div>
      </div>

      {/* Aplicaciones + enlace */}
      <div className="mt-10 pt-8 border-t border-outline-variant/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {aliado.applications.map((app) => (
            <span
              key={app}
              className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold border border-outline-variant/50 px-3 py-1.5"
            >
              {app}
            </span>
          ))}
        </div>

        <a
          href={aliado.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-on-surface hover:text-primary transition-colors group shrink-0"
        >
          {aliado.websiteLabel}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Aliados() {
  return (
    <section className="py-24 sm:py-32 bg-surface" id="aliados">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        <div className="mb-20 text-center sm:text-left">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary font-bold block mb-3 pl-1">
            Alianzas Estratégicas
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Nuestros Aliados
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-2xl mt-6 font-light">
            Colaboramos con marcas que comparten nuestra visión de la luz como
            elemento arquitectónico, ampliando lo que un espacio puede llegar a ser.
          </p>
        </div>

        <div className="space-y-16">
          {ALIADOS.map((aliado) => (
            <AliadoCard key={aliado.id} aliado={aliado} />
          ))}
        </div>
      </div>
    </section>
  );
}

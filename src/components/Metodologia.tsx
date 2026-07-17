import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Compass, 
  Layers, 
  Sliders, 
  Sun, 
  Moon, 
  Activity, 
  Check, 
  Sparkles,
  Eye,
  Settings,
  Cpu,
  CornerDownRight
} from 'lucide-react';

interface MetodologiaProps {
  activeStep: string;
  onStepChange: (stepNumber: string) => void;
}

export default function Metodologia({ activeStep, onStepChange }: MetodologiaProps) {
  // 1. Step Metadata
  const steps = [
    {
      number: '01',
      name: 'Análisis',
      slogan: 'Diagnóstico espacial, lumínico y circadiano',
      description: 'Evaluación exhaustiva del espacio arquitectónico, necesidades específicas del usuario y objetivos biológicos/circadianos del proyecto. Analizamos cómo la luz natural incide a lo largo de las estaciones y cómo la iluminación artificial influirá en la neurobiología de los ocupantes.',
      deliverables: [
        'Análisis de Ritmo Circadiano y Cronotipo del cliente.',
        'Estudio preliminar de iluminación natural y asoleamiento.',
        'Auditoría y levantamiento fotométrico de luminarias existentes.',
        'Diagnóstico cuantitativo de luxes requeridos por área.'
      ]
    },
    {
      number: '02',
      name: 'Conceptualización',
      slogan: 'Modelado tridimensional de emociones y atmósferas',
      description: 'Desarrollo de la narrativa lumínica del espacio mediante esquemas visuales y modelos tridimensionales interactivos. Diseñamos el juego de luces y sombras, seleccionamos las temperaturas de color ideales (K°) y creamos contrastes para estructurar la jerarquía arquitectónica y emocional.',
      deliverables: [
        'Moodboard conceptual y paleta de temperaturas lumínicas.',
        'Esquema preliminar de zonificación de luz y jerarquía visual.',
        'Renders 3D conceptuales simulando el comportamiento de la luz.',
        'Propuesta inicial de tipologías de luminarias y efectos ópticos.'
      ]
    },
    {
      number: '03',
      name: 'Desarrollo Técnico',
      slogan: 'Planos ejecutivos, fotometría y cálculo de precisión',
      description: 'Elaboración de planos detallados de distribución, cálculos fotométricos de precisión en Dialux Evo y especificación técnica de sistemas de control domótico. Traducimos la visión creativa en un expediente técnico riguroso listo para licitación e instalación.',
      deliverables: [
        'Cálculos y simulaciones fotométricas precisas en Dialux Evo.',
        'Planos ejecutivos con distribución de luminarias y circuitos.',
        'Catálogo de especificaciones técnicas detalladas y marcas recomendadas.',
        'Esquema y diagrama de integración con domótica (Lutron, DALI, Casambi).'
      ]
    },
    {
      number: '04',
      name: 'Implementación',
      slogan: 'Supervisión en obra, calibración fina y programación de escenas',
      description: 'Supervisión presencial durante la obra, direccionamiento físico de haz de luz en sitio y programación meticulosa de escenas de iluminación dinámica. Calibramos y programamos el sistema domótico para garantizar transiciones circadianas totalmente fluidas.',
      deliverables: [
        'Asistencia técnica presencial y supervisión durante el montaje.',
        'Enfoque de ópticas, orientación física de haces y colocación de filtros.',
        'Programación fina de controladores de iluminación y horarios automáticos.',
        'Manual de usuario y bitácora de mantenimiento del sistema instalado.'
      ]
    }
  ];

  const currentStepData = steps.find(s => s.number === activeStep) || steps[0];

  // 2. Interactive Tool States
  // Step 1: Circadian clock slider (Hour of the day 6 to 23)
  const [circadianHour, setCircadianHour] = useState<number>(12); // midday
  
  // Step 2: Temperature selector & Intensity state
  const [kelvinTemp, setKelvinTemp] = useState<number>(3000);
  const [lightIntensity, setLightIntensity] = useState<number>(80);

  // Step 3: Dialux calculation state
  const [roomType, setRoomType] = useState<'oficina' | 'estudio' | 'dormitorio' | 'sala'>('estudio');
  const [fixturesCount, setFixturesCount] = useState<number>(4);
  const [lumensPerFixture, setLumensPerFixture] = useState<number>(800);

  // Step 4: Scene selection keypad state
  const [selectedScene, setSelectedScene] = useState<string>('work');

  // Circadian helper calculation for Step 1
  const getCircadianStatus = (hour: number) => {
    if (hour >= 6 && hour < 9) {
      return {
        temp: '4000K - Blanco Neutro Activador',
        melatonin: 'Inhibida por completo',
        cortisol: 'Pico ascendente (Máxima energía)',
        advice: 'Ideal para sincronizar el reloj biológico matutino y aumentar la alerta.',
        colorClass: 'from-amber-200 via-sky-300 to-sky-400',
        textColor: 'text-amber-600'
      };
    } else if (hour >= 9 && hour < 17) {
      return {
        temp: '5000K - Blanco Frío Estimulante',
        melatonin: 'Nivel nulo',
        cortisol: 'Nivel sostenido (Alto rendimiento)',
        advice: 'Optimiza la agudeza cognitiva, la productividad y reduce la fatiga visual.',
        colorClass: 'from-sky-300 via-sky-100 to-blue-300',
        textColor: 'text-blue-500'
      };
    } else if (hour >= 17 && hour < 20) {
      return {
        temp: '2700K - Blanco Cálido Confortable',
        melatonin: 'Comenzando síntesis gradual',
        cortisol: 'En descenso marcado',
        advice: 'Fomenta la relajación después de la jornada, preparando el cuerpo para el descanso.',
        colorClass: 'from-orange-200 via-amber-300 to-orange-400',
        textColor: 'text-orange-500'
      };
    } else {
      return {
        temp: '2200K - Luz Muy Cálida (Efecto Fuego)',
        melatonin: 'Pico de secreción (Inducción al sueño)',
        cortisol: 'Mínimo biológico',
        advice: 'Evita la supresión de melatonina. Clave para un sueño profundo y reparador.',
        colorClass: 'from-orange-950 via-neutral-900 to-black',
        textColor: 'text-amber-500'
      };
    }
  };

  const circadian = getCircadianStatus(circadianHour);

  // Kelvin helper calculation for Step 2
  const getKelvinDetails = (k: number) => {
    if (k <= 2400) {
      return {
        label: 'Vela / Fuego Amortiguado (2200K)',
        vibe: 'Íntimo, romántico, libre de estrés circadiano.',
        color: '#ff9d47'
      };
    } else if (k <= 3000) {
      return {
        label: 'Blanco Cálido de Museo (2700K - 3000K)',
        vibe: 'Acogedor, elegante, ideal para áreas sociales y de descanso.',
        color: '#ffbe7c'
      };
    } else if (k <= 4000) {
      return {
        label: 'Blanco Neutro de Oficina (4000K)',
        vibe: 'Limpio, moderno, óptimo para cocinas y áreas de tarea.',
        color: '#ffdfbd'
      };
    } else {
      return {
        label: 'Blanco Frío Quirúrgico / Luz de Día (6000K)',
        vibe: 'Hiper-enfoque, máxima concentración, estimulante energético.',
        color: '#def0ff'
      };
    }
  };

  const kelvinDetail = getKelvinDetails(kelvinTemp);

  // Dialux Lux Calculator helper for Step 3
  const calculateLux = () => {
    // Basic Lumen method approximation: Lux = (Fixtures * Lumens * CU * LLF) / Area
    const areaMap = {
      oficina: 30, // 30 m2
      estudio: 12, // 12 m2
      dormitorio: 16, // 16 m2
      sala: 25 // 25 m2
    };
    
    const targetLuxMap = {
      oficina: { target: 500, label: 'Oficina / Trabajo Intelectual (Norma: 500 lx)' },
      estudio: { target: 300, label: 'Estudio / Tarea de Precisión (Norma: 300 lx)' },
      dormitorio: { target: 150, label: 'Dormitorio / Relax (Norma: 100-150 lx)' },
      sala: { target: 200, label: 'Sala de Estar / Multiusos (Norma: 150-200 lx)' }
    };

    const area = areaMap[roomType];
    const totalLumens = fixturesCount * lumensPerFixture;
    // Coefficient of utilization = 0.5, Light loss factor = 0.85
    const computedLux = Math.round((totalLumens * 0.5 * 0.85) / area);
    const target = targetLuxMap[roomType];

    let evaluation = '';
    let evaluationClass = '';
    if (computedLux < target.target * 0.75) {
      evaluation = 'Sub-óptimo (Poco iluminado)';
      evaluationClass = 'text-amber-600 bg-amber-50 border-amber-200';
    } else if (computedLux > target.target * 1.35) {
      evaluation = 'Exceso de Brillo (Posible deslumbramiento)';
      evaluationClass = 'text-rose-600 bg-rose-50 border-rose-200';
    } else {
      evaluation = 'Confort Lumínico Óptimo (Eficiente)';
      evaluationClass = 'text-green-700 bg-green-50 border-green-200';
    }

    return {
      lux: computedLux,
      targetText: target.label,
      targetLux: target.target,
      area,
      evaluation,
      evaluationClass
    };
  };

  const photometrics = calculateLux();

  // Scene presets for Step 4
  const scenePresets = {
    morning: {
      name: '01. Amanecer Dorado',
      kelvin: '2700K',
      intensity: '30%',
      zones: 'Lámparas colgantes + Cajillos de luz indirecta en cielo raso',
      energy: 'Ahorro Máximo (85%)',
      desc: 'Simula el despertar de la naturaleza. Incrementa suavemente el nivel de luz para una transición biológica cómoda.'
    },
    work: {
      name: '02. Máximo Rendimiento',
      kelvin: '5000K',
      intensity: '100%',
      zones: 'Luminarias lineales empotradas + Spots de acento focal',
      energy: 'Estándar nominal (100% potencia)',
      desc: 'Estimulación circadiana máxima. Diseñado para incrementar el enfoque cognitivo y prevenir la fatiga ocular.'
    },
    sunset: {
      name: '03. Ocaso Relajante',
      kelvin: '2400K',
      intensity: '20%',
      zones: 'Luz perimetral indirecta + Lámparas de mesa decorativas',
      energy: 'Bajo Consumo (90% ahorro)',
      desc: 'Luz cálida y de baja altura. Indica al cerebro que el día está terminando, estimulando la relajación muscular.'
    },
    night: {
      name: '04. Sueño Profundo',
      kelvin: '1800K',
      intensity: '5%',
      zones: 'Cortesía en zócalos / piso de baño y pasillos',
      energy: 'Micro consumo (98% ahorro)',
      desc: 'Camino de seguridad iluminado. Luz ambarina que permite orientarse en la noche sin alertar las células oculares ganglionares.'
    }
  };

  const currentScene = scenePresets[selectedScene as keyof typeof scenePresets] || scenePresets.work;

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden border-t border-b border-outline-variant/30" id="metodologia">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-center space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary font-bold block">
            Ingeniería & Diseño Lumínico
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Metodología de Diseño
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto font-light">
            Selecciona una etapa a continuación para visualizar cómo estructuramos el desarrollo técnico, la simulación de precisión y los entregables de cada fase.
          </p>
        </div>

        {/* Step Tabs Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {steps.map((step) => {
            const isSelected = step.number === activeStep;
            return (
              <button
                key={step.number}
                onClick={() => onStepChange(step.number)}
                className={`flex flex-col text-left p-5 border transition-all duration-300 relative group/btn ${
                  isSelected
                    ? 'border-primary bg-white shadow-md'
                    : 'border-outline-variant/50 bg-pearl-grey/25 hover:bg-white hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-primary' : 'text-outline'}`}>
                    FASE {step.number}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <h3 className={`font-display text-base font-bold uppercase tracking-tight ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                  {step.name}
                </h3>
                <span className="font-sans text-[10px] text-on-surface-variant line-clamp-1 mt-1 font-light uppercase tracking-wider">
                  {step.slogan}
                </span>
                
                {/* Visual bottom bar accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 ${isSelected ? 'bg-primary' : 'bg-transparent group-hover/btn:bg-outline-variant/50'}`} />
              </button>
            );
          })}
        </div>

        {/* Dynamic Workspace Container */}
        <div className="bg-white border border-outline-variant/60 shadow-lg p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Column A: Explanatory Content & Deliverables (7 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Badge & Slogan */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-primary/5 px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-primary uppercase rounded-xs">
                    <Sparkles size={11} />
                    Fase de {currentStepData.name} Activa
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight leading-tight">
                    {currentStepData.name}
                  </h3>
                  <p className="font-sans text-sm text-primary font-semibold tracking-wider uppercase">
                    {currentStepData.slogan}
                  </p>
                </div>

                {/* Long description */}
                <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                  {currentStepData.description}
                </p>

                {/* Deliverables Block */}
                <div className="space-y-4 pt-4 border-t border-outline-variant/30">
                  <h4 className="font-display text-xs uppercase tracking-[0.25em] font-bold text-on-surface flex items-center gap-2">
                    <FileText size={14} className="text-primary" />
                    Entregables y Resultados Clave:
                  </h4>
                  <ul className="grid grid-cols-1 gap-3 pl-1">
                    {currentStepData.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step indicator footer */}
              <div className="pt-6 border-t border-outline-variant/30 flex items-center gap-4 text-xs font-mono font-bold text-outline">
                <span>01</span>
                <div className="flex-1 h-px bg-outline-variant/35 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                    style={{ width: `${(parseInt(currentStepData.number) / 4) * 100}%` }}
                  />
                </div>
                <span>04</span>
                <span className="uppercase text-primary tracking-widest pl-2">K° STUDIO</span>
              </div>
            </div>

            {/* Column B: Interactive Visual Mockup / Demonstration Area (5 cols) */}
            <div className="lg:col-span-6 bg-pearl-grey/30 border border-outline-variant/45 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              
              {/* Workspace Blueprint grid background style */}
              <div className="absolute inset-0 bg-[radial-gradient(#c7c6c4_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

              <div className="relative z-10 w-full space-y-6">
                
                {/* Header of Interactive Panel */}
                <div className="flex justify-between items-center border-b border-outline-variant/40 pb-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Visualizador de Concepto
                    </span>
                  </div>
                  <span className="font-mono text-xs text-outline bg-white border border-outline-variant/40 px-2 py-0.5">
                    Live Demo
                  </span>
                </div>

                {/* -------------------- DYNAMIC WIDGETS BASED ON ACTIVE STEP -------------------- */}
                <AnimatePresence mode="wait">
                  {activeStep === '01' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                          <Activity size={14} className="text-amber-600 animate-pulse" />
                          Simulador Biológico Circadiano
                        </h4>
                        <p className="font-sans text-[11px] text-[#777]">
                          Desliza la barra para ver cómo cambian el asoleamiento y la respuesta hormonal humana a lo largo de las horas del día.
                        </p>
                      </div>

                      {/* Display window reflecting the slider hour */}
                      <div className={`p-4 border border-outline-variant/40 bg-gradient-to-br ${circadian.colorClass} transition-all duration-700 text-white shadow-inner flex flex-col justify-between min-h-[140px] relative rounded-xs`}>
                        {/* Dimming overlay for night hours */}
                        {circadianHour >= 20 && <div className="absolute inset-0 bg-black/45 rounded-xs" />}
                        
                        <div className="relative z-10 flex justify-between items-start">
                          <span className="font-display text-3xl font-bold tracking-tighter">
                            {circadianHour}:00 {circadianHour >= 12 ? 'PM' : 'AM'}
                          </span>
                          <span className="font-sans text-[9px] uppercase tracking-widest font-bold bg-white/20 px-2.5 py-1 backdrop-blur-md rounded-full">
                            {circadianHour >= 18 || circadianHour < 6 ? 'Ciclo Nocturno' : 'Ciclo Diurno'}
                          </span>
                        </div>

                        <div className="relative z-10 space-y-1 pt-6">
                          <div className="font-mono text-[10px] tracking-wider opacity-90">
                            Fórmula Lumínica: <span className="font-bold underline">{circadian.temp}</span>
                          </div>
                          <div className="font-sans text-xs flex flex-wrap gap-x-3 opacity-80 font-light">
                            <span>Cortisol: <strong>{circadian.cortisol}</strong></span>
                            <span>•</span>
                            <span>Melatonina: <strong>{circadian.melatonin}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Control Slider */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-[11px] font-sans font-bold text-on-surface">
                          <span>Amanecer (6 AM)</span>
                          <span>Mediodía (12 PM)</span>
                          <span>Noche (11 PM)</span>
                        </div>
                        <input
                          type="range"
                          min={6}
                          max={23}
                          value={circadianHour}
                          onChange={(e) => setCircadianHour(parseInt(e.target.value))}
                          className="w-full h-1 bg-outline-variant/60 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>

                      {/* Action advice */}
                      <div className="p-3.5 bg-white border border-outline-variant/40 rounded-xs">
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                          <strong className={circadian.textColor}>Recomendación K°: </strong>
                          {circadian.advice}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === '02' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                          <Layers size={14} className="text-primary" />
                          Zonificación de Temperatura & Brillo
                        </h4>
                        <p className="font-sans text-[11px] text-[#777]">
                          Prueba diferentes K° (Kelvin) para ver cómo afecta el tono y la sensación espacial.
                        </p>
                      </div>

                      {/* Preview Sphere and Gradient representing Kelvin and intensity */}
                      <div className="p-5 border border-outline-variant/40 bg-white shadow-inner flex flex-col items-center justify-center space-y-4 rounded-xs min-h-[160px]">
                        <div 
                          className="w-20 h-20 rounded-full relative shadow-lg blur-xs transition-all duration-500"
                          style={{
                            backgroundColor: kelvinDetail.color,
                            boxShadow: `0 0 ${lightIntensity / 2}px ${lightIntensity / 4}px ${kelvinDetail.color}`,
                            opacity: (lightIntensity / 100) * 0.4 + 0.6
                          }}
                        />
                        <div className="text-center">
                          <span className="font-sans text-xs uppercase tracking-widest font-bold block text-on-surface">
                            {kelvinDetail.label}
                          </span>
                          <span className="font-sans text-[11px] text-[#888] italic block mt-1">
                            {kelvinDetail.vibe}
                          </span>
                        </div>
                      </div>

                      {/* Kelvin Control Buttons */}
                      <div className="space-y-3 pt-1">
                        <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block">
                          Selección de Temperatura (K°):
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {[2200, 3000, 4000, 6000].map((k) => (
                            <button
                              key={k}
                              onClick={() => setKelvinTemp(k)}
                              className={`py-1.5 px-1 font-mono text-[10px] border transition-colors ${
                                kelvinTemp === k
                                  ? 'border-primary bg-primary/5 text-primary font-bold'
                                  : 'border-outline-variant/50 bg-white text-on-surface-variant hover:border-outline hover:text-primary'
                              }`}
                            >
                              {k}K
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Intensity Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-mono text-on-surface-variant">
                          <span>Atenuación Mínima (10%)</span>
                          <span>Brillo: {lightIntensity}%</span>
                          <span>Máximo (100%)</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={lightIntensity}
                          onChange={(e) => setLightIntensity(parseInt(e.target.value))}
                          className="w-full h-1 bg-outline-variant/60 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeStep === '03' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                          <Sliders size={14} className="text-primary" />
                          Simulador Fotométrico Dialux Evo
                        </h4>
                        <p className="font-sans text-[11px] text-[#777]">
                          Configura la cantidad y potencia de las luminarias para evaluar si cumple con las normativas lux.
                        </p>
                      </div>

                      {/* Calculations Panel */}
                      <div className="bg-white p-4 border border-outline-variant/40 space-y-3.5 shadow-sm rounded-xs">
                        <div className="flex justify-between items-center text-xs border-b border-outline-variant/30 pb-2">
                          <span className="font-sans text-on-surface-variant font-medium">Espacio Seleccionado:</span>
                          <select
                            value={roomType}
                            onChange={(e: any) => setRoomType(e.target.value)}
                            className="bg-pearl-grey/30 border border-outline-variant/50 px-2 py-0.5 font-sans text-xs rounded-sm focus:outline-primary"
                          >
                            <option value="oficina">Oficina Corporativa</option>
                            <option value="estudio">Estudio de Diseño</option>
                            <option value="dormitorio">Dormitorio Principal</option>
                            <option value="sala">Sala de Estar</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="font-sans text-[10px] text-outline uppercase block">Luminarias:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setFixturesCount(Math.max(1, fixturesCount - 1))}
                                className="w-6 h-6 border border-outline-variant flex items-center justify-center hover:bg-pearl-grey/30 active:scale-95"
                              >
                                -
                              </button>
                              <span className="font-mono text-sm font-bold">{fixturesCount} uds</span>
                              <button
                                onClick={() => setFixturesCount(Math.min(12, fixturesCount + 1))}
                                className="w-6 h-6 border border-outline-variant flex items-center justify-center hover:bg-pearl-grey/30 active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="font-sans text-[10px] text-outline uppercase block">Lúmenes/ud:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setLumensPerFixture(Math.max(400, lumensPerFixture - 200))}
                                className="w-6 h-6 border border-outline-variant flex items-center justify-center hover:bg-pearl-grey/30 active:scale-95"
                              >
                                -
                              </button>
                              <span className="font-mono text-sm font-bold">{lumensPerFixture} lm</span>
                              <button
                                onClick={() => setLumensPerFixture(Math.min(2000, lumensPerFixture + 200))}
                                className="w-6 h-6 border border-outline-variant flex items-center justify-center hover:bg-pearl-grey/30 active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Compute results readout */}
                        <div className="pt-2.5 border-t border-outline-variant/30 flex justify-between items-center">
                          <div>
                            <span className="font-sans text-[10px] text-[#888] uppercase block">Resultado Lux Calculado:</span>
                            <span className="font-display text-2xl font-black text-primary">
                              {photometrics.lux} <span className="text-xs font-normal text-on-surface-variant">lx promedio</span>
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-sans text-[10px] text-[#888] uppercase block">Objetivo de Norma:</span>
                            <span className="font-mono text-xs font-semibold text-on-surface">
                              {photometrics.targetLux} lx
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Assessment badge */}
                      <div className={`p-3 border text-xs flex items-center gap-2 font-sans font-medium rounded-xs transition-colors ${photometrics.evaluationClass}`}>
                        <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                        <span>{photometrics.evaluation}</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === '04' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                          <Cpu size={14} className="text-primary" />
                          Teclado de Control Domótico Lutron/Casambi
                        </h4>
                        <p className="font-sans text-[11px] text-[#777]">
                          Presiona una de las escenas programadas por el integrador K° para simular el direccionamiento automático del espacio.
                        </p>
                      </div>

                      {/* Scene controller keypad */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'morning', label: '1. Amanecer', icon: Sun },
                          { id: 'work', label: '2. Enfoque / Concentración', icon: Activity },
                          { id: 'sunset', label: '3. Atardecer', icon: Moon },
                          { id: 'night', label: '4. Sueño Dinámico', icon: StarsIcon }
                        ].map((btn) => {
                          const IconComp = btn.icon;
                          const active = selectedScene === btn.id;
                          return (
                            <button
                              key={btn.id}
                              onClick={() => setSelectedScene(btn.id)}
                              className={`p-3 border flex items-center gap-2 text-left transition-all ${
                                active
                                  ? 'bg-primary text-white border-primary shadow-md scale-102'
                                  : 'bg-white border-outline-variant/60 text-on-surface hover:border-outline hover:bg-pearl-grey/30'
                              }`}
                            >
                              <IconComp size={14} className={active ? 'text-white' : 'text-primary'} />
                              <span className="font-sans text-[10.5px] uppercase tracking-wider font-bold leading-none">
                                {btn.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamic Keypad specifications printout */}
                      <div className="bg-white border border-outline-variant/40 p-4 space-y-2.5 rounded-xs">
                        <div className="flex justify-between text-[11px] font-mono pb-2 border-b border-outline-variant/30 text-on-surface-variant">
                          <span>Escena: <strong>{currentScene.name}</strong></span>
                          <span>Brillo: <strong>{currentScene.intensity}</strong></span>
                        </div>
                        <div className="font-sans text-xs text-on-surface-variant space-y-1.5">
                          <p className="font-light">
                            {currentScene.desc}
                          </p>
                          <div className="text-[10px] text-outline font-semibold uppercase pt-1.5 flex items-start gap-1">
                            <CornerDownRight size={10} className="shrink-0 mt-0.5" />
                            <span>Zonas activas: {currentScene.zones}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>

              {/* Bottom Decorative Wireframe Label */}
              <div className="pt-8 flex justify-between items-center text-[10px] font-mono text-[#888] border-t border-outline-variant/30 mt-4 relative z-10">
                <span>SYSTEM STATUS: CALIBRATED</span>
                <span>ENGINE: K° PRO V1.2</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// Micro fallback custom icon so we don't crash if imported icon is missing
function StarsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" opacity="0.6" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" opacity="0.6" />
    </svg>
  );
}

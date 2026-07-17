import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import Metodologia from './components/Metodologia';
import Portafolio from './components/Portafolio';
import Aliados from './components/Aliados';
import Equipo from './components/Equipo';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SolicitudesPanel from './components/SolicitudesPanel';
import { Booking, ContactInquiry, Designer } from './types';
import { useContent } from './ContentContext';

export default function App() {
  const { content } = useContent();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [activeMethodologyStep, setActiveMethodologyStep] = useState<string>('01');

  const designers: Designer[] = [
    {
      id: 'dg4',
      name: 'Mauricio Gil',
      role: 'Co-Director / Lighting Designer',
      bio: 'Especialista en Neuroiluminación con más de 15 años de trayectoria transformando espacios comerciales y hoteleros en experiencias multisensoriales que potencian el bienestar y el confort.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
      email: 'm.gil@kstudio.com'
    },
    {
      id: 'dg5',
      name: 'Diego Eslava',
      role: 'Co-Director / Arquitecto',
      bio: 'Arquitecto visionario enfocado en la integración de la luz como elemento estructural y narrativo, garantizando una armonía total entre la forma espacial y la función lumínica.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
      email: 'd.eslava@kstudio.com'
    },
    {
      id: 'dg1',
      name: 'Jean Carlos C.',
      role: 'Arquitecto / Lighting Designer',
      bio: 'Arquitecto y diseñador de iluminación con 18 años de experiencia especializado en el uso del software Dialux Evo para la presentación y evaluación de sistemas lumínicos. En búsqueda siempre de formas innovadoras para comunicar el importante rol de la iluminación en la arquitectura y el ser humano.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYHxW_aj56TRlSqsJJdImi8gNC1M3OtfYuNT1MNY0PRCyCY8qETHjthMLmsnJWguDCdNrT1Jt3PmQS4wQQtVrROxA3oYJHAQRjhxjSCYe6Hu-XfUSu3HGkRGQspaUW110KWu4IaK1lf2w6NvfhYnm-nTqqvBcJ0rg9GnD9GQOpRqDjlmtSudCH-14UckTBddmcFUcg262h3NJLYv6rG0lR18BSOd6caAz0ESdeJ8zurkyKJBdpb7Gb6fSXcpwj_TlZOSE7Od9IMaA',
      email: 'j.carlos@kstudio.com'
    },
    {
      id: 'dg2',
      name: 'Polaris Gálvez',
      role: 'Arquitecta / Interior Designer | Architectural Visualizer',
      bio: 'Arquitecta e ilustradora arquitectónica con experiencia en diseño arquitectónico, interiorismo y visualización arquitectónica. Especializada en la creación de propuestas funcionales y estéticamente cuidadas, con enfoque en la comunicación visual y el desarrollo integral de proyectos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlGusI0y7C4eE8FV3quthZNvYHSv_0gESzlEStyB9U_o6P8_-hDpjWlBbuzFB6MGLW6zKNkb0u6nD2hICYGeq4qwFa4LlTwrpAkTebuQwvtejTV0QudBWYnQGTWUEVUXQJ5wxwOuMJ-tV0nrKmvxPfJVNc9FIzL7eQzcZz-oHPd_P4Xa20R-cXW03LwmSI0GCnXPqoapsN0MyB_3HeZjQK3J_Kfv-5_bRk30512n47VtkMSPP6FqB6iQIQPvtemK36reAOHIb_XQ',
      email: 'p.galvez@kstudio.com'
    },
    {
      id: 'dg3',
      name: 'Ana D. Edezma',
      role: 'Diseñadora Gráfica, Diseño Visual & Branding',
      bio: 'Diseñadora gráfica y de comunicación visual con más de 20 años de experiencia, especialista en diseño editorial, gran formato y soluciones creativas que conectan marcas con personas.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      email: 'a.edezma@kstudio.com'
    }
  ];

  // Apply custom images from CMS
  const activeDesigners = designers.map(d => ({
    ...d,
    image: content[`designer_${d.id}`] || d.image
  }));

  // Load from local storage on mount
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('kstudio_bookings') || '[]');
    const savedInquiries = JSON.parse(localStorage.getItem('kstudio_inquiries') || '[]');
    
    // Seed with mock entries if entirely empty to demonstrate full-fidelity functionality
    if (savedBookings.length === 0) {
      const initialBookings: Booking[] = [
        {
          id: 'mock-b1',
          name: 'Sofía Valdés',
          email: 'sofia@constructora-isthmus.com',
          phone: '+507 6223-1122',
          date: '2026-07-20',
          time: '10:30',
          designerId: 'dg1',
          projectType: 'Hotelería',
          notes: 'Asesoría para vestíbulo central de proyecto hotelero en playa.'
        }
      ];
      localStorage.setItem('kstudio_bookings', JSON.stringify(initialBookings));
      setBookings(initialBookings);
    } else {
      setBookings(savedBookings);
    }

    if (savedInquiries.length === 0) {
      const initialInquiries: ContactInquiry[] = [
        {
          id: 'mock-inq1',
          name: 'Roberto Varela',
          phone: '+507 6878-9988',
          projectType: 'Residencial',
          location: 'Altos del Golf, Panamá',
          message: 'Me interesa rediseñar la iluminación de mi residencia principal enfocado en mejorar la conciliación del sueño de mis hijos.',
          date: '14 de jul de 2026, 11:24 AM'
        }
      ];
      localStorage.setItem('kstudio_inquiries', JSON.stringify(initialInquiries));
      setInquiries(initialInquiries);
    } else {
      setInquiries(savedInquiries);
    }
  }, []);

  const handleNewBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const handleNewInquiry = (inquiry: ContactInquiry) => {
    setInquiries((prev) => [...prev, inquiry]);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem('kstudio_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    localStorage.setItem('kstudio_inquiries', JSON.stringify(updated));
    setInquiries(updated);
  };

  return (
    <div className="relative min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Navigation Top Bar */}
      <Header
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeMethodologyStep={activeMethodologyStep}
        onSelectMethodologyStep={setActiveMethodologyStep}
      />

      {/* Hero Header */}
      <Hero />

      {/* Main Sections */}
      <main className="space-y-0">
        {/* Filosofía & Valores (Nosotros) */}
        <Nosotros />

        {/* Especialidades (Servicios) */}
        <Servicios />

        {/* Metodología */}
        <Metodologia 
          activeStep={activeMethodologyStep} 
          onStepChange={setActiveMethodologyStep} 
        />

        {/* Portafolio */}
        <Portafolio />

        {/* Aliados */}
        <Aliados />

        {/* Expertos (Equipo) */}
        <Equipo designers={activeDesigners} />

        {/* Formulario y Contacto */}
        <Contacto onSuccessInquiry={handleNewInquiry} />
      </main>

      {/* Footer & Partner brands */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/50769583287"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center h-16 w-16 bg-primary-container text-on-primary-container rounded-full p-4 shadow-xl shadow-amber-glow/20 transition-all duration-300 hover:scale-110 hover:shadow-amber-glow/40 group active:scale-95"
        title="Contactar por WhatsApp"
      >
        <MessageSquare size={28} className="transition-transform group-hover:rotate-6" />
      </a>

      {/* Booking Appointment Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        designers={activeDesigners}
        onSuccess={handleNewBooking}
      />

      {/* CRM/Solicitudes Management Sliding Drawer Panel */}
      <SolicitudesPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        designers={activeDesigners}
      />
    </div>
  );
}

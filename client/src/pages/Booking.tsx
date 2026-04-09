import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, ChevronLeft, Calendar, Clock, Users, Shield, Plane, Star, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

// --- LOCAL IMAGE PATHS ---
const LOGO_URL = '/images/logo.png';

const CAR_IMAGES = {
  'e-class': '/images/mercedes-e-class.jpg',
  's-class': '/images/mercedes-s-class.jpg',
  'v-class': '/images/mercedes-v-class.jpg',
};

const BUSINESS_INFO = {
  phone: '07348748543',
  email: 'info@firstclasschauffeursoxford.co.uk',
  address: 'Banbury, Oxford',
  whatsapp: '447348748543',
};

export default function Booking() {
  const [, navigate] = useLocation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    carType: 'e-class',
    message: '',
  });

  useEffect(() => {
    document.title = 'Book Your Ride | First Class Chauffeurs Oxford';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- EMAILJS CONFIGURATION ---
    const SERVICE_ID = "service_1yielts";
    const TEMPLATE_ID = "template_ghjt4tc";
    const PUBLIC_KEY = "4fv8Zk2sLpOAsxA8N";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        pickup: formData.pickup,
        destination: formData.destination,
        date: formData.date,
        time: formData.time,
        car_type: formData.carType,
        message: formData.message || "No additional message",
        submission_time: new Date().toLocaleString(),
      }, PUBLIC_KEY);

      toast.success('Booking request sent successfully! We will contact you shortly.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        pickup: '',
        destination: '',
        date: '',
        time: '',
        carType: 'e-class',
        message: '',
      });
      
      // Optional: Redirect back to home after a delay
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('EmailJS Booking Error:', error);
      toast.error('Failed to send booking. Please call us directly at 07348748543.');
    }
  };

  // --- SMART EMAIL LINK GENERATOR ---
  const getMailtoLink = () => {
    const subject = encodeURIComponent("Booking Inquiry - First Class Chauffeurs Oxford");
    const body = encodeURIComponent(
      "Hello First Class Chauffeurs,\n\n" +
      "I would like to inquire about a booking with the following details:\n\n" +
      "Name: \n" +
      "Phone: \n" +
      "Pickup: \n" +
      "Destination: \n" +
      "Date & Time: \n" +
      "Vehicle Type: \n\n" +
      "Additional Info: \n\n" +
      "Thank you."
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg shadow-sm border-b border-border">
        <div className="container flex items-center justify-between h-28 md:h-32 px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <img src={LOGO_URL} alt="Logo" className="h-28 md:h-32 w-auto" />
          <div className="w-20 hidden sm:block" /> {/* Spacer */}
        </div>
      </header>

      <main className="container pt-10 md:pt-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Reservation</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Book Your Chauffeur</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fill out the form below to request a booking. Our team will review your request and confirm availability shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Section */}
            <Card className="lg:col-span-2 p-6 md:p-8 border-border/50 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2">
                    <Users className="w-5 h-5 text-accent" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="07123 456789"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2">
                    <Plane className="w-5 h-5 text-accent" /> Journey Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          required
                          type="text"
                          placeholder="Address, Airport, or Station"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                          value={formData.pickup}
                          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          required
                          type="text"
                          placeholder="Address, Airport, or Station"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          required
                          type="date"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          required
                          type="time"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2">
                    <Shield className="w-5 h-5 text-accent" /> Vehicle Selection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.keys(CAR_IMAGES).map((type) => (
                      <div
                        key={type}
                        onClick={() => setFormData({ ...formData, carType: type })}
                        className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${formData.carType === type ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-secondary">
                          <img src={CAR_IMAGES[type as keyof typeof CAR_IMAGES]} alt={type} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-bold uppercase text-center tracking-widest">{type.replace('-', ' ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Any special requests or luggage details?"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-7 rounded-xl text-base font-bold uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg">
                  Request Booking
                </Button>
              </form>
            </Card>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="p-6 border-border/50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" /> Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is available 24/7 to assist with your booking or any special requirements.
                </p>
                <div className="space-y-3">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-accent transition-colors">
                    <Phone className="w-4 h-4" /> {BUSINESS_INFO.phone}
                  </a>
                  <a href={getMailtoLink()} className="flex items-center gap-3 text-sm font-medium text-accent hover:underline transition-colors">
                    <Mail className="w-4 h-4" /> {BUSINESS_INFO.email}
                  </a>
                </div>
              </Card>

              <Card className="p-6 border-border/50 bg-accent/5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" /> Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Professional Chauffeurs',
                    'Punctual & Reliable',
                    'Luxury Mercedes Fleet',
                    'Fixed Competitive Rates',
                    '24/7 Customer Support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium">
                      <CheckCircle className="w-3 h-3 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 p-3.5 rounded-full bg-accent text-accent-foreground shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
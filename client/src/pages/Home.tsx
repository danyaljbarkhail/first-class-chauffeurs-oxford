import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, ChevronUp, MessageCircle, Star, ArrowRight, Clock, Users, Shield, Plane, PartyPopper, Package, Menu, X, Sun, Moon, CheckCircle } from 'lucide-react';
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

const HERO_IMAGES = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

const BUSINESS_INFO = {
  phone: '07348748543',
  email: 'info@firstclasschauffeursoxford.co.uk',
  address: 'Banbury, Oxford',
  whatsapp: '447348748543',
};

const SERVICES = [
  { title: 'Business Travel', description: 'Tailored for corporate travelers worldwide, we ensure smooth transportation for executives to airports, hotels, and conferences.', icon: Users },
  { title: 'Airport Transfers', description: 'Comfortable and timely transfers to major UK airports, including Heathrow and Gatwick, ensuring a relaxing journey.', icon: Plane },
  { title: 'Cotswolds Tours', description: 'Explore the picturesque landscapes of the Cotswolds with our bespoke chauffeur-driven tours in luxurious comfort.', icon: Clock },
  { title: 'Wedding Service', description: 'Arrive in elegance on your big day with our luxurious wedding car service, complete with ribbons and bows.', icon: Shield },
  { title: 'Special Events', description: 'Whether it\'s a night out or a corporate event, our chauffeurs ensure you and your guests arrive in style and comfort.', icon: PartyPopper },
  { title: 'Courier Services', description: 'Fast and reliable courier services for secure transportation of packages and documents across the UK.', icon: Package },
];

const TESTIMONIALS = [
  { name: 'John Smith', role: 'Business Executive', text: 'Exceptional service! Always professional and reliable. The drivers are courteous and the vehicles are immaculate.', rating: 5 },
  { name: 'Sarah Johnson', role: 'Wedding Planner', text: 'Made our wedding day perfect! The limousine was beautifully decorated and arrived on time. Highly recommended.', rating: 5 },
  { name: 'Michael Chen', role: 'Corporate Manager', text: 'Consistently excellent service for all our airport transfers. Professional drivers and immaculate vehicles.', rating: 5 },
  { name: 'Emma Williams', role: 'Travel Consultant', text: 'Outstanding Cotswolds tour experience! Knowledgeable chauffeur, luxurious car, and seamless journey.', rating: 5 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

export default function Home() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [contactForm, setContactForm] = useState({ fullName: '', email: '', phone: '', subject: '', message: '' });

  const servicesView = useInView();
  const fleetView = useInView();
  const testimonialsView = useInView();
  const contactView = useInView();

  useEffect(() => {
    document.title = 'First Class Chauffeurs Oxford | Luxury Service';
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroImageIndex((p) => (p + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const SERVICE_ID = "service_6b6d1iq";
    const TEMPLATE_ID = "template_suztizr";
    const PUBLIC_KEY = "4fv8Zk2sLpOAsxA8N";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        full_name: contactForm.fullName,
        email: contactForm.email,
        phone: contactForm.phone,
        subject: contactForm.subject,
        message: contactForm.message,
        submission_time: new Date().toLocaleString(),
      }, PUBLIC_KEY);

      toast.success('Message sent successfully! We will get back to you soon.');
      setContactForm({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Contact Error:', error);
      toast.error('Failed to send message. Please try again or call us directly.');
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const NAV_ITEMS = ['home', 'services', 'fleet', 'about', 'contact'];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between h-20 md:h-24 px-4">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="First Class Chauffeurs Oxford" className="h-20 md:h-24 w-auto" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-sm font-medium capitalize text-foreground/70 hover:text-accent transition-colors duration-200">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button onClick={() => navigate('/booking')} className="hidden sm:flex bg-accent hover:bg-accent/90 text-accent-foreground text-sm px-5 h-9 rounded-full">
              Book Now
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-full hover:bg-secondary transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 border-b border-border' : 'max-h-0'}`}>
          <nav className="container py-4 space-y-1 px-4">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="block w-full text-left px-4 py-2.5 capitalize text-sm font-medium hover:bg-secondary rounded-lg transition-colors">
                {item}
              </button>
            ))}
            <Button onClick={() => { navigate('/booking'); setMobileMenuOpen(false); }} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2 rounded-full">
              Book Now
            </Button>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section id="home" className="relative h-[100svh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" loading={idx === 0 ? 'eager' : 'lazy'} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>
          ))}
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 font-light animate-fade-in">Premium Chauffeur Service</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              First Class Chauffeurs <span className="text-accent">Oxford</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Reliable, elegant, and tailored to your needs. Experience luxury travel across Oxford and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <Button onClick={() => navigate('/booking')} className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-5 text-base rounded-full transition-transform hover:scale-105 active:scale-95">
                Book a Ride
              </Button>
              <Button onClick={() => scrollTo('services')} variant="outline" className="px-8 py-5 text-base rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent">
                Our Services
              </Button>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-8 flex gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button key={idx} onClick={() => setHeroImageIndex(idx)} className={`rounded-full transition-all duration-300 ${idx === heroImageIndex ? 'bg-accent w-8 h-2' : 'bg-white/40 w-2 h-2 hover:bg-white/60'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-accent text-accent-foreground py-6">
        <div className="container grid grid-cols-3 gap-2 text-center px-4">
          {[{ n: '500+', l: 'Happy Clients' }, { n: '24/7', l: 'Available' }, { n: '10+', l: 'Years Experience' }].map((s, i) => (
            <div key={i}>
              <div className="text-lg md:text-2xl font-bold">{s.n}</div>
              <div className="text-[10px] md:text-sm opacity-80 uppercase tracking-tighter md:tracking-normal">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 md:py-28" ref={servicesView.ref}>
        <div className="container px-4">
          <div className={`text-center mb-14 transition-all duration-700 ${servicesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          </div>

          {/* Mobile Swappable View for Services */}
          <div className="md:hidden overflow-x-auto flex gap-4 pb-8 snap-x no-scrollbar">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="min-w-[80vw] snap-center group p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          {/* Desktop Grid View for Services */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className={`group p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-500 ${servicesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FLEET PREVIEW ─── */}
      <section id="fleet" className="py-20 md:py-28 bg-secondary/30" ref={fleetView.ref}>
        <div className="container px-4">
          <div className={`text-center mb-14 transition-all duration-700 ${fleetView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Our Vehicles</p>
            <h2 className="text-3xl md:text-4xl font-bold">The Fleet</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {[
              { name: 'Mercedes E-Class', tag: 'Executive Sedan', cap: '3 passengers', image: CAR_IMAGES['e-class'] },
              { name: 'Mercedes S-Class', tag: 'Luxury Sedan', cap: '3 passengers', image: CAR_IMAGES['s-class'] },
              { name: 'Mercedes V-Class', tag: 'Luxury MPV', cap: '7 passengers', image: CAR_IMAGES['v-class'] },
            ].map((v, idx) => (
              <Card
                key={idx}
                onClick={() => navigate('/fleet')}
                className={`overflow-hidden cursor-pointer group hover:shadow-md hover:border-accent/30 transition-all duration-500 ${fleetView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">{v.name}</h3>
                  <p className="text-xs sm:text-sm text-accent font-medium mb-1">{v.tag}</p>
                  <p className="text-xs text-muted-foreground mb-4">{v.cap}</p>
                  <Button variant="outline" size="sm" className="rounded-full text-xs px-5 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => navigate('/fleet')} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
              View Full Fleet <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Chauffeur Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              First Class Chauffeurs Oxford is renowned as the leading executive chauffeur company in Oxford. We provide a first-class, professional, and reliable chauffeur service tailored to your needs. Our fleet of luxury vehicles and experienced drivers ensure you arrive at your destination in comfort and style.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Professional</h4>
                <p className="text-sm text-muted-foreground">Highest level of service to ensure you enjoy your ride</p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Safe & Discreet</h4>
                <p className="text-sm text-muted-foreground">Trust us to get you to your destination safely</p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Clean & Comfortable</h4>
                <p className="text-sm text-muted-foreground">Modern, luxurious vehicles, spotless inside and out</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28 bg-secondary/30" ref={testimonialsView.ref}>
        <div className="container px-4">
          <div className={`text-center mb-14 transition-all duration-700 ${testimonialsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </div>

          {/* Mobile Swappable View for Testimonials */}
          <div className="md:hidden overflow-x-auto flex gap-4 pb-8 snap-x no-scrollbar">
            {TESTIMONIALS.map((t, idx) => (
              <Card
                key={idx}
                className="min-w-[85vw] p-8 border-border/50 snap-center"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-base italic mb-6 text-foreground/90">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Grid View for Testimonials */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <Card
                key={idx}
                className={`p-8 border-border/50 hover:border-accent/20 transition-all duration-500 ${testimonialsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-base italic mb-6 text-foreground/90">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 md:py-28" ref={contactView.ref}>
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className={`space-y-8 transition-all duration-700 ${contactView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Have a question or need a custom quote? Fill out the form or contact us directly via phone or email. We're available 24/7 to assist you.
                </p>
              </div>

              <div className="space-y-4">
                <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Call Us</p>
                    <p className="text-base font-medium">{BUSINESS_INFO.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Us</p>
                    <p className="text-base font-medium">{BUSINESS_INFO.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Our Location</p>
                    <p className="text-base font-medium">{BUSINESS_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className={`p-8 border-border/50 shadow-lg transition-all duration-700 ${contactView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="07123 456789"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
                    <input
                      required
                      type="text"
                      placeholder="Booking Inquiry"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm resize-none"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 rounded-lg text-sm font-bold uppercase tracking-widest transition-transform active:scale-[0.98]">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-secondary/50 border-t border-border pt-16 pb-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-6">
              <img src={LOGO_URL} alt="Logo" className="h-16 w-auto" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium chauffeur services in Oxford and across the UK. Experience luxury, reliability, and professionalism with every journey.
              </p>
              <div className="flex gap-3">
                <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item)} className="text-sm text-muted-foreground hover:text-accent transition-colors capitalize">
                      {item}
                    </button>
                  </li>
                ))}
                <li><button onClick={() => navigate('/booking')} className="text-sm text-muted-foreground hover:text-accent transition-colors">Book Now</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Our Services</h4>
              <ul className="space-y-3">
                {SERVICES.slice(0, 5).map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{s.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>{BUSINESS_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span className="break-all">{BUSINESS_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} First Class Chauffeurs Oxford. All rights reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => setShowTerms(true)} className="hover:text-accent transition-colors">Terms and Conditions</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── TERMS MODAL ─── */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
              <h3 className="text-xl font-bold">Terms and Conditions</h3>
              <button onClick={() => setShowTerms(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-sm leading-relaxed space-y-4 text-muted-foreground">
              <p className="font-semibold text-foreground">Please note all reservations are made subject the following:</p>
              <ul className="space-y-4 list-disc pl-4">
                <li>Bookings cancelled with less than 24 hours notice will be required to pay the full charge of the journey.</li>
                <li>Any no - shows at the airport or other pick up points will lead to full journey charges plus additional waiting and parking costs.</li>
                <li>Prices quoted for the airport meet and greet service includes 30 minutes of waiting and parking after the flight has landed, thereafter an additional fee will be applied.</li>
                <li>Every effort is made to advise correct departure times, however we will not be held responsible for traffic delays or any other unexpected delays resulting in clients missing a flight, train or meetings etc.</li>
                <li>All our vehicles are fully insured for private hire and reward. However, the client’s property is entirely at their own risk and we shall not be held liable for any damage or loss to any such property left in the vehicle.</li>
                <li>First Class Chauffeurs Oxford reserves the right to change your vehicle or chauffeur.</li>
                <li>We will always endeavour to use our own vehicles, however, on occasions we may have to use a sub-contractor.</li>
                <li>Any damage caused to the vehicle on hire by the client, internally or externally, will be billed to the client accordingly for repairs and valeting.</li>
                <li>We will never supply your email contact details to any third party, but by emailing us you agree to First Class Chauffeurs Oxford contacting you by email or any other means.</li>
              </ul>
            </div>
            <div className="p-6 border-t border-border bg-secondary/30 text-right">
              <Button onClick={() => setShowTerms(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-300 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

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
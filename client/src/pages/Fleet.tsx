import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Users, Briefcase, Zap, Sun, Moon, ChevronDown, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513977924/fpbp6XDmn6YizWWb9uU6h9/fccologo_03639a30.png';

const VEHICLES = [
  {
    id: 1,
    name: 'Mercedes E-Class',
    type: 'Executive Sedan',
    capacity: '3 Passengers',
    luggage: '3 Pieces',
    features: ['Premium leather seating', 'Climate control', 'WiFi connectivity', 'Premium sound system', 'Complimentary refreshments'],
    description: 'Mercedes E Class is the perfect executive chauffeur car, often loved for its versatility as a great UK airports chauffeur car, seaport chauffeur car hire or for a business person requiring an effortlessly smart executive chauffeur car hire for a business meeting in London or UK Wide. Chauffeur driven Mercedes E Class is regarded as the business class chauffeur driven car of choice, which guarantees the high quality one would expect from Mercedes.',
    specs: { engine: '2.0L Turbocharged', power: '255 HP', transmission: 'Automatic', fuel: '28 MPG' },
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513977924/fpbp6XDmn6YizWWb9uU6h9/mercedes-e-class-mzpdhuTrPQyoYeHFAxNnZp.webp',
  },
  {
    id: 2,
    name: 'Mercedes S-Class',
    type: 'Luxury Sedan',
    capacity: '3 Passengers',
    luggage: '3 Pieces',
    features: ['Ultra-luxury interior', 'Advanced climate control', 'Panoramic sunroof', 'Premium entertainment system', 'Champagne service available'],
    description: 'Our Mercedes S-Class chauffeur cars are truly luxurious and stylish limousines designed to offer a comfortable and spacious experience oozing luxury inside and out. For safe chauffeur-driven journeys, the S Class is hard to beat. It\'s time to wake up to a new era of chauffeur driven, in the utmost comfort and awe-inspiring style.',
    specs: { engine: '3.0L Turbocharged', power: '362 HP', transmission: 'Automatic', fuel: '24 MPG' },
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513977924/fpbp6XDmn6YizWWb9uU6h9/mercedes-s-class-oPSy3djnTiRSkS5Q7eNNZu.webp',
  },
  {
    id: 3,
    name: 'Mercedes V-Class',
    type: 'Luxury MPV',
    capacity: '7 Passengers',
    luggage: '7 Pieces',
    features: ['Spacious interior', 'Individual climate zones', 'Premium entertainment', 'Flexible seating configuration', 'Ideal for group travel'],
    description: 'Our chauffeured Mercedes V Class people carriers offer a comfortable and spacious experience. The Mercedes V Class is the height of versatility, with ample space for up to 7 people and 7 pieces of luggage. It\'s great for business travel, airport transfers, and luxury evening hire.',
    specs: { engine: '2.0L Turbocharged', power: '224 HP', transmission: 'Automatic', fuel: '26 MPG' },
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513977924/fpbp6XDmn6YizWWb9uU6h9/mercedes-v-class-oJ6qrfcZe4XX3ukASnrgur.webp',
  },
];

export default function Fleet() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [expandedVehicle, setExpandedVehicle] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Our Fleet | First Class Chauffeurs Oxford';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-20 md:h-24">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <img src={LOGO_URL} alt="FCCO Logo" className="h-20 md:h-24 w-auto" />
          <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 md:py-16 text-center">
        <div className="container px-4">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Vehicles</p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">The Fleet</h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">Premium Mercedes vehicles maintained to the highest standards for your comfort and safety.</p>
        </div>
      </section>

      {/* Vehicles */}
      <main className="container px-4 pb-20">
        <div className="space-y-4 max-w-4xl mx-auto">
          {VEHICLES.map((vehicle, idx) => {
            const isExpanded = expandedVehicle === idx;
            return (
              <div
                key={vehicle.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-accent/30 shadow-lg bg-card'
                    : 'border-border bg-card hover:shadow-md hover:border-accent/20'
                }`}
              >
                {/* Vehicle Header - always visible */}
                <button
                  onClick={() => setExpandedVehicle(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left"
                >
                  {/* Thumbnail image instead of emoji */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold leading-tight">{vehicle.name}</h2>
                    <p className="text-xs sm:text-sm text-accent font-medium mt-0.5">{vehicle.type}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[11px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {vehicle.capacity}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {vehicle.luggage}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded Details with car image */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-4 sm:px-5 pb-5 space-y-4 border-t border-border pt-4">
                    {/* Full-width car image */}
                    <div className="w-full rounded-lg overflow-hidden bg-secondary aspect-[16/9]">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.name} - ${vehicle.type}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{vehicle.description}</p>

                    {/* Features */}
                    <div>
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent" /> Key Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {vehicle.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Shield className="w-3 h-3 text-accent flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {Object.entries(vehicle.specs).map(([key, value]) => (
                        <div key={key} className="p-2.5 sm:p-3 rounded-lg bg-secondary/50 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{key}</p>
                          <p className="text-xs sm:text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => navigate('/booking')}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-transform hover:scale-[1.02] active:scale-95 text-sm py-5"
                    >
                      Book This Vehicle
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

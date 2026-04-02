import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shovel, 
  MapPin, 
  CheckCircle2, 
  Phone,
  ArrowRight,
  Instagram,
  Facebook,
  Mail,
  Menu,
  X,
  Star,
  Users,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  HardHat,
  Sparkles,
  Quote
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

const ALL_SERVICES = [
  { 
    id: "landscape-design",
    title: "Landscape Design", 
    image: "/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg",
    desc: "Custom architectural planning and sustainable garden design for Farmers Branch homes.",
    longDesc: "As one of the leading Farmers Branch landscaping companies, our expert designers create breathtaking master plans that harmonize with your home's architecture. We specialize in native plants, aesthetic layouts, and functional outdoor living zones. Whether you're looking for a modern minimalist retreat or a lush tropical oasis, our team brings your vision to life with precision and creativity.",
    features: ["3D Rendering", "Native Plant Palette", "Master Planning", "Irrigation Integration", "Lighting Design"],
    process: [
      { title: "Consultation", desc: "We meet on-site in Farmers Branch to discuss your vision, budget, and property potential." },
      { title: "Design Phase", desc: "Detailed 2D/3D renderings showing exactly how your new yard will look." },
      { title: "Refinement", desc: "We adjust the design based on your feedback until it's perfect." }
    ]
  },
  { 
    id: "hardscaping",
    title: "Hardscaping & Patios", 
    image: "/assets/hardscaping/hardscaping-services-in-colleyville-tx-scaled.jpg",
    desc: "Premium stone work, patios, walkways, and structural outdoor elements built to last.",
    longDesc: "Transform your yard with durable, high-end stone work. As a premier landscaper in Farmers Branch, we build structural beauty that stands the test of time. From custom pavers and flagstone patios to retaining walls and outdoor kitchens, we use only the highest quality materials, ensuring your outdoor living space is as functional as it is beautiful.",
    features: ["Paver Patios", "Retaining Walls", "Flagstone Work", "Outdoor Kitchens", "Fire Pits"],
    process: [
      { title: "Excavation", desc: "Professional site prep and base layering for structural integrity." },
      { title: "Installation", desc: "Expert stone setting with precision patterns and secure bonding." },
      { title: "Finishing", desc: "Sanding, sealing, and cleanup for a pristine, long-lasting look." }
    ]
  },
  { 
    id: "drainage-solutions",
    title: "Drainage Solutions", 
    image: "/assets/drainage/drainage-solutions.jpg.webp",
    desc: "Advanced water management including French drains, gutter routing, and surface drainage.",
    longDesc: "Protect your Farmers Branch property from water damage. Our landscaping company in Farmers Branch designs and installs comprehensive drainage systems including French drains, catch basins, and gutter underground routing. Our solutions are engineered to handle Texas storms, preventing erosion, foundation issues, and swampy lawns.",
    features: ["French Drains", "Gutter Routing", "Grading Correction", "Catch Basins", "Sump Pumps"],
    process: [
      { title: "Analysis", desc: "We identify water flow patterns and problem areas during heavy rain." },
      { title: "Engineering", desc: "Designing a system with proper pitch and capacity for your home." },
      { title: "Installation", desc: "Deep-trenching and high-grade pipe installation with gravel backfill." }
    ]
  },
  { 
    id: "outdoor-lighting",
    title: "Outdoor Lighting", 
    image: "/assets/outdoor lighting/Smart_Full_Color_Lighting-min_1600x.jpg.webp",
    desc: "Professional architectural and path lighting to enhance beauty and nighttime security.",
    longDesc: "Bring your landscape to life after dark. Our low-voltage LED systems highlight architectural features, improve safety, and create an enchanting nighttime atmosphere. As a top-rated landscaper in Farmers Branch, we provide smart controls so you can manage your home's exterior ambiance directly from your phone.",
    features: ["Accent Lighting", "Path Lighting", "Smart Controls", "Moonlighting", "Security Lighting"],
    process: [
      { title: "Placement", desc: "Strategic fixture placement to highlight depth and architecture." },
      { title: "Wiring", desc: "Discrete underground wiring and transformer installation." },
      { title: "Adjustment", desc: "Night-time fine-tuning to ensure the perfect glow and shadows." }
    ]
  },
  { 
    id: "sod-installation",
    title: "Sod Installation", 
    image: "/assets/sod installtion/sod_install_argyle--2048x1365.jpg",
    desc: "Instant lawn transformation with premium Texas-grown Bermuda, St. Augustine, or Zoysia sod.",
    longDesc: "Get the lush green lawn you've always wanted instantly. Our Farmers Branch landscaping company handles everything from site prep and grading to the expert installation of fresh, local sod. Our team ensures your new lawn is perfectly leveled and ready to thrive in the North Texas climate.",
    features: ["Bermuda & Zoysia", "St. Augustine", "Full Lawn Removal", "Professional Grading", "Soil Amendment"],
    process: [
      { title: "Removal", desc: "Removing old weeds and dead grass to create a clean base." },
      { title: "Soil Prep", desc: "Tilling and adding fresh topsoil for maximum root health." },
      { title: "Installation", desc: "Tight-seam sod laying and initial deep watering." }
    ]
  },
  { 
    id: "tree-care",
    title: "Tree Planting & Care", 
    image: "/assets/tree planting/tree-planting-richmond.jpg",
    desc: "Expert tree selection, professional planting, and long-term health management.",
    longDesc: "We provide professional tree planting services, selecting the best species for your specific soil and sunlight in Farmers Branch. As a trusted landscaper in Farmers Branch, our experts ensure proper depth and technique for lifelong health, providing your property with shade, privacy, and increased value.",
    features: ["Species Selection", "Professional Planting", "Deep Root Fertilization", "Staking", "Mulching"],
    process: [
      { title: "Sourcing", desc: "We hand-select healthy specimens from premium local nurseries." },
      { title: "Preparation", desc: "Digging the perfect hole with proper soil amendments." },
      { title: "Care Plan", desc: "Providing you with a detailed watering and maintenance schedule." }
    ]
  }
];

const SERVICE_AREAS = [
  { name: "Farmers Branch", slug: "farmers-branch" },
  { name: "McKinney", slug: "mckinney" },
  { name: "Prosper", slug: "prosper" },
  { name: "Celina", slug: "celina" },
  { name: "Little Elm", slug: "little-elm" },
  { name: "Plano", slug: "plano" },
  { name: "The Colony", slug: "the-colony" },
  { name: "Aubrey", slug: "aubrey" },
  { name: "Allen", slug: "allen" },
  { name: "Fairview", slug: "fairview" },
  { name: "Melissa", slug: "melissa" },
  { name: "Anna", slug: "anna" },
  { name: "Gunter", slug: "gunter" },
  { name: "Van Alstyne", slug: "van-alstyne" },
  { name: "Pilot Point", slug: "pilot-point" },
  { name: "Sanger", slug: "sanger" },
  { name: "Denton", slug: "denton" },
  { name: "Corinth", slug: "corinth" },
  { name: "Lake Dallas", slug: "lake-dallas" },
  { name: "Hickory Creek", slug: "hickory-creek" },
  { name: "Argyle", slug: "argyle" },
  { name: "Northview", slug: "northview" },
  { name: "Lantana", slug: "lantana" },
  { name: "Double Oak", slug: "double-oak" },
  { name: "Copper Canyon", slug: "copper-canyon" },
  { name: "Highland Village", slug: "highland-village" },
  { name: "Flower Mound", slug: "flower-mound" },
  { name: "Lewisville", slug: "lewisville" },
  { name: "Carrollton", slug: "carrollton" },
  { name: "Farmers Branch", slug: "farmers-branch" },
  { name: "Addison", slug: "addison" },
  { name: "Richardson", slug: "richardson" },
  { name: "Murphy", slug: "murphy" },
  { name: "Wylie", slug: "wylie" },
  { name: "Sachse", slug: "sachse" },
  { name: "Rowlett", slug: "rowlett" },
  { name: "Rockwall", slug: "rockwall" },
  { name: "Fate", slug: "fate" },
  { name: "Royse City", slug: "royse-city" },
  { name: "Greenville", slug: "greenville" },
  { name: "Caddo Mills", slug: "caddo-mills" },
  { name: "Princeton", slug: "princeton" },
  { name: "Blue Ridge", slug: "blue-ridge" },
  { name: "Farmersville", slug: "farmersville" },
  { name: "Leonard", slug: "farmersville" },
  { name: "Trenton", slug: "trenton" },
  { name: "Whitewright", slug: "whitewright" },
  { name: "Howe", slug: "howe" },
  { name: "Sherman", slug: "sherman" },
  { name: "Denison", slug: "denison" }
];

const FAQS = [
  {
    q: "Do you offer free landscaping estimates in Farmers Branch?",
    a: "Yes! We provide free on-site consultations and detailed estimates for all residents in Farmers Branch and surrounding North Texas cities."
  },
  {
    q: "How long does a typical backyard transformation take?",
    a: "Project timelines vary. A sod installation might take 1-2 days, while a full design-build project with hardscaping and lighting can take 2-4 weeks."
  },
  {
    q: "Are you familiar with Farmers Branch HOA requirements?",
    a: "Absolutely. We work frequently with local HOAs and can provide the necessary plans and plant lists required for architectural review approval."
  },
  {
    q: "Do you handle both design and installation?",
    a: "Yes, we are a full-service design-build company. We handle everything from the initial 3D rendering to the final planting and cleanup."
  },
  {
    q: "What is the best time of year for a new landscape?",
    a: "In Farmers Branch, spring and fall are ideal for planting. However, hardscaping and drainage work can be done year-round."
  },
  {
    q: "Do you provide drainage solutions for pooling water?",
    a: "Drainage is one of our specialties. We install French drains and perform corrective grading to protect your home's foundation."
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes, Farmers Branch Landscaping is fully licensed and carries comprehensive liability and workers' compensation insurance."
  },
  {
    q: "What types of sod do you recommend for Farmers Branch?",
    a: "Bermuda is great for full sun, while St. Augustine and Zoysia are excellent for shaded areas. We'll recommend the best fit for your yard."
  },
  {
    q: "Do you offer outdoor lighting packages?",
    a: "Yes, we design and install high-quality LED low-voltage systems to highlight your home and landscape at night."
  },
  {
    q: "How do I get started?",
    a: "Simply fill out our lead form below or call us at 214-833-9151 to schedule your consultation!"
  }
];

const TESTIMONIALS = [
  {
    name: "James W.",
    location: "Farmers Branch",
    text: "The Farmers Branch Landscaping team did a phenomenal job on our stone patio and outdoor lighting. Our backyard is now our favorite part of the house!",
    stars: 5
  },
  {
    name: "Linda K.",
    location: "McKinney",
    text: "Professional, on-time, and incredibly knowledgeable. They fixed a major drainage issue we had for years and installed a beautiful new lawn.",
    stars: 5
  },
  {
    name: "Robert S.",
    location: "Prosper",
    text: "Highly recommend for any landscaping needs. Their 3D design phase really helped us visualize the project before they started digging.",
    stars: 5
  }
];

const RECENT_PROJECTS = [
  { title: "Modern Stone Patio", category: "Hardscaping", image: "/assets/hardscaping/Backyard-Hardscape-Idea-With-Outdoor-Kitchen.webp" },
  { title: "Farmers Branch Estate Design", category: "Design", image: "/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg" },
  { title: "Premium Sod Installation", category: "Lawn", image: "/assets/sod installtion/sod_install_argyle--2048x1365.jpg" },
  { title: "French Drain System", category: "Drainage", image: "/assets/drainage/drainage-solutions.jpg.webp" },
  { title: "Estate Night Lighting", category: "Lighting", image: "/assets/outdoor lighting/NSLA2B252816002B25C325972B9002Bpx2529.jpg.webp" },
  { title: "Luxury Pool Landscape", category: "Hardscaping", image: "/assets/hardscaping/Hardscapes-1024x675.jpg" }
];

// --- Scroll to Top Component ---
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// --- Service Areas Page ---

const ServiceAreasPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32 pb-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-emerald-900 font-bold uppercase tracking-widest text-sm mb-4 block">Our Reach</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">Service Areas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            We provide top-rated landscaping services to Farmers Branch and over 50 surrounding cities across the Dallas-Fort Worth metroplex.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.01 }}
            >
              <Link 
                to={`/location/${area.slug}`}
                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-800 hover:-translate-y-1 transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-800 transition-colors">
                  <MapPin className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">{area.name}</h3>
                <span className="text-xs font-bold text-gray-400 uppercase mt-2 group-hover:text-emerald-800 transition-colors">View Services</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Local SEO Content Block */}
        <div className="mt-24 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
          <h2 className="text-3xl font-black mb-6">Searching for a Top-Rated Landscaper in Farmers Branch?</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            If you're looking for professional Farmers Branch landscaping companies, you've come to the right place. We are a locally owned and operated landscaping company in Farmers Branch, TX, serving residential and commercial clients with high-end design and installation.
          </p>
          <p className="text-gray-600 leading-relaxed font-medium">
            Our team understands the specific soil conditions and climate of the North Texas area, ensuring that your investment grows and thrives for years to come. Whether you need hardscaping in McKinney or sod installation in Prosper, we are the experts you can trust.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-4 group">
            <div className="bg-emerald-800 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-100/50">
              <Sparkles className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 uppercase font-heading">Farmers Branch</span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase ml-0.5">Landscaping</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold">
            <Link to="/" onClick={handleHomeClick} className="text-gray-600 hover:text-emerald-800 transition-colors">Home</Link>
            <a href="/#services" className="text-gray-600 hover:text-emerald-800 transition-colors">Services</a>
            <Link to="/service-areas" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-emerald-800 transition-colors">Service Areas</Link>
            <a href="/#gallery" className="text-gray-600 hover:text-emerald-800 transition-colors">Portfolio</a>
            <a href="/#about" className="text-gray-600 hover:text-emerald-800 transition-colors">About Us</a>
            <div className="flex items-center gap-4">
              <a href="tel:214-833-9151" className="text-gray-900 font-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-800" /> 214-833-9151
              </a>
              <a href="/#lead-form" className="px-6 py-2.5 bg-emerald-800 text-white rounded-full hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-100">
                Get A Quote
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl"
          >
            <Link to="/" onClick={handleHomeClick} className="block font-bold text-gray-900">Home</Link>
            <a href="/#services" onClick={() => setIsOpen(false)} className="block font-bold text-gray-900">Services</a>
            <Link to="/service-areas" onClick={() => setIsOpen(false)} className="block font-bold text-gray-900">Service Areas</Link>
            <a href="/#gallery" onClick={() => setIsOpen(false)} className="block font-bold text-gray-900">Portfolio</a>
            <a href="/#about" onClick={() => setIsOpen(false)} className="block font-bold text-gray-900">About Us</a>
            <a href="tel:214-833-9151" className="block font-black text-emerald-800">214-833-9151</a>
            <a href="/#lead-form" onClick={() => setIsOpen(false)} className="block w-full py-3 bg-emerald-800 text-white rounded-xl font-bold text-center">
              Get A Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Farmers Branch's Premier Landscape Design & Build
        </span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-gray-900">
          We Build Extraordinary <br />
          <span className="text-emerald-800 underline decoration-emerald-100 underline-offset-8">Farmers Branch Outdoors</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          From custom hardscaping and stone work to professional drainage and sod installation. We transform Farmers Branch properties into high-end outdoor retreats.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#lead-form" className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 group">
            Get My Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#gallery" className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
            View Our Work
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold"><Users className="w-5 h-5 text-emerald-800"/> 500+ Local Projects</div>
          <div className="flex items-center gap-2 font-bold"><CheckCircle2 className="w-5 h-5 text-emerald-800"/> Fully Insured</div>
          <div className="flex items-center gap-2 font-bold"><Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/> 5.0/5 Star Reputation</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-20 w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <img 
          src="/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg" 
          alt="High-End Landscape Design in Farmers Branch TX" 
          className="w-full h-[600px] object-cover"
        />
      </motion.div>
    </div>
  </section>
);

const AboutUs = () => (
  <section id="about" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img 
            src="/assets/landscape design/DSC_1803-landscape-2038969fa6c2d9b279503decfcc00863-6052660cd835c.jpg" 
            alt="Farmers Branch Landscaping Crew" 
            className="rounded-[3rem] shadow-2xl relative z-10"
          />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full -z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100/50 rounded-full -z-0"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Expert Landscaping in <br/><span className="text-emerald-800">Farmers Branch, Texas</span></h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
            Farmers Branch Landscaping is a locally owned and operated design-build company dedicated to creating stunning outdoor environments. We understand the specific soil conditions and climate challenges unique to the Farmers Branch, McKinney, and Prosper area.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
            From modern stone work to native sustainable planting, our team of experts ensures every project is built to the highest standard. We take pride in our 5-star reputation and our commitment to the Farmers Branch community.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="text-3xl font-black text-emerald-800 mb-1">10+</div>
              <div className="text-sm font-bold text-gray-400 uppercase">Years Experience</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="text-3xl font-black text-emerald-800 mb-1">100%</div>
              <div className="text-sm font-bold text-gray-400 uppercase">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const RecentWork = () => (
  <section id="gallery" className="py-24 bg-gray-50/50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Recent Transformations</h2>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Take a look at some of our favorite landscaping projects completed recently in the Farmers Branch area.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {RECENT_PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</span>
              <h4 className="text-white text-2xl font-black">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-16">
        <button className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
          View All Portfolio
        </button>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4 block">Happy Clients</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What People Are Saying</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative"
          >
            <Quote className="absolute top-8 right-8 w-12 h-12 text-emerald-800/10" />
            <div className="flex gap-1 mb-6">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
            <div>
              <h4 className="font-black text-gray-900 text-lg">{t.name}</h4>
              <span className="text-emerald-800 font-bold text-sm">{t.location}, TX</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
          <div className="bg-emerald-800 p-12 md:p-20 text-white flex flex-col justify-between order-2 md:order-1">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Get Your Free Farmers Branch Estimate</h2>
              <p className="text-emerald-50 text-lg font-medium mb-12 leading-relaxed opacity-90">
                Ready to transform your outdoor space? Fill out our form or give us a call to schedule your professional consultation today.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">Direct Line</div>
                    <a href="tel:214-833-9151" className="text-2xl font-black hover:text-emerald-300 transition-colors">214-833-9151</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">Headquarters</div>
                    <div className="text-2xl font-black">Farmers Branch, Texas</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-800 transition-all cursor-pointer border border-white/10"><Instagram className="w-5 h-5"/></div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-800 transition-all cursor-pointer border border-white/10"><Facebook className="w-5 h-5"/></div>
              </div>
            </div>
          </div>
          <div id="lead-form" className="p-0 h-[700px] md:h-auto order-1 md:order-2">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { icon: MessageSquare, title: "Consultation", desc: "Detailed on-site meeting to understand your goals and budget." },
    { icon: Shovel, title: "Design Phase", desc: "Professional 3D planning and visualization of your new landscape." },
    { icon: HardHat, title: "Construction", desc: "Expert build-out with clear communication and clean job sites." },
    { icon: Sparkles, title: "Completion", desc: "A final walkthrough to ensure every detail is perfect." }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4 block">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Design-Build Process</h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            We follow a proven workflow to ensure your Farmers Branch landscaping project is completed flawlessly.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-emerald-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-black text-gray-200">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Farmers Branch Landscaping FAQ</h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Common questions from North Texas homeowners about our services.
          </p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-gray-900">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", activeIndex === i && "rotate-180")} />
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Professional Services</h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              We handle every aspect of your outdoor environment, from the foundation up.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_SERVICES.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="h-56 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.features.slice(0, 3).map(f => (
                    <span key={f} className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/location/farmers-branch/${s.id}`}
                  className="text-emerald-800 font-bold flex items-center gap-2 hover:gap-4 transition-all"
                >
                  Service Details <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  return (
    <section id="areas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4 block">Service Area</span>
        <h2 className="text-4xl font-black mb-12">Proudly Serving Farmers Branch & Surroundings</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                to={`/location/${area.slug}`}
                className="px-8 py-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:border-emerald-800 hover:text-emerald-800 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" /> {area.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Dynamic Location Page ---

const LocationPage = () => {
  const { city } = useParams();
  const location = SERVICE_AREAS.find(a => a.slug === city);
  const cityName = location?.name || city?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 rounded-full">
              <MapPin className="w-3 h-3" /> Serving {cityName}, TX
            </span>
            <h1 className="text-6xl font-black mb-8 leading-[1.1]">
              Expert Landscaping in <br/><span className="text-emerald-800">{cityName}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
              We provide professional landscape design, stone work, and yard maintenance services specifically tailored for the soil and sun conditions in {cityName}.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {["Local Farmers Branch Experts", "Custom Design Plans", "Top-Tier Workmanship", "5-Star Reputation"].map(t => (
                <div key={t} className="flex items-center gap-3 font-bold text-gray-800 bg-gray-50 p-4 rounded-xl">
                  <CheckCircle2 className="text-emerald-700 w-5 h-5 flex-shrink-0" /> {t}
                </div>
              ))}
            </div>
            <a href="#lead-form" className="inline-block px-10 py-5 bg-emerald-800 text-white rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-100 text-center">
              Request {cityName} Estimate
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[550px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group"
          >
            <img 
              src="/assets/river rock/landscape-design-front-yard-landscaping-houston-tx-77407.jpg" 
              alt="Farmers Branch Landscaping" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Local Services for this Location */}
        <div className="mb-24">
          <h2 className="text-4xl font-black mb-12 text-center">Landscaping Solutions for {cityName}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((s, i) => (
              <Link to={`/location/${city}/${s.id}`} key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group h-full flex flex-col"
                >
                  <div className="h-64 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                    <div className="text-emerald-800 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      View Service Details <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ContactSection />
    </motion.div>
  );
};

// --- SEO Content Generator Component ---

const ServiceSEOContent = ({ serviceId, cityName }: { serviceId: string, cityName: string }) => {
  const content: Record<string, React.ReactNode> = {
    "landscape-design": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Premier Landscape Design in {cityName}, TX</h2>
        <p className="mb-8">
          When it comes to elevating the aesthetic and functional value of your property, finding the right **landscaping company in {cityName}** is the most critical step. At Farmers Branch Landscaping, we specialize in high-end architectural landscape design that transforms ordinary yards into extraordinary outdoor retreats. Our team of expert designers understands that your home is your sanctuary, and we are dedicated to creating a master plan that reflects your personal style while harmonizing with the unique North Texas environment.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Art of Professional Landscaping in {cityName}</h3>
        <p className="mb-6">
          Choosing a **landscaper in {cityName}** shouldn't just be about finding someone to plant trees; it should be about finding a partner who understands spatial design, soil health, and long-term sustainability. Our design process begins with a comprehensive site analysis. We study the way sunlight hits your property, the existing drainage patterns, and the architectural lines of your home. This data-driven approach allows us to create 3D renderings that aren't just beautiful—they are feasible and built to last.
        </p>
        <p className="mb-6">
          As one of the most trusted **Farmers Branch landscaping companies**, we pride ourselves on our deep knowledge of local flora. We select plants that thrive in the specific heat and humidity of {cityName}, focusing on native and well-adapted species that require less water and maintenance while providing maximum visual impact. From lush perennial borders to structural evergreens, every plant is chosen for its ability to perform in our local clay soils.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Why {cityName} Homeowners Choose Our Design-Build Firm</h3>
        <p className="mb-6">
          Our reputation as a top **landscaping company in {cityName}** comes from our commitment to quality. We don't just hand you a plan and walk away. As a design-build firm, we oversee every aspect of the project from the first sketch to the final planting. This ensures that the integrity of the design is maintained throughout the installation process. 
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Architectural Master Planning:</strong> We create cohesive layouts that connect your indoor and outdoor living spaces.</li>
          <li><strong>Native Plant Selection:</strong> Expertise in species that thrive in the {cityName} climate.</li>
          <li><strong>3D Visualizations:</strong> See your project before we ever break ground.</li>
          <li><strong>Sustainable Practices:</strong> We focus on soil health and water-efficient designs.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed Breakdown of Our Landscape Design Services</h3>
        <p className="mb-6">
          Our services go beyond simple garden beds. We consider the entire ecosystem of your property. This includes privacy screening using mature trees, the creation of focal points using specimen plantings, and the integration of functional elements like walkways and lighting. When you search for **Farmers Branch landscaping companies**, you're looking for a team that can handle complexity, and that's exactly what we provide.
        </p>
        <p className="mb-6">
          In {cityName}, we have seen a significant shift toward outdoor living. Homeowners want "outdoor rooms"—spaces where they can cook, relax, and entertain. Our design team excels at creating these transitions, using hardscaping and softscaping in tandem to define spaces without building walls. Whether it's a cozy fire pit area or a sprawling poolside landscape, we ensure the design feels organic and intentional.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Investing in Your Property with the Best Landscaper in {cityName}</h3>
        <p className="mb-6">
          Landscaping is one of the few home improvements that actually appreciates over time. A well-designed landscape grows more beautiful and valuable every year. By hiring a professional **landscaping company in {cityName}**, you are making a strategic investment in your home's curb appeal and resale value. More importantly, you're investing in your own quality of life.
        </p>
        <p className="mb-12">
          Ready to get started? If you're looking for the best **landscaper in {cityName}**, look no further. Contact Farmers Branch Landscaping today for a free on-site consultation. Let us show you why we are the preferred choice for homeowners across {cityName} and the DFW metroplex. We don't just build yards; we build legacies.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Importance of Soil Preparation in {cityName}</h3>
        <p className="mb-6">
          One of the biggest mistakes other **Farmers Branch landscaping companies** make is skipping the foundation. In {cityName}, our heavy clay soil can be a challenge for many plant species. Our design process includes a detailed soil amendment strategy. We don't just dig a hole; we prepare the earth. We use high-quality organic compost and expanded shale to improve drainage and aeration, giving your plants the best possible start.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Irrigation and Water Management</h3>
        <p className="mb-6">
          Water is a precious resource in North Texas. Any reputable **landscaping company in {cityName}** must prioritize water efficiency. Our designs incorporate smart irrigation technology, including drip zones for beds and weather-based controllers. We also utilize mulching techniques that retain moisture and suppress weeds, ensuring your landscape stays healthy even during the heat of a {cityName} summer.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Year-Round Interest and Seasonal Color</h3>
        <p className="mb-6">
          A truly great landscape should look stunning in every season. We design for year-round interest, selecting plants that offer spring blooms, lush summer foliage, vibrant fall color, and structural winter interest. When you work with a premier **landscaper in {cityName}**, you get a yard that evolves with the calendar. We can even provide seasonal color rotations, ensuring your entryways and focal points are always popping with fresh blooms.
        </p>
      </div>
    ),
    "hardscaping": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Luxury Hardscaping & Stone Work in {cityName}, TX</h2>
        <p className="mb-8">
          If you are searching for a **landscaper in {cityName}** who specializes in structural beauty, you've come to the right place. Hardscaping is the backbone of any great outdoor space. At Farmers Branch Landscaping, we provide premium stone work, patios, and outdoor structures that define your yard and provide the foundation for all your outdoor activities. As a leading **landscaping company in {cityName}**, we use only the highest grade materials to ensure your investment lasts for decades.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Patio Design and Installation in {cityName}</h3>
        <p className="mb-6">
          The patio is the heart of the backyard. Whether you prefer the classic look of flagstone or the modern clean lines of pavers, our team has the expertise to deliver. Many **Farmers Branch landscaping companies** cut corners on the base, but we know that in {cityName}, the shifting clay soil requires a reinforced foundation. We excavate to the proper depth and use compacted road base and sand to ensure your patio stays level and beautiful for years.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Retaining Walls and Structural Stone Work</h3>
        <p className="mb-6">
          With the rolling terrain often found in {cityName}, retaining walls are often a necessity rather than just a design choice. We build walls that are as beautiful as they are functional. Using natural stone or engineered blocks, we can create terraced gardens, level play areas, or sitting walls that add extra seating to your patio area. When you hire us as your **landscaping company in {cityName}**, you're getting engineers and craftsmen in one team.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Outdoor Kitchens and Living Spaces</h3>
        <p className="mb-6">
          Take your grilling to the next level with a custom outdoor kitchen. As a top-rated **landscaper in {cityName}**, we design fully functional kitchens complete with built-in grills, refrigerators, pizza ovens, and granite countertops. These spaces become the focal point of summer gatherings in {cityName}, allowing you to enjoy the outdoors while having all the conveniences of your indoor kitchen.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Fire Pits and Outdoor Fireplaces</h3>
        <p className="mb-6">
          There's nothing quite like a cool {cityName} evening spent around a fire. We design and install custom stone fire pits and grand outdoor fireplaces that extend the usability of your backyard into the winter months. Whether you want a rustic wood-burning pit or a convenient gas-powered feature, we ensure it's built safely and matches the overall aesthetic of your landscape.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Hardscaping is Essential for {cityName} Homes</h3>
        <p className="mb-6">
          Hardscaping provides the structure that softscaping (plants) can't. It solves drainage issues, creates level ground on sloped lots, and reduces maintenance by replacing thirsty lawn areas with beautiful, functional stone. When you search for **Farmers Branch landscaping companies**, make sure you choose one with a dedicated hardscape crew. Our artisans are specialists in their craft, ensuring every joint is tight and every stone is perfectly placed.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-Term Value and Durability</h3>
        <p className="mb-6">
          High-quality hardscaping is one of the best ways to increase your home's value in {cityName}. It expands your living square footage and creates a "wow" factor that sets your home apart. We stand behind our work with industry-leading warranties, giving you peace of mind that your new patio or wall is built to withstand the {cityName} climate. Contact us today to start designing your dream hardscape.
        </p>
      </div>
    ),
    "drainage-solutions": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Advanced Drainage Solutions in {cityName}, TX</h2>
        <p className="mb-8">
          Water management is the most overlooked aspect of property maintenance until it's too late. As a specialized **landscaping company in {cityName}**, we understand that our local heavy rains and clay soil can lead to devastating foundation issues and erosion. If you've noticed pooling water or swampy areas, you need a professional **landscaper in {cityName}** who understands the science of drainage.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">French Drains and Catch Basins in {cityName}</h3>
        <p className="mb-6">
          French drains are one of the most effective ways to move water away from your home's foundation. Our team uses high-capacity NDS pipes and premium gravel to create a subterranean channel that intercepts water before it reaches your structure. As a leading **landscaping company in {cityName}**, we don't just "dig a ditch"—we calculate the proper slope and discharge point to ensure the water actually leaves your property.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Gutter Underground Routing</h3>
        <p className="mb-6">
          Gutters are great at collecting water, but if the downspout just dumps it at the base of your house, it's not solving the problem. We specialize in underground downspout extensions that carry roof water safely away from your home. This is a critical service offered by professional **Farmers Branch landscaping companies** to protect your foundation and prevent basement or crawlspace flooding in {cityName}.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Corrective Grading and Surface Drainage</h3>
        <p className="mb-6">
          Sometimes the solution isn't a pipe—it's the ground itself. We use laser-leveling technology to perform corrective grading, ensuring that your entire yard slopes away from your home. This might involve creating swales or berms that redirect water flow. As a top **landscaper in {cityName}**, we look at the big picture of how water moves across your land and the surrounding {cityName} properties.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Protecting Your Investment in {cityName}</h3>
        <p className="mb-6">
          The cost of a drainage system is a fraction of the cost of foundation repair. By hiring an expert **landscaping company in {cityName}** to fix your drainage now, you're saving yourself thousands of dollars and immense stress in the future. We provide custom-engineered solutions for every property, ensuring your yard stays dry and your home stays safe.
        </p>
      </div>
    ),
    "outdoor-lighting": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Professional Outdoor Lighting Design in {cityName}, TX</h2>
        <p className="mb-8">
          A beautiful landscape shouldn't disappear when the sun goes down. At Farmers Branch Landscaping, we are a **landscaping company in {cityName}** that specializes in architectural and landscape lighting. Our professional LED systems are designed to enhance the beauty of your home, improve security, and extend the usability of your outdoor spaces long into the night.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Enhancing Beauty with Accent Lighting</h3>
        <p className="mb-6">
          We use strategic "uplighting" to highlight the texture of your home's brick or stone and the structure of your specimen trees. As a premier **landscaper in {cityName}**, our goal is to create depth and drama without creating glare. We focus on the "effect," not the "fixture," ensuring your {cityName} home looks its absolute best after dark.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Path Lighting and Security</h3>
        <p className="mb-6">
          Safety is just as important as aesthetics. Our path lighting ensures that walkways, stairs, and driveways are well-lit, preventing trips and falls. Furthermore, a well-lit home is a major deterrent for intruders. When searching for **Farmers Branch landscaping companies**, choose one that understands how to balance safety with subtle, elegant design.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Controls and LED Efficiency</h3>
        <p className="mb-6">
          Our lighting systems in {cityName} are built with the latest technology. We use high-efficiency LED bulbs that use 80% less energy than traditional halogen bulbs. Plus, our smart controllers allow you to manage your lights from your phone, set schedules, and even change colors for holidays. As a modern **landscaping company in {cityName}**, we bring the latest innovations to your doorstep.
        </p>
      </div>
    ),
    "sod-installation": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Instant Lawns: Professional Sod Installation in {cityName}, TX</h2>
        <p className="mb-8">
          Stop waiting for grass to grow. As the leading **landscaping company in {cityName}**, we provide instant lawn transformations using high-quality, locally grown sod. Whether you're dealing with a patchy lawn, new construction, or just want a fresh start, our professional sod installation service is the fastest way to get a lush, green yard in {cityName}.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Importance of Proper Prep in {cityName}</h3>
        <p className="mb-6">
          Anyone can lay a piece of sod, but only a professional **landscaper in {cityName}** can make it thrive. Our process begins with the complete removal of your old grass and weeds. We then till the soil and add fresh topsoil and amendments tailored for {cityName}'s clay. This foundation is what separates us from other **Farmers Branch landscaping companies**.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Selecting the Right Turf for Your {cityName} Yard</h3>
        <p className="mb-6">
          Not all grass is created equal. We'll help you choose between Bermuda (perfect for full sun), St. Augustine (excellent for shade), or Zoysia (the premium "Mercedes of grass"). We source our sod from local Texas farms to ensure it's acclimated to the {cityName} heat and humidity.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Care and Success</h3>
        <p className="mb-6">
          We don't just install and leave. We provide you with a detailed 30-day watering schedule and maintenance guide. As your partner and **landscaping company in {cityName}**, we want your new lawn to be a success for years to come. Contact us today for a free quote on your instant lawn.
        </p>
      </div>
    ),
    "tree-care": (
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Professional Tree Planting & Care in {cityName}, TX</h2>
        <p className="mb-8">
          Trees are the most valuable assets in your landscape. At Farmers Branch Landscaping, we are a **landscaping company in {cityName}** dedicated to the health and longevity of your trees. From selecting the right species for the North Texas climate to professional planting and deep root fertilization, we are the **landscaper in {cityName}** you can trust with your living canopy.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Selecting Climate-Appropriate Trees for {cityName}</h3>
        <p className="mb-6">
          In {cityName}, we need trees that can handle intense sun and occasional freezes. We specialize in native oaks, elms, and cedars that are built for our environment. Our experts help you choose trees that provide the right amount of shade, privacy, or ornamental beauty for your specific lot.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Planting Technique</h3>
        <p className="mb-6">
          Most tree failures are due to improper planting. As a top-rated **landscaping company in {cityName}**, we ensure every tree is planted at the correct depth with a wide, flared hole and proper soil amendments. We also provide initial staking and mulching to protect the young root system.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Management and Fertilization</h3>
        <p className="mb-6">
          Our care doesn't stop at planting. We offer deep root fertilization services that bypass the grass and deliver nutrients directly to the tree's roots. This is essential in {cityName}'s compacted soils. When looking at **Farmers Branch landscaping companies**, choose one that understands the long-term biological needs of your trees.
        </p>
      </div>
    )
  };

  return content[serviceId] || <div>Content coming soon for {cityName}...</div>;
};

// --- Dynamic Service Location Page ---

const ServiceLocationPage = () => {
  const { city, serviceId } = useParams();
  const service = ALL_SERVICES.find(s => s.id === serviceId);
  const location = SERVICE_AREAS.find(a => a.slug === city);
  const cityName = location?.name || city?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Farmers Branch';

  if (!service || !serviceId) return <div>Service not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        <Link to={`/location/${city}`} className="inline-flex items-center gap-2 text-emerald-800 font-bold mb-8 hover:gap-4 transition-all">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to {cityName}
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-16 items-start mb-24">
          <div className="lg:col-span-2">
            <h1 className="text-6xl font-black mb-6 leading-tight">
              {service.title} <br/>
              <span className="text-emerald-800">in {cityName}, TX</span>
            </h1>
            
            {/* SEO Content Injection */}
            <div className="mt-12">
              <ServiceSEOContent serviceId={serviceId} cityName={cityName} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 my-12">
              {service.features.map(f => (
                <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <CheckCircle2 className="text-emerald-800 w-5 h-5" /> {f}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="relative">
              <img src={service.image} className="w-full rounded-[3rem] shadow-2xl" alt={`${service.title} in ${cityName}`} />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-50">
                <div className="flex items-center gap-3 text-emerald-800 font-black text-2xl">
                  <Star className="fill-emerald-800 text-emerald-800" /> 5.0/5
                </div>
                <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">Client Rating</div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black mb-6">Free {cityName} Quote</h3>
              <p className="text-gray-500 font-medium mb-8">Schedule your professional {service.title.toLowerCase()} consultation today.</p>
              <a href="#lead-form" className="w-full py-6 bg-emerald-800 text-white rounded-2xl font-black text-xl hover:bg-emerald-900 transition-all shadow-2xl flex items-center justify-center gap-3">
                Get Quote <ArrowRight />
              </a>
            </div>
            
            <div className="bg-gray-900 p-12 rounded-[3rem] text-white">
              <h3 className="text-2xl font-bold mb-8">Our {service.title} Workflow</h3>
              <div className="space-y-8">
                {service.process.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center font-black flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </motion.div>
  );
};

// --- Main App ---

function LeadForm() {
  const [formData, setFormData] = React.useState({ name: '', phone: '', address: '', budget: '', message: '' });
  const [status, setStatus] = React.useState('idle');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://app.lowkly.com/api/webhooks/leads/q3fp5i6sogd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, phone: formData.phone, address: formData.address,
          budget: formData.budget, message: formData.message,
          source: window.location.hostname, sourceUrl: window.location.href,
        }),
      });
      if (res.ok) { setStatus('success'); setFormData({ name: '', phone: '', address: '', budget: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div className="flex items-center justify-center p-8 min-h-[400px]">
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="opacity-80">We've received your request and will be in touch shortly.</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold mb-1">Get Your Free Estimate</h3>
      <p className="opacity-70 mb-4">Fill out the form and we'll get back to you within 24 hours.</p>
      <input type="text" required placeholder="Full Name *" value={formData.name}
        onChange={(e: any) => setFormData({...formData, name: e.target.value})}
        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur focus:ring-2 focus:ring-white/30 outline-none transition placeholder-white/50 text-white" />
      <input type="tel" required placeholder="Phone Number *" value={formData.phone}
        onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur focus:ring-2 focus:ring-white/30 outline-none transition placeholder-white/50 text-white" />
      <input type="text" required placeholder="Address *" value={formData.address}
        onChange={(e: any) => setFormData({...formData, address: e.target.value})}
        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur focus:ring-2 focus:ring-white/30 outline-none transition placeholder-white/50 text-white" />
      <select required value={formData.budget} onChange={(e: any) => setFormData({...formData, budget: e.target.value})}
        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur focus:ring-2 focus:ring-white/30 outline-none transition text-white">
        <option value="" className="text-black">Select Your Budget</option>
        <option value="Under $1,000" className="text-black">Under $1,000</option>
        <option value="$1,000 - $2,000" className="text-black">$1,000 - $2,000</option>
        <option value="$2,000 - $3,000" className="text-black">$2,000 - $3,000</option>
        <option value="$3,000 - $4,000" className="text-black">$3,000 - $4,000</option>
        <option value="$4,000 - $5,000" className="text-black">$4,000 - $5,000</option>
        <option value="$5,000 - $10,000" className="text-black">$5,000 - $10,000</option>
        <option value="$10,000+" className="text-black">$10,000+</option>
      </select>
      <textarea rows={3} placeholder="Tell us about your project..." value={formData.message}
        onChange={(e: any) => setFormData({...formData, message: e.target.value})}
        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur focus:ring-2 focus:ring-white/30 outline-none transition placeholder-white/50 text-white resize-none" />
      <button type="submit" disabled={status === 'sending'}
        className="w-full py-4 bg-white text-stone-800 font-bold rounded-xl hover:bg-white/90 transition disabled:opacity-50 text-lg">
        {status === 'sending' ? 'Sending...' : 'Get My Free Estimate'}
      </button>
      {status === 'error' && <p className="text-red-300 text-sm text-center">Something went wrong. Please call us directly.</p>}
    </form>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Hero />
                <AboutUs />
                <Process />
                <Services />
                <FAQSection />
                <RecentWork />
                
                {/* Stats Section */}
                <section className="py-24 bg-gray-900 text-white">
                  <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                      <div className="text-5xl md:text-6xl font-black text-emerald-700 mb-2">500+</div>
                      <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Farmers Branch Lawns</div>
                    </div>
                    <div>
                      <div className="text-5xl md:text-6xl font-black text-emerald-700 mb-2">10+</div>
                      <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Years Exp</div>
                    </div>
                    <div>
                      <div className="text-5xl md:text-6xl font-black text-emerald-700 mb-2">100%</div>
                      <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">5-Star Rated</div>
                    </div>
                    <div>
                      <div className="text-5xl md:text-6xl font-black text-emerald-700 mb-2">DFW</div>
                      <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Local Experts</div>
                    </div>
                  </div>
                </section>

                <Testimonials />
                <ServiceAreas />
                
                <section className="py-24 bg-emerald-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
                  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="text-white">
                      <h2 className="text-5xl font-black mb-8 leading-tight">The Farmers Branch <br/>Guarantee.</h2>
                      <div className="space-y-6">
                        {[
                          { q: "Fully Licensed & Insured?", a: "We carry comprehensive liability and worker's comp for your peace of mind." },
                          { q: "Farmers Branch Local Experts?", a: "We live and work here. We know Farmers Branch soil and climate better than anyone." },
                          { q: "Design-First Approach?", a: "Every project starts with a detailed plan to ensure flawless execution." }
                        ].map((faq, i) => (
                          <div key={i} className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                            <h4 className="font-bold text-xl mb-2">{faq.q}</h4>
                            <p className="text-emerald-50/80 font-medium">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src="/assets/landscape design/Farmers Branch-Landscape-Design.jpg" 
                        alt="Quality Work" 
                        className="rounded-[3rem] shadow-2xl"
                      />
                      <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl hidden md:block border border-gray-50">
                        <div className="text-4xl font-black text-emerald-800 mb-1">5.0</div>
                        <div className="text-gray-900 font-bold uppercase text-xs tracking-widest">Star Rating</div>
                      </div>
                    </div>
                  </div>
                </section>

                <ContactSection />
              </motion.div>
            } />
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/location/:city" element={<LocationPage />} />
            <Route path="/location/:city/:serviceId" element={<ServiceLocationPage />} />
          </Routes>
        </AnimatePresence>
        
        <footer className="bg-gray-900 text-white py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-4 mb-8 group text-left">
                <div className="bg-emerald-800 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-100/50">
                  <Sparkles className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase font-heading">Farmers Branch</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-emerald-500 uppercase ml-0.5">Landscaping</span>
                </div>
              </Link>
              <p className="text-gray-400 max-w-sm mb-10 font-medium text-lg leading-relaxed">
                Transforming Farmers Branch properties into extraordinary outdoor living spaces since 2014.
              </p>
              <div className="flex gap-6">
                {[Instagram, Facebook, Mail].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-800 transition-all cursor-pointer border border-white/10 group">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 font-bold">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
                <li><Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
                <li><a href="/#gallery" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="/#lead-form" className="hover:text-white transition-colors">Request Quote</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">Contact Us</h4>
              <ul className="space-y-6 text-gray-400 font-bold">
                <li className="flex items-center gap-4 text-lg">
                  <div className="w-10 h-10 bg-emerald-800/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-800" />
                  </div>
                  <a href="tel:214-833-9151" className="hover:text-white">214-833-9151</a>
                </li>
                <li className="flex items-center gap-4 text-lg">
                  <div className="w-10 h-10 bg-emerald-800/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-800" />
                  </div>
                  Farmers Branch, TX
                </li>
                <a href="#lead-form" className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest font-black text-center block">
                  Request Free Quote
                </a>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 text-center text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Farmers Branch Landscaping. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

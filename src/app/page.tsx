import fs from 'fs';
import path from 'path';
import ClientPage from '@/app/ClientPage';
import { Shield, Zap, Sparkles, Award, Camera, Plus, Mail, ArrowUpRight } from 'lucide-react';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  const lenses = products.filter((p: any) => p.category === 'Lenses');
  const accessories = products.filter((p: any) => p.category === 'Accessories');

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium animate-bounce shadow-sm">
              <Sparkles size={14} className="text-primary" />
              <span>Pro Series 4K is here</span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.9] drop-shadow-sm px-2">
              <span className="block">MASTER MOBILE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-brand-green block uppercase">PHOTOGRAPHY</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-4">
              Transform your smartphone into a professional cinema camera with our award-winning optics. Engineered for creators.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-8">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1">
                Explore Lenses
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/50 backdrop-blur-md border border-white/20 font-bold text-lg hover:bg-white/80 transition-all">
                The Tech
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic shapes */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-pulse" />
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden" id="features">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4">
            <Award size={14} />
            The Standard
          </div>
          <h2 className="text-4xl sm:text-7xl font-black tracking-tighter mb-6">WHY TUKTAK SHOP?</h2>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            We don't just sell lenses; we engineer professional-grade photography tools for the modern creator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* Main Feature - Large */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-end group cursor-default overflow-hidden relative border border-gray-100 bg-white shadow-2xl hover:shadow-primary/5 transition-all duration-700">
            <div className="absolute top-0 right-0 p-12 text-primary/5 group-hover:text-primary/10 transition-colors transform group-hover:scale-110 duration-700">
              <Shield size={320} strokeWidth={0.5} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="text-3xl sm:text-5xl font-black mb-4 tracking-tighter uppercase">Cinema-Grade <br />Optics</h3>
                <p className="text-gray-500 text-lg max-w-sm leading-relaxed font-medium">
                  Every lens is multi-coated with aerospace-grade materials to ensure zero distortion and maximum light transmission.
                </p>
              </div>
            </div>
          </div>

          {/* Instant Focus - Square */}
          <div className="rounded-[2rem] p-8 flex flex-col justify-between group cursor-default transition-all duration-500 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary relative z-10 group-hover:rotate-12 transition-transform">
              <Zap size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase mb-2 tracking-tight">Instant Focus</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Lightning fast autofocus compatibility with all devices.</p>
            </div>
          </div>

          {/* 4K Ready - Square Contrast */}
          <div className="rounded-[2rem] p-8 flex flex-col justify-between group cursor-default bg-black text-white relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white relative z-10">
              <Sparkles size={24} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase opacity-60">High Performance</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-1 tracking-tight">4K Cinema Ready</h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed">Specifically designed for 4K video capture without loss.</p>
            </div>
          </div>

          {/* Universal - Wide */}
          <div className="md:col-span-2 rounded-[2rem] p-8 flex items-center justify-between group cursor-default bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
             <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10 max-w-xs space-y-3">
               <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">Universal <br />Compatibility</h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed">Our patented clip system secures seamlessly to iPhone, Samsung, and Pixel.</p>
             </div>
             <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-6 group-hover:rotate-0 shadow-lg">
                <Camera size={36} className="transition-transform group-hover:scale-110" />
             </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section - Lenses */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-32" id="lenses">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-4">
          <div className="text-left">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4 px-2">The Lens Collection</h2>
            <p className="text-gray-500 text-base sm:text-lg px-2">World-class optics engineered for mobile storytelling.</p>
          </div>
        </div>
        <ClientPage products={lenses} />
      </section>

      {/* Testimonials Section */}
      <section className="bg-primary/5 py-24 sm:py-32 px-4 sm:px-6 lg:px-8" id="reviews">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Voices from the Field</h2>
            <p className="text-gray-500 text-lg">Trusted by photographers and creators worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Travel Content Creator", text: "The 4K Wide Angle lens changed my travel vlogs forever. The clarity is indistinguishable from my mirrorless setup." },
              { name: "Marcus T.", role: "Street Photographer", text: "Finally, a macro lens that actually captures professional-grade textures on a smartphone. Truly impressive glass." },
              { name: "Elena R.", role: "Cinematographer", text: "The anamorphic lens flares are breathtaking. Tuktak has nailed the cinematic look for mobile creators." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/5">
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, i) => <Sparkles key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="showcase">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight">
              SHOT WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">TUKTAK SHOP</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Our community is pushing the boundaries of what's possible with a smartphone. Join thousands of creators who've upgraded their optics.
            </p>
            <div className="flex gap-4">
              <div className="text-center border-r border-gray-100 pr-8">
                <div className="text-3xl font-black text-primary">500K+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Images Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-secondary">4.9/5</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rating</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
               <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-lg transform hover:-rotate-2 transition-transform duration-500">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Showcase" />
               </div>
               <div className="aspect-square bg-primary/10 rounded-3xl overflow-hidden shadow-lg transform hover:rotate-2 transition-transform duration-500">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Showcase" />
               </div>
             </div>
             <div className="space-y-4 pt-8">
               <div className="aspect-square bg-secondary/10 rounded-3xl overflow-hidden shadow-lg transform hover:rotate-2 transition-transform duration-500">
                  <img src="/products/telephoto_28x.png" className="w-full h-full object-cover scale-150" alt="Showcase" />
               </div>
               <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-lg transform hover:-rotate-2 transition-transform duration-500">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Showcase" />
               </div>
             </div>
          </div>
        </div>
      </section>

       {/* Product Grid Section - Accessories */}
       <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 sm:pb-32" id="accessories">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-4">
          <div className="text-left">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4 px-2">Pro Creator Tools</h2>
            <p className="text-gray-500 text-base sm:text-lg px-2">The essentials you need to stabilize, illuminate, and maintain.</p>
          </div>
        </div>
        <ClientPage products={accessories} />
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-gray-50 px-4 sm:px-6 lg:px-8" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-center mb-16">Reliability First</h2>
          <div className="space-y-4">
            {[
              { q: "Will these work with my phone?", a: "Yes! Our patented universal clip system is designed to fit 99% of modern smartphones, including all iPhone, Samsung Galaxy, and Google Pixel models." },
              { q: "What is your shipping time?", a: "We ship all orders within 24 hours. Standard delivery typically takes 3-5 business days depending on your location." },
              { q: "Do you offer a warranty?", a: "Absolutely. Every Tuktak product comes with a 12-month manufacturer warranty covering any defects in optics or construction." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
                  {faq.q}
                  <Plus size={18} className="text-primary" />
                </h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="pt-16 pb-8 sm:pb-10 border-t border-gray-100 relative overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 sm:gap-16 mb-12 text-left relative z-10">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2 space-y-4">
              <img src="/logo.png" alt="Tuktak Shop Logo" className="h-32 w-auto object-contain -ml-6" />
              <p className="text-gray-500 text-base leading-relaxed max-w-sm italic">
                Professional-grade optics engineered to transform your smartphone into a cinematic powerhouse.
              </p>
              <div className="flex gap-4">
                {[
                  { 
                    label: "Facebook", 
                    color: "#1877F2",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  },
                  { 
                    label: "Instagram", 
                    color: "#E4405F",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  },
                  { 
                    label: "TikTok", 
                    color: "#000000",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>
                  },
                  { 
                    label: "YouTube", 
                    color: "#FF0000",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-white transition-all hover:scale-110 shadow-sm hover:shadow-lg group/social"
                  >
                    <div className="group-hover/social:scale-110 transition-transform" style={{ color: social.color }}>
                      {social.svg}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b border-gray-100 pb-2">Collections</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li><a href="#lenses" className="hover:text-primary transition-colors flex items-center gap-2">Lenses <ArrowUpRight size={14} /></a></li>
                <li><a href="#accessories" className="hover:text-primary transition-colors flex items-center gap-2">Accessories <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Professional Kit</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b border-gray-100 pb-2">Experience</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li><a href="#showcase" className="hover:text-primary transition-colors">The Gallery</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">F.A.Q</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b border-gray-100 pb-2">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-4">
              &copy; {new Date().getFullYear()} Tuktak Shop. Advanced Rights Reserved.
            </p>
            <div className="flex gap-8 px-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

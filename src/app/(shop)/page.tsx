import { supabase } from '@/lib/supabase';
import ClientPage from './ClientPage';
import { Shield, Zap, Sparkles, Award, Camera, Plus, Mail, ArrowUpRight } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const products = productsData || [];

  const lenses = products.filter((p: any) => p.category === 'Lenses');
  const accessories = products.filter((p: any) => p.category === 'Accessories');

  const faqs = [
    { q: "Will these work with my phone?", a: "Yes! Our patented universal clip system is designed to fit 99% of modern smartphones, including all iPhone, Samsung Galaxy, and Google Pixel models." },
    { q: "What is your shipping time?", a: "We ship all orders within 24 hours. Standard delivery typically takes 3-5 business days depending on your location." },
    { q: "Do you offer a warranty?", a: "Absolutely. Every Tuktak product comes with a 12-month manufacturer warranty covering any defects in optics or construction." }
  ];

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
      <section className="py-24 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative" id="features">
        {/* Added dynamic background elements for the section */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="flex flex-col items-center text-center mb-16 sm:mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4 border border-primary/10">
            <Award size={14} />
            The Standard
          </div>
          <h2 className="text-4xl sm:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">WHY TUKTAK SHOP?</h2>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            We don't just sell lenses; we engineer professional-grade photography tools for the modern creator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* Main Feature - Large */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-end group cursor-default overflow-hidden relative border border-gray-100 bg-gradient-to-br from-white via-white to-primary/5 shadow-2xl hover:shadow-primary/10 transition-all duration-700">
            {/* Blueprint Grid Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-0 right-0 p-8 sm:p-12 text-primary/10 group-hover:text-primary/15 transition-all transform group-hover:scale-110 group-hover:-rotate-3 duration-700">
              <Shield size={340} strokeWidth={0.3} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Shield size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">Cinema-Grade <br /><span className="text-primary">Optics</span></h3>
                <p className="text-gray-500 text-lg sm:text-xl max-w-sm leading-relaxed font-medium">
                  Every lens is multi-coated with aerospace-grade materials to ensure <span className="text-gray-900">zero distortion</span> and maximum light transmission.
                </p>
                <div className="flex gap-2 pt-2">
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full border border-primary/10">NANO-COATING</span>
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full border border-primary/10">HD GLASS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Focus - Square */}
          <div className="rounded-[2rem] p-8 flex flex-col justify-between group cursor-default transition-all duration-500 bg-gradient-to-br from-gray-50 to-white hover:to-secondary/5 border border-transparent hover:border-secondary/20 hover:shadow-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,172,227,0.4)] transition-all">
              <Zap size={24} fill="currentColor" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase mb-2 tracking-tight">Instant Focus</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Lightning fast autofocus <span className="text-secondary font-bold">zero latency</span> compatibility with all devices.</p>
            </div>
          </div>

          {/* 4K Ready - Square Contrast */}
          <div className="rounded-[2rem] p-8 flex flex-col justify-between group cursor-default bg-black text-white relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-primary/30 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black relative z-10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Sparkles size={24} fill="currentColor" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_#39B54A]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-brand-green">Live Tracking</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-1 tracking-tight">4K Cinema Ready</h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed">Lossless video capture for <span className="text-white">professional</span> workflows.</p>
            </div>
          </div>

          {/* Universal - Wide */}
          <div className="md:col-span-2 rounded-[2rem] p-8 flex items-center justify-between group cursor-default bg-gradient-to-r from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
             <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
             
             <div className="relative z-10 max-w-xs space-y-4">
               <div>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-tight">Universal <br /><span className="text-secondary">Compatibility</span></h3>
                  <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed mt-2">Our patented clip system secures seamlessly to 99% of modern smartphones.</p>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['iPhone', 'Samsung', 'Pixel'].map((brand, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[8px] font-black text-gray-400 group-hover:border-secondary/30 transition-colors">
                        {brand[0]}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">+ All Major Brands</span>
               </div>
             </div>

             <div className="relative z-10 group-hover:scale-105 transition-transform duration-500">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border border-gray-50 relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Camera size={48} className="text-gray-900 transition-all group-hover:text-primary group-hover:scale-110" />
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform delay-100 shadow-lg shadow-secondary/20">
                  <Plus size={16} strokeWidth={3} />
                </div>
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
          <FAQAccordion items={faqs} />
        </div>
      </section>
      
    </main>
  );
}

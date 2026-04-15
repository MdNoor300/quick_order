import fs from 'fs';
import path from 'path';
import ClientPage from '@/app/ClientPage';
import { Shield, Zap, Sparkles, Award, Camera } from 'lucide-react';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);

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
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="features">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 px-4">Why Tuktak Shop?</h2>
          <p className="text-gray-500 text-base sm:text-lg">Uncompromising quality in every single glass.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-end group cursor-default overflow-hidden relative min-h-[300px] md:min-h-0">
            <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors hidden sm:block">
              <Award size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10 text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Cinema-Grade Optics</h3>
              <p className="text-gray-600 text-sm sm:text-lg max-w-sm leading-relaxed">Every lens is multi-coated with aerospace-grade materials to ensure zero distortion and maximum light transmission.</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-default text-left min-h-[180px] md:min-h-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Zap className="text-secondary" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 sm:mb-2">Instant Focus</h3>
              <p className="text-gray-500 text-sm">Lightning fast autofocus compatibility with all devices.</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-default bg-primary text-white text-left min-h-[180px] md:min-h-0">
             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Sparkles className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 sm:mb-2 text-white">4K Ready</h3>
              <p className="text-white/60 text-sm">Specifically designed for 4K video capture without loss.</p>
            </div>
          </div>

          <div className="md:col-span-2 glass-card rounded-3xl p-6 sm:p-8 flex items-center justify-between group cursor-default text-left">
            <div className="max-w-xs">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Universal</h3>
              <p className="text-gray-500 text-sm">Patented clip system works with iPhone, Samsung, and Pixel.</p>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 ml-4">
               <Camera size={32} className="text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-32" id="products">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-4">
          <div className="text-left">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4 px-2">The Collection</h2>
            <p className="text-gray-500 text-base sm:text-lg px-2">Curated tools for the professional storyteller.</p>
          </div>
          <div className="flex flex-wrap gap-2 px-2">
            <span className="px-4 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-bold tracking-widest uppercase">All Lenses</span>
            <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-400 text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-gray-200 cursor-pointer transition-colors">Cinema</span>
            <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-400 text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-gray-200 cursor-pointer transition-colors">Macro</span>
          </div>
        </div>
        <ClientPage products={products} />
      </section>
      
      {/* Footer */}
      <footer className="bg-white pt-20 sm:pt-32 pb-12 sm:pb-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6 sm:mb-8 text-center">
            <img src="/logo.png" alt="Tuktak Shop Logo" className="h-64 w-auto object-contain" />
          </div>
          <p className="text-gray-500 max-w-md mx-auto mb-10 sm:mb-12 text-base sm:text-lg px-4 italic">Advanced professional-grade optics for mobile creators.</p>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12 sm:mb-16">
            <a href="#" className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#1877F2] hover:scale-110 transition-transform border border-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#E4405F] hover:scale-110 transition-transform border border-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-black hover:scale-110 transition-transform border border-gray-50 overflow-hidden relative group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#FF0000] hover:scale-110 transition-transform border border-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>

          <div className="pt-12 sm:pt-16 border-t border-gray-100 text-gray-400 text-[10px] sm:text-xs flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left px-4">
              &copy; {new Date().getFullYear()} Tuktak Shop. Professional rights reserved.
            </div>
            <div className="flex gap-8 px-4">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

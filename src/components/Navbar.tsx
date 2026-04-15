'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Camera, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Tuktak Shop Logo" className="h-24 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#lenses" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Lenses</Link>
            <Link href="#accessories" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Accessories</Link>
            <Link href="#reviews" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Reviews</Link>
            <Link href="#faq" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button className="hidden sm:block px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20">
              Shop Now
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <img src="/logo.png" alt="Tuktak Shop Logo" className="h-16 w-auto object-contain" />
            </div>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <Link 
              href="#lenses" 
              className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Lenses
            </Link>
            <Link 
              href="#accessories" 
              className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accessories
            </Link>
            <Link 
              href="#reviews" 
              className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link 
              href="#faq" 
              className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100">
            <button className="w-full py-4 rounded-2xl bg-black text-white font-bold text-lg mb-4">
              Shop Now
            </button>
            <p className="text-center text-gray-400 text-sm italic">Premium optics for creators.</p>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <footer className="pt-16 pb-8 sm:pb-10 border-t border-gray-100 relative overflow-hidden mesh-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 sm:gap-16 mb-12 text-left relative z-10">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <img src="/logo.png" alt="Tuktak Shop Logo" className="h-32 w-auto object-contain -ml-6" />
            <p className="text-gray-500 text-base leading-relaxed max-w-sm italic">
              Professional-grade optics engineered to transform your smartphone into a cinematic powerhouse.
            </p>
            <SocialLinks />
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
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-4">
            &copy; {new Date().getFullYear()} Tuktak Shop. Advanced Rights Reserved.
          </p>
          <div className="flex gap-8 px-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <button 
              onClick={() => setIsAdminModalOpen(true)}
              className="text-gray-300 hover:text-gray-500 transition-colors text-[9px] font-medium"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </footer>
  );
}

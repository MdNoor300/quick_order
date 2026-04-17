'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';

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
            <div className="flex gap-4">
              {[
                { 
                  label: "Facebook", 
                  color: "#1877F2",
                  url: "https://www.facebook.com/profile.php?id=61582224984014#",
                  svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                },
                { 
                  label: "Instagram", 
                  color: "#E4405F",
                  url: "https://www.instagram.com/tech.tuktak",
                  svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                },
                { 
                  label: "TikTok", 
                  color: "#000000",
                  url: "https://www.tiktok.com/@techtuktak1?_r=1&_t=ZS-95WgqSzY8Zu",
                  svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>
                },
                { 
                  label: "YouTube", 
                  color: "#FF0000",
                  url: "https://www.youtube.com/@techtuktakbd",
                  svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
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

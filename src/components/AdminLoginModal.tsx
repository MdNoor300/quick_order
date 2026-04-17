'use client';

import { useState } from 'react';
import { X, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [secret, setSecret] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to cookie for persistence (7 days)
    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `admin_secret=${secret};expires=${expires.toUTCString()};path=/;SameSite=Strict`;

    // Also save to localStorage as backup/requested
    localStorage.setItem('admin_secret', secret);

    // Redirect to admin with the secret as query param for immediate access
    router.push(`/admin?secret=${secret}`);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 pt-12 text-center">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-2 uppercase">Admin Port</h2>
          <p className="text-gray-500 text-sm font-medium mb-8">Identify yourself to gain console access.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Terminal Secret..."
                required
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all font-mono text-center tracking-widest"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Engage Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Encrypted Session</p>
        </div>
      </div>
    </div>
  );
}

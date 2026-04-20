'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createOrder } from '@/app/actions/order';
import ImageSlider from './ImageSlider';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);
    formData.append('productId', product.id);

    try {
      const result = await createOrder(formData);
      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Order placed successfully!' });
        setTimeout(() => {
          onClose();
          setMessage(null);
        }, 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'An error occurred.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transition-all relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors z-30 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
          {/* Left: Image Slider */}
          <div className="w-full md:w-1/2 bg-gray-50">
            <ImageSlider 
              images={product.images} 
              name={product.name} 
              className="h-full min-h-[300px] md:min-h-0" 
              aspectRatio="aspect-square md:aspect-auto"
            />
          </div>

          {/* Right: Order Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2">{product.name}</h2>
              <p className="text-xl font-bold text-primary">৳{product.price.toFixed(2)}</p>
            </div>

            <form action={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-1 tracking-tight">
                  আপনার নাম (Full Name)
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 placeholder:text-gray-300 placeholder:font-normal"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-1 tracking-tight">
                  মোবাইল নম্বর (Mobile Number)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  maxLength={11}
                  onInput={(e) => {
                    const value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    e.currentTarget.value = value;
                    
                    if (value.length > 0) {
                      if (!value.startsWith('01')) {
                        e.currentTarget.setCustomValidity('মোবাইল নম্বর অবশ্যই 01 দিয়ে শুরু হতে হবে');
                      } else if (value.length !== 11) {
                        e.currentTarget.setCustomValidity('মোবাইল নম্বর অবশ্যই ১১ ডিজিটের হতে হবে');
                      } else {
                        e.currentTarget.setCustomValidity('');
                      }
                    } else {
                      e.currentTarget.setCustomValidity('');
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 placeholder:text-gray-300 placeholder:font-normal"
                  placeholder="আপনার মোবাইল নম্বর লিখুন"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-bold text-gray-700 mb-1 tracking-tight">
                    জেলা (District)
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    required
                    placeholder="জেলা"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
                <div>
                  <label htmlFor="thana" className="block text-sm font-bold text-gray-700 mb-1 tracking-tight">
                    থানা (Thana)
                  </label>
                  <input
                    type="text"
                    id="thana"
                    name="thana"
                    required
                    placeholder="থানা"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1 tracking-tight">
                  বিস্তারিত ঠিকানা (Address)
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none bg-gray-50 text-sm placeholder:text-gray-300 placeholder:font-normal"
                  placeholder="বাড়ি নম্বর, রোড নম্বর, এলাকা (House, Road, Area)"
                />
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Order'
                )}
              </button>
            </form>
            
            <p className="mt-6 text-center text-gray-400 text-xs font-medium">Safe & Secure 24h Express Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

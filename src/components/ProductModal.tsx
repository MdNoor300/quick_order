'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createOrder } from '@/app/actions/order';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
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
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-lg font-medium text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                pattern="\d{11}"
                title="Phone number must be exactly 11 digits"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                placeholder="01712345678"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Full Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all resize-none"
                placeholder="123 Main Street, Appt 4B, City, Country"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-lg bg-black text-white font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Order (Cash on Delivery)'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

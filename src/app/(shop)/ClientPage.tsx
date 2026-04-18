'use client';

import { useState } from 'react';
import ProductModal from '@/components/ProductModal';
import ImageSlider from '@/components/ImageSlider';
import { Plus, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

export default function ClientPage({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-8 px-4 sm:px-0">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer [perspective:1000px] hover:z-20"
            style={{ 
              boxShadow: '0 20px 50px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.02)',
              transformStyle: 'preserve-3d'
            }}
            onClick={() => setSelectedProduct(product)}
          >
            {/* 3D Inner Wrapper */}
            <div className="flex flex-col flex-grow transition-all duration-700 ease-out group-hover:[transform:rotateX(5deg)_rotateY(-5deg)_translateZ(20px)] group-hover:shadow-[0_45px_100px_rgba(45,50,140,0.15)] h-full">
              
              {/* Image Container - Switched to shorter aspect ratios */}
              <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden bg-gray-50 rounded-t-[2.5rem]">
                <ImageSlider images={product.images} name={product.name} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 3D Floating Badge - Slightly smaller */}
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 [transform:translateZ(40px)]">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Overlaid Brand Tag - Slightly smaller */}
                <div className="absolute top-4 left-4 z-20 [transform:translateZ(30px)]">
                  <span className="px-3 py-1 rounded-full bg-black/10 backdrop-blur-md text-white text-[9px] sm:text-xs font-black uppercase tracking-widest border border-white/20">
                    Pro Series
                  </span>
                </div>
              </div>
              
              {/* Content Container - Reduced padding and spacing */}
              <div className="p-5 sm:p-7 flex flex-col flex-grow bg-white relative z-10 [transform:translateZ(20px)]">
                <div className="flex-grow space-y-2 sm:space-y-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/40">Optical Grade</div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-2xl font-black text-primary">
                      ৳{product.price}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-1 sm:line-clamp-2 font-medium">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <button
                    className="w-full px-6 py-3.5 rounded-xl bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:shadow-primary/30 hover:-translate-y-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    Quick Order
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="mt-4 flex justify-between items-center px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">In Stock</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ships Worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-30" />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          isOpen={true} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}

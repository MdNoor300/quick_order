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
              
              {/* Image Container with Slider */}
              <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-gray-50 rounded-t-[2.5rem]">
                <ImageSlider images={product.images} name={product.name} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 3D Floating Badge */}
                <div className="absolute top-6 right-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 [transform:translateZ(40px)]">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Plus size={24} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Overlaid Brand Tag */}
                <div className="absolute top-6 left-6 z-20 [transform:translateZ(30px)]">
                  <span className="px-4 py-1.5 rounded-full bg-black/10 backdrop-blur-md text-white text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white/20">
                    Pro Series
                  </span>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-8 sm:p-10 flex flex-col flex-grow bg-white relative z-10 [transform:translateZ(20px)]">
                <div className="flex-grow space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Optical Grade</div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-3xl font-black text-primary">
                      ৳{product.price}
                    </div>
                  </div>
                  <p className="text-gray-500 text-base sm:text-lg leading-relaxed line-clamp-2 font-medium">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <button
                    className="w-full px-8 py-5 rounded-2xl bg-gray-900 text-white text-sm font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 group/btn shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-primary/30 hover:-translate-y-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    Quick Order
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="mt-6 flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">In Stock</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ships Worldwide</span>
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

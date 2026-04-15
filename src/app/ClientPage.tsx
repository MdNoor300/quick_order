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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-gray-100 hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            {/* Image Container with Slider */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <ImageSlider images={product.images} name={product.name} />
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-colors">
                  <Plus size={20} />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5 opacity-70">Tuktak Shop</div>
                <div className="text-lg font-black leading-tight">{product.name}</div>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow bg-white">
              <div className="flex-grow space-y-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-xl font-black text-primary">
                    ৳{product.price}
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-50">
                <button
                  className="w-full px-5 py-3.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  Quick Order
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="mt-4 flex justify-between items-center px-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                    Fixed Stock
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                    Ships in 24h
                  </div>
                </div>
              </div>
            </div>
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

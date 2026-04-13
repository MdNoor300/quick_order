'use client';

import { useState } from 'react';
import ProductModal from '@/components/ProductModal';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

export default function ClientPage({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                >
                  Buy Now
                </button>
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

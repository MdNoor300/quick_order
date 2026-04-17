'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Package, LogOut, DollarSign, ShoppingBag, Clock } from 'lucide-react';
import AdminTable, { Order } from './AdminTable';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
}

interface AdminDashboardClientProps {
  orders: Order[];
  products: Product[];
  productMap: Record<string, { name: string; price: number }>;
  metrics: {
    confirmedRevenue: number;
    potentialRevenue: number;
    pendingDeliveries: number;
  };
}

export default function AdminDashboardClient({
  orders,
  products,
  productMap,
  metrics,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex font-sans">
      {/* SaaS Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-white/60 backdrop-blur-3xl border-r border-gray-200 z-20 flex flex-col pt-8 pb-6 px-4">
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <span className="font-black tracking-tight text-xl text-gray-900">Admin</span>
        </div>

        <nav className="flex-1 space-y-1.5 px-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-black text-white shadow-md shadow-black/10'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <LayoutDashboard size={18} />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-black text-white shadow-md shadow-black/10'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <Package size={18} />
            Products
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-100 px-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 sm:p-12 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <header>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
              {activeTab === 'orders' ? 'Overview' : 'Product Catalog'}
            </h1>
            <p className="text-gray-500 font-medium">
              {activeTab === 'orders' 
                ? 'Manage your incoming orders and delivery status.' 
                : 'View and manage your current store inventory.'}
            </p>
          </header>

          {activeTab === 'orders' ? (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <ShoppingBag size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total</span>
                  </div>
                  <p className="text-3xl font-black tracking-tighter text-gray-900">{orders.length}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">Orders processed</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                      <DollarSign size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Revenue</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black tracking-tighter text-gray-900">৳{metrics.confirmedRevenue.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    + ৳{metrics.potentialRevenue.toLocaleString()} <span className="text-gray-400">pending</span>
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center animate-pulse">
                      <Clock size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Action</span>
                  </div>
                  <p className="text-3xl font-black tracking-tighter text-gray-900">{metrics.pendingDeliveries}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">Orders pending dispatch</p>
                </div>
              </div>

              {/* Orders Table Container */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Deliveries</h2>
                </div>
                <AdminTable orders={orders} productMap={productMap} />
              </div>
            </>
          ) : (
            /* Products Tab Content */
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-200/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Image & Name</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Category</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Price</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Identifier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/80">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative shrink-0">
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <span className="text-sm font-bold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-5 px-6 whitespace-nowrap text-sm font-bold text-gray-900">
                          ৳{product.price.toLocaleString()}
                        </td>
                        <td className="py-5 px-6 whitespace-nowrap text-right">
                          <span className="text-xs font-mono font-bold text-gray-400">
                            {product.id}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Copy, Check, Trash2, Phone, Box, MapPin, Search, ChevronLeft, ChevronRight, ExternalLink, Eye, X, Calendar, Clock as ClockIcon } from 'lucide-react';
import { updateOrderStatus, deleteOrder } from '@/app/actions/admin';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface Order {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  delivery_address: string;
  product_id: string;
  status: 'pending' | 'completed' | 'shipped'; // user confirmed mapping 'Delivered' to 'completed'
}

interface AdminTableProps {
  orders: Order[];
  productMap: Record<string, { name: string; price: number; image?: string; category?: string }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function AdminTable({ orders, productMap, pagination }: AdminTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCopyAddress = (id: string, address: string, phone: string, name: string) => {
    const textToCopy = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'completed' | 'shipped') => {
    setLoadingId(id);
    await updateOrderStatus(id, newStatus);
    router.refresh();
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you certain you want to permanently delete this order?')) return;
    setLoadingId(id);
    await deleteOrder(id);
    router.refresh();
    setLoadingId(null);
  };

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white/60 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet.</h3>
        <p className="text-gray-500 font-medium text-sm">Your shop is ready for customers!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {orders.map((order) => {
          const date = new Date(order.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          });
          const time = new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const product = productMap[order.product_id];
          const shortId = order.id.split('-')[0].toUpperCase();

          return (
            <div key={order.id} className={`bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-100 shadow-sm transition-all ${loadingId === order.id ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black tracking-widest text-gray-400">ORDER #{shortId}</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <span>{date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{time}</span>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as 'pending' | 'completed' | 'shipped')}
                    disabled={loadingId === order.id}
                    className={`
                      appearance-none pl-3 pr-8 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-colors outline-none
                      ${order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${order.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{order.full_name}</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCopyText(`phone-${order.id}`, order.phone_number)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold transition-all active:scale-95"
                    >
                      {copiedId === `phone-${order.id}` ? <Check size={12} /> : <Phone size={12} />}
                      {order.phone_number}
                    </button>
                    <a href={`tel:${order.phone_number}`} className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:text-blue-600 transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-100 shadow-sm">
                    <Box size={16} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-tight">{product?.name || 'Unknown Item'}</span>
                    <span className="text-[10px] font-black text-gray-500">৳{product?.price?.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} /> Delivery Address
                    </span>
                    <button 
                      onClick={() => handleCopyText(`addr-${order.id}`, order.delivery_address)}
                      className="text-[10px] font-bold text-blue-600 active:scale-95"
                    >
                      {copiedId === `addr-${order.id}` ? 'COPIED!' : 'COPY'}
                    </button>
                  </div>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed bg-gray-50/30 p-2 rounded-lg border border-gray-100/50">
                    {order.delivery_address}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={() => handleCopyAddress(order.id, order.delivery_address, order.phone_number, order.full_name)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${copiedId === order.id ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'}`}
                  >
                    {copiedId === order.id ? <Check size={14} /> : <Copy size={14} />}
                    Courier
                  </button>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white text-xs font-bold transition-all hover:bg-gray-800"
                  >
                    <Eye size={14} />
                    View
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  disabled={loadingId === order.id}
                  className="ml-3 p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Order & Date</th>
                <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Customer</th>
                <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-gray-400">Delivery Address</th>
                <th className="py-5 px-6 text-right text-xs font-black uppercase tracking-widest text-gray-400">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {orders.map((order) => {
                const date = new Date(order.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                });
                const time = new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const product = productMap[order.product_id];
                const shortId = order.id.split('-')[0].toUpperCase();

                return (
                  <tr key={order.id} className={`group transition-colors ${loadingId === order.id ? 'opacity-50' : 'hover:bg-gray-50/80'}`}>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black tracking-widest text-gray-400">#{shortId}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{date}</span>
                          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">{time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold text-gray-900">{order.full_name}</span>
                        <a href={`tel:${order.phone_number}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors w-fit bg-blue-50/50 px-2.5 py-1 rounded-md">
                          <Phone size={12} />
                          {order.phone_number}
                        </a>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                          <Box size={16} className="text-gray-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 line-clamp-1">{product?.name || 'Unknown Item'}</span>
                          <span className="text-xs font-bold text-gray-500">৳{product?.price?.toLocaleString() || '0'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as 'pending' | 'completed' | 'shipped')}
                          disabled={loadingId === order.id}
                          className={`
                            appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border transition-colors cursor-pointer outline-none
                            ${order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : ''}
                            ${order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : ''}
                            ${order.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' : ''}
                          `}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Delivered</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 min-w-[350px] w-full">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-sm font-medium text-gray-600 leading-relaxed break-words">
                          {order.delivery_address}
                        </p>
                      </div>
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleCopyAddress(order.id, order.delivery_address, order.phone_number, order.full_name)}
                          className={`w-10 h-10 rounded-xl transition-all border flex items-center justify-center ${copiedId === order.id ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-gray-400 border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm'}`}
                        >
                          {copiedId === order.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          disabled={loadingId === order.id}
                          className="w-10 h-10 bg-white text-gray-400 border border-gray-200 rounded-xl flex items-center justify-center hover:border-red-200 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
        <p className="text-sm font-medium text-gray-500 order-2 sm:order-1">
          Showing <span className="text-gray-900 font-bold">{orders.length}</span> of <span className="text-gray-900 font-bold">{pagination.totalItems}</span> orders
        </p>
        
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            onClick={() => navigateToPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:text-black hover:border-black disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-xl text-sm font-black text-gray-900">
            {pagination.currentPage} / {pagination.totalPages}
          </div>
          
          <button
            onClick={() => navigateToPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:text-black hover:border-black disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 bg-black text-white relative overflow-hidden">
               <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2 block">Order Statement</span>
                    <h2 className="text-3xl font-black tracking-tight">#{selectedOrder.id.split('-')[0].toUpperCase()}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors text-white"
                  >
                    <X size={20} />
                  </button>
               </div>
               
               <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                 <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                    <Calendar size={14} className="text-white/60" />
                    <span className="text-xs font-bold">{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                 </div>
                 <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                    <ClockIcon size={14} className="text-white/60" />
                    <span className="text-xs font-bold">{new Date(selectedOrder.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 </div>
                 <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border
                    ${selectedOrder.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    ${selectedOrder.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                    ${selectedOrder.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : ''}
                 `}>
                    {selectedOrder.status === 'completed' ? 'Delivered' : selectedOrder.status}
                 </div>
               </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Product Info */}
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-gray-200 relative shrink-0 flex items-center justify-center">
                  {productMap[selectedOrder.product_id]?.image ? (
                    <img 
                      src={productMap[selectedOrder.product_id].image} 
                      alt="Product" 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Box size={32} className="text-gray-200" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    {productMap[selectedOrder.product_id]?.category || 'Item'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{productMap[selectedOrder.product_id]?.name || 'Item Information'}</h3>
                  <p className="text-2xl font-black text-black">৳{productMap[selectedOrder.product_id]?.price?.toLocaleString() || '0'}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Customer Details</h4>
                  <div>
                    <p className="text-sm font-black text-gray-900">{selectedOrder.full_name}</p>
                    <a href={`tel:${selectedOrder.phone_number}`} className="text-sm font-bold text-blue-600 hover:underline">{selectedOrder.phone_number}</a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Shipping Address</h4>
                  <div className="flex gap-2">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-gray-600 leading-relaxed">
                      {selectedOrder.delivery_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-0 flex gap-3">
              <button
                onClick={() => {
                  handleCopyAddress(selectedOrder.id, selectedOrder.delivery_address, selectedOrder.phone_number, selectedOrder.full_name);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all border ${copiedId === selectedOrder.id ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-900 border-gray-100 hover:bg-gray-100'}`}
              >
                {copiedId === selectedOrder.id ? <Check size={18} /> : <Copy size={18} />}
                {copiedId === selectedOrder.id ? 'Copied' : 'Copy for Courier'}
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-4 px-6 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

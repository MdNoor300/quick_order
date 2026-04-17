'use client';

import { useState } from 'react';
import { Copy, Check, Trash2, Phone, Box, MapPin, Search } from 'lucide-react';
import { updateOrderStatus, deleteOrder } from '@/app/actions/admin';

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
  productMap: Record<string, { name: string; price: number }>;
}

export default function AdminTable({ orders, productMap }: AdminTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, address: string, phone: string, name: string) => {
    const textToCopy = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'completed' | 'shipped') => {
    setLoadingId(id);
    await updateOrderStatus(id, newStatus);
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you certain you want to permanently delete this order?')) return;
    setLoadingId(id);
    await deleteOrder(id);
    setLoadingId(null);
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
    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-200/60 overflow-hidden">
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
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              
              const product = productMap[order.product_id];
              const shortId = order.id.split('-')[0].toUpperCase();

              return (
                <tr key={order.id} className={`group transition-colors ${loadingId === order.id ? 'opacity-50' : 'hover:bg-gray-50/80'}`}>
                  {/* ID & Date */}
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black tracking-widest text-gray-400">#{shortId}</span>
                      <span className="text-sm font-bold text-gray-900">{date}</span>
                    </div>
                  </td>

                  {/* Customer & Phone */}
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-gray-900">{order.full_name}</span>
                      <a href={`tel:${order.phone_number}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors w-fit bg-blue-50/50 px-2.5 py-1 rounded-md">
                        <Phone size={12} />
                        {order.phone_number}
                      </a>
                    </div>
                  </td>

                  {/* Product */}
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

                  {/* Dynamic Status Dropdown */}
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
                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="py-5 px-6 min-w-[350px] w-full">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm font-medium text-gray-600 leading-relaxed break-words">
                        {order.delivery_address}
                      </p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-5 px-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyAddress(order.id, order.delivery_address, order.phone_number, order.full_name)}
                        className={`p-2 rounded-xl transition-all border ${copiedId === order.id ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-gray-400 border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm'}`}
                        title="Copy Details for Courier"
                      >
                        {copiedId === order.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>

                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={loadingId === order.id}
                        className="p-2 bg-white text-gray-400 border border-gray-200 rounded-xl hover:border-red-200 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all"
                        title="Delete Order Permanently"
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
  );
}

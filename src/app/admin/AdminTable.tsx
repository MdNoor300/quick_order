'use client';

import { useState } from 'react';
import { Copy, CheckCircle2, Trash2, Clock, Check, Loader2 } from 'lucide-react';
import { updateOrderStatus, deleteOrder } from '@/app/actions/admin';

export interface Order {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  delivery_address: string;
  product_id: string;
  status: 'pending' | 'completed' | 'shipped';
}

export default function AdminTable({ orders }: { orders: Order[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleCopyAddress = (id: string, address: string, phone: string, name: string) => {
    const textToCopy = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'completed' | 'shipped') => {
    setLoadingAction(`status-${id}`);
    await updateOrderStatus(id, newStatus);
    setLoadingAction(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    setLoadingAction(`delete-${id}`);
    await deleteOrder(id);
    setLoadingAction(null);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">No orders yet</h3>
        <p className="text-gray-500 text-sm">When customers place orders, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-600">
              <th className="py-4 px-6 whitespace-nowrap">Date</th>
              <th className="py-4 px-6 whitespace-nowrap">Customer</th>
              <th className="py-4 px-6 whitespace-nowrap">Phone Number</th>
              <th className="py-4 px-6 whitespace-nowrap">Product ID</th>
              <th className="py-4 px-6 whitespace-nowrap">Delivery Address</th>
              <th className="py-4 px-6 whitespace-nowrap">Status</th>
              <th className="py-4 px-6 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const date = new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors text-sm text-gray-900 group">
                  <td className="py-4 px-6 whitespace-nowrap text-gray-500">{date}</td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">{order.full_name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.phone_number}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-xs font-mono text-gray-600 rounded">
                      {order.product_id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-[200px] truncate" title={order.delivery_address}>
                      {order.delivery_address}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.status === 'completed' || order.status === 'shipped' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleCopyAddress(order.id, order.delivery_address, order.phone_number, order.full_name)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                      title="Copy Customer Details"
                    >
                      {copiedId === order.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    
                    {order.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                        disabled={loadingAction === `status-${order.id}`}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100 flex items-center gap-2"
                        title="Mark as Completed"
                      >
                        {loadingAction === `status-${order.id}` ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={loadingAction === `delete-${order.id}`}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center gap-2"
                      title="Delete Order"
                    >
                      {loadingAction === `delete-${order.id}` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
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

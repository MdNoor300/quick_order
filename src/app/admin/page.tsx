import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import AdminDashboardClient from './AdminDashboardClient';
import { Order } from './AdminTable';

import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const secret = (await searchParams).secret || cookieStore.get('admin_secret')?.value;
  const expectedSecret = process.env.ADMIN_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd] px-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-8 font-medium">
            You don't have permission to view this page. Ensure you are using the correct secret token.
          </p>
          <Link
            href="/"
            className="inline-flex w-full justify-center items-center py-4 px-6 rounded-2xl bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // Fetch orders from Supabase. If error (like missing keys locally), default to empty array.
  const { data: ordersData, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase fetch failed (likely missing credentials). Defaulting to empty orders array.');
  }
  
  const orders: Order[] = (ordersData as Order[]) || [];

  // Load products to pass to client and compute revenue 
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);
  
  // Create Product Map
  const productMap: Record<string, { name: string; price: number }> = {};
  products.forEach((p: any) => {
    productMap[p.id] = { name: p.name, price: p.price };
  });

  // Calculate Metrics
  let confirmedRevenue = 0;
  let potentialRevenue = 0;
  let pendingDeliveries = 0;

  orders.forEach((order) => {
    const product = productMap[order.product_id];
    const price = product ? product.price : 0;
    
    if (order.status === 'completed') {
      confirmedRevenue += price;
    } else {
      potentialRevenue += price;
    }

    if (order.status === 'pending') {
      pendingDeliveries++;
    }
  });

  const metrics = { confirmedRevenue, potentialRevenue, pendingDeliveries };

  return (
    <AdminDashboardClient 
      orders={orders} 
      products={products} 
      productMap={productMap} 
      metrics={metrics} 
    />
  );
}

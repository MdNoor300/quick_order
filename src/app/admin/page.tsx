import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import AdminDashboardClient from './AdminDashboardClient';
import { Order } from './AdminTable';
import { Product } from '@/lib/types';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const searchParamsResolved = await searchParams;
  const secret = searchParamsResolved.secret || cookieStore.get('admin_secret')?.value;
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
            You don&apos;t have permission to view this page. Ensure you are using the correct secret token.
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

  // Pagination parameters
  const page = Number(searchParamsResolved.page) || 1;
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fetch paginated orders from Supabase
  const { data: ordersData, error, count } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.warn('Supabase fetch failed (likely missing credentials). Defaulting to empty orders array.');
  }
  
  const orders: Order[] = (ordersData as Order[]) || [];
  const totalOrders = count || 0;

  // Fetch products dynamically
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  const products = productsData || [];
  
  // Create Product Map
  const productMap: Record<string, { name: string; price: number; image: string; category: string }> = {};
  products.forEach((p: Product) => {
    productMap[p.id] = { 
      name: p.name, 
      price: p.price, 
      image: p.image_url || p.images?.[0] || '', 
      category: p.category || 'General'
    };
  });

  // Calculate Metrics - Fetch all orders (lightweight) to ensure accuracy across pages
  const { data: allOrdersForMetrics } = await supabase
    .from('orders')
    .select('status, product_id');

  let confirmedRevenue = 0;
  let potentialRevenue = 0;
  let pendingDeliveries = 0;
  let shippedCount = 0;
  let deliveredCount = 0;

  (allOrdersForMetrics || []).forEach((order) => {
    const product = productMap[order.product_id];
    const price = product ? product.price : 0;
    
    if (order.status === 'completed') {
      confirmedRevenue += price;
      deliveredCount++;
    } else {
      potentialRevenue += price;
    }

    if (order.status === 'pending') {
      pendingDeliveries++;
    } else if (order.status === 'shipped') {
      shippedCount++;
    }
  });

  const metrics = { 
    confirmedRevenue, 
    potentialRevenue, 
    pendingDeliveries,
    shippedCount,
    deliveredCount,
    totalOrdersCount: allOrdersForMetrics?.length || 0 
  };

  return (
    <AdminDashboardClient 
      orders={orders} 
      products={products} 
      productMap={productMap} 
      metrics={metrics}
      pagination={{
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalItems: totalOrders,
        itemsPerPage: limit
      }}
    />
  );
}

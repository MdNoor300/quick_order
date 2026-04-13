import { supabase } from '@/lib/supabase';
import AdminTable, { Order } from './AdminTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const secret = (await searchParams).secret;
  
  // Check against the ADMIN_SECRET environment variable
  const expectedSecret = process.env.ADMIN_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-6 text-sm">
            You don't have permission to view this page. Ensure you are using the correct secret link.
          </p>
          <Link
            href="/"
            className="inline-block w-full py-3 px-4 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // Fetch orders from Supabase
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch orders:', error);
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Store <span className="text-gray-400 font-normal">| Admin Dashboard</span>
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Orders</h2>
            <p className="text-gray-500 text-sm">Manage and fulfill your cash on delivery orders.</p>
          </div>
          
          <div className="text-sm text-gray-500 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
            Total Orders: <span className="font-semibold text-gray-900">{orders?.length || 0}</span>
          </div>
        </div>

        {error ? (
          <div className="p-6 bg-red-50 text-red-700 border border-red-200 rounded-xl">
            Failed to load orders. Please check your Supabase configuration.
          </div>
        ) : (
          <AdminTable orders={(orders as Order[]) || []} />
        )}
      </main>
    </div>
  );
}

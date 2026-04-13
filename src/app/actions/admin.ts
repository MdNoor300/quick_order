'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, status: 'pending' | 'completed' | 'shipped') {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error('Failed to update order status:', error);
    return { success: false, error: 'Failed to update order status.' };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function deleteOrder(orderId: string) {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);

  if (error) {
    console.error('Failed to delete order:', error);
    return { success: false, error: 'Failed to delete order.' };
  }

  revalidatePath('/admin');
  return { success: true };
}

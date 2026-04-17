'use server';

import { supabase } from '@/lib/supabase';

export async function createOrder(formData: FormData) {
  const fullName = formData.get('fullName')?.toString() || '';
  const phoneNumber = formData.get('phoneNumber')?.toString() || '';
  const address = formData.get('address')?.toString() || '';
  const productId = formData.get('productId')?.toString() || '';

  // Validation
  if (!fullName || !phoneNumber || !address || !productId) {
    return { success: false, error: 'All fields are required.' };
  }

  // Phone number must be Bangladeshi 11-digit format (013-019...)
  const phoneRegex = /^01[3-9]\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return { success: false, error: 'Please enter a valid phone number' };
  }

  // Insert into Supabase 'orders' table
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        delivery_address: address,
        product_id: productId,
        status: 'pending' // Default status
      }
    ]);

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'Failed to place order. Please try again later.' };
  }

  return { success: true, message: 'Order placed! We will call you for confirmation.' };
}

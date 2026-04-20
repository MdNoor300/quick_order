'use server';

import { supabase } from '@/lib/supabase';

export async function createOrder(formData: FormData) {
  const fullName = formData.get('fullName')?.toString() || '';
  const phoneNumber = formData.get('phoneNumber')?.toString() || '';
  const district = formData.get('district')?.toString() || '';
  const thana = formData.get('thana')?.toString() || '';
  const detailedAddress = formData.get('address')?.toString() || '';
  const productId = formData.get('productId')?.toString() || '';

  // Validation
  if (!fullName || !phoneNumber || !district || !thana || !detailedAddress || !productId) {
    return { success: false, error: 'সবগুলো ঘর পূরণ করা আবশ্যক (All fields are required).' };
  }

  // Phone number must be Bangladeshi 11-digit format starting with 01
  const phoneRegex = /^01\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return { success: false, error: 'সঠিক মোবাইল নম্বর দিন (Please enter a valid 11-digit phone number starting with 01)' };
  }

  // Smart Address Composition
  const formattedAddress = `District: ${district}, Thana: ${thana}, Address: ${detailedAddress}`;

  // Insert into Supabase 'orders' table
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        delivery_address: formattedAddress,
        product_id: productId,
        status: 'pending' // Default status
      }
    ]);

  if (error) {
    console.error('Supabase Error:', error);
    return { success: false, error: 'অর্ডারটি গ্রহণ করা সম্ভব হয়নি। আবার চেষ্টা করুন।' };
  }

  return { success: true, message: 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!' };
}

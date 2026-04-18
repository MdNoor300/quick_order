'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function migrateProducts() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'products.json not found' };
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);

    const { error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'id' });

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, count: products.length };
  } catch (err: any) {
    console.error('Migration failed:', err);
    return { success: false, error: err.message };
  }
}

export async function saveProduct(product: any) {
  try {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'id' });

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error('Save product failed:', err);
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    console.error('Delete product failed:', err);
    return { success: false, error: err.message };
  }
}

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error('Image upload failed:', err);
    return { success: false, error: err.message };
  }
}

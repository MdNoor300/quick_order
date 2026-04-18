'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { saveProduct, uploadProductImage } from '@/app/actions/products';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: '',
    name: '',
    price: 0,
    category: 'Lenses',
    description: '',
    images: []
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: `prod_${Date.now()}`,
        name: '',
        price: 0,
        category: 'Lenses',
        description: '',
        images: []
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('fileName', file.name);

    const result = await uploadProductImage(uploadFormData);
    if (result.success && result.url) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), result.url]
      }));
    } else {
      alert('Upload failed: ' + result.error);
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await saveProduct(formData);
    if (result.success) {
      onClose();
    } else {
      alert('Failed to save: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <header className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-gray-500 text-sm font-medium">Configure your product details and imagery.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white hover:shadow-md flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Product ID</label>
              <input 
                type="text" 
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-mono text-sm"
                placeholder="slug_identifier"
                required
                disabled={!!product}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-medium appearance-none bg-white"
              >
                <option value="Lenses">Lenses</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Product Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold text-lg"
              placeholder="e.g. 28X Telephoto Zoom Lens"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Price (৳)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full pl-10 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all min-h-[120px] resize-none font-medium leading-relaxed"
              placeholder="Tell us about the features and optics..."
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Product Images</label>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {formData.images?.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 relative group overflow-hidden">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-black hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group">
                {uploading ? (
                  <Loader2 size={24} className="text-black animate-spin" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:bg-white transition-all">
                      <Plus size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Add Image</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </form>

        <footer className="px-8 py-6 border-t border-gray-100 flex gap-4 bg-gray-50/50">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-2xl border border-gray-200 font-bold hover:bg-white transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] py-4 px-6 rounded-2xl bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {product ? 'Update Product' : 'Create Product'}
          </button>
        </footer>
      </div>
    </div>
  );
}

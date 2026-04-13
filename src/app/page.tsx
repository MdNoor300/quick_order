import fs from 'fs';
import path from 'path';
import ClientPage from '@/app/ClientPage';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-100 to-transparent -z-10" />
        <div className="text-center max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 mb-8 leading-[1.05]">
            <span className="block">Master Mobile Photography</span>
            <span className="text-gray-400 block md:mt-2 text-4xl md:text-6xl">with Tech Tuktak</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Transform your smartphone into a professional camera with our premium lens collection. Designed for creators who refuse to compromise on quality and detail.
          </p>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-32">
        <ClientPage products={products} />
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tech Tuktak</h2>
          <p className="text-gray-500 text-sm mb-8">Empowering mobile creators with professional-grade optics.</p>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Tech Tuktak. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

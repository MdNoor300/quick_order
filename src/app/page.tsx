import fs from 'fs';
import path from 'path';
import ClientPage from './ClientPage';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-100 to-transparent -z-10" />
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
            Elevate Your Workspace.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light leading-relaxed">
            Premium, minimalist tools designed to help you do your best work. Carefully crafted for professionals who value both form and function.
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">HabiburEcom</h2>
          <p className="text-gray-500 text-sm mb-8">Crafting better experiences through minimalist design.</p>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} HabiburEcom. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

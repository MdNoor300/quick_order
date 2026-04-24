'use client';

import { ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      name: "WhatsApp",
      handle: "+880 1788-977156",
      label: "Direct Chat",
      color: "bg-[#25D366]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>,
      url: "https://wa.me/8801788977156",
      description: "Fastest way to get a response. We're online most of the day."
    },
    {
      name: "Instagram",
      handle: "@tech.tuktak",
      label: "Visual Inbox",
      color: "bg-[#E4405F]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
      url: "https://www.instagram.com/tech.tuktak",
      description: "DM us for product queries, behind-the-scenes, and more."
    },
    {
      name: "Facebook",
      handle: "Tech Tuktak",
      label: "Community Hub",
      color: "bg-[#1877F2]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
      url: "https://www.facebook.com/profile.php?id=61582224984014#",
      description: "Follow our page for the latest updates and customer stories."
    },
    {
      name: "TikTok",
      handle: "@techtuktak1",
      label: "Short form",
      color: "bg-black",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>,
      url: "https://www.tiktok.com/@techtuktak1?_r=1&_t=ZS-95WgqSzY8Zu",
      description: "Watch our lenses in action. Check out the latest mobile cinematography tips."
    },
    {
      name: "YouTube",
      handle: "Tech Tuktak BD",
      label: "Deep Dives",
      color: "bg-[#FF0000]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
      url: "https://www.youtube.com/@techtuktakbd",
      description: "Detailed reviews and tutorials on how to master your gear."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fbfbfd] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-gray-900">
            Let&apos;s Connect.
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto italic">
            Pick your favorite platform. We&apos;re ready to knock back and help you level up your creative game.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between min-h-[250px] sm:min-h-[320px]"
            >
              {/* Background Glow */}
              <div className={`absolute -right-12 -top-12 w-32 h-32 ${method.color} opacity-[0.03] blur-3xl group-hover:opacity-10 transition-opacity`} />
              
              <div>
                <div className="flex justify-between items-start mb-6 sm:mb-10">
                  <div className={`w-12 h-12 sm:w-20 sm:h-20 ${method.color} rounded-xl sm:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform duration-500`}>
                    {method.icon}
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-xl sm:rounded-2xl text-gray-400 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {method.label}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-black">
                    {method.name}
                  </h2>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] sm:text-sm font-medium text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-2">
                  {method.description}
                </p>
                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-50 flex items-center gap-2">
                  <span className="text-[10px] sm:text-sm font-bold text-gray-900">{method.handle}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 p-8 sm:p-12 bg-black rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
          <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-black mb-2 tracking-tight">Need immediate technical help?</h3>
              <p className="text-white/60 font-medium">Our support team is available 24/7 via WhatsApp.</p>
            </div>
            <a 
              href="https://wa.me/8801788977156" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-[#25D366] hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 text-center"
            >
              Start Chat Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

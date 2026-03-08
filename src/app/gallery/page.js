"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// serif font setup (for title and letter)
const serifFont = "'Playfair Display', serif"; 

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  // Button definitions (Colors and Links)
  const buttons = [
    { name: "📸 Photos", color: "from-[#FB5582] to-[#FF75A2]", link: "/gallery/photos" },
    { name: "🎥 Videos", color: "from-[#8C74FF] to-[#A28CFF]", link: "/gallery/videos" },
    { name: "🎵 Playlist", color: "from-[#00BFFF] to-[#55EAFF]", link: "/gallery/playlist" },
    { name: "💌 Love Letter", color: "from-[#EA3980] to-[#FB5A9A]", link: "/gallery/letters" },
    { name: "⏳ Our Journey", color: "from-[#FF8C00] to-[#FFA744]", link: "/gallery/timeline" },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-black text-white p-6 md:p-10">
      
      {/* 🖤 Black & White Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* Basic dark overlay for text readability (Pink shadow removed completely) */}
      <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[1.5px]"></div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center space-y-10 md:space-y-16">
        
        {/* ⭐ TOP SECTION: Anniversary Message */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-full flex flex-col items-center justify-center text-center space-y-6"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#F0F0F0]">
            Happy Anniversary, Irish! <span className="text-[#FB5582]">❤️</span>
          </h1>
          
          <p style={{ fontFamily: serifFont }} className="text-xl md:text-2xl text-white/95 leading-relaxed font-light tracking-wide max-w-4xl px-4 md:px-0">
            Thank you for walking into my life and making it so incredibly beautiful. This little corner of the internet is a token of my love—a digital home for our most cherished memories. Every single picture and video here holds a piece of my heart. September 13th will always be one of the greatest days of my life because that's when our beautiful journey began. I can't wait to make countless more memories with you holding my hand.
          </p>
          
          <p style={{ fontFamily: serifFont }} className="mt-6 text-2xl text-white/95 font-medium italic">
            - Yours always, Rajdeep.
          </p>
        </motion.div>

        {/* 🗺️ BOTTOM SECTION: Floating Glass Menu (Buttons shortened) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          // Card tar width w-fit kore diyechi jate button er baire na beroy
          className="w-fit p-6 flex flex-col items-center space-y-3 backdrop-blur-xl bg-black/40 border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h2 className="text-xs font-bold text-white/70 mb-2 text-center tracking-widest uppercase">
            Explore
          </h2>
          
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(btn.link)}
              /* Ekhane w-[220px] kore fixed choto width diyechi jate "lomba" na hoy */
              className={`w-[220px] py-2.5 px-5 rounded-full text-white font-bold text-sm shadow-md bg-gradient-to-r ${btn.color} transition-all duration-300 flex items-center justify-between border border-white/30`}
            >
              <span className="flex items-center space-x-2">{btn.name}</span>
              <span className="text-base opacity-70">→</span>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
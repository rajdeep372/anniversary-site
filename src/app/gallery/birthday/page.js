"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const serifFont = "'Playfair Display', serif";

export default function BirthdayPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🖤 Wider Page Background Image (Darkened) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 transition-all duration-1000 grayscale-[30%]"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* Floating Sparkles Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0, scale: Math.random() }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 1, 0],
              x: Math.random() * 200 - 100
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute bg-amber-200 rounded-full blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Home Button */}
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={() => router.push("/gallery")}
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
      >
        ← Back
      </motion.button>

      {/* 🎁 Main Content Container (glass look, full bg pic, with sparkles overlay) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-amber-500/30 p-8 md:p-12 rounded-[2rem] shadow-[0_0_50px_rgba(251,191,36,0.1)] text-center mt-12 overflow-hidden"
      >
        {/* Container's own background image overlay (from image_11.png) */}
        <div 
          className="absolute inset-0 rounded-[2rem] bg-cover bg-center opacity-40 z-[-1]"
          style={{ backgroundImage: "url('/irish_full.jpg')" }} 
        ></div>
        
        {/* !!! The emoji block is completely gone !!! */}
        {/* The `h1` starts immediately inside the container */}

        <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mb-6 tracking-wide drop-shadow-lg">
          Happy Birthday, Irish
        </h1>

        <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-light italic">
          <p>
            Today isn't just another day. It is the day the universe decided to bring my greatest blessing into existence.
          </p>
          <p>
            While September 13th is the day my life changed because you became mine, March 13th is the reason I have a "mine" to hold. You make every ordinary moment feel like magic, simply by being in it.
          </p>
          <p>
            I wish you endless joy, unbreakable peace, and all the love this world has to offer. I am so incredibly proud of the woman you are, and even prouder to be yours.
          </p>
          <p className="text-amber-300 font-semibold pt-4 drop-shadow-md">
            Here is to celebrating you today, and loving you forever. ❤️
          </p>
        </div>

        {/* 🎵 Now Playing Indicator (Visible UI box) */}
        <div className="mt-10 flex items-center justify-center space-x-3 bg-white/5 border border-white/10 py-3 px-6 rounded-full w-fit mx-auto shadow-xl">
          <div className="flex space-x-1 items-end h-4">
            <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-amber-400 rounded-full"></motion.div>
            <motion.div animate={{ height: [12, 6, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-amber-400 rounded-full"></motion.div>
            <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-amber-400 rounded-full"></motion.div>
            <motion.div animate={{ height: [16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-amber-400 rounded-full"></motion.div>
          </div>
          <p className="text-xs uppercase tracking-widest text-amber-200 font-bold">
            Perfect Is Playing... 🎵
          </p>
        </div>
      </motion.div>

      {/* 🙈 Hidden YouTube Audio Player (Audio-only version, starts immediately from lyrics) */}
    {/* 🙈 Hidden YouTube Audio Player (Ed Sheeran - Perfect) */}
      <div className="absolute opacity-0 pointer-events-none w-px h-px overflow-hidden -z-50">
        <iframe 
          width="100" 
          height="100" 
          src="https://www.youtube.com/embed/iKzRIweSBLA?autoplay=1&controls=0&loop=1&playlist=iKzRIweSBLA" 
          title="Audio"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}
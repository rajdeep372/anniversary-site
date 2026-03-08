"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serifFont = "'Playfair Display', serif"; 

export default function LettersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden p-4 md:p-6">
      
      {/* Home Button */}
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={() => router.push("/gallery")}
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-rose-400/70 to-pink-500/70 backdrop-blur-md border border-white/20"
      >
        ← Home
      </motion.button>

      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-20"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-200 mb-2 drop-shadow-lg">
            My First Letter
          </h1>
          <p className="text-sm md:text-base text-white/80 italic">
            Tap the envelope to read. 💌
          </p>
        </motion.div>

        {/* Envelope & Letter Container */}
        <div className="relative w-full max-w-lg flex flex-col items-center justify-center">
          
          {/* 📄 The Letter (Original Text) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: -120, scale: 1 }} // Moves high up
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[420px] p-6 md:p-10 rounded-xl bg-[#FDFBF7] shadow-2xl border border-amber-900/10 text-gray-800"
                style={{ 
                  backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
                }}
              >
                <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-5">
                  <h2 style={{ fontFamily: serifFont }} className="text-lg md:text-xl font-bold text-rose-800">For Irish ❤️</h2>
                  <span className="text-xs font-semibold text-gray-400">March 13th</span>
                </div>
                
                <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed" style={{ fontFamily: serifFont }}>
                  <p>My Dearest Irish,</p>
                  <p>
                    I know I have never written you a love letter before. Honestly, I always thought my actions would speak louder than words. But as our anniversary approached, I realized that some feelings are simply too big, too beautiful, to be left unspoken.
                  </p>
                  <p>
                    Since the day you walked into my life, everything changed. You brought light to my darkest days and gave me a thousand new reasons to smile. Every memory we've made, from our scooty rides to our quiet moments, is a treasure I keep locked in my heart.
                  </p>
                  <p>
                    Thank you for being my peace, my best friend, and my greatest love. I promise to hold your hand through every chapter of our lives. This might be my first letter to you, but my love for you has been writing itself since day one.
                  </p>
                  <p className="pt-4 font-bold text-rose-800 italic">
                    Forever Yours,<br/>Rajdeep
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 💌 The Envelope (Moves DOWN and stays behind when open) */}
          <motion.div 
            onClick={() => setIsOpen(!isOpen)}
            animate={isOpen ? { y: 180, opacity: 0.1, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`relative z-0 w-[280px] h-[180px] md:w-[350px] md:h-[230px] bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow-2xl flex justify-center items-center cursor-pointer ${isOpen ? 'pointer-events-auto' : 'pointer-events-auto'}`}
          >
            <div className="absolute inset-0 border-2 md:border-4 border-white/20 rounded-lg"></div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex justify-center items-center shadow-lg z-30">
              <span className={`text-2xl md:text-3xl ${!isOpen && 'animate-pulse'}`}>❤️</span>
            </div>
            {!isOpen && (
              <p className="absolute bottom-4 text-white/70 text-[10px] md:text-xs font-medium tracking-widest uppercase">
                Tap to Open
              </p>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
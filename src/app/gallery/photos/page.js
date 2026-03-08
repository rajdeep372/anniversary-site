"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// serif font (cute factor adding)
const serifFont = "'Playfair Display', serif"; 

// Memory data structure
// Chobi gulo public/photos/ folder e sequence e thakte hobe (pic1.jpg, pic2.jpg...)
const memories = [
  { id: 1, text: "The day it all began... ❤️", image: "/pic1.jpg" },
  { id: 2, text: "That smile! Can't handle it... 😍", image: "/pic2.jpg" },
  { id: 3, text: "Our favorite coffee spot ☕", image: "/pic3.jpg" },
  { id: 4, text: "Beach day memories 🏝️", image: "/pic4.jpg" },
  { id: 5, text: "You look so graceful here...", image: "/pic5.jpg" },
  { id: 6, text: "Hold my hand forever...", image: "/pic6.jpg" },
  { id: 7, text: "Just us two...", image: "/pic7.jpg" },
  { id: 8, text: "The first anniversary walk...", image: "/pic8.jpg" },
  // Aro chobi add korte chaile nicher line tar theke double slash (//) soriye dao:
  { id: 9, text: "My favorite Pujo view. 🌺✨", image: "/pic9.jpg" },
   { id: 10, text: "Christmas magic with you. 🎄❄️", image: "/pic10.jpg" },
    { id: 11, text: "Stealing a quiet moment just for us. 🥰", image: "/pic11.jpg" },
     { id: 12, text: "Just Peter Parker and his MJ. 🕷️❤️", image: "/pic12.jpg" },
      { id: 13, text: "My real-life Ghibli magic. 🍃✨", image: "/pic13.jpg" },
];

export default function PhotosPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hoveredPhotoId, setHoveredPhotoId] = useState(null);

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
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden p-6 md:p-10">
      
      {/* 🤍 Cute "Back to Home" Button */}
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={() => router.push("/gallery")}
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-pink-400/70 to-rose-400/70 backdrop-blur-md border border-white/20"
      >
        ← Home
      </motion.button>

      {/* 🖤 B&W background image reuse for continuity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-20"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center space-y-12">
        
        {/* ⭐ TOP TITLE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-rose-100 mb-2">
            Our Memories
          </h1>
          <p className="text-base text-white/70 italic max-w-xl mx-auto px-4">
            A small collection of beautiful moments captured in time. Roll over each photo to unlock its story.
          </p>
        </motion.div>

        {/* 🗺️ PHOTO GRID SECTION */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full px-4"
        >
          {memories.map((memo) => (
            <motion.div
              key={memo.id}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateZ: Math.random() > 0.5 ? 2 : -2, 
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="relative aspect-[3/4] w-full max-w-sm mx-auto group"
              onMouseEnter={() => setHoveredPhotoId(memo.id)}
              onMouseLeave={() => setHoveredPhotoId(null)}
            >
              {/* Actual Photo Frame */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(251,85,130,0.4)]">
                <img 
                  src={memo.image} 
                  alt={memo.text} 
                  className="w-full h-full object-cover transition-all duration-500 brightness-100 group-hover:brightness-110" 
                />
              </div> {/* 👈 Ei div tai problem korchilo, ekhon theek kore dewa hoyeche */}
              
              {/* Cute caption appearance logic on Hover */}
              <AnimatePresence>
                {hoveredPhotoId === memo.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/20 shadow-2xl"
                  >
                    <p style={{ fontFamily: serifFont }} className="text-base text-white leading-relaxed font-light tracking-wide text-center drop-shadow-sm">
                      {memo.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <div className="h-10"></div>

      </div>
    </div>
  );
}
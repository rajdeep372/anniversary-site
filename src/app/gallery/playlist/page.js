"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Font setup
const serifFont = "'Playfair Display', serif"; 

// 🎵 Playlist Data Structure
// Ekhane Spotify er Track ID dite hobe.
const playlistSongs = [
  {
    id: 1,
    spotifyId: "2LcXJP95e4HKydTZ2mYfrx", // Tumi Jake Bhalobasho (?utm chara sudhu ID ta rakhlei hobe)
    message: "Because my heart only knows how to love you.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: 2,
    spotifyId: "7wZm6u4DZg5wAuvNb6meTQ", // Keno Je Toke
    message: "I still wonder how I got so lucky to have you in my life.",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    spotifyId: "5FXMRdJjKq1BIX4e8Eg9mK", // Bojhena Shey Bojhena
    message: "Words fall short when I look into your eyes.",
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 4,
    spotifyId: "6qoV6FR77IYLdfy226hIC8", // Uru Uru Shopne
    message: "Every moment with you feels like a beautiful dream I never want to wake up from.",
    color: "from-emerald-400 to-teal-500"
  }
];

export default function PlaylistPage() {
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
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden p-6 md:p-10">
      
      {/* 🤍 Cute "Back to Home" Button */}
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={() => router.push("/gallery")}
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-blue-400/70 to-cyan-400/70 backdrop-blur-md border border-white/20"
      >
        ← Home
      </motion.button>

      {/* 🖤 Background Image (Darkened) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-20"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* 🌈 Animated Colorful Background Orbs for Vibe */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-12 mt-4">
        
        {/* ⭐ TOP TITLE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 mb-2 drop-shadow-lg">
            Our Melody
          </h1>
          <p className="text-base text-white/80 italic max-w-xl mx-auto px-4">
            Some songs perfectly describe what you mean to me. Press play. 🎧
          </p>
        </motion.div>

        {/* 🎵 PLAYLIST GRID SECTION */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="w-full flex flex-col space-y-6 px-2"
        >
          {playlistSongs.map((song) => (
            <motion.div
              key={song.id}
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              // Hover korle background color ektu glow korbe (premium touch)
              className={`flex flex-col md:flex-row items-center gap-6 p-2 rounded-[2rem] backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden group hover:bg-white/15 transition-all duration-300`}
            >
              {/* Spotify Embed Player - FIXED URL STRUCTURE */}
              <div className="w-full md:w-[350px] h-[152px] rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-inner">
                <iframe 
                  style={{ borderRadius: "12px" }} 
                  src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Romantic Message Content */}
              <div className="flex-1 px-4 pb-4 md:pb-0 md:px-6 flex flex-col justify-center text-center md:text-left">
                {/* Colored Line ektu mota ar vibrant kora hoyeche */}
                <div className={`w-16 h-1.5 rounded-full mb-4 mx-auto md:mx-0 bg-gradient-to-r ${song.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}></div>
                <p style={{ fontFamily: serifFont }} className="text-lg md:text-xl text-white/95 leading-relaxed font-medium tracking-wide italic">
                  "{song.message}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="h-10"></div>
      </div>
    </div>
  );
}
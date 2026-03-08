"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Font setup
const serifFont = "'Playfair Display', serif"; 

// Video Data Structure
// Video gulo public/videos/ folder e thakte hobe
const videoMemories = [
  { 
    id: 1, 
    title: "Our Funny Moments 😂", 
    text: "Never a dull moment when I'm with you.", 
    src: "/vid1.mp4" 
  },
  { 
    id: 2, 
    title: "That Special Day ✨", 
    text: "A memory I will replay in my heart forever.", 
    src: "/videos/vid2.mp4" 
  },
  { 
    id: 3, 
    title: "Just Being Us ❤️", 
    text: "In our own little world, completely lost in each other.", 
    src: "/videos/vid3.mp4" 
  },
  { 
    id: 4, 
    title: "Morning Scooty Rides 🛵", 
    text: "Romantic songs, and your hand in mine.", 
    src: "/vid4.mp4" 
  }
];

export default function VideosPage() {
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
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-purple-400/70 to-indigo-400/70 backdrop-blur-md border border-white/20"
      >
        ← Home
      </motion.button>

      {/* 🖤 B&W background image reuse for continuity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-20"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center space-y-12">
        
        {/* ⭐ TOP TITLE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-4"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200 mb-2 drop-shadow-lg">
            Cinematic Memories
          </h1>
          <p className="text-base text-white/70 italic max-w-xl mx-auto px-4">
            Press play to relive the moments where time stood still for us.
          </p>
        </motion.div>

        {/* 🎥 VIDEO GRID SECTION */}
        {/* Videos chobir theke boro hoy, tai amra grid-cols-2 use korchi boro screen er jonno */}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4"
        >
          {videoMemories.map((video) => (
            <motion.div
              key={video.id}
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl group hover:shadow-[0_10px_40px_rgba(140,116,255,0.3)] transition-all"
            >
              {/* Video Player */}
              <div className="w-full aspect-video bg-black/50">
                <video 
                  controls 
                  muted /* <-- Ekhane muted add kore diyechi */
                  preload="metadata"
                  className="w-full h-full object-cover outline-none"
                  poster="/bg.jpg" // Video play korar aage ei chobi ta dekhabe
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Caption Section */}
              <div className="p-6 flex flex-col space-y-2">
                <h3 style={{ fontFamily: serifFont }} className="text-xl font-bold text-indigo-200 tracking-wide">
                  {video.title}
                </h3>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {video.text}
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
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const serifFont = "'Playfair Display', serif"; 

// ⏳ Tomader Journey-r Dates
const journeyEvents = [
  {
    date: "August 15, 2023",
    title: "The Day We Met ❤️",
    description: "The moment my life changed forever. I still remember what you were wearing.",
    icon: "✨"
  },
  {
    date: "August 20, 2024",
    title: "Our First Date ☕",
    description: "Nervous smiles, long talks, and the realization that you are the one.",
    icon: "👫"
  },
  {
    date: "September 13, 2024",
    title: "The First 'I Love You' 💌",
    description: "Saying those three words felt like the most natural thing in the world.",
    icon: "💖"
  },
  {
    date: "December 25, 2024",
    title: "Our First Christmas 🎄",
    description: "Cold winter breeze, warm hugs, and a promise to stay forever.",
    icon: "❄️"
  },
  {
    date: "September 13, 2025",
    title: "1st Anniversary 🎂",
    description: "One year down, a lifetime to go. Happy Anniversary, Irish!",
    icon: "💍"
  }
];

export default function TimelinePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Counter State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }

    // 🕒 Live Counter Logic (From Sept 13, 2024)
    const startDate = new Date("2024-09-13T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-x-hidden p-6 md:p-10">
      
      {/* Home Button */}
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={() => router.push("/gallery")}
        className="absolute top-6 left-6 z-50 py-2 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-amber-400/70 to-orange-500/70 backdrop-blur-md border border-white/20"
      >
        ← Home
      </motion.button>

      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-20"
        style={{ backgroundImage: "url('/bg.jpg')" }} 
      ></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 style={{ fontFamily: serifFont }} className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100 mb-4">
            Our Beautiful Journey
          </h1>
          <p className="text-white/60 italic">Every second spent with you is a memory I treasure.</p>
        </motion.div>

        {/* ⭐ LIVE COUNTER SECTION (NEW ADDITION) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-2xl p-6 md:p-8 rounded-[2rem] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl mb-20 text-center"
        >
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/80 mb-6">
            Time Since We Said "I Love You"
          </h2>
          
          <div className="flex justify-center gap-4 md:gap-8 items-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 mt-2 font-semibold">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vertical Timeline Line */}
        <div className="relative w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-amber-500/50 via-orange-500/50 to-transparent"></div>

          <div className="space-y-24">
            {journeyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                {/* Content Card */}
                <div className="w-[45%] p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all">
                  <span className="text-amber-400 font-bold text-sm tracking-widest">{event.date}</span>
                  <h3 style={{ fontFamily: serifFont }} className="text-xl md:text-2xl text-white mt-1 mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                </div>

                {/* Center Circle Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 border-4 border-black z-10 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                  {event.icon}
                </div>

                {/* Empty space for the other side */}
                <div className="w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 mb-20 text-center"
        >
          <p style={{ fontFamily: serifFont }} className="text-2xl text-amber-200 italic">
            "And the best is yet to come..."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
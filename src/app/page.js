"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const bodyData = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          // Login successful hole token save kore gallery te pathabo
          localStorage.setItem("token", data.token);
          router.push("/gallery"); 
        } else {
          // Signup successful hole login page e firiye debo
          alert("Account Created Successfully! Please Log In.");
          setIsLogin(true);
          setPassword(""); // Password field faka kore dewa
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-2xl max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-2 drop-shadow-md">
          {isLogin ? "Welcome Back" : "Create Memory"}
        </h1>
        <p className="text-center text-white/90 mb-6 font-medium">
          13th September - A journey of togetherness ❤️
        </p>

        {error && (
          <div className="bg-red-500/80 text-white p-3 rounded-xl mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Name</label>
              <input 
                type="text" 
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                placeholder="E.g., Irish"
              />
            </div>
          )}
          
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Secret Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-1">Special Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 text-white font-bold py-3 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg flex justify-center"
          >
            {loading ? "Processing..." : (isLogin ? "Unlock Memories" : "Start Journey")}
          </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          {isLogin ? "Don't have access?" : "Already have the key?"}{" "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-bold underline hover:text-pink-200 transition-colors"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
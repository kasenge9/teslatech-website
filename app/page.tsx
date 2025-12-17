"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Leaf, Cpu, Terminal, ShieldCheck, 
  Mail, Lock, ArrowRight, LogOut, Activity, Search
} from "lucide-react";

// --- DATA: ENGINEERING PROJECTS ---
const projects = [
  { title: "Solar-Powered Motor", desc: "98% Efficiency BLDC Optimization.", icon: <Zap className="text-yellow-400" />, stats: "Active", link: "https://gumroad.com/l/ysegl" },
  { title: "Bio-Waste Converter", desc: "Thermal monitoring AI systems.", icon: <Leaf className="text-green-400" />, stats: "Testing", link: "https://gumroad.com/l/ysegl" },
  { title: "Voice-Home System", desc: "Edge-device neural automation.", icon: <Cpu className="text-blue-400" />, stats: "V2.1 Stable", link: "https://gumroad.com/l/ysegl" },
];

export default function TeslaTechHome() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register" | "recovery">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // --- CHECK AUTH SESSION ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, [supabase]);

  // --- AUTH HANDLERS ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (authMode === "register") {
      const { error } = await supabase.auth.signUp({ email, password });
      error ? setMessage(error.message) : setMessage("Check email for verification!");
    } else if (authMode === "login") {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      error ? setMessage(error.message) : setUser(data.user);
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      error ? setMessage(error.message) : setMessage("Recovery link sent to email.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="border-2 border-indigo-500 border-t-transparent w-8 h-8 rounded-full mb-4" />
      <span className="text-indigo-500 tracking-widest text-xs">BOOTING_TESLATECH_OS...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic">T</div>
          <span className="text-xl font-black tracking-tighter uppercase tracking-widest">TeslaTech</span>
        </div>
        {user && (
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors">
            TERMINATE_SESSION <LogOut size={14} />
          </button>
        )}
      </nav>

      <AnimatePresence mode="wait">
        {!user ? (
          /* --- STATE 1: SECURITY GATE (AUTH) --- */
          <motion.section 
            key="auth" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl shadow-2xl">
              <div className="text-center mb-8">
                <ShieldCheck className="mx-auto text-indigo-500 mb-4" size={56} />
                <h2 className="text-4xl font-black mb-2 italic">
                  {authMode === "login" ? "SECURITY" : authMode === "register" ? "IDENTITY" : "RECOVERY"}
                </h2>
                <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Node Access Control</p>
              </div>

              

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500" size={18} />
                  <input type="email" placeholder="Engineering Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 transition-all" />
                </div>
                {authMode !== "recovery" && (
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500" size={18} />
                    <input type="password" placeholder="Passcode" required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 transition-all" />
                  </div>
                )}
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95">
                  {authMode === "login" ? "INITIALIZE SESSION" : authMode === "register" ? "CREATE IDENTITY" : "SEND RECOVERY"} <ArrowRight size={18} />
                </button>
              </form>

              {message && <p className="mt-4 text-center text-xs text-indigo-400 font-mono uppercase tracking-widest">{message}</p>}

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3 text-center">
                <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {authMode === "login" ? "Need Identity? Register" : "Return to Login"}
                </button>
                <button onClick={() => setAuthMode("recovery")} className="text-xs text-gray-600 hover:text-indigo-400 transition-colors">
                  Lost security key?
                </button>
              </div>
            </div>
          </motion.section>
        ) : (
          /* --- STATE 2: ENGINEERING COMMAND CENTER (DASHBOARD) --- */
          <motion.section 
            key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Header */}
              <div className="lg:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 bg-white/5 p-10 rounded-[40px] border border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                    <Activity size={14} className="animate-pulse" /> SYSTEM_LIVE: {user.email}
                  </div>
                  <h1 className="text-6xl font-black tracking-tighter uppercase italic">COMMAND CENTER</h1>
                </div>
                <div className="mt-6 md:mt-0">
                   <p className="text-gray-500 text-sm font-mono">STATUS: OPTIMIZED</p>
                </div>
              </div>

              

              {/* Dynamic Project Cards */}
              {projects.map((p, i) => (
                <motion.div key={i} whileHover={{ y: -8, borderColor: "rgba(99, 102, 241, 0.5)" }} className="group p-8 rounded-[32px] bg-white/5 border border-white/10 transition-all">
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 group-hover:bg-indigo-500/20 transition-colors">{p.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 uppercase italic">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">{p.desc}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{p.stats}</span>
                    <a href={p.link} target="_blank" className="text-xs font-black hover:text-indigo-400 underline underline-offset-8">VIEW_DOCS</a>
                  </div>
                </motion.div>
              ))}

              {/* AI Research Node */}
              <div className="lg:col-span-3 mt-12 p-12 bg-indigo-600 rounded-[48px] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                <div className="md:w-1/2 relative z-10">
                  <h2 className="text-5xl font-black mb-4 italic uppercase">Neural Link</h2>
                  <p className="text-indigo-100/70 mb-10 text-lg leading-relaxed">Integrated engineering intelligence for real-time validation of electrical schematics and PV-load calculations.</p>
                  <a href="https://gemini.google.com" target="_blank" className="inline-block px-12 py-5 bg-black text-white rounded-full font-black hover:bg-white hover:text-black transition-all transform hover:scale-105">LAUNCH_AI</a>
                </div>
                <div className="md:w-1/2 w-full h-[350px] bg-black/30 rounded-[32px] border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-black/40 transition-all">
                   <Terminal className="text-indigo-400 opacity-20 group-hover:opacity-40 transition-opacity" size={100} />
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="mt-20 py-12 border-t border-white/5 text-center text-gray-600 text-[10px] font-mono tracking-[0.3em] uppercase">
        © 2025 TeslaTech Investments • Engineered by Brian Mwendwa
      </footer>
    </div>
  );
}

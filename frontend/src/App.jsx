import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Webcam from 'react-webcam'
import axios from 'axios'
import { 
  Camera, Mic, Volume2, StopCircle, Play, 
  Activity, Zap, Shield, Globe, ChevronRight,
  Heart, Droplets, Utensils, CheckCircle, XCircle, HelpCircle, Smile, Hand, Info, 
  Database, Cpu, Share2, Layers,
  User, Lock, Mail, ArrowRight, BookOpen, LogOut
} from 'lucide-react'

// Neural Core 3D Visualization Component
const NeuralCore = () => (
  <div className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px] overflow-hidden rounded-[3rem] bg-black/40 border border-white/5 shadow-2xl">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-20" style={{ 
      backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
      backgroundSize: '40px 40px' 
    }} />
    
    {/* Server Racks Simulation */}
    <div className="absolute inset-0 flex justify-between px-12 py-20 opacity-30">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="w-12 h-full bg-gradient-to-t from-cyan-900/40 to-transparent rounded-lg border-x border-cyan-500/20 flex flex-col gap-2 p-1">
                {[...Array(10)].map((_, j) => (
                    <div key={j} className={`w-full h-1 rounded-full ${Math.random() > 0.5 ? 'bg-cyan-500/60 shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'bg-gray-800'}`} />
                ))}
            </div>
        ))}
    </div>

    {/* Central Core Beam */}
    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent w-[300px] mx-auto blur-3xl opacity-50" />

    {/* 3D Floating Cube */}
    <div className="relative w-32 h-32 preserve-3d animate-spin-slow">
        {/* Cube Faces */}
        {[
            "rotateY(0deg) translateZ(64px)",
            "rotateY(90deg) translateZ(64px)",
            "rotateY(180deg) translateZ(64px)",
            "rotateY(270deg) translateZ(64px)",
            "rotateX(90deg) translateZ(64px)",
            "rotateX(-90deg) translateZ(64px)"
        ].map((transform, i) => (
            <div key={i} className="absolute inset-0 bg-cyan-500/10 border-2 border-cyan-400/40 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden" style={{ transform }}>
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                <Cpu size={32} className="text-cyan-400 opacity-80 animate-pulse" />
            </div>
        ))}
        {/* Floating Nodes */}
        <div className="absolute -inset-10 border border-cyan-500/20 rounded-full animate-ping-slow" />
        <div className="absolute -inset-20 border border-blue-500/10 rounded-full animate-ping-slower" />
    </div>

    {/* HUD Elements */}
    <div className="absolute bottom-8 left-8 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] text-cyan-500 font-mono font-black uppercase tracking-widest">
            <Activity size={10} /> Core_Status: Active
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono uppercase tracking-widest">
            Neural_Buffer: 99.4%
        </div>
    </div>
  </div>
)

// Holographic Hand Mesh Visualization Component
const HolographicHand = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {/* Background Glow */}
    <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full animate-glow-pulse" />
    
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
        {/* Wireframe Mesh Pattern */}
        <defs>
            <pattern id="mesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="handGrad">
                <stop offset="0%" stopColor="rgba(6,182,212,0.4)" />
                <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
            </radialGradient>
        </defs>

        {/* Hand Silhouette with Mesh */}
        <path 
            d="M30,80 Q30,90 45,90 Q60,90 60,80 L60,40 Q60,30 50,30 Q40,30 40,40 Z" 
            fill="url(#handGrad)" 
            className="animate-pulse"
        />
        
        {/* Detailed Wireframe Hand Path (Simplified representation of mesh) */}
        <g stroke="rgba(6,182,212,0.6)" strokeWidth="0.5" fill="none">
            {/* Palm & Fingers */}
            <path d="M35,85 L45,85 L55,85 Q65,85 65,75 L65,40 Q65,30 55,30 Q45,30 45,40 L45,75" className="animate-glow-pulse" />
            <path d="M40,70 L50,70 L60,70" opacity="0.5" />
            <path d="M40,55 L50,55 L60,55" opacity="0.5" />
            
            {/* Animated Nodes */}
            {[
                {cx:45, cy:30}, {cx:55, cy:30}, {cx:65, cy:40}, 
                {cx:45, cy:85}, {cx:55, cy:85}, {cx:35, cy:85}
            ].map((p, i) => (
                <circle key={i} cx={p.cx} cy={p.cy} r="1" fill="#22d3ee">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2+i*0.5}s`} repeatCount="indefinity" />
                </circle>
            ))}
        </g>
        
        {/* Scanning Line */}
        <motion.line 
            x1="20" y1="20" x2="80" y2="20" 
            stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2"
            animate={{ y: [0, 60, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
    </svg>

    {/* Digital Floating Particles */}
    {[...Array(8)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
                x: [Math.random()*100-50, Math.random()*100-50],
                y: [Math.random()*100-50, Math.random()*100-50],
                opacity: [0, 1, 0]
            }}
            transition={{ duration: 3+Math.random()*2, repeat: Infinity }}
        />
    ))}
  </div>
)

// Background Animation Component
const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-[120px]"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1], 
          x: [0, -60, 0], 
          y: [0, -40, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[150px]"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[40%] left-[40%] w-[800px] h-[800px] rounded-full bg-pink-600/10 blur-[150px]"
      />
    </div>
  )
}

// Global NavBar
const NavBar = ({ currentView, setView }) => {
  if (currentView === 'auth') return null; 

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center neon-border group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300">
            <Camera size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Echo<span className="text-cyan-400">Gest</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button onClick={() => setView('home')} className={`transition-colors ${currentView === 'home' ? 'text-cyan-400 font-bold underline underline-offset-8 decoration-2' : 'hover:text-cyan-400'}`}>Home</button>
          <button onClick={() => setView('reference')} className={`transition-colors flex items-center gap-2 ${currentView === 'reference' ? 'text-cyan-400 font-bold underline underline-offset-8 decoration-2' : 'hover:text-cyan-400'}`}>
             Dictionary
          </button>
          <button onClick={() => setView('workspace')} className={`transition-colors flex items-center gap-2 ${currentView === 'workspace' ? 'text-cyan-400 font-bold underline underline-offset-8 decoration-2' : 'hover:text-cyan-400'}`}>
             Workspace
          </button>
        </div>

        <button 
          onClick={() => setView('auth')}
          className="px-6 py-2.5 rounded-full glass-panel text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2 border border-white/10"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </nav>
  )
}

// Authentication View
const AuthView = ({ setView }) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setView('home')
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 w-full min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel-heavy rounded-3xl p-8 border border-white/10 neon-border-purple shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mx-auto mb-4 neon-border shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              <Camera size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join EchoGest'}</h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Enter your credentials to access your workspace.' : 'Create an account to start translating gestures.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" required placeholder="John Doe" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors" />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" required placeholder="name@company.com" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" required placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Landing Page Mode
const LandingView = ({ setView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 w-full pt-20"
    >
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="flex flex-col items-start text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Zap size={14} className="text-cyan-400" />
              Engine Version 2.0 Active
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight"
            >
              Translate <br />
              <span className="text-gradient">Silence.</span>
            </motion.h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-light">
              Real-time sign language recognition using advanced neural networks. Bridge the communication gap instantly.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                onClick={() => setView('workspace')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-300 flex items-center gap-2 group"
              >
                Access Interface
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setView('reference')} className="px-8 py-4 rounded-full glass-panel text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300 border border-white/10">
                View Dictionary
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative hidden lg:block h-[600px] perspective-1000"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-600/10 rounded-3xl border border-white/10 glass-panel-heavy shadow-2xl overflow-hidden p-6"
            >
              <div className="w-full h-full rounded-2xl border border-white/5 bg-black/50 relative overflow-hidden flex flex-col">
                <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-xs text-white/20 font-mono">vision_core.sys</div>
                </div>
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12">
                  <div className="relative group perspective-[1000px]">
                      <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                      <HolographicHand />
                      
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex flex-col items-center">
                        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-mono uppercase tracking-[0.2em] animate-pulse">
                          core_vision_engine: active
                        </div>
                      </div>
                  </div>
                </div>
                <div className="h-20 bg-white/5 border-t border-white/5 p-4 py-8 flex items-center justify-between">
                  <div className="pl-4">
                    <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.2em] mb-1">inference_active</div>
                    <div className="text-xl font-bold text-white tracking-tight">"Hello"</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-sm pr-4">
                    99.4%
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

// Reference Page Component
const ReferenceView = ({ setView }) => {
    const dictionary = [
        { word: "Hello", desc: "Raise hand, palm facing out, move hand side to side.", visual: "👋", icon: Camera, color: "from-cyan-500 to-blue-500" },
        { word: "Thank you", desc: "Bring fingers to lips, then move hand forward and down.", visual: "🙏", icon: Shield, color: "from-green-500 to-emerald-500" },
        { word: "Help", desc: "Fist with thumb up on open palm, moving upward.", visual: "🆘", icon: HelpCircle, color: "from-red-500 to-orange-500" },
        { word: "Yes", desc: "Make a fist and nod it up and down.", visual: "✅", icon: CheckCircle, color: "from-emerald-400 to-teal-600" },
        { word: "No", desc: "Extended index/middle fingers tap against thumb.", visual: "❌", icon: XCircle, color: "from-rose-500 to-red-600" },
        { word: "Water", desc: "W-sign fingers tap index finger to chin.", visual: "💧", icon: Droplets, color: "from-blue-400 to-cyan-600" },
        { word: "Food", desc: "Pinch fingers and tap against mouth.", visual: "🍎", icon: Utensils, color: "from-orange-400 to-red-500" },
        { word: "I love you", desc: "Thumb, index, and pinky extended.", visual: "🤟", icon: Heart, color: "from-pink-500 to-rose-600" },
        { word: "Sorry", desc: "Clenched fist in circular motion on chest.", visual: "😔", icon: Smile, color: "from-amber-400 to-yellow-600" },
        { word: "Please", desc: "Open palm in circular motion on chest.", visual: "👐", icon: Hand, color: "from-indigo-500 to-purple-600" }
    ]

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
        >
            {/* Dictionary Hero Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                <div className="text-left">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Instructional <br/><span className="text-gradient">Dictionary</span></h2>
                    <p className="text-gray-400 text-lg max-w-xl leading-relaxed font-light">
                        High-fidelity visual references for every gesture. Mimicking the precision of clinical ASL standards for maximum accuracy in the vision core.
                    </p>
                    <div className="mt-10 flex gap-4">
                        <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 border border-cyan-500/20">
                            <Zap className="text-cyan-400" />
                            <div>
                                <div className="text-white font-bold text-sm">10 Gestures</div>
                                <div className="text-gray-500 text-[10px] uppercase tracking-wider">Engine Matched</div>
                            </div>
                        </div>
                        <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 border border-purple-500/20">
                            <Activity className="text-purple-400" />
                            <div>
                                <div className="text-white font-bold text-sm">Real-time</div>
                                <div className="text-gray-500 text-[10px] uppercase tracking-wider">Visual Feedback</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative group perspective-[1000px]">
                    <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    <NeuralCore />
                </div>
            </div>

            {/* Gesture Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dictionary.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="glass-panel-heavy rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover-lift group overflow-hidden"
                    >
                        <div className="p-8 pb-10 flex flex-col items-center text-center">
                            <div className={`w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl shadow-lg relative group-hover:scale-110 transition-transform duration-500`}>
                                {item.visual}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/10">
                                    <item.icon size={14} className="text-white" />
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-start mb-4">
                               <div className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                   "{item.word}"
                               </div>
                               <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-black uppercase tracking-widest">
                                  ASL 101
                               </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-200 transition-colors text-left w-full">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// Application Dashboard Component
const AppDashboard = ({ setView }) => {
    const [predictedText, setPredictedText] = useState('Awaiting Input...')
    const [isRecording, setIsRecording] = useState(false)
    const [trainedWords, setTrainedWords] = useState([])
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [showRef, setShowRef] = useState(false)
    
    const webcamRef = useRef(null)
    const intervalRef = useRef(null)

    const quickRefWords = [
        { word: "Hello", desc: "Wave hand side to side", visual: "👋", color: "text-cyan-400" },
        { word: "Thank you", desc: "Fingers to lips, then out", visual: "🙏", color: "text-green-400" },
        { word: "Water", desc: "W-sign tap to chin", visual: "💧", color: "text-blue-400" },
        { word: "Food", desc: "Pinch and tap mouth", visual: "🍎", color: "text-orange-400" },
        { word: "Yes", desc: "Fist nods up and down", visual: "✅", color: "text-emerald-400" },
        { word: "No", desc: "Index/middle tap thumb", visual: "❌", color: "text-rose-400" }
    ]
    
    useEffect(() => {
        fetchTrainedWords()
    }, [])

    const fetchTrainedWords = async () => {
        try {
            const response = await axios.get('/api/words')
            setTrainedWords(response.data.words || ["Hello", "Thank you", "Help", "Yes", "No", "Water", "Food", "I love you", "Sorry", "Please"])
        } catch (error) {
            setTrainedWords(["Hello", "Thank you", "Help", "Yes", "No", "Water", "Food", "I love you", "Sorry", "Please"])
        }
    }

    const captureAndPredict = async () => {
        if (webcamRef.current && isRecording) {
            const imageSrc = webcamRef.current.getScreenshot()
            if (imageSrc) {
                try {
                    const response = await axios.post('/api/predict', {
                        image: imageSrc.split(',')[1]
                    })
                    if (response.data.prediction) {
                        setPredictedText(response.data.prediction)
                    }
                } catch (error) {}
            }
        }
    }

    useEffect(() => {
        if (isRecording) {
            intervalRef.current = setInterval(captureAndPredict, 800)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isRecording])

    const speakText = () => {
        if ('speechSynthesis' in window && predictedText !== 'Awaiting Input...') {
            setIsSpeaking(true)
            const utterance = new SpeechSynthesisUtterance(predictedText)
            utterance.onend = () => setIsSpeaking(false)
            window.speechSynthesis.speak(utterance)
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 w-full min-h-screen pt-24 pb-12 px-4 md:px-8 flex flex-col"
        >
            <div className="max-w-[1600px] mx-auto w-full mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-white">Neural <span className="text-gradient">Workspace</span></h2>
                    <p className="text-gray-500 mt-2">Core Vision Analysis active on edge hardware.</p>
                </div>
                <button 
                  onClick={() => setShowRef(!showRef)}
                  className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all duration-300 border ${
                    showRef ? 'bg-cyan-500 text-black border-cyan-500' : 'glass-panel text-white hover:bg-white/5 border-white/10'
                  }`}
                >
                  <BookOpen size={20} />
                  {showRef ? 'Close Quick Reference' : 'Open Quick Reference'}
                </button>
            </div>
            
            <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col lg:flex-row gap-8 relative">
                <div className="flex-1 flex flex-col gap-6">
                    <div className="glass-panel-heavy p-2 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex-1 min-h-[500px] flex flex-col shadow-2xl">
                        <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
                            <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full border-none bg-black/40 backdrop-blur-md">
                                <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                                <span className="text-[10px] font-black text-white tracking-[0.2em]">
                                    {isRecording ? 'STREAMING' : 'IDLE'}
                                </span>
                            </div>
                        </div>

                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black flex items-center justify-center border border-white/5">
                            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: "user" }} mirrored className="absolute inset-0 w-full h-full object-cover" />
                            {isRecording && <div className="absolute inset-0 border-[4px] border-cyan-500/20 rounded-[2rem] z-10 animate-glow-pulse pointer-events-none" />}
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2rem] p-4 flex flex-col sm:flex-row gap-4 border border-white/5">
                        <button onClick={() => setIsRecording(!isRecording)} className={`flex-[2] py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${isRecording ? 'bg-red-500/10 border border-red-500/50 text-red-500' : 'bg-cyan-500 text-black'}`}>
                            {isRecording ? <StopCircle size={20} /> : <Play size={20} />}
                            {isRecording ? 'Stop Analysis' : 'Start Analysis'}
                        </button>
                        <button onClick={speakText} className={`flex-1 py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 border border-white/10 bg-white/5 text-white`}>
                           <Volume2 size={20} /> Vocalize
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-[400px] flex flex-col gap-8">
                    <AnimatePresence>
                      {showRef && (
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="glass-panel-heavy rounded-[2.5rem] border border-white/10 p-8 flex-1">
                          <h4 className="font-bold text-white mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">Quick Reference</h4>
                          <div className="space-y-4 overflow-y-auto h-[400px] pr-2 custom-scrollbar">
                              {quickRefWords.map((w, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex items-center gap-4">
                                  <div className="text-2xl">{w.visual}</div>
                                  <div>
                                    <div className={`${w.color} font-bold text-sm`}>"{w.word}"</div>
                                    <div className="text-gray-500 text-[10px]">{w.desc}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="glass-panel-heavy rounded-[2.5rem] border border-white/10 p-8 flex flex-col h-[280px] shadow-2xl">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Neural_Output</h3>
                        <div className="flex-1 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div key={predictedText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-5xl font-black text-white leading-tight">
                                    {predictedText === 'Awaiting Input...' ? <span className="text-gray-700 font-light text-2xl tracking-tight">Listening...</span> : <span className="text-gradient">{predictedText}</span>}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Main App Controller
const App = () => {
    const [currentView, setCurrentView] = useState('auth') 

    return (
        <div className="relative min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-100 bg-[#05050A]">
            <BackgroundParticles />
            <NavBar currentView={currentView} setView={setCurrentView} />
            <AnimatePresence mode="wait">
                {currentView === 'auth' && <AuthView key="auth" setView={setCurrentView} />}
                {currentView === 'home' && <LandingView key="home" setView={setCurrentView} />}
                {currentView === 'reference' && <ReferenceView key="reference" setView={setCurrentView} />}
                {currentView === 'workspace' && <AppDashboard key="workspace" setView={setCurrentView} />}
            </AnimatePresence>
            {currentView !== 'auth' && (
                <footer className="border-t border-white/10 bg-[#020205] pt-20 pb-10 px-6 relative z-10 mt-20">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Camera size={24} className="text-cyan-400" />
                            <span className="text-xl font-bold text-white tracking-tighter">EchoGest</span>
                        </div>
                        <div className="flex gap-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
                           <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
                           <button onClick={() => setCurrentView('reference')} className="hover:text-white transition-colors">Dictionary</button>
                           <button onClick={() => setCurrentView('workspace')} className="hover:text-white transition-colors">Workspace</button>
                        </div>
                        <div className="text-gray-600 text-[10px] uppercase tracking-widest">© 2026 EchoGest Labs</div>
                    </div>
                </footer>
            )}
        </div>
    )
}

export default App
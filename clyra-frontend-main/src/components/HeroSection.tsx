"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Users, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#e8e5e0] pt-20 pb-24 overflow-hidden">
      {/* Pixel-art style background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4a9bc4] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9b7bb8] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-16 pb-20">
          
          {/* Left: Content */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Badge - Clean & Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b7bb8]/10 text-[#6b4a8a] rounded-lg border border-[#9b7bb8]/20 text-sm font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Powered by</span>
                <span className="font-pixel text-[9px]">SEAL</span>
                <span>Technology</span>
              </div>
            </motion.div>

            {/* Main Headline - Professional Typography */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1714] leading-[1.08] tracking-[-0.02em]">
                Your{" "}
                <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
                  Virtual Hospital
                </span>
                <br />
                with AI Doctors
              </h1>
              <p className="text-lg md:text-xl text-[#5c554d] max-w-xl leading-[1.7] font-normal">
                Experience <strong className="font-semibold text-[#1a1714]">Clyra</strong> — powered by <span className="font-pixel text-[10px]">SEAL</span> technology, where multiple AI medical specialists collaborate like real doctors.
              </p>
            </motion.div>

            {/* Simple Agent Flow - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-2.5 pt-2"
            >
              <div className="w-2.5 h-2.5 bg-[#9b7bb8] rounded-full"></div>
              <span className="text-sm text-[#6b4a8a] font-medium">Receptionist</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a8a19a] mx-1" />
              <div className="w-2.5 h-2.5 bg-[#4a9bc4] rounded-full"></div>
              <span className="text-sm text-[#2d7ba8] font-medium">GP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a8a19a] mx-1" />
              <div className="w-2.5 h-2.5 bg-[#6bb84d] rounded-full"></div>
              <span className="text-sm text-[#5a9a3f] font-medium">Specialists</span>
            </motion.div>

            {/* CTAs - Clean & Professional */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <button className="btn btn-primary btn-lg bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8] font-semibold shadow-md hover:shadow-lg transition-all">
                Start Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="btn btn-outline btn-lg border-[#2d7ba8] text-[#2d7ba8] hover:bg-[#e8f4f8] font-medium">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right: Pixel-Art Hospital Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:sticky lg:top-24"
          >
            {/* Animated glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 bg-gradient-to-br from-[#4a9bc4] via-[#9b7bb8] to-[#6bb84d] rounded-3xl blur-2xl opacity-30"
            />
            
            <div className="relative bg-white/90 backdrop-blur-sm border-4 border-[#d4cfc7] rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
              {/* Pixel-art frame effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#4a9bc4] via-[#9b7bb8] to-[#6bb84d] rounded-3xl opacity-25 blur-md"></div>
              
              <div className="relative rounded-xl overflow-hidden border-4 border-[#e8e5e0] bg-[#faf9f7]">
                <Image
                  src="/hero.png"
                  alt="Clyra Virtual Hospital - Pixel Art Medical Facility showing triage, consultation rooms, and patient flow"
                  width={800}
                  height={600}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                  priority
                />
                
                {/* Overlay annotations */}
                <div className="absolute top-4 left-4 bg-[#4a9bc4]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border-2 border-white/50">
                  <span className="text-xs font-pixel">TRIAGE</span>
                </div>
                <div className="absolute top-4 right-4 bg-[#6bb84d]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border-2 border-white/50">
                  <span className="text-xs font-pixel">CONSULTATION</span>
                </div>
              </div>
              
              {/* Floating annotation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white border-4 border-[#4a9bc4] rounded-xl px-6 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4a9bc4]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#4a9bc4]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1a1714]">Simulated Hospital</div>
                    <div className="text-xs text-[#7d756c]">Complete patient journey</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

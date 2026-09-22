"use client";

import { motion } from "framer-motion";
import { MessageSquare, User, Stethoscope, Users, ArrowRight, CheckCircle, Eye, Heart, Baby, Bone } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const agentFlow = [
    {
      step: 1,
      name: "Receptionist Agent",
      color: "#9b7bb8",
      icon: MessageSquare,
      description: "Welcomes you, collects initial symptoms, and routes you to the right care pathway.",
      role: "Triage & Initial Assessment"
    },
    {
      step: 2,
      name: "General Practitioner",
      color: "#4a9bc4",
      icon: User,
      description: "Conducts comprehensive evaluation and determines if specialist consultation is needed.",
      role: "Primary Assessment"
    },
    {
      step: 3,
      name: "Specialist Agents",
      color: "#6bb84d",
      icon: Users,
      description: "Multiple specialists collaborate on your case, just like real doctors in a hospital.",
      role: "Multi-Specialist Consultation"
    }
  ];

  const specialists = [
    {
      name: "Ophthalmologist",
      icon: Eye,
      color: "#6bb84d",
      description: "Eye and vision care specialist"
    },
    {
      name: "Dentistry",
      icon: Stethoscope,
      color: "#f5a623",
      description: "Oral health and dental care"
    },
    {
      name: "Orthopedist",
      icon: Bone,
      color: "#e85d5d",
      description: "Bone, joint, and muscle care"
    },
    {
      name: "OB-GYN",
      icon: Baby,
      color: "#f5d623",
      description: "Women's health and reproductive care"
    },
    {
      name: "Cardiology",
      icon: Heart,
      color: "#2d7ba8",
      description: "Heart and cardiovascular health"
    }
  ];

  const benefits = [
    "Inter-professional consultation keeps diagnosis realistic",
    "Complete reproduction of hospital environment builds trust",
    "Web interface accessible anywhere, anytime",
    "Transparent reasoning process you can follow",
    "Multiple AI doctors debate before consensus",
    "No over-exaggeration — grounded medical advice"
  ];

  return (
    <section id="platform" className="py-24 bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-64 h-64 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#9b7bb8] rounded-full blur-3xl" />
      </div>
      
      {/* Pixel-art hospital image as subtle background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/hero.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b7bb8]/20 text-[#6b4a8a] rounded-lg border border-[#9b7bb8]/30 font-medium text-sm mb-6">
            Powered by <span className="font-pixel">SEAL</span> Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1714] mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
              Virtual Medical Team
            </span>
          </h2>
          <p className="text-xl text-[#5c554d] max-w-3xl mx-auto">
            Experience a complete hospital consultation flow with AI agents that work together 
            like real medical professionals.
          </p>
        </motion.div>

        {/* Agent Flow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-[#1a1714] mb-8 text-center">
              Consultation Flow
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {agentFlow.map((agent, index) => (
                <motion.div
                  key={agent.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < agentFlow.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#9b7bb8] via-[#4a9bc4] to-[#6bb84d] opacity-30 z-0">
                      <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 text-[#4a9bc4]" />
                    </div>
                  )}
                  
                  <div 
                    className="relative bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-all"
                    style={{ borderColor: `${agent.color}40` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto"
                      style={{ backgroundColor: `${agent.color}20` }}
                    >
                      <agent.icon className="w-8 h-8" style={{ color: agent.color }} />
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-xs font-pixel mb-2"
                        style={{ color: agent.color }}
                      >
                        STEP {agent.step}
                      </div>
                      <h4 className="text-lg font-bold text-[#1a1714] mb-2">{agent.name}</h4>
                      <p className="text-sm text-[#7d756c] mb-3">{agent.description}</p>
                      <div 
                        className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ 
                          backgroundColor: `${agent.color}15`,
                          color: agent.color 
                        }}
                      >
                        {agent.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Specialist Agents */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#1a1714] mb-4">
              Specialist AI Agents
            </h3>
            <p className="text-lg text-[#5c554d] max-w-2xl mx-auto">
              Our team of 5 specialized AI doctors collaborate on complex cases, 
              ensuring comprehensive and accurate consultations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {specialists.map((specialist, index) => (
              <motion.div
                key={specialist.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer"
                style={{ borderColor: `${specialist.color}40` }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: `${specialist.color}20` }}
                >
                  <specialist.icon className="w-6 h-6" style={{ color: specialist.color }} />
                </div>
                <h4 className="font-semibold text-[#1a1714] text-sm mb-1">{specialist.name}</h4>
                <p className="text-xs text-[#7d756c]">{specialist.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-[#1a1714] mb-6 text-center">
            Why Clyra is Different
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#6bb84d] flex-shrink-0 mt-0.5" />
                <p className="text-[#3d3832]">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm border-2 border-[#4a9bc4] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#1a1714] mb-4">
              Ready to experience Clyra?
            </h3>
            <p className="text-[#5c554d] mb-6">
              Get a trusted second opinion from multiple AI medical specialists, 
              anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]">
                Start Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="btn btn-outline btn-lg border-[#2d7ba8] text-[#2d7ba8] hover:bg-[#e8f4f8]">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

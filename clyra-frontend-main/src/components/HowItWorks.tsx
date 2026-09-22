"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileText, ArrowRight, Play, MessageSquare, FileCheck, Users, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps = [
    {
      step: "01",
      title: "Start Your Consultation",
      description: "Enter your symptoms and medical history through our simple, secure interface. The Receptionist Agent welcomes you and collects initial information.",
      icon: Upload,
      color: "#9b7bb8",
      lightColor: "bg-[#9b7bb8]/20",
      textColor: "text-[#6b4a8a]",
      details: [
        "Secure, HIPAA-compliant data entry",
        "Receptionist Agent triages your case",
        "Structured symptom collection",
        "Automated initial assessment"
      ],
      agent: "Receptionist Agent",
      agentColor: "#9b7bb8"
    },
    {
      step: "02", 
      title: "Multi-Agent Collaboration",
      description: "Your case is reviewed by the General Practitioner, who then routes it to relevant specialist agents. Multiple AI doctors discuss, debate, and collaborate on your diagnosis.",
      icon: Brain,
      color: "#4a9bc4",
      lightColor: "bg-[#4a9bc4]/20",
      textColor: "text-[#2d7ba8]",
      details: [
        "GP Agent conducts primary assessment",
        "Specialist agents join the consultation",
        "Real-time collaboration and discussion",
        "Transparent reasoning process visible",
        "Agents challenge each other's assessments"
      ],
      agent: "GP + Specialist Agents",
      agentColor: "#4a9bc4"
    },
    {
      step: "03",
      title: "Consensus & Recommendations",
      description: "After thorough discussion, the AI medical team reaches consensus and provides you with evidence-based recommendations, differential diagnoses, and next steps.",
      icon: FileText,
      color: "#6bb84d",
      lightColor: "bg-[#6bb84d]/20",
      textColor: "text-[#5a9a3f]",
      details: [
        "Consensus reached through collaboration",
        "Evidence-based recommendations",
        "Differential diagnosis ranking",
        "Clear next steps and follow-up guidance",
        "Confidence scores for each assessment"
      ],
      agent: "All Agents (Consensus)",
      agentColor: "#6bb84d"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Mock conversation for step 2
  const mockConversation = [
    {
      agent: "GP Agent",
      message: "Based on symptoms, I recommend consulting with Cardiology and Orthopedics.",
      color: "#4a9bc4"
    },
    {
      agent: "Cardiologist Agent",
      message: "Cardiac etiology unlikely given the presentation. Recommend musculoskeletal assessment.",
      color: "#2d7ba8"
    },
    {
      agent: "Orthopedist Agent",
      message: "Agrees with Cardiology. Symptoms suggest muscular origin. Recommend conservative treatment.",
      color: "#e85d5d"
    },
    {
      agent: "GP Agent",
      message: "Consensus reached. All agents agree on musculoskeletal origin.",
      color: "#4a9bc4"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f3f0] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9b7bb8] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Professional header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4a9bc4]/20 text-[#2d7ba8] rounded-lg border border-[#4a9bc4]/30 font-medium text-sm mb-6">
              Powered by <span className="font-pixel">SEAL</span> Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1714] mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
                Clyra Works
              </span>
            </h2>
            <p className="text-xl text-[#5c554d] max-w-3xl mx-auto mb-8">
              Experience a complete virtual hospital consultation where multiple AI medical specialists 
              collaborate transparently on your case.
            </p>
            <button className="btn btn-outline border-[#2d7ba8] text-[#2d7ba8] hover:bg-[#e8f4f8]">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-20"
        >
          {/* Progress line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9b7bb8] via-[#4a9bc4] to-[#6bb84d] opacity-20 transform -translate-x-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className={`relative grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
              }`}
            >
              {/* Content */}
              <div className={`${index % 2 === 0 ? "" : "lg:col-start-2"}`}>
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#7d756c]">Step {step.step}</div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1a1714]">{step.title}</h3>
                  </div>
                </div>

                {/* Agent badge */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4"
                  style={{ backgroundColor: `${step.agentColor}20` }}
                >
                  <Users className="w-4 h-4" style={{ color: step.agentColor }} />
                  <span className="text-sm font-medium" style={{ color: step.agentColor }}>
                    {step.agent}
                  </span>
                </div>

                <p className="text-lg text-[#5c554d] mb-8 leading-relaxed">{step.description}</p>

                {/* Expandable details */}
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                    className="flex items-center gap-2 text-[#2d7ba8] font-medium hover:text-[#256394] transition-colors"
                  >
                    See detailed process
                    <ArrowRight 
                      className={`w-4 h-4 transition-transform ${
                        activeStep === step.step ? "rotate-90" : ""
                      }`} 
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeStep === step.step ? "auto" : 0,
                      opacity: activeStep === step.step ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`${step.lightColor} rounded-xl p-6 border-2`} style={{ borderColor: `${step.color}40` }}>
                      <h4 className={`font-semibold ${step.textColor} mb-3`}>What happens:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#3d3832]">
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: step.color }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 0 ? "" : "lg:col-start-1"} relative`}>
                <div className="relative bg-white border-2 border-[#e8e5e0] rounded-2xl shadow-xl p-8 overflow-hidden">
                  {/* Mock interface based on step */}
                  {step.step === "01" && (
                    <div className="space-y-4">
                      <div className="h-3 bg-[#e8e5e0] rounded w-3/4" />
                      <div className="h-3 bg-[#e8e5e0] rounded w-1/2" />
                      <div className="h-20 bg-[#9b7bb8]/20 rounded-lg flex items-center justify-center border-2 border-[#9b7bb8]/30">
                        <MessageSquare className="w-8 h-8 text-[#6b4a8a]" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-10 bg-[#9b7bb8]/20 rounded border-2 border-[#9b7bb8]/30" />
                        <div className="h-10 bg-[#e8e5e0] rounded border-2 border-[#d4cfc7]" />
                      </div>
                    </div>
                  )}

                  {step.step === "02" && (
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-[#7d756c] mb-4 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#4a9bc4]" />
                        AI Collaboration in progress...
                      </div>
                      {mockConversation.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="p-3 rounded-lg border-2"
                          style={{ 
                            backgroundColor: `${msg.color}15`,
                            borderColor: `${msg.color}40`
                          }}
                        >
                          <div className="text-xs font-medium mb-1" style={{ color: msg.color }}>
                            {msg.agent}
                          </div>
                          <div className="text-sm text-[#3d3832]">{msg.message}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {step.step === "03" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#6bb84d] rounded-full flex items-center justify-center">
                          <FileCheck className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm font-medium text-[#5a9a3f]">Consensus Reached</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-[#6bb84d]/30 rounded w-full" />
                        <div className="h-3 bg-[#6bb84d]/30 rounded w-4/5" />
                        <div className="h-3 bg-[#6bb84d]/30 rounded w-3/5" />
                      </div>
                      <div className="bg-[#6bb84d]/20 border-2 border-[#6bb84d]/40 rounded-lg p-3">
                        <div className="text-xs font-medium text-[#5a9a3f] mb-2">Recommended Actions</div>
                        <div className="space-y-1">
                          <div className="h-2 bg-[#6bb84d]/40 rounded w-3/4" />
                          <div className="h-2 bg-[#6bb84d]/40 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#4a9bc4]/10 to-transparent rounded-full" />
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-[#6bb84d]/10 to-transparent rounded-full" />
                </div>
              </div>

              {/* Center connector for desktop */}
              <motion.div
                className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div 
                  className="w-8 h-8 rounded-full border-4 border-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-20"
        >
          <div className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#1a1714] mb-4">
              Ready to experience collaborative AI medicine?
            </h3>
            <p className="text-[#5c554d] mb-6">
              Join thousands who trust Clyra for transparent, anxiety-reducing medical guidance 
              from multiple AI specialists.
            </p>
            <Button size="lg" className="w-full sm:w-auto bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]">
              Start Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

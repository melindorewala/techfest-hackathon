"use client";

import { motion } from "framer-motion";
import { Star, Shield, TrendingUp, Eye, ChevronDown, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function TrustSection() {
  const [showReasoning, setShowReasoning] = useState(false);

  const statistics = [
    {
      value: "94%",
      label: "Medical Accuracy",
      description: "Validated against real physician diagnoses",
      trend: "up" as const,
      color: "#2d7ba8"
    },
    {
      value: "50K+",
      label: "Consultations",
      description: "Successful AI collaborations completed",
      trend: "up" as const,
      color: "#6bb84d"
    },
    {
      value: "4.8/5",
      label: "User Rating",
      description: "Average satisfaction score",
      trend: "stable" as const,
      color: "#f5a623"
    },
    {
      value: "<2min",
      label: "Response Time",
      description: "Time for comprehensive analysis",
      trend: "up" as const,
      color: "#9b7bb8"
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Emergency Medicine Physician",
      content: "Clyra's collaborative approach mirrors how we actually practice medicine. The transparency builds trust.",
      rating: 5,
      verified: true,
    },
    {
      name: "Michael Rodriguez",
      role: "Patient, Anxiety Disorder",
      content: "Finally, an AI that doesn't scare me. Seeing the doctors discuss my case made me feel heard and understood.",
      rating: 5,
      verified: true,
    },
    {
      name: "Dr. James Wilson",
      role: "Internal Medicine",
      content: "The multi-agent approach reduces diagnostic bias and improves accuracy. This is the future of AI in healthcare.",
      rating: 5,
      verified: true,
    },
  ];

  const mockReasoning = [
    {
      specialist: "Cardiologist AI",
      thought: "Patient presents with chest pain and shortness of breath. ECG shows normal sinus rhythm. Consider cardiac causes but atypical presentation.",
      confidence: 75,
      color: "#2d7ba8",
    },
    {
      specialist: "Pulmonologist AI", 
      thought: "Respiratory symptoms could indicate asthma exacerbation or anxiety-related hyperventilation given patient history.",
      confidence: 80,
      color: "#4a9bc4",
    },
    {
      specialist: "Emergency Medicine AI",
      thought: "Agree with pulmonology assessment. Vital signs stable, no acute distress. Anxiety-related episode most likely.",
      confidence: 85,
      color: "#6bb84d",
    },
    {
      specialist: "Consensus",
      thought: "After collaboration: Likely anxiety-related chest discomfort. Recommend breathing exercises, follow-up with primary care within 48 hours if symptoms persist.",
      confidence: 90,
      color: "#9b7bb8",
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

  const StatCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl lg:text-5xl font-bold"
      >
        {value}
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f3f0] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-64 h-64 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#9b7bb8] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[#1a1714] mb-6"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
              Medical Professionals
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#5c554d] max-w-3xl mx-auto"
          >
            See why doctors and patients trust Clyra's transparent, collaborative approach to AI medical consultation.
          </motion.p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-8 hover:shadow-lg transition-all"
              style={{ borderColor: `${stat.color}40` }}
            >
              <div className="flex items-center justify-center mb-2">
                <div style={{ color: stat.color }}>
                  <StatCounter value={stat.value} />
                </div>
                {stat.trend === "up" && (
                  <TrendingUp className="w-6 h-6 ml-2" style={{ color: stat.color }} />
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#1a1714] mb-2">{stat.label}</h3>
              <p className="text-[#7d756c] text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Reasoning Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-2xl overflow-hidden shadow-xl mb-20"
        >
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-[#4a9bc4]" />
              <h3 className="text-2xl font-bold text-[#1a1714]">See the AI Thinking</h3>
            </div>
            
            <p className="text-[#5c554d] mb-6">
              Unlike black box AI, Clyra shows you exactly how our specialists collaborate and reach consensus on your case.
            </p>

            <div className="bg-[#faf9f7] border-2 border-[#e8e5e0] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-[#7d756c]">Live AI Collaboration</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="text-[#2d7ba8] hover:bg-[#e8f4f8]"
                >
                  {showReasoning ? "Hide" : "Show"} Full Reasoning
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showReasoning ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {/* Sample case preview */}
              <div className="space-y-3">
                <div className="bg-[#4a9bc4]/20 border-l-4 rounded p-4" style={{ borderColor: "#4a9bc4" }}>
                  <div className="text-sm font-medium text-[#2d7ba8]">Patient Case</div>
                  <div className="text-sm text-[#1a1714] mt-1">
                    "28-year-old experiencing chest pain and shortness of breath after work stress..."
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: showReasoning ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-3">
                    {mockReasoning.map((entry, index) => (
                      <motion.div
                        key={entry.specialist}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-4 rounded-lg border-l-4"
                        style={{ 
                          backgroundColor: `${entry.color}15`,
                          borderColor: entry.color
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium" style={{ color: entry.color }}>
                            {entry.specialist}
                          </div>
                          <div className="text-xs text-[#7d756c]">
                            Confidence: {entry.confidence}%
                          </div>
                        </div>
                        <div className="text-sm text-[#3d3832]">
                          {entry.thought}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="bg-[#6bb84d]/20 border-l-4 rounded p-4" style={{ borderColor: "#6bb84d" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-[#5a9a3f]" />
                    <div className="text-sm font-medium text-[#5a9a3f]">Final Recommendation</div>
                  </div>
                  <div className="text-sm text-[#1a1714]">
                    Consensus reached. Comprehensive guidance provided with clear next steps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#f5a623] fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-[#1a1714] mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-[#1a1714]">{testimonial.name}</div>
                  <div className="text-sm text-[#7d756c]">{testimonial.role}</div>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-[#6bb84d]">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

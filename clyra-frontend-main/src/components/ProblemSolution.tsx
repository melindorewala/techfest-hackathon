"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Users, Brain, CheckCircle, X, ArrowRight } from "lucide-react";

export default function ProblemSolution() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const comparisonData = [
    {
      category: "Diagnosis Approach",
      traditional: "Single AI algorithm",
      realDoctors: "Multiple specialists discuss",
      clyra: "AI specialists collaborate & debate",
      traditionalIcon: <Brain className="w-5 h-5" />,
      realDoctorsIcon: <Users className="w-5 h-5" />,
      clyraIcon: <Users className="w-5 h-5 text-medical-blue" />,
    },
    {
      category: "Reasoning Process",
      traditional: "Hidden black box",
      realDoctors: "Transparent discussion",
      clyra: "Fully visible reasoning",
      traditionalIcon: <X className="w-5 h-5 text-critical-info" />,
      realDoctorsIcon: <CheckCircle className="w-5 h-5" />,
      clyraIcon: <CheckCircle className="w-5 h-5 text-success-accent" />,
    },
    {
      category: "Availability",
      traditional: "24/7 but limited",
      realDoctors: "Appointment required",
      clyra: "24/7 collaborative team",
      traditionalIcon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      realDoctorsIcon: <X className="w-5 h-5 text-critical-info" />,
      clyraIcon: <CheckCircle className="w-5 h-5 text-success-accent" />,
    },
    {
      category: "Cost",
      traditional: "Free but limited value",
      realDoctors: "$150-300+ per visit",
      clyra: "Affordable professional consultation",
      traditionalIcon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      realDoctorsIcon: <X className="w-5 h-5 text-critical-info" />,
      clyraIcon: <CheckCircle className="w-5 h-5 text-success-accent" />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 relative overflow-hidden">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Why Traditional Symptom Checkers{" "}
            <span className="text-critical-info">Fail You</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-trust-slate max-w-3xl mx-auto"
          >
            Most AI health tools give you a single algorithm's guess. 
            Real doctors discuss cases with colleagues. So should AI.
          </motion.p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 bg-white border-b border-gray-200">
            <div className="text-center lg:text-left">
              <h3 className="font-bold text-lg text-foreground">Comparison</h3>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-trust-slate">Traditional AI</h3>
              <p className="text-sm text-trust-slate mt-1">Single algorithm</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-trust-slate">Real Doctors</h3>
              <p className="text-sm text-trust-slate mt-1">Human specialists</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-medical-blue">Clyra</h3>
              <p className="text-sm text-medical-blue mt-1">AI collaboration</p>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.category}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-4 gap-4 p-6 ${
                index % 2 === 0 ? "bg-white/50" : "bg-white/80"
              }`}
            >
              <div className="text-center lg:text-left">
                <h4 className="font-semibold text-foreground">{row.category}</h4>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {row.traditionalIcon}
                </div>
                <p className="text-sm text-trust-slate">{row.traditional}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {row.realDoctorsIcon}
                </div>
                <p className="text-sm text-trust-slate">{row.realDoctors}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {row.clyraIcon}
                </div>
                <p className="text-sm font-medium text-foreground">{row.clyra}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* The Clyra Difference */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              The{" "}
              <span className="bg-gradient-to-r from-medical-blue to-blue-600 bg-clip-text text-transparent">
                Clyra Difference
              </span>
            </h3>
            <p className="text-lg text-trust-slate mb-8">
              Instead of a single AI giving you a potentially alarming diagnosis, 
              Clyra creates a virtual team of AI medical specialists who debate, 
              collaborate, and reach consensus - just like real doctors discussing a case.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  title: "Transparent Reasoning",
                  description: "See exactly how our AI specialists debate your case and reach their conclusion.",
                  icon: <Brain className="w-6 h-6 text-medical-blue" />,
                },
                {
                  title: "Reduces Medical Anxiety",
                  description: "No scary single diagnosis. Multiple perspectives provide balanced, thoughtful guidance.",
                  icon: <CheckCircle className="w-6 h-6 text-success-accent" />,
                },
                {
                  title: "Medically Validated",
                  description: "Our multi-agent approach mirrors real medical consultation practices.",
                  icon: <Users className="w-6 h-6 text-medical-blue" />,
                },
              ].map((benefit, index) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-calming-bg rounded-lg flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-trust-slate">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* AI Collaboration Visualization */}
            <div className="bg-gradient-to-br from-calming-bg to-white p-8 rounded-2xl shadow-xl">
              <h4 className="font-bold text-center mb-6 text-foreground">Live AI Collaboration</h4>
              
              {/* Mock conversation */}
              <div className="space-y-4 text-sm">
                <div className="bg-red-50 border-l-4 border-red-200 p-3 rounded">
                  <div className="font-medium text-red-800">Cardiologist AI:</div>
                  <div className="text-red-700">"Chest pain with these symptoms could indicate..."</div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded">
                  <div className="font-medium text-blue-800">Internal Medicine AI:</div>
                  <div className="text-blue-700">"I disagree. Consider anxiety or muscle strain given..."</div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-200 p-3 rounded">
                  <div className="font-medium text-green-800">Consensus:</div>
                  <div className="text-green-700">"After discussion, we recommend monitoring symptoms and..."</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-medical-blue font-medium">
                  See full reasoning process <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
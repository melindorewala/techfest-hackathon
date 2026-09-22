"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function FinalCTA() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      text: "Multi-specialist AI collaboration",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "100% HIPAA compliant & secure",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Available 24/7 when you need it",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Transparent reasoning process",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Main headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Get Your Trusted{" "}
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Second Opinion
            </span>{" "}
            Now
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto"
          >
            Join thousands who trust Clyra for transparent, collaborative AI medical consultations 
            that reduce anxiety and provide real clarity about their health.
          </motion.p>

          {/* Benefits grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                variants={itemVariants}
                className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-3">
                  {benefit.icon}
                </div>
                <span className="text-white font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                className="bg-white text-medical-blue hover:bg-gray-50 hover:text-blue-800 font-semibold shadow-xl text-lg px-12 py-4"
              >
                Start Your Free Consultation
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-medical-blue font-semibold text-lg px-12 py-4"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Results in 15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>100% satisfaction guarantee</span>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Consultations completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">94%</div>
                <div className="text-blue-100">Medical accuracy rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-blue-100">Average user rating</div>
              </div>
            </div>
          </motion.div>

          {/* Final reassurance */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-blue-100 text-lg">
              Healthcare questions don&apos;t wait for business hours.{" "}
              <span className="text-white font-semibold">Neither do we.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white text-medical-blue rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group z-50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
}
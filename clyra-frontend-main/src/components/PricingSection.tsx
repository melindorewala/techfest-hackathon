"use client";

import { motion } from "framer-motion";
import { Check, Building, Users, Crown, ArrowRight, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function PricingSection() {
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  const plans = [
    {
      name: "Individual",
      price: "$9",
      period: "per consultation",
      description: "For patients seeking quick, accurate medical guidance",
      features: [
        "Single consultation",
        "Multi-specialist AI collaboration",
        "Transparent reasoning process",
        "24/7 availability",
        "HIPAA compliant",
        "Evidence-based recommendations",
        "Follow-up guidance",
        "Download consultation report"
      ],
      popular: false,
      buttonText: "Start consultation",
      icon: Users,
      color: "#4a9bc4"
    },
    {
      name: "Monthly",
      price: "$29",
      period: "per month",
      description: "For frequent users who need regular consultations",
      features: [
        "Unlimited consultations",
        "Priority processing",
        "All specialist agents",
        "Advanced reasoning insights",
        "Consultation history",
        "Personalized health insights",
        "Email support",
        "Early access to new features"
      ],
      popular: true,
      buttonText: "Start free trial",
      icon: Building,
      color: "#2d7ba8"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "For healthcare organizations and hospitals",
      features: [
        "Everything in Monthly",
        "Custom AI agent configurations",
        "Advanced EHR integrations",
        "White-label solutions",
        "Dedicated support team",
        "SOC 2 Type II compliance",
        "Advanced analytics",
        "Custom API development"
      ],
      popular: false,
      buttonText: "Contact sales",
      icon: Crown,
      color: "#9b7bb8"
    },
  ];

  const faqs = [
    {
      question: "How does Clyra ensure accurate diagnoses?",
      answer: "Clyra uses <span className=\"font-pixel\">SEAL</span> technology with multiple AI specialist agents that collaborate and debate on each case, just like real doctors. This multi-agent approach reduces bias and improves accuracy through consensus-building.",
    },
    {
      question: "What makes Clyra different from other symptom checkers?",
      answer: "Unlike single AI systems that can over-exaggerate conditions, Clyra uses <span className=\"font-pixel\">SEAL</span> technology to simulate a real hospital environment where multiple specialists discuss your case transparently, providing grounded, realistic medical guidance.",
    },
    {
      question: "Is my medical data secure?",
      answer: "Yes, Clyra is HIPAA compliant with end-to-end encryption. Your data is protected with enterprise-level security measures and is never shared with third parties.",
    },
    {
      question: "Can I use Clyra for emergency situations?",
      answer: "Clyra is designed for non-emergency consultations and follow-ups. For medical emergencies, please contact emergency services immediately or visit your nearest emergency room.",
    },
    {
      question: "How long does a consultation take?",
      answer: "Most consultations are completed in under 2 minutes. The AI agents work simultaneously to provide comprehensive analysis quickly while maintaining accuracy.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a free consultation to try Clyra. Monthly plans also include a 7-day free trial so you can experience the full benefits before committing.",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-[#faf9f7] to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#9b7bb8] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4a9bc4]/20 text-[#2d7ba8] rounded-lg border border-[#4a9bc4]/30 font-medium text-sm mb-6">
            Clyra Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1714] mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-[#5c554d] max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Start with a free consultation and upgrade anytime.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6bb84d]/20 text-[#5a9a3f] rounded-lg border border-[#6bb84d]/30 text-sm font-medium">
            <Check className="w-4 h-4" />
            Free consultation • No credit card required • Cancel anytime
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-8 hover:shadow-xl transition-all ${
                plan.popular 
                  ? "border-[#2d7ba8] shadow-lg" 
                  : "border-[#e8e5e0]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#2d7ba8] text-white px-4 py-1 rounded-lg text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${plan.color}20` }}
                >
                  <plan.icon className="w-8 h-8" style={{ color: plan.color }} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1714] mb-2">{plan.name}</h3>
                <p className="text-[#7d756c] mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.price === "Custom" ? (
                    <div>
                      <div className="text-3xl font-bold text-[#1a1714]">Custom pricing</div>
                      <div className="text-[#7d756c] text-sm mt-1">{plan.period}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl font-bold text-[#1a1714]">{plan.price}</div>
                      <div className="text-[#7d756c]">{plan.period}</div>
                    </div>
                  )}
                </div>

                <button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? "btn btn-primary btn-lg bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]" 
                      : "btn btn-outline btn-lg border-[#2d7ba8] text-[#2d7ba8] hover:bg-[#e8f4f8]"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#6bb84d] flex-shrink-0 mt-0.5" />
                    <span className="text-[#3d3832] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* FAQ section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#1a1714] mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-[#5c554d]">
              Everything you need to know about Clyra's AI medical consultation platform.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border-2 border-[#e8e5e0] rounded-lg">
                <button
                  onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-[#faf9f7] transition-colors rounded-lg"
                >
                  <span className="font-medium text-[#1a1714] pr-8">{faq.question}</span>
                  <HelpCircle
                    className={`w-5 h-5 text-[#4a9bc4] flex-shrink-0 transition-transform ${
                      showFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: showFAQ === index ? "auto" : 0,
                    opacity: showFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-[#5c554d] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

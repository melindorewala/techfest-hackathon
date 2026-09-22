"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Shield, Award, Users, ArrowRight } from "lucide-react";
import ClyraLogo from "./ClyraLogo";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "How it works", href: "#how-it-works" },
        { name: "Features", href: "#platform" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#security" },
        { name: "API Documentation", href: "#api" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Healthcare Providers", href: "#providers" },
        { name: "Health Systems", href: "#health-systems" },
        { name: "Research Institutions", href: "#research" },
        { name: "Telehealth Platforms", href: "#telehealth" },
        { name: "EHR Integrations", href: "#ehr" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Help Center", href: "#help" },
        { name: "Clinical Studies", href: "#studies" },
        { name: "White Papers", href: "#papers" },
        { name: "Blog", href: "#blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press", href: "#press" },
        { name: "Contact", href: "#contact" },
        { name: "Partners", href: "#partners" },
      ],
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "HIPAA Compliance", href: "#hipaa" },
    { name: "Security", href: "#security" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0] border-t-2 border-[#e8e5e0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Newsletter section */}
        <div className="py-16 border-b-2 border-[#e8e5e0]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-[#1a1714] mb-4">
              Stay updated on{" "}
              <span className="bg-gradient-to-r from-[#4a9bc4] to-[#2d7ba8] bg-clip-text text-transparent">
                Clyra
              </span>
            </h3>
            <p className="text-[#5c554d] mb-8">
              Get insights on AI medicine innovations and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 border-2 border-[#e8e5e0] focus:border-[#4a9bc4]"
              />
              <button className="btn btn-primary bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Brand section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ClyraLogo size="md" variant="light" animated={false} />
                <p className="text-[#5c554d] mt-6 mb-8 leading-relaxed">
                  AI healthcare platform enabling collaborative medical consultations 
                  through advanced <span className="font-pixel">SEAL</span> technology for better patient outcomes.
                </p>
                
                {/* Contact information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#4a9bc4]" />
                    <span className="text-[#3d3832]">hello@clyra.health</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#4a9bc4]" />
                    <span className="text-[#3d3832]">1-800-CLYRA-AI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#4a9bc4]" />
                    <span className="text-[#3d3832]">San Francisco, CA</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer links */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-[#1a1714] font-semibold mb-6">{section.title}</h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-[#5c554d] hover:text-[#2d7ba8] transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="py-12 border-t-2 border-[#e8e5e0] border-b-2 border-[#e8e5e0]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Healthcare data protection",
                color: "#2d7ba8"
              },
              {
                icon: Award,
                title: "SOC 2 Type II",
                description: "Enterprise security certified",
                color: "#6bb84d"
              },
              {
                icon: Users,
                title: "FDA Guidelines",
                description: "Medical device standards",
                color: "#f5a623"
              },
              {
                icon: Shield,
                title: "Enterprise Ready",
                description: "Scalable infrastructure",
                color: "#9b7bb8"
              },
            ].map((badge, index) => (
              <div key={badge.title} className="text-center">
                <badge.icon className="w-8 h-8 mx-auto mb-3" style={{ color: badge.color }} />
                <div className="font-medium text-[#1a1714] text-sm mb-1">{badge.title}</div>
                <div className="text-[#7d756c] text-xs">{badge.description}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-[#7d756c]">
              <span>© 2024 Clyra Healthcare, Inc. All rights reserved.</span>
              <div className="flex items-center gap-6">
                {legalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#2d7ba8] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-[#7d756c]">
              Built with <span className="font-pixel">SEAL</span> Technology
            </div>
          </div>
        </div>

      </div>
      
      {/* Medical disclaimer */}
      <div className="bg-[#e8e5e0] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#5c554d] text-xs text-center leading-relaxed">
            <strong>Medical Disclaimer:</strong> Clyra is designed to support healthcare professionals and is not a replacement for professional medical judgment. 
            Always consult with qualified healthcare providers for medical decisions. This platform provides clinical decision support tools and should not be used as the sole basis for patient care.
          </p>
        </div>
      </div>
    </footer>
  );
}
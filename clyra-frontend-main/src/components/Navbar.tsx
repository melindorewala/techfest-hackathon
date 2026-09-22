"use client";

import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import ClyraLogo from "./ClyraLogo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Platform", href: "#platform" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-[#faf9f7]/95 backdrop-blur-lg border-b-2 border-[#e8e5e0] shadow-sm' 
        : 'bg-[#faf9f7]/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <ClyraLogo size="sm" variant="light" animated={false} />
            </motion.div>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-[#5c554d] hover:text-[#1a1714] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-[#f5f3f0]"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/sign-in" className="text-[#5c554d] hover:text-[#1a1714] px-4 py-2 text-sm font-medium transition-colors duration-150">
              Sign in
            </Link>
            <Link href="/sign-up" className="btn btn-primary btn-sm bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]">
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#5c554d] hover:text-[#1a1714] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.2 }}
        className="lg:hidden overflow-hidden bg-[#faf9f7] border-t-2 border-[#e8e5e0]"
      >
        <div className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-[#1a1714] px-4 py-3 rounded-lg font-medium hover:bg-[#f5f3f0] transition-colors"
            >
              {item.name}
            </button>
          ))}
          
          <div className="pt-4 border-t-2 border-[#e8e5e0] space-y-2">
            <Link href="/sign-in" className="block w-full text-left text-[#5c554d] px-4 py-3 font-medium hover:bg-[#f5f3f0] rounded-lg transition-colors">
              Sign in
            </Link>
            <Link href="/sign-up" className="btn btn-primary w-full bg-[#2d7ba8] hover:bg-[#256394] text-white border-[#2d7ba8]">
              Get started
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
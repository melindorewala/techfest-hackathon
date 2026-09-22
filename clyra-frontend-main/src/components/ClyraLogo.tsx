"use client";

import { motion } from "framer-motion";

interface ClyraLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "gradient";
  animated?: boolean;
}

export default function ClyraLogo({ 
  size = "md", 
  variant = "gradient", 
  animated = true 
}: ClyraLogoProps) {
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-16 h-16"
  };
  
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Pixel-art color scheme
  const getColors = () => {
    if (variant === 'light') {
      return {
        bg: 'bg-white',
        border: 'border-[#4a9bc4]',
        primary: '#4a9bc4',
        secondary: '#9b7bb8',
        accent: '#6bb84d',
        text: '#1a1714',
        textSecondary: '#5c554d'
      };
    } else if (variant === 'dark') {
      return {
        bg: 'bg-[#1a1714]',
        border: 'border-[#4a9bc4]',
        primary: '#4a9bc4',
        secondary: '#9b7bb8',
        accent: '#6bb84d',
        text: '#ffffff',
        textSecondary: '#a8a19a'
      };
    } else {
      return {
        bg: 'bg-gradient-to-br from-[#4a9bc4] via-[#9b7bb8] to-[#6bb84d]',
        border: 'border-[#2d7ba8]',
        primary: '#ffffff',
        secondary: '#ffffff',
        accent: '#ffffff',
        text: '#1a1714',
        textSecondary: '#5c554d'
      };
    }
  };

  const colors = getColors();

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Pixel Art Style */}
      <motion.div
        variants={animated ? logoVariants : {}}
        initial={animated ? "initial" : "animate"}
        animate="animate"
        whileHover={animated ? { scale: 1.1 } : {}}
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-lg overflow-hidden border-2`}
        style={{ 
          borderColor: variant === 'gradient' ? '#2d7ba8' : colors.border,
          backgroundColor: variant === 'gradient' ? undefined : (variant === 'light' ? '#ffffff' : '#1a1714')
        }}
      >
        {/* Pixel-art background */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a9bc4] via-[#9b7bb8] to-[#6bb84d]" />
        )}
        
        {/* Pixel-art medical cross with SEAL agents */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-1">
          <svg 
            viewBox="0 0 32 32" 
            className="w-full h-full"
            fill="none"
            style={{ imageRendering: 'pixelated' }}
          >
            {/* Pixel-art medical cross (blocky style) */}
            <rect 
              x="12" 
              y="6" 
              width="8" 
              height="20" 
              fill={colors.primary}
              rx="1"
            />
            <rect 
              x="6" 
              y="12" 
              width="20" 
              height="8" 
              fill={colors.primary}
              rx="1"
            />
            
            {/* SEAL Agent Dots (5 agents + GP + Receptionist) */}
            {/* Top Left - Receptionist */}
            <circle 
              cx="8" 
              cy="8" 
              r="2" 
              fill={colors.secondary}
              style={{ filter: 'drop-shadow(0 0 2px rgba(155, 123, 184, 0.8))' }}
            />
            
            {/* Top Right - GP */}
            <circle 
              cx="24" 
              cy="8" 
              r="2" 
              fill={colors.primary}
              style={{ filter: 'drop-shadow(0 0 2px rgba(74, 155, 196, 0.8))' }}
            />
            
            {/* Bottom Left - Specialist 1 */}
            <circle 
              cx="8" 
              cy="24" 
              r="2" 
              fill={colors.accent}
              style={{ filter: 'drop-shadow(0 0 2px rgba(107, 184, 77, 0.8))' }}
            />
            
            {/* Bottom Right - Specialist 2 */}
            <circle 
              cx="24" 
              cy="24" 
              r="2" 
              fill="#f5a623"
              style={{ filter: 'drop-shadow(0 0 2px rgba(245, 166, 35, 0.8))' }}
            />
            
            {/* Center connections (simulating collaboration) */}
            <path 
              d="M8 8L16 16M24 8L16 16M8 24L16 16M24 24L16 16" 
              stroke={variant === 'gradient' ? '#ffffff' : colors.primary} 
              strokeWidth="1" 
              opacity="0.3"
              strokeLinecap="round"
            />
            
            {/* Central hub (consensus point) */}
            <circle 
              cx="16" 
              cy="16" 
              r="3" 
              fill={variant === 'gradient' ? '#ffffff' : colors.primary}
              opacity="0.9"
            />
          </svg>
        </div>
        
        {/* Animated pulse effect */}
        {animated && (
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 rounded-lg"
            style={{ 
              backgroundColor: variant === 'gradient' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : variant === 'light'
                ? 'rgba(74, 155, 196, 0.1)'
                : 'rgba(74, 155, 196, 0.2)'
            }}
          />
        )}
      </motion.div>
      
      {/* Logo Text - Pixel Art Style */}
      <motion.div
        initial={animated ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col"
      >
        <h1 className={`${textSizes[size]} font-bold ${
          variant === 'light' 
            ? 'text-[#1a1714]' 
            : variant === 'dark' 
            ? 'text-white' 
            : 'bg-gradient-to-r from-[#4a9bc4] via-[#9b7bb8] to-[#6bb84d] bg-clip-text text-transparent'
        }`}>
          Clyra
        </h1>
        {size !== 'sm' && (
          <div className="flex items-center gap-1.5 -mt-1">
            <p className={`text-xs ${
              variant === 'light' ? 'text-[#7d756c]' :
              variant === 'dark' ? 'text-[#a8a19a]' :
              'text-[#7d756c]'
            }`}>
              Powered by
            </p>
            <span className={`font-pixel text-[10px] ${
              variant === 'light' ? 'text-[#4a9bc4]' : 
              variant === 'dark' ? 'text-[#4a9bc4]' : 
              'text-[#4a9bc4]'
            }`}>
              SEAL
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

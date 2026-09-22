"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  User,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import ClyraLogo from "@/components/ClyraLogo";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const passwordRequirements = [
    { label: "8+ characters", met: formData.password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(formData.password) },
    { label: "Number", met: /[0-9]/.test(formData.password) },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#e8e5e0] flex flex-col overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#9b7bb8] rounded-full blur-3xl" />
      </div>

      {/* Compact Navbar */}
      <nav className="relative z-10 border-b border-[#e8e5e0] bg-[#faf9f7]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <ClyraLogo size="sm" variant="light" animated={false} />
            </Link>
            <Link
              href="/sign-in"
              className="text-sm text-[#5c554d] hover:text-[#1a1714] font-medium transition-colors"
            >
              Already have an account?{" "}
              <span className="text-[#2d7ba8] font-semibold">Sign in</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered and Compact */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm border border-[#e8e5e0] rounded-xl p-6 shadow-lg"
          >
            {/* Compact Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#6bb84d]/10 text-[#5a9a3f] rounded-md border border-[#6bb84d]/20 text-[10px] font-medium mb-3">
                <Shield className="w-3 h-3" />
                Start Your Journey
              </div>
              <h1 className="text-2xl font-bold text-[#1a1714] mb-1">
                Create your account
              </h1>
              <p className="text-sm text-[#5c554d]">
                Join Clyra and experience AI-powered medical consultations
              </p>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-[#1a1714] mb-1.5"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a8a19a]" />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[#1a1714] mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a8a19a]" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 — Password + Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-[#1a1714] mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a8a19a]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#a8a19a] hover:text-[#5c554d] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-1.5 flex items-center gap-3 text-[10px]">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <CheckCircle
                            className={`w-3 h-3 ${
                              req.met ? "text-[#6bb84d]" : "text-[#a8a19a]"
                            }`}
                          />
                          <span
                            className={
                              req.met ? "text-[#5a9a3f]" : "text-[#7d756c]"
                            }
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-medium text-[#1a1714] mb-1.5"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a8a19a]" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#a8a19a] hover:text-[#5c554d] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-[10px] text-[#e85d5d]">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: e.target.checked,
                      })
                    }
                    required
                    className="mt-0.5 w-3.5 h-3.5 border border-[#e8e5e0] rounded text-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20"
                  />
                  <span className="text-xs text-[#5c554d] leading-relaxed">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#2d7ba8] hover:underline font-medium"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-[#2d7ba8] hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className="w-full py-2.5 px-4 bg-[#2d7ba8] hover:bg-[#256394] text-white rounded-lg font-semibold text-sm shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Compact Divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#e8e5e0]"></div>
              <span className="text-xs text-[#7d756c]">or</span>
              <div className="flex-1 h-px bg-[#e8e5e0]"></div>
            </div>

            {/* Compact Social Sign Up */}
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 border border-[#e8e5e0] rounded-lg hover:bg-[#faf9f7] transition-colors text-sm font-medium text-[#1a1714] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <button className="w-full py-2.5 px-4 border border-[#e8e5e0] rounded-lg hover:bg-[#faf9f7] transition-colors text-sm font-medium text-[#1a1714] flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Compact Trust Badge */}
            <div className="mt-4 pt-4 border-t border-[#e8e5e0]">
              <p className="text-[10px] text-[#7d756c] flex items-center justify-center gap-1.5">
                <Shield className="w-3 h-3 text-[#6bb84d]" />
                HIPAA compliant • End-to-end encrypted • Free consultation
                included
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

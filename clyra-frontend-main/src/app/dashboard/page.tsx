"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Heart, 
  Brain, 
  Activity, 
  Stethoscope, 
  Search,
  Mic,
  Camera,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wifi,
  WifiOff,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Pill,
  Hospital,
  ClipboardList,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import ClyraLogo from "@/components/ClyraLogo";
import { useWebSocket } from "@/hooks/useWebSocket";
import QuestionDialog from "@/components/QuestionDialog";

interface MedicalQueryResult {
  status: string;
  triage_result: string;
  specialist_type: string;
  diagnosis_result: string;
  peer_review_result: string;
  agent_discussions?: AgentDiscussion[];
  recommendations?: Recommendation[];
  risk_analysis?: RiskAnalysis;
  symptom_timeline?: SymptomData[];
  differential_diagnosis?: DifferentialDiagnosis[];
  confidence_scores?: ConfidenceScore[];
}

interface AgentDiscussion {
  agent: string;
  role: string;
  message: string;
  timestamp: string;
  confidence: number;
  color: string;
}

interface Recommendation {
  type: 'urgent' | 'important' | 'followup';
  title: string;
  description: string;
  timeframe: string;
  priority: number;
}

interface RiskAnalysis {
  overall_risk: number;
  factors: { name: string; risk: number; impact: string }[];
}

interface SymptomData {
  day: number;
  severity: number;
  symptoms: string[];
}

interface DifferentialDiagnosis {
  condition: string;
  probability: number;
  reasoning: string;
  tests_needed: string[];
}

interface ConfidenceScore {
  aspect: string;
  score: number;
  reasoning: string;
}

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MedicalQueryResult | null>(null);
  const [activeTab, setActiveTab] = useState("query");
  
  // Mock question state for demo
  const [mockQuestion, setMockQuestion] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(true); // Start in demo mode
  
  // WebSocket hook
  const { sessionId, isConnected, currentQuestion, sendResponse, clearQuestion } = useWebSocket();
  
  // Debug current question and session
  console.log('🎯 Dashboard render - sessionId:', sessionId, 'currentQuestion:', currentQuestion);

  // Mock doctor questions for demo
  const mockQuestions = [
    "Can you describe the pain in more detail? Is it sharp, dull, throbbing, or burning?",
    "How long have you been experiencing these symptoms? When did they first start?",
    "On a scale of 1-10, how would you rate your pain level right now?",
    "Have you taken any medications for this condition? What have you tried so far?",
    "Do you have any family history of similar conditions or heart problems?",
    "Are there any activities that make the pain better or worse?"
  ];

  // Mock question simulator
  const simulateQuestion = () => {
    const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
    setMockQuestion(randomQuestion);
  };

  // Handle mock response
  const handleMockResponse = (response: string) => {
    console.log('Mock response received:', response);
    setMockQuestion(null);
    
    // Simulate next question after 2 seconds
    setTimeout(() => {
      if (Math.random() > 0.6) { // 40% chance of another question
        simulateQuestion();
      } else {
        // Show simplified demo flow for chest pain case
        setResult({
          status: "completed",
          triage_result: "Based on your symptoms (chest pain for few days, dizziness, not feeling well), this is a moderate-to-high priority case. The combination of chest pain and dizziness requires immediate attention to rule out cardiac causes.",
          specialist_type: "CARDIOLOGY",
          diagnosis_result: "Assessment suggests possible cardiac-related chest pain. The persistent nature of your symptoms (few days), combined with dizziness, requires urgent cardiology evaluation. Recommended: ECG, cardiac enzymes, and immediate medical assessment.",
          peer_review_result: "All reviewing specialists (Cardiologist, Emergency Medicine, GP) reached consensus. Patient should seek emergency department evaluation within 2 hours. Treatment plan approved by Dr. Sarah Johnson, Chief of Cardiology.",
          agent_discussions: [
            {
              agent: "Receptionist",
              role: "Triage & Intake",
              message: "Patient reports: Not feeling well, chest pain for few days, feeling dizzy. Initial triage complete. Routing to medical team for assessment.",
              timestamp: "00:00:05",
              confidence: 1.0,
              color: "#9b7bb8"
            },
            {
              agent: "GP Agent",
              role: "General Practitioner",
              message: "Initial assessment: Patient presents with chest pain lasting few days, associated dizziness, general malaise. This combination is concerning. Recommend cardiology consultation to rule out cardiac causes.",
              timestamp: "00:00:18",
              confidence: 0.80,
              color: "#4a9bc4"
            },
            {
              agent: "Cardiologist Agent",
              role: "Cardiologist",
              message: "Agree with GP. Chest pain + dizziness is a red flag combination. Persistent symptoms over days suggest we need to rule out unstable angina or other cardiac events. Recommend urgent ECG and cardiac enzymes. Patient should be evaluated within 2 hours.",
              timestamp: "00:00:35",
              confidence: 0.85,
              color: "#2d7ba8"
            },
            {
              agent: "Emergency Medicine Agent",
              role: "Emergency Physician",
              message: "This meets criteria for urgent evaluation. Chest pain with dizziness could indicate cardiac event, arrhythmia, or other serious conditions. Recommend emergency department visit immediately. Do not delay.",
              timestamp: "00:00:52",
              confidence: 0.90,
              color: "#e85d5d"
            },
            {
              agent: "GP Agent",
              role: "General Practitioner",
              message: "Consensus reached. All specialists agree: urgent evaluation needed. Patient should go to emergency department within 2 hours. Will prepare referral summary.",
              timestamp: "00:01:10",
              confidence: 0.88,
              color: "#4a9bc4"
            }
          ],
          recommendations: [
            {
              type: "urgent",
              title: "Seek Emergency Medical Care Immediately",
              description: "Go to emergency department within 2 hours. Your symptoms (chest pain + dizziness) require immediate evaluation to rule out serious cardiac conditions.",
              timeframe: "Within 2 hours",
              priority: 1
            },
            {
              type: "important",
              title: "Rest and Monitor",
              description: "Rest immediately. Avoid any physical activity. If symptoms worsen or you experience severe chest pain, call 911 immediately.",
              timeframe: "Immediate",
              priority: 2
            },
            {
              type: "important",
              title: "Follow-up Cardiology Appointment",
              description: "After emergency evaluation, schedule urgent cardiology follow-up for comprehensive cardiac assessment.",
              timeframe: "Within 24-48 hours",
              priority: 3
            }
          ],
          risk_analysis: {
            overall_risk: 75,
            factors: [
              { name: "Chest Pain Duration", risk: 80, impact: "Persistent chest pain over days is concerning" },
              { name: "Dizziness", risk: 70, impact: "Dizziness with chest pain suggests possible cardiac or vascular issue" },
              { name: "Symptom Combination", risk: 75, impact: "Chest pain + dizziness is a red flag combination" },
              { name: "General Malaise", risk: 60, impact: "Not feeling well indicates systemic concern" }
            ]
          },
          symptom_timeline: [
            { day: 0, severity: 3, symptoms: ["Started feeling unwell"] },
            { day: 1, severity: 4, symptoms: ["Chest pain began"] },
            { day: 2, severity: 5, symptoms: ["Chest pain continued", "Feeling dizzy"] },
            { day: 3, severity: 6, symptoms: ["Persistent chest pain", "Dizziness worsening"] }
          ],
          differential_diagnosis: [
            {
              condition: "Unstable Angina / ACS",
              probability: 60,
              reasoning: "Chest pain for days with dizziness is highly suggestive of cardiac etiology. Most likely diagnosis.",
              tests_needed: ["ECG", "Troponin", "Chest X-ray"]
            },
            {
              condition: "Arrhythmia",
              probability: 25,
              reasoning: "Dizziness with chest pain could indicate cardiac arrhythmia affecting blood flow.",
              tests_needed: ["ECG", "Holter Monitor", "Echocardiogram"]
            },
            {
              condition: "Other Cardiac Event",
              probability: 10,
              reasoning: "Less likely but possible. Requires urgent evaluation to rule out.",
              tests_needed: ["ECG", "Cardiac Enzymes", "Physical Exam"]
            },
            {
              condition: "Non-Cardiac (Anxiety/Musculoskeletal)",
              probability: 5,
              reasoning: "Unlikely given symptom combination, but possible.",
              tests_needed: ["Clinical Assessment", "Physical Exam"]
            }
          ],
          confidence_scores: [
            { aspect: "Triage Assessment", score: 88, reasoning: "Clear symptom pattern and risk factors" },
            { aspect: "Specialist Selection", score: 92, reasoning: "Cardiology clearly indicated" },
            { aspect: "Differential Diagnosis", score: 75, reasoning: "Multiple possibilities, cardiac most likely" },
            { aspect: "Treatment Plan", score: 85, reasoning: "Evidence-based recommendations" },
            { aspect: "Urgency Assessment", score: 90, reasoning: "High confidence in urgent evaluation need" }
          ]
        });
      }
    }, 2000);
    
    return true;
  };

  // Clear mock question
  const clearMockQuestion = () => {
    setMockQuestion(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    if (demoMode) {
      // Demo mode - use mock simulation
      console.log('🎬 Starting mock consultation simulation');
      
      // Simulate initial processing
      setTimeout(() => {
        setIsLoading(false);
        // Show first doctor question
        simulateQuestion();
      }, 2000);
    } else {
      // Real mode - use actual API
      if (!isConnected || !sessionId) {
        alert('WebSocket not connected. Please refresh the page and try again.');
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('🚀 Making API call with sessionId:', sessionId, 'Live mode (auto-response)');
        const response = await fetch('/api/process-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            session_id: sessionId,
            use_auto_response: true, // Live mode uses Grok auto-response
            additional_info: {
              age: age ? parseInt(age) : null,
              gender: gender || null
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error submitting query:', error);
        // Fallback to mock data if API fails
        setResult({
          status: "error",
          triage_result: "Unable to connect to medical AI system. Please check your connection or try again later.",
          specialist_type: "GENERAL",
          diagnosis_result: "System temporarily unavailable. Please contact support if this issue persists.",
          peer_review_result: "Peer review system offline. Manual review recommended."
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const recentQueries = [
    { id: 1, query: "Persistent headache for 3 days", specialist: "NEUROLOGY", time: "2 hours ago", status: "completed", risk: "low" },
    { id: 2, query: "Skin rash on arms", specialist: "DERMATOLOGY", time: "1 day ago", status: "completed", risk: "low" },
    { id: 3, query: "Difficulty breathing", specialist: "PULMONOLOGY", time: "2 days ago", status: "completed", risk: "medium" },
    { id: 4, query: "Chest pain with exertion", specialist: "CARDIOLOGY", time: "3 days ago", status: "completed", risk: "high" },
    { id: 5, query: "Abdominal pain and nausea", specialist: "GASTROENTEROLOGY", time: "5 days ago", status: "completed", risk: "medium" },
    { id: 6, query: "Joint pain and stiffness", specialist: "RHEUMATOLOGY", time: "1 week ago", status: "completed", risk: "low" }
  ];

  // Analytics data
  const analyticsData = {
    consultationsByMonth: [
      { month: "Jan", count: 8 },
      { month: "Feb", count: 12 },
      { month: "Mar", count: 15 },
      { month: "Apr", count: 18 },
      { month: "May", count: 14 },
      { month: "Jun", count: 22 }
    ],
    specialistDistribution: [
      { specialty: "Cardiology", count: 12, percentage: 24 },
      { specialty: "Neurology", count: 10, percentage: 20 },
      { specialty: "Dermatology", count: 8, percentage: 16 },
      { specialty: "Pulmonology", count: 7, percentage: 14 },
      { specialty: "Gastroenterology", count: 6, percentage: 12 },
      { specialty: "Other", count: 7, percentage: 14 }
    ],
    riskDistribution: [
      { level: "Low", count: 28, color: "#6bb84d" },
      { level: "Medium", count: 15, color: "#ffa726" },
      { level: "High", count: 7, color: "#ff6b6b" }
    ],
    avgResponseTime: 2.3,
    accuracyRate: 98.5,
    totalConsultations: 50
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#e8e5e0]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#4a9bc4] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#9b7bb8] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#6bb84d] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <ClyraLogo size="sm" variant="light" animated={false} />
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab("query")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "query" ? "bg-[#4a9bc4]/10 text-[#2d7ba8]" : "text-[#5c554d] hover:text-[#1a1714]"
                  }`}
                >
                  New Query
                </button>
                <button 
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "history" ? "bg-[#4a9bc4]/10 text-[#2d7ba8]" : "text-[#5c554d] hover:text-[#1a1714]"
                  }`}
                >
                  History
                </button>
                <button 
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "analytics" ? "bg-[#4a9bc4]/10 text-[#2d7ba8]" : "text-[#5c554d] hover:text-[#1a1714]"
                  }`}
                >
                  Analytics
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {/* Demo Mode Toggle */}
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  demoMode 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                <Zap className="w-4 h-4" />
                {demoMode ? 'Demo Mode' : 'Live Mode'}
              </button>
              
              {/* WebSocket Connection Status - only show in live mode */}
              {!demoMode && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  isConnected 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {isConnected ? (
                    <>
                      <Wifi className="w-4 h-4" />
                      Connected
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4" />
                      Disconnected
                    </>
                  )}
                </div>
              )}
              
              <button className="p-2 text-[#5c554d] hover:text-[#1a1714] hover:bg-white/60 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#5c554d] hover:text-[#1a1714] hover:bg-white/60 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-[#4a9bc4] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {activeTab === "query" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Query Input Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-8 shadow-lg"
              >
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-[#1a1714] mb-2">
                    Virtual Medical Consultation
                  </h1>
                  <p className="text-[#5c554d]">
                    Describe your symptoms and get AI-powered medical insights from our virtual hospital
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-[#1a1714]">
                        Tell us about your symptoms
                      </label>
                      {demoMode && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("Not feeling well, having chest pain since few days, feeling dizzy");
                            setAge("45");
                            setGender("male");
                          }}
                          className="text-xs px-3 py-1 bg-[#4a9bc4]/10 text-[#2d7ba8] rounded-md hover:bg-[#4a9bc4]/20 transition-colors font-medium"
                        >
                          Use Demo Symptoms
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Describe your symptoms... (e.g., 'Not feeling well, having chest pain since few days, feeling dizzy')"
                        rows={6}
                        className="w-full p-4 border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714] resize-none"
                      />
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <button type="button" className="p-2 text-[#a8a19a] hover:text-[#5c554d] rounded-lg hover:bg-[#faf9f7] transition-colors">
                          <Mic className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-2 text-[#a8a19a] hover:text-[#5c554d] rounded-lg hover:bg-[#faf9f7] transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-2 text-[#a8a19a] hover:text-[#5c554d] rounded-lg hover:bg-[#faf9f7] transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1714] mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
                        className="w-full p-3 border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1714] mb-2">
                        Gender
                      </label>
                      <select 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-3 border border-[#e8e5e0] rounded-lg focus:border-[#4a9bc4] focus:ring-1 focus:ring-[#4a9bc4]/20 outline-none transition-all bg-white text-[#1a1714]"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#2d7ba8] to-[#4a9bc4] hover:from-[#256394] hover:to-[#3a8bb0] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing symptoms...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Get Medical Consultation
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-[#1a1714] mb-4">Your Health Dashboard</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#6bb84d]/10 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#6bb84d]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1714]">Consultations</p>
                      <p className="text-xs text-[#5c554d]">12 completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4a9bc4]/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#4a9bc4]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1714]">Avg. Response</p>
                      <p className="text-xs text-[#5c554d]">2.3 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#9b7bb8]/10 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#9b7bb8]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1714]">Accuracy Rate</p>
                      <p className="text-xs text-[#5c554d]">98.5%</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Queries */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-[#1a1714] mb-4">Recent Queries</h3>
                <div className="space-y-3">
                  {recentQueries.map((query) => (
                    <div key={query.id} className="p-3 bg-[#faf9f7] rounded-lg border border-[#e8e5e0]/50">
                      <p className="text-sm font-medium text-[#1a1714] mb-1">{query.query}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-[#4a9bc4]/10 text-[#2d7ba8] rounded-md">{query.specialist}</span>
                        <span className="text-xs text-[#5c554d]">{query.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1a1714] mb-2">Consultation History</h1>
                <p className="text-[#5c554d]">View all your past medical consultations</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-4 py-2 border border-[#e8e5e0] rounded-lg text-sm bg-white text-[#1a1714]">
                  <option>All Time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5c554d] mb-1">Total Consultations</p>
                    <p className="text-3xl font-bold text-[#1a1714]">{recentQueries.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#4a9bc4]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#4a9bc4]" />
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5c554d] mb-1">High Priority Cases</p>
                    <p className="text-3xl font-bold text-[#ff6b6b]">
                      {recentQueries.filter(q => q.risk === "high").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-[#ff6b6b]" />
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5c554d] mb-1">Avg. Response Time</p>
                    <p className="text-3xl font-bold text-[#1a1714]">2.3<span className="text-lg text-[#5c554d]">min</span></p>
                  </div>
                  <div className="w-12 h-12 bg-[#6bb84d]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#6bb84d]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] shadow-lg">
              <div className="p-6 border-b border-[#e8e5e0]">
                <h3 className="text-lg font-semibold text-[#1a1714]">All Consultations</h3>
              </div>
              <div className="divide-y divide-[#e8e5e0]">
                {recentQueries.map((query) => (
                  <div key={query.id} className="p-6 hover:bg-[#faf9f7] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-[#1a1714]">{query.query}</h4>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            query.risk === "high" 
                              ? "bg-[#ff6b6b]/10 text-[#ff6b6b]"
                              : query.risk === "medium"
                              ? "bg-[#ffa726]/10 text-[#ffa726]"
                              : "bg-[#6bb84d]/10 text-[#6bb84d]"
                          }`}>
                            {query.risk.toUpperCase()} RISK
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#5c554d]">
                          <span className="flex items-center gap-1">
                            <Stethoscope className="w-4 h-4" />
                            {query.specialist}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {query.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-[#6bb84d]" />
                            {query.status}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-[#4a9bc4] hover:bg-[#4a9bc4]/10 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#1a1714] mb-2">Health Analytics</h1>
              <p className="text-[#5c554d]">Comprehensive insights into your consultation patterns and health trends</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#5c554d]">Total Consultations</p>
                  <FileText className="w-5 h-5 text-[#4a9bc4]" />
                </div>
                <p className="text-3xl font-bold text-[#1a1714]">{analyticsData.totalConsultations}</p>
                <p className="text-xs text-[#5c554d] mt-1">+12% from last month</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#5c554d]">Avg. Response Time</p>
                  <Clock className="w-5 h-5 text-[#6bb84d]" />
                </div>
                <p className="text-3xl font-bold text-[#1a1714]">{analyticsData.avgResponseTime}<span className="text-lg text-[#5c554d]">min</span></p>
                <p className="text-xs text-[#5c554d] mt-1">-0.3min improvement</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#5c554d]">Accuracy Rate</p>
                  <Star className="w-5 h-5 text-[#9b7bb8]" />
                </div>
                <p className="text-3xl font-bold text-[#1a1714]">{analyticsData.accuracyRate}%</p>
                <p className="text-xs text-[#5c554d] mt-1">Consistent performance</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#5c554d]">Most Consulted</p>
                  <Heart className="w-5 h-5 text-[#e85d5d]" />
                </div>
                <p className="text-2xl font-bold text-[#1a1714]">Cardiology</p>
                <p className="text-xs text-[#5c554d] mt-1">24% of consultations</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Consultations Over Time */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <LineChart className="w-5 h-5 text-[#4a9bc4]" />
                  <h3 className="text-lg font-bold text-[#1a1714]">Consultations Over Time</h3>
                </div>
                <div className="h-64 flex items-end gap-3">
                  {analyticsData.consultationsByMonth.map((data, idx) => {
                    const maxCount = Math.max(...analyticsData.consultationsByMonth.map(d => d.count));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col items-center justify-end" style={{ height: '100%' }}>
                          <div
                            className="w-full rounded-t-lg bg-[#4a9bc4] hover:opacity-80 transition-opacity"
                            style={{
                              height: `${(data.count / maxCount) * 100}%`,
                              minHeight: '20px'
                            }}
                            title={`${data.month}: ${data.count} consultations`}
                          />
                        </div>
                        <span className="text-xs text-[#5c554d] font-medium">{data.month}</span>
                        <span className="text-xs text-[#1a1714] font-bold">{data.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specialist Distribution */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-5 h-5 text-[#9b7bb8]" />
                  <h3 className="text-lg font-bold text-[#1a1714]">Specialist Distribution</h3>
                </div>
                <div className="space-y-4">
                  {analyticsData.specialistDistribution.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1a1714]">{item.specialty}</span>
                        <span className="text-sm font-bold text-[#4a9bc4]">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-[#e8e5e0] rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-[#4a9bc4]"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5 text-[#e85d5d]" />
                <h3 className="text-lg font-bold text-[#1a1714]">Risk Level Distribution</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analyticsData.riskDistribution.map((risk, idx) => (
                  <div key={idx} className="text-center">
                    <div className="mb-4">
                      <div className="text-4xl font-bold mb-2" style={{ color: risk.color }}>
                        {risk.count}
                      </div>
                      <div className="text-sm font-medium text-[#1a1714] mb-1">{risk.level} Risk</div>
                      <div className="w-full bg-[#e8e5e0] rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(risk.count / analyticsData.totalConsultations) * 100}%`,
                            backgroundColor: risk.color
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#5c554d]">
                      {((risk.count / analyticsData.totalConsultations) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Insights */}
            <div className="bg-gradient-to-r from-[#4a9bc4]/10 to-[#6bb84d]/10 border border-[#4a9bc4]/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4a9bc4]/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#4a9bc4]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1a1714] mb-2">Health Insights</h3>
                  <ul className="space-y-2 text-[#5c554d]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#6bb84d] flex-shrink-0 mt-0.5" />
                      <span>Your consultation frequency has increased by 12% this month, indicating proactive health management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#6bb84d] flex-shrink-0 mt-0.5" />
                      <span>Cardiology consultations represent 24% of your total, suggesting focus on cardiovascular health.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#6bb84d] flex-shrink-0 mt-0.5" />
                      <span>Most consultations (56%) are low-risk cases, indicating good overall health status.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-[#ffa726] flex-shrink-0 mt-0.5" />
                      <span>Consider scheduling follow-up appointments for high-priority cases to ensure continuity of care.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Triage Alert */}
            <div className="bg-gradient-to-r from-[#ff6b6b]/10 to-[#ffa726]/10 border border-[#ff6b6b]/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#ff6b6b]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1a1714] mb-2">Triage Assessment</h3>
                  <p className="text-[#5c554d] leading-relaxed">{result.triage_result}</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#ff6b6b]/10 text-[#ff6b6b] rounded-md text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    Urgent - {result.specialist_type}
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Collaboration Flow */}
            {result.agent_discussions && result.agent_discussions.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-[#4a9bc4]" />
                  <h3 className="text-xl font-bold text-[#1a1714]">AI Agent Collaboration</h3>
                </div>
                <div className="space-y-4">
                  {result.agent_discussions.map((discussion, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-l-4 pl-4 py-3 rounded-r-lg"
                      style={{ borderColor: discussion.color, backgroundColor: `${discussion.color}08` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: discussion.color }}>
                            {discussion.agent.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1a1714]">{discussion.agent}</p>
                            <p className="text-xs text-[#5c554d]">{discussion.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#5c554d]">{discussion.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-medium" style={{ color: discussion.color }}>
                              {(discussion.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#5c554d] text-sm leading-relaxed">{discussion.message}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Charts and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Symptom Timeline Chart */}
              {result.symptom_timeline && result.symptom_timeline.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="w-5 h-5 text-[#4a9bc4]" />
                    <h3 className="text-lg font-bold text-[#1a1714]">Symptom Progression</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="h-48 flex items-end gap-2">
                      {result.symptom_timeline.map((data, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex flex-col items-center justify-end" style={{ height: '100%' }}>
                            <div
                              className="w-full rounded-t-lg transition-all hover:opacity-80"
                              style={{
                                height: `${(data.severity / 10) * 100}%`,
                                backgroundColor: data.severity >= 7 ? '#ff6b6b' : data.severity >= 5 ? '#ffa726' : '#4a9bc4',
                                minHeight: '20px'
                              }}
                              title={`Day ${data.day}: Severity ${data.severity}/10`}
                            />
                          </div>
                          <span className="text-xs text-[#5c554d] font-medium">Day {data.day}</span>
                          <span className="text-xs text-[#1a1714] font-bold">{data.severity}/10</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-[#e8e5e0]">
                      <p className="text-xs text-[#5c554d] mb-2">Symptom Details:</p>
                      <div className="space-y-1">
                        {result.symptom_timeline.map((data, idx) => (
                          <div key={idx} className="text-xs text-[#5c554d]">
                            <span className="font-medium">Day {data.day}:</span> {data.symptoms.join(", ")}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Analysis Chart */}
              {result.risk_analysis && (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-5 h-5 text-[#e85d5d]" />
                    <h3 className="text-lg font-bold text-[#1a1714]">Risk Analysis</h3>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1a1714]">Overall Risk Score</span>
                      <span className="text-2xl font-bold" style={{ color: result.risk_analysis.overall_risk >= 70 ? '#ff6b6b' : result.risk_analysis.overall_risk >= 50 ? '#ffa726' : '#6bb84d' }}>
                        {result.risk_analysis.overall_risk}%
                      </span>
                    </div>
                    <div className="w-full bg-[#e8e5e0] rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${result.risk_analysis.overall_risk}%`,
                          backgroundColor: result.risk_analysis.overall_risk >= 70 ? '#ff6b6b' : result.risk_analysis.overall_risk >= 50 ? '#ffa726' : '#4a9bc4'
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {result.risk_analysis.factors.map((factor, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#1a1714]">{factor.name}</span>
                          <span className="text-sm font-bold" style={{ color: factor.risk >= 70 ? '#ff6b6b' : factor.risk >= 50 ? '#ffa726' : '#4a9bc4' }}>
                            {factor.risk}%
                          </span>
                        </div>
                        <div className="w-full bg-[#e8e5e0] rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${factor.risk}%`,
                              backgroundColor: factor.risk >= 70 ? '#ff6b6b' : factor.risk >= 50 ? '#ffa726' : '#4a9bc4'
                            }}
                          />
                        </div>
                        <p className="text-xs text-[#5c554d]">{factor.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Differential Diagnosis */}
            {result.differential_diagnosis && result.differential_diagnosis.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList className="w-5 h-5 text-[#9b7bb8]" />
                  <h3 className="text-lg font-bold text-[#1a1714]">Differential Diagnosis</h3>
                </div>
                <div className="space-y-4">
                  {result.differential_diagnosis.map((diagnosis, idx) => (
                    <div key={idx} className="border border-[#e8e5e0] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1a1714] mb-1">{diagnosis.condition}</h4>
                          <p className="text-sm text-[#5c554d]">{diagnosis.reasoning}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-2xl font-bold text-[#4a9bc4]">{diagnosis.probability}%</div>
                          <div className="text-xs text-[#5c554d]">Probability</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-[#5c554d]">Tests Needed:</span>
                        {diagnosis.tests_needed.map((test, testIdx) => (
                          <span key={testIdx} className="px-2 py-1 bg-[#4a9bc4]/10 text-[#2d7ba8] rounded-md text-xs">
                            {test}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 w-full bg-[#e8e5e0] rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#4a9bc4]"
                          style={{ width: `${diagnosis.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-5 h-5 text-[#6bb84d]" />
                  <h3 className="text-lg font-bold text-[#1a1714]">Recommendations & Action Plan</h3>
                </div>
                <div className="space-y-4">
                  {result.recommendations
                    .sort((a, b) => a.priority - b.priority)
                    .map((rec, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`border-l-4 rounded-r-lg p-4 ${
                          rec.type === 'urgent' 
                            ? 'border-[#ff6b6b] bg-[#ff6b6b]/5' 
                            : rec.type === 'important'
                            ? 'border-[#ffa726] bg-[#ffa726]/5'
                            : 'border-[#4a9bc4] bg-[#4a9bc4]/5'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {rec.type === 'urgent' ? (
                            <AlertTriangle className="w-5 h-5 text-[#ff6b6b] flex-shrink-0 mt-0.5" />
                          ) : rec.type === 'important' ? (
                            <AlertCircle className="w-5 h-5 text-[#ffa726] flex-shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-[#4a9bc4] flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-[#1a1714]">{rec.title}</h4>
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                rec.type === 'urgent'
                                  ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]'
                                  : rec.type === 'important'
                                  ? 'bg-[#ffa726]/10 text-[#ffa726]'
                                  : 'bg-[#4a9bc4]/10 text-[#2d7ba8]'
                              }`}>
                                {rec.timeframe}
                              </span>
                            </div>
                            <p className="text-sm text-[#5c554d] leading-relaxed">{rec.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* Confidence Scores */}
            {result.confidence_scores && result.confidence_scores.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-5 h-5 text-[#9b7bb8]" />
                  <h3 className="text-lg font-bold text-[#1a1714]">Confidence Scores</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.confidence_scores.map((score, idx) => (
                    <div key={idx} className="border border-[#e8e5e0] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#1a1714]">{score.aspect}</span>
                        <span className="text-lg font-bold text-[#4a9bc4]">{score.score}%</span>
                      </div>
                      <div className="w-full bg-[#e8e5e0] rounded-full h-2 mb-2">
                        <div
                          className="h-2 rounded-full bg-[#4a9bc4]"
                          style={{ width: `${score.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#5c554d]">{score.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnosis */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#4a9bc4]/10 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-[#4a9bc4]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1714]">AI Diagnosis</h3>
                </div>
                <p className="text-[#5c554d] leading-relaxed">{result.diagnosis_result}</p>
              </div>

              {/* Peer Review */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8e5e0] p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#6bb84d]/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#6bb84d]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1714]">Peer Review</h3>
                </div>
                <p className="text-[#5c554d] leading-relaxed">{result.peer_review_result}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#2d7ba8] text-white rounded-lg font-semibold hover:bg-[#256394] transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </button>
              <button className="px-6 py-3 bg-white border border-[#e8e5e0] text-[#1a1714] rounded-lg font-semibold hover:bg-[#faf9f7] transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Download Report
              </button>
              <button className="px-6 py-3 bg-white border border-[#e8e5e0] text-[#1a1714] rounded-lg font-semibold hover:bg-[#faf9f7] transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Ask Follow-up
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Question Dialog - Use mock question for demo or real WebSocket question */}
      <QuestionDialog
        question={mockQuestion || currentQuestion}
        onSendResponse={mockQuestion ? handleMockResponse : sendResponse}
        onClose={mockQuestion ? clearMockQuestion : clearQuestion}
      />
    </div>
  );
}
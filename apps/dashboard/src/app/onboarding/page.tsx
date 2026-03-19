'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  UserX, Clock, ShieldAlert, Bot, ArrowRight, Target, Globe, 
  BrainCircuit, User, Zap, Cpu, BugPlay 
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [industry, setIndustry] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  
  // Persona Razor State - Hardened Matrix
  const [razor, setRazor] = useState({
    codename: 'ghost-beta-substrate',
    region: 'US-EAST-1 (VPC)',
    baseLatency: 150,
    jitter: 25,
    timeoutMs: 8000,
    wpm: 65,
    observability: 100,
    fPattern: 0.85,
    chaosMode: false,
    xssVector: false
  });

  const [loading, setLoading] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (testUrl: string) => {
    try {
      const parsed = new URL(testUrl);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    setError(null);
    if (step === 2 && (!url || !validateUrl(url))) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    if (step === 3 && (!industry || !primaryGoal)) {
      setError('Both Industry and Primary Goal are required.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleLaunch = async () => {
    setError(null);
    
    // Final validation sweep
    if (!url || !validateUrl(url)) {
      setError('Invalid Target URL.');
      return;
    }
    
    // Numeric Razor Validation
    if (razor.baseLatency < 0 || razor.baseLatency > 2000) {
      setError('Base Latency must be between 0 and 2000ms.');
      return;
    }
    if (razor.wpm < 5 || razor.wpm > 200) {
      setError('WPM must be between 5 and 200.');
      return;
    }

    setLoading(true);
    setDeployStatus('Initializing Substrate...');
    
    try {
      // Phase 17: Actual API Orchestration
      const response = await fetch('/api/v1/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_url: url,
          organization_id: (session?.user as any)?.organization_id,
          industry,
          goal: primaryGoal,
          persona: razor
        })
      });

      if (!response.ok) throw new Error('Failed to initialize simulation');
      const data = await response.json();

      setDeployStatus('Synthesizing Target Group Identity...');
      
      // Simulate the orchestration delay for UX but with a deterministic handoff
      setTimeout(() => {
        setDeployStatus('Deploying Ghost Fleet...');
        setTimeout(() => {
          const token = data.seance_token || '';
          router.push(`/dashboard/simulations/${data.id || `sim-${Date.now()}`}?token=${token}`);
        }, 1000);
      }, 1000);

    } catch (error) {
      console.error("Substrate initialization failed:", error);
      setDeployStatus('Retry Required');
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="w-full relative min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: The Hook / Education */}
          {step === 1 && (
            <motion.div key="step1" {...fadeInUp} className="space-y-12 py-24">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff7b72]/10 border border-[#ff7b72]/20 mb-4">
                  <UserX className="w-8 h-8 text-[#ff7b72]" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-[#484f58]">
                  The empathy gap in software delivery.
                </h1>
                <p className="text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
                  Automated scripts ensure your buttons work, but they don't tell you if the buttons make sense. Phantom provides the missing middle ground: <span className="text-white">Synthetic Human Intelligence.</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl border border-[#30363d] bg-[#161b22]/50 backdrop-blur-xl space-y-4">
                  <Clock className="w-8 h-8 text-[#a5d6ff]" />
                  <h3 className="text-xl font-bold text-[#c9d1d9]">Zero Recruitment</h3>
                  <p className="text-[#8b949e]">Recruiting human testers takes weeks. We deploy 500 synthetic Ghosts in 30 seconds.</p>
                </div>
                <div className="p-8 rounded-2xl border border-[#30363d] bg-[#161b22]/50 backdrop-blur-xl space-y-4">
                  <ShieldAlert className="w-8 h-8 text-[#ffbd2e]" />
                  <h3 className="text-xl font-bold text-[#c9d1d9]">Fractional Cost</h3>
                  <p className="text-[#8b949e]">B2B user testing costs thousands. Phantom scales at fractions of a penny per session.</p>
                </div>
                <div className="p-8 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-xl space-y-4">
                  <Bot className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-white">Ghost Heuristics</h3>
                  <p className="text-[#8b949e]">Internal cognitive models finding friction and confusion before your real users do.</p>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={handleNext} 
                  className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  Initialize Connection <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: The Target */}
          {step === 2 && (
            <motion.div key="step2" {...fadeInUp} className="max-w-xl mx-auto space-y-8 py-24">
               <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#a5d6ff]/10 border border-[#a5d6ff]/20 mb-4">
                  <Target className="w-8 h-8 text-[#a5d6ff]" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-widest">
                  Target Acquisition
                </h1>
                <p className="text-[#8b949e]">
                  Where should we drop the payload? This is usually your staging URL or a critical production landing page.
                </p>
              </div>

              <div className="space-y-4 phantom-glass p-10 rounded-3xl satin-border shadow-2xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8b949e] uppercase tracking-widest">Target Surface URI</label>
                  <input 
                     type="url" 
                     value={url}
                     onChange={(e) => {
                       setUrl(e.target.value);
                       setError(null);
                     }}
                     placeholder="https://staging.your-app.com/signup"
                     className={`w-full bg-[#0d1117] border ${error ? 'border-red-500' : 'border-[#30363d]'} rounded-xl px-4 py-4 text-lg text-white placeholder:text-[#484f58] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all font-mono`}
                     autoFocus
                  />
                  {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
                </div>
                <button 
                  onClick={handleNext} 
                  disabled={!url || url.length < 5}
                  className="w-full flex justify-center items-center gap-2 px-6 py-5 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,88,12,0.4)] uppercase tracking-widest text-sm"
                >
                  Lock Target <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: The Context */}
          {step === 3 && (
            <motion.div key="step3" {...fadeInUp} className="max-w-xl mx-auto space-y-8 py-24">
               <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8a2be2]/10 border border-[#8a2be2]/20 mb-4">
                  <Globe className="w-8 h-8 text-[#8a2be2]" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-widest">
                  Website Context
                </h1>
                <p className="text-[#8b949e]">
                  Sharpen the Agent's cognitive focus by defining the domain and primary conversion goal.
                </p>
              </div>

              <div className="space-y-6 phantom-glass p-10 rounded-3xl satin-border shadow-2xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8b949e] uppercase tracking-widest">Industry Vertical</label>
                  <select 
                    value={industry}
                    onChange={(e) => {
                      setIndustry(e.target.value);
                      setError(null);
                    }}
                    className={`w-full bg-[#0d1117] border ${error && !industry ? 'border-red-500' : 'border-[#30363d]'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#8a2be2] transition-all appearance-none text-sm font-mono`}
                  >
                    <option value="">Select Domain...</option>
                    <option value="SaaS / B2B">SaaS / B2B</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Crypto / Web3">Crypto / Web3</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8b949e] uppercase tracking-widest">Primary Conversion Goal</label>
                  <input 
                    type="text" 
                    value={primaryGoal}
                    onChange={(e) => {
                      setPrimaryGoal(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g. Complete Sign Up Flow"
                    className={`w-full bg-[#0d1117] border ${error && !primaryGoal ? 'border-red-500' : 'border-[#30363d]'} rounded-xl px-4 py-4 text-white placeholder:text-[#484f58] focus:outline-none focus:border-[#8a2be2] transition-all text-sm font-mono`}
                  />
                  {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={!industry || !primaryGoal}
                  className="w-full flex justify-center items-center gap-2 px-6 py-5 bg-[#8a2be2] text-white rounded-xl font-bold hover:bg-[#9d4edd] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(138,43,226,0.4)] uppercase tracking-widest text-sm"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Configuration & Launch (Persona Razor Matrix) */}
          {step === 4 && (
            <motion.div key="step4" {...fadeInUp} className="max-w-6xl mx-auto space-y-12 py-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4 shadow-[0_0_20px_rgba(234,88,12,0.2)]">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-widest">
                  Vibe Audit Calibration
                </h1>
                <p className="text-[#8b949e]">
                  Hardcode behavioral thresholds and latency payloads into node memory.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Identity & Latency */}
                <div className="space-y-8">
                  <div className="phantom-glass p-8 rounded-3xl satin-border space-y-8 border-[#30363d]">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                         <User className="w-3 h-3" /> Identity & Network
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase">Profile Codename</label>
                          <input 
                             type="text"
                             value={razor.codename}
                             onChange={(e) => setRazor({...razor, codename: e.target.value})}
                             className="w-full bg-[#0a0a0c] border border-white/10 rounded px-3 py-3 text-xs text-primary font-mono outline-none focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase">Region</label>
                          <select 
                             value={razor.region}
                             onChange={(e) => setRazor({...razor, region: e.target.value})}
                             className="w-full bg-[#0a0a0c] border border-white/10 rounded px-3 py-3 text-xs text-white outline-none font-mono focus:border-primary/50"
                          >
                            <option>US-EAST-1 (VPC)</option>
                            <option>EU-CENTRAL-1 (VPC)</option>
                            <option>AP-SOUTH-1 (VPC)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                         <Zap className="w-3 h-3" /> Latency Matrix
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase flex justify-between">
                            <span>Base Latency</span>
                            <span className="text-primary font-mono">{razor.baseLatency}ms</span>
                          </label>
                          <input 
                            type="range" min="0" max="1000" step="10"
                            value={razor.baseLatency}
                            onChange={(e) => setRazor({...razor, baseLatency: parseInt(e.target.value)})}
                            className="w-full accent-primary bg-[#30363d] h-1 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase flex justify-between">
                            <span>Jitter (%)</span>
                            <span className="text-primary font-mono">±{razor.jitter}%</span>
                          </label>
                          <input 
                            type="range" min="0" max="100"
                            value={razor.jitter}
                            onChange={(e) => setRazor({...razor, jitter: parseInt(e.target.value)})}
                            className="w-full accent-primary bg-[#30363d] h-1 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Cognitive & Hostile */}
                <div className="space-y-8">
                  <div className="phantom-glass p-8 rounded-3xl satin-border space-y-8 border-[#30363d]">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-2">
                         <Cpu className="w-3 h-3" /> Cognitive Observability
                      </h3>
                      <div className="space-y-6">
                         <div className="space-y-3">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase flex justify-between">
                            <span>DOM Observability Depth</span>
                            <span className="text-primary font-mono">{razor.observability}%</span>
                          </label>
                          <input 
                            type="range" min="0" max="100"
                            value={razor.observability}
                            onChange={(e) => setRazor({...razor, observability: parseInt(e.target.value)})}
                            className="w-full accent-primary bg-[#30363d] h-1 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-[#c9d1d9] uppercase flex justify-between">
                            <span>WPM (Keystroke Rate)</span>
                            <span className="text-primary font-mono">{razor.wpm} WPM</span>
                          </label>
                          <input 
                            type="range" min="10" max="150"
                            value={razor.wpm}
                            onChange={(e) => setRazor({...razor, wpm: parseInt(e.target.value)})}
                            className="w-full accent-primary bg-[#30363d] h-1 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-bold text-[#ff7b72] uppercase tracking-widest border-b border-[#ff7b72]/20 pb-2 flex items-center gap-2">
                         <BugPlay className="w-3 h-3" /> Hostile Resiliency
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                         <label className={`flex flex-col p-4 rounded-xl border transition-all cursor-pointer ${razor.chaosMode ? 'bg-[#ff7b72]/10 border-[#ff7b72]/30 shadow-[0_0_15px_rgba(255,123,114,0.1)]' : 'bg-[#0a0a0c] border-white/5 hover:border-white/10'}`}>
                           <input 
                             type="checkbox" className="hidden" 
                             checked={razor.chaosMode}
                             onChange={(e) => setRazor({...razor, chaosMode: e.target.checked})}
                           />
                           <span className="text-[10px] font-bold text-white uppercase mb-1">Chaos Mode</span>
                           <span className="text-[8px] text-[#5c646c] font-mono leading-tight">Induce packet loss & GC pauses</span>
                         </label>
                         <label className={`flex flex-col p-4 rounded-xl border transition-all cursor-pointer ${razor.xssVector ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(234,88,12,0.1)]' : 'bg-[#0a0a0c] border-white/5 hover:border-white/10'}`}>
                           <input 
                             type="checkbox" className="hidden" 
                             checked={razor.xssVector}
                             onChange={(e) => setRazor({...razor, xssVector: e.target.checked})}
                           />
                           <span className="text-[10px] font-bold text-white uppercase mb-1">XSS Testing</span>
                           <span className="text-[8px] text-[#5c646c] font-mono leading-tight">Attempt benign script injection</span>
                         </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col items-center gap-6 border-t border-white/5">
                <button 
                  onClick={handleLaunch} 
                  disabled={loading}
                  className="w-full max-w-xl flex justify-center items-center gap-4 px-8 py-6 bg-white text-black rounded-2xl font-bold text-xl hover:bg-gray-200 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{deployStatus}</span>
                        <span className="flex gap-1">
                          <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-75" />
                          <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-150" />
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Ghost Initialization in Progress</span>
                    </div>
                  ) : (
                    <>Initialize Visual Vibe Audit <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-white/10" />
                  <p className="text-[10px] text-[#5c646c] font-mono uppercase tracking-[0.2em]">
                     VPC Tunneling to US-EAST-1
                  </p>
                  <div className="h-px w-12 bg-white/10" />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

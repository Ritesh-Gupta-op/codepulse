import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Sparkles, Play, Check, Copy, AlertTriangle, Code2, Cpu, ArrowRight } from 'lucide-react';

const sampleBuggyCode = `// Faulty User Auth Function
async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  
  // Vulnerable to SQL Injection
  const user = await db.query("SELECT * FROM users WHERE user='" + username + "' AND pass='" + password + "'");
  
  if (user) {
    return res.status(200).json({ success: true, token: "secret_123" });
  }
  
  return res.status(401).json({ error: "Invalid credentials" });
}`;

const sampleFixedCode = `// AI Refactored & Secured Function
async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  
  // Parametrized Query (Prevents SQL Injection)
  const user = await db.query(
    "SELECT id, username, role FROM users WHERE username = $1 AND password_hash = $2",
    [username, hashPassword(password)]
  );
  
  if (user.rows.length > 0) {
    const token = generateJWT(user.rows[0]);
    return res.status(200).json({ success: true, token });
  }
  
  return res.status(401).json({ error: "Invalid username or password" });
}`;

export function AiLabPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputCode, setInputCode] = useState(sampleBuggyCode);
  const [outputCode, setOutputCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'bugfix' | 'optimize' | 'tests'>('bugfix');
  const [copied, setCopied] = useState(false);

  // AI Refactor Simulation
  const handleAiAnalysis = () => {
    setIsAnalyzing(true);
    setOutputCode('');

    setTimeout(() => {
      setOutputCode(sampleFixedCode);
      setIsAnalyzing(false);
    }, 1800);
  };

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Sparkles size={18} />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">AI Lab Studio</p>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Bug prediction and code repair studio</h2>
          <p className="text-sm text-slate-400">
            Automated LLM prompt engineering for vulnerability detection, code refactoring, and test generation.
          </p>
        </div>

        {/* Action Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bugfix')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'bugfix'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <AlertTriangle size={14} />
              Auto-fix Vulnerabilities
            </button>

            <button
              onClick={() => setActiveTab('optimize')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'optimize'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu size={14} />
              Optimize Performance
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'tests'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 size={14} />
              Generate Unit Tests
            </button>
          </div>

          <button
            onClick={handleAiAnalysis}
            disabled={isAnalyzing || !inputCode.trim()}
            className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Cpu className="animate-spin" size={16} />
                AI Processing...
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                Run AI Repair
              </>
            )}
          </button>
        </div>

        {/* Code Editor Side-by-Side Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Code Block */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-slate-950/80 flex flex-col h-[450px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Input Snippet</span>
              <span className="text-xs text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                SQL Injection Risk
              </span>
            </div>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste JavaScript / Python / TypeScript code here..."
              className="flex-1 w-full bg-transparent p-4 font-mono text-xs text-slate-200 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* AI Refactored Output Block */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-slate-950/80 flex flex-col h-[450px] relative">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} /> AI Suggested Solution
              </span>
              {outputCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed">
              {isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <Cpu size={32} className="animate-spin text-cyan-400" />
                  <p className="text-sm">Analyzing AST & refactoring security vulnerabilities...</p>
                </div>
              ) : outputCode ? (
                <pre className="text-emerald-300 whitespace-pre-wrap">{outputCode}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                  <ArrowRight size={24} />
                  <p className="text-xs">Click "Run AI Repair" to inspect fixed output.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
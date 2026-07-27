import { useState, useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Sparkles, ShieldAlert, Zap, CheckCircle2, Play, Code2, ShieldCheck, RefreshCw, AlertOctagon } from 'lucide-react';

interface Repository {
  id: string;
  owner: string;
  name: string;
}

interface RepoIssue {
  issueId: string;
  errorType: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  inputSnippet: string;
  suggestedSolution: string;
}

// Full suite of mock issues mapped per repository
const defaultIssuesMap: Record<string, RepoIssue[]> = {
  'Manish1678-sos/Dev-Note': [
    {
      issueId: 'dev-1',
      errorType: 'SQL Injection Risk',
      riskLevel: 'Critical',
      inputSnippet: `// Faulty User Auth Function\nasync function handleUserLogin(req, res) {\n  const { username, password } = req.body;\n  const user = await db.query("SELECT * FROM users WHERE user='" + username + "' AND pass='" + password + "'");\n  if (user) return res.status(200).json({ token: "secret_123" });\n  return res.status(401).json({ error: "Invalid credentials" });\n}`,
      suggestedSolution: `// Secure Parameterized Query Solution\nasync function handleUserLogin(req, res) {\n  const { username, password } = req.body;\n  const user = await db.query("SELECT * FROM users WHERE user = $1 AND pass = $2", [username, password]);\n  if (user.rows.length > 0) return res.status(200).json({ token: "secret_123" });\n  return res.status(401).json({ error: "Invalid credentials" });\n}`
    },
    {
      issueId: 'dev-2',
      errorType: 'Hardcoded JWT Secret',
      riskLevel: 'High',
      inputSnippet: `// Hardcoded Secret Key\nconst jwtSecret = "my_super_secret_key_12345";\nfunction generateToken(user) {\n  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });\n}`,
      suggestedSolution: `// Env variable protection\nconst jwtSecret = process.env.JWT_SECRET;\nif (!jwtSecret) throw new Error("JWT_SECRET missing");\nfunction generateToken(user) {\n  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });\n}`
    },
    {
      issueId: 'dev-3',
      errorType: 'Missing CORS Configuration',
      riskLevel: 'Medium',
      inputSnippet: `// Permissive CORS setting\napp.use((req, res, next) => {\n  res.header("Access-Control-Allow-Origin", "*");\n  next();\n});`,
      suggestedSolution: `// Strict origin handling\napp.use(cors({\n  origin: process.env.ALLOWED_ORIGIN || "https://yourdomain.com",\n  credentials: true\n}));`
    },
    {
      issueId: 'dev-4',
      errorType: 'Unsanitized HTML Payload (XSS Risk)',
      riskLevel: 'High',
      inputSnippet: `// Direct innerHTML rendering\nfunction renderComment(userInput) {\n  document.getElementById("comments").innerHTML += '<div>' + userInput + '</div>';\n}`,
      suggestedSolution: `// DOMPurify sanitization\nimport DOMPurify from 'dompurify';\nfunction renderComment(userInput) {\n  const safeInput = DOMPurify.sanitize(userInput);\n  document.getElementById("comments").innerHTML += '<div>' + safeInput + '</div>';\n}`
    }
  ]
};

// Generates 4 rich vulnerabilities for any newly added repository
const generateFullIssuesList = (repoName: string): RepoIssue[] => [
  {
    issueId: `gen-1-${Date.now()}`,
    errorType: 'Unsanitized User Input & Potential Injection',
    riskLevel: 'Critical',
    inputSnippet: `// Untrusted dynamic route input handling\napp.get("/api/data", (req, res) => {\n  const query = req.query.search;\n  execQuery("SELECT * FROM data WHERE title LIKE '%" + query + "%'");\n});`,
    suggestedSolution: `// Parameterized query\napp.get("/api/data", (req, res) => {\n  const query = req.query.search;\n  if (typeof query !== 'string') return res.status(400).end();\n  execQuery("SELECT * FROM data WHERE title LIKE $1", [\`%\${query}%\`]);\n});`
  },
  {
    issueId: `gen-2-${Date.now()}`,
    errorType: 'Uncaught Exception in Async Handler',
    riskLevel: 'High',
    inputSnippet: `// Missing try-catch block\napp.post("/api/process", async (req, res) => {\n  const result = await externalService.call(req.body);\n  res.json(result);\n});`,
    suggestedSolution: `// Wrapped with error handling\napp.post("/api/process", async (req, res, next) => {\n  try {\n    const result = await externalService.call(req.body);\n    res.json(result);\n  } catch (err) {\n    next(err);\n  }\n});`
  },
  {
    issueId: `gen-3-${Date.now()}`,
    errorType: 'Deprecated Package Dependency',
    riskLevel: 'Medium',
    inputSnippet: `// package.json snippet\n"dependencies": {\n  "request": "^2.88.2",\n  "crypto-js": "^3.1.9"\n}`,
    suggestedSolution: `// Upgraded modern alternatives\n"dependencies": {\n  "axios": "^1.6.0",\n  "crypto": "^1.0.1"\n}`
  },
  {
    issueId: `gen-4-${Date.now()}`,
    errorType: 'Insecure Direct Object Reference (IDOR)',
    riskLevel: 'High',
    inputSnippet: `// Missing user context check\napp.get("/api/documents/:docId", async (req, res) => {\n  const doc = await Document.findById(req.params.docId);\n  res.json(doc);\n});`,
    suggestedSolution: `// Verified ownership check\napp.get("/api/documents/:docId", async (req, res) => {\n  const doc = await Document.findOne({ _id: req.params.docId, ownerId: req.user.id });\n  if (!doc) return res.status(404).json({ error: "Unauthorized or Not found" });\n  res.json(doc);\n});`
  }
];

export function AiLabPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepoId, setSelectedRepoId] = useState<string>('');
  
  const [issuesMap, setIssuesMap] = useState<Record<string, RepoIssue[]>>({});
  const [selectedIssueId, setSelectedIssueId] = useState<string>('');

  const [isRepairing, setIsRepairing] = useState(false);
  const [resolvedIssues, setResolvedIssues] = useState<Record<string, boolean>>({});

  // Load repositories dynamically
  useEffect(() => {
    const saved = localStorage.getItem('codepulse_repos');
    let loadedRepos: Repository[] = [];

    if (saved) {
      try { loadedRepos = JSON.parse(saved); } catch (e) { console.error(e); }
    }

    if (loadedRepos.length === 0) {
      loadedRepos = [
        { id: '1', owner: 'Manish1678-sos', name: 'Dev-Note' },
        { id: '2', owner: 'facebook', name: 'react' },
        { id: '3', owner: 'fastapi', name: 'fastapi' },
      ];
    }

    setRepos(loadedRepos);

    // Initialize issues
    const initialMap: Record<string, RepoIssue[]> = {};
    loadedRepos.forEach((r) => {
      const fullName = `${r.owner}/${r.name}`;
      initialMap[r.id] = defaultIssuesMap[fullName] ? [...defaultIssuesMap[fullName]] : generateFullIssuesList(fullName);
    });

    setIssuesMap(initialMap);

    if (loadedRepos.length > 0) {
      const firstRepoId = loadedRepos[0].id;
      setSelectedRepoId(firstRepoId);
      if (initialMap[firstRepoId] && initialMap[firstRepoId].length > 0) {
        setSelectedIssueId(initialMap[firstRepoId][0].issueId);
      }
    }
  }, []);

  const currentRepoIssues = issuesMap[selectedRepoId] || [];
  const activeIssue = currentRepoIssues.find((i) => i.issueId === selectedIssueId) || currentRepoIssues[0];

  const handleRunRepair = () => {
    setIsRepairing(true);
    setTimeout(() => {
      setIsRepairing(false);
      if (activeIssue) {
        setResolvedIssues((prev) => ({ ...prev, [activeIssue.issueId]: true }));
      }
    }, 1000);
  };

  const handleApplyAndRemoveIssue = (issueId: string) => {
    setIssuesMap((prev) => {
      const remaining = (prev[selectedRepoId] || []).filter((i) => i.issueId !== issueId);
      return { ...prev, [selectedRepoId]: remaining };
    });

    // Pick next issue
    const remaining = currentRepoIssues.filter((i) => i.issueId !== issueId);
    if (remaining.length > 0) {
      setSelectedIssueId(remaining[0].issueId);
    }
  };

  const handleRescanRepo = () => {
    const repoObj = repos.find((r) => r.id === selectedRepoId);
    if (!repoObj) return;

    const fullName = `${repoObj.owner}/${repoObj.name}`;
    const freshList = defaultIssuesMap[fullName] ? [...defaultIssuesMap[fullName]] : generateFullIssuesList(fullName);

    setIssuesMap((prev) => ({ ...prev, [selectedRepoId]: freshList }));
    setResolvedIssues({});
    if (freshList.length > 0) {
      setSelectedIssueId(freshList[0].issueId);
    }
  };

  const getRiskBadgeClass = (risk: RepoIssue['riskLevel']) => {
    switch (risk) {
      case 'Critical': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'High': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Medium': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-8 pb-12">
        
        {/* Header Section */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-slate-900/60 backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-3">
                <Sparkles size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">AI Lab Studio</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Bug prediction and code repair studio
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Select a repository to scan and resolve all detected code smells and vulnerability issues.
              </p>
            </div>

            {/* Target Repository Selector Dropdown */}
            <div className="flex flex-col gap-1.5 min-w-[260px]">
              <label className="text-xs font-medium text-slate-400">Target Repository</label>
              <select
                value={selectedRepoId}
                onChange={(e) => {
                  const newRepoId = e.target.value;
                  setSelectedRepoId(newRepoId);
                  const issues = issuesMap[newRepoId] || [];
                  if (issues.length > 0) setSelectedIssueId(issues[0].issueId);
                }}
                className="bg-slate-950 border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
              >
                {repos.map((repo) => (
                  <option key={repo.id} value={repo.id} className="bg-slate-900 text-white">
                    {repo.owner}/{repo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Issue View / Clean State View */}
        {currentRepoIssues.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: All Repo Issues List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <AlertOctagon size={14} className="text-rose-400" />
                  Detected Vulnerabilities ({currentRepoIssues.length})
                </span>
              </div>

              {currentRepoIssues.map((issue) => {
                const isSelected = activeIssue?.issueId === issue.issueId;
                const isFixed = resolvedIssues[issue.issueId];

                return (
                  <button
                    key={issue.issueId}
                    onClick={() => setSelectedIssueId(issue.issueId)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                        : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${getRiskBadgeClass(issue.riskLevel)}`}>
                        {issue.riskLevel}
                      </span>
                      {isFixed && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 size={13} /> Fixed
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-white line-clamp-1">{issue.errorType}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Active Issue & AI Code Repair Panel */}
            <div className="lg:col-span-8 space-y-6">
              {activeIssue && (
                <>
                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 border border-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5">
                        <ShieldAlert size={14} /> {activeIssue.errorType}
                      </span>
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${getRiskBadgeClass(activeIssue.riskLevel)}`}>
                        Risk: {activeIssue.riskLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {resolvedIssues[activeIssue.issueId] ? (
                        <button
                          onClick={() => handleApplyAndRemoveIssue(activeIssue.issueId)}
                          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={15} /> Apply Patch & Clear
                        </button>
                      ) : (
                        <button
                          onClick={handleRunRepair}
                          disabled={isRepairing}
                          className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isRepairing ? (
                            <>
                              <Zap className="animate-bounce" size={15} /> Analyzing Code...
                            </>
                          ) : (
                            <>
                              <Play size={15} /> Run AI Repair
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Code Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Vulnerable Code */}
                    <div className="glass-panel rounded-3xl border border-white/10 bg-slate-900/40 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <Code2 size={16} /> Vulnerable Input Snippet
                        </span>
                      </div>
                      <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                        <pre>{activeIssue.inputSnippet}</pre>
                      </div>
                    </div>

                    {/* AI Suggested Fix */}
                    <div className="glass-panel rounded-3xl border border-white/10 bg-slate-900/40 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Sparkles size={16} /> AI Suggested Solution
                        </span>
                        {resolvedIssues[activeIssue.issueId] && (
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Patched
                          </span>
                        )}
                      </div>

                      <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto min-h-[140px] leading-relaxed flex items-center justify-center">
                        {resolvedIssues[activeIssue.issueId] ? (
                          <pre className="w-full text-emerald-300/90">{activeIssue.suggestedSolution}</pre>
                        ) : (
                          <div className="text-center text-slate-500 space-y-1">
                            <Sparkles size={20} className="mx-auto text-slate-600 animate-pulse" />
                            <p>Click "Run AI Repair" to generate secure refactored code.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        ) : (
          /* 100% HEALTH / CLEAN STATE */
          <div className="glass-panel rounded-3xl p-12 border border-emerald-500/20 bg-slate-900/40 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <ShieldCheck size={44} />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-white">All Code Clean & Secure!</h2>
              <p className="text-sm text-slate-400">
                All identified security vulnerabilities and code smells for this repository have been fixed.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-semibold">
              Repository Health Score: 100%
            </div>

            <div>
              <button
                onClick={handleRescanRepo}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <RefreshCw size={14} /> Re-trigger Deep Scan
              </button>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  FileText, 
  UserPlus, 
  Trash2, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface UserMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Developer' | 'Viewer';
  status: 'Active' | 'Pending';
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: 'Success' | 'Warning';
}

const initialUsers: UserMember[] = [
  { id: '1', name: 'Manish Bhowmik', email: 'manish@codepulse.ai', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Connor', email: 'sarah@codepulse.ai', role: 'Developer', status: 'Active' },
  { id: '3', name: 'Alex Mercer', email: 'alex@codepulse.ai', role: 'Viewer', status: 'Pending' },
];

const initialLogs: AuditLog[] = [
  { id: '1', action: 'Triggered AI Vulnerability Repair', user: 'Manish Bhowmik', timestamp: '10 mins ago', status: 'Success' },
  { id: '2', action: 'Imported Repository facebook/react', user: 'Manish Bhowmik', timestamp: '1 hour ago', status: 'Success' },
  { id: '3', action: 'Dismissed CVE-2021-23337 in dev-note', user: 'Sarah Connor', timestamp: '3 hours ago', status: 'Warning' },
  { id: '4', action: 'Updated API Key Configuration', user: 'Manish Bhowmik', timestamp: 'Yesterday', status: 'Success' },
];

export function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'health' | 'logs'>('users');
  const [users, setUsers] = useState<UserMember[]>(initialUsers);
  const [logs] = useState<AuditLog[]>(initialLogs);

  // Invite Form State
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Developer' | 'Viewer'>('Developer');

  // Handle Invite Member
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const newUser: UserMember = {
      id: Date.now().toString(),
      name: newEmail.split('@')[0],
      email: newEmail.trim(),
      role: newRole,
      status: 'Pending',
    };

    setUsers((prev) => [...prev, newUser]);
    setNewEmail('');
  };

  // Remove User
  const handleRemoveUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Filtered Users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Audit Logs
  const filteredLogs = logs.filter((l) =>
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <ShieldCheck size={18} />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Admin Portal</p>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Operational overview</h2>
          <p className="text-sm text-slate-400">
            User management, subscription controls, audit logs, and system health monitoring.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Users size={15} /> Team & Access
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'health'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Activity size={15} /> System Health
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'logs'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <FileText size={15} /> Audit Logs
          </button>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Invite Form */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/40">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <UserPlus size={16} className="text-cyan-400" /> Invite Team Member
                </h3>
                <form onSubmit={handleInvite} className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Developer">Developer</option>
                      <option value="Admin">Admin</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-2 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    Send Invitation
                  </button>
                </form>
              </div>
            </div>

            {/* User List Table */}
            <div className="lg:col-span-7 space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="glass-panel rounded-2xl p-4 border border-white/10 bg-slate-900/40 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                      {user.role}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {user.status}
                    </span>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM HEALTH */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <Server size={20} />
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> 99.98%
                </span>
              </div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">FastAPI Backend API</p>
              <p className="text-xl font-bold text-white">Operational</p>
              <p className="text-xs text-slate-500">Avg Latency: 42ms</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <Cpu size={20} />
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Active
                </span>
              </div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">AI Attack Engine</p>
              <p className="text-xl font-bold text-white">Operational</p>
              <p className="text-xs text-slate-500">Tokens Processed: 1.2M / day</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <Activity size={20} />
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Healthy
                </span>
              </div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Database Connection</p>
              <p className="text-xl font-bold text-white">Operational</p>
              <p className="text-xs text-slate-500">Connections: 12 / 100 active</p>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{log.action}</p>
                  <p className="text-xs text-slate-400">
                    By <span className="text-cyan-400">{log.user}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppShell>
  );
}
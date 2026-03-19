// --- Standard & Third-party ---
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- UI Components & Icons ---
import { 
  Key, Building2, UserCircle, CreditCard, 
  Copy, Check, Info, Trash2, Plus, 
  Shield, ShieldAlert, Mail 
} from 'lucide-react';

// --- Hooks & Logic ---
import { useWorkspace } from '@/hooks/useWorkspace';

// --- Types ---
type SettingsTab = 'profile' | 'org' | 'api' | 'billing';

interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Viewer' | 'Service Account';
  mfa: boolean;
  lastActive: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('api');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const { workspace, loading, generateKey, revokeKey } = useWorkspace();

  const [orgMembers, setOrgMembers] = useState<OrgMember[]>([
    { id: 'u_1', name: 'Vedant Kumar', email: 'vedant@phantom-labs.dev', role: 'Owner', mfa: true, lastActive: 'Online now' },
    { id: 'u_2', name: 'Sarah Chen', email: 'sarah@phantom-labs.dev', role: 'Admin', mfa: true, lastActive: '2 hrs ago' },
    { id: 'u_3', name: 'DevOps Pipeline', email: 'github-actions@phantom-labs.dev', role: 'Service Account', mfa: false, lastActive: '5 mins ago' }
  ]);

  const handleCopy = (id: string, fullKey: string) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateKey = async () => {
    const keyName = prompt("Enter a name for the new API key:");
    if (!keyName) return;
    const fullKey = await generateKey(keyName);
    if (fullKey) {
       // High-Fidelity Security Handover
       console.info("Generated new API Key substrate:", fullKey);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Workspace Settings</h1>
        <p className="text-sm text-[#8b949e]">Manage your {workspace?.name || 'Phantom Labs'} configuration, team access, and developer APIs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-1">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'profile' ? 'bg-[#161b22] text-white' : 'text-[#8b949e] hover:bg-[#161b22]/50 hover:text-[#c9d1d9]'}`}>
            <UserCircle className="w-4 h-4" /> Personal Profile
          </button>
          <button onClick={() => setActiveTab('org')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'org' ? 'bg-[#161b22] text-white' : 'text-[#8b949e] hover:bg-[#161b22]/50 hover:text-[#c9d1d9]'}`}>
            <Building2 className="w-4 h-4" /> Team Members
          </button>
          <button onClick={() => setActiveTab('api')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'api' ? 'bg-[#161b22] text-white' : 'text-[#8b949e] hover:bg-[#161b22]/50 hover:text-[#c9d1d9]'}`}>
            <Key className="w-4 h-4" /> Developer API Keys
          </button>
          <button onClick={() => setActiveTab('billing')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'billing' ? 'bg-[#161b22] text-white' : 'text-[#8b949e] hover:bg-[#161b22]/50 hover:text-[#c9d1d9]'}`}>
            <CreditCard className="w-4 h-4" /> Billing & Quotas
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* API KEYS TAB */}
            {activeTab === 'api' && (
              <motion.div key="api" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">API Keys</h2>
                    <p className="text-sm text-[#8b949e] mt-1">Use these keys to authenticate your CI/CD pipelines with the Phantom Orchestration Engine.</p>
                  </div>
                  <button onClick={handleGenerateKey} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md border border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:text-white hover:border-[#8b949e] transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Generate New Key
                  </button>
                </div>

                <div className="bg-[#0a301c]/30 border border-[#3fb950]/30 rounded-md p-4 mb-6 flex gap-3">
                  <Info className="w-5 h-5 text-[#3fb950] shrink-0 mt-0.5" />
                  <div className="text-sm text-[#c9d1d9] leading-relaxed">
                    <strong className="text-[#3fb950] font-semibold">Security Notice:</strong> Your full API keys are only shown once upon creation. If you lose a key, you must revoke it and generate a new one. All keys grant full access to the target workspace.
                  </div>
                </div>

                <div className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[#161b22]/50 border-b border-[#30363d] text-[#8b949e] uppercase tracking-wider text-[11px] font-semibold">
                        <tr>
                          <th className="px-5 py-4">Name & Key Fragment</th>
                          <th className="px-5 py-4">Created</th>
                          <th className="px-5 py-4">Last Used</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#30363d]">
                        {(workspace?.api_keys || []).map((key) => (
                          <tr key={key.id} className="hover:bg-[#161b22]/50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="font-semibold text-[#c9d1d9] mb-1">{key.name}</div>
                              <div className="text-[11px] font-mono text-[#8b949e] bg-[#010409] border border-[#30363d] px-2 py-0.5 rounded inline-block">
                                {key.key_fragment}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-[#8b949e]">{key.created}</td>
                            <td className="px-5 py-4 text-[#8b949e]">
                              <span className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${key.last_used.includes('Never') ? 'bg-[#8b949e]' : 'bg-[#3fb950]'}`} /> {key.last_used}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleCopy(key.id, key.key_fragment)}
                                  className="p-1.5 text-[#8b949e] hover:text-white rounded hover:bg-[#30363d] transition-colors" 
                                  title="Copy Key"
                                >
                                  {copiedId === key.id ? <Check className="w-4 h-4 text-[#3fb950]" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button 
                                  onClick={() => revokeKey(key.id)}
                                  className="p-1.5 text-[#8b949e] hover:text-[#ff7b72] rounded hover:bg-[#ff7b72]/10 transition-colors" 
                                  title="Revoke Key"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {(workspace?.api_keys?.length === 0 || loading) && (
                          <tr><td colSpan={4} className="px-5 py-8 text-center text-[#8b949e]">{loading ? 'Calibrating Substrate...' : 'No active API keys found.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ORG TAB */}
            {activeTab === 'org' && (
              <motion.div key="org" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Team Members</h2>
                    <p className="text-sm text-[#8b949e] mt-1">Manage who has access to this workspace and their permission levels.</p>
                  </div>
                  <button onClick={() => {
                     setOrgMembers([...orgMembers, { id: `u_${Date.now()}`, name: 'New User', email: 'pending@phantom-labs.dev', role: 'Viewer', mfa: false, lastActive: 'Invited' }]);
                  }} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md border border-primary bg-primary text-white hover:bg-primary/90 transition-colors shadow-[0_0_15px_-3px_rgba(234,88,12,0.4)]">
                    <Mail className="w-4 h-4" /> Invite Member
                  </button>
                </div>

                <div className="rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[#161b22]/50 border-b border-[#30363d] text-[#8b949e] uppercase tracking-wider text-[11px] font-semibold">
                        <tr>
                          <th className="px-5 py-4">User</th>
                          <th className="px-5 py-4">Role</th>
                          <th className="px-5 py-4 text-center">Security</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#30363d]">
                        {orgMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-[#161b22]/50 transition-colors group">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#161b22] to-[#30363d] border border-[#484f58] flex items-center justify-center text-xs font-semibold text-[#8b949e]">
                                  {member.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold text-[#c9d1d9] flex items-center gap-2">{member.name} {member.role === 'Owner' && <span className="bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/30 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Owner</span>}</div>
                                  <div className="text-xs text-[#8b949e] mt-0.5">{member.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <select className="bg-[#010409] border border-[#30363d] text-[#c9d1d9] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#8b949e]" disabled={member.role === 'Owner'}>
                                <option selected={member.role === 'Owner'}>Owner</option>
                                <option selected={member.role === 'Admin'}>Admin</option>
                                <option selected={member.role === 'Viewer'}>Viewer</option>
                                <option selected={member.role === 'Service Account'}>Service Account</option>
                              </select>
                            </td>
                            <td className="px-5 py-4 text-center">
                              {member.mfa ? (
                                <span className="inline-flex items-center justify-center text-[#3fb950]" title="MFA Enabled"><Shield className="w-4 h-4" /></span>
                              ) : (
                                <span className="inline-flex items-center justify-center text-[#ff7b72]" title="MFA Disabled"><ShieldAlert className="w-4 h-4" /></span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button 
                                onClick={() => { if(member.role !== 'Owner') setOrgMembers(orgMembers.filter(m => m.id !== member.id)) }}
                                disabled={member.role === 'Owner'}
                                className={`text-[#8b949e] hover:text-[#ff7b72] hover:bg-[#ff7b72]/10 p-1.5 rounded transition-colors ${member.role === 'Owner' ? 'opacity-30 cursor-not-allowed' : ''}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FALLBACK TABs */}
            {['profile', 'billing'].includes(activeTab) && (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center mb-6">
                  <Info className="w-6 h-6 text-[#8b949e]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise Module</h3>
                <p className="text-sm text-[#8b949e] max-w-sm leading-relaxed">This section ({activeTab}) is restricted to Enterprise plan members. Upgrading unlocks SSO, custom SLA, and advanced RBAC controls.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

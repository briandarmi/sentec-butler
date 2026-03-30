import React, { useState } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { GuestApp } from './views/Guest/GuestApp';
import { StaffDashboard } from './views/Staff/StaffDashboard';
import { AdminPortal } from './views/Admin/AdminPortal';
import { User, ShieldCheck, Settings, ChevronDown } from 'lucide-react';
import { cn } from './lib/utils';

type Role = 'guest' | 'staff' | 'admin';

export default function App() {
  const [role, setRole] = useState<Role>('guest');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <ConfigProvider>
      <div className="min-h-screen relative">
        {/* Role Switcher (Demo Only) */}
        <div className="fixed top-4 left-4 z-[100]">
          <button 
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-[#E5E5E7] rounded-full shadow-lg hover:bg-white transition-all"
          >
            <div className="w-6 h-6 bg-[#1D1D1F] rounded-full flex items-center justify-center text-white">
              {role === 'guest' && <User size={14} />}
              {role === 'staff' && <ShieldCheck size={14} />}
              {role === 'admin' && <Settings size={14} />}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1D1D1F]">
              {role} View
            </span>
            <ChevronDown size={14} className={cn("transition-transform", isSwitcherOpen && "rotate-180")} />
          </button>

          {isSwitcherOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E5E7] rounded-2xl shadow-2xl p-2 overflow-hidden">
              {[
                { id: 'guest', label: 'Guest App', icon: User },
                { id: 'staff', label: 'Staff Dashboard', icon: ShieldCheck },
                { id: 'admin', label: 'Admin Portal', icon: Settings },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id as Role);
                    setIsSwitcherOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    role === r.id ? "bg-[#F5F5F7] text-[#1D1D1F]" : "text-[#86868B] hover:bg-[#FBFBFD] hover:text-[#1D1D1F]"
                  )}
                >
                  <r.icon size={16} />
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Application Views */}
        <main className="w-full h-full">
          {role === 'guest' && <GuestApp />}
          {role === 'staff' && <StaffDashboard />}
          {role === 'admin' && <AdminPortal />}
        </main>
      </div>
    </ConfigProvider>
  );
}

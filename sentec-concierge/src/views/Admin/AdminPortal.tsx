import React, { useState } from 'react';
import { 
  Palette, Database, Wifi, Bell, Utensils, 
  Users, Languages, Rocket, ChevronRight, 
  Upload, Check, Smartphone, Settings, Menu, X
} from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { Button, Card, Badge } from '../../components/UI';
import { cn } from '../../lib/utils';

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
      active ? "bg-white shadow-sm text-[#1D1D1F]" : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-white/50"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="font-medium text-sm">{label}</span>
    </div>
    {active && <ChevronRight size={14} />}
  </button>
);

const BrandingPage = () => {
  const { config, updateConfig } = useConfig();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-8 order-2 lg:order-1">
        <section>
          <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Identity</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hotel Name</label>
              <input 
                type="text" 
                value={config.hotelName}
                onChange={(e) => updateConfig({ hotelName: e.target.value })}
                className="w-full p-3 bg-white border border-[#E5E5E7] rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hotel Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-[#E5E5E7] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                  <img src={config.logoUrl} alt="Logo" className="max-w-full max-h-full" />
                </div>
                <Button variant="secondary" size="sm"><Upload size={14} className="mr-2" /> Replace Logo</Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-2">Primary Color</label>
              <div className="flex items-center gap-3 p-2 bg-white border border-[#E5E5E7] rounded-xl">
                <div className="w-8 h-8 rounded-lg shadow-inner shrink-0" style={{ backgroundColor: config.primaryColor }} />
                <span className="text-xs font-mono uppercase truncate">{config.primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2">Accent Color</label>
              <div className="flex items-center gap-3 p-2 bg-white border border-[#E5E5E7] rounded-xl">
                <div className="w-8 h-8 rounded-lg shadow-inner shrink-0" style={{ backgroundColor: config.accentColor }} />
                <span className="text-xs font-mono uppercase truncate">{config.accentColor}</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Typography</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Font Family</label>
            <select
              value={config.fontFamily}
              onChange={(e) => updateConfig({ fontFamily: e.target.value })}
              className="w-full p-3 bg-white border border-[#E5E5E7] rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none"
            >
              <option value='-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'>System Default (iPhone Style)</option>
              <option value='"Inter", sans-serif'>Inter</option>
              <option value='"Playfair Display", serif'>Playfair Display</option>
              <option value='"Space Grotesk", sans-serif'>Space Grotesk</option>
              <option value='"JetBrains Mono", monospace'>JetBrains Mono</option>
            </select>
          </div>
        </section>

        <div className="pt-8">
          <Button className="w-full">Save Branding Changes</Button>
        </div>
      </div>

      <div className="space-y-4 order-1 lg:order-2">
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Live Preview</h3>
        <Card className="aspect-[9/16] max-w-[280px] sm:max-w-[300px] mx-auto overflow-hidden border-8 border-[#1D1D1F] rounded-[40px] relative shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1D1D1F] rounded-b-2xl z-20" />
          <div className="h-full bg-[#FBFBFD] p-4 flex flex-col" style={{ fontFamily: config.fontFamily }}>
            <header className="flex justify-between items-center mb-6 pt-4">
              <img src={config.logoUrl} alt="Logo" className="h-4 w-auto rounded" />
              <div className="w-4 h-4 bg-[#E5E5E7] rounded-full" />
            </header>
            <div className="mb-6">
              <h4 className="text-lg font-bold leading-tight">Welcome, Nikolas</h4>
              <p className="text-[10px] text-[#86868B] font-medium">Room 402 • Mar 01 - Mar 05</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-white border border-[#E5E5E7] rounded-xl p-2">
                  <div className="w-6 h-6 bg-[#F5F5F7] rounded-lg mb-2" />
                  <div className="w-10 h-1.5 bg-[#F5F5F7] rounded-full" />
                </div>
              ))}
            </div>
            <div className="mt-auto pb-4">
              <div className="w-full h-10 bg-[#1D1D1F] rounded-full" />
            </div>
          </div>
        </Card>
        <p className="text-center text-xs text-[#86868B]">Mobile Guest View Preview</p>
      </div>
    </div>
  );
};

const PMSPage = () => (
  <div className="max-w-2xl space-y-8">
    <section>
      <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Connection Settings</h3>
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">PMS Provider</label>
            <select className="w-full p-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none">
              <option>Opera Cloud</option>
              <option>Mews</option>
              <option>Cloudbeds</option>
              <option>Custom API</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hotel ID</label>
            <input type="text" placeholder="e.g. GS-LON-01" className="w-full p-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">API Key</label>
            <input type="password" value="••••••••••••••••" className="w-full p-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#E5E5E7] gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#34C759] rounded-full" />
            <span className="text-sm font-medium text-[#34C759]">Connected & Synced</span>
          </div>
          <Button variant="secondary" size="sm" className="w-full sm:w-auto">Test Connection</Button>
        </div>
      </Card>
    </section>

    <section>
      <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Sync Status</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Guest Profiles', count: '1,240', status: 'Synced' },
          { label: 'Room Inventory', count: '250', status: 'Synced' },
          { label: 'Reservations', count: '48', status: 'Syncing...' },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <p className="text-[10px] font-bold text-[#86868B] uppercase mb-1">{item.label}</p>
            <p className="text-xl font-bold mb-2">{item.count}</p>
            <Badge variant={item.status === 'Synced' ? 'success' : 'default'}>{item.status}</Badge>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

const WiFiPage = () => {
  const { config, updateConfig } = useConfig();
  return (
    <div className="max-w-2xl space-y-8">
      <section>
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Network Configuration</h3>
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SSID (Network Name)</label>
              <input 
                type="text" 
                value={config.wifiSsid}
                onChange={(e) => updateConfig({ wifiSsid: e.target.value })}
                className="w-full p-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="text" 
                value={config.wifiPassword}
                onChange={(e) => updateConfig({ wifiPassword: e.target.value })}
                className="w-full p-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-1 focus:ring-[#1D1D1F] outline-none"
              />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest mb-4">Card Preview</h3>
        <Card className="p-8 text-center max-w-sm mx-auto">
          <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi size={32} />
          </div>
          <h4 className="font-semibold mb-1">{config.wifiSsid}</h4>
          <p className="text-xs text-[#86868B] mb-6">High-speed guest network</p>
          <div className="bg-[#F5F5F7] p-3 rounded-lg flex justify-between items-center mb-4">
            <code className="font-mono text-sm">{config.wifiPassword}</code>
            <span className="text-[10px] font-bold text-[#007AFF] uppercase">Copy</span>
          </div>
          <Button className="w-full py-2 text-sm">Connect Automatically</Button>
        </Card>
      </section>
    </div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Extra Towels', category: 'Housekeeping', active: true },
    { id: 2, name: 'Extra Pillows', category: 'Housekeeping', active: true },
    { id: 3, name: 'Room Cleaning', category: 'Housekeeping', active: true },
    { id: 4, name: 'AC Maintenance', category: 'Maintenance', active: true },
    { id: 5, name: 'Wake-up Call', category: 'Concierge', active: true },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest">Active Services</h3>
        <Button size="sm">Add New Service</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <Card key={service.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg">
                <Bell size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{service.name}</h4>
                <p className="text-[10px] text-[#86868B] uppercase tracking-wider">{service.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-5 rounded-full relative transition-colors cursor-pointer",
                service.active ? "bg-[#34C759]" : "bg-[#E5E5E7]"
              )}>
                <div className={cn(
                  "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
                  service.active ? "translate-x-5.5" : "translate-x-0.5"
                )} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const OutletsPage = () => {
  const outlets = [
    { id: 1, name: 'Room Service', type: 'Dining', status: 'Open' },
    { id: 2, name: 'The Azure Grill', type: 'Dining', status: 'Open' },
    { id: 3, name: 'Serenity Spa', type: 'Wellness', status: 'Open' },
    { id: 4, name: 'Laundry & Press', type: 'Service', status: 'Open' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest">Hotel Outlets</h3>
        <Button size="sm">Add Outlet</Button>
      </div>

      <div className="space-y-3">
        {outlets.map(outlet => (
          <Card key={outlet.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg">
                <Utensils size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{outlet.name}</h4>
                <p className="text-[10px] text-[#86868B] uppercase tracking-wider">{outlet.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="success">{outlet.status}</Badge>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'pms', label: 'PMS Connection', icon: Database },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'services', label: 'Services', icon: Bell },
    { id: 'outlets', label: 'Outlets', icon: Utensils },
    { id: 'routing', label: 'Staff Routing', icon: Users },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'publish', label: 'Preview & Publish', icon: Rocket },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F7] font-sans overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#F5F5F7] p-8 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 border-r border-[#E5E5E7]",
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center text-white">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Sentec Admin</h1>
              <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-widest">Config Portal</p>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-[#86868B]">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <NavItem 
              key={tab.id} 
              icon={tab.icon} 
              label={tab.label} 
              active={activeTab === tab.id} 
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }} 
            />
          ))}
        </nav>

        <div className="pt-8 border-t border-[#E5E5E7]">
          <Card className="p-4 bg-[#1D1D1F] text-white border-none shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/10 rounded-lg"><Smartphone size={16} /></div>
              <p className="text-xs font-bold uppercase tracking-widest">Live Status</p>
            </div>
            <p className="text-sm font-medium mb-4">Your guest app is live at 4 hotels.</p>
            <Button variant="secondary" className="w-full py-2 text-xs bg-white/10 text-white hover:bg-white/20 border-none">View All Hotels</Button>
          </Card>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-[#1D1D1F]">
                <Menu size={24} />
              </button>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 capitalize">{activeTab}</h2>
                <p className="text-[#86868B] font-medium text-sm md:text-base">Configure your hotel's {activeTab} settings.</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="secondary" className="flex-1 md:flex-none">Discard</Button>
              <Button className="flex-1 md:flex-none"><Check size={18} className="mr-2" /> Publish</Button>
            </div>
          </header>

          {activeTab === 'branding' && <BrandingPage />}
          {activeTab === 'pms' && <PMSPage />}
          {activeTab === 'wifi' && <WiFiPage />}
          {activeTab === 'services' && <ServicesPage />}
          {activeTab === 'outlets' && <OutletsPage />}
          {!['branding', 'pms', 'wifi', 'services', 'outlets'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Settings, { size: 40, className: "text-[#C7C7CC]" })}
              </div>
              <h3 className="text-xl font-bold mb-2">Configuration Module</h3>
              <p className="text-[#86868B] max-w-sm">This section is currently being updated to support the latest PMS integrations.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

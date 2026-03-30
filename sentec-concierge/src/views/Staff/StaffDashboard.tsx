import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, MessageSquare, Ticket, AlertTriangle, 
  BarChart3, Settings, Search, Bell, User, ChevronRight,
  Filter, MoreHorizontal, Send, Menu, X, ArrowLeft
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/UI';
import { cn } from '../../lib/utils';
import { useConfig } from '../../context/ConfigContext';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
      active ? "bg-[#1D1D1F] text-white shadow-md" : "text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const MobileNavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-2 transition-all duration-200",
      active ? "text-[#1D1D1F]" : "text-[#86868B]"
    )}
  >
    <Icon size={24} className={cn("mb-1", active && "fill-current")} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'success';
    case 'in progress': return 'default';
    case 'open':
    case 'pending': return 'warning';
    default: return 'default';
  }
};

const Overview = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [showActiveGuests, setShowActiveGuests] = useState(false);
  const [showAvgResponse, setShowAvgResponse] = useState(false);

  const mockGuests = [
    { name: 'Nikolas K.', room: '402', checkIn: '2026-03-01', checkOut: '2026-03-05', type: 'Suite', vip: true, unfinishedRequests: 1 },
    { name: 'Sarah M.', room: '105', checkIn: '2026-03-02', checkOut: '2026-03-04', type: 'Standard', vip: false, unfinishedRequests: 2 },
    { name: 'John D.', room: '312', checkIn: '2026-03-03', checkOut: '2026-03-06', type: 'Deluxe', vip: false, unfinishedRequests: 0 },
  ];

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { id: 'active-guests', label: 'Active Guests', value: '142', change: '+12%', icon: User },
          { id: 'open-requests', label: 'Open Requests', value: '18', change: '-4', icon: Ticket },
          { id: 'avg-response', label: 'Avg. Response', value: '4.2m', change: '-30s', icon: BarChart3 },
          { id: 'satisfaction', label: 'Guest Satisfaction', value: '98%', change: '+2%', icon: Bell },
        ].map((stat, i) => (
          <Card 
            key={i} 
            className={cn("p-6", (stat.id === 'active-guests' || stat.id === 'avg-response') && "cursor-pointer hover:border-[#1D1D1F] transition-colors")}
            onClick={() => {
              if (stat.id === 'active-guests') setShowActiveGuests(true);
              if (stat.id === 'avg-response') setShowAvgResponse(true);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg">
                <stat.icon size={20} className="text-[#1D1D1F]" />
              </div>
              <Badge variant={stat.change.startsWith('+') ? 'success' : 'default'}>{stat.change}</Badge>
            </div>
            <h3 className="text-[#86868B] text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Recent Service Tickets</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('tickets')}>View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { id: '#4021', guest: 'Nikolas K.', room: '402', request: 'Extra Towels', status: 'In Progress', time: '2m ago' },
              { id: '#4019', guest: 'Sarah M.', room: '105', request: 'AC Maintenance', status: 'Pending', time: '15m ago' },
              { id: '#4018', guest: 'John D.', room: '312', request: 'Room Cleaning', status: 'Completed', time: '1h ago' },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 bg-[#FBFBFD] rounded-xl border border-[#E5E5E7] cursor-pointer hover:bg-[#F5F5F7] transition-colors" onClick={() => setActiveTab('tickets')}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E5E5E7] rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                    {ticket.room}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{ticket.request}</h4>
                    <p className="text-xs text-[#86868B]">{ticket.guest} • {ticket.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <Badge variant={getStatusBadgeVariant(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <ChevronRight size={16} className="text-[#C7C7CC] hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-[#FFF2F2] border-[#FFE5E5]">
          <div className="flex items-center gap-2 text-[#FF3B30] mb-6">
            <AlertTriangle size={20} />
            <h3 className="font-semibold text-lg">Emergency Console</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-[#FFE5E5] shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="error">High Priority</Badge>
                <span className="text-[10px] font-bold text-[#FF3B30] uppercase">Active Now</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Medical Emergency</h4>
              <p className="text-xs text-[#86868B] mb-4">Room 402 • Guest: Nikolas K.</p>
              <Button variant="danger" className="w-full py-2 text-sm">Acknowledge & Dispatch</Button>
            </div>
            <p className="text-center text-[11px] text-[#86868B]">No other active emergencies.</p>
          </div>
        </Card>
      </div>

      {/* Active Guests Modal */}
      <AnimatePresence>
        {showActiveGuests && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-[#E5E5E7] flex justify-between items-center">
                <h2 className="text-xl font-bold">In-House Guests (PMS)</h2>
                <button onClick={() => setShowActiveGuests(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E7] text-[#86868B] text-sm">
                      <th className="pb-3 font-medium">Guest Name</th>
                      <th className="pb-3 font-medium">Room</th>
                      <th className="pb-3 font-medium">Check-In</th>
                      <th className="pb-3 font-medium">Check-Out</th>
                      <th className="pb-3 font-medium">Room Type</th>
                      <th className="pb-3 font-medium">VIP</th>
                      <th className="pb-3 font-medium">Unfinished Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGuests.map((g, i) => (
                      <tr key={i} className="border-b border-[#E5E5E7] last:border-0">
                        <td className="py-4 font-medium">{g.name}</td>
                        <td className="py-4">{g.room}</td>
                        <td className="py-4 text-sm text-[#86868B]">{g.checkIn}</td>
                        <td className="py-4 text-sm text-[#86868B]">{g.checkOut}</td>
                        <td className="py-4 text-sm">{g.type}</td>
                        <td className="py-4">{g.vip ? <Badge variant="success">VIP</Badge> : '-'}</td>
                        <td className="py-4">
                          {g.unfinishedRequests > 0 ? (
                            <Badge variant="warning">{g.unfinishedRequests} Active</Badge>
                          ) : (
                            <span className="text-sm text-[#86868B]">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {/* Average Response Modal */}
        {showAvgResponse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-[#E5E5E7] flex justify-between items-center">
                <h2 className="text-xl font-bold">Average Response Report</h2>
                <button onClick={() => setShowAvgResponse(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 border-b border-[#E5E5E7] flex gap-4 bg-[#F5F5F7]">
                <input type="text" placeholder="Filter by Guest Name..." className="px-3 py-2 rounded-lg border border-[#E5E5E7] text-sm flex-1" />
                <select className="px-3 py-2 rounded-lg border border-[#E5E5E7] text-sm flex-1 bg-white">
                  <option value="">All Departments</option>
                  <option value="housekeeping">Housekeeping</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-[#E5E5E7] text-sm flex-1 bg-white">
                  <option value="">All Staff</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                </select>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {[
                    { dept: 'Housekeeping', staff: 'Jane Smith', guest: 'Nikolas K.', time: '3.5m', target: '5m' },
                    { dept: 'Maintenance', staff: 'John Doe', guest: 'Sarah M.', time: '12m', target: '15m' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-[#E5E5E7] rounded-xl">
                      <div>
                        <h4 className="font-semibold">{r.dept}</h4>
                        <p className="text-xs text-[#86868B]">Staff: {r.staff} • Guest: {r.guest}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{r.time}</p>
                        <p className="text-xs text-[#86868B]">Target: {r.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Inbox = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showGuestInfo, setShowGuestInfo] = useState(false);

  const handleChatSelect = (id: number) => {
    setSelectedChat(id);
    setShowMobileChat(true);
  };

  const handleBackToInbox = () => {
    setShowMobileChat(false);
    setTimeout(() => setSelectedChat(null), 300); // Delay clearing selection for animation
  };
  
  return (
    <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] gap-6 relative">
      {/* Chat List */}
      <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 absolute md:relative inset-0 md:inset-auto md:w-80 z-10",
        showMobileChat ? "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto" : "translate-x-0 opacity-100"
      )}>
        <div className="p-4 border-b border-[#E5E5E7]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-[#F5F5F7] rounded-lg border-none text-sm focus:ring-1 focus:ring-[#1D1D1F]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { id: 1, name: 'Nikolas K.', room: '402', lastMsg: 'Can I get some extra towels?', time: '2m', unread: true },
            { id: 2, name: 'Sarah M.', room: '105', lastMsg: 'The AC is making a noise.', time: '15m', unread: false },
            { id: 3, name: 'John D.', room: '312', lastMsg: 'Thank you for the help!', time: '1h', unread: false },
          ].map(chat => (
            <button
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={cn(
                "w-full p-4 text-left border-b border-[#F5F5F7] transition-colors",
                selectedChat === chat.id ? "bg-[#F5F5F7]" : "hover:bg-[#FBFBFD]"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm">{chat.name}</h4>
                <span className="text-[10px] text-[#86868B]">{chat.time}</span>
              </div>
              <p className="text-xs text-[#86868B] truncate mb-1">Room {chat.room} • {chat.lastMsg}</p>
              {chat.unread && <div className="w-2 h-2 bg-[#007AFF] rounded-full" />}
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Detail */}
      <Card className={cn(
        "flex-1 flex flex-col overflow-hidden absolute md:relative inset-0 md:inset-auto z-20 transition-all duration-300 bg-white",
        showMobileChat ? "translate-x-0 opacity-100" : "translate-x-full md:translate-x-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
      )}>
        <div className="p-4 border-b border-[#E5E5E7] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={handleBackToInbox} className="md:hidden p-2 -ml-2 text-[#86868B]">
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center font-bold shrink-0">NK</div>
            <div>
              <h4 className="font-semibold text-sm">Nikolas K.</h4>
              <p className="text-[10px] text-[#86868B] uppercase tracking-wider">Room 402 • Checked in Mar 01</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowGuestInfo(!showGuestInfo)} className="md:hidden">
              <User size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => setActiveTab('tickets')}>
              <Ticket size={16} className="mr-2" /> Create Ticket
            </Button>
            <Button variant="ghost" size="sm"><MoreHorizontal size={16} /></Button>
          </div>
        </div>
        <div className="flex-1 bg-[#FBFBFD] p-6 overflow-y-auto space-y-4">
          <div className="flex justify-center"><Badge>Today</Badge></div>
          <div className="flex flex-col items-start max-w-[85%] md:max-w-[70%]">
            <div className="bg-white border border-[#E5E5E7] p-3 rounded-2xl rounded-tl-none text-sm shadow-sm">
              Welcome to The Grand Sentec! How can we help you today?
            </div>
            <span className="text-[10px] text-[#86868B] mt-1">10:00 AM</span>
          </div>
          <div className="flex flex-col items-end ml-auto max-w-[85%] md:max-w-[70%]">
            <div className="bg-[#1D1D1F] text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-md">
              Can I get some extra towels?
            </div>
            <span className="text-[10px] text-[#86868B] mt-1">10:05 AM</span>
          </div>
        </div>
        <div className="p-4 border-t border-[#E5E5E7] flex gap-3 mb-16 md:mb-0">
          <input 
            type="text" 
            placeholder="Type a response..." 
            className="flex-1 bg-[#F5F5F7] border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-[#1D1D1F]"
          />
          <Button size="sm" className="px-4"><Send size={16} /></Button>
        </div>
      </Card>

      {/* Guest Info - Desktop */}
      <Card className="w-64 p-4 space-y-6 hidden md:block">
        <div>
          <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-4">Guest Info</h5>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#86868B]">Nationality</span>
              <span className="font-medium">Greek</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#86868B]">Language</span>
              <span className="font-medium">English (Primary)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#86868B]">VIP Status</span>
              <Badge variant="success">Gold Member</Badge>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-[#E5E5E7]">
          <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-4">Quick Actions</h5>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start text-xs py-2 px-3"><Ticket size={14} className="mr-2" /> Create Ticket</Button>
            <Button variant="secondary" className="w-full justify-start text-xs py-2 px-3"><User size={14} className="mr-2" /> View Profile</Button>
          </div>
        </div>
      </Card>

      {/* Guest Info - Mobile Overlay */}
      <AnimatePresence>
        {showGuestInfo && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="absolute inset-0 z-30 bg-white md:hidden p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Guest Details</h3>
              <button onClick={() => setShowGuestInfo(false)} className="p-2 bg-[#F5F5F7] rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center font-bold text-xl">NK</div>
                <div>
                  <h4 className="font-semibold text-lg">Nikolas K.</h4>
                  <p className="text-sm text-[#86868B]">Room 402</p>
                </div>
              </div>
              <div>
                <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-4">Guest Info</h5>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868B]">Nationality</span>
                    <span className="font-medium">Greek</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868B]">Language</span>
                    <span className="font-medium">English (Primary)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868B]">VIP Status</span>
                    <Badge variant="success">Gold Member</Badge>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#E5E5E7]">
                <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-4">Quick Actions</h5>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start py-3 px-4"><Ticket size={16} className="mr-3" /> Create Ticket</Button>
                  <Button variant="secondary" className="w-full justify-start py-3 px-4"><User size={16} className="mr-3" /> View Full Profile</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tickets = () => {
  const [tickets, setTickets] = useState([
    { id: 'T-1001', guest: 'Nikolas K.', room: '402', request: 'Extra Towels', status: 'Open', submitted: '10:00 AM', completed: '-', dept: 'Housekeeping', staff: '' },
    { id: 'T-1002', guest: 'Sarah M.', room: '105', request: 'AC Repair', status: 'In Progress', submitted: '09:15 AM', completed: '-', dept: 'Maintenance', staff: 'John Doe' },
    { id: 'T-1003', guest: 'John D.', room: '312', request: 'Room Service', status: 'Completed', submitted: '08:30 AM', completed: '09:00 AM', dept: 'F&B', staff: 'Jane Smith' },
  ]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [assignDept, setAssignDept] = useState('');
  const [assignStaff, setAssignStaff] = useState('');
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const departments = ['Housekeeping', 'Maintenance', 'F&B', 'Front Desk'];
  const staffMembers = {
    'Housekeeping': ['Maria G.', 'Elena R.'],
    'Maintenance': ['John Doe', 'Mike T.'],
    'F&B': ['Jane Smith', 'David L.'],
    'Front Desk': ['Sarah W.', 'Tom H.']
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staff = e.target.value;
    setAssignStaff(staff);
    if (staff) {
      const dept = Object.keys(staffMembers).find(key => staffMembers[key as keyof typeof staffMembers].includes(staff));
      if (dept) setAssignDept(dept);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map((file: File) => URL.createObjectURL(file));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  if (showNewTicket) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setShowNewTicket(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold">Create New Ticket</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Guest Name / Room</label>
              <input type="text" className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]" placeholder="e.g. Nikolas K. - 402" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ticket Type</label>
              <select className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]">
                <option>Request</option>
                <option>Complaint</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F] h-32" placeholder="Describe the issue or request..."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Assign Department</label>
              <select value={assignDept} onChange={(e) => setAssignDept(e.target.value)} className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]">
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assign Staff</label>
              <select value={assignStaff} onChange={handleStaffChange} className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]">
                <option value="">Select Staff</option>
                {(assignDept ? staffMembers[assignDept as keyof typeof staffMembers] : Object.values(staffMembers).flat()).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowNewTicket(false)}>Cancel</Button>
            <Button onClick={() => setShowNewTicket(false)}>Create Ticket</Button>
          </div>
        </div>
      </Card>
    );
  }

  if (selectedTicket) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setSelectedTicket(null); setAttachments([]); setRemarks(''); }} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold">Ticket Details: {selectedTicket.id}</h2>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium text-[#86868B]">Status:</span>
            <select 
              className="px-3 py-1.5 bg-[#F5F5F7] rounded-lg border-none text-sm font-medium focus:ring-1 focus:ring-[#1D1D1F]"
              value={selectedTicket.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                setSelectedTicket({ ...selectedTicket, status: newStatus });
                setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: newStatus } : t));
              }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <Badge variant={getStatusBadgeVariant(selectedTicket.status)}>{selectedTicket.status}</Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#F5F5F7] p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Request Information</h3>
              <p className="text-lg">{selectedTicket.request}</p>
              <div className="flex gap-4 mt-4 text-sm text-[#86868B]">
                <span>Submitted: {selectedTicket.submitted}</span>
                <span>Completed: {selectedTicket.completed}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Assignment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select 
                    value={assignDept || selectedTicket.dept} 
                    onChange={(e) => setAssignDept(e.target.value)} 
                    className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]"
                  >
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Staff</label>
                  <select 
                    value={assignStaff || selectedTicket.staff} 
                    onChange={handleStaffChange} 
                    className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F]"
                  >
                    <option value="">Select Staff</option>
                    {(assignDept ? staffMembers[assignDept as keyof typeof staffMembers] : Object.values(staffMembers).flat()).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <Button>Update Assignment</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E7]">
              <h3 className="font-semibold mb-4">Remarks & Attachments</h3>
              <textarea 
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F7] rounded-xl border-none focus:ring-1 focus:ring-[#1D1D1F] h-24 mb-4" 
                placeholder="Add remarks or notes here..."
              />
              
              <div className="flex flex-wrap gap-4 mb-4">
                {attachments.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#E5E5E7]">
                    <img src={url} alt={`Attachment ${i}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setAttachments(prev => prev.filter((_, index) => index !== i))}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#C7C7CC] rounded-xl cursor-pointer hover:border-[#86868B] hover:bg-[#F5F5F7] transition-colors">
                  <span className="text-2xl text-[#86868B]">+</span>
                  <span className="text-xs text-[#86868B] mt-1">Add Photo</span>
                  <input type="file" multiple accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              
              <Button>Save Remarks</Button>
            </div>
          </div>
          
          <div>
            <div className="bg-[#FBFBFD] p-4 rounded-xl border border-[#E5E5E7]">
              <h3 className="font-semibold mb-4">Guest Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-[#86868B] block">Name</span>
                  <span className="font-medium">{selectedTicket.guest}</span>
                </div>
                <div>
                  <span className="text-[#86868B] block">Room</span>
                  <span className="font-medium">{selectedTicket.room}</span>
                </div>
                <div>
                  <span className="text-[#86868B] block">VIP Status</span>
                  <Badge variant="secondary">Gold</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Service Tickets</h2>
        <Button onClick={() => setShowNewTicket(true)}>
          <Ticket size={16} className="mr-2" /> New Ticket
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F5F5F7] text-[#86868B]">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Guest / Room</th>
                <th className="px-6 py-4 font-medium">Request</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Submitted</th>
                <th className="px-6 py-4 font-medium">Completed</th>
                <th className="px-6 py-4 font-medium">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {tickets.map((ticket, i) => (
                <tr key={i} className="hover:bg-[#FBFBFD] transition-colors cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                  <td className="px-6 py-4 font-medium">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{ticket.guest}</div>
                    <div className="text-xs text-[#86868B]">Room {ticket.room}</div>
                  </td>
                  <td className="px-6 py-4">{ticket.request}</td>
                  <td className="px-6 py-4"><Badge variant={getStatusBadgeVariant(ticket.status)}>{ticket.status}</Badge></td>
                  <td className="px-6 py-4 text-[#86868B]">{ticket.submitted}</td>
                  <td className="px-6 py-4 text-[#86868B]">{ticket.completed}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{ticket.dept}</div>
                    <div className="text-xs text-[#86868B]">{ticket.staff || 'Unassigned'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const SettingsModule = () => {
  const [activeTab, setActiveTab] = useState('departments');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      
      <div className="flex gap-4 border-b border-[#E5E5E7]">
        {['departments', 'slas', 'ticket-types'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 font-medium text-sm capitalize transition-colors border-b-2",
              activeTab === tab ? "border-[#1D1D1F] text-[#1D1D1F]" : "border-transparent text-[#86868B] hover:text-[#1D1D1F]"
            )}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <Card className="p-6">
        {activeTab === 'departments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Departments</h3>
              <Button size="sm">Add Department</Button>
            </div>
            <div className="grid gap-4">
              {['Housekeeping', 'Maintenance', 'F&B', 'Front Desk'].map(dept => (
                <div key={dept} className="flex justify-between items-center p-4 border border-[#E5E5E7] rounded-xl">
                  <span className="font-medium">{dept}</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'slas' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Service Level Agreements (SLAs)</h3>
              <Button size="sm">Add SLA</Button>
            </div>
            <div className="grid gap-4">
              {[
                { type: 'Urgent Request', time: '5 mins' },
                { type: 'Standard Request', time: '15 mins' },
                { type: 'Maintenance Issue', time: '30 mins' },
              ].map(sla => (
                <div key={sla.type} className="flex justify-between items-center p-4 border border-[#E5E5E7] rounded-xl">
                  <div>
                    <span className="font-medium block">{sla.type}</span>
                    <span className="text-sm text-[#86868B]">Target: {sla.time}</span>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ticket-types' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Ticket Types</h3>
              <Button size="sm">Add Type</Button>
            </div>
            <div className="grid gap-4">
              {['Request', 'Complaint', 'Maintenance', 'Inquiry'].map(type => (
                <div key={type} className="flex justify-between items-center p-4 border border-[#E5E5E7] rounded-xl">
                  <span className="font-medium">{type}</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Access Management</h2>
        <Button>Add User</Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F5F5F7] text-[#86868B]">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {[
                { name: 'Nikolas K.', email: 'nikolas.k@sentineltech.com', role: 'Admin', dept: 'All' },
                { name: 'Jane Smith', email: 'jane.s@sentineltech.com', role: 'Dept Head', dept: 'Housekeeping' },
                { name: 'John Doe', email: 'john.d@sentineltech.com', role: 'Dept Agent', dept: 'Maintenance' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-[#FBFBFD] transition-colors">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-[#86868B]">{user.email}</td>
                  <td className="px-6 py-4"><Badge variant="secondary">{user.role}</Badge></td>
                  <td className="px-6 py-4">{user.dept}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const Analytics = () => {
  const [filter, setFilter] = useState('department');

  const slaData = [
    { id: 1, type: 'Housekeeping', total: 145, met: 130, missed: 15, avgTime: '12m', target: '15m' },
    { id: 2, type: 'Maintenance', total: 84, met: 70, missed: 14, avgTime: '25m', target: '30m' },
    { id: 3, type: 'F&B', total: 210, met: 195, missed: 15, avgTime: '18m', target: '20m' },
    { id: 4, type: 'Front Desk', total: 320, met: 310, missed: 10, avgTime: '3m', target: '5m' },
  ];

  const staffData = [
    { id: 1, type: 'John Doe', total: 45, met: 40, missed: 5, avgTime: '14m', target: '15m' },
    { id: 2, type: 'Jane Smith', total: 52, met: 50, missed: 2, avgTime: '11m', target: '15m' },
    { id: 3, type: 'Mike T.', total: 38, met: 30, missed: 8, avgTime: '28m', target: '30m' },
  ];

  const guestData = [
    { id: 1, type: 'Nikolas K.', total: 5, met: 5, missed: 0, avgTime: '8m', target: '15m' },
    { id: 2, type: 'Sarah M.', total: 3, met: 2, missed: 1, avgTime: '18m', target: '15m' },
  ];

  const currentData = filter === 'department' ? slaData : filter === 'staff' ? staffData : guestData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics & SLAs</h2>
        <div className="flex bg-[#F5F5F7] rounded-lg p-1">
          {['department', 'staff', 'guest'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors",
                filter === f ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#86868B] hover:text-[#1D1D1F]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-[#86868B] text-sm font-medium mb-1">Total Requests</h3>
          <p className="text-3xl font-semibold">759</p>
          <div className="mt-4 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
            <div className="h-full bg-[#1D1D1F] w-[85%]" />
          </div>
          <p className="text-xs text-[#86868B] mt-2">85% SLA Met Rate</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-[#86868B] text-sm font-medium mb-1">Avg. Resolution Time</h3>
          <p className="text-3xl font-semibold">14.2m</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Badge variant="success">-1.5m</Badge>
            <span className="text-[#86868B]">vs last week</span>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-[#86868B] text-sm font-medium mb-1">Missed SLAs</h3>
          <p className="text-3xl font-semibold text-[#FF3B30]">54</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Badge variant="error">+12</Badge>
            <span className="text-[#86868B]">vs last week</span>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-[#E5E5E7] flex justify-between items-center">
          <h3 className="font-semibold text-lg capitalize">{filter} Performance</h3>
          <Button variant="ghost" size="sm"><Filter size={16} className="mr-2" /> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F5F5F7] text-[#86868B]">
              <tr>
                <th className="px-6 py-4 font-medium capitalize">{filter}</th>
                <th className="px-6 py-4 font-medium">Total Requests</th>
                <th className="px-6 py-4 font-medium">SLA Met</th>
                <th className="px-6 py-4 font-medium">SLA Missed</th>
                <th className="px-6 py-4 font-medium">Avg. Time</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {currentData.map((row) => {
                const metRate = Math.round((row.met / row.total) * 100);
                return (
                  <tr key={row.id} className="hover:bg-[#FBFBFD] transition-colors">
                    <td className="px-6 py-4 font-medium">{row.type}</td>
                    <td className="px-6 py-4">{row.total}</td>
                    <td className="px-6 py-4 text-[#248A3D]">{row.met}</td>
                    <td className="px-6 py-4 text-[#FF3B30]">{row.missed}</td>
                    <td className="px-6 py-4 font-medium">{row.avgTime}</td>
                    <td className="px-6 py-4 text-[#86868B]">{row.target}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden w-24">
                          <div 
                            className={cn("h-full rounded-full", metRate >= 90 ? "bg-[#248A3D]" : metRate >= 75 ? "bg-[#B25E09]" : "bg-[#FF3B30]")} 
                            style={{ width: `${metRate}%` }} 
                          />
                        </div>
                        <span className="text-xs font-medium w-8">{metRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { config } = useConfig();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'nikolas.k@sentineltech.com' && password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen bg-[#FBFBFD] items-center justify-center p-4" style={{ fontFamily: config.fontFamily }}>
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#1D1D1F] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">S</div>
            <h1 className="text-2xl font-bold tracking-tight">Staff Portal</h1>
            <p className="text-[#86868B] text-sm mt-1">Sign in to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl focus:ring-2 focus:ring-[#1D1D1F] outline-none"
                placeholder="nikolas.k@sentineltech.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl focus:ring-2 focus:ring-[#1D1D1F] outline-none"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-sm text-[#FF3B30]">{loginError}</p>}
            <Button type="submit" className="w-full py-3 mt-4">Sign In</Button>
          </form>
        </Card>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="flex h-screen bg-[#FBFBFD] overflow-hidden" style={{ fontFamily: config.fontFamily }}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 border-r border-[#E5E5E7] p-6 flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#1D1D1F] rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
          <h1 className="font-bold text-lg tracking-tight">Sentec Staff</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={MessageSquare} label="Inbox" active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} />
          <SidebarItem icon={Ticket} label="Tickets" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
          <SidebarItem icon={AlertTriangle} label="Emergency" active={activeTab === 'emergency'} onClick={() => setActiveTab('emergency')} />
          <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <div className="pt-6 border-t border-[#E5E5E7] space-y-2">
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[10px] font-bold">NK</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Nikolas K.</p>
              <p className="text-[10px] text-[#86868B]">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 md:h-20 border-b border-[#E5E5E7] px-4 md:px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3 md:hidden">
             <div className="w-8 h-8 bg-[#1D1D1F] rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
             <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
          </div>
          <h2 className="text-xl font-semibold capitalize hidden md:block">{activeTab}</h2>
          
          <div className="flex items-center gap-3 md:gap-5">
            <span className="text-sm font-medium text-[#86868B]">{currentDate}</span>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" size={18} />
              <input 
                type="text" 
                placeholder="Search guests, rooms..." 
                className="pl-10 pr-4 py-2 bg-[#F5F5F7] rounded-full border-none text-sm w-64 focus:ring-1 focus:ring-[#1D1D1F]"
              />
            </div>
            <button className="md:hidden p-2 text-[#86868B]"><Search size={20} /></button>
            <button className="p-2 text-[#86868B] hover:text-[#1D1D1F] relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF3B30] rounded-full border-2 border-white" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#E5E5E7] transition-colors"
              >
                NK
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E5E5E7] rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b border-[#E5E5E7]">
                    <p className="font-semibold text-sm">Nikolas K.</p>
                    <p className="text-xs text-[#86868B]">nikolas.k@sentineltech.com</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { setShowUserMenu(false); setActiveTab('user-management'); }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F5F7] rounded-lg transition-colors"
                    >
                      User Access Management
                    </button>
                    <button 
                      onClick={() => { setShowUserMenu(false); setIsLoggedIn(false); setUsername(''); setPassword(''); }}
                      className="w-full text-left px-3 py-2 text-sm text-[#FF3B30] hover:bg-[#FFF2F2] rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
          {activeTab === 'inbox' && <Inbox setActiveTab={setActiveTab} />}
          {activeTab === 'tickets' && <Tickets />}
          {activeTab === 'settings' && <SettingsModule />}
          {activeTab === 'user-management' && <UserManagement />}
          {activeTab === 'analytics' && <Analytics />}
          {['emergency'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-4">
                <LayoutDashboard size={32} className="text-[#C7C7CC]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Module Under Construction</h3>
              <p className="text-[#86868B] max-w-xs">We're currently refining this module to meet Apple's design standards.</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E7] px-6 py-2 flex justify-between items-center z-50 pb-4">
        <MobileNavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <MobileNavItem icon={MessageSquare} label="Inbox" active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} />
        <MobileNavItem icon={Ticket} label="Tickets" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
        <MobileNavItem icon={AlertTriangle} label="Alerts" active={activeTab === 'emergency'} onClick={() => setActiveTab('emergency')} />
        <MobileNavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </nav>
    </div>
  );
};


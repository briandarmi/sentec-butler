import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Utensils, MessageCircle, Info, Wifi, Star, AlertCircle, 
  ChevronRight, Globe, X, Send, Image as ImageIcon, Phone, Shield, HeartPulse,
  ArrowLeft, Coffee, Sparkles, Shirt, Car, MapPin, Building, PhoneCall, Dumbbell, Waves, Check
} from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { Button, Card, Badge } from '../../components/UI';
import { cn } from '../../lib/utils';

const translations = {
  en: {
    welcome: "Welcome",
    room: "Room",
    loginTitle: "Access Your Stay",
    loginDesc: "Enter your email or phone number to unlock all guest services.",
    emailPhone: "Email or Phone Number",
    loginBtn: "Access Services",
    skipBtn: "Continue as Guest",
    moreServices: "Click for more service features",
    conciergeMsg: "I'm your personal concierge, and I'm here to make sure you have a wonderful stay. We are delighted to have you with us. Please explore the app to discover our amenities and services tailored just for you.",
    roomService: "Room Services",
    restaurants: "Restaurants",
    spa: "Spa",
    laundry: "Laundry",
    transport: "Transportation",
    chat: "Chat",
    info: "Hotel Info",
    wifi: "Connect WiFi",
    review: "Review Stay",
    emergency: "Emergency",
    back: "Back",
    serviceRequest: "Service Request"
  },
  id: {
    welcome: "Selamat Datang",
    room: "Kamar",
    loginTitle: "Akses Layanan",
    loginDesc: "Masukkan email atau nomor telepon Anda untuk membuka semua layanan tamu.",
    emailPhone: "Email atau Nomor Telepon",
    loginBtn: "Akses Layanan",
    skipBtn: "Lanjutkan sebagai Tamu",
    moreServices: "Klik untuk fitur layanan lainnya",
    conciergeMsg: "Saya adalah pramutamu pribadi Anda, dan saya di sini untuk memastikan Anda memiliki pengalaman menginap yang luar biasa. Kami sangat senang Anda bersama kami. Silakan jelajahi aplikasi untuk menemukan fasilitas dan layanan kami yang disesuaikan khusus untuk Anda.",
    roomService: "Layanan Kamar",
    restaurants: "Restoran",
    spa: "Spa",
    laundry: "Binatu",
    transport: "Transportasi",
    chat: "Obrolan",
    info: "Info Hotel",
    wifi: "Koneksi WiFi",
    review: "Ulasan",
    emergency: "Darurat",
    back: "Kembali",
    serviceRequest: "Permintaan Layanan"
  },
  zh: {
    welcome: "欢迎",
    room: "房间",
    loginTitle: "访问您的住宿",
    loginDesc: "输入您的电子邮件或电话号码以解锁所有客房服务。",
    emailPhone: "电子邮件或电话号码",
    loginBtn: "访问服务",
    skipBtn: "作为访客继续",
    moreServices: "点击获取更多服务功能",
    conciergeMsg: "我是您的私人礼宾，我在这里确保您有一个美好的住宿体验。我们很高兴您的到来。请探索应用程序以发现专为您量身定制的设施和服务。",
    roomService: "客房服务",
    restaurants: "餐厅",
    spa: "水疗",
    laundry: "洗衣",
    transport: "交通",
    chat: "聊天",
    info: "酒店信息",
    wifi: "连接 WiFi",
    review: "评价住宿",
    emergency: "紧急情况",
    back: "返回",
    serviceRequest: "服务请求"
  }
};

const LoginScreen = ({ onLogin, onSkip, t }: any) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (input.toLowerCase() === 'katuuk.nikolas@gmail.com') {
      onLogin();
    } else {
      setError('Reservation not found. Please try katuuk.nikolas@gmail.com');
    }
  };

  return (
    <div className="px-6 py-12 flex flex-col h-screen justify-center bg-[#FBFBFD]">
      <h1 className="text-3xl font-bold mb-2">{t.loginTitle}</h1>
      <p className="text-[#86868B] mb-8">{t.loginDesc}</p>
      
      <div className="space-y-4 mb-8">
        <input 
          type="text" 
          placeholder={t.emailPhone}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full p-4 bg-white border border-[#E5E5E7] rounded-2xl focus:ring-2 focus:ring-[#1D1D1F] outline-none transition-all"
        />
        {error && <p className="text-sm text-[#FF3B30]">{error}</p>}
        <Button className="w-full py-4 text-base" onClick={handleLogin}>{t.loginBtn}</Button>
      </div>
      
      <div className="mt-auto pb-8">
        <Button variant="ghost" className="w-full py-4" onClick={onSkip}>{t.skipBtn}</Button>
      </div>
    </div>
  );
};

const Dashboard = ({ onNavigate, isLoggedIn, onRequireLogin, t, config, updateConfig }: any) => {
  const guestName = isLoggedIn ? "Nikolas" : "Guest";
  const roomNumber = isLoggedIn ? "402" : "---";
  const stayDates = isLoggedIn ? "Mar 01 - Mar 05" : "---";

  const allTiles = [
    { id: 'service', icon: Bell, label: t.serviceRequest, requiresAuth: true },
    { id: 'room-service', icon: Utensils, label: t.roomService, requiresAuth: true },
    { id: 'chat', icon: MessageCircle, label: t.chat, requiresAuth: true },
    { id: 'info', icon: Info, label: t.info, requiresAuth: false },
    { id: 'wifi', icon: Wifi, label: t.wifi, requiresAuth: false },
    { id: 'review', icon: Star, label: t.review, requiresAuth: true },
    { id: 'emergency', icon: AlertCircle, label: t.emergency, requiresAuth: true, color: '#FFF2F2', textColor: '#FF3B30' },
  ];

  const visibleTiles = allTiles.filter(tile => isLoggedIn || !tile.requiresAuth);

  return (
    <div className="px-6 py-8 pb-32">
      {!isLoggedIn && (
        <button 
          onClick={onRequireLogin}
          className="w-full mb-6 bg-[#1D1D1F] text-white py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
        >
          <span>{t.moreServices}</span>
          <ChevronRight size={16} />
        </button>
      )}

      <header className="flex justify-between items-center mb-8">
        <img src={config.logoUrl} alt="Logo" className="h-8 w-auto rounded-lg" />
        <div className="relative group">
          <button className="flex items-center gap-1 text-sm font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">
            <Globe size={14} />
            {config.language.toUpperCase()}
          </button>
          <div className="absolute right-0 top-full mt-2 bg-white border border-[#E5E5E7] rounded-xl shadow-lg overflow-hidden hidden group-hover:block z-50">
            {['en', 'id', 'zh'].map(lang => (
              <button 
                key={lang}
                onClick={() => updateConfig({ language: lang as any })}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F7] uppercase"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">{t.welcome}, {guestName}</h1>
        <p className="text-[#1D1D1F] font-semibold mb-4">{t.room} {roomNumber} • {stayDates}</p>
        <div className="bg-[#F5F5F7] p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#1D1D1F]" />
          <p className="text-[#86868B] text-sm leading-relaxed">
            <span className="text-[#1D1D1F] block mb-1">{t.conciergeMsg.split('.')[0]}.</span>
            {t.conciergeMsg.substring(t.conciergeMsg.indexOf('.') + 1)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {visibleTiles.map((tile) => (
          <motion.button
            key={tile.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate(tile.id)}
            className={cn(
              "rounded-2xl text-left transition-colors",
              tile.id === 'emergency' 
                ? "col-span-2 flex flex-row items-center p-4 bg-[#FFF2F2]" 
                : "flex flex-col items-start p-5 bg-white border border-[#E5E5E7] shadow-sm"
            )}
          >
            <div className={cn(
              "rounded-xl",
              tile.id === 'emergency' ? "p-2 bg-white mr-4" : "p-3 bg-[#F5F5F7] mb-4"
            )}>
              <tile.icon size={24} color={tile.textColor || config.primaryColor} />
            </div>
            <span className={cn("font-semibold text-sm flex-1", tile.textColor ? "text-[#FF3B30]" : "text-[#1D1D1F]")}>
              {tile.label}
            </span>
            {tile.id === 'emergency' && (
              <ChevronRight size={20} className="text-[#FF3B30]/50" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const PlaceholderScreen = ({ title, onBack, onNavigate, t }: any) => (
  <div className="px-6 py-8 h-screen bg-[#FBFBFD]">
    <div className="flex items-center justify-between mb-8">
      <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">{t.back}</span>
      </button>
      <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
        <span className="font-medium">Home</span>
      </button>
    </div>
    <div className="py-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-[#86868B] mb-8">This module is currently being prepared for your stay.</p>
      <Button variant="secondary" onClick={onBack}>{t.back}</Button>
    </div>
  </div>
);

const RoomServiceMenu = ({ onNavigate, onBack, t }: any) => {
  const menus = [
    { id: 'restaurants', icon: Coffee, label: t.restaurants },
    { id: 'spa', icon: Sparkles, label: t.spa },
    { id: 'laundry', icon: Shirt, label: t.laundry },
    { id: 'transport', icon: Car, label: t.transport },
  ];

  return (
    <div className="px-6 py-8 pb-24 h-screen bg-[#FBFBFD] overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t.back}</span>
        </button>
        <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <span className="font-medium">Home</span>
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-8">{t.roomService}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {menus.map((menu) => (
          <motion.button
            key={menu.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate(menu.id)}
            className="flex flex-col items-start p-5 rounded-2xl text-left bg-white border border-[#E5E5E7] shadow-sm transition-colors"
          >
            <div className="p-3 rounded-xl mb-4 bg-[#F5F5F7]">
              <menu.icon size={24} className="text-[#1D1D1F]" />
            </div>
            <span className="font-semibold text-sm text-[#1D1D1F]">
              {menu.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ServiceRequest = ({ onBack, onNavigate, t }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'housekeeping', name: 'Housekeeping', icon: Sparkles, items: ['Extra Towels', 'Room Cleaning', 'Toiletries'] },
    { id: 'maintenance', name: 'Maintenance', icon: AlertCircle, items: ['AC Issue', 'Plumbing', 'Light Bulb'] },
    { id: 'concierge', name: 'Concierge', icon: Bell, items: ['Wake-up Call', 'Luggage Assistance', 'Valet'] },
  ];

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    setQuantity(1);
    setRemarks('');
    setTime('');
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedItem(null);
      setSelectedCategory(null);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="px-6 py-8 h-screen bg-[#FBFBFD] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#34C759] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
        <p className="text-[#86868B] mb-8">We will attend to your request shortly.</p>
        <Button onClick={onBack} variant="secondary">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 pb-24 h-screen bg-[#FBFBFD] overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t.back}</span>
        </button>
        <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <span className="font-medium">Home</span>
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-8">{t.serviceRequest}</h2>
      
      <div className="space-y-4">
        {categories.map(cat => (
          <Card key={cat.id} className="p-4 cursor-pointer hover:border-[#1D1D1F] transition-colors" onClick={() => setSelectedCategory(cat.id)}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F5F5F7] rounded-xl"><cat.icon size={24} /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-sm text-[#86868B]">{cat.items.join(', ')}</p>
              </div>
              <ChevronRight size={20} className="text-[#C7C7CC]" />
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && !selectedItem && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Select Request</h3>
              <button onClick={() => setSelectedCategory(null)} className="p-2 bg-[#F5F5F7] rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-3 mb-8">
              {categories.find(c => c.id === selectedCategory)?.items.map(item => (
                <Button key={item} variant="secondary" className="w-full justify-start py-4 text-base" onClick={() => handleItemSelect(item)}>{item}</Button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedItem && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{selectedItem}</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 bg-[#F5F5F7] rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#86868B] mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-xl font-medium">-</button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-xl font-medium">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#86868B] mb-2">Preferred Time</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {['Now', 'In 1 Hour', 'In 2 Hours'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={cn(
                        "py-2 px-1 text-xs font-medium rounded-lg border transition-colors",
                        time === t 
                          ? "bg-[#1D1D1F] text-white border-[#1D1D1F]" 
                          : "bg-white border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <select 
                  value={['Now', 'In 1 Hour', 'In 2 Hours'].includes(time) ? '' : time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl focus:ring-2 focus:ring-[#1D1D1F] outline-none appearance-none"
                >
                  <option value="" disabled>Or select a specific time...</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    <React.Fragment key={hour}>
                      <option value={`${hour}:00 PM`}>{hour}:00 PM</option>
                      <option value={`${hour}:30 PM`}>{hour}:30 PM</option>
                    </React.Fragment>
                  ))}
                  {Array.from({ length: 11 }, (_, i) => i + 1).map(hour => (
                    <React.Fragment key={hour + 12}>
                      <option value={`${hour}:00 AM`}>{hour}:00 AM</option>
                      <option value={`${hour}:30 AM`}>{hour}:30 AM</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#86868B] mb-2">Remarks (Optional)</label>
                <textarea 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Any special instructions?"
                  className="w-full p-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl h-24 resize-none focus:ring-2 focus:ring-[#1D1D1F] outline-none"
                />
              </div>
            </div>

            <Button className="w-full py-4 text-base" onClick={handleSubmit}>Submit Request</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Restaurants = ({ onBack, onNavigate, t }: any) => {
  const outlets = [
    { id: 'ginger-lily', name: 'Ginger Lily', desc: 'Exquisite botanical-inspired dining', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800', hours: '11:00 - 23:00', link: 'https://apse1.menu.pos.sentec.io/menulist?i=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoIjoxMDQsIm8iOjMxMywidCI6MCwiciI6MH0.UcHQgK8creyTcIkDbIvCDo1nj3akpV8fpWGM03_8Fmc' },
    { id: 'restaurant', name: 'The Azure Grill', desc: 'Mediterranean fusion by the coast', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', hours: '07:00 - 23:00' },
  ];

  return (
    <div className="px-6 py-8 pb-24 h-screen bg-[#FBFBFD] overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t.back}</span>
        </button>
        <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <span className="font-medium">Home</span>
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-8">{t.restaurants}</h2>

      <div className="space-y-6">
        {outlets.map(outlet => (
          <Card key={outlet.id} className="overflow-hidden group">
            <div className="h-40 overflow-hidden">
              <img 
                src={outlet.img} 
                alt={outlet.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{outlet.name}</h3>
                <Badge variant="default">{outlet.hours}</Badge>
              </div>
              <p className="text-sm text-[#86868B] mb-4">{outlet.desc}</p>
              {outlet.link ? (
                <a href={outlet.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="secondary" className="w-full py-2.5 text-sm">Order Now</Button>
                </a>
              ) : (
                <Button variant="secondary" className="w-full py-2.5 text-sm">Open Menu</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HotelInfo = ({ onBack, onNavigate, t }: any) => (
  <div className="px-6 py-8 pb-24 h-screen bg-[#FBFBFD] overflow-y-auto">
    <div className="flex items-center justify-between mb-8">
      <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">{t.back}</span>
      </button>
      <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
        <span className="font-medium">Home</span>
      </button>
    </div>
    <h2 className="text-2xl font-semibold mb-8">{t.info}</h2>
    
    <div className="space-y-10">
      {/* Facilities */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Facilities</h3>
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800" alt="Pool" className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4">
              <h4 className="font-semibold flex items-center gap-2"><Waves size={18}/> Infinity Pool</h4>
              <p className="text-sm text-[#86868B] mt-1">Rooftop pool with panoramic ocean views. Open 06:00 - 22:00.</p>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" alt="Gym" className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4">
              <h4 className="font-semibold flex items-center gap-2"><Dumbbell size={18}/> Fitness Center</h4>
              <p className="text-sm text-[#86868B] mt-1">State-of-the-art equipment and personal trainers. 24/7 access.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Nearby */}
      <section>
        <h3 className="text-lg font-semibold mb-4">What's Nearby</h3>
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-[#E5E5E7]">
            <div className="p-4 flex items-start gap-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg"><MapPin size={20} className="text-[#1D1D1F]" /></div>
              <div>
                <h4 className="font-semibold text-sm">Attractions</h4>
                <p className="text-xs text-[#86868B] mt-1">Coastal Walk (0.5km)<br/>Grand Museum (2.1km)</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg"><Building size={20} className="text-[#1D1D1F]" /></div>
              <div>
                <h4 className="font-semibold text-sm">Embassies</h4>
                <p className="text-xs text-[#86868B] mt-1">US Embassy (3.0km)<br/>UK Embassy (3.2km)</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-4">
              <div className="p-2 bg-[#F5F5F7] rounded-lg"><HeartPulse size={20} className="text-[#1D1D1F]" /></div>
              <div>
                <h4 className="font-semibold text-sm">Medical & Pharmacy</h4>
                <p className="text-xs text-[#86868B] mt-1">City General Hospital (1.5km)<br/>Care Pharmacy (0.2km)</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Emergency Contacts */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
        <Card className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Police</span>
            <span className="text-sm text-[#FF3B30] font-mono">911</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Ambulance</span>
            <span className="text-sm text-[#FF3B30] font-mono">912</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Hotel Security</span>
            <span className="text-sm text-[#FF3B30] font-mono">Ext. 0</span>
          </div>
        </Card>
      </section>
    </div>
  </div>
);

const WiFiScreen = ({ onBack, onNavigate, t }: any) => {
  const { config } = useConfig();
  return (
    <div className="px-6 py-8 h-screen bg-[#FBFBFD] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t.back}</span>
        </button>
        <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <span className="font-medium">Home</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-8">
          <Wifi size={40} className="text-[#1D1D1F]" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{config.wifiSsid}</h2>
        <p className="text-[#86868B] mb-8 text-center">Connect to our high-speed guest network.</p>
        
        <Card className="w-full max-w-sm p-6 mb-8">
          <p className="text-sm font-medium text-[#86868B] mb-2 uppercase tracking-widest text-center">Password</p>
          <div className="text-2xl font-mono text-center font-bold tracking-wider">{config.wifiPassword}</div>
        </Card>
        
        <Button className="w-full max-w-sm py-4 text-base">Copy Password</Button>
      </div>
    </div>
  );
};

const ChatScreen = ({ onBack, onNavigate, t }: any) => (
  <div className="flex flex-col h-screen bg-[#FBFBFD]">
    <header className="px-6 py-4 flex items-center justify-between border-b border-[#E5E5E7] bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-semibold">Front Desk</h2>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#34C759] rounded-full" />
            <span className="text-[11px] text-[#86868B] font-medium uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>
      <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
        <span className="font-medium text-sm">Home</span>
      </button>
    </header>
    
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex justify-center"><Badge>Today</Badge></div>
      <div className="flex flex-col items-start max-w-[80%]">
        <div className="bg-white border border-[#E5E5E7] p-4 rounded-2xl rounded-tl-none shadow-sm">
          Welcome to {useConfig().config.hotelName}! How can we assist you today?
        </div>
        <span className="text-xs text-[#86868B] mt-2 ml-1">10:00 AM</span>
      </div>
    </div>

    <div className="p-4 bg-white border-t border-[#E5E5E7] pb-safe">
      <div className="flex items-center gap-3 bg-[#F5F5F7] p-2 rounded-full">
        <button className="p-2 text-[#86868B]"><ImageIcon size={20} /></button>
        <input type="text" placeholder="Message..." className="flex-1 bg-transparent border-none focus:ring-0 outline-none" />
        <button className="p-2 bg-[#1D1D1F] text-white rounded-full"><Send size={16} /></button>
      </div>
    </div>
  </div>
);

const ReviewScreen = ({ onBack, onNavigate, t }: any) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="px-6 py-8 h-screen bg-[#FBFBFD] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#34C759] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-[#86868B] mb-8">Your feedback helps us improve our services.</p>
        <Button onClick={() => onNavigate('dashboard')} variant="secondary">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 h-screen bg-[#FBFBFD] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t.back}</span>
        </button>
        <button onClick={() => onNavigate('dashboard')} className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
          <span className="font-medium">Home</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <h2 className="text-2xl font-semibold mb-2 text-center">How is your stay?</h2>
        <p className="text-[#86868B] mb-10 text-center">We'd love to hear about your experience.</p>
        
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              onClick={() => setRating(star)}
              className="p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <Star size={40} className={cn(star <= rating ? "fill-[#FFCC00] text-[#FFCC00]" : "text-[#E5E5E7]")} />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            {rating <= 3 ? (
              <Card className="p-6 text-center mb-6 border-[#FFE5E5] bg-[#FFF2F2]">
                <p className="font-medium text-[#FF3B30] mb-4">We're sorry to hear that. Would you like to speak with a manager?</p>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1">No, thanks</Button>
                  <Button variant="danger" className="flex-1">Chat Now</Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                <textarea 
                  placeholder="Tell us what you loved..." 
                  className="w-full p-4 bg-white border border-[#E5E5E7] rounded-2xl h-32 resize-none focus:ring-2 focus:ring-[#1D1D1F] outline-none"
                />
                <Button className="w-full py-4 text-base" onClick={() => setSubmitted(true)}>Submit Review</Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const EmergencyScreen = ({ onBack, onNavigate, t }: any) => (
  <div className="py-8 h-screen bg-[#FFF2F2] flex flex-col">
    <div className="px-6 flex items-center justify-between mb-8">
      <button onClick={onBack} className="flex items-center gap-2 text-[#FF3B30] hover:text-[#1D1D1F] transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">{t.back}</span>
      </button>
      <button onClick={() => onNavigate('dashboard')} className="text-[#FF3B30] hover:text-[#1D1D1F] transition-colors">
        <span className="font-medium">Home</span>
      </button>
    </div>
    <h2 className="px-6 text-3xl font-bold text-[#FF3B30] mb-2">{t.emergency}</h2>
    <p className="px-6 text-[#FF3B30]/80 mb-10 font-medium">Tap a button below to alert staff immediately.</p>
    
    <div className="flex-1">
      <div className="bg-white border-y border-[#FFE5E5]">
        {[
          { id: 'medical', label: 'Medical Emergency', icon: HeartPulse },
          { id: 'security', label: 'Security Issue', icon: Shield },
          { id: 'assistance', label: 'Urgent Assistance', icon: PhoneCall },
        ].map((alert, index) => (
          <button key={alert.id} className={`w-full p-4 flex items-center justify-between active:bg-[#FFF2F2] transition-colors ${index !== 0 ? 'border-t border-[#FFE5E5]' : ''}`}>
            <div className="flex items-center gap-4 px-2">
              <div className="p-2 bg-[#FFF2F2] rounded-full text-[#FF3B30]"><alert.icon size={24} /></div>
              <span className="font-bold text-base">{alert.label}</span>
            </div>
            <ChevronRight size={20} className="text-[#FF3B30]/50 mr-2" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export const GuestApp = () => {
  const { config, updateConfig } = useConfig();
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const t = translations[config.language as keyof typeof translations] || translations.en;

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleSkip = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] relative max-w-md mx-auto shadow-2xl overflow-hidden"
      style={{ fontFamily: config.fontFamily }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {currentView === 'login' && <LoginScreen onLogin={handleLogin} onSkip={handleSkip} t={t} />}
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} isLoggedIn={isLoggedIn} onRequireLogin={() => setCurrentView('login')} t={t} config={config} updateConfig={updateConfig} />}
          {currentView === 'service' && <ServiceRequest onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'room-service' && <RoomServiceMenu onNavigate={setCurrentView} onBack={() => setCurrentView('dashboard')} t={t} />}
          {currentView === 'restaurants' && <Restaurants onBack={() => setCurrentView('room-service')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'spa' && <PlaceholderScreen title={t.spa} onBack={() => setCurrentView('room-service')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'laundry' && <PlaceholderScreen title={t.laundry} onBack={() => setCurrentView('room-service')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'transport' && <PlaceholderScreen title={t.transport} onBack={() => setCurrentView('room-service')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'info' && <HotelInfo onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'wifi' && <WiFiScreen onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'chat' && <ChatScreen onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'review' && <ReviewScreen onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
          {currentView === 'emergency' && <EmergencyScreen onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} t={t} />}
        </motion.div>
      </AnimatePresence>

      {isLoggedIn && currentView === 'dashboard' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('chat')}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center shadow-xl z-50"
          style={{ backgroundColor: config.primaryColor }}
        >
          <MessageCircle size={24} />
          {config.unreadChat > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF3B30] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">{config.unreadChat}</span>
            </div>
          )}
        </motion.button>
      )}
    </div>
  );
};

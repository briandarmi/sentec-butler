import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HotelConfig {
  hotelName: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  wifiSsid: string;
  wifiPassword: string;
  language: 'en' | 'id' | 'zh';
  unreadChat: number;
  fontFamily: string;
}

interface ConfigContextType {
  config: HotelConfig;
  updateConfig: (newConfig: Partial<HotelConfig>) => void;
}

const defaultConfig: HotelConfig = {
  hotelName: "The Grand Sentec",
  logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GS&backgroundColor=1d1d1f",
  primaryColor: "#1d1d1f",
  accentColor: "#007AFF",
  wifiSsid: "Sentec_Guest_HighSpeed",
  wifiPassword: "luxury-stay-2024",
  language: 'en',
  unreadChat: 1,
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<HotelConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<HotelConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within a ConfigProvider');
  return context;
};

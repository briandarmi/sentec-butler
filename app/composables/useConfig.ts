export interface HotelConfig {
  hotelName: string
  logoUrl: string
  primaryColor: string
  accentColor: string
  wifiSsid: string
  wifiPassword: string
  language: 'en' | 'id' | 'zh'
  unreadChat: number
  fontFamily: string
}

const defaultConfig: HotelConfig = {
  hotelName: 'The Grand Sentec',
  logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GS&backgroundColor=007BFF',
  primaryColor: '#007BFF',
  accentColor: '#FF1493',
  wifiSsid: 'Sentec_Guest_HighSpeed',
  wifiPassword: 'luxury-stay-2024',
  language: 'en',
  unreadChat: 1,
  fontFamily: '"Quicksand", ui-sans-serif, system-ui, sans-serif',
}

const config = reactive<HotelConfig>({ ...defaultConfig })

export function useConfig() {
  function updateConfig(newConfig: Partial<HotelConfig>) {
    Object.assign(config, newConfig)
  }

  return { config, updateConfig }
}

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'
import { useTranslations } from '@/composables/useTranslations'
import {
  Bell, Utensils, MessageCircle, Info, Wifi, Star, AlertCircle,
  ChevronRight, Globe, X, Send, Image as ImageIcon,
  ArrowLeft, Coffee, Sparkles, Shirt, Car, MapPin, Building,
  PhoneCall, Dumbbell, Waves, Check, HeartPulse, Shield
} from 'lucide-vue-next'

definePageMeta({
  alias: ['/'],
})

const { config, updateConfig } = useConfig()
const { t } = useTranslations()

const currentView = ref('login')
const isLoggedIn = ref(false)

// Login state
const loginInput = ref('')
const loginError = ref('')

// Service request state
const selectedCategory = ref<string | null>(null)
const selectedItem = ref<string | null>(null)
const quantity = ref(1)
const remarks = ref('')
const selectedTime = ref('')
const serviceSubmitted = ref(false)

// Review state
const rating = ref(0)
const reviewSubmitted = ref(false)

// Language dropdown
const showLangDropdown = ref(false)

const guestName = computed(() => isLoggedIn.value ? 'Nikolas' : 'Guest')
const roomNumber = computed(() => isLoggedIn.value ? '402' : '---')
const stayDates = computed(() => isLoggedIn.value ? 'Mar 01 - Mar 05' : '---')

const allTiles = computed(() => [
  { id: 'service', icon: Bell, label: t.value.serviceRequest, requiresAuth: true },
  { id: 'room-service', icon: Utensils, label: t.value.roomService, requiresAuth: true },
  { id: 'chat', icon: MessageCircle, label: t.value.chat, requiresAuth: true },
  { id: 'info', icon: Info, label: t.value.info, requiresAuth: false },
  { id: 'wifi', icon: Wifi, label: t.value.wifi, requiresAuth: false },
  { id: 'review', icon: Star, label: t.value.review, requiresAuth: true },
  { id: 'emergency', icon: AlertCircle, label: t.value.emergency, requiresAuth: true, color: '#FFF2F2', textColor: '#FF3B30' },
])

const visibleTiles = computed(() =>
  allTiles.value.filter(tile => isLoggedIn.value || !tile.requiresAuth)
)

const roomServiceMenus = computed(() => [
  { id: 'restaurants', icon: Coffee, label: t.value.restaurants },
  { id: 'spa', icon: Sparkles, label: t.value.spa },
  { id: 'laundry', icon: Shirt, label: t.value.laundry },
  { id: 'transport', icon: Car, label: t.value.transport },
])

const serviceCategories = [
  { id: 'housekeeping', name: 'Housekeeping', icon: Sparkles, items: ['Extra Towels', 'Room Cleaning', 'Toiletries'] },
  { id: 'maintenance', name: 'Maintenance', icon: AlertCircle, items: ['AC Issue', 'Plumbing', 'Light Bulb'] },
  { id: 'concierge', name: 'Concierge', icon: Bell, items: ['Wake-up Call', 'Luggage Assistance', 'Valet'] },
]

const restaurantOutlets = [
  { id: 'ginger-lily', name: 'Ginger Lily', desc: 'Exquisite botanical-inspired dining', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800', hours: '11:00 - 23:00', link: 'https://apse1.menu.pos.sentec.io/menulist?i=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoIjoxMDQsIm8iOjMxMywidCI6MCwiciI6MH0.UcHQgK8creyTcIkDbIvCDo1nj3akpV8fpWGM03_8Fmc' },
  { id: 'restaurant', name: 'The Azure Grill', desc: 'Mediterranean fusion by the coast', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', hours: '07:00 - 23:00' },
]

const emergencyAlerts = [
  { id: 'medical', label: 'Medical Emergency', icon: HeartPulse },
  { id: 'security', label: 'Security Issue', icon: Shield },
  { id: 'assistance', label: 'Urgent Assistance', icon: PhoneCall },
]

const timePresets = ['Now', 'In 1 Hour', 'In 2 Hours']

function handleLogin() {
  if (loginInput.value.toLowerCase() === 'katuuk.nikolas@gmail.com') {
    isLoggedIn.value = true
    currentView.value = 'dashboard'
    loginError.value = ''
  } else {
    loginError.value = 'Reservation not found. Please try katuuk.nikolas@gmail.com'
  }
}

function handleSkip() {
  isLoggedIn.value = false
  currentView.value = 'dashboard'
}

function navigate(view: string) {
  currentView.value = view
}

function goBack(fallback: string) {
  currentView.value = fallback
}

function handleItemSelect(item: string) {
  selectedItem.value = item
  quantity.value = 1
  remarks.value = ''
  selectedTime.value = ''
}

function handleServiceSubmit() {
  serviceSubmitted.value = true
  setTimeout(() => {
    serviceSubmitted.value = false
    selectedItem.value = null
    selectedCategory.value = null
  }, 2000)
}

function submitReview() {
  reviewSubmitted.value = true
}

function setLanguage(lang: 'en' | 'id' | 'zh') {
  updateConfig({ language: lang })
  showLangDropdown.value = false
}

const selectedCategoryItems = computed(() =>
  serviceCategories.find(c => c.id === selectedCategory.value)?.items ?? []
)

const conciergeFirstSentence = computed(() => {
  const msg = t.value.conciergeMsg
  const dot = msg.indexOf('.')
  return dot > -1 ? msg.substring(0, dot + 1) : msg
})

const conciergeRest = computed(() => {
  const msg = t.value.conciergeMsg
  const dot = msg.indexOf('.')
  return dot > -1 ? msg.substring(dot + 1) : ''
})
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground relative max-w-md mx-auto shadow-2xl overflow-hidden"
    :style="{ fontFamily: config.fontFamily }"
  >
    <Transition name="view" mode="out-in">
      <!-- LOGIN -->
      <div v-if="currentView === 'login'" key="login" class="px-6 py-12 flex flex-col h-screen justify-center bg-background">
        <h1 class="text-3xl font-bold mb-2">{{ t.loginTitle }}</h1>
        <p class="text-muted-foreground mb-8">{{ t.loginDesc }}</p>
        <div class="space-y-4 mb-8">
          <Input
            v-model="loginInput"
            type="text"
            :placeholder="t.emailPhone"
            class="w-full p-4 h-auto rounded-2xl"
          />
          <p v-if="loginError" class="text-sm text-destructive">{{ loginError }}</p>
          <Button class="w-full py-4 h-auto text-base" @click="handleLogin">{{ t.loginBtn }}</Button>
        </div>
        <div class="mt-auto pb-8">
          <Button variant="ghost" class="w-full py-4 h-auto" @click="handleSkip">{{ t.skipBtn }}</Button>
        </div>
      </div>

      <!-- DASHBOARD -->
      <div v-else-if="currentView === 'dashboard'" key="dashboard" class="px-6 py-8 pb-32">
        <button
          v-if="!isLoggedIn"
          class="w-full mb-6 bg-primary text-primary-foreground py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
          @click="navigate('login')"
        >
          <span>{{ t.moreServices }}</span>
          <ChevronRight :size="16" />
        </button>

        <header class="flex justify-between items-center mb-8">
          <img :src="config.logoUrl" alt="Logo" class="h-8 w-auto rounded-lg" />
          <div class="relative">
            <button
              class="flex items-center gap-1 text-sm font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full"
              @click="showLangDropdown = !showLangDropdown"
            >
              <Globe :size="14" />
              {{ config.language.toUpperCase() }}
            </button>
            <div
              v-if="showLangDropdown"
              class="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
            >
              <button
                v-for="lang in ['en', 'id', 'zh'] as const"
                :key="lang"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-secondary uppercase"
                @click="setLanguage(lang)"
              >
                {{ lang }}
              </button>
            </div>
          </div>
        </header>

        <div class="mb-10">
          <h1 class="text-3xl font-semibold tracking-tight mb-2">{{ t.welcome }}, {{ guestName }}</h1>
          <p class="text-foreground font-semibold mb-4">{{ t.room }} {{ roomNumber }} • {{ stayDates }}</p>
          <div class="bg-secondary p-5 rounded-2xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary" />
            <p class="text-muted-foreground text-sm leading-relaxed">
              <span class="text-foreground block mb-1">{{ conciergeFirstSentence }}</span>
              {{ conciergeRest }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="tile in visibleTiles"
            :key="tile.id"
            :class="cn(
              'rounded-2xl text-left transition-colors active:scale-[0.96]',
              tile.id === 'emergency'
                ? 'col-span-2 flex flex-row items-center p-4 bg-[#FFF2F2]'
                : 'flex flex-col items-start p-5 bg-card border border-border shadow-sm'
            )"
            @click="navigate(tile.id)"
          >
            <div :class="cn('rounded-xl', tile.id === 'emergency' ? 'p-2 bg-white mr-4' : 'p-3 bg-secondary mb-4')">
              <component :is="tile.icon" :size="24" :color="tile.textColor || config.primaryColor" />
            </div>
            <span :class="cn('font-semibold text-sm flex-1', tile.textColor ? 'text-destructive' : 'text-foreground')">
              {{ tile.label }}
            </span>
            <ChevronRight v-if="tile.id === 'emergency'" :size="20" class="text-destructive/50" />
          </button>
        </div>
      </div>

      <!-- SERVICE REQUEST -->
      <div v-else-if="currentView === 'service'" key="service" class="px-6 py-8 pb-24 h-screen bg-background overflow-y-auto">
        <template v-if="serviceSubmitted">
          <div class="flex flex-col items-center justify-center text-center h-full">
            <div class="w-20 h-20 bg-success rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
              <Check :size="40" />
            </div>
            <h2 class="text-2xl font-bold mb-2">Request Sent!</h2>
            <p class="text-muted-foreground mb-8">We will attend to your request shortly.</p>
            <Button variant="secondary" @click="goBack('dashboard')">Back to Dashboard</Button>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between mb-8">
            <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
              <ArrowLeft :size="20" />
              <span class="font-medium">{{ t.back }}</span>
            </button>
            <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
              <span class="font-medium">Home</span>
            </button>
          </div>
          <h2 class="text-2xl font-semibold mb-8">{{ t.serviceRequest }}</h2>

          <div class="space-y-4">
            <Card
              v-for="cat in serviceCategories"
              :key="cat.id"
              class="p-4 cursor-pointer hover:border-primary transition-colors"
              @click="selectedCategory = cat.id"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 bg-secondary rounded-xl">
                  <component :is="cat.icon" :size="24" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-lg">{{ cat.name }}</h3>
                  <p class="text-sm text-muted-foreground">{{ cat.items.join(', ') }}</p>
                </div>
                <ChevronRight :size="20" class="text-muted-foreground/50" />
              </div>
            </Card>
          </div>

          <!-- Select Request Sheet -->
          <Sheet :open="!!selectedCategory && !selectedItem" @update:open="(v: boolean) => { if (!v) selectedCategory = null }">
            <SheetContent side="bottom" class="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Select Request</SheetTitle>
              </SheetHeader>
              <div class="space-y-3 mt-4 mb-8">
                <Button
                  v-for="item in selectedCategoryItems"
                  :key="item"
                  variant="secondary"
                  class="w-full justify-start py-4 h-auto text-base"
                  @click="handleItemSelect(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <!-- Item Detail Sheet -->
          <Sheet :open="!!selectedItem" @update:open="(v: boolean) => { if (!v) selectedItem = null }">
            <SheetContent side="bottom" class="rounded-t-3xl max-h-[90vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{{ selectedItem }}</SheetTitle>
              </SheetHeader>
              <div class="space-y-6 mt-4 mb-8">
                <div>
                  <label class="block text-sm font-medium text-muted-foreground mb-2">Quantity</label>
                  <div class="flex items-center gap-4">
                    <button class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl font-medium" @click="quantity = Math.max(1, quantity - 1)">-</button>
                    <span class="text-xl font-semibold w-8 text-center">{{ quantity }}</span>
                    <button class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl font-medium" @click="quantity++">+</button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-muted-foreground mb-2">Preferred Time</label>
                  <div class="grid grid-cols-3 gap-2 mb-3">
                    <button
                      v-for="tp in timePresets"
                      :key="tp"
                      :class="cn(
                        'py-2 px-1 text-xs font-medium rounded-lg border transition-colors',
                        selectedTime === tp
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border text-foreground hover:bg-secondary'
                      )"
                      @click="selectedTime = tp"
                    >
                      {{ tp }}
                    </button>
                  </div>
                  <Select v-model="selectedTime">
                    <SelectTrigger class="w-full rounded-xl">
                      <SelectValue placeholder="Or select a specific time..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="hour in 12" :key="'pm'+hour" :value="`${hour}:00 PM`">{{ hour }}:00 PM</SelectItem>
                      <SelectItem v-for="hour in 12" :key="'pm30'+hour" :value="`${hour}:30 PM`">{{ hour }}:30 PM</SelectItem>
                      <SelectItem v-for="hour in 11" :key="'am'+hour" :value="`${hour}:00 AM`">{{ hour }}:00 AM</SelectItem>
                      <SelectItem v-for="hour in 11" :key="'am30'+hour" :value="`${hour}:30 AM`">{{ hour }}:30 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-muted-foreground mb-2">Remarks (Optional)</label>
                  <Textarea
                    v-model="remarks"
                    placeholder="Any special instructions?"
                    class="rounded-xl h-24 resize-none"
                  />
                </div>
              </div>
              <Button class="w-full py-4 h-auto text-base" @click="handleServiceSubmit">Submit Request</Button>
            </SheetContent>
          </Sheet>
        </template>
      </div>

      <!-- ROOM SERVICE MENU -->
      <div v-else-if="currentView === 'room-service'" key="room-service" class="px-6 py-8 pb-24 h-screen bg-background overflow-y-auto">
        <div class="flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <h2 class="text-2xl font-semibold mb-8">{{ t.roomService }}</h2>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="menu in roomServiceMenus"
            :key="menu.id"
            class="flex flex-col items-start p-5 rounded-2xl text-left bg-card border border-border shadow-sm transition-colors active:scale-[0.96]"
            @click="navigate(menu.id)"
          >
            <div class="p-3 rounded-xl mb-4 bg-secondary">
              <component :is="menu.icon" :size="24" class="text-foreground" />
            </div>
            <span class="font-semibold text-sm text-foreground">{{ menu.label }}</span>
          </button>
        </div>
      </div>

      <!-- RESTAURANTS -->
      <div v-else-if="currentView === 'restaurants'" key="restaurants" class="px-6 py-8 pb-24 h-screen bg-background overflow-y-auto">
        <div class="flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('room-service')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <h2 class="text-2xl font-semibold mb-8">{{ t.restaurants }}</h2>
        <div class="space-y-6">
          <Card v-for="outlet in restaurantOutlets" :key="outlet.id" class="overflow-hidden group">
            <div class="h-40 overflow-hidden">
              <img :src="outlet.img" :alt="outlet.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerpolicy="no-referrer" />
            </div>
            <CardContent class="p-5">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-lg">{{ outlet.name }}</h3>
                <Badge>{{ outlet.hours }}</Badge>
              </div>
              <p class="text-sm text-muted-foreground mb-4">{{ outlet.desc }}</p>
              <a v-if="outlet.link" :href="outlet.link" target="_blank" rel="noopener noreferrer" class="block w-full">
                <Button variant="secondary" class="w-full py-2.5 h-auto text-sm">Order Now</Button>
              </a>
              <Button v-else variant="secondary" class="w-full py-2.5 h-auto text-sm">Open Menu</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- HOTEL INFO -->
      <div v-else-if="currentView === 'info'" key="info" class="px-6 py-8 pb-24 h-screen bg-background overflow-y-auto">
        <div class="flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <h2 class="text-2xl font-semibold mb-8">{{ t.info }}</h2>

        <div class="space-y-10">
          <!-- Facilities -->
          <section>
            <h3 class="text-lg font-semibold mb-4">Facilities</h3>
            <div class="space-y-4">
              <Card class="overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800" alt="Pool" class="w-full h-32 object-cover" referrerpolicy="no-referrer" />
                <CardContent class="p-4">
                  <h4 class="font-semibold flex items-center gap-2"><Waves :size="18" /> Infinity Pool</h4>
                  <p class="text-sm text-muted-foreground mt-1">Rooftop pool with panoramic ocean views. Open 06:00 - 22:00.</p>
                </CardContent>
              </Card>
              <Card class="overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" alt="Gym" class="w-full h-32 object-cover" referrerpolicy="no-referrer" />
                <CardContent class="p-4">
                  <h4 class="font-semibold flex items-center gap-2"><Dumbbell :size="18" /> Fitness Center</h4>
                  <p class="text-sm text-muted-foreground mt-1">State-of-the-art equipment and personal trainers. 24/7 access.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <!-- Nearby -->
          <section>
            <h3 class="text-lg font-semibold mb-4">What's Nearby</h3>
            <Card class="p-0 overflow-hidden">
              <div class="divide-y divide-border">
                <div class="p-4 flex items-start gap-4">
                  <div class="p-2 bg-secondary rounded-lg"><MapPin :size="20" class="text-foreground" /></div>
                  <div>
                    <h4 class="font-semibold text-sm">Attractions</h4>
                    <p class="text-xs text-muted-foreground mt-1">Coastal Walk (0.5km)<br />Grand Museum (2.1km)</p>
                  </div>
                </div>
                <div class="p-4 flex items-start gap-4">
                  <div class="p-2 bg-secondary rounded-lg"><Building :size="20" class="text-foreground" /></div>
                  <div>
                    <h4 class="font-semibold text-sm">Embassies</h4>
                    <p class="text-xs text-muted-foreground mt-1">US Embassy (3.0km)<br />UK Embassy (3.2km)</p>
                  </div>
                </div>
                <div class="p-4 flex items-start gap-4">
                  <div class="p-2 bg-secondary rounded-lg"><HeartPulse :size="20" class="text-foreground" /></div>
                  <div>
                    <h4 class="font-semibold text-sm">Medical &amp; Pharmacy</h4>
                    <p class="text-xs text-muted-foreground mt-1">City General Hospital (1.5km)<br />Care Pharmacy (0.2km)</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <!-- Emergency Contacts -->
          <section>
            <h3 class="text-lg font-semibold mb-4">Emergency Contacts</h3>
            <Card class="p-4 space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Police</span>
                <span class="text-sm text-destructive font-mono">911</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Ambulance</span>
                <span class="text-sm text-destructive font-mono">912</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Hotel Security</span>
                <span class="text-sm text-destructive font-mono">Ext. 0</span>
              </div>
            </Card>
          </section>
        </div>
      </div>

      <!-- WIFI -->
      <div v-else-if="currentView === 'wifi'" key="wifi" class="px-6 py-8 h-screen bg-background flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center -mt-20">
          <div class="w-24 h-24 bg-card rounded-full shadow-lg flex items-center justify-center mb-8">
            <Wifi :size="40" class="text-foreground" />
          </div>
          <h2 class="text-2xl font-semibold mb-2">{{ config.wifiSsid }}</h2>
          <p class="text-muted-foreground mb-8 text-center">Connect to our high-speed guest network.</p>
          <Card class="w-full max-w-sm p-6 mb-8">
            <p class="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-widest text-center">Password</p>
            <div class="text-2xl font-mono text-center font-bold tracking-wider">{{ config.wifiPassword }}</div>
          </Card>
          <Button class="w-full max-w-sm py-4 h-auto text-base">Copy Password</Button>
        </div>
      </div>

      <!-- CHAT -->
      <div v-else-if="currentView === 'chat'" key="chat" class="flex flex-col h-screen bg-background">
        <header class="px-6 py-4 flex items-center justify-between border-b border-border bg-card sticky top-0 z-10">
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
              <ArrowLeft :size="20" />
            </button>
            <div>
              <h2 class="font-semibold">Front Desk</h2>
              <div class="flex items-center gap-1">
                <div class="w-2 h-2 bg-success rounded-full" />
                <span class="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium text-sm">Home</span>
          </button>
        </header>

        <ScrollArea class="flex-1 p-6">
          <div class="space-y-6">
            <div class="flex justify-center"><Badge variant="secondary">Today</Badge></div>
            <div class="flex flex-col items-start max-w-[80%]">
              <div class="bg-card border border-border p-4 rounded-2xl rounded-tl-none shadow-sm">
                Welcome to {{ config.hotelName }}! How can we assist you today?
              </div>
              <span class="text-xs text-muted-foreground mt-2 ml-1">10:00 AM</span>
            </div>
          </div>
        </ScrollArea>

        <div class="p-4 bg-card border-t border-border pb-safe">
          <div class="flex items-center gap-3 bg-secondary p-2 rounded-full">
            <button class="p-2 text-muted-foreground"><ImageIcon :size="20" /></button>
            <input type="text" placeholder="Message..." class="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm" />
            <button class="p-2 bg-primary text-primary-foreground rounded-full"><Send :size="16" /></button>
          </div>
        </div>
      </div>

      <!-- REVIEW -->
      <div v-else-if="currentView === 'review'" key="review" class="px-6 py-8 h-screen bg-background flex flex-col">
        <template v-if="reviewSubmitted">
          <div class="flex-1 flex flex-col items-center justify-center text-center">
            <div class="w-20 h-20 bg-success rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
              <Check :size="40" />
            </div>
            <h2 class="text-2xl font-bold mb-2">Thank You!</h2>
            <p class="text-muted-foreground mb-8">Your feedback helps us improve our services.</p>
            <Button variant="secondary" @click="navigate('dashboard')">Back to Dashboard</Button>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between mb-8">
            <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('dashboard')">
              <ArrowLeft :size="20" />
              <span class="font-medium">{{ t.back }}</span>
            </button>
            <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
              <span class="font-medium">Home</span>
            </button>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center -mt-20">
            <h2 class="text-2xl font-semibold mb-2 text-center">How is your stay?</h2>
            <p class="text-muted-foreground mb-10 text-center">We'd love to hear about your experience.</p>

            <div class="flex gap-2 mb-12">
              <button
                v-for="star in 5"
                :key="star"
                class="p-2 transition-transform hover:scale-110 active:scale-95"
                @click="rating = star"
              >
                <Star :size="40" :class="cn(star <= rating ? 'fill-[#FFCC00] text-[#FFCC00]' : 'text-border')" />
              </button>
            </div>

            <Transition name="fade">
              <div v-if="rating > 0" class="w-full max-w-sm">
                <template v-if="rating <= 3">
                  <Card class="p-6 text-center mb-6 border-[#FFE5E5] bg-[#FFF2F2]">
                    <p class="font-medium text-destructive mb-4">We're sorry to hear that. Would you like to speak with a manager?</p>
                    <div class="flex gap-3">
                      <Button variant="secondary" class="flex-1">No, thanks</Button>
                      <Button variant="destructive" class="flex-1">Chat Now</Button>
                    </div>
                  </Card>
                </template>
                <template v-else>
                  <div class="space-y-4">
                    <Textarea placeholder="Tell us what you loved..." class="w-full rounded-2xl h-32 resize-none" />
                    <Button class="w-full py-4 h-auto text-base" @click="submitReview">Submit Review</Button>
                  </div>
                </template>
              </div>
            </Transition>
          </div>
        </template>
      </div>

      <!-- EMERGENCY -->
      <div v-else-if="currentView === 'emergency'" key="emergency" class="py-8 h-screen bg-[#FFF2F2] flex flex-col">
        <div class="px-6 flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-destructive hover:text-foreground transition-colors" @click="goBack('dashboard')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-destructive hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <h2 class="px-6 text-3xl font-bold text-destructive mb-2">{{ t.emergency }}</h2>
        <p class="px-6 text-destructive/80 mb-10 font-medium">Tap a button below to alert staff immediately.</p>
        <div class="flex-1">
          <div class="bg-white border-y border-[#FFE5E5]">
            <button
              v-for="(alert, index) in emergencyAlerts"
              :key="alert.id"
              :class="cn('w-full p-4 flex items-center justify-between active:bg-[#FFF2F2] transition-colors', index !== 0 && 'border-t border-[#FFE5E5]')"
            >
              <div class="flex items-center gap-4 px-2">
                <div class="p-2 bg-[#FFF2F2] rounded-full text-destructive">
                  <component :is="alert.icon" :size="24" />
                </div>
                <span class="font-bold text-base">{{ alert.label }}</span>
              </div>
              <ChevronRight :size="20" class="text-destructive/50 mr-2" />
            </button>
          </div>
        </div>
      </div>

      <!-- PLACEHOLDER SCREENS (spa, laundry, transport) -->
      <div v-else key="placeholder" class="px-6 py-8 h-screen bg-background">
        <div class="flex items-center justify-between mb-8">
          <button class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" @click="goBack('room-service')">
            <ArrowLeft :size="20" />
            <span class="font-medium">{{ t.back }}</span>
          </button>
          <button class="text-muted-foreground hover:text-foreground transition-colors" @click="navigate('dashboard')">
            <span class="font-medium">Home</span>
          </button>
        </div>
        <div class="py-20 text-center">
          <h2 class="text-2xl font-semibold mb-4 capitalize">{{ currentView }}</h2>
          <p class="text-muted-foreground mb-8">This module is currently being prepared for your stay.</p>
          <Button variant="secondary" @click="goBack('room-service')">{{ t.back }}</Button>
        </div>
      </div>
    </Transition>

    <!-- Floating Chat Button -->
    <button
      v-if="isLoggedIn && currentView === 'dashboard'"
      class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl z-50 hover:scale-105 active:scale-95 transition-transform"
      @click="navigate('chat')"
    >
      <MessageCircle :size="24" />
      <div v-if="config.unreadChat > 0" class="absolute top-0 right-0 w-4 h-4 bg-destructive rounded-full border-2 border-white flex items-center justify-center">
        <span class="text-[8px] font-bold text-white">{{ config.unreadChat }}</span>
      </div>
    </button>
  </div>
</template>

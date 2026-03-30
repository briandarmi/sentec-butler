<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'
import {
  Palette, Database, Wifi, Bell, Utensils,
  Users, Languages, Rocket, ChevronRight,
  Upload, Check, Smartphone, Settings, Menu, X
} from 'lucide-vue-next'

const { config, updateConfig } = useConfig()

const activeTab = ref('branding')
const isMobileMenuOpen = ref(false)

const tabs = [
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'pms', label: 'PMS Connection', icon: Database },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'services', label: 'Services', icon: Bell },
  { id: 'outlets', label: 'Outlets', icon: Utensils },
  { id: 'routing', label: 'Staff Routing', icon: Users },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'publish', label: 'Preview & Publish', icon: Rocket },
]

const services = ref([
  { id: 1, name: 'Extra Towels', category: 'Housekeeping', active: true },
  { id: 2, name: 'Extra Pillows', category: 'Housekeeping', active: true },
  { id: 3, name: 'Room Cleaning', category: 'Housekeeping', active: true },
  { id: 4, name: 'AC Maintenance', category: 'Maintenance', active: true },
  { id: 5, name: 'Wake-up Call', category: 'Concierge', active: true },
])

const outlets = [
  { id: 1, name: 'Room Service', type: 'Dining', status: 'Open' },
  { id: 2, name: 'The Azure Grill', type: 'Dining', status: 'Open' },
  { id: 3, name: 'Serenity Spa', type: 'Wellness', status: 'Open' },
  { id: 4, name: 'Laundry & Press', type: 'Service', status: 'Open' },
]

const syncItems = [
  { label: 'Guest Profiles', count: '1,240', status: 'Synced' },
  { label: 'Room Inventory', count: '250', status: 'Synced' },
  { label: 'Reservations', count: '48', status: 'Syncing...' },
]

const currentTabIcon = computed(() => tabs.find(t => t.id === activeTab.value)?.icon ?? Settings)

function selectTab(id: string) {
  activeTab.value = id
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="flex h-screen bg-secondary font-sans overflow-hidden">
    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
      @click="isMobileMenuOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="cn(
        'fixed inset-y-0 left-0 z-50 w-72 bg-secondary p-8 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 border-r border-border',
        isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )"
    >
      <div class="flex items-center justify-between mb-10 px-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
            <Settings :size="24" />
          </div>
          <div>
            <h1 class="font-bold text-lg tracking-tight">Sentec Admin</h1>
            <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Config Portal</p>
          </div>
        </div>
        <button class="md:hidden p-2 text-muted-foreground" @click="isMobileMenuOpen = false">
          <X :size="20" />
        </button>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all',
            activeTab === tab.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          )"
          @click="selectTab(tab.id)"
        >
          <div class="flex items-center gap-3">
            <component :is="tab.icon" :size="18" />
            <span class="font-medium text-sm">{{ tab.label }}</span>
          </div>
          <ChevronRight v-if="activeTab === tab.id" :size="14" />
        </button>
      </nav>

      <div class="pt-8 border-t border-border">
        <Card class="p-4 bg-primary text-primary-foreground border-none shadow-lg">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-white/10 rounded-lg"><Smartphone :size="16" /></div>
            <p class="text-xs font-bold uppercase tracking-widest">Live Status</p>
          </div>
          <p class="text-sm font-medium mb-4">Your guest app is live at 4 hotels.</p>
          <Button variant="secondary" class="w-full py-2 h-auto text-xs bg-white/10 text-white hover:bg-white/20 border-none">View All Hotels</Button>
        </Card>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div class="max-w-5xl mx-auto">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div class="flex items-center gap-4">
            <button class="md:hidden p-2 -ml-2 text-foreground" @click="isMobileMenuOpen = true">
              <Menu :size="24" />
            </button>
            <div>
              <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-2 capitalize">{{ activeTab }}</h2>
              <p class="text-muted-foreground font-medium text-sm md:text-base">Configure your hotel's {{ activeTab }} settings.</p>
            </div>
          </div>
          <div class="flex gap-3 w-full md:w-auto">
            <Button variant="secondary" class="flex-1 md:flex-none">Discard</Button>
            <Button class="flex-1 md:flex-none"><Check :size="18" class="mr-2" /> Publish</Button>
          </div>
        </header>

        <!-- BRANDING -->
        <div v-if="activeTab === 'branding'" class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div class="space-y-8 order-2 lg:order-1">
            <section>
              <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Identity</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Hotel Name</label>
                  <Input :model-value="config.hotelName" class="rounded-xl" @update:model-value="(v: any) => updateConfig({ hotelName: String(v) })" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Hotel Logo</label>
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                      <img :src="config.logoUrl" alt="Logo" class="max-w-full max-h-full" />
                    </div>
                    <Button variant="secondary" size="sm"><Upload :size="14" class="mr-2" /> Replace Logo</Button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Colors</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium mb-2">Primary Color</label>
                  <div class="flex items-center gap-3 p-2 bg-card border border-border rounded-xl">
                    <div class="w-8 h-8 rounded-lg shadow-inner shrink-0" :style="{ backgroundColor: config.primaryColor }" />
                    <span class="text-xs font-mono uppercase truncate">{{ config.primaryColor }}</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-medium mb-2">Accent Color</label>
                  <div class="flex items-center gap-3 p-2 bg-card border border-border rounded-xl">
                    <div class="w-8 h-8 rounded-lg shadow-inner shrink-0" :style="{ backgroundColor: config.accentColor }" />
                    <span class="text-xs font-mono uppercase truncate">{{ config.accentColor }}</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Typography</h3>
              <div>
                <label class="block text-sm font-medium mb-2">Font Family</label>
                <Select :model-value="config.fontFamily" @update:model-value="(v: any) => updateConfig({ fontFamily: String(v) })">
                  <SelectTrigger class="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value='"Quicksand", ui-sans-serif, system-ui, sans-serif'>Quicksand (Default)</SelectItem>
                    <SelectItem value='-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'>System Default (iPhone Style)</SelectItem>
                    <SelectItem value='"Inter", sans-serif'>Inter</SelectItem>
                    <SelectItem value='"Playfair Display", serif'>Playfair Display</SelectItem>
                    <SelectItem value='"Space Grotesk", sans-serif'>Space Grotesk</SelectItem>
                    <SelectItem value='"JetBrains Mono", monospace'>JetBrains Mono</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <div class="pt-8">
              <Button class="w-full">Save Branding Changes</Button>
            </div>
          </div>

          <!-- Live Preview -->
          <div class="space-y-4 order-1 lg:order-2">
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Live Preview</h3>
            <Card class="aspect-[9/16] max-w-[280px] sm:max-w-[300px] mx-auto overflow-hidden border-8 border-primary rounded-[40px] relative shadow-2xl">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-primary rounded-b-2xl z-20" />
              <div class="h-full bg-background p-4 flex flex-col" :style="{ fontFamily: config.fontFamily }">
                <header class="flex justify-between items-center mb-6 pt-4">
                  <img :src="config.logoUrl" alt="Logo" class="h-4 w-auto rounded" />
                  <div class="w-4 h-4 bg-border rounded-full" />
                </header>
                <div class="mb-6">
                  <h4 class="text-lg font-bold leading-tight">Welcome, Nikolas</h4>
                  <p class="text-[10px] text-muted-foreground font-medium">Room 402 • Mar 01 - Mar 05</p>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="i in 4" :key="i" class="aspect-square bg-card border border-border rounded-xl p-2">
                    <div class="w-6 h-6 bg-secondary rounded-lg mb-2" />
                    <div class="w-10 h-1.5 bg-secondary rounded-full" />
                  </div>
                </div>
                <div class="mt-auto pb-4">
                  <div class="w-full h-10 bg-primary rounded-full" />
                </div>
              </div>
            </Card>
            <p class="text-center text-xs text-muted-foreground">Mobile Guest View Preview</p>
          </div>
        </div>

        <!-- PMS -->
        <div v-else-if="activeTab === 'pms'" class="max-w-2xl space-y-8">
          <section>
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Connection Settings</h3>
            <Card class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2">PMS Provider</label>
                  <Select>
                    <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue placeholder="Opera Cloud" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opera">Opera Cloud</SelectItem>
                      <SelectItem value="mews">Mews</SelectItem>
                      <SelectItem value="cloudbeds">Cloudbeds</SelectItem>
                      <SelectItem value="custom">Custom API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Hotel ID</label>
                  <Input type="text" placeholder="e.g. GS-LON-01" class="rounded-xl bg-secondary border-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">API Key</label>
                  <Input type="password" model-value="••••••••••••••••" class="rounded-xl bg-secondary border-none" />
                </div>
              </div>
              <Separator />
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-success rounded-full" />
                  <span class="text-sm font-medium text-success">Connected &amp; Synced</span>
                </div>
                <Button variant="secondary" size="sm" class="w-full sm:w-auto">Test Connection</Button>
              </div>
            </Card>
          </section>

          <section>
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Sync Status</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card v-for="(item, i) in syncItems" :key="i" class="p-4">
                <p class="text-[10px] font-bold text-muted-foreground uppercase mb-1">{{ item.label }}</p>
                <p class="text-xl font-bold mb-2">{{ item.count }}</p>
                <Badge :variant="item.status === 'Synced' ? 'default' : 'secondary'">{{ item.status }}</Badge>
              </Card>
            </div>
          </section>
        </div>

        <!-- WIFI -->
        <div v-else-if="activeTab === 'wifi'" class="max-w-2xl space-y-8">
          <section>
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Network Configuration</h3>
            <Card class="p-6 space-y-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">SSID (Network Name)</label>
                  <Input :model-value="config.wifiSsid" class="rounded-xl bg-secondary border-none" @update:model-value="(v: any) => updateConfig({ wifiSsid: String(v) })" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Password</label>
                  <Input :model-value="config.wifiPassword" class="rounded-xl bg-secondary border-none" @update:model-value="(v: any) => updateConfig({ wifiPassword: String(v) })" />
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Card Preview</h3>
            <Card class="p-8 text-center max-w-sm mx-auto">
              <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi :size="32" />
              </div>
              <h4 class="font-semibold mb-1">{{ config.wifiSsid }}</h4>
              <p class="text-xs text-muted-foreground mb-6">High-speed guest network</p>
              <div class="bg-secondary p-3 rounded-lg flex justify-between items-center mb-4">
                <code class="font-mono text-sm">{{ config.wifiPassword }}</code>
                <span class="text-[10px] font-bold text-[#007AFF] uppercase">Copy</span>
              </div>
              <Button class="w-full py-2 h-auto text-sm">Connect Automatically</Button>
            </Card>
          </section>
        </div>

        <!-- SERVICES -->
        <div v-else-if="activeTab === 'services'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest">Active Services</h3>
            <Button size="sm">Add New Service</Button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card v-for="service in services" :key="service.id" class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-secondary rounded-lg"><Bell :size="18" /></div>
                <div>
                  <h4 class="font-semibold text-sm">{{ service.name }}</h4>
                  <p class="text-[10px] text-muted-foreground uppercase tracking-wider">{{ service.category }}</p>
                </div>
              </div>
              <Switch v-model:checked="service.active" />
            </Card>
          </div>
        </div>

        <!-- OUTLETS -->
        <div v-else-if="activeTab === 'outlets'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest">Hotel Outlets</h3>
            <Button size="sm">Add Outlet</Button>
          </div>
          <div class="space-y-3">
            <Card v-for="outlet in outlets" :key="outlet.id" class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-secondary rounded-lg"><Utensils :size="18" /></div>
                <div>
                  <h4 class="font-semibold text-sm">{{ outlet.name }}</h4>
                  <p class="text-[10px] text-muted-foreground uppercase tracking-wider">{{ outlet.type }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <Badge variant="default">{{ outlet.status }}</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </Card>
          </div>
        </div>

        <!-- PLACEHOLDER -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 shadow-sm">
            <component :is="currentTabIcon" :size="40" class="text-muted-foreground/50" />
          </div>
          <h3 class="text-xl font-bold mb-2">Configuration Module</h3>
          <p class="text-muted-foreground max-w-sm">This section is currently being updated to support the latest PMS integrations.</p>
        </div>
      </div>
    </main>
  </div>
</template>

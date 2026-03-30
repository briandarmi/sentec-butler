<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'
import {
  LayoutDashboard, MessageSquare, Ticket, AlertTriangle,
  BarChart3, Settings, Search, Bell, User, ChevronRight,
  Filter, MoreHorizontal, Send, X, ArrowLeft
} from 'lucide-vue-next'

const { config } = useConfig()

// Auth
const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')
const loginError = ref('')
const showUserMenu = ref(false)

// Navigation
const activeTab = ref('overview')

// Overview modals
const showActiveGuests = ref(false)
const showAvgResponse = ref(false)

// Inbox
const selectedChat = ref<number | null>(null)
const showMobileChat = ref(false)
const showGuestInfo = ref(false)

// Tickets
const tickets = ref([
  { id: 'T-1001', guest: 'Nikolas K.', room: '402', request: 'Extra Towels', status: 'Open', submitted: '10:00 AM', completed: '-', dept: 'Housekeeping', staff: '' },
  { id: 'T-1002', guest: 'Sarah M.', room: '105', request: 'AC Repair', status: 'In Progress', submitted: '09:15 AM', completed: '-', dept: 'Maintenance', staff: 'John Doe' },
  { id: 'T-1003', guest: 'John D.', room: '312', request: 'Room Service', status: 'Completed', submitted: '08:30 AM', completed: '09:00 AM', dept: 'F&B', staff: 'Jane Smith' },
])
const selectedTicket = ref<any | null>(null)
const showNewTicket = ref(false)
const assignDept = ref('')
const assignStaff = ref('')
const ticketRemarks = ref('')
const attachments = ref<string[]>([])

// Settings
const settingsTab = ref('departments')

// Analytics
const analyticsFilter = ref('department')

const departments = ['Housekeeping', 'Maintenance', 'F&B', 'Front Desk']
const staffMembers: Record<string, string[]> = {
  'Housekeeping': ['Maria G.', 'Elena R.'],
  'Maintenance': ['John Doe', 'Mike T.'],
  'F&B': ['Jane Smith', 'David L.'],
  'Front Desk': ['Sarah W.', 'Tom H.'],
}

const mockGuests = [
  { name: 'Nikolas K.', room: '402', checkIn: '2026-03-01', checkOut: '2026-03-05', type: 'Suite', vip: true, unfinishedRequests: 1 },
  { name: 'Sarah M.', room: '105', checkIn: '2026-03-02', checkOut: '2026-03-04', type: 'Standard', vip: false, unfinishedRequests: 2 },
  { name: 'John D.', room: '312', checkIn: '2026-03-03', checkOut: '2026-03-06', type: 'Deluxe', vip: false, unfinishedRequests: 0 },
]

const overviewStats = [
  { id: 'active-guests', label: 'Active Guests', value: '142', change: '+12%', icon: User },
  { id: 'open-requests', label: 'Open Requests', value: '18', change: '-4', icon: Ticket },
  { id: 'avg-response', label: 'Avg. Response', value: '4.2m', change: '-30s', icon: BarChart3 },
  { id: 'satisfaction', label: 'Guest Satisfaction', value: '98%', change: '+2%', icon: Bell },
]

const recentTickets = [
  { id: '#4021', guest: 'Nikolas K.', room: '402', request: 'Extra Towels', status: 'In Progress', time: '2m ago' },
  { id: '#4019', guest: 'Sarah M.', room: '105', request: 'AC Maintenance', status: 'Pending', time: '15m ago' },
  { id: '#4018', guest: 'John D.', room: '312', request: 'Room Cleaning', status: 'Completed', time: '1h ago' },
]

const chatList = [
  { id: 1, name: 'Nikolas K.', room: '402', lastMsg: 'Can I get some extra towels?', time: '2m', unread: true },
  { id: 2, name: 'Sarah M.', room: '105', lastMsg: 'The AC is making a noise.', time: '15m', unread: false },
  { id: 3, name: 'John D.', room: '312', lastMsg: 'Thank you for the help!', time: '1h', unread: false },
]

const slaData = [
  { id: 1, type: 'Housekeeping', total: 145, met: 130, missed: 15, avgTime: '12m', target: '15m' },
  { id: 2, type: 'Maintenance', total: 84, met: 70, missed: 14, avgTime: '25m', target: '30m' },
  { id: 3, type: 'F&B', total: 210, met: 195, missed: 15, avgTime: '18m', target: '20m' },
  { id: 4, type: 'Front Desk', total: 320, met: 310, missed: 10, avgTime: '3m', target: '5m' },
]

const staffAnalytics = [
  { id: 1, type: 'John Doe', total: 45, met: 40, missed: 5, avgTime: '14m', target: '15m' },
  { id: 2, type: 'Jane Smith', total: 52, met: 50, missed: 2, avgTime: '11m', target: '15m' },
  { id: 3, type: 'Mike T.', total: 38, met: 30, missed: 8, avgTime: '28m', target: '30m' },
]

const guestAnalytics = [
  { id: 1, type: 'Nikolas K.', total: 5, met: 5, missed: 0, avgTime: '8m', target: '15m' },
  { id: 2, type: 'Sarah M.', total: 3, met: 2, missed: 1, avgTime: '18m', target: '15m' },
]

const currentAnalyticsData = computed(() => {
  if (analyticsFilter.value === 'department') return slaData
  if (analyticsFilter.value === 'staff') return staffAnalytics
  return guestAnalytics
})

const availableStaff = computed(() => {
  if (assignDept.value && staffMembers[assignDept.value]) {
    return staffMembers[assignDept.value]
  }
  return Object.values(staffMembers).flat()
})

const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status.toLowerCase()) {
    case 'completed': return 'default'
    case 'in progress': return 'secondary'
    case 'open':
    case 'pending': return 'outline'
    default: return 'default'
  }
}

function handleLogin(e: Event) {
  e.preventDefault()
  if (username.value === 'nikolas.k@sentineltech.com' && password.value === 'admin') {
    isLoggedIn.value = true
    loginError.value = ''
  } else {
    loginError.value = 'Invalid username or password'
  }
}

function handleLogout() {
  showUserMenu.value = false
  isLoggedIn.value = false
  username.value = ''
  password.value = ''
}

function handleChatSelect(id: number) {
  selectedChat.value = id
  showMobileChat.value = true
}

function handleBackToInbox() {
  showMobileChat.value = false
  setTimeout(() => { selectedChat.value = null }, 300)
}

function handleStaffChange(staff: string) {
  assignStaff.value = staff
  if (staff) {
    const dept = Object.keys(staffMembers).find(key => (staffMembers[key] ?? []).includes(staff))
    if (dept) assignDept.value = dept
  }
}

function handleStatClick(id: string) {
  if (id === 'active-guests') showActiveGuests.value = true
  if (id === 'avg-response') showAvgResponse.value = true
}

function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const newAttachments = Array.from(target.files).map(file => URL.createObjectURL(file))
    attachments.value.push(...newAttachments)
  }
}

function removeAttachment(index: number) {
  attachments.value.splice(index, 1)
}

function updateTicketStatus(newStatus: any) {
  if (selectedTicket.value && typeof newStatus === 'string') {
    const updated = { ...selectedTicket.value, status: newStatus }
    selectedTicket.value = updated
    const idx = tickets.value.findIndex(t => t.id === updated.id)
    if (idx > -1) {
      tickets.value.splice(idx, 1, { ...tickets.value[idx]!, status: newStatus })
    }
  }
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const mobileNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'emergency', label: 'Alerts', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', icon: Settings },
]
</script>

<template>
  <!-- LOGIN -->
  <div v-if="!isLoggedIn" class="flex h-screen bg-background items-center justify-center p-4" :style="{ fontFamily: config.fontFamily }">
    <Card class="w-full max-w-md p-8">
      <div class="flex flex-col items-center mb-8">
        <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">S</div>
        <h1 class="text-2xl font-bold tracking-tight">Staff Portal</h1>
        <p class="text-muted-foreground text-sm mt-1">Sign in to access the dashboard</p>
      </div>
      <form class="space-y-4" @submit="handleLogin">
        <div>
          <label class="block text-sm font-medium mb-2">Username</label>
          <Input v-model="username" type="text" placeholder="nikolas.k@sentineltech.com" class="rounded-xl" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <Input v-model="password" type="password" placeholder="••••••••" class="rounded-xl" />
        </div>
        <p v-if="loginError" class="text-sm text-destructive">{{ loginError }}</p>
        <Button type="submit" class="w-full py-3 h-auto mt-4">Sign In</Button>
      </form>
    </Card>
  </div>

  <!-- DASHBOARD -->
  <div v-else class="flex h-screen bg-background overflow-hidden" :style="{ fontFamily: config.fontFamily }">
    <!-- Sidebar Desktop -->
    <aside class="hidden md:flex w-64 border-r border-border p-6 flex-col">
      <div class="flex items-center gap-3 mb-10 px-2">
        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs">S</div>
        <h1 class="font-bold text-lg tracking-tight">Sentec Staff</h1>
      </div>

      <nav class="flex-1 space-y-2">
        <button
          v-for="item in sidebarItems"
          :key="item.id"
          :class="cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
            activeTab === item.id ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )"
          @click="activeTab = item.id"
        >
          <component :is="item.icon" :size="20" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <div class="pt-6 border-t border-border space-y-2">
        <button
          :class="cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
            activeTab === 'settings' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )"
          @click="activeTab = 'settings'"
        >
          <Settings :size="20" />
          <span class="font-medium">Settings</span>
        </button>
        <div class="flex items-center gap-3 px-4 py-3">
          <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold">NK</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold truncate">Nikolas K.</p>
            <p class="text-[10px] text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden w-full">
      <!-- Header -->
      <header class="h-16 md:h-20 border-b border-border px-4 md:px-8 flex items-center justify-between bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div class="flex items-center gap-3 md:hidden">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs">S</div>
          <h2 class="text-lg font-semibold capitalize">{{ activeTab }}</h2>
        </div>
        <h2 class="text-xl font-semibold capitalize hidden md:block">{{ activeTab }}</h2>

        <div class="flex items-center gap-3 md:gap-5">
          <span class="text-sm font-medium text-muted-foreground hidden sm:inline">{{ currentDate }}</span>
          <div class="relative hidden md:block">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" :size="18" />
            <Input type="text" placeholder="Search guests, rooms..." class="pl-10 pr-4 py-2 bg-secondary rounded-full border-none text-sm w-64" />
          </div>
          <button class="md:hidden p-2 text-muted-foreground"><Search :size="20" /></button>
          <button class="p-2 text-muted-foreground hover:text-foreground relative">
            <Bell :size="20" />
            <div class="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <button class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-muted transition-colors">NK</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <div class="p-3">
                <p class="font-semibold text-sm">Nikolas K.</p>
                <p class="text-xs text-muted-foreground">nikolas.k@sentineltech.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="activeTab = 'user-management'">User Access Management</DropdownMenuItem>
              <DropdownMenuItem class="text-destructive focus:text-destructive" @click="handleLogout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">

        <!-- OVERVIEW -->
        <div v-if="activeTab === 'overview'" class="space-y-8 pb-20 md:pb-0">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card
              v-for="stat in overviewStats"
              :key="stat.id"
              :class="cn('p-6', (stat.id === 'active-guests' || stat.id === 'avg-response') && 'cursor-pointer hover:border-primary transition-colors')"
              @click="handleStatClick(stat.id)"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="p-2 bg-secondary rounded-lg">
                  <component :is="stat.icon" :size="20" class="text-foreground" />
                </div>
                <Badge :variant="stat.change.startsWith('+') ? 'default' : 'secondary'">{{ stat.change }}</Badge>
              </div>
              <h3 class="text-muted-foreground text-sm font-medium mb-1">{{ stat.label }}</h3>
              <p class="text-2xl font-semibold">{{ stat.value }}</p>
            </Card>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card class="col-span-1 lg:col-span-2 p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-lg">Recent Service Tickets</h3>
                <Button variant="ghost" size="sm" @click="activeTab = 'tickets'">View All</Button>
              </div>
              <div class="space-y-4">
                <div
                  v-for="ticket in recentTickets"
                  :key="ticket.id"
                  class="flex items-center justify-between p-4 bg-background rounded-xl border border-border cursor-pointer hover:bg-secondary transition-colors"
                  @click="activeTab = 'tickets'"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                      {{ ticket.room }}
                    </div>
                    <div>
                      <h4 class="font-semibold text-sm">{{ ticket.request }}</h4>
                      <p class="text-xs text-muted-foreground">{{ ticket.guest }} • {{ ticket.time }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 md:gap-4">
                    <Badge :variant="getStatusVariant(ticket.status)">{{ ticket.status }}</Badge>
                    <ChevronRight :size="16" class="text-muted-foreground/50 hidden sm:block" />
                  </div>
                </div>
              </div>
            </Card>

            <Card class="p-6 bg-[#FFF2F2] border-[#FFE5E5]">
              <div class="flex items-center gap-2 text-destructive mb-6">
                <AlertTriangle :size="20" />
                <h3 class="font-semibold text-lg">Emergency Console</h3>
              </div>
              <div class="space-y-4">
                <div class="p-4 bg-white rounded-xl border border-[#FFE5E5] shadow-sm">
                  <div class="flex justify-between items-start mb-2">
                    <Badge variant="destructive">High Priority</Badge>
                    <span class="text-[10px] font-bold text-destructive uppercase">Active Now</span>
                  </div>
                  <h4 class="font-bold text-sm mb-1">Medical Emergency</h4>
                  <p class="text-xs text-muted-foreground mb-4">Room 402 • Guest: Nikolas K.</p>
                  <Button variant="destructive" class="w-full py-2 h-auto text-sm">Acknowledge &amp; Dispatch</Button>
                </div>
                <p class="text-center text-[11px] text-muted-foreground">No other active emergencies.</p>
              </div>
            </Card>
          </div>

          <!-- Active Guests Modal -->
          <Dialog v-model:open="showActiveGuests">
            <DialogContent class="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>In-House Guests (PMS)</DialogTitle>
              </DialogHeader>
              <ScrollArea class="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-In</TableHead>
                      <TableHead>Check-Out</TableHead>
                      <TableHead>Room Type</TableHead>
                      <TableHead>VIP</TableHead>
                      <TableHead>Unfinished Requests</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="(g, i) in mockGuests" :key="i">
                      <TableCell class="font-medium">{{ g.name }}</TableCell>
                      <TableCell>{{ g.room }}</TableCell>
                      <TableCell class="text-muted-foreground">{{ g.checkIn }}</TableCell>
                      <TableCell class="text-muted-foreground">{{ g.checkOut }}</TableCell>
                      <TableCell>{{ g.type }}</TableCell>
                      <TableCell>
                        <Badge v-if="g.vip" variant="default">VIP</Badge>
                        <span v-else>-</span>
                      </TableCell>
                      <TableCell>
                        <Badge v-if="g.unfinishedRequests > 0" variant="outline">{{ g.unfinishedRequests }} Active</Badge>
                        <span v-else class="text-sm text-muted-foreground">None</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <!-- Average Response Modal -->
          <Dialog v-model:open="showAvgResponse">
            <DialogContent class="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Average Response Report</DialogTitle>
              </DialogHeader>
              <div class="flex gap-4 bg-secondary p-4 rounded-lg">
                <Input placeholder="Filter by Guest Name..." class="flex-1" />
                <Select>
                  <SelectTrigger class="flex-1"><SelectValue placeholder="All Departments" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger class="flex-1"><SelectValue placeholder="All Staff" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Staff</SelectItem>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea class="flex-1 mt-4">
                <div class="space-y-4">
                  <div
                    v-for="(r, i) in [
                      { dept: 'Housekeeping', staff: 'Jane Smith', guest: 'Nikolas K.', time: '3.5m', target: '5m' },
                      { dept: 'Maintenance', staff: 'John Doe', guest: 'Sarah M.', time: '12m', target: '15m' },
                    ]"
                    :key="i"
                    class="flex items-center justify-between p-4 border border-border rounded-xl"
                  >
                    <div>
                      <h4 class="font-semibold">{{ r.dept }}</h4>
                      <p class="text-xs text-muted-foreground">Staff: {{ r.staff }} • Guest: {{ r.guest }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-lg">{{ r.time }}</p>
                      <p class="text-xs text-muted-foreground">Target: {{ r.target }}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <!-- INBOX -->
        <div v-else-if="activeTab === 'inbox'" class="flex h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] gap-6 relative">
          <!-- Chat List -->
          <Card :class="cn(
            'flex flex-col overflow-hidden transition-all duration-300 absolute md:relative inset-0 md:inset-auto md:w-80 z-10',
            showMobileChat ? '-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'translate-x-0 opacity-100'
          )">
            <div class="p-4 border-b border-border">
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" :size="16" />
                <Input type="text" placeholder="Search chats..." class="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg border-none text-sm" />
              </div>
            </div>
            <ScrollArea class="flex-1">
              <button
                v-for="chat in chatList"
                :key="chat.id"
                :class="cn(
                  'w-full p-4 text-left border-b border-secondary transition-colors',
                  selectedChat === chat.id ? 'bg-secondary' : 'hover:bg-background'
                )"
                @click="handleChatSelect(chat.id)"
              >
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-semibold text-sm">{{ chat.name }}</h4>
                  <span class="text-[10px] text-muted-foreground">{{ chat.time }}</span>
                </div>
                <p class="text-xs text-muted-foreground truncate mb-1">Room {{ chat.room }} • {{ chat.lastMsg }}</p>
                <div v-if="chat.unread" class="w-2 h-2 bg-[#007AFF] rounded-full" />
              </button>
            </ScrollArea>
          </Card>

          <!-- Chat Detail -->
          <Card :class="cn(
            'flex-1 flex flex-col overflow-hidden absolute md:relative inset-0 md:inset-auto z-20 transition-all duration-300 bg-card',
            showMobileChat ? 'translate-x-0 opacity-100' : 'translate-x-full md:translate-x-0 md:opacity-100 pointer-events-none md:pointer-events-auto'
          )">
            <div class="p-4 border-b border-border flex justify-between items-center">
              <div class="flex items-center gap-3">
                <button class="md:hidden p-2 -ml-2 text-muted-foreground" @click="handleBackToInbox">
                  <ArrowLeft :size="20" />
                </button>
                <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold shrink-0">NK</div>
                <div>
                  <h4 class="font-semibold text-sm">Nikolas K.</h4>
                  <p class="text-[10px] text-muted-foreground uppercase tracking-wider">Room 402 • Checked in Mar 01</p>
                </div>
              </div>
              <div class="flex gap-2">
                <Button variant="ghost" size="sm" class="md:hidden" @click="showGuestInfo = !showGuestInfo">
                  <User :size="16" />
                </Button>
                <Button variant="ghost" size="sm" class="hidden md:flex" @click="activeTab = 'tickets'">
                  <Ticket :size="16" class="mr-2" /> Create Ticket
                </Button>
                <Button variant="ghost" size="sm"><MoreHorizontal :size="16" /></Button>
              </div>
            </div>
            <ScrollArea class="flex-1 bg-background p-6">
              <div class="space-y-4">
                <div class="flex justify-center"><Badge variant="secondary">Today</Badge></div>
                <div class="flex flex-col items-start max-w-[85%] md:max-w-[70%]">
                  <div class="bg-card border border-border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm">
                    Welcome to The Grand Sentec! How can we help you today?
                  </div>
                  <span class="text-[10px] text-muted-foreground mt-1">10:00 AM</span>
                </div>
                <div class="flex flex-col items-end ml-auto max-w-[85%] md:max-w-[70%]">
                  <div class="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                    Can I get some extra towels?
                  </div>
                  <span class="text-[10px] text-muted-foreground mt-1">10:05 AM</span>
                </div>
              </div>
            </ScrollArea>
            <div class="p-4 border-t border-border flex gap-3 mb-16 md:mb-0">
              <Input type="text" placeholder="Type a response..." class="flex-1 bg-secondary border-none rounded-xl px-4 py-2 text-sm" />
              <Button size="sm" class="px-4"><Send :size="16" /></Button>
            </div>
          </Card>

          <!-- Guest Info Desktop -->
          <Card class="w-64 p-4 space-y-6 hidden md:block">
            <div>
              <h5 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Guest Info</h5>
              <div class="space-y-3">
                <div class="flex justify-between text-xs"><span class="text-muted-foreground">Nationality</span><span class="font-medium">Greek</span></div>
                <div class="flex justify-between text-xs"><span class="text-muted-foreground">Language</span><span class="font-medium">English (Primary)</span></div>
                <div class="flex justify-between text-xs"><span class="text-muted-foreground">VIP Status</span><Badge variant="default">Gold Member</Badge></div>
              </div>
            </div>
            <Separator />
            <div>
              <h5 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Actions</h5>
              <div class="space-y-2">
                <Button variant="secondary" class="w-full justify-start text-xs py-2 px-3 h-auto"><Ticket :size="14" class="mr-2" /> Create Ticket</Button>
                <Button variant="secondary" class="w-full justify-start text-xs py-2 px-3 h-auto"><User :size="14" class="mr-2" /> View Profile</Button>
              </div>
            </div>
          </Card>

          <!-- Guest Info Mobile Overlay -->
          <Transition name="slide-up">
            <div v-if="showGuestInfo" class="absolute inset-0 z-30 bg-card md:hidden p-6 overflow-y-auto">
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-lg">Guest Details</h3>
                <button class="p-2 bg-secondary rounded-full" @click="showGuestInfo = false"><X :size="20" /></button>
              </div>
              <div class="space-y-6">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center font-bold text-xl">NK</div>
                  <div>
                    <h4 class="font-semibold text-lg">Nikolas K.</h4>
                    <p class="text-sm text-muted-foreground">Room 402</p>
                  </div>
                </div>
                <div>
                  <h5 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Guest Info</h5>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm"><span class="text-muted-foreground">Nationality</span><span class="font-medium">Greek</span></div>
                    <div class="flex justify-between text-sm"><span class="text-muted-foreground">Language</span><span class="font-medium">English (Primary)</span></div>
                    <div class="flex justify-between text-sm"><span class="text-muted-foreground">VIP Status</span><Badge variant="default">Gold Member</Badge></div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h5 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Actions</h5>
                  <div class="space-y-3">
                    <Button variant="secondary" class="w-full justify-start py-3 h-auto px-4"><Ticket :size="16" class="mr-3" /> Create Ticket</Button>
                    <Button variant="secondary" class="w-full justify-start py-3 h-auto px-4"><User :size="16" class="mr-3" /> View Full Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- TICKETS -->
        <div v-else-if="activeTab === 'tickets'" class="space-y-6">
          <!-- New Ticket Form -->
          <template v-if="showNewTicket">
            <Card class="p-6">
              <div class="flex items-center gap-4 mb-6">
                <button class="p-2 hover:bg-secondary rounded-full transition-colors" @click="showNewTicket = false"><ArrowLeft :size="20" /></button>
                <h2 class="text-xl font-semibold">Create New Ticket</h2>
              </div>
              <div class="space-y-4 max-w-2xl">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Guest Name / Room</label>
                    <Input placeholder="e.g. Nikolas K. - 402" class="rounded-xl bg-secondary border-none" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Ticket Type</label>
                    <Select>
                      <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="request">Request</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Description</label>
                  <Textarea class="rounded-xl bg-secondary border-none h-32" placeholder="Describe the issue or request..." />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Assign Department</label>
                    <Select v-model="assignDept">
                      <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue placeholder="Select Department" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem v-for="d in departments" :key="d" :value="d">{{ d }}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Assign Staff</label>
                    <Select v-model="assignStaff">
                      <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue placeholder="Select Staff" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem v-for="s in availableStaff" :key="s" :value="s">{{ s }}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div class="pt-4 flex justify-end gap-3">
                  <Button variant="ghost" @click="showNewTicket = false">Cancel</Button>
                  <Button @click="showNewTicket = false">Create Ticket</Button>
                </div>
              </div>
            </Card>
          </template>

          <!-- Ticket Detail -->
          <template v-else-if="selectedTicket">
            <Card class="p-6">
              <div class="flex items-center gap-4 mb-6">
                <button class="p-2 hover:bg-secondary rounded-full transition-colors" @click="selectedTicket = null; attachments = []; ticketRemarks = ''">
                  <ArrowLeft :size="20" />
                </button>
                <h2 class="text-xl font-semibold">Ticket Details: {{ selectedTicket.id }}</h2>
                <div class="ml-auto flex items-center gap-3">
                  <span class="text-sm font-medium text-muted-foreground">Status:</span>
                  <Select :model-value="selectedTicket.status" @update:model-value="updateTicketStatus">
                    <SelectTrigger class="w-auto rounded-lg bg-secondary border-none text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge :variant="getStatusVariant(selectedTicket.status)">{{ selectedTicket.status }}</Badge>
                </div>
              </div>

              <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2 space-y-6">
                  <div class="bg-secondary p-4 rounded-xl">
                    <h3 class="font-semibold mb-2">Request Information</h3>
                    <p class="text-lg">{{ selectedTicket.request }}</p>
                    <div class="flex gap-4 mt-4 text-sm text-muted-foreground">
                      <span>Submitted: {{ selectedTicket.submitted }}</span>
                      <span>Completed: {{ selectedTicket.completed }}</span>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-semibold mb-4">Assignment</h3>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-1">Department</label>
                        <Select v-model="assignDept">
                          <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue :placeholder="selectedTicket.dept || 'Select Department'" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem v-for="d in departments" :key="d" :value="d">{{ d }}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Staff</label>
                        <Select v-model="assignStaff">
                          <SelectTrigger class="rounded-xl bg-secondary border-none"><SelectValue :placeholder="selectedTicket.staff || 'Select Staff'" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem v-for="s in availableStaff" :key="s" :value="s">{{ s }}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div class="mt-4"><Button>Update Assignment</Button></div>
                  </div>

                  <Separator />

                  <div>
                    <h3 class="font-semibold mb-4">Remarks &amp; Attachments</h3>
                    <Textarea v-model="ticketRemarks" class="rounded-xl bg-secondary border-none h-24 mb-4" placeholder="Add remarks or notes here..." />
                    <div class="flex flex-wrap gap-4 mb-4">
                      <div v-for="(url, i) in attachments" :key="i" class="relative w-24 h-24 rounded-xl overflow-hidden border border-border">
                        <img :src="url" :alt="'Attachment ' + i" class="w-full h-full object-cover" />
                        <button class="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70" @click="removeAttachment(i)">
                          <X :size="12" />
                        </button>
                      </div>
                      <label class="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl cursor-pointer hover:border-muted-foreground hover:bg-secondary transition-colors">
                        <span class="text-2xl text-muted-foreground">+</span>
                        <span class="text-xs text-muted-foreground mt-1">Add Photo</span>
                        <input type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload" />
                      </label>
                    </div>
                    <Button>Save Remarks</Button>
                  </div>
                </div>

                <div>
                  <div class="bg-background p-4 rounded-xl border border-border">
                    <h3 class="font-semibold mb-4">Guest Details</h3>
                    <div class="space-y-3 text-sm">
                      <div><span class="text-muted-foreground block">Name</span><span class="font-medium">{{ selectedTicket.guest }}</span></div>
                      <div><span class="text-muted-foreground block">Room</span><span class="font-medium">{{ selectedTicket.room }}</span></div>
                      <div><span class="text-muted-foreground block">VIP Status</span><Badge variant="secondary">Gold</Badge></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </template>

          <!-- Ticket List -->
          <template v-else>
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold">Service Tickets</h2>
              <Button @click="showNewTicket = true">
                <Ticket :size="16" class="mr-2" /> New Ticket
              </Button>
            </div>

            <Card class="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow class="bg-secondary">
                    <TableHead>ID</TableHead>
                    <TableHead>Guest / Room</TableHead>
                    <TableHead>Request</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Assigned To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="ticket in tickets"
                    :key="ticket.id"
                    class="cursor-pointer hover:bg-background transition-colors"
                    @click="selectedTicket = ticket"
                  >
                    <TableCell class="font-medium">{{ ticket.id }}</TableCell>
                    <TableCell>
                      <div class="font-medium">{{ ticket.guest }}</div>
                      <div class="text-xs text-muted-foreground">Room {{ ticket.room }}</div>
                    </TableCell>
                    <TableCell>{{ ticket.request }}</TableCell>
                    <TableCell><Badge :variant="getStatusVariant(ticket.status)">{{ ticket.status }}</Badge></TableCell>
                    <TableCell class="text-muted-foreground">{{ ticket.submitted }}</TableCell>
                    <TableCell class="text-muted-foreground">{{ ticket.completed }}</TableCell>
                    <TableCell>
                      <div class="font-medium">{{ ticket.dept }}</div>
                      <div class="text-xs text-muted-foreground">{{ ticket.staff || 'Unassigned' }}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </template>
        </div>

        <!-- SETTINGS -->
        <div v-else-if="activeTab === 'settings'" class="space-y-6">
          <h2 class="text-2xl font-semibold">Settings</h2>
          <div class="flex gap-4 border-b border-border">
            <button
              v-for="tab in ['departments', 'slas', 'ticket-types']"
              :key="tab"
              :class="cn(
                'px-4 py-2 font-medium text-sm capitalize transition-colors border-b-2',
                settingsTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )"
              @click="settingsTab = tab"
            >
              {{ tab.replace('-', ' ') }}
            </button>
          </div>

          <Card class="p-6">
            <!-- Departments -->
            <template v-if="settingsTab === 'departments'">
              <div class="space-y-4">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="font-semibold text-lg">Departments</h3>
                  <Button size="sm">Add Department</Button>
                </div>
                <div class="grid gap-4">
                  <div v-for="dept in departments" :key="dept" class="flex justify-between items-center p-4 border border-border rounded-xl">
                    <span class="font-medium">{{ dept }}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </template>

            <!-- SLAs -->
            <template v-else-if="settingsTab === 'slas'">
              <div class="space-y-4">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="font-semibold text-lg">Service Level Agreements (SLAs)</h3>
                  <Button size="sm">Add SLA</Button>
                </div>
                <div class="grid gap-4">
                  <div v-for="sla in [{ type: 'Urgent Request', time: '5 mins' }, { type: 'Standard Request', time: '15 mins' }, { type: 'Maintenance Issue', time: '30 mins' }]" :key="sla.type" class="flex justify-between items-center p-4 border border-border rounded-xl">
                    <div>
                      <span class="font-medium block">{{ sla.type }}</span>
                      <span class="text-sm text-muted-foreground">Target: {{ sla.time }}</span>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </template>

            <!-- Ticket Types -->
            <template v-else>
              <div class="space-y-4">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="font-semibold text-lg">Ticket Types</h3>
                  <Button size="sm">Add Type</Button>
                </div>
                <div class="grid gap-4">
                  <div v-for="type in ['Request', 'Complaint', 'Maintenance', 'Inquiry']" :key="type" class="flex justify-between items-center p-4 border border-border rounded-xl">
                    <span class="font-medium">{{ type }}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- USER MANAGEMENT -->
        <div v-else-if="activeTab === 'user-management'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">User Access Management</h2>
            <Button>Add User</Button>
          </div>
          <Card class="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow class="bg-secondary">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="(user, i) in [
                    { name: 'Nikolas K.', email: 'nikolas.k@sentineltech.com', role: 'Admin', dept: 'All' },
                    { name: 'Jane Smith', email: 'jane.s@sentineltech.com', role: 'Dept Head', dept: 'Housekeeping' },
                    { name: 'John Doe', email: 'john.d@sentineltech.com', role: 'Dept Agent', dept: 'Maintenance' },
                  ]"
                  :key="i"
                  class="hover:bg-background transition-colors"
                >
                  <TableCell class="font-medium">{{ user.name }}</TableCell>
                  <TableCell class="text-muted-foreground">{{ user.email }}</TableCell>
                  <TableCell><Badge variant="secondary">{{ user.role }}</Badge></TableCell>
                  <TableCell>{{ user.dept }}</TableCell>
                  <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>

        <!-- ANALYTICS -->
        <div v-else-if="activeTab === 'analytics'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Analytics &amp; SLAs</h2>
            <div class="flex bg-secondary rounded-lg p-1">
              <button
                v-for="f in ['department', 'staff', 'guest']"
                :key="f"
                :class="cn(
                  'px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors',
                  analyticsFilter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )"
                @click="analyticsFilter = f"
              >
                {{ f }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card class="p-6">
              <h3 class="text-muted-foreground text-sm font-medium mb-1">Total Requests</h3>
              <p class="text-3xl font-semibold">759</p>
              <Progress :model-value="85" class="mt-4" />
              <p class="text-xs text-muted-foreground mt-2">85% SLA Met Rate</p>
            </Card>
            <Card class="p-6">
              <h3 class="text-muted-foreground text-sm font-medium mb-1">Avg. Resolution Time</h3>
              <p class="text-3xl font-semibold">14.2m</p>
              <div class="mt-4 flex items-center gap-2 text-sm">
                <Badge variant="default">-1.5m</Badge>
                <span class="text-muted-foreground">vs last week</span>
              </div>
            </Card>
            <Card class="p-6">
              <h3 class="text-muted-foreground text-sm font-medium mb-1">Missed SLAs</h3>
              <p class="text-3xl font-semibold text-destructive">54</p>
              <div class="mt-4 flex items-center gap-2 text-sm">
                <Badge variant="destructive">+12</Badge>
                <span class="text-muted-foreground">vs last week</span>
              </div>
            </Card>
          </div>

          <Card class="overflow-hidden">
            <div class="p-6 border-b border-border flex justify-between items-center">
              <h3 class="font-semibold text-lg capitalize">{{ analyticsFilter }} Performance</h3>
              <Button variant="ghost" size="sm"><Filter :size="16" class="mr-2" /> Filter</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow class="bg-secondary">
                  <TableHead class="capitalize">{{ analyticsFilter }}</TableHead>
                  <TableHead>Total Requests</TableHead>
                  <TableHead>SLA Met</TableHead>
                  <TableHead>SLA Missed</TableHead>
                  <TableHead>Avg. Time</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in currentAnalyticsData" :key="row.id" class="hover:bg-background transition-colors">
                  <TableCell class="font-medium">{{ row.type }}</TableCell>
                  <TableCell>{{ row.total }}</TableCell>
                  <TableCell class="text-[#248A3D]">{{ row.met }}</TableCell>
                  <TableCell class="text-destructive">{{ row.missed }}</TableCell>
                  <TableCell class="font-medium">{{ row.avgTime }}</TableCell>
                  <TableCell class="text-muted-foreground">{{ row.target }}</TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden w-24">
                        <div
                          :class="cn(
                            'h-full rounded-full',
                            Math.round((row.met / row.total) * 100) >= 90 ? 'bg-[#248A3D]' :
                            Math.round((row.met / row.total) * 100) >= 75 ? 'bg-warning' : 'bg-destructive'
                          )"
                          :style="{ width: Math.round((row.met / row.total) * 100) + '%' }"
                        />
                      </div>
                      <span class="text-xs font-medium w-8">{{ Math.round((row.met / row.total) * 100) }}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>

        <!-- EMERGENCY / Placeholder -->
        <div v-else class="flex flex-col items-center justify-center h-full text-center">
          <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard :size="32" class="text-muted-foreground/50" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Module Under Construction</h3>
          <p class="text-muted-foreground max-w-xs">We're currently refining this module to meet Apple's design standards.</p>
        </div>
      </div>
    </main>

    <!-- Mobile Bottom Nav -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-2 flex justify-between items-center z-50 pb-4">
      <button
        v-for="item in mobileNavItems"
        :key="item.id"
        :class="cn(
          'flex flex-col items-center justify-center p-2 transition-all duration-200',
          activeTab === item.id ? 'text-foreground' : 'text-muted-foreground'
        )"
        @click="activeTab = item.id"
      >
        <component :is="item.icon" :size="24" :class="cn('mb-1', activeTab === item.id && 'fill-current')" />
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

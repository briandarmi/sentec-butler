<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { User, ShieldCheck, Settings, ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const roles = [
  { id: 'guest', label: 'Guest App', icon: User, path: '/guest' },
  { id: 'staff', label: 'Staff Dashboard', icon: ShieldCheck, path: '/staff' },
  { id: 'admin', label: 'Admin Portal', icon: Settings, path: '/admin' },
]

const currentRole = computed(() => {
  const path = route.path
  return roles.find(r => path.startsWith(r.path)) ?? roles[0]!
})
</script>

<template>
  <div class="min-h-screen relative">
    <NuxtRouteAnnouncer />

    <!-- Role Switcher (Demo Only) -->
    <div class="fixed top-4 left-4 z-[100]">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-border rounded-full shadow-lg hover:bg-white transition-all"
          >
            <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <component :is="currentRole.icon" :size="14" />
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-foreground">
              {{ currentRole.id }} View
            </span>
            <ChevronDown :size="14" class="transition-transform" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="w-48">
          <DropdownMenuItem
            v-for="r in roles"
            :key="r.id"
            :class="cn(
              'gap-3 cursor-pointer',
              currentRole.id === r.id ? 'bg-secondary text-foreground' : 'text-muted-foreground'
            )"
            @click="router.push(r.path)"
          >
            <component :is="r.icon" :size="16" />
            {{ r.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Main Application Views -->
    <main class="w-full h-full">
      <NuxtPage />
    </main>
  </div>
</template>

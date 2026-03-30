import type { Component, InjectionKey, Ref } from "vue"
import { inject, provide } from "vue"

export { default as ChartContainer } from "./ChartContainer.vue"
export { default as ChartLegendContent } from "./ChartLegendContent.vue"
export { default as ChartStyle } from "./ChartStyle.vue"
export { default as ChartTooltipContent } from "./ChartTooltipContent.vue"

export type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: Component
    color?: string
    theme?: Record<string, string>
  }
>

export const THEMES = {
  light: "",
  dark: ".dark",
} as const

interface ChartContext {
  id: string
  config: Ref<ChartConfig>
}

const CHART_INJECTION_KEY = Symbol("chart") as InjectionKey<ChartContext>

export function provideChartContext(context: ChartContext) {
  provide(CHART_INJECTION_KEY, context)
}

export function useChart() {
  const context = inject(CHART_INJECTION_KEY)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

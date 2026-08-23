<template>
  <span
    class="tag-badge"
    :class="colorClass"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  label: string
  color?: string
  variant?: 'filled' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green',
  variant: 'filled',
})

const colorClass = computed(() => {
  const colorMap: Record<string, string> = {
    green: 'bg-brand-green/10 text-brand-green border border-brand-green/20',
    'green-light': 'bg-green-100 text-green-700 border border-green-200',
    gold: 'bg-amber-100 text-amber-800 border border-amber-200',
    blue: 'bg-blue-100 text-blue-700 border border-blue-200',
    maroon: 'bg-red-100 text-red-800 border border-red-200',
    teal: 'bg-teal-100 text-teal-700 border border-teal-200',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    orange: 'bg-orange-100 text-orange-700 border border-orange-200',
    brown: 'bg-amber-100 text-amber-900 border border-amber-300',
    new: 'bg-emerald-500 text-white border-0',
    featured: 'bg-brand-gold text-white border-0',
  }
  return colorMap[props.color] || colorMap.green
})
</script>

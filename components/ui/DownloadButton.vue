<template>
  <a
    :href="zipPath"
    :download="filename"
    class="inline-flex items-center gap-2 bg-gradient-to-r from-brand-green to-brand-green-light text-white px-6 py-3 rounded-xl font-semibold text-sm
      hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-0.5 active:translate-y-0
      transition-all duration-300 shadow-lg shadow-brand-green/20 group"
    @click="handleDownload"
  >
    <Icon name="heroicons:arrow-down-tray" class="text-base group-hover:animate-bounce" />
    Download ZIP
  </a>
</template>

<script setup lang="ts">
interface Props {
  zipPath: string
  templateName: string
}

const props = defineProps<Props>()
const emit = defineEmits(['downloaded'])

const filename = computed(() => `${props.templateName.replace(/\s+/g, '-').toLowerCase()}.zip`)

const handleDownload = () => {
  emit('downloaded', props.templateName)
}
</script>

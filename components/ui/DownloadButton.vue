<template>
  <a
    :href="zipPath"
    :download="filename"
    class="w-full py-3 px-4 rounded-xl bg-[#0A5C4F] text-white font-extrabold text-xs hover:bg-[#F4C430] hover:text-[#0A5C4F] hover:shadow-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-sans active:translate-y-0.5"
    @click="handleDownload"
  >
    <span class="material-symbols-outlined text-[18px]">download</span>
    <span>Download Source Code (ZIP)</span>
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

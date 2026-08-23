<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Icon name="heroicons:magnifying-glass" class="text-gray-400 text-sm" />
    </div>
    <input
      :id="id"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400
        focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all duration-200"
      @keyup.enter="$emit('search', inputValue)"
      @input="$emit('update:modelValue', inputValue)"
    />
    <button
      v-if="inputValue"
      class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
      @click="clear"
    >
      <Icon name="heroicons:x-mark" class="text-sm" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Cari...',
  id: 'search-input',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

const clear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

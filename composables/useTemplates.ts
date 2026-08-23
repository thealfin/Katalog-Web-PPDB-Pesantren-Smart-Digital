import { useTemplatesStore } from '~/stores/templates'

export const useTemplates = () => {
  const store = useTemplatesStore()

  const fetchTemplates = async () => {
    await store.fetchTemplates()
  }

  const setFilter = (key: any, value: string) => {
    store.setFilter(key, value)
  }

  const resetFilters = () => {
    store.resetFilters()
  }

  return {
    templates: computed(() => store.templates),
    filteredTemplates: computed(() => store.filteredTemplates),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    filters: computed(() => store.filters),
    fetchTemplates,
    setFilter,
    resetFilters,
  }
}

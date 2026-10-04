import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface Template {
  id: string | number
  slug: string
  name: string
  description: string
  theme: string
  colorPrimary: string
  colorScheme: string
  style: string
  pages?: number
  features: string[]
  tags: string[]
  previewUrl: string
  previewImage: string
  zipPath?: string
  zipUrl?: string
  createdAt: string
  isNew: boolean
  isFeatured: boolean
  updatedAt?: string
}

export interface FilterState {
  search: string
  colorScheme: string
  style: string
  theme: string
  sortBy: 'all' | 'newest' | 'featured'
}

export const useTemplatesStore = defineStore('templates', {
  state: () => ({
    templates: [] as Template[],
    loading: false,
    error: null as string | null,
    filters: {
      search: '',
      colorScheme: '',
      style: '',
      theme: '',
      sortBy: 'all',
    } as FilterState,
  }),

  getters: {
    filteredTemplates: (state) => {
      let result = [...state.templates]

      // Search filter
      if (state.filters.search) {
        const q = state.filters.search.toLowerCase()
        result = result.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
            t.theme.toLowerCase().includes(q),
        )
      }

      // Color scheme filter
      if (state.filters.colorScheme) {
        result = result.filter((t) => t.colorScheme === state.filters.colorScheme)
      }

      // Style filter
      if (state.filters.style) {
        result = result.filter((t) => t.style === state.filters.style)
      }

      // Default Sort by Date (Newest first)
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt || '2000-01-01').getTime()
        const dateB = new Date(b.createdAt || '2000-01-01').getTime()
        if (dateB !== dateA) return dateB - dateA
        return b.id.localeCompare(a.id)
      })

      // Sort
      if (state.filters.sortBy === 'newest') {
        result = result.filter((t) => t.isNew)
      } else if (state.filters.sortBy === 'featured') {
        result = result.filter((t) => t.isFeatured)
      }

      return result
    },

    totalTemplates: (state) => state.templates.length,
    totalColorSchemes: (state) => new Set(state.templates.map((t) => t.colorScheme)).size,
    featuredTemplates: (state) => state.templates.filter((t) => t.isFeatured),
    newTemplates: (state) => state.templates.filter((t) => t.isNew),

    templateBySlug: (state) => (slug: string) =>
      state.templates.find((t) => t.slug === slug),

    templateIndex: (state) => (slug: string) =>
      state.templates.findIndex((t) => t.slug === slug),
  },

  actions: {
    async fetchTemplates() {
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<Template[]>('/api/templates')
        this.templates = data
      } catch (e: any) {
        this.error = e?.message || 'Gagal memuat template'
      } finally {
        this.loading = false
      }
    },

    setFilter(key: keyof FilterState, value: string) {
      this.filters[key] = value as any
    },

    resetFilters() {
      this.filters = {
        search: '',
        colorScheme: '',
        style: '',
        theme: '',
        sortBy: 'all',
      }
    },

    async deleteTemplate(slug: string) {
      const authStore = useAuthStore()
      try {
        await $fetch(`/api/templates/${slug}`, {
          method: 'DELETE',
          headers: authStore.authHeaders,
        })
        this.templates = this.templates.filter((t) => t.slug !== slug)
        return { success: true }
      } catch (e: any) {
        return { success: false, message: e?.data?.message || 'Gagal menghapus template' }
      }
    },
  },
})

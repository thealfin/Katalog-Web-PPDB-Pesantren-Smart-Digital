export interface OptionItem {
  value: string
  label: string
}

const DEFAULT_COLOR_SCHEMES: OptionItem[] = [
  { value: 'green', label: 'Hijau (Green)' },
  { value: 'blue', label: 'Biru (Blue)' },
  { value: 'gold', label: 'Emas (Gold)' },
  { value: 'maroon', label: 'Marun (Maroon)' },
  { value: 'teal', label: 'Tosca (Teal)' },
  { value: 'gray', label: 'Abu-abu (Gray)' },
  { value: 'purple', label: 'Ungu (Purple)' },
  { value: 'orange', label: 'Oranye (Orange)' },
  { value: 'brown', label: 'Coklat (Brown)' },
  { value: 'slate', label: 'Slate / Lavender' },
  { value: 'emerald', label: 'Emerald Mewah' },
  { value: 'neon', label: 'Neon Cyber' },
  { value: 'white', label: 'Putih Bersih' },
]

const DEFAULT_DESIGN_STYLES: OptionItem[] = [
  { value: 'minimal', label: 'Minimalist' },
  { value: 'classic', label: 'Classic Islamic' },
  { value: 'modern', label: 'Modern Glass' },
  { value: 'formal', label: 'Executive Formal' },
  { value: 'premium', label: 'Exclusive Premium' },
  { value: 'futuristic', label: 'Cyber Futuristic' },
]

// State global reaktif yang tersinkronisasi
const colorSchemes = ref<OptionItem[]>([...DEFAULT_COLOR_SCHEMES])
const designStyles = ref<OptionItem[]>([...DEFAULT_DESIGN_STYLES])
let initialized = false

export const useTemplateTaxonomy = () => {
  const initTaxonomy = () => {
    if (!process.client || initialized) return
    initialized = true

    try {
      const storedColors = localStorage.getItem('psd_custom_color_schemes')
      if (storedColors) {
        const parsed = JSON.parse(storedColors)
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item?.value && !colorSchemes.value.some((c) => c.value === item.value)) {
              colorSchemes.value.push(item)
            }
          })
        }
      }

      const storedStyles = localStorage.getItem('psd_custom_design_styles')
      if (storedStyles) {
        const parsed = JSON.parse(storedStyles)
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item?.value && !designStyles.value.some((s) => s.value === item.value)) {
              designStyles.value.push(item)
            }
          })
        }
      }
    } catch (e) {
      console.error('Error loading custom taxonomy from localStorage:', e)
    }
  }

  const addColorScheme = (label: string, customValue?: string): OptionItem => {
    const trimmedLabel = label.trim()
    const value = (customValue || trimmedLabel)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const existing = colorSchemes.value.find((c) => c.value === value)
    if (existing) return existing

    const newItem: OptionItem = { value, label: trimmedLabel }
    colorSchemes.value.push(newItem)

    if (process.client) {
      try {
        const customItems = colorSchemes.value.filter(
          (c) => !DEFAULT_COLOR_SCHEMES.some((d) => d.value === c.value),
        )
        localStorage.setItem('psd_custom_color_schemes', JSON.stringify(customItems))
      } catch (e) {
        console.error('Error saving custom color schemes:', e)
      }
    }

    return newItem
  }

  const addDesignStyle = (label: string, customValue?: string): OptionItem => {
    const trimmedLabel = label.trim()
    const value = (customValue || trimmedLabel)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const existing = designStyles.value.find((s) => s.value === value)
    if (existing) return existing

    const newItem: OptionItem = { value, label: trimmedLabel }
    designStyles.value.push(newItem)

    if (process.client) {
      try {
        const customItems = designStyles.value.filter(
          (s) => !DEFAULT_DESIGN_STYLES.some((d) => d.value === s.value),
        )
        localStorage.setItem('psd_custom_design_styles', JSON.stringify(customItems))
      } catch (e) {
        console.error('Error saving custom design styles:', e)
      }
    }

    return newItem
  }

  return {
    colorSchemes,
    designStyles,
    initTaxonomy,
    addColorScheme,
    addDesignStyle,
  }
}

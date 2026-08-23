<template>
  <footer class="bg-[#0f1a0f] text-white mt-20">
    <!-- Ornament top border -->
    <div class="h-1 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center">
              <span class="text-white text-xl">🕌</span>
            </div>
            <div>
              <p class="font-display font-bold text-white text-sm">PSD Web PPDB Katalog</p>
              <p class="text-brand-green-light text-xs">Pesantren Smart Digital</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Platform katalog template website PPDB profesional untuk Pondok Pesantren Indonesia. 17+ desain siap pakai, mudah dikustomisasi.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Navigasi</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-gray-400 hover:text-brand-green-light transition-colors text-sm">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Template Tersedia</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="color in colorSchemes"
              :key="color.value"
              class="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-400"
            >
              {{ color.label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Pesantren Smart Digital.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Katalog Template' },
  { to: '/?sortBy=featured', label: 'Template Unggulan' },
  { to: '/?sortBy=newest', label: 'Template Terbaru' },
  { to: '/admin/login', label: 'Admin Login' },
]

const colorSchemes = [
  { value: 'green', label: 'Hijau' },
  { value: 'blue', label: 'Biru' },
  { value: 'gold', label: 'Emas' },
  { value: 'maroon', label: 'Marun' },
  { value: 'teal', label: 'Tosca' },
  { value: 'gray', label: 'Abu' },
  { value: 'purple', label: 'Ungu' },
]
</script>

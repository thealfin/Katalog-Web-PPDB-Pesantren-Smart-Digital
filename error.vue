<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-4">
    <div class="text-center max-w-md">
      <!-- Ornament -->
      <p class="font-arabic text-brand-gold text-4xl mb-6 opacity-60">٤٠٤</p>
      
      <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-brand-green/10 flex items-center justify-center">
        <span class="text-5xl">🕌</span>
      </div>
      
      <h1 class="font-display text-4xl font-bold text-gray-800 mb-3">Halaman Tidak Ditemukan</h1>
      <p class="text-gray-500 text-base leading-relaxed mb-8">
        Maaf, halaman yang Anda cari tidak tersedia. Mungkin URL salah atau halaman sudah dipindahkan.
      </p>
      
      <NuxtLink to="/" class="btn-primary inline-flex">
        <Icon name="heroicons:home" />
        Kembali ke Halaman Utama
      </NuxtLink>
    </div>
  </div>
</template>

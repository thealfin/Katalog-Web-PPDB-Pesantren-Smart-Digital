<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-4">
    <div class="text-center max-w-md">
      <!-- Ornament -->
      <p class="font-arabic text-brand-gold text-4xl mb-6 opacity-60">٤٠٤</p>
      
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0A5C4F]">
        <span class="material-symbols-outlined text-[40px]">explore_off</span>
      </div>
      
      <h1 class="font-sans text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Halaman Tidak Ditemukan</h1>
      <p class="text-slate-600 text-sm leading-relaxed mb-8 font-sans">
        Maaf, halaman yang Anda cari tidak tersedia. Mungkin URL salah atau template sudah dipindahkan.
      </p>
      
      <NuxtLink to="/" class="py-3 px-6 rounded-xl bg-[#0A5C4F] text-white font-extrabold text-xs hover:bg-[#F4C430] hover:text-[#0A5C4F] transition-all duration-300 shadow-md inline-flex items-center gap-2 font-sans">
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        <span>Kembali ke Katalog</span>
      </NuxtLink>
    </div>
  </div>
</template>

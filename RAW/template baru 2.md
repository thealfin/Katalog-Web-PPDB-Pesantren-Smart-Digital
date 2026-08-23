<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Al-Furqan Academy</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#000000",
                        "secondary": "#005ab7",
                        "surface": "#f9f9fb",
                        "surface-container": "#eeeef0",
                        "surface-container-low": "#f3f3f5",
                        "surface-container-high": "#e8e8ea",
                        "on-surface": "#1a1c1d",
                        "on-surface-variant": "#4c4546",
                        "outline-variant": "#cfc4c5",
                        "secondary-fixed": "#d7e2ff",
                        "on-secondary-fixed": "#001b3f",
                        "secondary-fixed-dim": "#abc7ff",
                    },
                    spacing: {
                        "gutter": "32px",
                        "margin-inline": "24px",
                        "container-max": "1280px",
                        "section-padding": "80px",
                    },
                    fontFamily: {
                        "sans": ["Inter", "sans-serif"],
                    },
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        .hero-gradient { background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)); }
        [x-cloak] { display: none !important; }
        .transition-view { transition: opacity 0.3s ease-in-out; }

        /* Reveal Animations */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: opacity, transform;
        }
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }

        /* Mobile Menu Animation */
        .menu-backdrop {
            opacity: 0;
            filter: blur(10px);
            transform: scale(1.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        }
        .menu-backdrop.active {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
            pointer-events: auto;
        }
    </style>
</head>
<body class="bg-surface text-on-surface">

<!-- Navigation -->
<header class="bg-white border-b border-surface-container-high sticky top-0 z-50">
    <div class="flex justify-between items-center w-full px-margin-inline py-4 max-w-container-max mx-auto">
        <a href="#" onclick="showSection('home')" class="text-2xl font-bold tracking-tight text-primary">
            AL-FURQAN ACADEMY
        </a>
        <nav class="hidden md:flex gap-8 items-center">
            <a href="#" onclick="showSection('home')" id="nav-home" class="text-sm font-medium transition-colors border-b-2 border-secondary pb-1 text-secondary">Home</a>
            <a href="#" class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">About Us</a>
            <a href="#" class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Excellence</a>
            <a href="#" onclick="showSection('news')" id="nav-news" class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">News</a>
            <a href="#" class="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Contact</a>
        </nav>
        <div class="flex gap-4 items-center">
            <button class="hidden md:block text-sm font-medium text-on-surface-variant hover:text-primary transition-colors px-4 py-2">Student Portal</button>
            <button class="hidden md:block bg-black text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-all">Register Now</button>
            <!-- Hamburger Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden flex items-center p-2 z-50">
                <span id="menu-icon" class="material-symbols-outlined text-2xl">menu</span>
            </button>
        </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="hidden fixed inset-0 bg-white z-40 md:hidden menu-backdrop">
        <div class="flex flex-col h-full p-margin-inline pt-[80px]">
            <nav class="flex flex-col gap-6 py-8">
                <a href="#" onclick="showSection('home'); toggleMobileMenu()" class="text-2xl font-bold text-primary">Home</a>
                <a href="#" onclick="toggleMobileMenu()" class="text-2xl font-bold text-on-surface-variant">About Us</a>
                <a href="#" onclick="toggleMobileMenu()" class="text-2xl font-bold text-on-surface-variant">Excellence</a>
                <a href="#" onclick="showSection('news'); toggleMobileMenu()" class="text-2xl font-bold text-on-surface-variant">News</a>
                <a href="#" onclick="toggleMobileMenu()" class="text-2xl font-bold text-on-surface-variant">Contact</a>
                <a href="#" onclick="toggleMobileMenu()" class="text-2xl font-bold text-on-surface-variant">Student Portal</a>
            </nav>
            <div class="mt-auto pb-12">
                <button class="w-full bg-black text-white py-5 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-all">
                    Register Now
                </button>
            </div>
        </div>
    </div>
</header>

<!-- HOME SECTION -->
<div id="section-home" class="transition-view">
    <!-- Hero Section -->
    <section class="relative h-[90vh] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-v2AELjiBhVw-J4HYP4m56jYlVoGcGXDUg-L3gy0YUe9wrKtDDe4cCC0NCBkoN6c80P25y2G_8qgkuKzsa3ntibOELlPFwFCDkqbNlAahkG3dGi7zs7eidqfVvFXV5E4EH82pVW36HCR2EqqR7q3ytVbSNuCgsRm2o-3e4nvVZQ5Hygm9S4AW2vk-WzNPLFyBuCUW--Esy_s_48I8GjMqX9gfkEsAroTBcquZqDp46FsZhxzPlvteBO6vhIzcfbC8Mc-F26a3EmRn" 
                 alt="Masjid Istiqlal" class="w-full h-full object-cover">
            <div class="absolute inset-0 hero-gradient"></div>
        </div>
        <div class="relative z-10 px-margin-inline max-w-container-max mx-auto w-full text-white">
            <div class="max-w-2xl reveal">
                <span class="text-xs font-semibold uppercase tracking-widest mb-4 block opacity-80">Est. 1994 — Excellence in Tradition</span>
                <h1 class="text-5xl md:text-6xl font-bold mb-8 leading-tight">Pioneering the Future of Faith and Intellect.</h1>
                <p class="text-lg md:text-xl mb-10 opacity-90 leading-relaxed font-light">Al-Furqan Academy combines rigorous academic standards with spiritual depth, fostering a new generation of leaders grounded in wisdom and integrity.</p>
                <div class="flex flex-wrap gap-6">
                    <button class="bg-white text-black px-8 py-4 text-sm font-semibold hover:bg-surface-container transition-colors">Discover Our Story</button>
                    <button class="border border-white text-white px-8 py-4 text-sm font-semibold hover:bg-white hover:text-black transition-colors">Campus Tour</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Mission -->
    <section class="py-section-padding px-margin-inline max-w-container-max mx-auto reveal">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <h2 class="text-4xl font-semibold leading-tight mb-6 md:mb-0">A Precision Approach to Holistic Education.</h2>
            <p class="text-lg text-on-surface-variant leading-relaxed">
                Our mission is to cultivate an environment where intellectual curiosity meets spiritual discipline. We believe that true education is a clinical balance between the precision of modern science and the timeless wisdom of classical thought.
            </p>
        </div>
    </section>

    <!-- Core Pillars -->
    <section class="py-section-padding bg-surface-container-low overflow-hidden">
        <div class="px-margin-inline max-w-container-max mx-auto">
            <h2 class="text-3xl font-semibold mb-12 reveal">Our Core Pillars</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
                <div class="md:col-span-2 md:row-span-2 bg-black text-white p-12 flex flex-col justify-end reveal stagger-1">
                    <span class="material-symbols-outlined text-4xl mb-6">menu_book</span>
                    <h3 class="text-3xl font-semibold mb-4">Academic Rigor</h3>
                    <p class="opacity-80">Our curriculum is designed to challenge the mind and foster a lifelong pursuit of knowledge across all disciplines.</p>
                </div>
                <div class="md:col-span-2 bg-white p-12 flex flex-col justify-end border border-surface-container-high reveal stagger-2">
                    <span class="material-symbols-outlined text-3xl mb-4 text-secondary">verified_user</span>
                    <h3 class="text-2xl font-semibold mb-2">Spiritual Integrity</h3>
                    <p class="text-on-surface-variant">Rooting every action in the ethical and moral frameworks of our heritage.</p>
                </div>
                <div class="bg-white p-8 flex flex-col justify-end border border-surface-container-high reveal stagger-3">
                    <span class="material-symbols-outlined text-2xl mb-4 text-secondary">terminal</span>
                    <h3 class="text-sm font-bold uppercase mb-2">IT Innovation</h3>
                    <p class="text-xs text-on-surface-variant">Mastering the digital landscape.</p>
                </div>
                <div class="bg-white p-8 flex flex-col justify-end border border-surface-container-high reveal stagger-3">
                    <span class="material-symbols-outlined text-2xl mb-4 text-secondary">groups</span>
                    <h3 class="text-sm font-bold uppercase mb-2">Global Community</h3>
                    <p class="text-xs text-on-surface-variant">Connecting through diversity.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pathways -->
    <section class="py-section-padding px-margin-inline max-w-container-max mx-auto text-center reveal">
        <h2 class="text-4xl font-bold mb-16">Educational Pathways</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
            <div class="border-t border-surface-container-high pt-8 group cursor-pointer hover:border-black transition-colors">
                <span class="text-xs text-on-surface-variant tracking-widest block mb-4">LEVEL 01</span>
                <h3 class="text-2xl font-semibold mb-4">Madrasah Tsanawiyah</h3>
                <p class="text-on-surface-variant mb-6">Building foundational knowledge with a focus on core subjects and initial spiritual development.</p>
                <div class="flex items-center text-sm font-bold text-secondary group-hover:gap-4 transition-all">
                    VIEW CURRICULUM <span class="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </div>
            </div>
            <div class="border-t border-surface-container-high pt-8 group cursor-pointer hover:border-black transition-colors">
                <span class="text-xs text-on-surface-variant tracking-widest block mb-4">LEVEL 02</span>
                <h3 class="text-2xl font-semibold mb-4">Madrasah Aliyah</h3>
                <p class="text-on-surface-variant mb-6">Advanced preparation for higher education, blending scientific inquiry with religious studies.</p>
                <div class="flex items-center text-sm font-bold text-secondary group-hover:gap-4 transition-all">
                    VIEW CURRICULUM <span class="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </div>
            </div>
            <div class="border-t border-surface-container-high pt-8 group cursor-pointer hover:border-black transition-colors">
                <span class="text-xs text-on-surface-variant tracking-widest block mb-4">SPECIALIZATION</span>
                <h3 class="text-2xl font-semibold mb-4">IT Excellence Program</h3>
                <p class="text-on-surface-variant mb-6">A cutting-edge focus on software development, data science, and ethical technology.</p>
                <div class="flex items-center text-sm font-bold text-secondary group-hover:gap-4 transition-all">
                    VIEW CURRICULUM <span class="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Campus Life Gallery -->
    <section class="py-section-padding bg-surface-container-low">
        <div class="px-margin-inline max-w-container-max mx-auto">
            <div class="flex justify-between items-end mb-12">
                <h2 class="text-4xl font-semibold">Campus Life</h2>
                <button class="text-sm font-semibold border-b border-black pb-1">View Full Gallery</button>
            </div>
            <div class="grid grid-cols-12 gap-4 h-[600px] reveal">
                <div class="col-span-12 md:col-span-8 overflow-hidden bg-surface-container-high group">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5O6jdQ2C7H8M3PaBdfHoxf418SmTaDkH85-q_kftak2I40xiTDSEasGuoggSNh-3k1FJRZIf6i94sxuhoQOUXMlRmRkML64O7ADxCP0OL7d-wJFLDyhxLqJiUSgkmlCR5ynEXrTBTHI6vflPpwPLe36UMuN5bhvlgAuSSHUpsVn_tzJs2lzAjuyC21XMDR5u_jxd0PFnWOjoemwKtDCVo-Fsdb39LxBlOVwEyvoDWQEot4NyMDXaD9hP23Y_tw7PujyfYi52NRGwP" 
                         class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Laboratory">
                </div>
                <div class="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
                    <div class="overflow-hidden bg-surface-container-high group">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyuSbmZc_1R0dqEePABYuMhsNpzyhtCUBXHP7CycAO9KMDvcr-1h-2Wy_wEnSpH1dmgLbyvr1WzpV3Q_8M-8f-u_1fJPxXyDxl5-hNHwnYtI1d-vfqFzkEKYNEEBt4S04tfBcg1NXgz0Ec8afJSAraOroarsrRIxL4Qs8WlZIT1JjhMmhYEs7B6kjknOCD0txhUrIv4--WkkRVyFEvQom5B29abctMH5IqsNKQTaJPywvC4aypypfDQjI0WDLjPjTi_CIi2bxl59Qx" 
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Library">
                    </div>
                    <div class="overflow-hidden bg-surface-container-high group">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8QuB6ZlsBTdUudWocQd-lDxWAt9GK02L4vd_LbH7Y2WhJlvNihPYFrji-pHBtKxzEc-0KXjTCBAA0N8jy44Aewe-_tfSe7BAAUFpBrMZxdUyKSfycHe9npMnKfieHAT8gb3A6JlevLfUwiMCJmLUl1Hf0H5PVoN58NXYdCaI0nvBSiwcAuO4uok9xhnjtBKL2AbOUlAOqtWJ5brCyfba2CduXOzxZvvPX8MM_MqcM09Xj9jjs7xi3wCY4B4E-pXzERz-b8obpsxGc" 
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Auditorium">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Location & Contact -->
    <section class="py-section-padding bg-white reveal">
        <div class="px-margin-inline max-w-container-max mx-auto">
            <h2 class="text-4xl font-semibold mb-12">Lokasi Kampus</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
                <div class="lg:col-span-2 aspect-video bg-surface-container relative flex items-center justify-center border border-outline-variant overflow-hidden group">
                    <div class="text-center text-on-surface-variant opacity-60 flex flex-col items-center gap-4">
                        <span class="material-symbols-outlined text-6xl">map</span>
                        <p class="text-sm font-bold tracking-widest uppercase">Peta Interaktif Al-Furqan Academy</p>
                    </div>
                    <div class="absolute bottom-6 right-6">
                        <button class="bg-black text-white px-6 py-3 text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg">
                            BUKA GOOGLE MAPS <span class="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                    </div>
                </div>
                <div class="space-y-10">
                    <div>
                        <h3 class="text-xs font-bold uppercase tracking-widest text-primary mb-4">Alamat Pusat</h3>
                        <p class="text-lg text-on-surface-variant leading-relaxed">Jl. Pendidikan No. 45,<br>Kompleks Ilmu, Jawa Barat,<br>Indonesia</p>
                    </div>
                    <div>
                        <h3 class="text-xs font-bold uppercase tracking-widest text-primary mb-4">Jam Operasional</h3>
                        <div class="space-y-2 text-sm text-on-surface-variant">
                            <div class="flex justify-between border-b border-surface-container py-2"><span>Senin - Jumat</span><span>08:00 - 16:00</span></div>
                            <div class="flex justify-between border-b border-surface-container py-2"><span>Sabtu</span><span>08:00 - 12:00</span></div>
                            <div class="flex justify-between py-2"><span>Minggu</span><span>Tutup</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xs font-bold uppercase tracking-widest text-primary mb-4">Kontak</h3>
                        <div class="space-y-3">
                            <a href="tel:+62211234567" class="flex items-center gap-3 text-on-surface-variant hover:text-black transition-colors">
                                <span class="material-symbols-outlined text-xl">call</span> +62 (21) 1234-567
                            </a>
                            <a href="mailto:info@alfurqan.ac.id" class="flex items-center gap-3 text-on-surface-variant hover:text-black transition-colors">
                                <span class="material-symbols-outlined text-xl">mail</span> info@alfurqan.ac.id
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<!-- NEWS SECTION -->
<div id="section-news" class="hidden transition-view">
    <main class="max-w-container-max mx-auto px-margin-inline py-section-padding">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
                <h1 class="text-6xl font-bold text-primary mb-4">Latest News</h1>
                <p class="text-lg text-on-surface-variant max-w-2xl">Discover stories of excellence, academic achievements, and community events shaping the future at Al-Furqan Academy.</p>
            </div>
            <div class="w-full md:w-96 relative">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60">search</span>
                <input type="text" placeholder="Search articles..." 
                       class="w-full pl-12 pr-4 py-4 bg-transparent border border-outline-variant focus:border-black focus:ring-0 transition-colors">
            </div>
        </div>

        <div class="flex flex-wrap gap-4 border-b border-surface-container-high pb-6 mb-12">
            <button class="px-6 py-2 bg-black text-white text-sm font-semibold">Semua</button>
            <button class="px-6 py-2 border border-outline-variant text-sm font-semibold hover:border-black transition-colors">Kegiatan</button>
            <button class="px-6 py-2 border border-outline-variant text-sm font-semibold hover:border-black transition-colors">Prestasi</button>
            <button class="px-6 py-2 border border-outline-variant text-sm font-semibold hover:border-black transition-colors">Pengumuman</button>
        </div>

        <!-- Featured News -->
        <section class="reveal">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-20">
                <div class="lg:col-span-8 group cursor-pointer">
                <div class="aspect-video overflow-hidden bg-surface-container mb-6">
                    <img src="https://lh3.googleusercontent.com/aida/ADBb0ugLs-37MPDTC_C-18GDpqOA-cBM2c_8H1wsHsy0QbPpsH4_p5wKIWlBqtcm1ceJI428PEEgS7dgOk0jpDREcn0ymF0lbO2QnFxL79XDyOfiy3jS2Pkg04-Woe6lSjRMt_muyn3WbVfeqcbgS3STtOzybYnrZ2UYyYpxvJB_7ZJlj5XQK3axczZkT9BdeAr_B2hWCdXWwrvzTECvV9Ax9_MjexuHIMIjeh3LViHaQp_2i1zuDZNbz5j727XjfoHZkZcs-byEfUL6mIY" 
                         alt="Science Symposium" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <span class="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider">Kegiatan</span>
                    <span class="text-on-surface-variant text-xs opacity-60">MARCH 14, 2024</span>
                </div>
                <h2 class="text-4xl font-bold mb-4 group-hover:text-secondary transition-colors">Al-Furqan Annual Science Symposium: Pioneering Ethical Research</h2>
                <p class="text-on-surface-variant leading-relaxed line-clamp-2">The latest gathering of young minds showcased groundbreaking research in environmental science and religious ethics, bridging the gap between faith and empirical study.</p>
            </div>
            <div class="lg:col-span-4 space-y-12">
                <div class="group cursor-pointer">
                    <div class="aspect-[4/3] overflow-hidden bg-surface-container mb-4">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRCGpuDNKOzAA1YuNYKpwxELkd1Vh53H8Z2uWb5y-xX7r3F-OnINB-oLyhLn-IsnyaskRNQrbypxt-S1YhrqDen8cAxbLRy6cAZ_OM21r4wkNnzilAFxVuRJz3ZF8j_acso5_Q7B8NjDrtgiFONTXjv89ZEY2SQApM3WmM3Il9gn3J1Xm1FWNakb04GD70jQhUCBwHj9IrpCzvzpYbsYGrGfpk2fAONh178Yq9rv2LIfnmJIvuSt12JWDTq4xCZeftwfYaq9XuFusD" 
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="National Debate">
                    </div>
                    <span class="text-secondary text-xs font-bold uppercase mb-2 block">Prestasi</span>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">National Debate Champions 2024</h3>
                    <p class="text-on-surface-variant text-sm line-clamp-2">Our debate team secured first place in the national championships, demonstrating exceptional critical thinking skills.</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-[4/3] overflow-hidden bg-surface-container mb-4">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTmB8-2avmr_m_-qwM6IQnUHixke87Oi5EdcSnJYOX50UVnXal1x90VDxPD72bzPnE6-Iph36pFIYgUllJAFJUVpnCpIyYUDnThHbV4NHZqyGT2M0VuRSwgBbxlfyzqJfmMQEGzffTWVIs7FkqCpGUQAWACwp3B6LtmjpvmOz2cRZSKv1l1HBSRxU6S2xb-rE9uTOstQQCwwf5XVv-HDKqv2ZXz4Pe32dXmRXR4b_csWAColP9R5opWkkbjjipPXS9TJCWMziV4LcG" 
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="News Item">
                    </div>
                    <span class="text-secondary text-xs font-bold uppercase mb-2 block">Pengumuman</span>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">Digital Library Expansion Phase II</h3>
                    <p class="text-on-surface-variant text-sm line-clamp-2">Al-Furqan is proud to announce the next phase of our digital resource initiative, providing students with global access.</p>
                </div>
            </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
            <article class="group cursor-pointer reveal">
                <div class="aspect-square overflow-hidden bg-surface-container mb-6 relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM9iJjba3Zo11tf4shdn3PEQHqHW4dBMwT70mlFin_3Dc5sYlRtzrX3LxDbb-8_2G-xASfP_RFoQHnJ6AaCUewuCsqS-nrODLjYbVoSCjZ84wGFS-3CYNpNPDmJryfjaum1RgHtvBSUPl7L0lZOGySPE2cNgGF0DBK7QY7mGC_UpRySTlwsanUYYsBzI-BXHg9iWSWmXoZVmmsA-bL7idnAaAaTo7qHqGSseRD2RnD0n7jNyFCDWRSB2aTw72I8nwFZUFOGasMOiIJ" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Leadership">
                    <span class="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">News</span>
                </div>
                <div class="flex items-center gap-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    <span>Feb 28, 2024</span>
                    <span class="text-black">•</span>
                    <span>Kegiatan</span>
                </div>
                <h4 class="text-lg font-bold mb-3 group-hover:text-secondary transition-colors leading-snug">Student Leadership Forum: Shaping Tomorrow's Visionaries</h4>
                <p class="text-sm text-on-surface-variant">Empowering the next generation of ethical and visionary leaders through hands-on workshops.</p>
            </article>
            <article class="group cursor-pointer reveal stagger-1">
                <div class="aspect-square overflow-hidden bg-surface-container mb-6 relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy66-X5-HZWbiurTKsuspa---AP_GhPdnRpQlZx_7vBT0jLKv7ggCTFcqWOJHnpnOMDzUkRVeY-W8goHSJiCZjbsmGCYgfjKJ70QtSYhfVZHBvxaZDLjZ_MxA5dqy4jxprwRR2-91rhFlMTRjZdjmfY22Ada0qb5dgbLQyhEMTuzJ0B4uHoaM0HBOHgpoT5eTmCbdxOyWr2VFCKxs7eTajqbq4K3uG50g2dqjFQ0x0fzIciybTY2dUiua0pVlT5Eh4SE3cCDOCbrwN" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tech">
                    <span class="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">Tech</span>
                </div>
                <div class="flex items-center gap-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    <span>Feb 22, 2024</span>
                    <span class="text-black">•</span>
                    <span>Pengumuman</span>
                </div>
                <h4 class="text-lg font-bold mb-3 group-hover:text-secondary transition-colors leading-snug">Coding for Change: New Informatics Curriculum</h4>
                <p class="text-sm text-on-surface-variant">A refreshed curriculum focusing on ethical technology development and modern frameworks.</p>
            </article>
            <article class="group cursor-pointer reveal stagger-2">
                <div class="aspect-square overflow-hidden bg-surface-container mb-6 relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyZxesM8symzfSOXK_vh9n-kyCIrNbJICELB9T14veKFR5bpNx0tAtWCSIhPCzVtf8qL0j4fhCjteOinWXpdSDg8L5a8E5lCa1OtAz_g0VVRP9rquzS6krbBPxHlI6kTUDG86aVb5bmUtxe0HNf6TBsd72LFaIBTo9TqjrKMvzuPiARJgagoarhgsFIt3l6p8gq96ycCvFfS_ETOpMVV-mYSH7L8aDF9saNMw3UghCFozvvuHw9zY70SsR_4mvk-ftY1dD3iAGi3Rv" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="News">
                    <span class="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">Campus</span>
                </div>
                <div class="flex items-center gap-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    <span>Feb 15, 2024</span>
                    <span class="text-black">•</span>
                    <span>Kegiatan</span>
                </div>
                <h4 class="text-lg font-bold mb-3 group-hover:text-secondary transition-colors leading-snug">Spring Semester Admissions Open</h4>
                <p class="text-sm text-on-surface-variant">Join a community dedicated to precision minimalism and academic rigor in the new semester.</p>
            </article>
        </section>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-2 border-t border-surface-container-high pt-12">
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="w-12 h-12 flex items-center justify-center bg-black text-white text-sm font-bold">1</button>
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant text-sm font-bold hover:bg-surface-container transition-colors">2</button>
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant text-sm font-bold hover:bg-surface-container transition-colors">3</button>
            <span class="px-2 text-on-surface-variant opacity-60">...</span>
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant text-sm font-bold hover:bg-surface-container transition-colors">12</button>
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    </main>
</div>

<!-- Footer -->
<footer class="bg-surface border-t border-surface-container-high py-section-padding">
    <div class="max-w-container-max mx-auto px-margin-inline">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            <div class="col-span-1">
                <h4 class="text-xl font-bold mb-6">AL-FURQAN ACADEMY</h4>
                <p class="text-sm text-on-surface-variant leading-relaxed opacity-80">Defining the standard of holistic education through a clinical lens of excellence and spiritual depth.</p>
            </div>
            <div>
                <h5 class="text-xs font-bold uppercase tracking-widest mb-6">Institution</h5>
                <ul class="space-y-4 text-sm text-on-surface-variant">
                    <li><a href="#" class="hover:text-black transition-colors">Admissions</a></li>
                    <li><a href="#" class="hover:text-black transition-colors">Curriculum</a></li>
                    <li><a href="#" class="hover:text-black transition-colors">Faculty</a></li>
                    <li><a href="#" class="hover:text-black transition-colors">Alumni</a></li>
                </ul>
            </div>
            <div>
                <h5 class="text-xs font-bold uppercase tracking-widest mb-6">Legal</h5>
                <ul class="space-y-4 text-sm text-on-surface-variant">
                    <li><a href="#" class="hover:text-black transition-colors">Privacy Policy</a></li>
                    <li><a href="#" class="hover:text-black transition-colors">Terms of Service</a></li>
                </ul>
            </div>
            <div>
                <h5 class="text-xs font-bold uppercase tracking-widest mb-6">Medsos Pesantren</h5>
                <div class="flex flex-col gap-4 text-sm text-on-surface-variant">
                    <a href="#" class="flex items-center gap-3 hover:text-black transition-colors">
                        <img src="https://www.google.com/s2/favicons?domain=instagram.com" class="w-4 h-4 grayscale" alt=""> Instagram
                    </a>
                    <a href="#" class="flex items-center gap-3 hover:text-black transition-colors">
                        <img src="https://www.google.com/s2/favicons?domain=facebook.com" class="w-4 h-4 grayscale" alt=""> Facebook
                    </a>
                    <a href="#" class="flex items-center gap-3 hover:text-black transition-colors">
                        <img src="https://www.google.com/s2/favicons?domain=youtube.com" class="w-4 h-4 grayscale" alt=""> YouTube
                    </a>
                    <a href="#" class="flex items-center gap-3 hover:text-black transition-colors">
                        <img src="https://www.google.com/s2/favicons?domain=whatsapp.com" class="w-4 h-4 grayscale" alt=""> WhatsApp
                    </a>
                </div>
            </div>
        </div>
        <div class="border-t border-surface-container-high pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant opacity-60">
            <p>© 2024 Al-Furqan Academy. All rights reserved. Precision Minimalism in Education.</p>
            <div class="flex gap-4 items-center">
                <span class="material-symbols-outlined text-sm">public</span>
                <span>EN — US</span>
            </div>
        </div>
    </div>
</footer>

<script>
    let isMenuOpen = false;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // Trigger reflow to ensure hidden is removed before active starts
            void mobileMenu.offsetWidth;
            mobileMenu.classList.add('active');
            menuIcon.innerText = 'close';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            menuIcon.innerText = 'menu';
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!isMenuOpen) mobileMenu.classList.add('hidden');
            }, 400);
        }
    }

    function showSection(sectionId) {
        const homeSection = document.getElementById('section-home');
        const newsSection = document.getElementById('section-news');
        const navHome = document.getElementById('nav-home');
        const navNews = document.getElementById('nav-news');

        if (sectionId === 'home') {
            homeSection.classList.remove('hidden');
            newsSection.classList.add('hidden');
            
            navHome.classList.add('text-secondary', 'border-b-2', 'border-secondary');
            navHome.classList.remove('text-on-surface-variant');
            
            navNews.classList.remove('text-secondary', 'border-b-2', 'border-secondary');
            navNews.classList.add('text-on-surface-variant');
        } else {
            homeSection.classList.add('hidden');
            newsSection.classList.remove('hidden');
            
            navNews.classList.add('text-secondary', 'border-b-2', 'border-secondary');
            navNews.classList.remove('text-on-surface-variant');
            
            navHome.classList.remove('text-secondary', 'border-b-2', 'border-secondary');
            navHome.classList.add('text-on-surface-variant');
        }
        window.scrollTo(0, 0);
        // Small delay to allow sections to become block/visible before observing
        setTimeout(initReveal, 50);
    }

    // Scroll Reveal Intersection Observer
    function initReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initReveal);
</script>
</body>
</html>

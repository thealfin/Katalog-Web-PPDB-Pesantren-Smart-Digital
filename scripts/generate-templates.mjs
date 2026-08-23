import { mkdir, writeFile, readFile, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import AdmZip from 'adm-zip';

/**
 * 34 Premium Templates (17 Islamic Standard + 17 Premium Color Hunt)
 */
const templates = [
  // SET A: Islamic Standard (from templates.json)
  { slug: 'hijau-damai', name: 'Hijau Damai', primary: '#166534', secondary: '#FBBF24', background: '#F0FDF4', text: '#166534', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'biru-langit', name: 'Biru Langit', primary: '#1E3A8A', secondary: '#38BDF8', background: '#F0F9FF', text: '#1E3A8A', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'emas-mulia', name: 'Emas Mulia', primary: '#92400e', secondary: '#FCD34D', background: '#FFF7ED', text: '#92400e', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'merah-marun', name: 'Merah Marun', primary: '#7f1d1d', secondary: '#EF4444', background: '#FEF2F2', text: '#7f1d1d', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'hijau-tosca', name: 'Hijau Tosca', primary: '#0f766e', secondary: '#2DD4BF', background: '#F0FDFA', text: '#0f766e', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'putih-bersih', name: 'Putih Bersih', primary: '#374151', secondary: '#94A3B8', background: '#FFFFFF', text: '#374151', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'coklat-pesantren', name: 'Coklat Pesantren', primary: '#78350f', secondary: '#D97706', background: '#FFFBEB', text: '#78350f', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'ungu-ilmu', name: 'Ungu Ilmu', primary: '#4c1d95', secondary: '#A78BFA', background: '#F5F3FF', text: '#4c1d95', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'abu-formal', name: 'Abu Formal', primary: '#1f2937', secondary: '#94A3B8', background: '#111827', text: '#F9FAFB', fontHeading: 'Outfit', fontBody: 'Plus Jakarta Sans', mode: 'dark' },
  { slug: 'hijau-mint', name: 'Hijau Mint', primary: '#059669', secondary: '#6EE7B7', background: '#ECFDF5', text: '#065F46', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'biru-quran', name: 'Biru Quran', primary: '#1d4ed8', secondary: '#FBBF24', background: '#EFF6FF', text: '#1E3A8A', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'krem-santri', name: 'Krem Santri', primary: '#92400e', secondary: '#D97706', background: '#FFFBEB', text: '#78350F', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'hitam-elegan', name: 'Hitam Elegan', primary: '#111827', secondary: '#FBBF24', background: '#111827', text: '#FFFFFF', fontHeading: 'Syne', fontBody: 'Work Sans', mode: 'dark' },
  { slug: 'hijau-nusantara', name: 'Hijau Nusantara', primary: '#15803d', secondary: '#FCD34D', background: '#F0FDF4', text: '#14532D', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'biru-langit-muda', name: 'Biru Langit Muda', primary: '#2563eb', secondary: '#60A5FA', background: '#EFF6FF', text: '#1E40AF', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'orange-semangat', name: 'Orange Semangat', primary: '#c2410c', secondary: '#FB923C', background: '#FFF7ED', text: '#7C2D12', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'dua-warna-klasik', name: 'Dua Warna Klasik', primary: '#166534', secondary: '#166534', background: '#FFFFFF', text: '#166534', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },

  // SET B: Premium Color Hunt
  { slug: 'emerald-gold', name: 'Emerald Gold', primary: '#064E3B', secondary: '#FCD34D', background: '#F0FDF4', text: '#064E3B', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'ocean-mist', name: 'Ocean Mist', primary: '#0C4A6E', secondary: '#38BDF8', background: '#F0F9FF', text: '#0C4A6E', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'midnight-deep', name: 'Midnight Deep', primary: '#1E1B4B', secondary: '#818CF8', background: '#1E1B4B', text: '#E0E7FF', fontHeading: 'Outfit', fontBody: 'Plus Jakarta Sans', mode: 'dark' },
  { slug: 'terracotta-clay', name: 'Terracotta Clay', primary: '#7C2D12', secondary: '#FB923C', background: '#FFF7ED', text: '#7C2D12', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'forest-macha', name: 'Forest Macha', primary: '#16423C', secondary: '#A6B28B', background: '#F9F5F0', text: '#16423C', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'royal-maroon', name: 'Royal Maroon', primary: '#450A0A', secondary: '#EF4444', background: '#FEF2F2', text: '#450A0A', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'slate-teal', name: 'Slate Teal', primary: '#0F172A', secondary: '#2DD4BF', background: '#0F172A', text: '#F0FDFA', fontHeading: 'Outfit', fontBody: 'Plus Jakarta Sans', mode: 'dark' },
  { slug: 'coffee-cream', name: 'Coffee Cream', primary: '#451A03', secondary: '#D97706', background: '#FFFBEB', text: '#451A03', fontHeading: 'Lora', fontBody: 'Open Sans', mode: 'light' },
  { slug: 'modern-noir', name: 'Modern Noir', primary: '#000000', secondary: '#94A3B8', background: '#000000', text: '#FFFFFF', fontHeading: 'Syne', fontBody: 'Work Sans', mode: 'dark' },
  { slug: 'desert-sand', name: 'Desert Sand', primary: '#431407', secondary: '#F59E0B', background: '#FFF7ED', text: '#431407', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'arctic-ice', name: 'Arctic Ice', primary: '#1E3A8A', secondary: '#06B6D4', background: '#ECFEFF', text: '#1E3A8A', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'vintage-olive', name: 'Vintage Olive', primary: '#365314', secondary: '#84CC16', background: '#F7FEE7', text: '#365314', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'charcoal-amber', name: 'Charcoal Amber', primary: '#111827', secondary: '#FBBF24', background: '#111827', text: '#FFFBEB', fontHeading: 'Outfit', fontBody: 'Plus Jakarta Sans', mode: 'dark' },
  { slug: 'royal-purple', name: 'Royal Purple', primary: '#4C1D95', secondary: '#A78BFA', background: '#F5F3FF', text: '#4C1D95', fontHeading: 'Montserrat', fontBody: 'Inter', mode: 'light' },
  { slug: 'deep-cyan', name: 'Deep Cyan', primary: '#042F2E', secondary: '#22D3EE', background: '#F0FDFA', text: '#042F2E', fontHeading: 'Ubuntu', fontBody: 'Poppins', mode: 'light' },
  { slug: 'dark-moss', name: 'Dark Moss', primary: '#064E3B', secondary: '#10B981', background: '#064E3B', text: '#ECFDF5', fontHeading: 'Outfit', fontBody: 'Plus Jakarta Sans', mode: 'dark' },
  { slug: 'classic-burgundy', name: 'Classic Burgundy', primary: '#4C0519', secondary: '#F43F5E', background: '#FFF1F2', text: '#4C0519', fontHeading: 'Playfair Display', fontBody: 'Lato', mode: 'light' },
  { slug: 'navi-modern', name: 'Navi Modern', primary: '#bdc6e4', secondary: '#d4c3b9', background: '#131315', text: '#e4e2e4', fontHeading: 'Outfit', fontBody: 'Inter', mode: 'dark' },
  { slug: 'cream-choco', name: 'Cream Choco', primary: '#685b38', secondary: '#d6c59b', background: '#fff8f3', text: '#1d1b18', fontHeading: 'Noto Serif', fontBody: 'Manrope', mode: 'light' },
  { slug: 'hijau-elegan-minimalis', name: 'Hijau Elegan Minimalis', primary: '#002c1d', secondary: '#3b6753', background: '#fcf9f8', text: '#1b1c1c', fontHeading: 'Newsreader', fontBody: 'Work Sans', mode: 'light' },
];

/**
 * Generate HTML with dynamic variables and ONLINE dummy images.
 */
const generateHTML = (template, baseHtml) => {
  const isDark = template.mode === 'dark';
  const headingFont = template.fontHeading;
  const bodyFont = template.fontBody;
  const cleanPrimary = template.primary.replace('#', '');
  const cleanBackground = template.background.replace('#', '');

  // Dummy URLs
  const logoUrl = `https://placehold.co/400x400/${cleanPrimary}/${cleanBackground}.png?text=${template.name.charAt(0)}`;
  const heroUrl = `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80`;
  const galleryUrl = `https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80`;
  const bannerUrl = `https://images.unsplash.com/photo-1523050853023-8c2d275430ed?auto=format&fit=crop&w=1200&q=80`;

  // Replace Title & Metadata
  let html = baseHtml.replace(/Judul Template Pesantren/g, `Pondok Pesantren ${template.name}`);
  html = html.replace(/Nama Pesantren/g, `Pondok Pesantren ${template.name}`);
  html = html.replace(/Nama<br><span class="text-accent-light-green">Pesantren<\/span>/g, `Pondok Pesantren<br><span class="text-accent-light-green">${template.name}</span>`);

  // Replace Dummy URLs
  html = html.replace(/https:\/\/placehold\.co\/400x400\/[^/]+\/[^.]+\.png\?text=[A-Z]/g, logoUrl);

  // Replace Tailwind Config Colors
  html = html.replace(/'ivory':\s*'[^']+'/g, `'ivory': '${template.background}'`);
  html = html.replace(/'dark-gray':\s*'[^']+'/g, `'dark-gray': '${template.primary}'`);
  html = html.replace(/'deep-green':\s*'[^']+'/g, `'deep-green': '${template.primary}'`);
  html = html.replace(/'dark-green':\s*'[^']+'/g, `'dark-green': '${template.primary}'`);
  html = html.replace(/'text-gray':\s*'[^']+'/g, `'text-gray': '${isDark ? '#FFFFFF' : template.text}'`);
  html = html.replace(/'accent-light-green':\s*'[^']+'/g, `'accent-light-green': '${template.secondary}'`);
  html = html.replace(/'highlight-yellow':\s*'[^']+'/g, `'highlight-yellow': '${template.secondary}'`);
  html = html.replace(/'logo-border':\s*'[^']+'/g, `'logo-border': '${template.primary}'`);

  // Replace CSS Variables
  html = html.replace(/--primary:\s*#[0-9a-fA-F]+;/g, `--primary: ${template.primary};`);
  html = html.replace(/--primary-dark:\s*#[0-9a-fA-F]+;/g, `--primary-dark: ${template.primary};`);
  html = html.replace(/--primary-deep:\s*#[0-9a-fA-F]+;/g, `--primary-deep: ${template.primary};`);
  html = html.replace(/--primary-glow:\s*#[0-9a-fA-F]+;/g, `--primary-glow: ${template.secondary};`);
  html = html.replace(/--secondary:\s*#[0-9a-fA-F]+;/g, `--secondary: ${template.secondary};`);
  html = html.replace(/--background:\s*#[0-9a-fA-F]+;/g, `--background: ${template.background};`);

  // Replace Fonts
  html = html.replace(/family=[A-Za-z+]+:wght@[0-9;]+&family=[A-Za-z+]+:wght@[0-9;]+/g, 
    `family=${headingFont.replace(/ /g, '+')}:wght@400;500;600;700;800;900&family=${bodyFont.replace(/ /g, '+')}:wght@300;400;500;600;700`);
  html = html.replace(/font-family:\s*'Outfit',\s*sans-serif;/g, `font-family: '${headingFont}', sans-serif;`);
  
  html = html.replace(/body\s*{\s*font-family:\s*'Plus Jakarta Sans',\s*sans-serif;\s*color:\s*#[A-Fa-f0-9]+;/g, `body {\n            font-family: '${bodyFont}', sans-serif;\n            color: ${isDark ? '#FFFFFF' : template.text};`);

  return html;
};

async function main() {
  const baseDir = join(process.cwd(), 'public', 'templates');
  const referencePath = join(baseDir, 'abu-formal', 'index.html');

  if (!existsSync(referencePath)) {
    console.error('Error: Reference template not found at', referencePath);
    return;
  }

  const baseHtml = await readFile(referencePath, 'utf8');

  console.log('Starting template generation with ONLINE DUMMY IMAGES using abu-formal as base...');

  for (const template of templates) {
    if (template.slug === 'abu-formal' || template.slug === 'navi-modern' || template.slug === 'cream-choco' || template.slug === 'hijau-elegan-minimalis') {
      // For unique templates, we only want to ensure the ZIP is created if the folder exists
      const templateDir = join(baseDir, template.slug);
      if (existsSync(templateDir)) {
        const zip = new AdmZip();
        zip.addLocalFolder(templateDir);
        zip.writeZip(join(baseDir, `${template.slug}.zip`));
        console.log(`Zipped unique template: ${template.slug}.zip`);
      }
      continue; 
    }
    
    const templateDir = join(baseDir, template.slug);
    const templateMediaDir = join(templateDir, 'media');

    if (!existsSync(templateDir)) {
      await mkdir(templateDir, { recursive: true });
    }

    // Ensure media folder exists but is empty
    if (!existsSync(templateMediaDir)) {
      await mkdir(templateMediaDir, { recursive: true });
    } else {
      // Clear existing files in media folder
      const files = await readdir(templateMediaDir);
      for (const file of files) {
        await unlink(join(templateMediaDir, file));
      }
    }

    const htmlContent = generateHTML(template, baseHtml);
    await writeFile(join(templateDir, 'index.html'), htmlContent);
    console.log(`Generated HTML (Online Images): ${template.slug}/index.html`);

    // Create ZIP
    const zip = new AdmZip();
    zip.addLocalFolder(templateDir);
    zip.writeZip(join(baseDir, `${template.slug}.zip`));
  }
  
  console.log('Successfully generated remaining templates using abu-formal as base.');
}

main().catch(console.error);

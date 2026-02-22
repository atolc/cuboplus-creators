import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  // En desarrollo: base '/' para ver la app en localhost:5173/
  // En producción (ej. GitHub Pages): base '/cuboplus-creators/'
  base: process.env.NODE_ENV === 'production' ? '/cuboplus-creators/' : '/',
  plugins: [
    // GitHub Pages: copiar index.html a 404.html para que las rutas SPA
    // (ej. /creator/slug) carguen correctamente al recargar o acceder directo
    {
      name: 'copy-404-for-github-pages',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'dist')
        const src = path.join(outDir, 'index.html')
        const dest = path.join(outDir, '404.html')
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log('Copied index.html to 404.html for GitHub Pages SPA routing')
        }
      },
    },
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter],
        include: ['**/*.mdx'],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

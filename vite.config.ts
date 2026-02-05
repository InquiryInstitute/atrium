import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves at https://<owner>.github.io/atrium/
const base = process.env.GITHUB_PAGES === 'true' ? '/atrium/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})

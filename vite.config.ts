import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/styles': path.resolve(__dirname, './src/core/styles'),
      '@/layouts': path.resolve(__dirname, './src/core/layouts'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/assets': path.resolve(__dirname, './src/shared/assets'),
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/constants': path.resolve(__dirname, './src/shared/constants'),
      '@/lib': path.resolve(__dirname, './src/shared/lib'),
      '@/types': path.resolve(__dirname, './src/shared/types'),
      '@/sections': path.resolve(__dirname, './src/sections'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/pages': path.resolve(__dirname, './src/pages'),
    },
  },
})

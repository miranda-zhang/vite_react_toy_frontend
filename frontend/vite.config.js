import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [
          'relay',
        ],
      },
    })],
  base: '/vite_react_toy_frontend/', 
  define: {
    'process.env': {}
  }
})

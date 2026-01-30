import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'semibiologic-phil-unindustrious.ngrok-free.dev',
      '.ngrok-free.dev' // Allow all ngrok subdomains
    ]
  }
})
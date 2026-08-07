import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Gym Coach',
        short_name: 'Gym Coach',
        description: 'A web application for gym enthusiasts to track workouts and progress.',
        theme_color: '#ffffff',
        background_color: '#ffffff',

        display: 'standalone',
        scope: '/GymCoach/',
        start_url: '/GymCoach/',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ttf,ico,png,svg,jpg,jpeg,webp,json}'
        ],

        navigateFallback: '/index.html'
      }
    })
  ],
  base: '/GymCoach/',
})

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    testTimeout: 10000,
    hookTimeout: 10000,
    pool: 'threads',
    threads: true,
    maxThreads: 4,
    minThreads: 1,
    coverage: {
      enabled: false, // Only enable when explicitly running coverage command
      provider: 'c8',
      reporter: ['text', 'json-summary'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/types/**'
      ]
    },
    cache: {
      dir: './node_modules/.vitest'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

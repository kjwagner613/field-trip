import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true  // Explicitly enable source maps
  },
server: {
  proxy: {
    '/api/v1/123/actions/blueprints/bp_456/bpv_123/graph': {
      target: 'http://localhost:5173',
      rewrite: () => '/mock/demo-graph.json',
    }
  }
}

  },
)
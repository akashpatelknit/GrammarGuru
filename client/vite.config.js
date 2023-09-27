import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	scripts: {
		build: 'vite build',
		preview: 'vite preview --port 8080',
	},
});

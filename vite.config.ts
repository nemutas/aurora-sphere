import path from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig(({ mode }) => {
	console.log('⚓ ' + mode)
	return {
		root: './src',
		publicDir: '../public',
		base: mode === 'development' ? '/' : '/aurora-sphere/',
		plugins: [glsl()],
		build: {
			rollupOptions: {
				input: {
					home: path.resolve(__dirname, './src/index.html'),
				},
			},
			outDir: '../dist',
			emptyOutDir: true,
		},
		server: {
			host: true,
		},
	}
})

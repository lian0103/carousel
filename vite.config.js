import { defineConfig , loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_ENV } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue()],
    server: {
      host: true,
      port: 8090,
    },
    base: VITE_ENV === 'prod' ? '/carousel/' : '/',
    build: {
      outDir: 'docs',
    },
  });
};

import {
    defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {
    ElementPlusResolver
} from 'unplugin-vue-components/resolvers';
// const path = require('path');
import qiankun from 'vite-plugin-qiankun';
// useDevMode = true 则不使用热更新插件，useDevMode = false 则能使用热更新，但无法作为子应用加载
const useDevMode = true;
// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        qiankun('system', {
            useDevMode
        }),
        vue()
    ],
    server: {
        port: 5804,
        proxy: {
            '/cashier/': {
                // target: process.env.PROXY_CONSOLE_GATEWAY,
                target: 'http://10.200.0.82:10006',
                changeOrigin: true
            }
        }
    },

});

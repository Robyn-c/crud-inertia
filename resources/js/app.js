import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import Layout from "@/Shared/Layout.vue";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

let enableCodeSplitting = true

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => enableCodeSplitting ?
        // Enable code-splitting (or lazy-loading) using Vite
        // Note: When you run `npm run build` (which in turn calls `vite build`), it will output many smaller JavaScript bundles, which are then loaded on demand when visiting new pages
        // asynchronous callback, can either use async-await format or the .then() format, as shown below
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue', { eager: false })
        )
            .then((module) => {
                let page = module;
                if (!page.default.layout) {
                    // Set the default layout for all page components that don't have a layout set
                    // Without this check, we will overwrite the page's layout, which we don't want to do
                    page.default.layout = Layout
                }
                return page;
            })
        :
        // Disable code-splitting / Enable eager-loading (opposite of lazy-loading / code-splitting)
        // Note: When you run `npm run build` (which in turn calls `vite build`), it will output one large JavaScript bundle
        (function() {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            let page = pages[`./Pages/${name}.vue`]

            if (!page.default.layout) {
                // Set the default layout for all page components that don't have a layout set
                // Without this check, we will overwrite the page's layout, which we don't want to do
                page.default.layout = Layout
            }
            return page
        })(),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .component('Link', Link)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#842593',
    },
});

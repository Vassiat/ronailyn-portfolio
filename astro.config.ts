// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    base: "/",
    site: "https://ronailyn.pages.dev",
    output: "static",
    fonts: [{
        provider: fontProviders.local(),
        name: "Minecraft",
        cssVariable: "--font-minecraft",
        options: {
            variants: [
                // Regular
                {
                src: ['./src/assets/fonts/minecraftregular-webfont.woff2'],
                weight: 'normal',
                style: 'normal'
                },
                // Bold
                {
                src: ['./src/assets/fonts/minecraftbold-webfont.woff2'],
                weight: 'bold',
                style: 'italic'
                },
                // Italic
                {
                src: ['./src/assets/fonts/minecraftitalic-webfont.woff2'],
                weight: 'normal',
                style: 'italic'
                },
                // Bold italic
                {
                src: ['./src/assets/fonts/minecraftbolditalic-webfont.woff2'],
                weight: 'bold',
                style: 'italic'
                },
            ]
        }
    }]
});

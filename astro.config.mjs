import { defineConfig } from 'astro/config';

// `site` is used for canonical URLs and the sitemap. Change it to your domain.
export default defineConfig({
  site: 'https://kelvinmun.example',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});

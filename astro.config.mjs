import { defineConfig } from 'astro/config';
import lit from "@astrojs/lit";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [lit(), tailwind(), react()]
});
// uno.config.ts
// for detail https://unocss.dev/guide/config-file
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetWind3 } from "unocss/preset-wind3";

export default defineConfig({
  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "size-screen": "w-full h-screen",
  },
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});

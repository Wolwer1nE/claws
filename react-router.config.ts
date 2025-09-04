import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  buildDirectory: "docs",
  // Настройка для размещения клиентских файлов напрямую в buildDirectory
  basename: "/",
} satisfies Config;

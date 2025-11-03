import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ React Compiler (memoización automática)
  reactCompiler: true,

  // ✅ Turbopack configuration (nivel raíz en Next.js 16)
  turbopack: {
    // Configuración de Turbopack para desarrollo y producción
    // Actualmente usa configuración por defecto
  },

  // ✅ Experimental features
  experimental: {
    // File system caching para Turbopack (compilaciones más rápidas)
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ React Compiler (memoización automática)
  reactCompiler: true,

  // ✅ Experimental features
  experimental: {
    // File system caching para Turbopack (compilaciones más rápidas)
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;

# ⚡ Next.js 15→16 Migration - Quick Reference

> **Una página con todo lo esencial** | Imprime y pega en tu monitor

---

## 🎯 Versiones Objetivo

```json
{
  "next": "^16.0.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "node": ">=18.18.0"
}
```

---

## 🚀 Comandos Rápidos

```bash
# 1. Actualizar dependencias
pnpm add next@latest react@19.2.0 react-dom@19.2.0 eslint-config-next@latest
pnpm add -D babel-plugin-react-compiler @types/react@latest @types/react-dom@latest

# 2. Ejecutar codemod
npx @next/codemod@canary upgrade latest

# 3. Renombrar middleware
mv middleware.ts proxy.ts

# 4. Migrar next lint
npx @next/codemod@canary next-lint-to-eslint-cli .

# 5. Limpiar y compilar
rm -rf .next && pnpm build

# 6. Verificar
pnpm lint && pnpm test
```

---

## ⚙️ next.config.ts Essential

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ✅ React Compiler (NEW)
  reactCompiler: true,

  // ✅ Turbopack (movido de experimental)
  turbopack: {
    resolveAlias: {
      // Tu config
    },
  },

  // ✅ Cache Components (antes dynamicIO)
  cacheComponents: true,

  // ✅ File System Cache (opcional)
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // ✅ Images
  images: {
    minimumCacheTTL: 60, // Opcional: revertir a 60s (default: 4h)
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
    ],
    localPatterns: [
      { pathname: '/assets/**', search: '?v=*' }, // Si usas query strings
    ],
  },

  // ✅ Proxy (antes skipMiddleware...)
  skipProxyUrlNormalize: true,
}

export default nextConfig
```

---

## 📝 package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

## 🔧 Breaking Changes Checklist

### Archivos

- [ ] `middleware.ts` → `proxy.ts`
- [ ] Export `middleware` → `proxy`
- [ ] Crear `default.tsx` en parallel routes

### Async APIs (add `await`)

```typescript
// ❌ Antes
const params = { slug: 'abc' }
const cookieStore = cookies()
const headersList = headers()
const draft = draftMode()

// ✅ Después
const { slug } = await params
const cookieStore = await cookies()
const headersList = await headers()
const draft = await draftMode()
```

### Pages/Layouts

```typescript
// ❌ Antes
type Params = { slug: string }
export default function Page({ params }: { params: Params }) {
  const { slug } = params
}

// ✅ Después - Opción 1 (async)
type Params = Promise<{ slug: string }>
export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
}

// ✅ Después - Opción 2 (use hook)
import { use } from 'react'
type Params = Promise<{ slug: string }>
export default function Page({ params }: { params: Params }) {
  const { slug } = use(params)
}
```

### Imports

```typescript
// ❌ Antes
import { unstable_cacheLife as cacheLife } from 'next/cache'
import Image from 'next/legacy/image'
import '@import "~bootstrap/..."' // Sass

// ✅ Después
import { cacheLife } from 'next/cache'
import Image from 'next/image'
import '@import "bootstrap/..."' // Sin tilde
```

### Config

```typescript
// ❌ Removidos
serverRuntimeConfig: { ... }
publicRuntimeConfig: { ... }
eslint: { ... }
experimental: { turbopack: { ... } }
experimental: { dynamicIO: true }
skipMiddlewareUrlNormalize: true

// ✅ Usar en su lugar
// .env.local para runtime config
turbopack: { ... }  // Top-level
cacheComponents: true
skipProxyUrlNormalize: true
```

---

## 🧪 Testing Rápido

```bash
# Build
rm -rf .next && pnpm build

# Dev
pnpm dev
# → http://localhost:3000

# Lint
pnpm lint

# Preview producción
pnpm build && pnpm start
```

### Checklist Manual

- [ ] Home page carga
- [ ] Navegación funciona
- [ ] API routes responden
- [ ] Imágenes cargan
- [ ] Sin errores en consola

---

## 🐛 Troubleshooting Express

| Error | Solución |
|-------|----------|
| `params is not iterable` | Falta `await params` |
| `Cannot find 'next/headers'` | Actualizar `@types/node` |
| `Module not found: fs` | Configurar `turbopack.resolveAlias` |
| Build lento | Habilitar `turbopackFileSystemCacheForDev` |
| Imagen con ?v= no carga | Configurar `images.localPatterns` |

---

## 📊 Comandos Git Útiles

```bash
# Crear rama
git switch -c feat/upgrade-nextjs-16

# Tag de backup
git tag -a v1.0.0-nextjs15 -m "Pre Next.js 16"
git push origin v1.0.0-nextjs15

# Ver cambios
git diff

# Commit
git commit -m "chore: migrate to next.js 16"

# Rollback (si falla)
git reset --hard v1.0.0-nextjs15
```

---

## 🔗 Links Importantes

- [Guía Completa](./MIGRATION-NEXT-15-TO-16.md)
- [Checklist Imprimible](./MIGRATION-CHECKLIST-PRINTABLE.md)
- [Context7 Reference](./context7/NEXTJS-16-MIGRATION-CONTEXT7.md)
- [Next.js Docs](https://nextjs.org/docs/app/guides/upgrading/version-16)

---

## 💡 Tips Pro

1. **Usa el codemod primero** - automatiza 70% del trabajo
2. **Migra por módulos** - no todo de golpe en proyectos grandes
3. **Habilita React Compiler** - memoización gratis
4. **File system cache** - compilaciones 2-3x más rápidas
5. **Preview deploy** - testea antes de producción

---

<div align="center">

**Quick Reference v1.0** | Next.js 16.0  
[⬆️](#-nextjs-1516-migration---quick-reference)

</div>

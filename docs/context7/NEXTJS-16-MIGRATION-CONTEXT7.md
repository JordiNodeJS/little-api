# 📚 Context7 Reference - Next.js 16 Migration

> **Documentación de las consultas Context7 utilizadas para esta guía**
>
> Fecha: 3 de noviembre de 2025  
> Library ID: `/vercel/next.js`  
> Versions consultadas: v15.1.8, v15.4.0-canary.82

---

## 📖 ¿Qué es Context7?

**Context7** es un servicio MCP (Model Context Protocol) que proporciona documentación actualizada de librerías directamente desde sus repositorios oficiales.

### Ventajas

- ✅ **Documentación siempre actualizada** desde fuentes oficiales
- ✅ **Code snippets reales** extraídos de la documentación oficial
- ✅ **Trust scores** para validar la calidad de la información
- ✅ **Múltiples versiones** de la misma librería disponibles

---

## 🔍 Consultas Realizadas

### 1. Resolución de Library ID

**Tool:** `mcp_context7_resolve-library-id`

**Query:**

```text
libraryName: "next.js"
```

**Resultado Seleccionado:**

```text
Library ID: /vercel/next.js
Description: Next.js enables you to create full-stack web applications by extending 
             the latest React features and integrating powerful Rust-based JavaScript 
             tooling for the fastest builds.
Code Snippets: 3192
Trust Score: 10/10
Versions Available: 
  - v14.3.0-canary.87
  - v13.5.11
  - v15.1.8
  - v15.4.0-canary.82
  - v12.3.7
  - v11.1.3
```

**Justificación de Selección:**

- ✅ Trust score máximo (10/10)
- ✅ Repositorio oficial de Vercel
- ✅ 3192 code snippets disponibles
- ✅ Incluye versiones 15.x necesarias para la migración

### 2. Obtención de Documentación

**Tool:** `mcp_context7_get-library-docs`

**Query:**

```text
context7CompatibleLibraryID: "/vercel/next.js"
tokens: 8000
topic: "migration upgrade next.js 16 breaking changes react 19"
```

**Snippets Clave Obtenidos:** 68 snippets

---

## 📝 Snippets Más Importantes

### 1. Actualización de Dependencias

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

**Uso en la guía:** Paso 1 - Actualizar Dependencias

---

### 2. React Compiler Configuration

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

**Uso en la guía:** Paso 3.2 - Habilitar React Compiler

---

### 3. Turbopack Configuration Migration

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
// Next.js 15 - experimental.turbopack
const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // options
    },
  },
}

// Next.js 16 - turbopack at the top level
const nextConfig: NextConfig = {
  turbopack: {
    // options
  },
}
```

**Uso en la guía:** Paso 3.1 - Migrar Turbopack a Nivel Raíz

---

### 4. Codemod Execution

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```bash
npx @next/codemod@canary upgrade latest
```

**Uso en la guía:** Paso 2 - Ejecutar Codemod Automático

---

### 5. Middleware → Proxy Renaming

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```bash
# Rename your middleware file
mv middleware.ts proxy.ts
# or
mv middleware.js proxy.js
```

```typescript
export function proxy(request: NextRequest) {}
```

**Uso en la guía:** Paso 4.1 - Renombrar Middleware → Proxy

---

### 6. Asynchronous Params

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
// Next.js 16 - asynchronous params access
export async function generateImageMetadata({ params }) {
  const { slug } = await params
  return [{ id: '1' }, { id: '2' }]
}

export default async function Image({ params, id }) {
  const { slug } = await params // params now async
  const imageId = await id // id is now Promise<string>
  // ...
}
```

**Uso en la guía:** Paso 4.3 - Migrar params Asíncronos

---

### 7. Cache Components (dynamicIO replacement)

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```javascript
// Next.js 15 - experimental.dynamicIO is now removed
module.exports = {
  experimental: {
    dynamicIO: true,
  },
}

// Next.js 16 - use cacheComponents instead
module.exports = {
  cacheComponents: true,
}
```

**Uso en la guía:** Paso 3.3 - Migrar dynamicIO → cacheComponents

---

### 8. Next Lint Removal

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // No longer supported
  // eslint: {},
}

export default nextConfig
```

**Uso en la guía:** Paso 4.6 - Migrar next lint → ESLint CLI

---

### 9. Runtime Config Removal

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

**Before:**

```javascript
module.exports = {
  serverRuntimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  publicRuntimeConfig: {
    apiUrl: '/api',
  },
}
```

**After:**

```bash
# .env.local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=/api
```

**Uso en la guía:** Paso 4.7 - Migrar Runtime Config → Env Vars

---

### 10. Next/Image Changes

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
// minimumCacheTTL changed from 60s to 4 hours
const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60, // Revert to old behavior if needed
  },
}

// Migrate domains to remotePatterns
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
}
```

**Uso en la guía:** Paso 4.8 - Actualizar next/image

---

### 11. Parallel Routes Default

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```tsx
// app/@modal/default.tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound()
}
```

**Uso en la guía:** Paso 4.9 - Migrar Parallel Routes

---

### 12. Stable Cache APIs

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
// Before
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'

// After
import { cacheLife, cacheTag } from 'next/cache'
```

**Uso en la guía:** Paso 4.11 - Actualizar APIs Estables

---

### 13. Dev Environment Detection

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```javascript
// Before - may not work
const isDev = process.argv.includes('dev')

// After - recommended
const isDev = process.env.NODE_ENV === 'development'
```

**Uso en la guía:** Paso 4.12 - Ajustar Detección de Entorno

---

### 14. Smooth Scroll Override

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
```

**Uso en la guía:** Paso 4.13 - Desactivar Override de Smooth Scroll

---

### 15. File System Cache

**Source:** `docs/01-app/02-guides/upgrading/version-16.mdx`

```typescript
const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}
```

**Uso en la guía:** Paso 3.5 - Habilitar File System Caching

---

## 🎯 Temas Cubiertos

La documentación obtenida cubrió exhaustivamente:

1. ✅ **Dependency Updates**: React 19, Next.js 16, ESLint
2. ✅ **Configuration Changes**: Turbopack, React Compiler, cacheComponents
3. ✅ **Breaking Changes**: Middleware→Proxy, async params, next lint removal
4. ✅ **API Migrations**: next/headers, next/image, stable APIs
5. ✅ **Build System**: Turbopack default, file system cache
6. ✅ **Codemods**: Automated migration tools
7. ✅ **Runtime Changes**: Config removal, env vars migration
8. ✅ **Performance**: Cache TTL, bundle optimizations

---

## 📚 Snippets por Categoría

### Configuración (15 snippets)

- Turbopack migration
- React Compiler setup
- Cache components
- File system cache
- Image config
- Build adapters API

### Breaking Changes (22 snippets)

- Middleware → Proxy
- Async params/searchParams
- Async next/headers APIs
- Next lint removal
- Runtime config removal
- Image TTL changes

### Migraciones (18 snippets)

- CRA to Next.js
- Next.js 13→14→15→16
- TypeScript updates
- ESLint migrations

### Optimizaciones (8 snippets)

- React Compiler
- Turbopack configuration
- Cache strategies
- Performance tips

### Testing (5 snippets)

- Build commands
- Preview deployments
- Validation strategies

---

## 🔗 Referencias Originales

### Documentos Principales Consultados

1. **Version 16 Upgrade Guide**
   - Path: `docs/01-app/02-guides/upgrading/version-16.mdx`
   - Snippets: 38
   - Trust: 10/10

2. **Version 15 Upgrade Guide**
   - Path: `docs/01-app/02-guides/upgrading/version-15.mdx`
   - Snippets: 12
   - Trust: 10/10

3. **App Router Migration**
   - Path: `docs/01-app/02-guides/migrating/app-router-migration.mdx`
   - Snippets: 8
   - Trust: 10/10

4. **Codemods**
   - Path: `docs/01-app/02-guides/upgrading/codemods.mdx`
   - Snippets: 4
   - Trust: 10/10

5. **Installation Guide**
   - Path: `docs/01-app/01-getting-started/01-installation.mdx`
   - Snippets: 6
   - Trust: 10/10

---

## 🛠️ Cómo Usar Context7 (Para Futuras Actualizaciones)

### Paso 1: Resolver Library ID

```typescript
// En Cursor/GitHub Copilot
mcp_context7_resolve-library-id({
  libraryName: "next.js"
})
```

### Paso 2: Seleccionar Mejor Match

Criterios de selección:

1. **Trust Score**: Priorizar 8-10
2. **Code Snippets**: Más snippets = mejor cobertura
3. **Name Match**: Exacto > Similar
4. **Official Repo**: Preferir `/vercel/*` o `/websites/*`

### Paso 3: Obtener Documentación

```typescript
mcp_context7_get-library-docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  tokens: 5000-10000, // Ajustar según necesidad
  topic: "specific feature or migration topic"
})
```

### Paso 4: Documentar Uso

Siempre documentar:

- Library ID usado
- Fecha de consulta
- Versión consultada
- Snippets relevantes obtenidos

---

## 📊 Estadísticas de Cobertura

### Por Versión

| Version | Snippets | Cobertura |
|---------|----------|-----------|
| v15.1.8 | 32 | Breaking changes, stable APIs |
| v15.4.0-canary.82 | 36 | Next.js 16 features, migrations |

### Por Tipo de Contenido

| Tipo | Cantidad | % Total |
|------|----------|---------|
| Code snippets | 68 | 100% |
| Configuration | 15 | 22% |
| Breaking changes | 22 | 32% |
| Migrations | 18 | 26% |
| Optimizations | 8 | 12% |
| Testing | 5 | 7% |

---

## ⚠️ Limitaciones de Context7

1. **Token Limit**: 8000 tokens máximo por query (ajustable)
2. **Freshness**: Depende de la última actualización del repositorio
3. **Context Window**: Snippets pueden estar truncados
4. **Versioning**: No todas las librerías tienen múltiples versiones

---

## 🔄 Mantenimiento de Esta Referencia

### Cuándo Actualizar

- ✅ Cada nueva major version de Next.js
- ✅ Cuando se encuentren nuevos breaking changes
- ✅ Si Context7 actualiza su indexación
- ✅ Feedback del equipo sobre gaps en documentación

### Proceso de Actualización

1. Re-consultar `/vercel/next.js` con topic actualizado
2. Comparar snippets obtenidos vs. documentados
3. Agregar nuevos snippets relevantes
4. Actualizar sección de estadísticas
5. Commitear con mensaje: `docs: update context7 reference for next.js vX.X`

---

## 🎓 Lecciones Aprendidas

### Qué Funcionó Bien

- ✅ Context7 proporcionó documentación 100% actualizada
- ✅ Code snippets fueron directamente aplicables
- ✅ Trust score de 10/10 garantizó calidad
- ✅ Múltiples versiones permitieron comparar cambios

### Qué Mejorar

- ⚠️ Necesitar múltiples queries para temas específicos
- ⚠️ Algunos snippets requirieron contextualización adicional
- ⚠️ Token limit puede ser restrictivo para temas amplios

---

## 📞 Soporte

### Para Problemas con Context7

- [Context7 Documentation](https://context7.dev)
- [MCP Protocol](https://modelcontextprotocol.io)

### Para Next.js

- [Next.js Discord](https://nextjs.org/discord)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

<div align="center">

**Context7 Reference - Little API Project**  
Última actualización: 3 de noviembre de 2025

[⬆️ Volver arriba](#-context7-reference---nextjs-16-migration)

</div>

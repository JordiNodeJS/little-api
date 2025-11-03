# 🚀 Guía de Migración: Next.js 15 → Next.js 16

> **Guía completa y actualizada para migrar tu aplicación Next.js 15 a Next.js 16**
>
> Última actualización: 3 de noviembre de 2025  
> Fuente: [Next.js Official Docs - Context7](/vercel/next.js) v15.1.8, v15.4.0-canary.82

---

## 📋 Tabla de Contenidos

- [Resumen de Cambios](#-resumen-de-cambios)
- [Pre-requisitos](#-pre-requisitos)
- [Paso 1: Actualizar Dependencias](#-paso-1-actualizar-dependencias)
- [Paso 2: Ejecutar Codemod Automático](#-paso-2-ejecutar-codemod-automático)
- [Paso 3: Actualizar Configuración](#-paso-3-actualizar-configuración)
- [Paso 4: Migrar Breaking Changes](#-paso-4-migrar-breaking-changes)
- [Paso 5: Validación y Testing](#-paso-5-validación-y-testing)
- [Consideraciones para Proyectos Grandes](#-consideraciones-para-proyectos-grandes)
- [Checklist de Migración](#-checklist-de-migración)
- [Recursos Adicionales](#-recursos-adicionales)

---

## 🎯 Resumen de Cambios

### 🆕 Nuevas Características

- **Turbopack por defecto** en `next dev` y `next build`
- **React Compiler estable** (memoización automática)
- **Cache Components** (antes `experimental.dynamicIO`)
- **Partial Pre-Rendering (PPR)** mejorado
- **Build Adapters API** (alpha) para customización
- **APIs estables**: `cacheLife`, `cacheTag`

### ⚠️ Breaking Changes

- Middleware → Proxy (renombrado)
- `params` y `searchParams` ahora son **asíncronos**
- `next lint` removido (usar ESLint CLI directamente)
- Runtime configuration removido
- Configuración de Turbopack movida a nivel raíz
- `next/image` TTL cambiado de 60s → 4 horas
- AMP features removidas (legacy)

---

## ✅ Pre-requisitos

### Versiones Mínimas

| Dependencia | Versión Mínima | Recomendada |
|------------|----------------|-------------|
| Node.js | **18.18.0** | **20.x LTS** |
| React | **19.0.0** | **19.2.0** |
| React DOM | **19.0.0** | **19.2.0** |
| Next.js | **16.0.0** | **16.x latest** |
| TypeScript | **5.0** | **5.3+** |

### Verificar Versión de Node.js

```bash
node --version
# Debe ser >= 18.18.0
```

Si necesitas actualizar Node.js:

```bash
# Con nvm (recomendado)
nvm install 20
nvm use 20

# O descarga desde https://nodejs.org/
```

### Estado de tu Proyecto

Antes de migrar:

- ✅ Todos los tests pasando
- ✅ Build exitoso sin warnings
- ✅ Código commiteado (backup seguro)
- ✅ Rama feature creada: `git switch -c feat/upgrade-nextjs-16`

---

## 📦 Paso 1: Actualizar Dependencias

### 1.1 Actualizar React a 19.2

```bash
# Con pnpm (recomendado)
pnpm add react@19.2.0 react-dom@19.2.0

# Con npm
npm install react@19.2.0 react-dom@19.2.0

# Con yarn
yarn add react@19.2.0 react-dom@19.2.0
```

### 1.2 Actualizar Next.js a 16

```bash
# Con pnpm
pnpm add next@latest

# Con npm
npm install next@latest

# Con yarn
yarn add next@latest
```

### 1.3 Actualizar ESLint Config

```bash
# Con pnpm
pnpm add -D eslint-config-next@latest

# Con npm
npm install -D eslint-config-next@latest

# Con yarn
yarn add -D eslint-config-next@latest
```

### 1.4 Instalar React Compiler (opcional pero recomendado)

```bash
# Con pnpm
pnpm add -D babel-plugin-react-compiler

# Con npm
npm install -D babel-plugin-react-compiler

# Con yarn
yarn add -D babel-plugin-react-compiler
```

### 1.5 Verificar `package.json`

Tu `package.json` debe verse así:

```json
{
  "name": "little-api",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "babel-plugin-react-compiler": "^0.1.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^16.0.0",
    "typescript": "^5.3.0"
  }
}
```

---

## 🤖 Paso 2: Ejecutar Codemod Automático

Next.js incluye un codemod que automatiza gran parte de la migración.

### 2.1 Ejecutar Codemod

```bash
npx @next/codemod@canary upgrade latest
```

Este comando:

- ✅ Actualiza `next.config.js` / `next.config.ts`
- ✅ Migra configuración de Turbopack
- ✅ Renombra `middleware` → `proxy`
- ✅ Actualiza imports de APIs estabilizadas
- ✅ Ajusta configuraciones experimentales

### 2.2 Revisar Cambios

```bash
git diff
```

Revisa cada cambio generado por el codemod antes de continuar.

---

## ⚙️ Paso 3: Actualizar Configuración

### 3.1 Migrar Turbopack a Nivel Raíz

**❌ Antes (Next.js 15):**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      resolveAlias: {
        // alias config
      },
    },
  },
}

export default nextConfig
```

**✅ Después (Next.js 16):**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // alias config
    },
  },
}

export default nextConfig
```

### 3.2 Habilitar React Compiler (Recomendado)

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true, // ← Memoización automática
  turbopack: {
    // Tu configuración existente
  },
}

export default nextConfig
```

**Beneficios del React Compiler:**
- 🚀 Memoización automática de componentes
- ⚡ Reduce re-renders innecesarios
- 💾 Mejora rendimiento sin `useMemo`/`useCallback` manuales

### 3.3 Migrar `experimental.dynamicIO` → `cacheComponents`

**❌ Antes:**

```javascript
module.exports = {
  experimental: {
    dynamicIO: true,
  },
}
```

**✅ Después:**

```javascript
module.exports = {
  cacheComponents: true,
}
```

### 3.4 Actualizar Scripts en `package.json`

**✅ Next.js 16 (Turbopack por defecto):**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

**❌ NO NECESITAS (pre-v16):**

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack"
  }
}
```

### 3.5 Habilitar File System Caching (Opcional)

Para compilaciones más rápidas:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true, // ⚡ Cachea compilaciones entre runs
  },
}
```

---

## 🔧 Paso 4: Migrar Breaking Changes

### 4.1 Renombrar Middleware → Proxy

**📁 Archivos a renombrar:**

```bash
# Renombrar archivo
mv middleware.ts proxy.ts
# O
mv middleware.js proxy.js
```

**📝 Actualizar export:**

**❌ Antes:**

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // tu lógica
}

export const config = {
  matcher: '/api/:path*',
}
```

**✅ Después:**

```typescript
// proxy.ts
export function proxy(request: NextRequest) {
  // tu lógica (sin cambios)
}

export const config = {
  matcher: '/api/:path*',
}
```

**🔍 ¿Por qué el cambio?**  
Next.js clarifica que estas funciones operan en el "network boundary" (proxy), no en middleware tradicional.

### 4.2 Actualizar Configuración de Proxy

**❌ Antes:**

```typescript
const nextConfig: NextConfig = {
  skipMiddlewareUrlNormalize: true,
}
```

**✅ Después:**

```typescript
const nextConfig: NextConfig = {
  skipProxyUrlNormalize: true, // ← Nuevo nombre
}
```

### 4.3 Migrar `params` Asíncronos en Pages/Layouts

#### En Pages

**❌ Antes (síncrono):**

```typescript
// app/posts/[slug]/page.tsx
type Params = { slug: string }

export default function Page({ params }: { params: Params }) {
  const { slug } = params // ❌ Ya no funciona
  return <h1>Post: {slug}</h1>
}
```

**✅ Después (asíncrono):**

```typescript
// app/posts/[slug]/page.tsx
type Params = Promise<{ slug: string }> // ← Ahora es Promise

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params // ← await required
  return <h1>Post: {slug}</h1>
}
```

#### En Layouts

**Opción 1: Async/Await**

```typescript
// app/posts/[slug]/layout.tsx
type Params = Promise<{ slug: string }>

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = await params
  return <div data-slug={slug}>{children}</div>
}
```

**Opción 2: React `use` hook (componentes síncronos)**

```typescript
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = use(params) // ← Desenvuelve la Promise
  return <div data-slug={slug}>{children}</div>
}
```

#### SearchParams también son asíncronos

**❌ Antes:**

```typescript
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const { query } = searchParams
}
```

**✅ Después:**

```typescript
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const { query } = params
}
```

### 4.4 Migrar `generateImageMetadata` (Asíncrono)

**❌ Antes:**

```typescript
export function generateImageMetadata({ params }) {
  const { slug } = params
  return [{ id: '1' }, { id: '2' }]
}

export default function Image({ params, id }) {
  const { slug } = params
  const imageId = id // string
  // ...
}
```

**✅ Después:**

```typescript
export async function generateImageMetadata({ params }) {
  const { slug } = await params // ← await
  return [{ id: '1' }, { id: '2' }]
}

export default async function Image({ params, id }) {
  const { slug } = await params // ← await
  const imageId = await id // ← id es Promise<string>
  // ...
}
```

### 4.5 Migrar APIs de Next/Headers (Asíncronas)

#### `cookies()`

**❌ Antes:**

```typescript
import { cookies } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return <p>{token?.value}</p>
}
```

**✅ Después:**

```typescript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies() // ← await
  const token = cookieStore.get('token')
  return <p>{token?.value}</p>
}
```

#### `headers()`

**❌ Antes:**

```typescript
import { headers } from 'next/headers'

export default function Page() {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
}
```

**✅ Después:**

```typescript
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers() // ← await
  const userAgent = headersList.get('user-agent')
}
```

#### `draftMode()`

**❌ Antes:**

```typescript
import { draftMode } from 'next/headers'

export default function Page() {
  const { isEnabled } = draftMode()
}
```

**✅ Después:**

```typescript
import { draftMode } from 'next/headers'

export default async function Page() {
  const draft = await draftMode() // ← await
  const { isEnabled } = draft
}
```

### 4.6 Migrar `next lint` → ESLint CLI

**❌ Removido en Next.js 15:**

```bash
next lint
```

**✅ Usar ESLint directamente:**

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```

Esto actualiza tus scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 4.7 Migrar Runtime Config → Environment Variables

**❌ Removido en Next.js 15:**

```javascript
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  publicRuntimeConfig: {
    apiUrl: '/api',
  },
}
```

```typescript
// page.tsx
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
console.log(publicRuntimeConfig.apiUrl)
```

**✅ Usar variables de entorno:**

**`.env.local`:**

```bash
# Server-only (no expuesto al cliente)
DATABASE_URL=postgresql://...

# Public (expuesto al cliente)
NEXT_PUBLIC_API_URL=/api
```

**Server Component:**

```typescript
async function fetchData() {
  const dbUrl = process.env.DATABASE_URL // ✅ Solo en servidor
  return await db.query(dbUrl, 'SELECT * FROM users')
}

export default async function Page() {
  const data = await fetchData()
  return <div>{/* render data */}</div>
}
```

**Client Component:**

```typescript
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // ✅ Prefijo NEXT_PUBLIC_
  return <p>API URL: {apiUrl}</p>
}
```

**Para valores en runtime (opcionales):**

```typescript
import { connection } from 'next/server'

export default async function Page() {
  await connection() // Espera a runtime
  const config = process.env.RUNTIME_CONFIG
  return <p>{config}</p>
}
```

### 4.8 Actualizar `next/image` Configuration

#### 4.8.1 TTL Cache Cambiado

**⚠️ Cambio automático:**
- Antes: `minimumCacheTTL` = 60s
- Ahora: `minimumCacheTTL` = 4 horas (14400s)

**Para revertir al comportamiento anterior:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60, // ← Restaurar 60s
  },
}
```

#### 4.8.2 Migrar `images.domains` → `images.remotePatterns`

**❌ Deprecado:**

```javascript
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```

**✅ Nuevo:**

```javascript
module.exports = {
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

#### 4.8.3 Local Images con Query Strings

**⚠️ Requiere configuración explícita en Next.js 16:**

```typescript
// Componente con query string
import Image from 'next/image'

export default function Page() {
  return <Image src="/assets/photo?v=1" alt="Photo" width="100" height="100" />
}
```

**Configuración requerida:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '?v=1', // ← Permitir ?v=1
      },
    ],
  },
}
```

#### 4.8.4 Migrar `next/legacy/image`

**❌ Antes:**

```typescript
import Image from 'next/legacy/image'
```

**✅ Después:**

```typescript
import Image from 'next/image'
```

### 4.9 Migrar Parallel Routes `default.js`

**⚠️ Breaking Change:**  
Next.js 16 requiere un archivo `default.js` para cada parallel route slot.

**Estructura de ejemplo:**

```
app/
├── @modal/
│   ├── login/
│   │   └── page.tsx
│   └── default.tsx  ← REQUERIDO
└── layout.tsx
```

**Opción 1: Return `notFound()`**

```tsx
// app/@modal/default.tsx
import { notFound } from 'next/navigation'

export default function Default() {
  notFound() // ✅ Mantiene comportamiento anterior
}
```

**Opción 2: Return `null`**

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null // ✅ También válido
}
```

### 4.10 Sass Imports sin Tilde (`~`)

**❌ Antes:**

```scss
@import '~bootstrap/dist/css/bootstrap.min.css';
```

**✅ Después:**

```scss
@import 'bootstrap/dist/css/bootstrap.min.css'; // Sin ~
```

**Workaround temporal (no recomendado):**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '~*': '*', // Permite ~ pero refactorizar es mejor
    },
  },
}
```

### 4.11 Actualizar Imports de APIs Estables

**❌ Antes:**

```typescript
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'
```

**✅ Después:**

```typescript
import { cacheLife, cacheTag } from 'next/cache' // ✅ Ya no son unstable
```

### 4.12 Ajustar Detección de Entorno Dev en `next.config.js`

**❌ Antes:**

```javascript
const isDev = process.argv.includes('dev')

if (isDev) {
  startServer()
}
```

**✅ Después:**

```javascript
const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  startServer()
}
```

### 4.13 Desactivar Override de Smooth Scroll (opcional)

**⚠️ Cambio de comportamiento:**  
Next.js 16 ya NO sobreescribe `scroll-behavior: smooth` automáticamente.

**Para mantener comportamiento anterior:**

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
```

---

## 🧪 Paso 5: Validación y Testing

### 5.1 Compilar y Verificar Errores

```bash
# Limpiar cache
rm -rf .next

# Compilar
pnpm build
# O: npm run build
# O: yarn build
```

**Revisar output:**
- ❌ Errores de tipos (TypeScript)
- ❌ Errores de compilación (Turbopack)
- ⚠️ Warnings (revisar pero no bloquean)

### 5.2 Ejecutar Linter

```bash
pnpm lint
# O: npm run lint
```

**Corregir errores:**

```bash
pnpm lint:fix
# O: npm run lint -- --fix
```

### 5.3 Ejecutar Tests

```bash
# Unit tests
pnpm test
# O: npm test

# E2E tests (si aplica)
pnpm test:e2e
```

### 5.4 Verificar Desarrollo Local

```bash
pnpm dev
```

**Checklist de pruebas manuales:**

- [ ] Todas las rutas cargan correctamente
- [ ] Navegación entre páginas funciona
- [ ] Forms y validaciones funcionan
- [ ] Imágenes cargan (local y remotas)
- [ ] API routes responden correctamente
- [ ] Middleware/Proxy funciona (si aplica)
- [ ] Authentication funciona (si aplica)
- [ ] No hay errores en consola del navegador

### 5.5 Preview de Producción

```bash
pnpm build
pnpm start
```

Abre `http://localhost:3000` y verifica:

- [ ] Build optimizado funciona
- [ ] Static pages renderizan
- [ ] Dynamic routes funcionan
- [ ] API endpoints responden
- [ ] Assets cargan desde CDN (si aplica)

### 5.6 Verificar Performance

```bash
# Lighthouse CLI (opcional)
npm install -g @lhci/cli
lhci autorun --url=http://localhost:3000
```

**Métricas a revisar:**

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

### 5.7 Testing en Vercel (Pre-Producción)

Si usas Vercel, crea un preview deploy:

```bash
# Push a rama feature
git push origin feat/upgrade-nextjs-16

# Vercel creará un preview deploy automáticamente
# URL: https://little-api-<hash>.vercel.app
```

**Verificar en preview:**

- [ ] Build exitoso
- [ ] Todas las funcionalidades operativas
- [ ] Performance aceptable
- [ ] Logs sin errores

---

## 🏢 Consideraciones para Proyectos Grandes

### 1. Estrategia de Migración Incremental

Para proyectos grandes o monorepos, migrar gradualmente:

#### Fase 1: Preparación (Semana 1)

- [ ] Actualizar dependencias en ambiente de desarrollo
- [ ] Ejecutar codemod en rama separada
- [ ] Crear documentación de cambios necesarios
- [ ] Identificar componentes críticos

#### Fase 2: Migración de Infraestructura (Semana 2)

- [ ] Actualizar `next.config.ts`
- [ ] Migrar middleware → proxy
- [ ] Actualizar scripts y CI/CD
- [ ] Testing en staging

#### Fase 3: Migración de Código (Semana 3-4)

- [ ] Migrar `params` asíncronos por módulo
- [ ] Actualizar APIs de `next/headers`
- [ ] Migrar imágenes y assets
- [ ] Testing funcional por módulo

#### Fase 4: Optimización (Semana 5)

- [ ] Habilitar React Compiler
- [ ] Configurar Cache Components
- [ ] Performance testing
- [ ] Deploy a producción

### 2. Monorepos (Turborepo/Nx)

#### Turborepo

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

#### Estrategia:

1. Actualizar un paquete a la vez
2. Ejecutar tests del monorepo completo después de cada cambio
3. Verificar que builds downstream no se rompan

### 3. Migración Segura con Feature Flags

```typescript
// lib/feature-flags.ts
export const FEATURES = {
  USE_REACT_COMPILER: process.env.NEXT_PUBLIC_USE_REACT_COMPILER === 'true',
  USE_CACHE_COMPONENTS: process.env.NEXT_PUBLIC_USE_CACHE_COMPONENTS === 'true',
}

// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: FEATURES.USE_REACT_COMPILER, // ← Control con env var
  cacheComponents: FEATURES.USE_CACHE_COMPONENTS,
}
```

### 4. Rollback Strategy

**Antes de deploy a producción:**

1. **Tag version actual:**

   ```bash
   git tag -a v1.0.0-nextjs15 -m "Pre Next.js 16 migration"
   git push origin v1.0.0-nextjs15
   ```

2. **Mantener rama de rollback:**

   ```bash
   git switch -c rollback/nextjs15
   git push origin rollback/nextjs15
   ```

3. **Plan de rollback:**

   ```bash
   # Si algo falla en producción:
   git revert HEAD~5..HEAD  # Revertir últimos commits
   # O:
   git reset --hard v1.0.0-nextjs15
   git push --force origin main
   ```

### 5. Comunicación con el Equipo

#### Antes de la migración:

- [ ] Notificar al equipo de desarrollo
- [ ] Documentar breaking changes
- [ ] Programar sesión de Q&A
- [ ] Crear guía interna (este documento)

#### Durante la migración:

- [ ] Daily standups con status
- [ ] Canal de Slack/Teams dedicado
- [ ] Documentar problemas encontrados

#### Después de la migración:

- [ ] Retrospectiva del proceso
- [ ] Actualizar documentación del proyecto
- [ ] Compartir lecciones aprendidas

---

## ✅ Checklist de Migración

### Pre-Migración

- [ ] Backup de código (Git tag/branch)
- [ ] Node.js >= 18.18.0 instalado
- [ ] Tests pasando al 100%
- [ ] Build exitoso sin warnings
- [ ] Equipo notificado

### Actualización de Dependencias

- [ ] React 19.2.0 instalado
- [ ] React DOM 19.2.0 instalado
- [ ] Next.js 16.x instalado
- [ ] ESLint config actualizado
- [ ] TypeScript types actualizados
- [ ] Babel plugin React Compiler instalado

### Configuración

- [ ] `next.config.ts` actualizado
- [ ] Turbopack movido a nivel raíz
- [ ] React Compiler habilitado
- [ ] `experimental.dynamicIO` → `cacheComponents`
- [ ] Scripts de `package.json` actualizados
- [ ] `.gitignore` incluye `.next/`

### Breaking Changes

- [ ] Middleware renombrado a Proxy
- [ ] `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`
- [ ] `params` migrado a async en todas las pages
- [ ] `searchParams` migrado a async
- [ ] `cookies()` migrado a async
- [ ] `headers()` migrado a async
- [ ] `draftMode()` migrado a async
- [ ] `generateImageMetadata` migrado a async
- [ ] `next lint` removido, usando ESLint CLI
- [ ] Runtime config migrado a env vars
- [ ] `next/image` domains → remotePatterns
- [ ] `next/image` local query strings configurados
- [ ] `next/legacy/image` migrado a `next/image`
- [ ] Parallel routes tienen `default.js`
- [ ] Sass imports sin tilde (`~`)
- [ ] APIs `unstable_*` actualizadas a estables
- [ ] Detección de dev environment actualizada
- [ ] Smooth scroll configurado (si aplica)

### Testing y Validación

- [ ] Build exitoso sin errores
- [ ] Linter ejecutado sin errores
- [ ] Tests unitarios pasando
- [ ] Tests E2E pasando (si aplica)
- [ ] Dev server funciona correctamente
- [ ] Preview de producción verificado
- [ ] Performance aceptable
- [ ] Preview deploy en Vercel exitoso

### Deployment

- [ ] CI/CD actualizado
- [ ] Variables de entorno configuradas
- [ ] Preview deploy verificado
- [ ] Deploy a producción exitoso
- [ ] Monitoring configurado
- [ ] Rollback plan documentado

### Post-Migración

- [ ] Documentación actualizada
- [ ] Equipo capacitado en nuevas APIs
- [ ] Lecciones aprendidas documentadas
- [ ] Retrospectiva realizada

---

## 🎓 Recursos Adicionales

### Documentación Oficial

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Turbopack Documentation](https://turbo.build/pack/docs)
- [React Compiler](https://react.dev/learn/react-compiler)

### Herramientas

- [Next.js Codemod](https://github.com/vercel/next.js/tree/canary/packages/next-codemod)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Turborepo](https://turbo.build/repo)

### Comunidad

- [Next.js Discord](https://nextjs.org/discord)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow - Next.js](https://stackoverflow.com/questions/tagged/next.js)

### Codemods Disponibles

```bash
# Migrar CRA → Next.js
npx @next/codemod cra-to-next

# Migrar next lint → ESLint CLI
npx @next/codemod@canary next-lint-to-eslint-cli .

# Upgrade a latest
npx @next/codemod@canary upgrade latest
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'next/headers'"

**Solución:** Actualizar `@types/node`:

```bash
pnpm add -D @types/node@latest
```

### Error: "params is not iterable"

**Causa:** Olvidaste `await params` en una page/layout.

**Solución:**

```typescript
// ❌ Incorrecto
const { slug } = params

// ✅ Correcto
const { slug } = await params
```

### Error: "Module not found: Can't resolve 'fs'"

**Causa:** Intentando importar módulo Node.js en client-side.

**Solución:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      fs: {
        browser: './empty.ts',
      },
    },
  },
}
```

### Build muy lento después de migrar

**Solución:** Habilitar file system cache:

```typescript
const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}
```

### Imágenes no cargan con query strings

**Solución:** Configurar `localPatterns`:

```typescript
const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '?v=*',
      },
    ],
  },
}
```

---

## 📊 Comparación de Rendimiento

### Tiempo de Build (ejemplo)

| Métrica | Next.js 15 | Next.js 16 | Mejora |
|---------|------------|------------|--------|
| Cold build | 45s | 32s | **-29%** |
| Incremental build | 8s | 3s | **-62%** |
| Dev startup | 3.2s | 1.8s | **-44%** |
| HMR | 250ms | 150ms | **-40%** |

### Bundle Size (ejemplo)

| Métrica | Next.js 15 | Next.js 16 | Cambio |
|---------|------------|------------|--------|
| First Load JS | 85 kB | 78 kB | **-8%** |
| Runtime overhead | 42 kB | 38 kB | **-9%** |

*Resultados varían según el proyecto

---

## 🎉 Conclusión

¡Felicidades! Si completaste todos los pasos del checklist, tu aplicación ahora está corriendo en Next.js 16 con:

- ✅ React 19.2 (última versión estable)
- ✅ Turbopack por defecto (builds más rápidos)
- ✅ React Compiler (memoización automática)
- ✅ APIs asíncronas modernas
- ✅ Mejor rendimiento y DX

---

## 📝 Notas Finales

- **Mantén este documento actualizado** conforme Next.js 16 evolucione
- **Reporta bugs** en [GitHub Issues](https://github.com/vercel/next.js/issues)
- **Comparte feedback** con el equipo de Vercel

---

<div align="center">

**Guía creada para el proyecto Little API**  
Última actualización: 3 de noviembre de 2025

[⬆️ Volver arriba](#-guía-de-migración-nextjs-15--nextjs-16)

</div>

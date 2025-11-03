# ✅ Next.js 15 → 16 Migration Checklist (Printable)

> **Imprime esta hoja y marca cada ítem completado**  
> Fecha de inicio: ___/___/2025

---

## 🎯 Pre-Requisitos

**Fecha:** ___/___  
**Responsable:** _________________

- [ ] Node.js >= 18.18.0 verificado
- [ ] Git branch creado: `feat/upgrade-nextjs-16`
- [ ] Todos los tests pasando (100%)
- [ ] Build actual exitoso sin warnings
- [ ] Código commiteado y respaldado
- [ ] Equipo notificado de la migración
- [ ] Tag de respaldo creado: `v1.0.0-nextjs15`

---

## 📦 1. Actualizar Dependencias

**Fecha:** ___/___  
**Responsable:** _________________

### 1.1 React 19.2

```bash
pnpm add react@19.2.0 react-dom@19.2.0
```

- [ ] React actualizado a 19.2.0
- [ ] React DOM actualizado a 19.2.0
- [ ] Sin errores en instalación

### 1.2 Next.js 16

```bash
pnpm add next@latest
```

- [ ] Next.js actualizado a 16.x
- [ ] Versión verificada: `npx next --version`

### 1.3 ESLint Config

```bash
pnpm add -D eslint-config-next@latest
```

- [ ] eslint-config-next actualizado
- [ ] Sin conflictos de versiones

### 1.4 React Compiler

```bash
pnpm add -D babel-plugin-react-compiler
```

- [ ] babel-plugin-react-compiler instalado
- [ ] Versión verificada en `package.json`

### 1.5 TypeScript Types

```bash
pnpm add -D @types/react@latest @types/react-dom@latest
```

- [ ] @types/react actualizado
- [ ] @types/react-dom actualizado
- [ ] Sin errores de tipos

---

## 🤖 2. Codemod Automático

**Fecha:** ___/___  
**Responsable:** _________________

```bash
npx @next/codemod@canary upgrade latest
```

- [ ] Codemod ejecutado sin errores
- [ ] Cambios revisados con `git diff`
- [ ] Cambios comprometidos: `git commit -m "chore: run next 16 codemod"`

---

## ⚙️ 3. Configuración (`next.config.ts`)

**Fecha:** ___/___  
**Responsable:** _________________

### 3.1 Turbopack a Nivel Raíz

- [ ] `experimental.turbopack` movido a `turbopack`
- [ ] Configuración verificada sin warnings

### 3.2 React Compiler

- [ ] `reactCompiler: true` agregado
- [ ] Build de prueba exitoso

### 3.3 Cache Components

- [ ] `experimental.dynamicIO` removido
- [ ] `cacheComponents: true` agregado (si aplica)

### 3.4 Scripts `package.json`

- [ ] `"dev": "next dev"` (sin --turbopack)
- [ ] `"build": "next build"` (sin --turbopack)
- [ ] `"lint": "eslint ."` (sin next lint)

### 3.5 File System Cache (opcional)

- [ ] `experimental.turbopackFileSystemCacheForDev: true` agregado

---

## 🔧 4. Breaking Changes

**Fecha:** ___/___  
**Responsable:** _________________

### 4.1 Middleware → Proxy

- [ ] `middleware.ts` renombrado a `proxy.ts`
- [ ] Export `middleware` renombrado a `proxy`
- [ ] `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`

### 4.2 Params Asíncronos

#### Pages

- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓

**Patrón aplicado:**

```typescript
export default async function Page({ params }: { params: Promise<{...}> }) {
  const { slug } = await params // ✓
}
```

#### Layouts

- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓

#### SearchParams

- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓

### 4.3 Next/Headers Asíncronos

#### cookies()

- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓

```typescript
const cookieStore = await cookies() // ✓
```

#### headers()

- [ ] Archivo: `___________________` ✓
- [ ] Archivo: `___________________` ✓

```typescript
const headersList = await headers() // ✓
```

#### draftMode()

- [ ] Archivo: `___________________` ✓

```typescript
const draft = await draftMode() // ✓
```

### 4.4 Image Generation

- [ ] `generateImageMetadata` → async
- [ ] `Image` component → params y id async

### 4.5 Linting

- [ ] `next lint` removido de scripts
- [ ] Codemod `next-lint-to-eslint-cli` ejecutado
- [ ] ESLint CLI funcionando: `pnpm lint`

### 4.6 Runtime Config → Env Vars

- [ ] `serverRuntimeConfig` removido
- [ ] `publicRuntimeConfig` removido
- [ ] Variables movidas a `.env.local`
- [ ] Client vars con prefijo `NEXT_PUBLIC_`

### 4.7 Next/Image

#### TTL Cache

- [ ] Decisión tomada: [ ] Mantener 4h [ ] Revertir a 60s
- [ ] Configurado en `next.config.ts` (si revertir)

#### Domains → Remote Patterns

- [ ] `images.domains` removido
- [ ] `images.remotePatterns` configurado

#### Local Query Strings

- [ ] `images.localPatterns` configurado (si aplica)

#### Legacy Image

- [ ] `next/legacy/image` migrado a `next/image`

### 4.8 Parallel Routes

- [ ] Archivos `default.tsx` creados:
  - [ ] `app/@modal/default.tsx`
  - [ ] `app/@sidebar/default.tsx`
  - [ ] `app/@___/default.tsx`

### 4.9 Sass Imports

- [ ] Tilde (`~`) removida de imports
- [ ] Build verificado sin warnings

### 4.10 APIs Estables

- [ ] `unstable_cacheLife` → `cacheLife`
- [ ] `unstable_cacheTag` → `cacheTag`
- [ ] Imports actualizados

### 4.11 Detección de Dev Environment

- [ ] `process.argv` reemplazado por `process.env.NODE_ENV`

### 4.12 Smooth Scroll (opcional)

- [ ] `data-scroll-behavior="smooth"` agregado (si aplica)

---

## 🧪 5. Testing y Validación

**Fecha:** ___/___  
**Responsable:** _________________

### 5.1 Build

```bash
rm -rf .next
pnpm build
```

- [ ] Build exitoso sin errores
- [ ] Warnings revisados y documentados
- [ ] Bundle size aceptable

### 5.2 Linter

```bash
pnpm lint
```

- [ ] Lint ejecutado sin errores
- [ ] Warnings corregidos

### 5.3 Tests

```bash
pnpm test
```

- [ ] Tests unitarios: ___% pasando
- [ ] Tests E2E: ___% pasando (si aplica)
- [ ] Tests de integración: ___% pasando (si aplica)

### 5.4 Desarrollo Local

```bash
pnpm dev
```

**Checklist manual:**

- [ ] Home page carga
- [ ] Navegación funciona
- [ ] API routes responden
- [ ] Forms validan correctamente
- [ ] Imágenes cargan (local)
- [ ] Imágenes cargan (remotas)
- [ ] Middleware/Proxy ejecuta
- [ ] Authentication funciona (si aplica)
- [ ] Sin errores en consola del navegador
- [ ] HMR funciona correctamente

### 5.5 Preview de Producción

```bash
pnpm build && pnpm start
```

**Checklist manual:**

- [ ] Build optimizado funciona
- [ ] Static pages renderizan
- [ ] Dynamic routes funcionan
- [ ] API endpoints responden
- [ ] Assets cargan desde CDN (si aplica)
- [ ] Redirects funcionan
- [ ] Rewrites funcionan
- [ ] Headers personalizados aplicados

### 5.6 Performance

- [ ] Lighthouse ejecutado
- [ ] FCP: ___s (target: <1.8s)
- [ ] LCP: ___s (target: <2.5s)
- [ ] TTI: ___s (target: <3.8s)
- [ ] CLS: ___ (target: <0.1)

---

## 🚀 6. Deployment

**Fecha:** ___/___  
**Responsable:** _________________

### 6.1 Pre-Deploy

- [ ] CI/CD pipeline actualizado
- [ ] Variables de entorno configuradas en Vercel
- [ ] Secretos verificados
- [ ] Build commands actualizados

### 6.2 Preview Deploy (Vercel)

```bash
git push origin feat/upgrade-nextjs-16
```

- [ ] Preview deploy exitoso
- [ ] URL: `https://___________________`
- [ ] Funcionalidades verificadas
- [ ] Logs sin errores
- [ ] Performance aceptable

### 6.3 Producción

- [ ] Pull Request creado
- [ ] Code review completado
- [ ] Aprobaciones recibidas: ___/___
- [ ] Merge a `main`
- [ ] Deploy a producción exitoso
- [ ] URL: `https://___________________`
- [ ] Smoke tests ejecutados
- [ ] Monitoring sin alertas

---

## 📝 7. Post-Migración

**Fecha:** ___/___  
**Responsable:** _________________

### 7.1 Documentación

- [ ] README actualizado
- [ ] CHANGELOG actualizado
- [ ] Guía de contribución actualizada
- [ ] Lecciones aprendidas documentadas

### 7.2 Equipo

- [ ] Equipo capacitado en nuevas APIs
- [ ] Q&A session realizada
- [ ] Retrospectiva programada

### 7.3 Monitoreo

- [ ] Monitoring configurado (24h)
- [ ] Alertas revisadas (48h)
- [ ] Performance metrics comparadas (1 semana)

---

## 🐛 Issues Encontrados

### Issue #1

**Descripción:** ___________________________________  
**Fecha:** ___/___  
**Solución:** _____________________________________  
**Estado:** [ ] Resuelto [ ] En progreso [ ] Bloqueado

### Issue #2

**Descripción:** ___________________________________  
**Fecha:** ___/___  
**Solución:** _____________________________________  
**Estado:** [ ] Resuelto [ ] En progreso [ ] Bloqueado

### Issue #3

**Descripción:** ___________________________________  
**Fecha:** ___/___  
**Solución:** _____________________________________  
**Estado:** [ ] Resuelto [ ] En progreso [ ] Bloqueado

---

## 📊 Métricas Finales

### Build Times

| Métrica | Antes (Next 15) | Después (Next 16) | Mejora |
|---------|-----------------|-------------------|--------|
| Cold build | ___s | ___s | ___% |
| Incremental | ___s | ___s | ___% |
| Dev startup | ___s | ___s | ___% |
| HMR | ___ms | ___ms | ___% |

### Bundle Sizes

| Métrica | Antes | Después | Cambio |
|---------|-------|---------|--------|
| First Load JS | ___ kB | ___ kB | ___% |
| Total JS | ___ kB | ___ kB | ___% |

---

## ✅ Aprobación Final

**Migración completada por:** _________________  
**Fecha:** ___/___/2025  
**Firma:** _________________

**Revisado por:** _________________  
**Fecha:** ___/___/2025  
**Firma:** _________________

**Aprobado para producción:** [ ] SÍ [ ] NO  
**Notas:** _____________________________________  
_____________________________________________

---

## 🎉 Celebración

- [ ] Tweet/post anunciando upgrade ✓
- [ ] Actualizar badge en README ✓
- [ ] Compartir métricas con el equipo ✓
- [ ] 🍕 Pizza party programada ✓

---

<div align="center">

**Next.js 16 Migration - Little API Project**

[⬆️ Volver arriba](#-nextjs-15--16-migration-checklist-printable)

</div>

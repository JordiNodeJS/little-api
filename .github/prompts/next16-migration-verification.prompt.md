### Prompt para AI: Verificación de Migración a Next.js 16 (Little API)

Actúa como revisor técnico. Verifica que la migración a Next.js 16 esté completa y correcta en el repo Little API. No edites archivos; solo reporta hallazgos y propuestas de edición. Usa pnpm en comandos.

### Contexto del repo
- **Stack esperado**: Next.js 16.x, React 19.2.x, TypeScript 5.x, ESLint 9, Tailwind 4, App Router.
- **Reglas del repo**: usar `pnpm`, código educativo, TypeScript estricto, App Router, respuestas API tipadas con `success/data/error`.
- **Documentos de guía**: `docs/MIGRATION-NEXT-15-TO-16.md`, `docs/MIGRATION-SUMMARY.md`.

### Qué revisar (checklist técnica)
1) **Dependencias**
   - `package.json`: `next@^16`, `react@^19.2`, `react-dom@^19.2`, `eslint-config-next@^16`, `typescript@^5`, `babel-plugin-react-compiler` presente.
   - Scripts: `dev|build|start|lint` sin flags turbopack manuales; `lint` usa `eslint .`.

2) **Config de Next**
   - `next.config.ts`: `reactCompiler: true`; configuración de `turbopack` en raíz (no en `experimental`).
   - Opcional: `experimental.turbopackFileSystemCacheForDev: true`.
   - Si existe `images`, validar `remotePatterns` vs `domains`, TTL y `localPatterns` si hay query strings locales.

3) **Breaking changes**
   - No existe `middleware.(ts|js)` o fue migrado a `proxy.(ts|js)`; `skipProxyUrlNormalize` si aplica.
   - Páginas/Layouts con `params`/`searchParams` asíncronos (si existen): son `Promise` y se usa `await` o `use()`.
   - `cookies()`, `headers()`, `draftMode()` se usan con `await`.
   - No usar `next/legacy/image`; usar `next/image`.
   - `unstable_cacheLife/cacheTag` reemplazados por estables.
   - `next lint` no usado; se usa ESLint CLI.
   - Runtime config eliminado (server/public runtime config).

4) **Código de endpoints (`app/api/**/route.ts`)**
   - App Router; exporta `GET/POST/...`.
   - Tipado con `NextRequest` y `Promise<Response]`.
   - Manejo de errores, validación y estructura estándar (`success/data/error`).
   - `dynamic`, `revalidate`, `runtime` si aplica.

5) **TypeScript/ESLint**
   - `tsconfig.json`: `strict: true`, `moduleResolution: bundler`, plugin `next` presente.
   - `eslint.config.*`: compatible ESLint 9 y Next 16 (sin `next lint`).

6) **Documentación/UX**
   - `README.md`, `app/page.tsx`, y docs: actualizar badges/textos “Next.js 15” → “Next.js 16” y versiones (p. ej., 16.0.1).
   - Mantener menciones históricas de v15 solo en secciones comparativas.

7) **Build/Lint (informar, no ejecutar si no procede)**
   - Comandos esperados:
     - `pnpm build`
     - `pnpm lint`

### Cómo buscar
- Buscar literal y semántico:
  - “Next.js 15”, “15.5.4”, “legacy/image”, “unstable_cache”, “middleware”, “skipMiddlewareUrlNormalize”, “next lint”.
- Archivos clave: `app/**`, `next.config.ts`, `tsconfig.json`, `eslint.config.*`, `package.json`, `README.md`, `docs/**`.

### Formato de salida
- **Resumen final**: Estado general (✅/⚠️/❌).
- **Checklist** con estado por ítem.
- **Hallazgos concretos**: `archivo:línea` con snippet corto y propuesta de edit.
- **Cambios sugeridos**: lista de edits propuestos.
- **Comandos recomendados** (solo para ejecución por el usuario).

### Criterios de aceptación
- Dependencias y scripts correctos.
- Config de Next conforme v16.
- Sin breaking changes pendientes.
- Endpoints alineados a reglas del repo.
- Documentación/UX sin referencias desactualizadas a v15 (salvo contexto histórico).
- Build y lint sin errores.

### Ejemplo de salida (modelo)
- **Estado**: ✅ Migración técnica completa; ❌ Documentación desactualizada.
- **Dependencias**: ✅ `next@16.0.1`, ✅ `react@19.2.0`, ✅ `eslint-config-next@16`, ✅ `typescript@^5`, ✅ `babel-plugin-react-compiler`.
- **Config Next**: ✅ `reactCompiler: true`; ✅ `turbopack` en raíz; ⚠️ `images.*` no configurado (N/A).
- **Breaking Changes**: ✅ Sin `middleware.ts`; ✅ no `unstable_*`; ✅ no `legacy/image`.
- **Endpoints**: ✅ Tipados y con `Response.json()`; ✅ `dynamic='force-dynamic'`.
- **Docs/HUIs**:
  - `package.json:5` “Next.js 15” → “Next.js 16”.
  - `app/page.tsx:355` badge “Next.js 15.5.4” → “Next.js 16.0.1”.
  - `README.md` múltiples líneas “Next.js 15” → actualizar o contextualizar.
- **Propuestas de edit**:
  - `package.json` description: “Proyecto educativo de Next.js 16…”.
  - `README.md` badge y tabla: Next.js 16.0.1.
  - `app/page.tsx` SEO/textos: “Next.js 16”.
- **Comandos**:
  - `pnpm build`
  - `pnpm lint`



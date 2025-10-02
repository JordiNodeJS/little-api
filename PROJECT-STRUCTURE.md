# 📁 Estructura Completa del Proyecto

```
little-api/
│
├── 📂 app/                                    # Directorio principal de Next.js App Router
│   ├── 📂 api/                                # Endpoints de la API
│   │   ├── 📂 advice/
│   │   │   └── route.ts                       # Endpoint de consejos aleatorios
│   │   └── 📂 dog/
│   │       └── route.ts                       # Endpoint de imágenes de perros
│   │
│   ├── layout.tsx                             # Layout raíz de la aplicación
│   ├── page.tsx                               # Página principal (home)
│   ├── globals.css                            # Estilos globales
│   └── favicon.ico                            # Ícono del sitio
│
├── 📂 docs/                                   # Documentación educativa
│   ├── TUTORIAL.md                            # Tutorial paso a paso completo
│   ├── TESTING.md                             # Guía de testing de endpoints
│   ├── LESSONS-LEARNED.md                     # Conceptos clave y lecciones
│   ├── EXERCISES.md                           # Ejercicios prácticos propuestos
│   └── CHROME-DEVTOOLS-DEBUGGING.md           # Debugging con Chrome DevTools MCP
│
├── 📂 .github/                                # Configuración de GitHub
│   └── 📂 prompts/
│       └── ai-coding-rules.md                 # Reglas para asistentes de IA
│
├── 📂 .cursor/                                # Configuración de Cursor AI
│   └── rules.md                               # Reglas avanzadas Chrome DevTools MCP
│
├── 📂 public/                                 # Archivos estáticos públicos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📂 node_modules/                           # Dependencias instaladas (gitignored)
│
├── 📄 package.json                            # Dependencias y scripts del proyecto
├── 📄 pnpm-lock.yaml                          # Lock file de pnpm
├── 📄 tsconfig.json                           # Configuración de TypeScript
├── 📄 next.config.ts                          # Configuración de Next.js
├── 📄 eslint.config.mjs                       # Configuración de ESLint
├── 📄 postcss.config.mjs                      # Configuración de PostCSS
├── 📄 next-env.d.ts                           # Tipos de Next.js (auto-generado)
│
├── 📄 README.md                               # Documentación principal del proyecto
├── 📄 CONTRIBUTING.md                         # Guía para contribuidores
├── 📄 LICENSE                                 # Licencia MIT
├── 📄 PROJECT-STRUCTURE.md                    # Este archivo
├── 📄 .cursorrules                            # Reglas de AI para Cursor (Next.js 15)
│
├── 📄 test-api.js                             # Script de testing automático
├── 📄 .env.example                            # Ejemplo de variables de entorno
└── 📄 .gitignore                              # Archivos ignorados por Git

```

---

## 📋 Descripción de Archivos Clave

### Endpoints API

| Archivo | Ruta URL | Descripción |
|---------|----------|-------------|
| `app/api/advice/route.ts` | `/api/advice` | Consejos aleatorios desde Advice Slip API |
| `app/api/dog/route.ts` | `/api/dog` | Imágenes de perros desde Dog CEO API |

### Documentación

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Documentación principal, quick start, ejemplos |
| `docs/TUTORIAL.md` | Tutorial completo paso a paso (12 secciones) |
| `docs/TESTING.md` | Guía de testing con múltiples herramientas |
| `docs/LESSONS-LEARNED.md` | Conceptos clave que los estudiantes deben dominar |
| `docs/EXERCISES.md` | 10 ejercicios prácticos + 3 proyectos finales |
| `docs/CHROME-DEVTOOLS-DEBUGGING.md` | Debugging avanzado con Chrome DevTools MCP |
| `CONTRIBUTING.md` | Guía para contribuir al proyecto |

### Configuración

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Scripts: `dev`, `build`, `start`, `lint`, `test` |
| `tsconfig.json` | Configuración de TypeScript estricto |
| `next.config.ts` | Configuración de Next.js 15 |
| `.env.example` | Plantilla para variables de entorno |
| `.gitignore` | Archivos a ignorar por Git |
| `.cursorrules` | Reglas de AI para Cursor (Next.js 15 + Context7) |
| `.cursor/rules.md` | Reglas avanzadas Chrome DevTools MCP |

### Testing

| Archivo | Propósito |
|---------|-----------|
| `test-api.js` | Suite completa de tests automáticos (13 casos de prueba) |

### Frontend

| Archivo | Propósito |
|---------|-----------|
| `app/page.tsx` | Página principal con documentación interactiva |
| `app/layout.tsx` | Layout raíz con metadata |
| `app/globals.css` | Estilos globales con TailwindCSS |

---

## 🎯 Archivos Importantes para Estudiantes

### Para Aprender

1. **`app/api/advice/route.ts`** ⭐⭐⭐
   - Endpoint completo con comentarios educativos
   - Manejo de errores profesional
   - Validación de parámetros
   - Tipado con TypeScript

2. **`docs/TUTORIAL.md`** ⭐⭐⭐
   - Guía completa de 12 secciones
   - Explicaciones paso a paso
   - Código comentado

3. **`docs/TESTING.md`** ⭐⭐
   - Múltiples formas de testear
   - Ejemplos prácticos
   - Scripts de testing

### Para Practicar

1. **`docs/EXERCISES.md`** ⭐⭐⭐
   - 10 ejercicios graduales
   - 3 proyectos finales
   - Soluciones parciales

2. **`test-api.js`** ⭐⭐
   - Script de testing real
   - Aprende a crear tests

### Para Referenciar

1. **`.github/prompts/ai-coding-rules.md`** ⭐⭐⭐
   - Reglas y buenas prácticas
   - Patrones recomendados
   - Checklist de calidad

2. **`docs/LESSONS-LEARNED.md`** ⭐⭐
   - Conceptos clave sintetizados
   - Comparaciones útiles
   - Resumen ejecutivo

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Iniciar servidor de desarrollo (Turbopack)

# Producción
pnpm build            # Compilar para producción
pnpm start            # Iniciar servidor de producción

# Calidad
pnpm lint             # Verificar código con ESLint
pnpm test             # Ejecutar suite de tests (test-api.js)
```

---

## 📊 Estadísticas del Proyecto

- **Total de Archivos de Código**: 4 (2 endpoints + layout + page)
- **Total de Documentación**: 8 archivos MD (+ 2 archivos de reglas AI)
- **Líneas de Código**: ~500 (endpoints con comentarios)
- **Líneas de Documentación**: ~4,500
- **Casos de Prueba**: 13 tests automatizados
- **Ejercicios Propuestos**: 10 + 3 proyectos
- **Reglas de AI**: 2 archivos (Cursor rules + Chrome DevTools MCP)

---

## 🎓 Orden de Lectura Recomendado

Para estudiantes nuevos:

1. 📖 **README.md** - Empezar aquí
2. 📖 **docs/TUTORIAL.md** - Tutorial completo
3. 💻 **app/api/advice/route.ts** - Código del endpoint
4. 🧪 **test-api.js** - Ejecutar tests
5. 📖 **docs/TESTING.md** - Aprender a testear
6. 💡 **docs/LESSONS-LEARNED.md** - Conceptos clave
7. 🎯 **docs/EXERCISES.md** - Practicar

Para instructores:

1. 📖 **README.md** - Overview del proyecto
2. 🤖 **.github/prompts/ai-coding-rules.md** - Reglas de codificación
3. 📖 **docs/TUTORIAL.md** - Contenido pedagógico
4. 🎯 **docs/EXERCISES.md** - Ejercicios para asignar
5. 🤝 **CONTRIBUTING.md** - Guía de contribución

---

<div align="center">

**Estructura diseñada para maximizar el aprendizaje** 📚✨

</div>


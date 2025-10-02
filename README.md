# 🎓 Little API - Proyecto Educativo de Next.js 15

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Proyecto educativo** diseñado para enseñar a crear endpoints API con buenas prácticas en Next.js 15 usando App Router.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [¿Qué aprenderás?](#-qué-aprenderás)
- [Tecnologías](#-tecnologías)
- [Instalación Rápida](#-instalación-rápida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Endpoints Disponibles](#-endpoints-disponibles)
- [Tutorial Paso a Paso](#-tutorial-paso-a-paso)
- [Testing y Ejemplos](#-testing-y-ejemplos)
- [Lecciones Aprendidas](#-lecciones-aprendidas)
- [Debugging con Chrome DevTools](#-debugging-con-chrome-devtools)
- [Recursos Adicionales](#-recursos-adicionales)

---

## 🎯 Descripción

**Little API** es un proyecto educativo minimalista que demuestra cómo crear endpoints robustos y funcionales en Next.js 15. Está diseñado específicamente para estudiantes que quieren aprender a:

✅ Crear APIs RESTful con App Router  
✅ Consumir APIs externas de forma eficiente  
✅ Aplicar buenas prácticas de TypeScript  
✅ Manejar errores y validaciones correctamente  
✅ Documentar código profesionalmente  

---

## 🎓 ¿Qué aprenderás?

### Conceptos Técnicos

- **App Router vs Pages Router**: Diferencias y ventajas del nuevo sistema de rutas
- **Route Handlers**: Cómo funcionan los archivos `route.ts`
- **Request y Response**: Manejo moderno de peticiones HTTP en Next.js 15
- **TypeScript**: Tipado fuerte para APIs seguras y predecibles
- **Fetch API**: Consumo optimizado de APIs externas
- **Error Handling**: Patrones profesionales de manejo de errores
- **Status Codes**: Uso correcto de códigos HTTP (200, 400, 404, 500)

### Habilidades Prácticas

- Estructurar un proyecto Next.js desde cero
- Crear múltiples endpoints con diferentes propósitos
- Validar parámetros de query string
- Transformar y simplificar respuestas de APIs externas
- Documentar código de forma educativa
- Probar endpoints con diferentes herramientas

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 15.5.4 | Framework React con App Router |
| **React** | 19.1.0 | Librería de UI |
| **TypeScript** | 5.9.3 | Tipado estático |
| **TailwindCSS** | 4.1.14 | Framework CSS (opcional) |
| **ESLint** | 9.36.0 | Linter para calidad de código |
| **pnpm** | 10.15+ | Gestor de paquetes |

---

## 🚀 Instalación Rápida

### Prerequisitos

- **Node.js** 18.17 o superior
- **pnpm** instalado globalmente (`npm install -g pnpm`)

### Pasos de Instalación

```bash
# 1. Clonar el repositorio (o crear desde cero siguiendo el tutorial)
git clone https://github.com/tu-usuario/little-api.git
cd little-api

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev

# 4. Abrir en el navegador
# http://localhost:3000
```

El proyecto estará corriendo en `http://localhost:3000` 🎉

---

## 📁 Estructura del Proyecto

```
little-api/
├── app/
│   ├── api/                    # 🔥 CARPETA DE ENDPOINTS
│   │   ├── advice/
│   │   │   └── route.ts        # Endpoint de consejos aleatorios
│   │   └── dog/
│   │       └── route.ts        # Endpoint de imágenes de perros
│   ├── layout.tsx              # Layout principal de la app
│   ├── page.tsx                # Página de inicio
│   └── globals.css             # Estilos globales
├── docs/
│   ├── TUTORIAL.md             # Tutorial paso a paso completo
│   ├── TESTING.md              # Guía de testing y ejemplos
│   └── LESSONS-LEARNED.md      # Lecciones clave aprendidas
├── .github/
│   └── prompts/
│       └── ai-coding-rules.md  # Reglas para AI Coding Assistants
├── public/                     # Archivos estáticos
├── package.json                # Dependencias del proyecto
├── tsconfig.json               # Configuración de TypeScript
├── next.config.ts              # Configuración de Next.js
└── README.md                   # Este archivo
```

---

## 🔌 Endpoints Disponibles

### 1️⃣ `/api/advice` - Consejos Aleatorios

**Descripción**: Obtiene consejos aleatorios o específicos desde [Advice Slip API](https://api.adviceslip.com/).

**Métodos**: `GET`

**Parámetros Query**:
- `id` (opcional): ID del consejo específico

**Ejemplos de Uso**:

```bash
# Consejo aleatorio
curl http://localhost:3000/api/advice

# Consejo específico
curl http://localhost:3000/api/advice?id=42
```

**Respuesta Exitosa** (200):
```json
{
  "success": true,
  "data": {
    "id": 42,
    "advice": "Don't be afraid to fail.",
    "source": "Advice Slip API",
    "timestamp": "2025-10-02T15:30:00.000Z"
  }
}
```

**Respuesta de Error** (400):
```json
{
  "success": false,
  "error": "El parámetro 'id' debe ser un número positivo válido"
}
```

---

### 2️⃣ `/api/dog` - Imágenes de Perros

**Descripción**: Obtiene imágenes aleatorias de perros desde [Dog CEO API](https://dog.ceo/dog-api/).

**Métodos**: `GET`

**Parámetros Query**:
- `breed` (opcional): Raza del perro (ej: "husky", "corgi", "beagle")

**Ejemplos de Uso**:

```bash
# Perro aleatorio
curl http://localhost:3000/api/dog

# Raza específica
curl http://localhost:3000/api/dog?breed=husky
```

**Respuesta Exitosa** (200):
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
    "breed": "husky",
    "timestamp": "2025-10-02T15:35:00.000Z"
  }
}
```

---

## 📖 Tutorial Paso a Paso

Para una guía completa de cómo se construyó este proyecto desde cero, consulta:

👉 **[docs/TUTORIAL.md](docs/TUTORIAL.md)**

El tutorial cubre:
1. Inicialización del proyecto Next.js 15
2. Estructura de carpetas en App Router
3. Creación de Route Handlers
4. Consumo de APIs externas
5. Tipado con TypeScript
6. Manejo de errores profesional
7. Testing y validación

---

## 🧪 Testing y Ejemplos

### Probar desde el Navegador

Simplemente abre estas URLs en tu navegador:

```
http://localhost:3000/api/advice
http://localhost:3000/api/advice?id=25
http://localhost:3000/api/dog
http://localhost:3000/api/dog?breed=corgi
```

### Probar con cURL

```bash
# Test básico
curl http://localhost:3000/api/advice

# Test con headers
curl -H "Accept: application/json" http://localhost:3000/api/dog?breed=labrador

# Test con formato legible
curl http://localhost:3000/api/advice | jq
```

### Probar con Postman / Thunder Client

1. Crea una nueva request GET
2. URL: `http://localhost:3000/api/advice`
3. Añade query params si necesitas (`id`, `breed`, etc.)
4. Envía y observa la respuesta JSON

### Probar con JavaScript/TypeScript

```typescript
// Desde el navegador o Node.js
async function testAdviceAPI() {
  const response = await fetch('http://localhost:3000/api/advice');
  const data = await response.json();
  console.log(data);
}

testAdviceAPI();
```

Para más ejemplos de testing, consulta:

👉 **[docs/TESTING.md](docs/TESTING.md)**

---

## 🔍 Debugging con Chrome DevTools

Este proyecto integra **Chrome DevTools MCP** en Cursor para debugging avanzado:

### ¿Qué Puedes Hacer?

✅ **Debugear endpoints** directamente desde Cursor  
✅ **Inspeccionar requests de red** en tiempo real  
✅ **Ver errores de consola** del navegador  
✅ **Tomar screenshots** automáticos  
✅ **Testear formularios** sin código manual  
✅ **Medir performance** con emulación de red/CPU  
✅ **Automatizar tests E2E** visuales  

### Ejemplos de Uso

```
# Pídele a Cursor (AI):

"Debugea el endpoint /api/advice usando Chrome DevTools"
→ Obtendrás: Status code, headers, response completa, errores de consola

"Toma un screenshot de /api/dog?breed=husky"
→ Obtendrás: Imagen PNG del resultado

"Testea el performance de la homepage con red 3G"
→ Obtendrás: Core Web Vitals, LCP, FID, CLS

"Rellena el formulario y verifica que se envía correctamente"
→ Cursor lo hará automáticamente y te mostrará el resultado
```

### Guía Completa

👉 **[docs/CHROME-DEVTOOLS-DEBUGGING.md](docs/CHROME-DEVTOOLS-DEBUGGING.md)**

Esta guía incluye:
- Casos de uso completos
- Comandos útiles para Cursor
- Testing E2E paso a paso
- Troubleshooting común
- Mejores prácticas

---

## 💡 Lecciones Aprendidas

### 1. App Router vs Pages Router

**App Router** (nuevo en Next.js 13+):
- Usa la carpeta `app/` en lugar de `pages/`
- Los endpoints se crean en `app/api/.../route.ts`
- Más flexible y potente para APIs modernas
- Mejor integración con React Server Components

**Pages Router** (antiguo):
- Usa la carpeta `pages/api/`
- Endpoints en `pages/api/[nombre].ts`
- Aún soportado pero legacy

### 2. Estructura de un Endpoint en Next.js 15

```typescript
// app/api/ejemplo/route.ts
export async function GET(request: NextRequest) {
  // Tu lógica aquí
  return Response.json({ data: 'ejemplo' });
}
```

✅ **Buenas Prácticas**:
- Exportar funciones nombradas (`GET`, `POST`, etc.)
- Usar `NextRequest` para tipado
- Devolver `Response.json()` para respuestas JSON
- Añadir manejo de errores con try/catch
- Validar parámetros de entrada

### 3. Fetch y Manejo de Errores

```typescript
try {
  const response = await fetch(apiUrl, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  const data = await response.json();
  return Response.json({ success: true, data });
  
} catch (error) {
  return Response.json(
    { success: false, error: 'Error message' },
    { status: 500 }
  );
}
```

### 4. Status Codes Correctos

| Código | Significado | Cuándo Usarlo |
|--------|-------------|---------------|
| 200 | OK | Operación exitosa |
| 400 | Bad Request | Parámetros inválidos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

### 5. TypeScript es tu Aliado

- Define interfaces para todas las respuestas
- Usa `satisfies` para verificación de tipos
- Evita `any` siempre que sea posible
- Aprovecha el autocompletado del IDE

### 6. Documentación es Clave

- Comenta tu código de forma educativa
- Incluye ejemplos de uso
- Explica el "por qué", no solo el "qué"
- Mantén el README actualizado

Para el análisis completo de conceptos clave:

👉 **[docs/LESSONS-LEARNED.md](docs/LESSONS-LEARNED.md)**

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Next.js 15 Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeScript in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

### APIs Públicas para Practicar

- [Advice Slip API](https://api.adviceslip.com/) - Consejos aleatorios
- [Dog CEO API](https://dog.ceo/dog-api/) - Imágenes de perros
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Datos fake para testing
- [PokéAPI](https://pokeapi.co/) - Datos de Pokémon
- [Rest Countries](https://restcountries.com/) - Información de países
- [Public APIs](https://github.com/public-apis/public-apis) - Lista gigante de APIs públicas

### Herramientas Recomendadas

- [Postman](https://www.postman.com/) - Testing de APIs
- [Thunder Client](https://www.thunderclient.com/) - Extensión de VS Code
- [JSON Viewer](https://jsonviewer.stack.hu/) - Visualizar JSON online
- [cURL](https://curl.se/) - Cliente HTTP por línea de comandos

---

## 🤝 Contribuir

Este es un proyecto educativo abierto. Si encuentras mejoras o quieres añadir más ejemplos:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-api`)
3. Commit tus cambios (`git commit -m 'Add new API example'`)
4. Push a la rama (`git push origin feature/nueva-api`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo con fines educativos.

---

## 👨‍🏫 Para Instructores

Si vas a usar este proyecto en un curso:

1. Revisa **[docs/TUTORIAL.md](docs/TUTORIAL.md)** para el contenido pedagógico
2. Consulta **[.github/prompts/ai-coding-rules.md](.github/prompts/ai-coding-rules.md)** para reglas de AI
3. Usa **[docs/TESTING.md](docs/TESTING.md)** como ejercicios prácticos
4. Personaliza los endpoints con APIs de tu elección

---

## 📞 Contacto y Soporte

¿Preguntas? ¿Sugerencias?

- 📧 Email: tu-email@ejemplo.com
- 💬 Issues: [GitHub Issues](https://github.com/tu-usuario/little-api/issues)
- 📖 Documentación: Consulta la carpeta `docs/`

---

<div align="center">

**Hecho con ❤️ con fines educativos**

[⬆️ Volver arriba](#-little-api---proyecto-educativo-de-nextjs-15)

</div>

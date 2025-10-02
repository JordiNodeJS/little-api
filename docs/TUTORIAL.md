# 📖 Tutorial Completo: Crea tu Primer Endpoint en Next.js 15

> **Objetivo**: Aprender a crear un endpoint API funcional desde cero usando Next.js 15 y App Router, siguiendo buenas prácticas profesionales.

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Conceptos Previos](#2-conceptos-previos)
3. [Inicialización del Proyecto](#3-inicialización-del-proyecto)
4. [Estructura de Carpetas](#4-estructura-de-carpetas)
5. [Creación del Primer Endpoint](#5-creación-del-primer-endpoint)
6. [Tipado con TypeScript](#6-tipado-con-typescript)
7. [Consumo de API Externa](#7-consumo-de-api-externa)
8. [Manejo de Errores](#8-manejo-de-errores)
9. [Testing del Endpoint](#9-testing-del-endpoint)
10. [Segundo Endpoint (Práctica)](#10-segundo-endpoint-práctica)
11. [Mejores Prácticas](#11-mejores-prácticas)
12. [Resumen Final](#12-resumen-final)

---

## 1. Introducción

### ¿Qué vamos a construir?

Un endpoint API que:
- ✅ Consume una API pública (Advice Slip API)
- ✅ Acepta parámetros por query string
- ✅ Valida las entradas del usuario
- ✅ Transforma la respuesta en un formato simplificado
- ✅ Maneja errores de forma profesional
- ✅ Está completamente tipado con TypeScript

### ¿Por qué Next.js 15?

Next.js 15 introduce mejoras significativas:
- **App Router estable**: Nueva forma de estructurar aplicaciones
- **Fetch mejorado**: Caching y streaming nativos
- **TypeScript first**: Mejor soporte y tipado automático
- **Performance**: Optimizaciones automáticas
- **Turbopack**: Compilación ultra rápida

---

## 2. Conceptos Previos

### App Router vs Pages Router

| Característica | App Router (Nuevo) | Pages Router (Legacy) |
|----------------|--------------------|-----------------------|
| Carpeta | `app/` | `pages/` |
| Endpoints | `app/api/.../route.ts` | `pages/api/[nombre].ts` |
| Componentes | Server Components por defecto | Client Components |
| Layouts | Anidados y compartidos | Limitados |
| Streaming | Nativo | Requiere config |

**Usaremos App Router** porque es el futuro de Next.js y ofrece más flexibilidad.

### Route Handlers

Los **Route Handlers** son archivos especiales llamados `route.ts` (o `route.js`) que definen endpoints HTTP.

```typescript
// app/api/ejemplo/route.ts
export async function GET(request: Request) {
  return Response.json({ mensaje: 'Hola mundo' });
}
```

**Características clave**:
- Deben estar dentro de `app/api/`
- El nombre del archivo DEBE ser `route.ts`
- Exportan funciones nombradas según el método HTTP: `GET`, `POST`, `PUT`, `DELETE`, etc.
- Reciben un objeto `Request` y devuelven un objeto `Response`

### Request y Response en Next.js 15

Next.js 15 usa los estándares Web API de `Request` y `Response`:

```typescript
// Request: información de la petición entrante
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const id = params.get('id'); // Obtener parámetro ?id=123
  
  // Response: respuesta que devolvemos
  return Response.json({ data: 'ejemplo' }, { status: 200 });
}
```

---

## 3. Inicialización del Proyecto

### Paso 1: Prerequisitos

Asegúrate de tener instalado:

```bash
# Node.js 18.17 o superior
node --version

# pnpm (gestor de paquetes)
npm install -g pnpm
pnpm --version
```

### Paso 2: Crear el Proyecto

```bash
# Opción 1: Crear en una carpeta nueva
pnpm create next-app@latest little-api

# Opción 2: Crear en la carpeta actual (como en este proyecto)
pnpm create next-app@latest . --yes

# Durante la instalación, selecciona:
# ✔ TypeScript? Yes
# ✔ ESLint? Yes
# ✔ Tailwind CSS? Yes (opcional, para estilos)
# ✔ src/ directory? No (usaremos app/)
# ✔ App Router? Yes (¡IMPORTANTE!)
# ✔ Import alias? @/* (recomendado)
```

### Paso 3: Explorar la Estructura Inicial

Después de la instalación, tendrás:

```
little-api/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página de inicio
│   └── globals.css     # Estilos globales
├── public/             # Archivos estáticos
├── package.json        # Dependencias
├── tsconfig.json       # Config de TypeScript
└── next.config.ts      # Config de Next.js
```

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
# Instalar dependencias (si no se hizo automáticamente)
pnpm install

# Iniciar servidor en modo desarrollo
pnpm dev

# Abrir en el navegador
# http://localhost:3000
```

**¡Felicidades!** 🎉 Ya tienes Next.js 15 corriendo.

---

## 4. Estructura de Carpetas

### ¿Dónde van los endpoints?

Los endpoints API se crean dentro de `app/api/`:

```
app/
├── api/                    # ← Carpeta para endpoints
│   ├── advice/             # ← Endpoint /api/advice
│   │   └── route.ts        # ← Archivo del route handler
│   └── dog/                # ← Endpoint /api/dog
│       └── route.ts
├── layout.tsx
└── page.tsx
```

### Regla de Oro

**La ruta del archivo = La URL del endpoint**

| Archivo | URL |
|---------|-----|
| `app/api/advice/route.ts` | `http://localhost:3000/api/advice` |
| `app/api/dog/route.ts` | `http://localhost:3000/api/dog` |
| `app/api/users/profile/route.ts` | `http://localhost:3000/api/users/profile` |

### Crear la Carpeta del Endpoint

```bash
# Crear carpeta para nuestro primer endpoint
mkdir -p app/api/advice
```

---

## 5. Creación del Primer Endpoint

### Paso 1: Crear el Archivo `route.ts`

Crea el archivo `app/api/advice/route.ts` con esta estructura básica:

```typescript
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.json({
    mensaje: 'Hola desde /api/advice'
  });
}
```

### Paso 2: Probar el Endpoint

Abre en el navegador:

```
http://localhost:3000/api/advice
```

Deberías ver:

```json
{
  "mensaje": "Hola desde /api/advice"
}
```

**¡Felicidades!** 🎉 Creaste tu primer endpoint.

### Paso 3: Añadir Parámetros Query

Vamos a aceptar un parámetro `id`:

```typescript
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Obtener URL completa
  const { searchParams } = new URL(request.url);
  
  // Extraer parámetro 'id'
  const id = searchParams.get('id');
  
  return Response.json({
    mensaje: `Recibido ID: ${id || 'ninguno'}`,
    id: id
  });
}
```

**Prueba**:

```
http://localhost:3000/api/advice?id=42
```

Respuesta:

```json
{
  "mensaje": "Recibido ID: 42",
  "id": "42"
}
```

---

## 6. Tipado con TypeScript

### Paso 1: Definir Interfaces

Las interfaces nos ayudan a:
- ✅ Prevenir errores en tiempo de desarrollo
- ✅ Mejorar el autocompletado del IDE
- ✅ Documentar la estructura de datos

Añade estas interfaces al inicio de `route.ts`:

```typescript
// Estructura de la respuesta de la API externa (Advice Slip)
interface AdviceSlipResponse {
  slip: {
    id: number;
    advice: string;
  };
}

// Estructura de nuestra respuesta al cliente
interface ApiResponse {
  success: boolean;
  data?: {
    id: number;
    advice: string;
    source: string;
    timestamp: string;
  };
  error?: string;
}
```

### Paso 2: Usar las Interfaces

```typescript
export async function GET(request: NextRequest): Promise<Response> {
  // ... tu código ...
  
  // Tipar la respuesta con satisfies
  const respuesta: ApiResponse = {
    success: true,
    data: {
      id: 42,
      advice: "Don't be afraid to fail.",
      source: "Advice Slip API",
      timestamp: new Date().toISOString()
    }
  };
  
  return Response.json(respuesta);
}
```

**Beneficio**: Si intentas añadir un campo que no existe en la interfaz, TypeScript te alertará.

---

## 7. Consumo de API Externa

### Paso 1: Conocer la API Externa

Usaremos [Advice Slip API](https://api.adviceslip.com/):

**Endpoints disponibles**:
- `https://api.adviceslip.com/advice` - Consejo aleatorio
- `https://api.adviceslip.com/advice/{id}` - Consejo específico

**Respuesta**:
```json
{
  "slip": {
    "id": 42,
    "advice": "Don't be afraid to fail."
  }
}
```

### Paso 2: Hacer Fetch a la API

```typescript
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const adviceId = searchParams.get('id');
    
    // Construir URL de la API externa
    const apiUrl = adviceId 
      ? `https://api.adviceslip.com/advice/${adviceId}`
      : 'https://api.adviceslip.com/advice';
    
    // Hacer fetch
    const response = await fetch(apiUrl, {
      cache: 'no-store', // No cachear (siempre datos frescos)
    });
    
    // Verificar que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error(`API respondió con status: ${response.status}`);
    }
    
    // Parsear JSON
    const data: AdviceSlipResponse = await response.json();
    
    // Devolver respuesta simplificada
    return Response.json({
      success: true,
      data: {
        id: data.slip.id,
        advice: data.slip.advice,
        source: 'Advice Slip API',
        timestamp: new Date().toISOString()
      }
    } satisfies ApiResponse);
    
  } catch (error) {
    return Response.json({
      success: false,
      error: 'Error al obtener el consejo'
    } satisfies ApiResponse, {
      status: 500
    });
  }
}
```

### Paso 3: Probar el Endpoint

```bash
# Consejo aleatorio
curl http://localhost:3000/api/advice

# Consejo específico
curl http://localhost:3000/api/advice?id=25
```

---

## 8. Manejo de Errores

### Principios del Manejo de Errores

1. **Siempre usar try/catch**
2. **Validar parámetros de entrada**
3. **Devolver status codes apropiados**
4. **No exponer detalles internos en producción**
5. **Loggear errores para debugging**

### Paso 1: Validación de Parámetros

```typescript
const adviceId = searchParams.get('id');

// Validar que el ID sea un número positivo
if (adviceId && (isNaN(Number(adviceId)) || Number(adviceId) <= 0)) {
  return Response.json({
    success: false,
    error: 'El parámetro "id" debe ser un número positivo válido'
  } satisfies ApiResponse, {
    status: 400 // Bad Request
  });
}
```

### Paso 2: Manejo de Errores de la API Externa

```typescript
const response = await fetch(apiUrl);

if (!response.ok) {
  // Caso especial: ID no encontrado
  if (response.status === 404) {
    return Response.json({
      success: false,
      error: `No se encontró ningún consejo con el ID ${adviceId}`
    } satisfies ApiResponse, {
      status: 404 // Not Found
    });
  }
  
  // Otros errores
  throw new Error(`API respondió con status: ${response.status}`);
}
```

### Paso 3: Catch Global

```typescript
catch (error) {
  console.error('❌ Error en el endpoint:', error);
  
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Error desconocido';
  
  return Response.json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? errorMessage 
      : 'Error interno del servidor'
  } satisfies ApiResponse, {
    status: 500 // Internal Server Error
  });
}
```

### Status Codes Comunes

| Código | Nombre | Cuándo Usarlo |
|--------|--------|---------------|
| 200 | OK | Operación exitosa |
| 400 | Bad Request | Parámetros inválidos del cliente |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |
| 503 | Service Unavailable | API externa no disponible |

---

## 9. Testing del Endpoint

### Método 1: Navegador

Abre directamente en el navegador:

```
http://localhost:3000/api/advice
http://localhost:3000/api/advice?id=42
http://localhost:3000/api/advice?id=invalid  # Debería dar error 400
http://localhost:3000/api/advice?id=99999    # Debería dar error 404
```

### Método 2: cURL (Terminal)

```bash
# Petición básica
curl http://localhost:3000/api/advice

# Con formato legible (usando jq)
curl http://localhost:3000/api/advice | jq

# Ver headers de respuesta
curl -i http://localhost:3000/api/advice

# Test de error
curl http://localhost:3000/api/advice?id=abc
```

### Método 3: Postman / Thunder Client

**Postman** (aplicación de escritorio):
1. Crear nueva request
2. Método: GET
3. URL: `http://localhost:3000/api/advice`
4. Params: Añadir `id` = `42`
5. Send

**Thunder Client** (extensión de VS Code):
1. Abrir panel de Thunder Client
2. New Request
3. GET `http://localhost:3000/api/advice?id=42`
4. Send

### Método 4: JavaScript/Fetch

```javascript
// Desde la consola del navegador o Node.js
async function testAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/advice?id=42');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
```

### Método 5: Archivo de Test

Crea `test-api.js`:

```javascript
async function testAdviceAPI() {
  const tests = [
    { url: 'http://localhost:3000/api/advice', desc: 'Consejo aleatorio' },
    { url: 'http://localhost:3000/api/advice?id=42', desc: 'Consejo ID 42' },
    { url: 'http://localhost:3000/api/advice?id=abc', desc: 'ID inválido (error 400)' },
  ];

  for (const test of tests) {
    console.log(`\n🧪 Testeando: ${test.desc}`);
    console.log(`📡 URL: ${test.url}`);
    
    try {
      const response = await fetch(test.url);
      const data = await response.json();
      console.log(`✅ Status: ${response.status}`);
      console.log(`📦 Data:`, data);
    } catch (error) {
      console.error(`❌ Error:`, error.message);
    }
  }
}

testAdviceAPI();
```

Ejecutar:

```bash
node test-api.js
```

---

## 10. Segundo Endpoint (Práctica)

### Ejercicio: Crear Endpoint de Perros

**Objetivo**: Crear `app/api/dog/route.ts` que consuma [Dog CEO API](https://dog.ceo/dog-api/).

**Requisitos**:
1. Aceptar parámetro `breed` (raza del perro)
2. Devolver URL de imagen del perro
3. Manejar errores si la raza no existe
4. Tipar con TypeScript

**API a consumir**:
- Aleatorio: `https://dog.ceo/api/breeds/image/random`
- Por raza: `https://dog.ceo/api/breed/{breed}/images/random`

**Estructura de respuesta de Dog API**:
```json
{
  "message": "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
  "status": "success"
}
```

### Solución Paso a Paso

**1. Crear carpeta**:
```bash
mkdir app/api/dog
```

**2. Crear `app/api/dog/route.ts`**:

```typescript
import { NextRequest } from 'next/server';

interface DogApiResponse {
  message: string | string[];
  status: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    breed: string;
    timestamp: string;
  };
  error?: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get('breed');

    let apiUrl = 'https://dog.ceo/api/breeds/image/random';
    
    if (breed) {
      const normalizedBreed = breed.toLowerCase().trim();
      apiUrl = `https://dog.ceo/api/breed/${normalizedBreed}/images/random`;
    }

    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      if (response.status === 404 && breed) {
        return Response.json({
          success: false,
          error: `La raza "${breed}" no fue encontrada`
        } satisfies ApiResponse, {
          status: 404
        });
      }
      throw new Error(`Dog API error: ${response.status}`);
    }

    const data: DogApiResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error('API devolvió status no exitoso');
    }

    const imageUrl = Array.isArray(data.message) 
      ? data.message[0] 
      : data.message;

    return Response.json({
      success: true,
      data: {
        imageUrl,
        breed: breed || 'random',
        timestamp: new Date().toISOString()
      }
    } satisfies ApiResponse);

  } catch (error) {
    console.error('Error:', error);
    return Response.json({
      success: false,
      error: 'Error al obtener imagen de perro'
    } satisfies ApiResponse, {
      status: 500
    });
  }
}

export const dynamic = 'force-dynamic';
```

**3. Probar**:

```bash
curl http://localhost:3000/api/dog
curl http://localhost:3000/api/dog?breed=husky
curl http://localhost:3000/api/dog?breed=corgi
```

---

## 11. Mejores Prácticas

### ✅ Código Limpio

```typescript
// ❌ MAL: Código desordenado y sin comentarios
export async function GET(r: any) {
  const d = await fetch('https://api.example.com');
  return Response.json(await d.json());
}

// ✅ BIEN: Código claro, tipado y comentado
/**
 * Obtiene consejos aleatorios
 * @param request - Request object
 * @returns JSON con el consejo
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data: AdviceSlipResponse = await response.json();
    
    return Response.json({
      success: true,
      data: data.slip
    });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
```

### ✅ Estructura Consistente

Todas tus respuestas deben seguir el mismo formato:

```typescript
// Formato estándar de respuesta
interface StandardResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}
```

### ✅ Validación de Inputs

```typescript
// Siempre valida parámetros antes de usarlos
const id = searchParams.get('id');

if (id && !isValidId(id)) {
  return Response.json({
    success: false,
    error: 'ID inválido'
  }, { status: 400 });
}
```

### ✅ Logging para Debugging

```typescript
// Logs informativos durante desarrollo
console.log(`🌐 Consultando API: ${apiUrl}`);
console.log(`✅ Respuesta exitosa`);
console.error(`❌ Error:`, error);
```

### ✅ Variables de Entorno

Para APIs que requieren claves:

```typescript
// .env.local
API_KEY=tu_clave_secreta

// En tu route.ts
const apiKey = process.env.API_KEY;

const response = await fetch(apiUrl, {
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});
```

**Nunca** expongas claves en el código fuente.

### ✅ Configuración de Cache

```typescript
// No cachear para datos en tiempo real
export async function GET(request: NextRequest) {
  const response = await fetch(apiUrl, {
    cache: 'no-store' // Siempre datos frescos
  });
}

// Cachear por 1 hora para datos estáticos
export const revalidate = 3600; // segundos
```

---

## 12. Resumen Final

### Lo que has aprendido

✅ **Inicializar** un proyecto Next.js 15 con TypeScript  
✅ **Estructurar** endpoints en App Router (`app/api/.../route.ts`)  
✅ **Crear** Route Handlers con funciones `GET`, `POST`, etc.  
✅ **Consumir** APIs externas con `fetch`  
✅ **Tipar** respuestas con TypeScript para seguridad  
✅ **Validar** parámetros de entrada  
✅ **Manejar** errores con try/catch y status codes correctos  
✅ **Transformar** datos para simplificar respuestas  
✅ **Testear** endpoints con múltiples herramientas  
✅ **Documentar** código de forma profesional  

### Próximos Pasos

1. **Crea más endpoints**: Prueba con otras APIs públicas
   - [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
   - [PokéAPI](https://pokeapi.co/)
   - [Rest Countries](https://restcountries.com/)

2. **Añade métodos POST**: Aprende a recibir datos en el body
   ```typescript
   export async function POST(request: NextRequest) {
     const body = await request.json();
     // Procesar body...
   }
   ```

3. **Implementa autenticación**: Protege tus endpoints
   ```typescript
   const authHeader = request.headers.get('authorization');
   if (!authHeader) {
     return Response.json({ error: 'No autorizado' }, { status: 401 });
   }
   ```

4. **Añade base de datos**: Conecta con MongoDB, PostgreSQL, etc.

5. **Deploy a producción**: Despliega en Vercel o cualquier plataforma

### Recursos para Continuar

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 📚 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🎥 [Next.js 15 YouTube Tutorials](https://www.youtube.com/results?search_query=nextjs+15+tutorial)
- 💬 [Next.js Discord Community](https://nextjs.org/discord)

---

<div align="center">

**¡Felicidades!** 🎉  
Has completado el tutorial completo de creación de endpoints en Next.js 15.

[⬆️ Volver al inicio](#-tutorial-completo-crea-tu-primer-endpoint-en-nextjs-15)

</div>


# 💡 Lecciones Aprendidas - Conceptos Clave

> Este documento sintetiza los conceptos más importantes que los estudiantes deben dominar después de completar este proyecto.

---

## 📚 Tabla de Contenidos

1. [Arquitectura de Next.js 15](#1-arquitectura-de-nextjs-15)
2. [App Router vs Pages Router](#2-app-router-vs-pages-router)
3. [Route Handlers](#3-route-handlers)
4. [Request y Response](#4-request-y-response)
5. [TypeScript en APIs](#5-typescript-en-apis)
6. [Fetch y Consumo de APIs](#6-fetch-y-consumo-de-apis)
7. [Manejo de Errores](#7-manejo-de-errores)
8. [Status Codes HTTP](#8-status-codes-http)
9. [Validación de Datos](#9-validación-de-datos)
10. [Documentación de Código](#10-documentación-de-código)
11. [Testing de APIs](#11-testing-de-apis)
12. [Buenas Prácticas](#12-buenas-prácticas)

---

## 1. Arquitectura de Next.js 15

### ✅ Concepto Clave

Next.js 15 es un **framework full-stack** que permite:
- Crear frontend con React
- Crear backend con Route Handlers
- Todo en un solo proyecto

### 📐 Estructura de Directorios

```
app/
├── api/              # Backend (Route Handlers)
│   ├── advice/
│   │   └── route.ts  # Endpoint /api/advice
│   └── dog/
│       └── route.ts  # Endpoint /api/dog
├── layout.tsx        # Frontend (Layout)
├── page.tsx          # Frontend (Página)
└── components/       # Frontend (Componentes React)
```

**Lección**: El directorio `app/api/` es exclusivo para endpoints backend.

---

## 2. App Router vs Pages Router

### Comparación Crítica

| Aspecto | App Router (Nuevo) ✅ | Pages Router (Legacy) ❌ |
|---------|------------------------|--------------------------|
| **Directorio** | `app/` | `pages/` |
| **Endpoints API** | `app/api/.../route.ts` | `pages/api/[nombre].ts` |
| **Sintaxis Handler** | `export async function GET()` | `export default function handler()` |
| **Server Components** | Por defecto | No soportados |
| **Layouts Anidados** | Sí | No |
| **Streaming** | Nativo | Limitado |
| **Futuro** | Activamente desarrollado | Mantenimiento solo |

### ✅ Lección Clave

**App Router es el estándar moderno**. Todo nuevo proyecto debe usar App Router por:
- Mayor flexibilidad
- Mejor performance
- Características avanzadas (streaming, suspense, etc.)
- Soporte a largo plazo

---

## 3. Route Handlers

### ✅ ¿Qué son?

**Route Handlers** son funciones que manejan peticiones HTTP en Next.js 15.

### Anatomía de un Route Handler

```typescript
// app/api/ejemplo/route.ts

import { NextRequest } from 'next/server';

// 1️⃣ El nombre del archivo DEBE ser route.ts
// 2️⃣ Exportar función con nombre del método HTTP
export async function GET(request: NextRequest): Promise<Response> {
  // 3️⃣ Lógica del endpoint
  const data = { mensaje: 'Hola mundo' };
  
  // 4️⃣ Devolver Response.json()
  return Response.json(data, { status: 200 });
}

// Otros métodos HTTP disponibles:
export async function POST(request: NextRequest) { /* ... */ }
export async function PUT(request: NextRequest) { /* ... */ }
export async function DELETE(request: NextRequest) { /* ... */ }
export async function PATCH(request: NextRequest) { /* ... */ }
```

### ✅ Reglas Importantes

1. **Nombre del archivo**: Siempre `route.ts` (o `route.js`)
2. **Ubicación**: Dentro de `app/api/`
3. **Exportación**: Función nombrada (`GET`, `POST`, etc.)
4. **Retorno**: Siempre un objeto `Response`
5. **Tipado**: Usar `NextRequest` para el parámetro

### La Ruta = La URL

```
app/api/users/route.ts       → /api/users
app/api/users/[id]/route.ts  → /api/users/123
app/api/posts/comments/route.ts → /api/posts/comments
```

---

## 4. Request y Response

### ✅ El Objeto Request

**NextRequest** extiende el `Request` estándar de Web API:

```typescript
export async function GET(request: NextRequest) {
  // URL completa
  const url = new URL(request.url);
  // → "http://localhost:3000/api/advice?id=42"
  
  // Query parameters
  const searchParams = url.searchParams;
  const id = searchParams.get('id'); // → "42"
  
  // Headers
  const auth = request.headers.get('authorization');
  
  // Cookies
  const token = request.cookies.get('token');
  
  // Método HTTP
  console.log(request.method); // → "GET"
}
```

### ✅ El Objeto Response

**Response** es el estándar de Web API:

```typescript
// JSON response
return Response.json(
  { data: 'ejemplo' },
  { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }
);

// Text response
return new Response('Hola mundo', { status: 200 });

// Redirect
return Response.redirect('https://example.com');
```

### ✅ Lección Clave

Next.js 15 usa **estándares web** (no APIs propietarias), lo que hace el código más portable y fácil de aprender.

---

## 5. TypeScript en APIs

### ✅ ¿Por qué TypeScript?

- 🛡️ **Seguridad**: Detecta errores en tiempo de desarrollo
- 🎯 **Autocompletado**: El IDE sugiere propiedades y métodos
- 📖 **Documentación**: Los tipos sirven como documentación
- 🐛 **Menos bugs**: Previene errores tontos

### Interfaces para APIs

```typescript
// ❌ Sin TypeScript - Propenso a errores
async function getData() {
  const response = await fetch('...');
  const data = await response.json(); // any
  return data.slip.advice; // No autocomplete, puede fallar
}

// ✅ Con TypeScript - Seguro y claro
interface AdviceSlipResponse {
  slip: {
    id: number;
    advice: string;
  };
}

async function getData(): Promise<string> {
  const response = await fetch('...');
  const data: AdviceSlipResponse = await response.json();
  return data.slip.advice; // Autocomplete ✅, tipo verificado ✅
}
```

### ✅ Patrón Recomendado

```typescript
// 1. Definir interfaces
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 2. Usar en funciones
export async function GET(): Promise<Response> {
  const response: ApiResponse<{ advice: string }> = {
    success: true,
    data: { advice: 'Hola' }
  };
  
  return Response.json(response);
}
```

### ✅ Evitar `any`

```typescript
// ❌ MAL
const data: any = await response.json();

// ✅ BIEN
interface ExpectedData {
  id: number;
  name: string;
}
const data: ExpectedData = await response.json();

// ✅ Si realmente no sabes el tipo, usa unknown
const data: unknown = await response.json();
if (typeof data === 'object' && data !== null) {
  // Validar estructura...
}
```

---

## 6. Fetch y Consumo de APIs

### ✅ Fetch en Next.js 15

Next.js mejora el `fetch` nativo con:
- 🔄 **Caching automático**
- ⚡ **Revalidación inteligente**
- 🚀 **Optimizaciones de performance**

```typescript
// Fetch básico
const response = await fetch('https://api.example.com/data');

// Fetch con opciones
const response = await fetch('https://api.example.com/data', {
  method: 'GET',
  cache: 'no-store',        // No cachear
  next: { revalidate: 60 }, // Revalidar cada 60 segundos
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
});
```

### ✅ Opciones de Cache

```typescript
// 1. No cachear (siempre datos frescos)
fetch(url, { cache: 'no-store' });

// 2. Cachear indefinidamente
fetch(url, { cache: 'force-cache' });

// 3. Revalidar cada N segundos
fetch(url, { next: { revalidate: 3600 } }); // 1 hora
```

### ✅ Patrón Completo

```typescript
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // 1. Hacer fetch
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    
    // 2. Verificar status
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // 3. Parsear JSON
    const data = await response.json();
    
    // 4. Devolver respuesta
    return Response.json({ success: true, data });
    
  } catch (error) {
    // 5. Manejar errores
    return Response.json(
      { success: false, error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}
```

---

## 7. Manejo de Errores

### ✅ Principios del Manejo de Errores

1. **Siempre usa try/catch**
2. **Valida entradas antes de procesarlas**
3. **Devuelve status codes apropiados**
4. **No expongas detalles internos en producción**
5. **Loggea errores para debugging**

### ✅ Estructura Básica

```typescript
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Intentar operación
    const data = await fetchData();
    return Response.json({ success: true, data });
    
  } catch (error) {
    // Capturar y manejar error
    console.error('Error:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Error al procesar solicitud' 
      },
      { status: 500 }
    );
  }
}
```

### ✅ Manejo Granular de Errores

```typescript
try {
  const response = await fetch(apiUrl);
  
  // Error 404: Recurso no encontrado
  if (response.status === 404) {
    return Response.json(
      { success: false, error: 'Recurso no encontrado' },
      { status: 404 }
    );
  }
  
  // Error 503: Servicio no disponible
  if (response.status === 503) {
    return Response.json(
      { success: false, error: 'Servicio temporalmente no disponible' },
      { status: 503 }
    );
  }
  
  // Otros errores HTTP
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
} catch (error) {
  // Errores de red, timeout, etc.
  return Response.json(
    { success: false, error: 'Error de conexión' },
    { status: 500 }
  );
}
```

### ✅ Protección en Producción

```typescript
catch (error) {
  const isDev = process.env.NODE_ENV === 'development';
  
  const errorMessage = isDev 
    ? error.message  // Mensaje detallado en dev
    : 'Error interno del servidor'; // Mensaje genérico en prod
  
  return Response.json(
    { success: false, error: errorMessage },
    { status: 500 }
  );
}
```

---

## 8. Status Codes HTTP

### ✅ Códigos Esenciales

| Código | Nombre | Cuándo Usarlo | Ejemplo |
|--------|--------|---------------|---------|
| **200** | OK | Operación exitosa | Datos devueltos correctamente |
| **201** | Created | Recurso creado | POST creó un usuario |
| **400** | Bad Request | Parámetros inválidos | `id` no es un número |
| **401** | Unauthorized | No autenticado | Falta token de auth |
| **403** | Forbidden | Sin permisos | User no puede acceder |
| **404** | Not Found | Recurso no existe | ID no encontrado |
| **500** | Internal Server Error | Error del servidor | Excepción no manejada |
| **503** | Service Unavailable | Servicio caído | API externa offline |

### ✅ Uso Correcto

```typescript
// ✅ 200: Operación exitosa
return Response.json({ data: 'ok' }, { status: 200 });

// ✅ 400: El cliente envió datos incorrectos
if (!isValid(input)) {
  return Response.json(
    { error: 'Parámetro inválido' },
    { status: 400 }
  );
}

// ✅ 404: El recurso solicitado no existe
if (!found) {
  return Response.json(
    { error: 'No encontrado' },
    { status: 404 }
  );
}

// ✅ 500: Error inesperado del servidor
catch (error) {
  return Response.json(
    { error: 'Error interno' },
    { status: 500 }
  );
}
```

---

## 9. Validación de Datos

### ✅ Validación de Query Parameters

```typescript
const id = searchParams.get('id');

// Validar que existe
if (!id) {
  return Response.json(
    { error: 'El parámetro "id" es requerido' },
    { status: 400 }
  );
}

// Validar que es un número
if (isNaN(Number(id))) {
  return Response.json(
    { error: 'El parámetro "id" debe ser un número' },
    { status: 400 }
  );
}

// Validar rango
if (Number(id) <= 0) {
  return Response.json(
    { error: 'El "id" debe ser mayor a 0' },
    { status: 400 }
  );
}
```

### ✅ Validación de Body (POST)

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.name || !body.email) {
      return Response.json(
        { error: 'name y email son requeridos' },
        { status: 400 }
      );
    }
    
    // Validar formato de email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
      return Response.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    
    // Procesar...
    
  } catch (error) {
    return Response.json(
      { error: 'JSON inválido' },
      { status: 400 }
    );
  }
}
```

### ✅ Librería de Validación: Zod

```bash
pnpm add zod
```

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().positive().max(120),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = UserSchema.safeParse(body);
  
  if (!result.success) {
    return Response.json(
      { error: 'Datos inválidos', details: result.error },
      { status: 400 }
    );
  }
  
  const validData = result.data; // Tipado automáticamente
  // Procesar validData...
}
```

---

## 10. Documentación de Código

### ✅ Comentarios Efectivos

```typescript
/**
 * Obtiene consejos aleatorios desde Advice Slip API
 * 
 * @param request - NextRequest con parámetros opcionales
 * @returns Response con JSON del consejo
 * 
 * @example
 * GET /api/advice
 * GET /api/advice?id=42
 */
export async function GET(request: NextRequest): Promise<Response> {
  // Extraer parámetros de la query string
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Validar que el ID sea un número positivo
  if (id && isNaN(Number(id))) {
    return Response.json({ error: 'ID inválido' }, { status: 400 });
  }
  
  // ... resto del código
}
```

### ✅ Qué Documentar

1. **Propósito** de la función/endpoint
2. **Parámetros** aceptados
3. **Valores de retorno** posibles
4. **Ejemplos de uso**
5. **Casos edge** o comportamientos especiales

### ✅ README.md del Proyecto

Un buen README debe incluir:
- Descripción del proyecto
- Requisitos e instalación
- Endpoints disponibles
- Ejemplos de uso
- Cómo testear
- Cómo contribuir

---

## 11. Testing de APIs

### ✅ Métodos de Testing

1. **Manual**: Navegador, Postman, cURL
2. **Programático**: Scripts con fetch
3. **Automatizado**: Jest, Vitest

### ✅ Qué Testear

```typescript
// ✅ Casos felices
✓ Endpoint responde con 200
✓ Devuelve JSON válido
✓ Estructura de datos correcta
✓ Tipos de datos correctos

// ✅ Casos de error
✓ Parámetros inválidos → 400
✓ Recursos no encontrados → 404
✓ Errores del servidor → 500

// ✅ Casos edge
✓ Parámetros vacíos
✓ Valores extremos (muy grandes/pequeños)
✓ Caracteres especiales
✓ Múltiples requests concurrentes
```

---

## 12. Buenas Prácticas

### ✅ Checklist de Calidad

#### Estructura de Código
- [ ] Código limpio y legible
- [ ] Nombres descriptivos de variables/funciones
- [ ] Funciones pequeñas y enfocadas (SRP)
- [ ] Sin código duplicado (DRY)

#### TypeScript
- [ ] Todo está tipado
- [ ] Interfaces definidas para todas las respuestas
- [ ] Evitar `any`
- [ ] Usar `satisfies` para verificación de tipos

#### Manejo de Errores
- [ ] Try/catch en todas las operaciones async
- [ ] Validación de inputs
- [ ] Status codes correctos
- [ ] Mensajes de error claros

#### Seguridad
- [ ] No exponer secretos en el código
- [ ] Variables de entorno para credenciales
- [ ] Validar y sanitizar inputs
- [ ] Headers CORS configurados correctamente

#### Performance
- [ ] Cache configurado apropiadamente
- [ ] Timeouts en requests externos
- [ ] Respuestas comprimidas (cuando aplique)

#### Documentación
- [ ] Comentarios explicativos
- [ ] README actualizado
- [ ] Ejemplos de uso
- [ ] Tests documentados

---

## 🎓 Resumen Final

### Conceptos que DEBES dominar:

1. **App Router** es el futuro de Next.js
2. **Route Handlers** (`route.ts`) definen endpoints
3. **TypeScript** previene errores y mejora DX
4. **Fetch mejorado** de Next.js con caching inteligente
5. **Try/catch siempre** para manejo de errores
6. **Status codes apropiados** (200, 400, 404, 500)
7. **Validación de inputs** antes de procesarlos
8. **Testing** es esencial para calidad
9. **Documentación clara** ayuda a futuros desarrolladores
10. **Buenas prácticas** hacen código mantenible

---

<div align="center">

**¡Felicidades!** 🎉  
Has dominado los conceptos clave para crear APIs en Next.js 15.

Ahora estás listo para crear tus propios endpoints y extender este conocimiento.

[⬆️ Volver arriba](#-lecciones-aprendidas---conceptos-clave)

</div>


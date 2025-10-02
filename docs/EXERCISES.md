# 🎯 Ejercicios Prácticos

> Ejercicios para reforzar lo aprendido y expandir tus conocimientos en Next.js 15 y APIs.

---

## 📚 Índice

1. [Ejercicios Básicos](#ejercicios-básicos)
2. [Ejercicios Intermedios](#ejercicios-intermedios)
3. [Ejercicios Avanzados](#ejercicios-avanzados)
4. [Proyectos Finales](#proyectos-finales)
5. [Soluciones](#soluciones)

---

## Ejercicios Básicos

### 🟢 Ejercicio 1: Endpoint de Chistes (Jokes)

**Objetivo**: Crear un endpoint que consuma [JokeAPI](https://v2.jokeapi.dev/) y devuelva chistes.

**Requisitos**:
- Crear `app/api/joke/route.ts`
- Consumir `https://v2.jokeapi.dev/joke/Programming?type=single`
- Aceptar parámetro `category` (Programming, Misc, Dark, Pun)
- Devolver JSON simplificado con el chiste
- Manejar errores apropiadamente

**Estructura esperada de respuesta**:
```json
{
  "success": true,
  "data": {
    "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "category": "Programming",
    "timestamp": "2025-10-02T15:30:00.000Z"
  }
}
```

**Testing**:
```bash
curl http://localhost:3000/api/joke
curl http://localhost:3000/api/joke?category=Pun
```

---

### 🟢 Ejercicio 2: Endpoint de Usuarios Falsos

**Objetivo**: Crear un endpoint que consuma [Random User API](https://randomuser.me/api/).

**Requisitos**:
- Crear `app/api/user/route.ts`
- Consumir `https://randomuser.me/api/`
- Aceptar parámetro `gender` (male, female)
- Simplificar la respuesta mostrando solo: nombre, email, foto, país
- Validar que gender sea válido

**Estructura esperada**:
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "picture": "https://...",
    "country": "United States"
  }
}
```

---

### 🟢 Ejercicio 3: Endpoint de Hechos de Gatos

**Objetivo**: Consumir [Cat Facts API](https://catfact.ninja/fact).

**Requisitos**:
- Crear `app/api/cat-fact/route.ts`
- Consumir `https://catfact.ninja/fact`
- Aceptar parámetro `max_length` (longitud máxima del hecho)
- Devolver el hecho con su longitud
- Manejar el caso cuando no hay hechos de esa longitud

---

## Ejercicios Intermedios

### 🟡 Ejercicio 4: Endpoint con POST

**Objetivo**: Crear un endpoint que acepte datos por POST.

**Requisitos**:
- Crear `app/api/echo/route.ts`
- Implementar método `POST`
- Recibir JSON en el body con `{ message: string, name: string }`
- Validar que ambos campos existan
- Devolver la info recibida más metadata (timestamp, longitud)

**Ejemplo de uso**:
```bash
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola","name":"Juan"}'
```

**Respuesta esperada**:
```json
{
  "success": true,
  "data": {
    "received": {
      "message": "Hola",
      "name": "Juan"
    },
    "metadata": {
      "messageLength": 4,
      "timestamp": "2025-10-02T15:30:00.000Z"
    }
  }
}
```

---

### 🟡 Ejercicio 5: Endpoint con Cache

**Objetivo**: Implementar caching para mejorar performance.

**Requisitos**:
- Crear `app/api/quote/route.ts`
- Consumir [Quotable API](https://api.quotable.io/random)
- Configurar cache con revalidación cada 5 minutos
- Añadir header `Cache-Control` en la respuesta
- Incluir campo `cached` en la respuesta

**Configuración**:
```typescript
export const revalidate = 300; // 5 minutos
```

---

### 🟡 Ejercicio 6: Endpoint con Múltiples APIs

**Objetivo**: Combinar datos de múltiples APIs externas.

**Requisitos**:
- Crear `app/api/weather-fact/route.ts`
- Consumir dos APIs:
  - [Weather API](https://api.open-meteo.com/v1/forecast)
  - [Random Fact API](https://uselessfacts.jsph.pl/random.json?language=en)
- Devolver ambos datos en una sola respuesta
- Manejar el caso cuando una API falla pero la otra no

**Respuesta esperada**:
```json
{
  "success": true,
  "data": {
    "weather": { "temperature": 22, "condition": "sunny" },
    "fact": "Cats sleep 70% of their lives"
  }
}
```

---

## Ejercicios Avanzados

### 🔴 Ejercicio 7: Endpoint con Autenticación

**Objetivo**: Proteger un endpoint con API Key.

**Requisitos**:
- Crear `app/api/protected/route.ts`
- Requerir header `Authorization: Bearer {API_KEY}`
- Validar la API Key contra `process.env.API_KEY`
- Devolver 401 si no está autenticado
- Devolver datos protegidos si está autenticado

**Variables de entorno**:
```bash
# .env.local
API_KEY=mi-clave-secreta-123
```

**Testing**:
```bash
# Sin auth (debe fallar)
curl http://localhost:3000/api/protected

# Con auth (debe funcionar)
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer mi-clave-secreta-123"
```

---

### 🔴 Ejercicio 8: Endpoint con Rate Limiting

**Objetivo**: Limitar el número de requests por IP.

**Requisitos**:
- Crear `app/api/limited/route.ts`
- Implementar límite de 5 requests por minuto por IP
- Usar un Map en memoria para trackear requests
- Devolver 429 (Too Many Requests) si se excede
- Incluir header `X-RateLimit-Remaining`

**Pista**: Usar `request.headers.get('x-forwarded-for')` para obtener IP.

---

### 🔴 Ejercicio 9: Endpoint con Validación Avanzada

**Objetivo**: Usar Zod para validación robusta.

**Requisitos**:
- Instalar Zod: `pnpm add zod`
- Crear `app/api/register/route.ts`
- Validar POST body con schema:
  ```typescript
  {
    username: string (3-20 chars, alphanumeric),
    email: string (valid email),
    age: number (18-120),
    terms: boolean (must be true)
  }
  ```
- Devolver errores de validación claros

**Ejemplo de error**:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "username must be between 3 and 20 characters",
    "email is not a valid email address"
  ]
}
```

---

### 🔴 Ejercicio 10: Endpoint con Paginación

**Objetivo**: Implementar paginación de resultados.

**Requisitos**:
- Crear `app/api/posts/route.ts`
- Consumir [JSONPlaceholder Posts](https://jsonplaceholder.typicode.com/posts)
- Aceptar parámetros `page` y `limit` (default: page=1, limit=10)
- Devolver resultados paginados con metadata

**Respuesta esperada**:
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## Proyectos Finales

### 🚀 Proyecto 1: Mini Dashboard de APIs

**Objetivo**: Crear una aplicación completa con frontend y backend.

**Requisitos**:
- Crear 3+ endpoints que consuman diferentes APIs
- Crear componentes React que muestren los datos
- Añadir loading states y error handling
- Diseñar UI moderna con TailwindCSS
- Implementar refresh automático cada 30 segundos

---

### 🚀 Proyecto 2: API Wrapper Educativo

**Objetivo**: Crear un wrapper alrededor de una API compleja.

**Requisitos**:
- Elegir una API compleja (GitHub, Spotify, OpenWeather)
- Crear múltiples endpoints que simplifiquen su uso
- Documentar cada endpoint estilo educativo
- Añadir cache inteligente
- Crear tests completos

---

### 🚀 Proyecto 3: API con Base de Datos

**Objetivo**: Integrar una base de datos real.

**Requisitos**:
- Configurar MongoDB o PostgreSQL
- Crear endpoints CRUD (Create, Read, Update, Delete)
- Implementar validación robusta
- Añadir autenticación con JWT
- Deploy a producción (Vercel + DB cloud)

---

## Soluciones

### Ejercicio 1: Solución Parcial

```typescript
// app/api/joke/route.ts
import { NextRequest } from 'next/server';

interface JokeApiResponse {
  joke: string;
  category: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'Programming';
    
    // Validar categoría
    const validCategories = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
    if (!validCategories.includes(category)) {
      return Response.json(
        { 
          success: false, 
          error: `Category must be one of: ${validCategories.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category}?type=single`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`JokeAPI error: ${response.status}`);
    }
    
    const data: JokeApiResponse = await response.json();
    
    return Response.json({
      success: true,
      data: {
        joke: data.joke,
        category: data.category,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { success: false, error: 'Error fetching joke' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
```

---

## 📝 Notas

- Completa los ejercicios en orden (básico → intermedio → avanzado)
- No te saltes los básicos aunque parezcan simples
- Testea cada endpoint completamente antes de pasar al siguiente
- Documenta tu código como si estuvieras enseñando a alguien
- Experimenta y añade tus propias mejoras

---

## 🎓 Recursos de APIs Públicas

- [Public APIs List](https://github.com/public-apis/public-apis)
- [API List](https://apilist.fun/)
- [RapidAPI](https://rapidapi.com/hub)
- [ProgrammableWeb](https://www.programmableweb.com/apis/directory)

---

<div align="center">

**¡Buena suerte con los ejercicios!** 💪

¿Completaste alguno? Comparte tu solución abriendo un PR.

[⬆️ Volver arriba](#-ejercicios-prácticos)

</div>


# 🤖 Reglas de AI para Codificación con Next.js 15 y APIs

> Estas reglas guían a los asistentes de IA (Cursor, GitHub Copilot, ChatGPT, etc.) al generar código para este proyecto educativo.

---

## 📋 Principios Generales

### 1. Enfoque Educativo

- **Explicar, no solo codificar**: Cada pieza de código debe incluir comentarios educativos que expliquen el "por qué", no solo el "qué".
- **Ejemplos claros**: Proporcionar ejemplos de uso y casos de prueba.
- **Paso a paso**: Cuando sea posible, descomponer tareas complejas en pasos pequeños y manejables.
- **Documentación inline**: Usar JSDoc/TSDoc para documentar funciones, interfaces y componentes.

### 2. Calidad del Código

- **Código limpio**: Nombres descriptivos, funciones pequeñas, evitar duplicación (DRY).
- **Legibilidad primero**: El código debe ser fácil de entender para estudiantes.
- **Consistencia**: Seguir los mismos patrones en todo el proyecto.
- **TypeScript estricto**: Todo debe estar tipado, evitar `any`.

---

## 🏗️ Estructura y Organización

### 1. Estructura de Carpetas

```
app/
├── api/                    # Todos los endpoints van aquí
│   ├── [nombre]/
│   │   └── route.ts        # Route handler
│   └── [otro]/
│       └── route.ts
├── layout.tsx              # Layout principal
├── page.tsx                # Página de inicio
└── components/             # Componentes reutilizables (si aplica)
```

**Reglas**:

- ✅ Endpoints SIEMPRE en `app/api/[nombre]/route.ts`
- ✅ Un endpoint = una carpeta
- ✅ El archivo DEBE llamarse `route.ts`
- ❌ NO usar `pages/api/` (legacy)

### 2. Nombres de Carpetas y Archivos

```typescript
// ✅ CORRECTO
app / api / advice / route.ts; // lowercase, descriptivo
app / api / user - profile / route.ts; // kebab-case para múltiples palabras
app / api / posts / [id] / route.ts; // dynamic routes con corchetes

// ❌ INCORRECTO
app / api / Advice / route.ts; // PascalCase en carpetas
app / api / user_profile / route.ts; // snake_case
app / api / advice.ts; // Falta carpeta
```

### 3. Organización del Código

```typescript
// Orden recomendado en route.ts:
// 1. Imports
// 2. Interfaces/Types
// 3. Constantes
// 4. Funciones auxiliares (si aplica)
// 5. Route handlers (GET, POST, etc.)
// 6. Configuraciones (export const dynamic, etc.)
```

---

## 📝 Buenas Prácticas de TypeScript

### 1. Interfaces Siempre

```typescript
// ✅ CORRECTO
interface AdviceSlipResponse {
  slip: {
    id: number;
    advice: string;
  };
}

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

export async function GET(): Promise<Response> {
  const data: AdviceSlipResponse = await response.json();
  return Response.json({ success: true, data } satisfies ApiResponse);
}

// ❌ INCORRECTO
export async function GET() {
  const data: any = await response.json(); // NO usar any
  return Response.json({ success: true, data });
}
```

### 2. Tipado de Funciones

```typescript
// ✅ CORRECTO
export async function GET(request: NextRequest): Promise<Response> {
  // ...
}

// ❌ INCORRECTO
export async function GET(request) {
  // Sin tipos
  // ...
}
```

### 3. Uso de `satisfies`

```typescript
// ✅ CORRECTO - satisfies verifica el tipo sin cambiar la inferencia
return Response.json({
  success: true,
  data: { advice: "test" },
} satisfies ApiResponse);

// ✅ También válido - Cast explícito
const response: ApiResponse = {
  success: true,
  data: { advice: "test" },
};
return Response.json(response);
```

### 4. Evitar `any`

```typescript
// ❌ INCORRECTO
const data: any = await response.json();

// ✅ CORRECTO
interface ExpectedData {
  id: number;
  name: string;
}
const data: ExpectedData = await response.json();

// ✅ Si el tipo es realmente desconocido, usa unknown
const data: unknown = await response.json();
if (typeof data === "object" && data !== null && "id" in data) {
  // Ahora podemos usar data de forma segura
}
```

---

## 🌐 Consumo de APIs Externas

### 1. Estructura Básica

```typescript
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // 1. Obtener parámetros
    const { searchParams } = new URL(request.url);
    const param = searchParams.get("param");

    // 2. Validar parámetros
    if (param && !isValid(param)) {
      return Response.json(
        { success: false, error: "Parámetro inválido" },
        { status: 400 }
      );
    }

    // 3. Construir URL de API externa
    const apiUrl = `https://api.example.com/data${param ? `/${param}` : ""}`;

    // 4. Hacer fetch
    const response = await fetch(apiUrl, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    // 5. Verificar respuesta
    if (!response.ok) {
      if (response.status === 404) {
        return Response.json(
          { success: false, error: "No encontrado" },
          { status: 404 }
        );
      }
      throw new Error(`API error: ${response.status}`);
    }

    // 6. Parsear JSON
    const data: ExpectedInterface = await response.json();

    // 7. Transformar y devolver
    return Response.json({
      success: true,
      data: {
        // Simplificar estructura
        id: data.id,
        value: data.value,
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiResponse);
  } catch (error) {
    // 8. Manejo de errores
    console.error("Error:", error);
    return Response.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Error desconocido"
            : "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
```

### 2. Configuración de Fetch

```typescript
// Para datos que cambian constantemente (tiempo real)
fetch(apiUrl, { cache: "no-store" });

// Para datos que se actualizan periódicamente
fetch(apiUrl, { next: { revalidate: 3600 } }); // 1 hora

// Para datos estáticos
fetch(apiUrl, { cache: "force-cache" });
```

### 3. Headers Personalizados

```typescript
const response = await fetch(apiUrl, {
  headers: {
    Accept: "application/json",
    "User-Agent": "Little-API/1.0",
    Authorization: `Bearer ${process.env.API_KEY}`, // Si requiere auth
  },
});
```

---

## ✅ Respuestas del Endpoint

### 1. Estructura Consistente

Todas las respuestas deben seguir el mismo formato:

```typescript
// Formato estándar de respuesta exitosa
interface SuccessResponse<T> {
  success: true;
  data: T;
}

// Formato estándar de respuesta con error
interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
```

### 2. Respuestas Exitosas

```typescript
// ✅ CORRECTO
return Response.json(
  {
    success: true,
    data: {
      id: 42,
      advice: "Don't be afraid to fail.",
      source: "Advice Slip API",
      timestamp: new Date().toISOString(),
    },
  } satisfies ApiResponse,
  { status: 200 }
);

// ❌ INCORRECTO - Estructura inconsistente
return Response.json({ advice: "test", id: 42 });
```

### 3. Respuestas de Error

```typescript
// ✅ CORRECTO - Error con mensaje claro y status apropiado
return Response.json(
  {
    success: false,
    error: 'El parámetro "id" debe ser un número positivo',
  },
  { status: 400 }
);

// ❌ INCORRECTO - Sin estructura o status code
return Response.json({ error: "mal" });
```

### 4. Status Codes

```typescript
// ✅ Usar status codes apropiados
200 → Operación exitosa
201 → Recurso creado
400 → Bad Request (parámetros inválidos)
401 → Unauthorized (no autenticado)
404 → Not Found (recurso no encontrado)
500 → Internal Server Error (error del servidor)

// Ejemplo
if (!found) {
  return Response.json(
    { success: false, error: 'Recurso no encontrado' },
    { status: 404 }  // ✅
  );
}
```

---

## 🛡️ Manejo de Errores y Validaciones

### 1. Try/Catch Siempre

```typescript
// ✅ CORRECTO
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Lógica del endpoint
    return Response.json({ success: true, data: "ok" });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

// ❌ INCORRECTO - Sin try/catch
export async function GET(request: NextRequest): Promise<Response> {
  const data = await fetch("..."); // Puede fallar sin manejo
  return Response.json(data);
}
```

### 2. Validación de Parámetros

```typescript
// ✅ CORRECTO - Validar antes de usar
const id = searchParams.get("id");

if (id && (isNaN(Number(id)) || Number(id) <= 0)) {
  return Response.json(
    {
      success: false,
      error: 'El parámetro "id" debe ser un número positivo válido',
    },
    { status: 400 }
  );
}

// ❌ INCORRECTO - Usar sin validar
const id = searchParams.get("id");
const numId = Number(id); // Puede ser NaN
const result = await fetchById(numId); // Error potencial
```

### 3. Manejo Específico de Errores

```typescript
// ✅ CORRECTO - Manejar diferentes tipos de errores
try {
  const response = await fetch(apiUrl);

  if (response.status === 404) {
    return Response.json(
      { success: false, error: "Recurso no encontrado" },
      { status: 404 }
    );
  }

  if (response.status === 429) {
    return Response.json(
      { success: false, error: "Límite de requests excedido" },
      { status: 429 }
    );
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
} catch (error) {
  // Error de red o timeout
  return Response.json(
    { success: false, error: "Error de conexión" },
    { status: 500 }
  );
}
```

### 4. Logging para Debugging

```typescript
// ✅ CORRECTO - Logs informativos
console.log(`🌐 Consultando API: ${apiUrl}`);
console.log(`✅ Respuesta exitosa (ID: ${data.id})`);
console.error(`❌ Error en endpoint:`, error);

// ❌ INCORRECTO - Sin logs o logs poco informativos
console.log("ok");
console.log(error);
```

---

## 🔒 Seguridad y Configuración

### 1. Variables de Entorno

```typescript
// ✅ CORRECTO - Usar .env.local para secretos
// .env.local
API_KEY=tu_clave_secreta
API_BASE_URL=https://api.example.com

// En route.ts
const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error('API_KEY no configurada');
}

const response = await fetch(`${process.env.API_BASE_URL}/data`, {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});

// ❌ INCORRECTO - Hardcodear secretos
const apiKey = 'sk_12345abc...'; // ¡NUNCA!
```

### 2. Validación de Inputs

```typescript
// ✅ CORRECTO - Sanitizar y validar
function sanitizeInput(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

const breed = searchParams.get("breed");
if (breed) {
  const safeBreed = sanitizeInput(breed);
  // Usar safeBreed...
}

// ❌ INCORRECTO - Usar input directo
const breed = searchParams.get("breed");
const apiUrl = `https://api.example.com/${breed}`; // Vulnerable
```

### 3. Headers CORS

```typescript
// ✅ CORRECTO - Configurar CORS si es necesario
return Response.json(data, {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*", // O dominio específico
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});
```

---

## 📚 Documentación Educativa

### 1. Comentarios en el Código

```typescript
/**
 * 📚 ENDPOINT DE CONSEJOS ALEATORIOS
 *
 * Este endpoint demuestra cómo consumir una API externa y transformar su respuesta.
 *
 * 🎯 Conceptos clave:
 * - Route Handlers en App Router
 * - Manejo de Request y Response
 * - Tipado con TypeScript
 * - Validación de parámetros
 * - Manejo de errores
 *
 * @example
 * GET /api/advice
 * GET /api/advice?id=42
 */

// ✅ PASO 1: Definir interfaces
// Esto mejora la seguridad de tipos y el autocompletado

// ✅ PASO 2: Extraer parámetros
// searchParams nos permite acceder a los query params

// ✅ PASO 3: Validar inputs
// Siempre validar antes de procesar
```

### 2. Ejemplos de Uso

```typescript
/**
 * 📖 EJEMPLOS DE USO:
 *
 * 1. Obtener un consejo aleatorio:
 *    GET http://localhost:3000/api/advice
 *
 * 2. Obtener un consejo específico por ID:
 *    GET http://localhost:3000/api/advice?id=42
 *
 * 3. Respuesta exitosa:
 *    {
 *      "success": true,
 *      "data": {
 *        "id": 42,
 *        "advice": "Don't be afraid to fail.",
 *        "source": "Advice Slip API",
 *        "timestamp": "2025-10-02T15:30:00.000Z"
 *      }
 *    }
 */
```

### 3. JSDoc para Funciones

```typescript
/**
 * Obtiene un consejo desde la API externa
 *
 * @param request - Objeto NextRequest con parámetros opcionales
 * @returns Response JSON con el consejo o error
 *
 * @throws {Error} Si la API externa no responde
 */
export async function GET(request: NextRequest): Promise<Response> {
  // ...
}
```

---

## 🧪 Testing

### 1. Código Testeable

```typescript
// ✅ CORRECTO - Funciones pequeñas y testeables
function validateId(id: string | null): boolean {
  return id !== null && !isNaN(Number(id)) && Number(id) > 0;
}

export async function GET(request: NextRequest) {
  const id = searchParams.get("id");

  if (!validateId(id)) {
    return Response.json({ error: "ID inválido" }, { status: 400 });
  }
  // ...
}

// ❌ INCORRECTO - Lógica mezclada y difícil de testear
export async function GET(request: NextRequest) {
  const id = searchParams.get("id");
  if (id && (isNaN(Number(id)) || Number(id) <= 0)) {
    // Lógica compleja inline
  }
}
```

### 2. Incluir Casos de Prueba en Comentarios

```typescript
/**
 * Casos de prueba recomendados:
 *
 * ✅ Casos felices:
 * - GET /api/advice → 200, devuelve consejo aleatorio
 * - GET /api/advice?id=42 → 200, devuelve consejo #42
 *
 * ✅ Casos de error:
 * - GET /api/advice?id=abc → 400, error de validación
 * - GET /api/advice?id=-5 → 400, número negativo
 * - GET /api/advice?id=99999 → 404, ID no existe
 *
 * ✅ Casos edge:
 * - GET /api/advice?id=0 → 400, cero no es válido
 * - GET /api/advice?id= → Igual a no enviar ID
 */
```

---

## 📦 Configuraciones Especiales

### 1. Configuración de Route

```typescript
// Al final de route.ts

// Forzar ejecución dinámica (no cachear)
export const dynamic = "force-dynamic";

// No revalidar (siempre fresh)
export const revalidate = 0;

// Tiempo máximo de ejecución (en segundos)
export const maxDuration = 10;

// Runtime
export const runtime = "nodejs"; // o 'edge'
```

### 2. Configuración de Cache

```typescript
// Cache para datos en tiempo real
export const revalidate = 0;

// Cache con revalidación cada hora
export const revalidate = 3600;

// Cache indefinido
export const revalidate = false;
```

---

## ✨ Checklist de Calidad

Antes de considerar completo un endpoint, verificar:

### Código

- [ ] Tipado completo con TypeScript
- [ ] Interfaces definidas para todas las respuestas
- [ ] Sin uso de `any`
- [ ] Nombres descriptivos y consistentes
- [ ] Funciones pequeñas y enfocadas

### Funcionalidad

- [ ] Try/catch para manejo de errores
- [ ] Validación de todos los parámetros de entrada
- [ ] Status codes HTTP apropiados
- [ ] Respuestas con estructura consistente
- [ ] Logging para debugging

### Seguridad

- [ ] Variables de entorno para secretos
- [ ] Sanitización de inputs
- [ ] No exponer detalles internos en errores de producción
- [ ] Headers CORS configurados (si aplica)

### Documentación

- [ ] Comentarios educativos en el código
- [ ] JSDoc en funciones principales
- [ ] Ejemplos de uso incluidos
- [ ] README actualizado

### Testing

- [ ] Testeado manualmente en navegador
- [ ] Testeado con cURL o Postman
- [ ] Casos de error verificados
- [ ] Casos edge considerados

---

## 🎓 Resumen para Asistentes de IA

Al generar código para este proyecto:

1. **Prioriza la claridad** sobre la brevedad
2. **Explica cada paso** con comentarios educativos
3. **Usa TypeScript estrictamente** sin `any`
4. **Valida todas las entradas** antes de procesarlas
5. **Maneja todos los errores** con try/catch
6. **Devuelve status codes apropiados**
7. **Documenta con ejemplos** de uso
8. **Sigue patrones consistentes** en todo el proyecto
9. **Incluye casos de prueba** en comentarios
10. **Piensa en seguridad** (env vars, sanitización)

---

## 🚀 Automatización con GitHub CLI (gh) y actualización de Context7

> Reglas prácticas para que asistentes de IA creen repositorios remotos y pull requests usando la GitHub CLI (`gh`) y para consultar/actualizar documentación con Context7 (`mcp_context7`).

### 1. Reglas para crear repositorios con `gh`

- Antes de crear: verificar que el usuario está autenticado y que `gh` está disponible. Si no, pedir permiso para continuar o instrucciones.
- Parámetros mínimos requeridos: `name`, `description`, `visibility` (public/private). Preguntar por `owner`/organización si aplica.
- Crear repositorio no-interactivo preferible: usar `gh repo create <owner>/<name> --description "..." --public|--private --source . --remote origin --push`.
- Si el repositorio nace desde un directorio existente, asegurarse de:
  - Que exista un commit inicial (si no, crear uno con mensaje claro: `chore: initial commit`).
  - `README.md`, `.gitignore`, y `LICENSE` adecuados (preguntar al usuario si desea una licencia distinta a MIT).
  - No incluir secretos ni archivos grandes; si hay secretos, sugerir usar `git-crypt` o GitHub Secrets.
- Después de crear: verificar que `origin` está configurado y que la rama principal (`main`) hace tracking de `origin/main`.
- Etiquetas útiles al crear: `topic`/`labels` con `gh repo edit --add-topic <topic>`.

### 2. Reglas para crear ramas y Pull Requests con `gh`

- Flujo recomendado:

  1. Crear rama feature: `git switch -c feat/mi-cambio` (kebab-case)
  2. Hacer commits pequeños y atómicos con mensajes convencionales (feat/fix/chore/docs/test)
  3. Ejecutar test y linter localmente (`pnpm test`, `pnpm lint`) antes de push
  4. Push: `git push -u origin feat/mi-cambio`
  5. Crear PR no-interactivo: `gh pr create --title "feat: ..." --body ".." --base main --head feat/mi-cambio --assignee @usuario --label "feature"`

- Reglas de seguridad y calidad antes de abrir PR:

  - No incluir cambios que exfiltren secretos o credenciales.
  - No añadir dependencias sin versionado o revisión (proponer PR separado para deps).
  - Ejecutar tests y lint; si fallan, documentar los errores y pedir intervención humana.
  - Si el trabajo está incompleto, crear PR en draft: `gh pr create --draft`.

- Contenido mínimo de un PR:
  - Título claro y tipo (feat/fix/docs/chore)
  - Cuerpo con resumen, cambios clave, cómo probar y checklist (tests/lint/testrun)
  - Referencias a issues usando `#<n>` si aplica
  - Indicar si se requiere revisión de alguien en particular

### 3. Ejemplos seguros (no ejecutar sin permiso explícito)

```bash
# Crear repo público y subir rama actual
gh repo create my-org/my-repo --description "Descripción..." --public --source . --remote origin --push

# Crear PR no-interactivo desde una rama ya pusheada
gh pr create --title "feat: add endpoint /api/foo" \
  --body "Agrega endpoint /api/foo; incluye tests y docs. Cómo probar: ..." \
  --base main --head feat/add-foo --label feature --assignee @reviewer
```

### 4. Buenas prácticas específicas para asistentes de IA

- Preguntar siempre al usuario por permisos antes de crear repos o empujar ramas. No asumir.
- Confirmar visibilidad (público/privado) y licencia.
- Añadir un `REPO_DESCRIPTION.md` o `README.md` si falta, y enlazar al PR para revisión humana.
- Cuando se creen PRs automatizados, marcar como `draft` si el cambio es parcial.
- Incluir logs de los comandos ejecutados y el URL del repo/PR en el mensaje de salida.

### 5. Actualizar y consultar Context7 (mcp_context7)

> Si el asistente necesita documentación actualizada de una librería (por ejemplo, para usar una API nueva o un flag), usar las funciones de Context7 siguiendo este patrón:

1. Resolver el ID de la librería: llamar a `mcp_context7_resolve-library-id` con el nombre del paquete (ej: `next.js`, `supabase`).
   - Guardar el `context7CompatibleLibraryID` devuelto; explicar por qué se eligió.
2. Obtener la documentación: llamar a `mcp_context7_get-library-docs` con el ID resuelto y el `topic` si aplica (ej: `routing`, `hooks`).
   - Revisar los snippets y secciones relevantes.
3. Si se incorpora información de Context7 al repo (guías/ejemplos), crear un archivo en `docs/context7/` con:
   - Resumen (2–4 líneas)
   - Fecha y `library id` usado
   - Extractos relevantes y la URL de referencia
4. Incluir en el PR un apartado "Docs: Context7 updates" que cite el ID y resuma los cambios.

### 6. Seguridad y observabilidad al usar `gh` y Context7

- Nunca incluir tokens, claves privadas o secretos en commits ni en argumentos de línea de comandos visibles en el repo.
- Para operaciones automatizadas (CI/robots), usar GitHub Actions con secrets configurados en el repo, no variables en claro.
- Registrar (en el PR o en el commit) qué comandos se ejecutaron y por qué, para auditoría humana.

---

<div align="center">

**Estas reglas aseguran código educativo, limpio y profesional** ✨

[⬆️ Volver arriba](#-reglas-de-ai-para-codificación-con-nextjs-15-y-apis)

</div>

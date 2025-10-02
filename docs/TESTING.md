# 🧪 Guía de Testing de Endpoints

> Aprende a probar tus endpoints de forma profesional usando diferentes herramientas y técnicas.

---

## 📑 Índice

1. [Introducción](#introducción)
2. [Testing desde el Navegador](#testing-desde-el-navegador)
3. [Testing con cURL](#testing-con-curl)
4. [Testing con Postman](#testing-con-postman)
5. [Testing con Thunder Client](#testing-con-thunder-client)
6. [Testing con JavaScript](#testing-con-javascript)
7. [Tests Automatizados](#tests-automatizados)
8. [Casos de Prueba Completos](#casos-de-prueba-completos)

---

## Introducción

### ¿Por qué testear?

Testing es fundamental para:
- ✅ Verificar que el endpoint funciona correctamente
- ✅ Detectar errores antes de producción
- ✅ Validar manejo de casos edge
- ✅ Documentar el comportamiento esperado
- ✅ Asegurar calidad del código

### Tipos de Tests

1. **Tests Manuales**: Navegador, cURL, Postman
2. **Tests Programáticos**: Scripts de JavaScript/TypeScript
3. **Tests Automatizados**: Jest, Vitest, Playwright

---

## Testing desde el Navegador

### Ventajas
- ✅ Rápido y simple
- ✅ No requiere herramientas adicionales
- ✅ Visual e intuitivo

### Desventajas
- ❌ Solo para peticiones GET
- ❌ Difícil de repetir
- ❌ No permite personalizar headers

### Cómo Hacerlo

Simplemente abre estas URLs en tu navegador:

```
http://localhost:3000/api/advice
http://localhost:3000/api/advice?id=42
http://localhost:3000/api/dog
http://localhost:3000/api/dog?breed=husky
```

### Instalar Extensión JSON Viewer (Opcional)

Para ver el JSON de forma más legible:

**Chrome/Edge**:
- [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)

**Firefox**:
- JSON nativo ya está formateado

---

## Testing con cURL

### ¿Qué es cURL?

**cURL** es una herramienta de línea de comandos para hacer peticiones HTTP.

### Instalación

**Windows**:
```bash
# cURL viene instalado por defecto en Windows 10+
curl --version
```

**macOS/Linux**:
```bash
# Instalar con Homebrew (macOS)
brew install curl

# O con apt (Linux)
sudo apt install curl
```

### Comandos Básicos

#### 1. GET Simple

```bash
curl http://localhost:3000/api/advice
```

#### 2. GET con Parámetros

```bash
curl http://localhost:3000/api/advice?id=42
```

#### 3. Ver Headers de Respuesta

```bash
curl -i http://localhost:3000/api/advice
```

#### 4. Solo Headers (sin body)

```bash
curl -I http://localhost:3000/api/advice
```

#### 5. Output a Archivo

```bash
curl http://localhost:3000/api/advice -o respuesta.json
```

#### 6. Formato Legible con jq

```bash
# Instalar jq primero: https://stedolan.github.io/jq/
curl http://localhost:3000/api/advice | jq
```

#### 7. POST con JSON Body

```bash
curl -X POST http://localhost:3000/api/ejemplo \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","edad":25}'
```

#### 8. Custom Headers

```bash
curl http://localhost:3000/api/advice \
  -H "Accept: application/json" \
  -H "Authorization: Bearer token123"
```

### Script de Tests con cURL

Crea `test-curl.sh`:

```bash
#!/bin/bash

echo "🧪 Testeando /api/advice"
echo "========================"

echo "\n1️⃣ Consejo aleatorio:"
curl -s http://localhost:3000/api/advice | jq

echo "\n2️⃣ Consejo con ID 42:"
curl -s http://localhost:3000/api/advice?id=42 | jq

echo "\n3️⃣ ID inválido (debe dar error 400):"
curl -s http://localhost:3000/api/advice?id=abc | jq

echo "\n4️⃣ ID no existente (debe dar error 404):"
curl -s http://localhost:3000/api/advice?id=99999 | jq

echo "\n🧪 Testeando /api/dog"
echo "===================="

echo "\n5️⃣ Perro aleatorio:"
curl -s http://localhost:3000/api/dog | jq

echo "\n6️⃣ Husky:"
curl -s http://localhost:3000/api/dog?breed=husky | jq

echo "\n7️⃣ Raza inválida (debe dar error):"
curl -s http://localhost:3000/api/dog?breed=invalid-breed | jq

echo "\n✅ Tests completados"
```

Ejecutar:

```bash
chmod +x test-curl.sh
./test-curl.sh
```

---

## Testing con Postman

### ¿Qué es Postman?

**Postman** es una aplicación de escritorio para testing de APIs con interfaz gráfica.

### Instalación

Descarga desde: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

### Pasos para Testear

#### 1. Crear Nueva Request

1. Abre Postman
2. Click en "New" → "HTTP Request"
3. Selecciona método: **GET**
4. URL: `http://localhost:3000/api/advice`
5. Click "Send"

#### 2. Añadir Query Params

En la sección **Params**, añade:

| Key | Value |
|-----|-------|
| id  | 42    |

#### 3. Ver Respuesta

En la parte inferior verás:
- **Body**: El JSON de respuesta
- **Status**: 200 OK
- **Time**: Tiempo de respuesta en ms
- **Size**: Tamaño de la respuesta

#### 4. Guardar Request

1. Click en "Save"
2. Nombre: "Get Advice by ID"
3. Crear colección: "Little API Tests"
4. Save

### Crear Colección de Tests

Crea una colección con estos requests:

```
📁 Little API Tests
  ├── 📄 Get Random Advice (GET /api/advice)
  ├── 📄 Get Advice by ID (GET /api/advice?id=42)
  ├── 📄 Get Invalid ID (GET /api/advice?id=abc)
  ├── 📄 Get Random Dog (GET /api/dog)
  ├── 📄 Get Husky (GET /api/dog?breed=husky)
  └── 📄 Get Invalid Breed (GET /api/dog?breed=xyz123)
```

### Tests Automáticos en Postman

En la pestaña **Tests** de cada request, añade:

```javascript
// Test: Verificar status 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test: Verificar que la respuesta es JSON
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

// Test: Verificar estructura de respuesta
pm.test("Response has success field", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
});

// Test: Verificar que success es true
pm.test("Success is true", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});

// Test: Verificar que tiene data
pm.test("Has data object", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData.data).to.be.an('object');
});
```

Ahora al ejecutar, verás los tests en verde ✅ o rojo ❌.

---

## Testing con Thunder Client

### ¿Qué es Thunder Client?

**Thunder Client** es una extensión de VS Code que funciona como Postman pero integrada en el editor.

### Instalación

1. Abre VS Code
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "Thunder Client"
4. Click "Install"

### Cómo Usar

#### 1. Abrir Thunder Client

- Click en el icono de rayo ⚡ en la barra lateral
- O usar atajo: `Ctrl+Shift+R`

#### 2. Nueva Request

1. Click "New Request"
2. Método: **GET**
3. URL: `http://localhost:3000/api/advice`
4. Click "Send"

#### 3. Añadir Query Params

En la pestaña **Query**, añade:

```
id = 42
```

#### 4. Guardar en Colección

1. Click "Save"
2. Crear colección: "Little API"
3. Nombre: "Get Advice by ID"

### Ventajas de Thunder Client

- ✅ Integrado en VS Code (no cambiar de aplicación)
- ✅ Más ligero que Postman
- ✅ Interfaz simple e intuitiva
- ✅ Exportar a cURL o código

---

## Testing con JavaScript

### Opción 1: Fetch en Node.js

Crea `test-api.js`:

```javascript
/**
 * Script de testing para los endpoints de Little API
 */

const BASE_URL = 'http://localhost:3000';

// Función auxiliar para hacer requests
async function testEndpoint(name, url, expectedStatus = 200) {
  console.log(`\n🧪 Test: ${name}`);
  console.log(`📡 URL: ${url}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const statusMatch = response.status === expectedStatus;
    const statusIcon = statusMatch ? '✅' : '❌';
    
    console.log(`${statusIcon} Status: ${response.status} (esperado: ${expectedStatus})`);
    console.log(`📦 Data:`, JSON.stringify(data, null, 2));
    
    return { success: statusMatch, data };
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { success: false, error };
  }
}

// Tests principales
async function runTests() {
  console.log('═══════════════════════════════════');
  console.log('🚀 Little API - Test Suite');
  console.log('═══════════════════════════════════');
  
  const tests = [
    // Tests del endpoint /api/advice
    {
      name: 'Get random advice',
      url: `${BASE_URL}/api/advice`,
      expectedStatus: 200
    },
    {
      name: 'Get advice by ID 42',
      url: `${BASE_URL}/api/advice?id=42`,
      expectedStatus: 200
    },
    {
      name: 'Get advice with invalid ID',
      url: `${BASE_URL}/api/advice?id=abc`,
      expectedStatus: 400
    },
    {
      name: 'Get advice with non-existent ID',
      url: `${BASE_URL}/api/advice?id=99999`,
      expectedStatus: 404
    },
    
    // Tests del endpoint /api/dog
    {
      name: 'Get random dog',
      url: `${BASE_URL}/api/dog`,
      expectedStatus: 200
    },
    {
      name: 'Get husky image',
      url: `${BASE_URL}/api/dog?breed=husky`,
      expectedStatus: 200
    },
    {
      name: 'Get corgi image',
      url: `${BASE_URL}/api/dog?breed=corgi`,
      expectedStatus: 200
    },
    {
      name: 'Get invalid breed',
      url: `${BASE_URL}/api/dog?breed=invalid-breed-xyz`,
      expectedStatus: 404
    },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = await testEndpoint(test.name, test.url, test.expectedStatus);
    if (result.success) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n═══════════════════════════════════');
  console.log(`📊 Resultados: ${passed} ✅ | ${failed} ❌`);
  console.log('═══════════════════════════════════');
}

// Ejecutar tests
runTests();
```

Ejecutar:

```bash
node test-api.js
```

### Opción 2: Con Axios

```bash
pnpm add -D axios
```

```javascript
const axios = require('axios');

async function testWithAxios() {
  try {
    const response = await axios.get('http://localhost:3000/api/advice', {
      params: { id: 42 }
    });
    
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Error Status:', error.response.status);
      console.log('Error Data:', error.response.data);
    }
  }
}
```

---

## Tests Automatizados

### Con Vitest (Recomendado para Next.js)

#### Instalación

```bash
pnpm add -D vitest @vitejs/plugin-react
```

#### Configuración

Crea `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
});
```

#### Crear Tests

Crea `app/api/advice/route.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';

describe('/api/advice', () => {
  const BASE_URL = 'http://localhost:3000';
  
  it('should return random advice', async () => {
    const response = await fetch(`${BASE_URL}/api/advice`);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('advice');
    expect(data.data).toHaveProperty('id');
  });
  
  it('should return advice by specific ID', async () => {
    const response = await fetch(`${BASE_URL}/api/advice?id=42`);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe(42);
  });
  
  it('should return 400 for invalid ID', async () => {
    const response = await fetch(`${BASE_URL}/api/advice?id=invalid`);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });
});
```

#### Ejecutar Tests

```bash
# Añadir script en package.json
"scripts": {
  "test": "vitest"
}

# Ejecutar
pnpm test
```

---

## Casos de Prueba Completos

### Checklist de Testing

#### ✅ Tests de Funcionalidad

- [ ] El endpoint responde con status 200 para casos válidos
- [ ] Devuelve JSON con estructura correcta
- [ ] Los datos devueltos son del tipo esperado
- [ ] Parámetros opcionales funcionan correctamente

#### ✅ Tests de Validación

- [ ] Rechaza parámetros inválidos (400)
- [ ] Maneja IDs que no existen (404)
- [ ] Valida tipos de datos (string, number)
- [ ] Maneja valores extremos (negativos, muy grandes)

#### ✅ Tests de Errores

- [ ] Maneja errores de la API externa (500)
- [ ] Devuelve mensajes de error claros
- [ ] No expone información sensible
- [ ] Logs de errores funcionan

#### ✅ Tests de Performance

- [ ] Respuesta en menos de 2 segundos
- [ ] No hay memory leaks
- [ ] Maneja múltiples requests concurrentes

### Tabla de Casos de Prueba

| # | Caso | URL | Status Esperado | Validación |
|---|------|-----|-----------------|------------|
| 1 | Consejo aleatorio | `/api/advice` | 200 | `data.advice` existe |
| 2 | Consejo por ID | `/api/advice?id=42` | 200 | `data.id === 42` |
| 3 | ID inválido (texto) | `/api/advice?id=abc` | 400 | `error` definido |
| 4 | ID negativo | `/api/advice?id=-5` | 400 | `error` definido |
| 5 | ID muy grande | `/api/advice?id=99999` | 404 | `error` sobre no encontrado |
| 6 | Perro aleatorio | `/api/dog` | 200 | `data.imageUrl` existe |
| 7 | Raza específica | `/api/dog?breed=husky` | 200 | `data.breed === 'husky'` |
| 8 | Raza inválida | `/api/dog?breed=xyz` | 404 | `error` sobre raza |

---

## Recursos Adicionales

- [Postman Learning](https://learning.postman.com/)
- [Thunder Client Docs](https://www.thunderclient.com/docs)
- [Vitest Docs](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

<div align="center">

**¡Felicidades!** 🎉  
Ahora sabes cómo testear tus endpoints profesionalmente.

[⬆️ Volver arriba](#-guía-de-testing-de-endpoints)

</div>


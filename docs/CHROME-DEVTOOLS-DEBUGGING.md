# 🔍 Debugging con Chrome DevTools desde Cursor

> Guía completa para debugear endpoints y aplicaciones Next.js usando Chrome DevTools MCP integrado en Cursor

---

## 📋 ¿Qué es Chrome DevTools MCP?

**MCP (Model Context Protocol)** de Chrome DevTools es una integración que permite controlar Chrome directamente desde Cursor AI para:

✅ Inspeccionar requests de red en tiempo real  
✅ Ver errores de consola del navegador  
✅ Tomar screenshots y snapshots del DOM  
✅ Interactuar con elementos (clicks, formularios)  
✅ Medir performance y Core Web Vitals  
✅ Automatizar testing E2E visual  
✅ Ejecutar JavaScript en el contexto de la página  

---

## 🎯 Casos de Uso

### 1. Debugear Endpoint que No Funciona

**Problema**: Tu endpoint devuelve un error o datos incorrectos.

**Solución con Chrome DevTools MCP**:

```
Dile a Cursor:
"Debugea el endpoint /api/advice usando Chrome DevTools"
```

**Lo que Cursor hará automáticamente**:

1. Abrirá Chrome en `http://localhost:3000/api/advice`
2. Inspeccionará el request completo (headers, body, status)
3. Mostrará la respuesta JSON
4. Verificará errores en la consola
5. Te mostrará un reporte completo

**Ejemplo de comando**:
```typescript
// Cursor ejecutará internamente:
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000/api/advice?id=42" 
})

mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["document", "fetch"]
})

mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/advice"
})

mcp_chrome-devtools_list_console_messages()
```

---

### 2. Ver Errores de JavaScript

**Problema**: Tu código JavaScript tiene errores pero no sabes cuáles.

**Solución**:

```
Dile a Cursor:
"Muéstrame los errores de consola de mi app"
```

**Lo que obtendrás**:
- Lista de todos los `console.log`, `console.error`, `console.warn`
- Stack traces de errores
- Mensajes de red fallidos

---

### 3. Testear Formularios Automáticamente

**Problema**: Necesitas probar que un formulario funciona correctamente.

**Solución**:

```
Dile a Cursor:
"Testea el formulario de la página /contact rellenando nombre='Test' y email='test@example.com'"
```

**Lo que Cursor hará**:

1. Navegará a `/contact`
2. Identificará los campos del formulario
3. Los rellenará con los valores que especificaste
4. Hará click en submit
5. Verificará que se envió correctamente
6. Te mostrará el resultado

---

### 4. Tomar Screenshots de Bugs

**Problema**: Quieres documentar un bug visual.

**Solución**:

```
Dile a Cursor:
"Toma un screenshot de la página /api/dog?breed=husky"
```

**Resultado**: Obtendrás una imagen PNG del resultado.

---

### 5. Medir Performance

**Problema**: Tu app es lenta y quieres saber por qué.

**Solución**:

```
Dile a Cursor:
"Analiza el performance de mi homepage con red 3G lenta"
```

**Lo que Cursor hará**:

1. Emulará conexión 3G lenta
2. Emulará CPU de dispositivo móvil
3. Hará un performance trace completo
4. Analizará Core Web Vitals (LCP, FID, CLS)
5. Te dirá qué optimizar

---

## 📖 Guía Paso a Paso

### Escenario Completo: Debugear Endpoint de Perros

**Contexto**: El endpoint `/api/dog?breed=husky` no está funcionando como esperas.

#### Paso 1: Pedir Análisis a Cursor

```
Usuario: "El endpoint /api/dog?breed=husky no funciona correctamente. 
Ayúdame a debugearlo con Chrome DevTools"
```

#### Paso 2: Cursor Ejecuta el Debugging

Cursor automáticamente:

**A. Navega al endpoint**
```typescript
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000/api/dog?breed=husky" 
})
```

**B. Inspecciona el request**
```typescript
const requests = await mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["document"]
})
```

**C. Obtiene detalles completos**
```typescript
const requestDetail = await mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/dog"
})
```

**D. Verifica errores**
```typescript
const logs = await mcp_chrome-devtools_list_console_messages()
```

**E. Toma screenshot del resultado**
```typescript
await mcp_chrome-devtools_take_screenshot({
  format: "png",
  filePath: "debug-dog-endpoint.png"
})
```

#### Paso 3: Cursor Te Muestra el Reporte

```
📊 REPORTE DE DEBUGGING - /api/dog?breed=husky

✅ STATUS CODE: 200 OK

📦 RESPUESTA:
{
  "success": true,
  "data": {
    "imageUrl": "https://images.dog.ceo/breeds/husky/n02110185_13704.jpg",
    "breed": "husky",
    "timestamp": "2025-10-02T15:45:14.294Z"
  }
}

🌐 REQUEST HEADERS:
- Accept: application/json
- User-Agent: Mozilla/5.0...

📋 RESPONSE HEADERS:
- Content-Type: application/json
- Access-Control-Allow-Origin: *
- Cache-Control: no-cache

🔍 CONSOLE LOGS:
✅ "🐕 Consultando Dog API: https://dog.ceo/api/breed/husky/images/random"
✅ "✅ Imagen de perro obtenida exitosamente"

📸 SCREENSHOT: debug-dog-endpoint.png

✅ CONCLUSIÓN: El endpoint funciona correctamente. 
La respuesta es válida y no hay errores en consola.
```

---

## 🧪 Testing E2E con Chrome DevTools

### Ejemplo: Testear Flujo Completo de UI

**Objetivo**: Verificar que el usuario puede navegar desde home → endpoint advice → ver resultado.

**Comando para Cursor**:

```
"Testea el flujo completo: desde la homepage, hacer click en el link de /api/advice, 
y verificar que la respuesta es correcta"
```

**Lo que Cursor ejecutará**:

```typescript
// 1. Navegar a home
await mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Tomar snapshot para obtener UIDs de elementos
const snapshot = await mcp_chrome-devtools_take_snapshot()

// 3. Screenshot inicial
await mcp_chrome-devtools_take_screenshot({
  filePath: "test-01-home.png",
  fullPage: true
})

// 4. Click en el link de /api/advice
await mcp_chrome-devtools_click({ 
  uid: "link-advice-endpoint" // UID obtenido del snapshot
})

// 5. Esperar a que cargue
await mcp_chrome-devtools_wait_for({ 
  text: "success", 
  timeout: 3000 
})

// 6. Verificar el request
const requests = await mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["document"]
})

// 7. Screenshot del resultado
await mcp_chrome-devtools_take_screenshot({
  filePath: "test-02-advice-result.png"
})

// 8. Verificar que no hay errores
const logs = await mcp_chrome-devtools_list_console_messages()
const errors = logs.filter(log => log.level === 'error')

// 9. Reporte
console.log({
  status: errors.length === 0 ? '✅ PASS' : '❌ FAIL',
  requestStatus: requests[0].status,
  consoleErrors: errors,
  screenshots: ['test-01-home.png', 'test-02-advice-result.png']
})
```

---

## 🎓 Comandos Útiles para Cursor

### Debugging Básico

```
"Debugea el endpoint /api/advice"
"Muéstrame los errores de consola"
"Toma un screenshot de la página actual"
"Lista todos los requests de red"
```

### Testing Interactivo

```
"Rellena el formulario con email='test@example.com' y envíalo"
"Haz click en el botón 'Get Advice' y muéstrame el resultado"
"Testea que el endpoint /api/dog funciona con breed=corgi"
```

### Performance

```
"Analiza el performance de mi homepage"
"Mide Core Web Vitals con conexión 3G"
"Encuentra los recursos que bloquean el render"
```

### Automatización

```
"Crea un test E2E para el flujo de obtener un consejo aleatorio"
"Toma screenshots de todos los endpoints en la homepage"
"Verifica que no hay errores 404 en ninguna página"
```

---

## 📊 Métricas que Puedes Obtener

### Network Requests

- ✅ URL completa del request
- ✅ Método HTTP (GET, POST, etc.)
- ✅ Status code (200, 404, 500, etc.)
- ✅ Headers de request y response
- ✅ Body de request y response
- ✅ Tiempo de respuesta
- ✅ Tamaño de la respuesta

### Console Logs

- ✅ `console.log` messages
- ✅ `console.error` messages
- ✅ `console.warn` messages
- ✅ Stack traces de errores
- ✅ Línea y archivo donde ocurrió

### Performance

- ✅ **LCP** (Largest Contentful Paint)
- ✅ **FID** (First Input Delay)
- ✅ **CLS** (Cumulative Layout Shift)
- ✅ Time to First Byte (TTFB)
- ✅ Recursos que bloquean render
- ✅ Selectores CSS lentos

---

## 🎯 Mejores Prácticas

### 1. Siempre Pedir Snapshot Primero

Antes de interactuar con elementos, pide un snapshot:

```
"Toma un snapshot de la página /contact"
```

Esto te dará los UIDs de todos los elementos para poder interactuar con ellos.

### 2. Combina Network + Console

Para debugging completo, siempre verifica ambos:

```
"Debugea /api/advice mostrándome requests de red y errores de consola"
```

### 3. Usa Screenshots para Documentación

Cuando encuentres bugs, documéntalos con screenshots:

```
"Toma screenshot del error 404 en /api/dog?breed=invalid"
```

### 4. Emula Condiciones Reales

Testea con throttling para simular usuarios reales:

```
"Testea el performance con conexión 3G lenta y CPU 4x más lento"
```

---

## 🐛 Troubleshooting Común

### Problema: "No veo los requests de red"

**Solución**: Asegúrate de navegar a la página primero.

```
Correcto:
1. "Navega a http://localhost:3000"
2. "Muéstrame los requests de red"

Incorrecto:
1. "Muéstrame los requests de red" (sin navegar primero)
```

### Problema: "No puedo hacer click en el botón"

**Solución**: Primero obtén el snapshot para saber el UID.

```
Correcto:
1. "Toma snapshot de la página"
2. "Haz click en el botón con uid 'button-submit'"

Incorrecto:
1. "Haz click en el botón submit" (no sabemos el UID)
```

### Problema: "El screenshot está vacío"

**Solución**: Espera a que la página cargue completamente.

```
Correcto:
1. "Navega a http://localhost:3000"
2. "Espera 2 segundos"
3. "Toma screenshot"

O mejor:
1. "Navega a http://localhost:3000"
2. "Espera a que aparezca el texto 'Bienvenido'"
3. "Toma screenshot"
```

---

## 📚 Recursos Adicionales

- **Chrome DevTools Docs**: https://developer.chrome.com/docs/devtools/
- **Core Web Vitals**: https://web.dev/vitals/
- **Network Panel Guide**: https://developer.chrome.com/docs/devtools/network/

---

## ✨ Resumen

Chrome DevTools MCP en Cursor te permite:

1. **Debugear más rápido** - Ver requests y errores en segundos
2. **Testear automáticamente** - Interactuar con la UI sin código manual
3. **Documentar bugs** - Screenshots automáticos
4. **Optimizar performance** - Métricas reales con emulación
5. **Automatizar testing** - E2E tests visuales desde Cursor

**Simplemente dile a Cursor qué necesitas** y dejará que Chrome DevTools MCP haga el trabajo pesado.

---

<div align="center">

**¡Debugging más inteligente con Chrome DevTools MCP!** 🔍✨

[⬆️ Volver arriba](#-debugging-con-chrome-devtools-desde-cursor)

</div>



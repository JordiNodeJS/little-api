# Cursor AI Rules - Chrome DevTools MCP Integration

## 🔍 Chrome DevTools MCP - Advanced Debugging

### Propósito

El MCP (Model Context Protocol) de Chrome DevTools permite interactuar con Chrome desde Cursor para:
- Debugear aplicaciones web en tiempo real
- Inspeccionar network requests y responses
- Automatizar testing visual y funcional
- Analizar performance y Core Web Vitals
- Tomar screenshots y snapshots del DOM
- Ejecutar JavaScript en el contexto de la página

### Cuándo Sugerir Chrome DevTools MCP

Sugiere automáticamente usar Chrome DevTools MCP cuando el usuario:
- Mencione "debugear", "debug", "testing", "test"
- Pregunte sobre errores en la UI o el navegador
- Necesite inspeccionar requests de red
- Quiera testear endpoints visualmente
- Pregunte sobre performance o Core Web Vitals
- Necesite automatizar interacciones con la UI
- Quiera tomar screenshots o documentar bugs

### Workflow Estándar de Debugging

#### 1. Iniciar Sesión de Debug

```
1. Listar páginas abiertas
   → mcp_chrome-devtools_list_pages

2. Si no hay páginas o necesitas una nueva:
   → mcp_chrome-devtools_new_page({ url: "http://localhost:3000" })
   
3. Seleccionar página activa
   → mcp_chrome-devtools_select_page({ pageIdx: 0 })
```

#### 2. Inspección Inicial

```
1. Tomar snapshot del DOM
   → mcp_chrome-devtools_take_snapshot()
   
2. Ver mensajes de consola
   → mcp_chrome-devtools_list_console_messages()
   
3. Ver requests de red
   → mcp_chrome-devtools_list_network_requests()
```

#### 3. Debugging de Endpoints API

**Cuando el usuario pregunte**: "¿Por qué mi endpoint no funciona?" o "¿Cómo puedo ver la respuesta del API?"

**Respuesta sugerida**:
```
Voy a ayudarte a debugear el endpoint usando Chrome DevTools. Permíteme:

1. Abrir tu aplicación en Chrome
2. Llamar al endpoint desde el navegador
3. Inspeccionar la respuesta completa

Aquí está el plan:
```

**Luego ejecutar**:
```typescript
// 1. Navegar a la app
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Tomar snapshot para ver elementos
mcp_chrome-devtools_take_snapshot()

// 3. Navegar directamente al endpoint
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000/api/advice?id=42" 
})

// 4. Ver el request en Network tab
mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["fetch", "document"]
})

// 5. Obtener detalles del request
mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/advice"
})

// 6. Ver errores en consola
mcp_chrome-devtools_list_console_messages()

// 7. Tomar screenshot del resultado
mcp_chrome-devtools_take_screenshot({
  format: "png",
  fullPage: true
})
```

#### 4. Testing de Formularios

**Cuando el usuario pregunte**: "¿Cómo puedo testear este formulario?" o "¿Funciona bien la validación?"

**Workflow**:
```typescript
// 1. Navegar a la página
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000/formulario" 
})

// 2. Snapshot para obtener UIDs
mcp_chrome-devtools_take_snapshot()

// 3. Rellenar formulario
mcp_chrome-devtools_fill_form({
  elements: [
    { uid: "input-name", value: "Test User" },
    { uid: "input-email", value: "test@example.com" }
  ]
})

// 4. Click en submit
mcp_chrome-devtools_click({ uid: "button-submit" })

// 5. Esperar respuesta
mcp_chrome-devtools_wait_for({ 
  text: "Enviado correctamente", 
  timeout: 5000 
})

// 6. Verificar network requests
mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// 7. Screenshot del resultado
mcp_chrome-devtools_take_screenshot({ 
  format: "png",
  filePath: "test-resultado.png"
})
```

#### 5. Performance Testing

**Cuando el usuario pregunte**: "¿Mi app es rápida?" o "¿Cómo optimizar performance?"

**Workflow**:
```typescript
// 1. Navegar a la página
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Emular condiciones de red lenta
mcp_chrome-devtools_emulate_network({ 
  throttlingOption: "Slow 3G" 
})

// 3. Emular CPU lenta (dispositivos móviles)
mcp_chrome-devtools_emulate_cpu({ 
  throttlingRate: 4 
})

// 4. Iniciar performance trace
mcp_chrome-devtools_performance_start_trace({
  reload: true,
  autoStop: true
})

// 5. Esperar a que termine
// (autoStop lo detiene automáticamente)

// 6. Analizar Core Web Vitals
mcp_chrome-devtools_performance_analyze_insight({
  insightName: "LCPBreakdown"
})

// Otros insights disponibles:
// - "DocumentLatency"
// - "RenderBlocking"
// - "SlowCSSSelector"
```

### Casos de Uso Específicos

#### Caso 1: Error 404 en Endpoint

**Usuario dice**: "Mi endpoint devuelve 404"

**Respuesta**:
```
Voy a verificar qué está pasando con tu endpoint. Permíteme inspeccionar los requests:
```

```typescript
// 1. Abrir la app
mcp_chrome-devtools_new_page({ 
  url: "http://localhost:3000/api/tu-endpoint" 
})

// 2. Ver el request que falló
mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["document", "fetch"]
})

// 3. Obtener detalles del error
mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/tu-endpoint"
})

// 4. Ver mensajes de consola
mcp_chrome-devtools_list_console_messages()
```

**Luego analizar**:
- Status code del request
- Headers de la respuesta
- Errores en consola
- Ruta exacta solicitada vs ruta del archivo

#### Caso 2: Datos No Se Muestran en UI

**Usuario dice**: "Los datos del API no aparecen en la página"

**Respuesta**:
```
Voy a debugear el flujo completo desde el fetch hasta el render:
```

```typescript
// 1. Navegar a la página
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Snapshot del estado inicial
const snapshot1 = await mcp_chrome-devtools_take_snapshot()

// 3. Click en el botón que fetchea datos
mcp_chrome-devtools_click({ uid: "button-load-data" })

// 4. Esperar un momento
mcp_chrome-devtools_wait_for({ text: "Cargando", timeout: 1000 })

// 5. Ver requests de red
const requests = await mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// 6. Snapshot del estado después del fetch
const snapshot2 = await mcp_chrome-devtools_take_snapshot()

// 7. Verificar errores en consola
const logs = await mcp_chrome-devtools_list_console_messages()

// 8. Ejecutar JS para ver el estado
mcp_chrome-devtools_evaluate_script({
  function: `() => {
    // Ver datos en window o localStorage
    return {
      windowData: window.apiData,
      localStorageData: localStorage.getItem('data'),
      domContent: document.querySelector('[data-api-result]')?.textContent
    };
  }`
})
```

#### Caso 3: Testing E2E de Flujo Completo

**Usuario dice**: "¿Cómo puedo testear todo el flujo de mi app?"

**Respuesta**:
```
Voy a crear un test E2E completo con Chrome DevTools:
```

```typescript
// Test: Flujo completo de obtener y mostrar consejo

// 1. Setup: Navegar a home
mcp_chrome-devtools_navigate_page({ 
  url: "http://localhost:3000" 
})

// 2. Screenshot inicial (documentación)
mcp_chrome-devtools_take_screenshot({
  filePath: "tests/01-home.png",
  fullPage: true
})

// 3. Snapshot para obtener UIDs
const snapshot = await mcp_chrome-devtools_take_snapshot()

// 4. Interacción: Click en "Get Advice"
mcp_chrome-devtools_click({ uid: "link-advice-endpoint" })

// 5. Esperar navegación
mcp_chrome-devtools_wait_for({ text: "success", timeout: 3000 })

// 6. Verificar request
const networkRequests = await mcp_chrome-devtools_list_network_requests({
  resourceTypes: ["document"]
})

// 7. Screenshot del resultado
mcp_chrome-devtools_take_screenshot({
  filePath: "tests/02-advice-result.png"
})

// 8. Verificar datos en la respuesta
const requestDetail = await mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/advice"
})

// 9. Verificar consola sin errores
const consoleLogs = await mcp_chrome-devtools_list_console_messages()

// 10. Assert: Verificar que no hay errores
const hasErrors = consoleLogs.filter(log => log.level === 'error')

// Resultado: Pass/Fail
console.log({
  status: hasErrors.length === 0 ? 'PASS' : 'FAIL',
  networkRequest: requestDetail.status,
  consoleErrors: hasErrors
})
```

### Mejores Prácticas

#### 1. Siempre Empezar con Snapshot

Antes de interactuar con elementos, **siempre tomar un snapshot**:

```typescript
// ✅ CORRECTO
const snapshot = await mcp_chrome-devtools_take_snapshot()
// Ahora conoces los UIDs de los elementos
await mcp_chrome-devtools_click({ uid: "button-submit" })

// ❌ INCORRECTO
await mcp_chrome-devtools_click({ uid: "button-submit" })
// No sabes si ese UID existe
```

#### 2. Verificar Network + Console

Siempre combina ambas verificaciones:

```typescript
// Ver qué se envió/recibió
const requests = await mcp_chrome-devtools_list_network_requests()

// Ver si hubo errores JavaScript
const logs = await mcp_chrome-devtools_list_console_messages()
```

#### 3. Screenshots para Documentación

Tomar screenshots en pasos clave:

```typescript
// Antes de la acción
await mcp_chrome-devtools_take_screenshot({
  filePath: "tests/before-action.png"
})

// Después de la acción
await mcp_chrome-devtools_take_screenshot({
  filePath: "tests/after-action.png"
})
```

#### 4. Emular Condiciones Reales

Siempre testear con throttling:

```typescript
// Emular 3G lento
await mcp_chrome-devtools_emulate_network({ 
  throttlingOption: "Slow 3G" 
})

// Emular CPU de móvil (4x más lento)
await mcp_chrome-devtools_emulate_cpu({ 
  throttlingRate: 4 
})
```

### Prompts Sugeridos para el Usuario

Cuando detectes que el usuario necesita debugging, sugiere:

```
💡 **Sugerencia**: Puedo ayudarte a debugear esto usando Chrome DevTools directamente desde Cursor. 

Puedo:
- Ver los requests de red y sus respuestas completas
- Inspeccionar errores en la consola del navegador
- Tomar screenshots del problema
- Interactuar con la UI (clicks, rellenar formularios)
- Medir performance y Core Web Vitals

¿Quieres que ejecute un análisis completo?
```

### Plantillas de Debugging

#### Template: Debug Endpoint

```typescript
async function debugEndpoint(endpointUrl: string) {
  // 1. Navegar al endpoint
  await mcp_chrome-devtools_navigate_page({ url: endpointUrl })
  
  // 2. Ver request details
  const requests = await mcp_chrome-devtools_list_network_requests()
  
  // 3. Ver errores
  const logs = await mcp_chrome-devtools_list_console_messages()
  
  // 4. Screenshot
  await mcp_chrome-devtools_take_screenshot({ 
    filePath: `debug-${Date.now()}.png` 
  })
  
  return { requests, logs }
}
```

#### Template: Test UI Interaction

```typescript
async function testUIInteraction(pageUrl: string, buttonUID: string) {
  // 1. Navegar
  await mcp_chrome-devtools_navigate_page({ url: pageUrl })
  
  // 2. Snapshot
  await mcp_chrome-devtools_take_snapshot()
  
  // 3. Click
  await mcp_chrome-devtools_click({ uid: buttonUID })
  
  // 4. Esperar
  await mcp_chrome-devtools_wait_for({ text: "Success", timeout: 3000 })
  
  // 5. Verificar
  const requests = await mcp_chrome-devtools_list_network_requests()
  const logs = await mcp_chrome-devtools_list_console_messages()
  
  return { requests, logs }
}
```

### Troubleshooting con Chrome DevTools

#### Si el usuario reporta:

**"El servidor no responde"**
```typescript
// Verificar si el servidor está corriendo
const requests = await mcp_chrome-devtools_list_network_requests()
// Buscar requests con status 0 o timeout
```

**"Los datos son incorrectos"**
```typescript
// Ver la respuesta completa del API
const request = await mcp_chrome-devtools_get_network_request({
  url: "http://localhost:3000/api/endpoint"
})
// Analizar request.response
```

**"Hay un error pero no sé dónde"**
```typescript
// Ver todos los errores
const logs = await mcp_chrome-devtools_list_console_messages()
const errors = logs.filter(log => log.level === 'error')
```

**"La app es lenta"**
```typescript
// Performance trace
await mcp_chrome-devtools_performance_start_trace({
  reload: true,
  autoStop: true
})

// Analizar métricas
await mcp_chrome-devtools_performance_analyze_insight({
  insightName: "LCPBreakdown"
})
```

---

**Recuerda**: Chrome DevTools MCP es una herramienta poderosa para debugging visual y funcional. Úsala proactivamente cuando detectes que el usuario necesita inspeccionar comportamiento del navegador.



# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **Little API**! Este es un proyecto educativo y toda contribución es bienvenida.

---

## 📋 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/JordiNodeJS/little-api.git
cd little-api
```

### 2. Crear una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

**Convención de nombres de ramas**:

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código

### 3. Hacer Cambios

- Sigue las [Reglas de AI](.github/prompts/ai-coding-rules.md)
- Mantén el código limpio y documentado
- Añade comentarios educativos
- Asegúrate de que todo esté tipado con TypeScript

### 4. Testear

```bash
# Ejecutar tests
node test-api.js

# Verificar que el servidor funcione
pnpm dev
```

### 5. Commit

```bash
git add .
git commit -m "Add: nueva funcionalidad de ejemplo"
```

**Convención de commits**:

- `Add:` - Nueva funcionalidad
- `Fix:` - Corrección de bug
- `Update:` - Actualización de código existente
- `Docs:` - Cambios en documentación
- `Refactor:` - Refactorización

### 6. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego abre un Pull Request en GitHub.

---

## 🎯 Áreas de Contribución

### Nuevos Endpoints

¿Conoces una API pública interesante? Añade un nuevo endpoint de ejemplo:

```
app/api/tu-endpoint/route.ts
```

Requisitos:

- Documentado con comentarios educativos
- Tipado completo con TypeScript
- Manejo de errores con try/catch
- Ejemplos de uso en comentarios

### Mejoras en Documentación

- Tutorial más detallado
- Más ejemplos de uso
- Traducciones a otros idiomas
- Videos o diagramas explicativos

### Tests y Validación

- Añadir más casos de prueba
- Implementar tests automatizados con Vitest
- Mejorar el script `test-api.js`

### Ejemplos Frontend

- Componentes React que consuman los endpoints
- Interfaces de usuario para interactuar con las APIs
- Gráficos o visualizaciones de datos

---

## ✅ Checklist Antes de Enviar PR

- [ ] El código sigue las convenciones del proyecto
- [ ] Todo está tipado con TypeScript (no `any`)
- [ ] Los endpoints tienen comentarios educativos
- [ ] Los tests pasan (`node test-api.js`)
- [ ] La documentación está actualizada
- [ ] El commit message sigue la convención
- [ ] No hay conflictos con `main`

---

## 🐛 Reportar Bugs

Abre un [Issue](https://github.com/JordiNodeJS/little-api/issues) con:

- **Descripción**: ¿Qué salió mal?
- **Pasos para reproducir**: ¿Cómo podemos replicar el bug?
- **Comportamiento esperado**: ¿Qué debería pasar?
- **Screenshots**: Si aplica

---

## 💡 Proponer Funcionalidades

Abre un [Issue](https://github.com/JordiNodeJS/little-api/issues) con la etiqueta `enhancement`:

- **Descripción**: ¿Qué quieres añadir?
- **Justificación**: ¿Por qué sería útil?
- **Ejemplos**: ¿Cómo funcionaría?

---

## 📜 Código de Conducta

- Sé respetuoso y constructivo
- Este es un proyecto educativo, todas las preguntas son válidas
- Ayuda a otros a aprender
- Celebra los logros de otros

---

## 🙏 Agradecimientos

Gracias por contribuir a hacer este proyecto mejor para todos los estudiantes.

---

<div align="center">

**¿Preguntas?** Abre un [Issue](https://github.com/JordiNodeJS/little-api/issues) o únete a la discusión.
**¿Preguntas?** Abre un [Issue](https://github.com/JordiNodeJS/little-api/issues) o únete a la discusión.

</div>

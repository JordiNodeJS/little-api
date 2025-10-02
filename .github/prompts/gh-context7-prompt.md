# Prompt: Crear repositorios y Pull Requests con GitHub CLI (gh) y consultar Context7

Idioma: Español

Propósito

Este prompt guía a un asistente de IA para crear repositorios remotos y Pull Requests usando la GitHub CLI (`gh`) y para consultar/extraer documentación de librerías usando Context7 (`mcp_context7`). El asistente debe pedir permisos antes de ejecutar comandos que modifican el repositorio remoto.

Precondiciones (lo que debes verificar antes de actuar)

- Confirma que el usuario está de acuerdo en que ejecutes comandos git/gh que hagan cambios remotos.
- Verifica que `gh` esté instalado y autenticado. Si no, pide instrucciones.
- Verifica que no haya secretos en los archivos a commitear.
- Pregunta y confirma: nombre del repo, visibilidad (public/private), owner/organización (si aplica), licencia, y si desean que empuje la rama principal.

Instrucciones estrictas para el asistente (paso a paso)

1. Crear repositorio remoto (si corresponde)

- Asegúrate de que exista al menos un commit en el directorio.
- Comando no-interactivo recomendado:
  gh repo create <owner>/<name> --description "<desc>" --public|--private --source . --remote origin --push
- Después de crear, devuelve la URL del repo y confirma que `origin` está configurado.

2. Flujo para ramas y Pull Requests

- Crear rama de trabajo: `git switch -c feat/mi-cambio` (usar kebab-case y prefijos: feat/fix/chore/docs/test)
- Hacer commits pequeños y claros. Ejecutar linter/tests locales antes de push (`pnpm lint`, `pnpm test`).
- Push con tracking: `git push -u origin feat/mi-cambio`
- Crear PR no-interactivo con campos mínimos:
  gh pr create --title "<tipo>: <resumen>" --body "<descripcion y checklist>" --base main --head feat/mi-cambio --label "<label>" --assignee @revisor
- Si el cambio está incompleto, crear PR en draft: `gh pr create --draft`.

3. Contenido mínimo de un PR (debe incluirse en el `--body`)

- Resumen breve de los cambios
- Cómo probar localmente (comandos)
- Checklist: Tests pasados, lint pasado, no secrets, cambios en docs
- Referencia a issues: `Closes #<n>` si aplica

4. Uso de Context7 para consultar documentación de librerías

- Paso 1: Resolver ID: llamar a `mcp_context7_resolve-library-id` con el nombre de la librería (ej: "next.js").
  - Guarda el `context7CompatibleLibraryID` retornado y documenta por qué se eligió.
- Paso 2: Obtener docs: llamar a `mcp_context7_get-library-docs` con el ID y opcionalmente `topic` (ej: "routing", "fetch").
- Paso 3: Resumir en 3–6 líneas la información relevante y proponer cambios concretos (ej: flags, patterns, snippets).
- Paso 4: Si se incorpora al repo, crea un archivo en `docs/context7/` con: título, fecha, library id, resumen y extractos citados.

5. Seguridad y auditoría (obligatorio)

- Nunca incluir tokens ni secretos en commits o en la línea de comandos como texto plano.
- Para acciones automatizadas usar GitHub Actions con Secrets y no exponerlos en PRs.
- Registrar en el cuerpo del PR qué comandos se ejecutaron (audit trail).

6. Salida esperada del asistente (formato de respuesta)

- Antes de ejecutar: solicita confirmación del usuario mostrando los comandos a ejecutar (formatos con placeholders).
- Tras ejecutar: devuelve un JSON/markdown corto con:
  - `action`: "created-repo" | "created-pr" | "pushed-branch" | "no-op"
  - `commands`: lista de comandos ejecutados
  - `urls`: url del repo y/o PR (si aplica)
  - `notes`: cualquier advertencia o paso manual requerido

Ejemplos (plantillas)

- Crear repo:
  gh repo create my-org/my-repo --description "Descripción corta" --public --source . --remote origin --push

- Crear PR:
  gh pr create --title "feat: add /api/foo" \
   --body "Añade endpoint /api/foo. Cómo probar: pnpm dev -> GET /api/foo. Checklist: [x] lint [x] test" \
   --base main --head feat/add-foo --label feature --assignee @revisor

Notas finales para el asistente

- Pide permiso explícito antes de crear repos o empujar ramas.
- Si no tienes permisos para crear el repo en la organización solicitada, informa y sugiere alternativas (crear en la cuenta del usuario o pedir acceso).
- Mantén la comunicación humana: cuando haya errores (tests fallidos, conflictos, límites de cuota), documenta claramente el problema y no asumas soluciones automáticas sin permiso.

---

Usa este prompt como plantilla y adapta los placeholders al contexto del usuario. Si el usuario autoriza, ejecuta los comandos; de lo contrario, solo propone los comandos y espera confirmación.

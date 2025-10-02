# 🚀 Quick Start - Little API

> Guía rápida de 5 minutos para poner en marcha el proyecto

---

## ⚡ Instalación Express (3 comandos)

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor
pnpm dev

# 3. Abrir en el navegador
# http://localhost:3000
```

---

## 🧪 Probar los Endpoints (en 1 minuto)

### Opción 1: Navegador

Abre estas URLs directamente:

```
http://localhost:3000/api/advice
http://localhost:3000/api/advice?id=42
http://localhost:3000/api/dog
http://localhost:3000/api/dog?breed=husky
```

### Opción 2: Terminal

```bash
# Consejo aleatorio
curl http://localhost:3000/api/advice

# Imagen de perro
curl http://localhost:3000/api/dog
```

### Opción 3: Script Automático

```bash
pnpm test
```

---

## 📚 ¿Qué Hacer Después?

### Para Estudiantes

1. **Lee el README.md** → Visión general del proyecto
2. **Sigue el TUTORIAL.md** → Aprende paso a paso
3. **Examina app/api/advice/route.ts** → Ve el código comentado
4. **Haz los EXERCISES.md** → Practica con ejercicios

### Para Instructores

1. **Revisa .github/prompts/ai-coding-rules.md** → Reglas de codificación
2. **Usa TUTORIAL.md** → Contenido pedagógico listo
3. **Asigna EXERCISES.md** → 10 ejercicios + 3 proyectos
4. **Personaliza** → Añade tus propios endpoints de ejemplo

---

## 🎯 Estructura en 30 Segundos

```
little-api/
├── app/api/           # Endpoints (aquí va tu código)
│   ├── advice/        # Endpoint 1: Consejos
│   └── dog/           # Endpoint 2: Perros
├── docs/              # Toda la documentación educativa
│   ├── TUTORIAL.md    # Tutorial completo
│   ├── TESTING.md     # Guía de testing
│   ├── LESSONS-LEARNED.md  # Conceptos clave
│   └── EXERCISES.md   # Ejercicios prácticos
└── test-api.js        # Tests automatizados
```

---

## 💡 Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Compilar para producción
pnpm start            # Servidor de producción

# Calidad
pnpm lint             # Verificar código
pnpm test             # Ejecutar tests
```

---

## ❓ FAQ Express

**P: ¿Dónde creo nuevos endpoints?**  
R: En `app/api/[nombre]/route.ts`

**P: ¿Cómo testeo un endpoint?**  
R: Abre `http://localhost:3000/api/[nombre]` en el navegador

**P: ¿Dónde está la documentación completa?**  
R: En `docs/TUTORIAL.md`

**P: ¿Puedo usar APIs que requieren API Key?**  
R: Sí, crea un archivo `.env.local` basado en `.env.example`

**P: ¿Cómo agrego TypeScript?**  
R: Ya está configurado. Solo define interfaces y úsalas.

---

## 🆘 Problemas Comunes

### El servidor no inicia

```bash
# Verificar que pnpm está instalado
pnpm --version

# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Puerto 3000 ocupado

```bash
# Usar otro puerto
pnpm dev -- -p 3001
```

### Tests fallan

```bash
# Asegúrate de que el servidor esté corriendo
pnpm dev

# En otra terminal, ejecuta
pnpm test
```

---

## 🎓 Recursos Rápidos

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Public APIs List](https://github.com/public-apis/public-apis)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

<div align="center">

**¡Listo para empezar!** 🎉

Lee el [README.md](README.md) para más detalles.

</div>


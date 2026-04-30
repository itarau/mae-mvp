# MAE — Marco de Autonomía Estratégica
## MVP v0.1 · Diagnóstico de Autonomía Estratégica

---

### Estructura del proyecto

```
mae-mvp/
├── src/
│   ├── App.jsx        ← Toda la lógica + componentes
│   └── App.css        ← Estilos completos
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .env.example
```

---

### Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno
cp .env.example .env.local

# 3. Agregar tu API key en .env.local
# VITE_ANTHROPIC_API_KEY=sk-ant-...

# 4. Correr en desarrollo
npm run dev
```

---

### Deploy en Vercel

1. Subir este repositorio a GitHub
2. Conectar el repo en vercel.com
3. En Vercel → Settings → Environment Variables, agregar:
   - `VITE_ANTHROPIC_API_KEY` = tu API key de Anthropic
4. Deploy

**IMPORTANTE**: La API key es visible en el frontend (limitación de este MVP).
Para producción, implementar un backend proxy (Vercel Edge Function).

---

### Flujo del MVP

1. **Inicio** — presentación de MAE
2. **Nombre** — personalización
3. **Arquetipo** — 4 perfiles, el usuario elige el que lo representa
4. **Diagnóstico** — 15 preguntas por dimensión
5. **Cargando** — llamada a Claude API
6. **Resultado** — diagnóstico completo estructurado

### Dimensiones medidas

| Dimensión | Preguntas |
|-----------|-----------|
| Autonomía Cognitiva | 5 |
| Capacidad Estratégica | 4 |
| Conciencia Contextual | 4 |
| Arquitectura Energética | 1 |
| Adaptabilidad Evolutiva | 1 |

---

### Métrica de validación

A las 48 horas del diagnóstico, preguntar a cada usuario:

> "¿Cambió algo en cómo estás pensando tu situación esta semana?"

**Umbral de éxito**: 40%+ responde sí → el diagnóstico genera impacto real.

---

© 2026 Mónica Rau · MAE — Marco de Autonomía Estratégica

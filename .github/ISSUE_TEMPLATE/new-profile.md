---
name: Nuevo Perfil de Estudiante
about: Solicitar la integración de un nuevo perfil de estudiante CUBO+ al directorio
title: 'Profile: [Tu Nombre Completo]'
labels: new-profile
assignees: ''
---

<!--
  Gracias por querer unirte al directorio de CUBO+.
  Completa todos los campos marcados como requeridos (*).
  Los campos opcionales enriquecen tu perfil — ¡te recomendamos completarlos!
-->

## Información básica del perfil

**Nombre Completo *:** 

**Slug para la URL *:**
<!-- El slug es el identificador único de tu perfil en la URL: /creators/<slug>
     Reglas: solo minúsculas, sin espacios, usa guiones en lugar de espacios.
     Debe coincidir EXACTAMENTE con el nombre de tu archivo MDX (sin la extensión).
     Correcto:   slug = "ana-gutierrez"  →  archivo = ana-gutierrez.mdx
     Incorrecto: slug = "Ana Gutierrez"  →  no coincide con el archivo -->

**Categoría *:**
<!-- Elige UNA de las siguientes opciones:
     Developer / Designer / Educator / Researcher / Entrepreneur -->

**Ocupación *:**
<!-- Título o rol profesional. Ej: Bitcoin Developer, Lightning Network Engineer,
     UX Designer, Bitcoin Educator, Open Source Contributor -->

**Bio corta *:**
<!-- 1-2 oraciones que describan quién eres. Esta descripción aparece
     en la tarjeta del directorio principal. Sé conciso y directo. -->

---

## Foto de perfil

**URL del avatar:**
<!-- URL pública a tu foto de perfil. Opciones recomendadas:
     - Foto de GitHub:  https://github.com/<tu-usuario>.png
     - Cualquier URL pública a una imagen .jpg o .png
     Si no tienes una, puedes dejar este campo vacío. -->

---

## Redes sociales

**GitHub:**
<!-- URL completa. Ej: https://github.com/ana-gutierrez -->

**LinkedIn:**
<!-- URL completa. Ej: https://linkedin.com/in/ana-gutierrez -->

**Twitter / X:**
<!-- Solo el nombre de usuario, sin @. Ej: ana_gutierrez -->

---

## Habilidades y tecnologías (softSkills)

<!-- Lista de tecnologías, herramientas o áreas de expertise.
     Ej: Bitcoin, Lightning Network, Rust, Open Source, UX Design -->

---

## Contenido adicional del perfil (opcional)

**Color de acento (accentColor):**
<!-- Color hexadecimal para personalizar los detalles visuales de tu perfil.
     Ej: #F7931A (naranja Bitcoin), #3B82F6 (azul), #8B5CF6 (púrpura) -->

**Videos de YouTube:**
<!-- Si tienes videos relevantes, comparte los IDs de YouTube.
     El ID es la parte después de ?v= en la URL del video.
     Ej: https://youtube.com/watch?v=dQw4w9WgXcQ  →  ID: dQw4w9WgXcQ

     Formato:
     - videoId: "dQw4w9WgXcQ"
       title: "Título del video"
       description: "Descripción opcional" -->

**Bio extendida:**
<!-- ¿Quieres agregar más información en tu página de perfil?
     Puedes escribir en Markdown: párrafos, listas, encabezados, etc.
     Esta sección irá en el cuerpo del archivo MDX, debajo del frontmatter. -->

---

## Archivo MDX de ejemplo

<!-- Al crear el PR, tu archivo debe verse así (reemplaza con tus datos):

```
---
name: "Ana Gutiérrez"
slug: "ana-gutierrez"           ← debe coincidir con el nombre del archivo
avatar: "https://github.com/ana-gutierrez.png"
category: "Developer"
categoryColor: "blue"
occupation: "Bitcoin Developer"
bio: "Desarrolladora especializada en Lightning Network."
softSkills: ["Bitcoin", "Lightning Network", "Rust"]
github: "https://github.com/ana-gutierrez"
linkedin: "https://linkedin.com/in/ana-gutierrez"
twitter: "ana_gutierrez"
accentColor: "#3B82F6"
---

export const meta = {
  name: "Ana Gutiérrez",
  slug: "ana-gutierrez",        ← mismo valor que arriba
  avatar: "https://github.com/ana-gutierrez.png",
  category: "Developer",
  categoryColor: "blue",
  occupation: "Bitcoin Developer",
  bio: "Desarrolladora especializada en Lightning Network.",
  softSkills: ["Bitcoin", "Lightning Network", "Rust"],
  github: "https://github.com/ana-gutierrez",
  linkedin: "https://linkedin.com/in/ana-gutierrez",
  twitter: "ana_gutierrez",
  accentColor: "#3B82F6",
}

## Sobre mí

Bio extendida aquí...
```

El archivo debe guardarse como: src/content/creators/ana-gutierrez.mdx
-->

---

## Checklist antes de enviar el PR

### Archivo
- [ ] El archivo se llama `nombre-apellido.mdx` (minúsculas, sin espacios, con guiones)
- [ ] El archivo está ubicado en `src/content/creators/`
- [ ] El campo `slug` del frontmatter **coincide exactamente** con el nombre del archivo (sin `.mdx`)
- [ ] El objeto `export const meta` tiene los **mismos valores** que el frontmatter YAML

### Campos requeridos
- [ ] `name` — nombre completo
- [ ] `slug` — identificador de URL
- [ ] `category` — una de: Developer / Designer / Educator / Researcher / Entrepreneur
- [ ] `occupation` — título o rol
- [ ] `bio` — descripción corta (1-2 oraciones)

### Campos recomendados
- [ ] `avatar` — URL de foto de perfil
- [ ] Al menos una red social (`github`, `linkedin` o `twitter`)
- [ ] `softSkills` — lista de habilidades

### Verificación local
- [ ] Corrí `npm install` y `npm run dev` sin errores
- [ ] Mi tarjeta aparece en la grilla principal (`http://localhost:5173`)
- [ ] Mi página de perfil carga correctamente (`http://localhost:5173/creators/<mi-slug>`)
- [ ] No hay errores en la consola del navegador relacionados con mi perfil

---

## Notas adicionales
<!-- Cualquier información extra, contexto sobre tu trayectoria en CUBO+,
     o algo que quieras que el equipo sepa antes de revisar tu PR. -->

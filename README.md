# CUBO+ Students Directory

## ¿Qué es CUBO+?

**CUBO+** es un academía Bitcoin de alto nivel en El Salvador diseñado para formar a jóvenes talentos en el desarrollo, la tecnología y la economía de Bitcoin y la Lightning Network. Su objetivo es crear una comunidad de profesionales salvadoreños calificados para satisfacer la demanda laboral del ecosistema cripto y fomentar el desarrollo económico.

Este repositorio contiene el directorio oficial de estudiantes y egresados de CUBO+, mostrando sus perfiles, habilidades y proyectos.

---

## ¿Qué es esta aplicación?

Esta es una **aplicación web** construida con React, TypeScript y Vite que funciona como un **directorio interactivo de creadores**. Incluye:

- **Página principal** con una sección hero y una grilla de tarjetas de perfiles.
- **Perfil individual** para cada creador, con su bio, habilidades, redes sociales y videos de YouTube embebidos.
- **Soporte bilingüe** (Español / Inglés) mediante un sistema de i18n integrado.
- **Modo oscuro/claro** configurable desde el encabezado.
- **Contenido basado en archivos MDX** — cada perfil es un archivo `.mdx` dentro de `src/content/creators/`. No se necesita base de datos.

Los perfiles se cargan automáticamente desde los archivos MDX usando `import.meta.glob` de Vite, por lo que agregar un nuevo perfil es tan simple como crear el archivo correspondiente y abrir un Pull Request.

---

## Correr la aplicación en local

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) (incluido con Node.js)

### Pasos

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/<org>/landing-creators.git
   cd landing-creators
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite en la terminal).

4. **Otros comandos útiles**

   | Comando | Descripción |
   |---|---|
   | `npm run dev` | Servidor de desarrollo con hot-reload |
   | `npm run build` | Compila la aplicación para producción |
   | `npm run preview` | Previsualiza el build de producción localmente |
   | `npm run lint` | Ejecuta ESLint sobre el código fuente |

---

## ¿Cómo contribuir al proyecto?

Puedes contribuir de dos formas principales:

### 1. Mejoras al código o la documentación

Si quieres corregir un bug, mejorar la UI o actualizar documentación:

1. **Haz un fork** del repositorio.
2. **Crea una rama** descriptiva:
   ```bash
   git checkout -b fix/nombre-del-fix
   # o
   git checkout -b docs/mejora-readme
   ```
3. **Realiza tus cambios** y verifica que el proyecto corra sin errores (`npm run dev`).
4. **Crea un commit** claro:
   ```bash
   git commit -m "Fix: descripción del cambio"
   ```
5. **Sube la rama** a tu fork y abre un **Pull Request** describiendo qué cambiaste y por qué.

### 2. Agregar tu perfil al directorio

Ver la sección completa a continuación.

---

## Flujo completo para publicar tu perfil

### Paso 1 — Fork y rama

```bash
# 1. Haz fork desde GitHub y luego clona tu fork
git clone https://github.com/<tu-usuario>/landing-creators.git
cd landing-creators

# 2. Crea una rama específica para tu perfil
git checkout -b profile/antonio-hernandez
```

### Paso 2 — Crea tu archivo MDX

Dentro de `src/content/creators/`, crea un archivo con el formato:

```
nombre-apellido.mdx
```

> **Regla crítica:** el nombre del archivo (sin la extensión `.mdx`) **debe coincidir exactamente** con el valor del campo `slug` dentro del frontmatter. Si el archivo se llama `antonio-hernandez.mdx`, entonces el frontmatter debe tener `slug: "antonio-hernandez"`. Si no coinciden, la URL del perfil (`/creators/<slug>`) no resolverá correctamente.

**Soporte bilingüe (opcional):** si quieres proveer contenido en español e inglés por separado, crea dos archivos:
- `nombre-apellido.es.mdx` — versión en español
- `nombre-apellido.en.mdx` — versión en inglés

El sistema los unifica automáticamente bajo el mismo slug.

### Paso 3 — Estructura del archivo MDX

El archivo tiene dos secciones obligatorias: el **frontmatter** (metadata YAML) y el bloque **`export const meta`** (necesario para que React cargue los datos en tiempo de ejecución). Ambos deben tener exactamente los mismos valores.

```mdx
---
name: "Antonio Hernandez"
slug: "antonio-hernandez"
avatar: "https://github.com/antonio-hernandez.png" 
category: "Developer"
categoryColor: "#8dc8c6"
occupation: "Bitcoin Developer"
bio: "Desarrollador enfocada en soluciones de Lightning Network para El Salvador."
softSkills: ["Bitcoin", "Lightning Network", "Open Source"]
github: "https://github.com/caeher"
linkedin: "https://linkedin.com/in/caeher"
twitter: "_caeher_"
accentColor: "#3B82F6"
---

export const meta = {
  name: "Antonio Hernandez",
  slug: "antonio-hernandez",
  avatar: "https://github.com/antonio-hernandez.png",
  category: "Developer",
  categoryColor: "blue",
  occupation: "Bitcoin Developer",
  bio: "Desarrollador enfocada en soluciones de Lightning Network para El Salvador.",
  softSkills: ["Bitcoin", "Lightning Network", "Open Source"],
  github: "https://github.com/caeher",
  linkedin: "https://linkedin.com/in/caeher",
  twitter: "_caeher_",
  accentColor: "#3B82F6",
}

## Sobre mí

Bio extendida en Markdown. Puedes usar encabezados `##`, listas, **negrita**,
_itálica_ y componentes especiales como `<Callout>` y `<YouTubeEmbed>`.
```

### Paso 4 — Referencia completa de campos

| Campo | Tipo | Descripción | Requerido |
|---|---|---|---|
| `name` | `string` | Nombre completo | ✓ |
| `slug` | `string` | Identificador de URL. **Debe coincidir exactamente con el nombre del archivo** (sin `.mdx`) | ✓ |
| `avatar` | `string` | URL de foto de perfil. Se recomienda `https://github.com/<usuario>.png` | Opcional |
| `category` | `string` | Categoría profesional (ver tabla abajo) | ✓ |
| `category_en` | `string` | Categoría en inglés (soporte bilingüe) | Opcional |
| `categoryColor` | `string` | Color del badge (ver tabla abajo) | Opcional |
| `occupation` | `string` | Rol o título profesional | ✓ |
| `occupation_en` | `string` | Ocupación en inglés | Opcional |
| `bio` | `string` | Descripción corta (1-2 oraciones) para la tarjeta del directorio | ✓ |
| `bio_en` | `string` | Bio en inglés | Opcional |
| `softSkills` | `string[]` | Lista de habilidades o tecnologías | Opcional |
| `softSkills_en` | `string[]` | Habilidades en inglés | Opcional |
| `github` | `string` | URL completa al perfil de GitHub | Opcional |
| `linkedin` | `string` | URL completa al perfil de LinkedIn | Opcional |
| `twitter` | `string` | Solo el nombre de usuario, sin `@` | Opcional |
| `youtubeVideos` | `array` | Lista de videos de YouTube (ver formato abajo) | Opcional |
| `accentColor` | `string` | Color hexadecimal para detalles visuales del perfil | Opcional |

#### Valores válidos para `category` y `categoryColor`

| `category` | `categoryColor` |
|---|---|
| `Developer` | `blue` |
| `Designer` | `purple` |
| `Educator` | `green` |
| `Researcher` | `orange` |
| `Entrepreneur` | `yellow` |

#### Formato para `youtubeVideos`

```yaml
youtubeVideos:
  - videoId: "dQw4w9WgXcQ"
    title: "Título del video"
    description: "Descripción opcional"
```

### Paso 5 — Verifica tu perfil localmente

```bash
npm run dev
```

Navega a `http://localhost:5173` y verifica que:
- Tu tarjeta aparece en la grilla principal.
- El link a tu perfil funciona: `http://localhost:5173/creators/antonio-hernandez`.
- La información se muestra correctamente.

### Paso 6 — Commit y Pull Request

```bash
# Agrega solo tu archivo MDX
git add src/content/creators/antonio-hernandez.mdx

git commit -m "Add: Antonio Hernandez profile"

git push origin profile/antonio-hernandez
```

Abre un **Pull Request** en GitHub con:
- **Título:** `Profile: Antonio Hernandez`
- **Descripción:** breve presentación de quién eres y qué haces en el ecosistema Bitcoin.

Una vez aprobado el PR, tu perfil aparecerá automáticamente en el directorio.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vitejs.dev/) | Build tool y servidor de desarrollo |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos |
| [MDX](https://mdxjs.com/) | Contenido de perfiles |
| [React Router v7](https://reactrouter.com/) | Navegación |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Parseo de frontmatter |


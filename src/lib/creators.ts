export interface YouTubeVideo {
  videoId: string
  title: string
  description?: string
}

export interface CreatorMeta {
  name: string
  slug: string
  avatar?: string
  /** Primary language category label (ES) */
  category: string
  /** English category label */
  category_en?: string
  categoryColor?: string
  /** Primary language occupation title (ES) */
  occupation: string
  /** English occupation title */
  occupation_en?: string
  /** Primary language bio (ES) */
  bio: string
  /** English bio */
  bio_en?: string
  /** Primary language soft skills (ES) */
  softSkills?: string[]
  /** English soft skills */
  softSkills_en?: string[]
  github?: string
  linkedin?: string
  twitter?: string
  /** List of YouTube videos to display in profile */
  youtubeVideos?: YouTubeVideo[]
  accentColor?: string
}

// Compiled MDX modules - each exports `meta` and `default` (the component)
// Matches plain .mdx, .es.mdx, and .en.mdx files
const mdxModules = import.meta.glob<{ default: React.ComponentType; meta: CreatorMeta }>(
  '../content/creators/*.mdx',
  { eager: false }
)

// Eagerly loaded for synchronous getAllCreators()
const mdxModulesEager = import.meta.glob<{ default: React.ComponentType; meta: CreatorMeta }>(
  '../content/creators/*.mdx',
  { eager: true }
)

/**
 * Extracts the creator slug from a file path.
 * Handles plain `.mdx`, `.es.mdx`, and `.en.mdx` suffixes.
 *   creators/ana-gutierrez.mdx    → "ana-gutierrez"
 *   creators/cuboplus.es.mdx      → "cuboplus"
 *   creators/cuboplus.en.mdx      → "cuboplus"
 */
function extractSlugFromPath(path: string): string {
  const bilingual = path.match(/creators\/(.+)\.[a-z]{2}\.mdx$/)
  if (bilingual) return bilingual[1]
  const plain = path.match(/creators\/(.+)\.mdx$/)
  return plain ? plain[1] : path
}

/**
 * Returns all primary creator entries for the directory listing.
 * - `.en.mdx` files are language variants — they are skipped here.
 * - If both `<slug>.es.mdx` and `<slug>.mdx` exist, the `.es.mdx` wins.
 */
export function getAllCreators(): CreatorMeta[] {
  const creators: CreatorMeta[] = []
  const seen = new Set<string>()

  console.log(mdxModulesEager)

  for (const [path, mod] of Object.entries(mdxModulesEager)) {
    // Skip EN language variants — loaded on demand by getCreatorBySlug
    if (path.endsWith('.en.mdx')) continue
    if (!mod.meta) continue
    const slug = mod.meta.slug ?? extractSlugFromPath(path)
    if (seen.has(slug)) continue
    seen.add(slug)
    creators.push({ ...mod.meta, slug })
  }

  return creators
}

/**
 * Loads a creator profile by slug, picking the best language variant.
 *
 * Resolution order (first match wins):
 *   1. `<slug>.<lang>.mdx`   e.g. cuboplus.en.mdx  (bilingual file for requested lang)
 *   2. `<slug>.es.mdx`       e.g. cuboplus.es.mdx  (primary bilingual file)
 *   3. `<slug>.mdx`          e.g. ana-gutierrez.mdx (legacy single file)
 */
export async function getCreatorBySlug(
  slug: string,
  lang?: 'ES' | 'EN',
): Promise<{ meta: CreatorMeta; Component: React.ComponentType } | null> {
  const langSuffix = lang ? lang.toLowerCase() : null

  // Build candidate filenames in priority order
  const candidates: string[] = []
  if (langSuffix) candidates.push(`${slug}.${langSuffix}.mdx`)
  candidates.push(`${slug}.es.mdx`)
  candidates.push(`${slug}.mdx`)

  let entry: [string, (typeof mdxModules)[string]] | undefined
  for (const candidate of candidates) {
    entry = Object.entries(mdxModules).find(([path]) =>
      path.endsWith(`/${candidate}`) || path.endsWith(`\\${candidate}`)
    )
    if (entry) break
  }

  if (!entry) return null

  const [, loader] = entry
  const mod = await loader()

  if (!mod.meta) return null

  const meta: CreatorMeta = { ...mod.meta, slug: mod.meta.slug ?? slug }
  const Component = mod.default

  return { meta, Component }
}

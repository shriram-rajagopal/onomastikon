import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const civilizations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/civilizations' }),
  schema: z.object({
    english_name: z.string(),
    type: z.enum(['civilization', 'city', 'region', 'geographic_feature']).default('civilization'),
    entry_status: z.enum(['developing', 'complete']).default('developing'),
    // Authored on every civ entry and shown in the page meta line. Optional so
    // adding it after content already exists can't break the build; tighten to
    // required if every entity is guaranteed to carry one.
    region: z.string().optional(),
    era_start: z.number(),
    era_end: z.number(),
    summary: z.string(),
    featured_image: z.string().optional(),
  }),
});

const languages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/languages' }),
  schema: z.object({
    english_name: z.string(),
    native_name: z.string().optional(),
    language_family: z.string(),
    script: z.string(),
    era_start: z.number(),
    era_end: z.number(),
    direction: z.enum(['ltr', 'rtl', 'btt']).default('ltr'),
  }),
});

const names = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/names' }),
  schema: z.object({
    civilization: reference('civilizations'),
    language: reference('languages'),
    original_text: z.string(),
    transliteration: z.string(),
    ipa: z.string().optional(),
    literal_meaning: z.string().optional(),
    // Asserts the original script has no usable Unicode representation (e.g.
    // Demotic), so original_text is intentionally left empty. This is a claim
    // about the script's encodability, not a stand-in for "not yet typed" — set
    // it only where the form genuinely cannot be encoded.
    script_unencodable: z.boolean().optional(),
    era_start: z.number(),
    era_end: z.number(),
    confidence: z.enum(['attested', 'reconstructed', 'disputed']),
    sources: z.array(z.object({
      citation: z.string(),
      page: z.string().optional(),
      url: z.string().optional(),
    })),
  }),
});

export const collections = { civilizations, languages, names };
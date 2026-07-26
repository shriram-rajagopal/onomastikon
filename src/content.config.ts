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
    // era_end: null is the explicit "in continued use" claim (rendered as such
    // by formatEra) for names/entities that never fell out of use — an
    // editorial judgment applied per entry, not a default. Same on all three
    // collections below.
    era_end: z.number().nullable(),
    summary: z.string(),
  }),
});

const languages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/languages' }),
  schema: z.object({
    english_name: z.string(),
    native_name: z.string().optional(),
    language_family: z.string(),
    script: z.string(),
    // BCP-47 / ISO 639-3 code (e.g. grc, akk, hbo), emitted as the lang attribute
    // on original-script text so screen readers and font selection behave.
    lang_code: z.string(),
    era_start: z.number(),
    era_end: z.number().nullable(),
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
    // Name-family membership: a slug grouping cognate names for the same entity
    // that share one etymological root or transmission tradition (e.g. "msr",
    // "ionian", "roma"). Only set when at least two entries on the entity's
    // page share the family; etymologically isolated names carry no family.
    family: z.string().optional(),
    // True where this form is a self-name: the name the entity's own people
    // (or the resident population of a city or the riparian/shore civilization
    // of a feature) used for it, in their own language. Drives the "They
    // called themselves / Their neighbors called them" split on entity pages.
    // Absent = an outsider's name. Set conservatively: an unflagged endonym
    // merely lists with the neighbors, but a wrongly flagged exonym asserts a
    // false self-name.
    endonym: z.boolean().optional(),
    // The specific entry this form was borrowed or descended from, set ONLY
    // where the entry's own prose asserts the derivation without hedging and
    // the parent form exists in the collection. Cognate siblings (parallel
    // descent, no asserted borrowing path) share a family but carry no edge.
    derived_from: reference('names').optional(),
    era_start: z.number(),
    era_end: z.number().nullable(),
    confidence: z.enum(['attested', 'reconstructed', 'disputed']),
    // The FORM's confidence label above conflates three axes; this optional
    // field separates the second one out: how secure the MEANING (the
    // literal_meaning gloss) is, independent of the form's attestation. A
    // securely attested form may carry a debated gloss (Kengir is the type
    // case). Absent = the gloss carries the entry's overall confidence;
    // renderers add nothing.
    meaning_confidence: z.enum(['attested', 'reconstructed', 'disputed']).optional(),
    // Recorded pronunciation of the reconstructed form (a path under
    // /public/audio/). Recordings only — never synthesized speech: TTS has no
    // ground truth for these languages, and generated audio would be a
    // fabricated primary claim. audio_note names who read it and on what
    // published reconstruction, and renders beside the player.
    audio: z.string().optional(),
    audio_note: z.string().optional(),
    sources: z.array(z.object({
      citation: z.string(),
      page: z.string().optional(),
      url: z.string().optional(),
    })),
  }),
});

export const collections = { civilizations, languages, names };
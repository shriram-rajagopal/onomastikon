// 3D artifact scans attached to name entries, keyed by entry id. An entry
// listed here gets a click-to-load viewer: the attestation lives on a
// physical object, and a museum-grade scan of that object exists under a
// license that permits embedding with attribution. Nothing loads until the
// reader asks for it.
export interface Artifact {
  title: string;
  sketchfabId: string;
  credit: string;
  license: string;
  licenseUrl: string;
  modelUrl: string;
}

export const ARTIFACTS: Record<string, Artifact> = {
  'greece-demotic-wynn': {
    title: 'The Rosetta Stone',
    sketchfabId: '1e03509704a3490e99a173e53b93e282',
    credit: 'The British Museum',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    modelUrl: 'https://sketchfab.com/3d-models/the-rosetta-stone-1e03509704a3490e99a173e53b93e282',
  },
};

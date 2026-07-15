import { ENTITY_GEO, fitProjection, landPath } from './geo';

// Shared mini-locator builder: one SVG-string renderer used by the LocatorMap
// component on entity pages, the /locators/<slug>.svg static endpoint, and
// (injected inline) the homepage's hover popovers. The classes are styled
// globally in BaseLayout so the same markup reads correctly everywhere.
//
// Geometry rules mirror the transmission map's sparse-map thinking: the
// window floor widens as the subject's own extent shrinks, refits wider
// still when the clipped coastline carries too little ink to orient by
// (inland Asia), and underlays known river courses as context lines.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export function locatorSvg(civId: string): string | null {
  const geo = ENTITY_GEO[civId];
  if (!geo) return null;

  const lons = geo.points.map(([lon]) => lon);
  const lats = geo.points.map(([, lat]) => lat);
  const extent = Math.max(
    Math.max(...lons) - Math.min(...lons),
    Math.max(...lats) - Math.min(...lats)
  );
  const minLonSpan = extent < 2 ? 48 : extent < 8 ? 36 : 24;

  const pts = geo.points.map(([lon, lat]) => ({ lon, lat }));
  let proj = fitProjection(pts, minLonSpan);
  let coast = landPath(proj);
  for (const floor of [48, 60, 76]) {
    if (coast.length > 3000 || floor < minLonSpan) break;
    proj = fitProjection(pts, floor);
    coast = landPath(proj);
  }

  const projected = geo.points.map(([lon, lat]) => proj.project(lon, lat));
  const pathOf = (ps: Array<{ x: number; y: number }>, close: boolean) =>
    'M' + ps.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('L') + (close ? 'Z' : '');

  // Context rivers crossing the window, except the subject itself.
  const riverCtx = Object.values(ENTITY_GEO)
    .filter((e) => e.kind === 'river' && e.points !== geo.points)
    .map((e) => {
      const b = proj.bounds;
      const segs: string[] = [];
      let run: Array<{ x: number; y: number }> = [];
      for (const [lon, lat] of e.points) {
        if (lon >= b.lonMin && lon <= b.lonMax && lat >= b.latMin && lat <= b.latMax) {
          run.push(proj.project(lon, lat));
        } else {
          if (run.length > 1) segs.push(pathOf(run, false));
          run = [];
        }
      }
      if (run.length > 1) segs.push(pathOf(run, false));
      return segs.join('');
    })
    .filter(Boolean);

  const TRI = 6;
  const parts: string[] = [];
  parts.push(`<path class="locator-land" d="${coast}"/>`);
  for (const d of riverCtx) parts.push(`<path class="locator-river-ctx" d="${d}"/>`);
  if (geo.kind === 'region' && projected.length > 2) {
    parts.push(`<path class="locator-region" d="${pathOf(projected, true)}"/>`);
  }
  if (geo.kind === 'river' && projected.length > 1) {
    parts.push(`<path class="locator-line" d="${pathOf(projected, false)}"/>`);
  }
  if (geo.kind === 'mountains') {
    for (const p of projected) {
      parts.push(
        `<path class="locator-mtn" d="M${p.x.toFixed(1)},${(p.y - TRI * 1.3).toFixed(1)}L${(p.x - TRI).toFixed(1)},${(p.y + TRI * 0.7).toFixed(1)}L${(p.x + TRI).toFixed(1)},${(p.y + TRI * 0.7).toFixed(1)}Z"/>`
      );
    }
  }
  if (geo.kind === 'sea') {
    // The subject is the water between the coasts; an open ring at the
    // centroid says "here" without claiming land.
    const cx = projected.reduce((s, p) => s + p.x, 0) / projected.length;
    const cy = projected.reduce((s, p) => s + p.y, 0) / projected.length;
    parts.push(`<circle class="locator-ring" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11"/>`);
  }
  if ((geo.kind === 'city' || geo.kind === 'civ') && projected.length === 1) {
    const p = projected[0];
    parts.push(`<circle class="locator-halo" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="14"/>`);
    parts.push(`<circle class="locator-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="6"/>`);
  }

  return `<svg class="locator-svg" viewBox="${proj.viewBox}" role="img" aria-label="Locator map: ${esc(geo.label)}">${parts.join('')}</svg>`;
}

export function locatorLabel(civId: string): string | null {
  return ENTITY_GEO[civId]?.label ?? null;
}

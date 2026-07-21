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
  // A civilization's star means "heartland", so its preview needs enough
  // surrounding region for the star to read as a heartland within a world
  // rather than a pin on nothing: widen the floor beyond the point default.
  const minLonSpan = geo.kind === 'civ' ? 60 : extent < 2 ? 48 : extent < 8 ? 36 : 24;

  const pts = [
    ...geo.points.map(([lon, lat]) => ({ lon, lat })),
    ...(geo.rings ? geo.rings.flat(2).map(([lon, lat]) => ({ lon, lat })) : []),
  ];
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
  // A sea's hatch pattern (defined per-SVG so ids never collide when several
  // locators are inlined on one page).
  if (geo.kind === 'sea' && geo.rings) {
    parts.push(
      `<defs><pattern id="hatch-loc-${esc(civId)}" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><line class="locator-sea-hatch" x1="0" y1="0" x2="0" y2="7"/></pattern></defs>`
    );
  }
  parts.push(`<path class="locator-land" d="${coast}"/>`);
  for (const d of riverCtx) parts.push(`<path class="locator-river-ctx" d="${d}"/>`);
  if (geo.kind === 'sea' && geo.rings) {
    const d = geo.rings
      .map((poly) => poly.map((ring) => pathOf(ring.map(([lon, lat]) => proj.project(lon, lat)), true)).join(''))
      .join('');
    parts.push(`<path class="locator-sea" fill-rule="evenodd" fill="url(#hatch-loc-${esc(civId)})" d="${d}"/>`);
  }
  if (geo.kind === 'region' && projected.length > 2) {
    parts.push(`<path class="locator-region" d="${pathOf(projected, true)}"/>`);
  }
  if (geo.kind === 'range' && projected.length > 2) {
    parts.push(`<path class="locator-range" d="${pathOf(projected, true)}"/>`);
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
  if (geo.kind === 'sea' && !geo.rings) {
    // A strait or lake below the coastline data's resolution: an open ring at
    // the centroid says "here" without claiming land.
    const cx = projected.reduce((s, p) => s + p.x, 0) / projected.length;
    const cy = projected.reduce((s, p) => s + p.y, 0) / projected.length;
    parts.push(`<circle class="locator-ring" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11"/>`);
  }
  // Point marks match the big map's taxonomy: a city is a diamond, a
  // civilization a star at its heartland (scaled up for the small frame).
  if ((geo.kind === 'city' || geo.kind === 'civ') && projected.length === 1) {
    const p = projected[0];
    parts.push(`<circle class="locator-halo" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="14"/>`);
    if (geo.kind === 'city') {
      const D = 7;
      parts.push(
        `<path class="locator-city" d="M${p.x.toFixed(1)},${(p.y - D).toFixed(1)}L${(p.x + D).toFixed(1)},${p.y.toFixed(1)}L${p.x.toFixed(1)},${(p.y + D).toFixed(1)}L${(p.x - D).toFixed(1)},${p.y.toFixed(1)}Z"/>`
      );
    } else {
      const STAR: [number, number][] = [[0, -10.5], [3, -3], [10.5, 0], [3, 3], [0, 10.5], [-3, 3], [-10.5, 0], [-3, -3]];
      parts.push(
        `<path class="locator-civ" d="M${STAR.map(([dx, dy]) => `${(p.x + dx).toFixed(1)},${(p.y + dy).toFixed(1)}`).join('L')}Z"/>`
      );
    }
  }

  return `<svg class="locator-svg" viewBox="${proj.viewBox}" role="img" aria-label="Locator map: ${esc(geo.label)}">${parts.join('')}</svg>`;
}

export function locatorLabel(civId: string): string | null {
  const geo = ENTITY_GEO[civId];
  if (!geo) return null;
  // The mark's meaning rides along where it isn't self-evident: a civ's star
  // is a heartland, not a territory; a nomad's outline is a range, not a border.
  if (geo.kind === 'civ') return `${geo.label} · heartland`;
  if (geo.kind === 'range') return `${geo.label} · attested range`;
  return geo.label;
}

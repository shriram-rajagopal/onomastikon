// Turns the ENTITY_GEO locator geometry into GeoJSON for the globe's d3-geo
// renderer, and computes one representative lon/lat per entity for hover
// hit-testing and labels. The globe draws the real geometry (a river as its
// course, a region as its hull) but hovers and labels off the single point.
import { ENTITY_GEO } from './geo';
import type { EntityGeo } from './geo';

export interface AtlasFeature {
  id: string;
  geometry: GeoJSON.Geometry;
  repr: [number, number]; // representative lon/lat for hover + label
}

// d3-geo's spherical fill decides a polygon's interior from its ring winding:
// a ring wound the wrong way fills the whole sphere minus the intended area.
// d3 fills to a ring's RIGHT, so exterior rings must be CLOCKWISE (negative
// planar signed area) and holes counterclockwise. Hand-drawn hulls have
// arbitrary winding, so normalize.
const ringArea = (ring: [number, number][]): number => {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return a / 2;
};
const orient = (ring: [number, number][], wantCW: boolean): [number, number][] => {
  const isCW = ringArea(ring) < 0;
  return isCW === wantCW ? ring : [...ring].reverse();
};
const rewindPolygon = (rings: [number, number][][]): [number, number][][] =>
  rings.map((r, i) => orient(r, i === 0)); // exterior CW, holes CCW

const centroid = (pts: [number, number][]): [number, number] => {
  let x = 0;
  let y = 0;
  for (const [lon, lat] of pts) {
    x += lon;
    y += lat;
  }
  return [x / pts.length, y / pts.length];
};

function toGeoJSON(g: EntityGeo): { geometry: GeoJSON.Geometry; repr: [number, number] } {
  switch (g.kind) {
    case 'city':
    case 'civ':
      return { geometry: { type: 'Point', coordinates: g.points[0] }, repr: g.points[0] };
    case 'river':
      return {
        geometry: { type: 'LineString', coordinates: g.points },
        repr: g.points[Math.floor(g.points.length / 2)],
      };
    case 'mountains':
      return { geometry: { type: 'MultiPoint', coordinates: g.points }, repr: centroid(g.points) };
    case 'region':
    case 'range': {
      // Close the hull ring for a valid Polygon, wound CCW for d3's sphere.
      const ring = [...g.points, g.points[0]];
      return { geometry: { type: 'Polygon', coordinates: rewindPolygon([ring]) }, repr: centroid(g.points) };
    }
    case 'sea': {
      if (g.rings && g.rings.length) {
        return {
          geometry: { type: 'MultiPolygon', coordinates: g.rings.map(rewindPolygon) },
          repr: centroid(g.points),
        };
      }
      // A strait or lake with no resolved water body: a point at its centre.
      const c = centroid(g.points);
      return { geometry: { type: 'Point', coordinates: c }, repr: c };
    }
  }
}

/** Every entity that carries locator geometry, as an AtlasFeature. */
export function atlasFeatures(): AtlasFeature[] {
  const out: AtlasFeature[] = [];
  for (const [id, g] of Object.entries(ENTITY_GEO)) {
    const { geometry, repr } = toGeoJSON(g);
    out.push({ id, geometry, repr });
  }
  return out;
}

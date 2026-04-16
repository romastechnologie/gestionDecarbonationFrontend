// Utilitaire pour vérifier si un point est dans la ZEE avec Turf.js
// Placez ce fichier dans le même dossier que StreetMaps.vue
import * as turf from '@turf/turf';
import zee from './zee.json';
import type { Feature, MultiPolygon } from 'geojson';

/**
 * Vérifie si un point (lat, lng) est dans la ZEE
 * @param {number} lat
 * @param {number} lng
 * @returns {boolean}
 */
export function isPointInZEE(data) {
  const point = turf.point([data.lng, data.lat]);
  // On suppose que zee est un FeatureCollection
  for (const feature of zee.features) {
    // Cast explicite pour satisfaire TypeScript et Turf
    if (turf.booleanPointInPolygon(point, feature as Feature<MultiPolygon>)) {
      return true;
    }
  }
  return false;
}

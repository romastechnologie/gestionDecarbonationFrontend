<template>
  <div class="map-container">


    <div class="map-controls boutonFlottante mb-3" style="display: flex; flex-direction: row; align-items: center; gap: 0.5rem; flex-wrap: nowrap;">
      
      
      <Multiselect
        v-model="selectedMarkerIndex"
        :options="markerOptions"
        :searchable="true"
        :filter-results="true"
        label="label"
        mode="single"
        placeholder="Sélectionner le navire..."
        class="me-1 d-inline-block"
        style="min-width: 170px; max-width: 220px;"
      />
      <Multiselect
        v-model="selectedTypeNavire"
        :options="typeNavireOptions"
        :searchable="true"
        :filter-results="true"
        label="label"
        mode="single"
        placeholder="Sélectionner un type de navire..."
        class="me-1 d-inline-block"
        style="min-width: 200px; max-width: 220px;"
      />

      <button @click="centerMap" class="btn btn-primary btn-sm me-1" style="white-space:nowrap;">
        <i class="bi bi-crosshair"></i> Centrer la carte
      </button>
  
      <button @click="fitBounds" class="btn btn-secondary btn-sm me-1" style="white-space:nowrap;">
        <i class="bi bi-arrows-fullscreen"></i> Ajuster aux marqueurs
      </button>

      <span class="badge bg-success" style="white-space:nowrap;">
        <i class="bi bi-pin-map-fill me-1"></i>
        {{ filteredMarkers.length }} navires
      </span>
      
    </div>



      

    </div>
    
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :use-global-leaflet="false"
      style="height: 600px; width: 100%"
      @ready="onMapReady"
    >

      <l-circle
        v-if="specialCircle"
        :lat-lng="[specialCircle.lat, specialCircle.lng]"
        :radius="specialCircle.radius"
        color="#28a745"
        fill-color="#28a745"
        :fill-opacity="0.15"
      />


      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      
      <!-- Marqueurs pour chaque coordonnée -->

      <l-marker
        v-for="(marker, index) in filteredMarkers"
        :key="index"
        :lat-lng="[marker.lat, marker.lng]"
        :icon="index === selectedMarkerIndex ? createSelectedIcon() : createRedDotIcon(marker)"
      >
        <l-popup>
          <div class="popup-content">
            <h6>{{ marker.title || `Point ${index + 1}` }}</h6>
            <p v-if="marker.description" class="mb-1">{{ marker.description }}</p>
            <ul style="padding-left: 1em; margin-bottom: 0.5em; font-size: 0.95em;">
              <li v-if="marker.mmsi"><b>MMSI:</b> {{ marker.mmsi }}</li>
              <li v-if="marker.imo"><b>IMO:</b> {{ marker.imo }}</li>
              <li v-if="marker.type"><b>Type:</b> {{ marker.type }}</li>
              <li v-if="marker.speed !== undefined"><b>Vitesse:</b> {{ marker.speed }} kn</li>
              <li v-if="marker.destination"><b>Destination:</b> {{ marker.destination }}</li>
              <li v-if="marker.country_iso"><b>Pays:</b> {{ marker.country_iso }}</li>
              <li v-if="marker.eta_utc"><b>ETA (UTC):</b> {{ marker.eta_utc }}</li>
              <li v-if="marker.heading"><b>Heading:</b> {{ marker.heading }}</li>

              <!-- <li v-if="marker.last_reported_utc"><b>Dernier rapport (UTC):</b> {{ marker.last_reported_utc }}</li> -->
            </ul>
            <small class="text-muted">
              Lat: {{ marker.lat.toFixed(6) }}, Lng: {{ marker.lng.toFixed(6) }}
            </small>
          </div>
        </l-popup>
      </l-marker>
      
      
      

      <!-- Zone Économique Exclusive (ZEE) : rectangle englobant supprimé, seule la forme GeoJSON sera affichée -->

      <!-- Marqueur du centre de la ZEE -->
      <l-marker
        v-if="showZEE && zeeCenter"
        :lat-lng="[zeeCenter.lat, zeeCenter.lng]"
      >
        <l-icon
          :icon-size="[24, 24]"
          :icon-anchor="[12, 12]"
          :popup-anchor="[0, -12]"
        >
          <div class="custom-marker">
            <i class="bi bi-bullseye" style="color: #0066cc; font-size: 24px;"></i>
          </div>
        </l-icon>
        
        <l-popup>
          <div class="popup-content">
            <h6>Centre de la ZEE</h6>
            <small class="text-muted">
              Lat: {{ zeeCenter.lat.toFixed(5) }}°, Lng: {{ zeeCenter.lng.toFixed(5) }}°
            </small>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, withDefaults, defineProps, watch } from 'vue';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LIcon, LPolyline, LRectangle, LCircle } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { Field } from 'vee-validate';
import Multiselect from '@vueform/multiselect';

// Index du marqueur sélectionné (pour le multiselect)
const selectedMarkerIndex = ref<number>(-1);
const selectedTypeNavire = ref<string>('');

// Icône clignotante pour le marqueur sélectionné
// function createSelectedIcon() {
//   // Taille dynamique selon le zoom
//   const baseSize = 22;
//   const scale = Math.max(0.7, Math.min(2, zoom.value / 10));
//   const size = baseSize * scale;
//   return L.divIcon({
//     className: 'blinking-marker',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//     popupAnchor: [0, -size / 2],
//     html: `<div style="width:${size * 0.73}px;height:${size * 0.73}px;border-radius:50%;background:#32db5a;box-shadow:0 0 2px #333;"></div>`
//   });
// }
  function createSelectedIcon() {
    // Taille dynamique selon le zoom
    const baseSize = 22;
    const scale = Math.max(0.7, Math.min(2, zoom.value / 10));
    const size = baseSize * scale;
    return L.divIcon({
      className: 'blinking-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
      html: `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
        <div style="width:${size * 0.73}px;height:${size * 0.73}px;border-radius:50%;background:#32db5a;box-shadow:0 0 2px #333;"></div>
      </div>`
    });
  }

// Centrer la carte sur le marqueur sélectionné quand l'index change
watch(selectedMarkerIndex, (idx) => {
  if (props.markers && props.markers[idx]) {
    center.value = [props.markers[idx].lat, props.markers[idx].lng];
    zoom.value = 14;
  }
});

// Types
interface MarkerData {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  color?: string;
  mmsi?: string;
  imo?: string;
  type?: string;
  speed?: number;
  destination?: string;
  country_iso?: string;
  eta_utc?: string;
  last_reported_utc?: string;
  heading?: string;
}

interface ZeeBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface ZeeCenter {
  lat: number;
  lng: number;
}

// Props
interface Props {
  markers?: MarkerData[];
  initialZoom?: number;
  initialCenter?: [number, number];
  showLines?: boolean;
  lineColor?: string;
  showZEE?: boolean;
  zeeBounds?: ZeeBounds;
  zeeCenter?: ZeeCenter;
  zeeGeoJson?: any;
  specialCircle?: {
    lat: number;
    lng: number;
    radius: number; // en mètres
  };
}

const props = withDefaults(defineProps<Props>(), {
  markers: () => [],
  initialZoom: 6,
  initialCenter: () => [-18.8792, 47.5079], // Madagascar par défaut
  showLines: false,
  lineColor: '#3388ff',
  showZEE: false,
  zeeBounds: undefined,
  zeeCenter: undefined,
  zeeGeoJson: undefined
});

// État réactif
const zoom = ref(props.initialZoom);
const center = ref(props.initialCenter);
const map = ref<any>(null);
const leafletObject = ref<any>(null);
const markerOptions = ref<any[]>([]);
// Générer dynamiquement les types de navires à partir des markers
const typeNavireOptions = computed(() => {
  const types = new Set<string>();
  props.markers.forEach(m => {
    if (m.type && m.type.trim() !== '') {
      types.add(m.type);
    }
  });
  return [
    { label: 'Tous types', value: '' },
    ...Array.from(types).sort().map(type => ({ label: type, value: type }))
  ];
});

// Coordonnées calculées pour la polyline
const markerCoordinates = computed(() => {
  return props.markers.map(m => [m.lat, m.lng]);
});

// Coordonnées pour le rectangle de la ZEE
const zeeRectangleBounds = computed(() => {
  if (!props.zeeBounds) return [[0, 0], [0, 0]];
  return [
    [props.zeeBounds.minLat, props.zeeBounds.minLng], // Sud-Ouest
    [props.zeeBounds.maxLat, props.zeeBounds.maxLng]  // Nord-Est
  ];
});

// Événement quand la carte est prête
const onMapReady = (mapInstance: any) => {
  map.value = mapInstance;
  leafletObject.value = mapInstance.leafletObject || mapInstance;
  
  if (props.zeeGeoJson && props.zeeGeoJson.features && props.zeeGeoJson.features[0].geometry.type === "MultiPolygon") {
    props.zeeGeoJson.features[0].geometry.coordinates.forEach(polygon => {
      const latLngs = polygon[0].map(([lng, lat]) => [lat, lng]);
      L.polygon(latLngs, { color: "blue", weight: 2, fillOpacity: 0.05 }).addTo(leafletObject.value);
    });
  }

  // Si des marqueurs existent, ajuster la vue
  if (props.markers.length > 0) {
    setTimeout(() => fitBounds(), 100);
    // construit un objet avec label toujours défini
    markerOptions.value = props.markers.map((m, idx) => ({
      label: m.title && m.title.trim() !== '' ? m.title + ' - '+ m.mmsi : `Point ${idx + 1}`,
      value: idx,
    }));
  }
};

// Toujours synchroniser les options et l'index sélectionné avec les markers quand ils changent
watch(
  () => props.markers,
  (newMarkers) => {
    markerOptions.value = newMarkers.map((m, idx) => ({
      label: m.title && m.title.trim() !== '' ? m.title : `Point ${idx + 1}`,
      value: idx,
    }));
    selectedMarkerIndex.value = -1;
  },
  { immediate: true, deep: true }
);

// Conversion MultiPolygon GeoJSON [lng, lat] -> [lat, lng] pour Leaflet
function geoJsonMultiPolygonToLatLngs(geojson) {
  if (
    geojson &&
    geojson.features &&
    geojson.features[0] &&
    geojson.features[0].geometry &&
    geojson.features[0].geometry.type === "MultiPolygon"
  ) {
    return geojson.features[0].geometry.coordinates.map(
      polygon => polygon[0].map(([lng, lat]) => [lat, lng])
    );
  }
  return [];
}

const zeePolygonLatLngs = geoJsonMultiPolygonToLatLngs(props.zeeGeoJson);

// Centrer la carte sur le premier marqueur ou la position initiale
const centerMap = () => {
  if (props.markers.length > 0) {
    center.value = [props.markers[0].lat, props.markers[0].lng];
    zoom.value = 12;
  } else {
    center.value = props.initialCenter;
    zoom.value = props.initialZoom;
  }
};

// Ajuster la vue pour afficher tous les marqueurs
const fitBounds = () => {
  const leafletMap = leafletObject.value || map.value?.leafletObject;
  
  if (leafletMap && props.markers.length > 0) {
    const bounds = props.markers.map(m => [m.lat, m.lng]);
    try {
      leafletMap.fitBounds(bounds, { padding: [50, 50] });
    } catch (error) {
      console.warn('Erreur lors de fitBounds:', error);
    }
  }

};

// Utilitaire pour créer un vrai point rouge sans carré blanc (DivIcon)
function createRedDotIcon(marker) {
  // Taille dynamique selon le zoom
  const baseWidth = 36, baseHeight = 16;
  const scale = Math.max(0.7, Math.min(2, zoom.value / 10));
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  if (marker && marker.type === 'Special Mark - Sea Farm') {
    return L.divIcon({
      className: '',
      iconSize: [width, height],
      iconAnchor: [width / 2, height / 2],
      popupAnchor: [0, -height / 2],
      html: `<div style="width:${height}px;height:${height}px;background:#ffc107;box-shadow:0 0 2px #333;border-radius:2px;"></div>`
    });
  }
    function createRedDotIcon(marker) {
      // Taille dynamique selon le zoom
      const baseWidth = 36, baseHeight = 16;
      const scale = Math.max(0.7, Math.min(2, zoom.value / 10));
      const width = baseWidth * scale;
      const height = baseHeight * scale;
      if (marker && marker.type === 'Special Mark - Sea Farm') {
        return L.divIcon({
          className: '',
          iconSize: [width, height],
          iconAnchor: [width / 2, height / 2],
          popupAnchor: [0, -height / 2],
          html: `<div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;">
            <div style="width:${height}px;height:${height}px;background:#ffc107;box-shadow:0 0 2px #333;border-radius:2px;"></div>
          </div>`
        });
      }
      const heading = marker && typeof marker.heading !== 'undefined' ? parseInt(marker.heading, 10) - 90 : 0;
      return L.divIcon({
        className: '',
        iconSize: [width, height],
        iconAnchor: [width / 2, height / 2],
        popupAnchor: [0, -height / 2],
        html: `
          <div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;">
            <svg width="${width}" height="${height}" viewBox="0 0 36 16" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${heading}deg);display:block;">
              <polygon points="2,2 28,2 35,8 28,14 2,14" fill="#90ee90" stroke="#333" stroke-width="1" />
              <circle cx="25" cy="8" r="3" fill="#fff" stroke="#333" stroke-width="1" />
            </svg>
          </div>
        `
      });
    }
  const heading = marker && typeof marker.heading !== 'undefined' ? parseInt(marker.heading, 10) - 90 : 0;
  return L.divIcon({
    className: '',
    iconSize: [width, height],
    iconAnchor: [width / 2, height / 2],
    popupAnchor: [0, -height / 2],
    html: `
      <svg width="${width}" height="${height}" viewBox="0 0 36 16" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${heading}deg);">
        <polygon points="2,2 28,2 35,8 28,14 2,14" fill="#90ee90" stroke="#333" stroke-width="1" />
        <circle cx="25" cy="8" r="3" fill="#fff" stroke="#333" stroke-width="1" />
      </svg>
    `
  });
}
// Forcer le rafraîchissement des marqueurs à chaque changement de zoom
watch(zoom, () => {
  // Changer la valeur d'un dummy pour forcer le rendu si besoin
  // Ici, on s'appuie sur le fait que createRedDotIcon et createSelectedIcon utilisent zoom.value
});

// Marqueurs filtrés selon le type sélectionné
const filteredMarkers = computed(() => {
  if (!selectedTypeNavire.value) return props.markers;
  return props.markers.filter(m => m.type === selectedTypeNavire.value);
});

onMounted(() => {
  // Initialisation supplémentaire si nécessaire
  console.log('showZEE:', props.showZEE, 'zeeGeoJson:', props.zeeGeoJson);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  position: relative;
}

.map-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}



.popup-content {
  min-width: 150px;
}

.popup-content h6 {
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.popup-content p {
  color: #666;
  font-size: 0.9rem;
}

:deep(.leaflet-container) {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
}

/* Rotation uniquement du contenu de la carte, sans affecter les contrôles */
/* .map-container .leaflet-container {
  transform: rotate(-30deg);
  transition: transform 0.3s;
} */

/* Garder les popups lisibles (rotation inverse) */
/* .map-container :deep(.leaflet-popup) {
  transform: rotate(10deg);
} */ 

.boutonFlottante {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 1000;
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Style spécifique pour le marqueur sélectionné (clignotant) */
.blinking-marker {
  position: relative;
}

.blinking-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #007bff;
  animation: blink-animation 1.5s infinite;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.blinking-marker .blinking-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ffc107;
  box-shadow: 0 0 8px #ff9800, 0 0 2px #333;
  animation: blink 1s linear infinite;
  border: 2px solid #ff9800;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

@keyframes blink-animation {
  0%, 100% {
    transform: scale(1);
    background: #007bff;
  }
  50% {
    transform: scale(1.2);
    background: #66b3ff;
  }
}
</style>

/* eslint-disable */

<template>
  <div class="map-container">



    <div class="map-controls boutonFlottante mb-3" style="display: flex; flex-direction: row; align-items: center; gap: 0.5rem; flex-wrap: nowrap;">
      <!-- Select pour les zones de scannage -->
     

      <!-- <div style="display: flex; flex-direction: column; min-width: 320px; max-width: 400px;"> -->
        <!-- <input 
          v-model="searchNavire"
          type="text"
          class="form-control mb-1 me-1 d-inline-block"
          placeholder="Recherche navire (nom, IMO, MMSI, ENI...)"
          style="min-width: 300px; max-width: 260px; max-height: 41px;margin-bottom:-px !important;"
        /> -->

        <Multiselect
          v-model="selectedMarkerIndex"
          :options="markerOptions"
          :searchable="true"
          :filter-results="true"
          :search-filter="searchNavireFilter"
          label="label"
          mode="single"
          placeholder="Sélectionner le navire..."
          class="me-1 d-inline-block"
          style="min-width: 250px; max-width: 260px;"
        />
      <!-- </div> -->

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
      style="width: 100%; height: calc(100vh - 60px); min-height: 300px;"
      @ready="onMapReady"
    >


      <!-- Cercle de la zone de scannage sélectionnée -->
      <l-circle
        v-show="selectedZone"
        :lat-lng="selectedZone ? [selectedZone.lat, selectedZone.lng] : [0,0]"
        :radius="selectedZone ? selectedZone.radius : 0"
        color="#28a745"
        fill-color="#28a745"
        :fill-opacity="0.18"
      />

      <!-- <l-circle
        v-if="specialCircle"
        :lat-lng="[specialCircle.lat, specialCircle.lng]"
        :radius="specialCircle.radius"
        color="#28a745"
        fill-color="#28a745"
        :fill-opacity="0.15"
      /> -->


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
        <l-tooltip :options="{ permanent: false, direction: 'top' }">
          <div style="font-size: 11px; padding: 2px 4px;">
            Lat: {{ Number(marker.lat).toFixed(4) }}<br>
            Lng: {{ Number(marker.lng).toFixed(4) }}
          </div>
        </l-tooltip>
        
        <l-popup>
          <div class="popup-content" style="display: flex; flex-direction: row; align-items: flex-start; gap: 1rem;">
            
            <div v-if="marker.type !== 'Special Mark - Sea Farm'" style="flex: 1; min-width: 100px; height: 260px; display: flex; align-items: center; justify-content: center;
              background-image: url('/mer.jpg'); background-size: cover; background-position: center;">
              <img v-if="marker.type==='Fishing'" src="/navire_jaune.png" 
              alt="Navire" style="height: 40px; width: auto; object-fit: contain; transform: rotate(-90deg); display: block;" />
              <img v-else src="/navire.png" alt="Navire" style="height: 40px; width: auto; object-fit: contain; transform: rotate(-90deg); display: block;" />
            </div>
            <div v-else style="min-width: 120px; height: 290px; align-items: center; justify-content: center;
              background-image: url('/tuyau.jpg'); background-size: cover; background-position: center;">
            </div>

            <div style="flex: 1; min-width: 160px;">
              <h6>{{ marker.title || `Point ${index + 1}` }}</h6>
              <p v-if="marker.description" class="mb-1">{{ marker.description }}</p>
              <table style="border: 1">
                <tbody>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">MMSI</th>
                    <td>{{ marker.mmsi || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">IMO</th>
                    <td>{{ marker.imo || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">Type</th>
                    <td>{{ marker.type || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">Vitesse</th>
                    <td>{{ marker.speed !== undefined ? marker.speed + ' kn' : 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">Destination</th>
                    <td>{{ marker.destination || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">Pays</th>
                    <td>{{ marker.country_iso || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">ETA (UTC)</th>
                    <td>{{ marker.eta_utc || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;">Heading</th>
                    <td>{{ marker.heading || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <th style="min-width: 70px;font-size: 12px;"> Est dans la ZEE </th>
                    <td>
                      <span v-if="isInZEE(marker)" style="color:green;"> Oui</span>
                      <span v-else style="color:red;"> Non</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <small class="text-muted">
                <template v-if="marker.lat !== undefined && marker.lng !== undefined">
                  Lat: {{ Number(marker.lat).toFixed(6) }}, Lng: {{ Number(marker.lng).toFixed(6) }}
                </template>
                <template v-else>
                  Coordonnées non disponibles
                </template>
              </small>
            </div>
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

// Recherche multi-critères navire
const searchNavire = ref('');

// import { ref, computed, onMounted, onUnmounted, withDefaults, defineProps, watch } from 'vue';
// Fonction de filtre personnalisée pour le Multiselect navires

import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LIcon, LPolyline, LRectangle, LCircle, LTooltip } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { Field } from 'vee-validate';
import Multiselect from '@vueform/multiselect';

// Import de la fonction utilitaire
import { isPointInZEE } from './isPointInZEE';

// import { defineEmits } from 'vue';
import ApiService from '@/services/ApiService';
// eslint-disable-next-line no-undef
const emit = defineEmits(['zone-changed']);
// eslint-disable-next-line no-undef
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

// Index du marqueur sélectionné (pour le multiselect)
const selectedMarkerIndex = ref<number>(-1);
const selectedTypeNavire = ref<string>('');

//######################################
// Index de la zone de scannage sélectionnée (par défaut: 0 si zonesScannage existe)
const selectedZoneIndex = ref<number>((props.zonesScannage && props.zonesScannage.length > 0) ? 0 : -1);
// Options pour le select des zones de scannage
const zoneOptions = computed(() => {
  if (!props.zonesScannage || props.zonesScannage.length === 0) return [];
  return props.zonesScannage.map((z, idx) => ({
    label: `Zone ${idx + 1} (lat: ${z.lat}, lng: ${z.lng})`,
    value: idx
  }));
});


// Fonction pour vérifier si un point est dans la ZEE
function isInZEE(marker) {
  try {

    // enregistrement du navire
    // if(isPointInZEE(marker)){
    //   ApiService.post('/vessels', { marker})
    //   .then((data) => {
    //     console.log('Navire enregistré avec succès.');
    //   }).catch((error) => {
    //     console.error('Erreur lors de l\'enregistrement du navire:', error);
    //   });
    // }

    return isPointInZEE(marker);
  } catch (e) {
    return false;
  }
}

// Watch pour sélectionner automatiquement la première zone si la prop change
watch(
  () => props.zonesScannage,
  (zones) => {
    if (zones && zones.length > 0) {
      selectedZoneIndex.value = 0;
    } else {
      selectedZoneIndex.value = -1;
    }
  },
  { immediate: true }
);

// Emit au parent à chaque changement de zone sélectionnée
watch(selectedZoneIndex, (newIndex) => {
  if (props.zonesScannage && props.zonesScannage[newIndex]) {
    emit('zone-changed', props.zonesScannage[newIndex]);
  }
});

// Zone sélectionnée
const selectedZone = computed(() => {
  if (!props.zonesScannage || selectedZoneIndex.value < 0) return null;
  return props.zonesScannage[selectedZoneIndex.value];
});

//#####################################"


// --- Ajout : gestion des navires dynamiques ---


const dynamicMarkers = ref<any[]>([]);
let intervalId: any = null;


async function fetchNaviresPositions() {
  console.log("Fetching vessels positions...");
  ApiService.get('/vessels/positions')
    .then((response) => {
      if (response && Array.isArray(response.data)) {
        console.log("Navires récupérés:", response.data.length);
        // dynamicMarkers.value = response.data;
      } else {
        console.log("Aucun navire récupéré");
        // dynamicMarkers.value = [];
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des positions des navires:', error);
      dynamicMarkers.value = [];
    });

  // console.log("Nous sommes là", props.markers.length);
  // const promises = props.markers.map(async (marker) => {
  //   if (!marker.mmsi) return marker;
  //   try {
  //     const data = await ApiService.get(`/vesselpro/${marker.mmsi}`);
  //     // Fusionne les données API avec le marqueur original
  //     return { ...marker, ...data };
  //   } catch (error) {
  //     console.log("Erreur Datalastic:", error);
  //     return marker;
  //   }
  // });
  // const results = await Promise.all(promises);
  // dynamicMarkers.value = results;
}

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

function searchNavireFilter(options, search) {
  if (!Array.isArray(options)) return options;
  if (!search || search.trim() === '') return options;
  const q = search.trim().toLowerCase();
  return options.filter(opt => {
    // On récupère l'index du navire
    const idx = typeof opt.value === 'number' ? opt.value : -1;
    const marker = (filteredMarkers.value && filteredMarkers.value[idx]) ? filteredMarkers.value[idx] : null;
    if (!marker) return false;
    return [marker.title, marker.mmsi, marker.imo, marker.eni, marker.type]
      .filter(v => v !== undefined && v !== null)
      .some(v => String(v).toLowerCase().includes(q));
  });
}

// Centrer la carte sur le marqueur sélectionné quand l'index change
watch(selectedMarkerIndex, (idx) => {
  if (
    filteredMarkers.value &&
    filteredMarkers.value[idx] &&
    typeof filteredMarkers.value[idx].lat === 'number' &&
    typeof filteredMarkers.value[idx].lng === 'number'
  ) {
    const latLng: [number, number] = [filteredMarkers.value[idx].lat, filteredMarkers.value[idx].lng];
    zoom.value = 14;
    center.value = latLng;
    if (leafletObject.value && typeof leafletObject.value.panTo === 'function') {
      leafletObject.value.panTo(latLng);
    }
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
  zonesScannage?: {
    lat: number;
    lng: number;
    radius: number; // en mètres
  }[];
}



// État réactif
const zoom = ref(props.initialZoom);
const center = ref<[number, number]>([
  Array.isArray(props.initialCenter) && props.initialCenter.length === 2
    ? props.initialCenter[0]
    : -18.8792,
  Array.isArray(props.initialCenter) && props.initialCenter.length === 2
    ? props.initialCenter[1]
    : 47.5079
]);
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
  const baseMarkers = dynamicMarkers.value.length > 0 ? dynamicMarkers.value : props.markers;
  return baseMarkers.map(m => [m.lat, m.lng]);
});

// Coordonnées pour le rectangle de la ZEE
// const zeeRectangleBounds = computed(() => {
//   if (!props.zeeBounds) return [[0, 0], [0, 0]];
//   return [
//     [props.zeeBounds.minLat, props.zeeBounds.minLng], // Sud-Ouest
//     [props.zeeBounds.maxLat, props.zeeBounds.maxLng]  // Nord-Est
//   ];
// });

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
    // fetchNaviresPositions();
  },
  { immediate: true, deep: true }
);



// const zeePolygonLatLngs = geoJsonMultiPolygonToLatLngs(props.zeeGeoJson);

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
  const baseMarkers = dynamicMarkers.value.length > 0 ? dynamicMarkers.value : props.markers;
  if (leafletMap && baseMarkers.length > 0) {
    const bounds = baseMarkers.map(m => [m.lat, m.lng]);
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
  const baseWidth = 36, 
  baseHeight = 16;
  const scale = Math.max(0.7, Math.min(2, zoom.value / 10));
  // const scale = Math.max(0.7, zoom.value / 10);
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  switch (true) {
    case !!marker && marker.type === 'Special Mark - Sea Farm': {
      // Plus petit et rouge
      const small = Math.min(width, height) * 0.6;
      return L.divIcon({
        className: '',
        iconSize: [small, small],
        iconAnchor: [small / 2, small / 2],
        popupAnchor: [0, -small / 2],
        html: `<div style="width:${small}px;height:${small}px;display:flex;align-items:center;justify-content:center;">
          <div style="width:${small * 0.8}px;height:${small * 0.8}px;background:#dc3545;box-shadow:0 0 1px #333;"></div>
        </div>`
      });
    }
    case !!marker && marker.type === 'Fishing': {
      // Plus petit et rouge
      const small = Math.min(width, height) * 0.6;
        const heading = marker && typeof marker.heading !== 'undefined' ? parseInt(marker.heading, 10) - 90 : 0;
      return L.divIcon({
        className: '',
        iconSize: [small, small],
        iconAnchor: [small / 2, small / 2],
        popupAnchor: [0, -small / 2],
        html: `
        <div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;">
          <svg width="${width}" height="${height}" viewBox="0 0 36 16" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${heading}deg);display:block;">
            <polygon points="2,2 28,2 35,8 28,14 2,14" fill="#fcd703" stroke="#333" stroke-width="1" />
            <circle cx="25" cy="8" r="3" fill="#fff" stroke="#333" stroke-width="1" />
          </svg>
        </div>
        `
        // html: `
        //   <div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;padding:0;">
        //     <img src="/navire_jaune.png" alt="Navire" style="width:${width * 0.95}px;height:${height * 0.95}px;object-fit:contain;transform: rotate(${heading}deg);display:block;" />
        //   </div>
        // `
      });
    }
    // Ajoutez d'autres cas ici si besoin
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
    // html: `
    //   <div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;padding:0;">
    //     <img src="/navire.png" alt="Navire" style="width:${width * 0.95}px;height:${height * 0.95}px;object-fit:contain;transform: rotate(${heading}deg);display:block;" />
    //   </div>
    // `
  });
}



// Forcer le rafraîchissement des marqueurs à chaque changement de zoom
watch(zoom, () => {
  console.log("Zoom changed, refreshing markers.", zoom.value);
  // Changer la valeur d'un dummy pour forcer le rendu si besoin
  // Ici, on s'appuie sur le fait que createRedDotIcon et createSelectedIcon utilisent zoom.value
});
// Réinitialise l'index sélectionné si le filtre exclut l'élément sélectionné

// Marqueurs filtrés selon le type sélectionné
const filteredMarkers = computed(() => {
  const baseMarkers = dynamicMarkers.value.length > 0 ? dynamicMarkers.value : props.markers;
  // Filter out markers with invalid lat/lng
  const validMarkers = baseMarkers.filter(m => m && m.lat !== undefined && m.lng !== undefined);
  if (!selectedTypeNavire.value) return validMarkers;
  return validMarkers.filter(m => m.type === selectedTypeNavire.value);
});

// Marqueurs filtrés selon le type sélectionné
// const filteredMarkers = computed(() => {
//   const baseMarkers = dynamicMarkers.value.length > 0 ? dynamicMarkers.value : props.markers;
//   // Filter out markers with invalid lat/lng
//   let validMarkers = baseMarkers.filter(m => m && m.lat !== undefined && m.lng !== undefined);
//   // Filtre par type
//   if (selectedTypeNavire.value) {
//     validMarkers = validMarkers.filter(m => m.type === selectedTypeNavire.value);
//   }
//   // Filtre multi-critères texte
//   if (searchNavire.value && searchNavire.value.trim() !== '') {
//     const q = searchNavire.value.trim().toLowerCase();
//     validMarkers = validMarkers.filter(m => {
//       return (
//         (m.title && m.title.toLowerCase().includes(q)) ||
//         (m.mmsi && String(m.mmsi).toLowerCase().includes(q)) ||
//         (m.imo && String(m.imo).toLowerCase().includes(q)) ||
//         (typeof m.eni !== 'undefined' && m.eni !== null && String(m.eni).toLowerCase().includes(q)) ||
//         (m.type && m.type.toLowerCase().includes(q))
//       );
//     });
//   }
//   return validMarkers;
// });

// watch(filteredMarkers, (newMarkers) => {
//   if (
//     selectedMarkerIndex.value >= newMarkers.length ||
//     selectedMarkerIndex.value < 0 ||
//     !newMarkers[selectedMarkerIndex.value]
//   ) {
//     selectedMarkerIndex.value = -1;
//   }
// });

onMounted(() => {
  // Initialisation supplémentaire si nécessaire
  console.log('showZEE:', props.showZEE, 'zeeGeoJson:', props.zeeGeoJson);
  // fetchNaviresPositions();
  intervalId = setInterval(fetchNaviresPositions, 30000); // toutes les 30s
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  position: relative;
  /* height: 100dvh; */
  /* min-height: 300px; */
  display: flex;
  flex-direction: column;
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

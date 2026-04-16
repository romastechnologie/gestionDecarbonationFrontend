<template>
  <div class="row">
    <div class="col-12 p-0">
      <div class="card border-0 rounded-0 mb-0">
        <div class="card-body p-0">
          <div class="card-head box-shadow bg-white p-3">
            <div class="d-lg-flex align-items-center justify-content-between mb-3">
             

            <!-- Liste des positions -->
            <!-- <div v-if="mapMarkers.length > 0" class="mb-3">
              <h6 class="text-muted small mb-2">POSITIONS ENREGISTRÉES</h6>
              <div class="d-flex flex-wrap gap-2">
                <div 
                  v-for="(marker, index) in mapMarkers" 
                  :key="index"
                  class="badge bg-light text-dark border d-flex align-items-center gap-2 p-2"
                >
                  <i class="bi bi-geo-alt-fill" :style="{ color: marker.color, fontSize: '16px' }"></i>
                  <div class="text-start">
                    <div class="fw-bold" style="font-size: 0.85rem;">{{ marker.title }}</div>
                    <small class="text-muted" style="font-size: 0.75rem;">
                      {{ marker.lat.toFixed(4) }}, {{ marker.lng.toFixed(4) }}
                    </small>
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <!-- Composant de carte -->
          <div class="map-wrapper" :class="{ 'fullscreen-map': isFullscreen }" ref="mapContainer">
            <!-- En-tête en plein écran -->
            <div v-if="isFullscreen" class="fullscreen-header p-3 bg-white border-bottom">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h5 class="mb-0">
                    <i class="bi bi-geo-alt-fill text-success me-2"></i>
                    {{ manifest?.navireNom }} - Port de Lomé
                  </h5>
                </div>
                <button 
                  @click="toggleFullscreen" 
                  class="btn btn-danger btn-sm"
                >
                  <i class="bi bi-x-lg me-1"></i>
                  Fermer plein écran
                </button>
              </div>
            </div>
            <!-- :special-circle="{ lat: 6.1366, lng: 1.2222, radius: 18520 }" -->
            <Maps 
              :show-lines="showLines"
              :zee-bounds="zeeBounds"
              :initial-zoom="13"
              :initial-center="[6.076841, 1.302920]"
              :show-z-e-e="showZEE"
              :zee-geo-json="zeeGeoJson"
              :markers="markers"
              :zones-scannage="zonesScannage"
              line-color="#198754"
              :style="{ height: isFullscreen ? '100vh' : '600px' }"
              @zone-changed="onZoneChanged"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_Date } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";
import { Manifest } from "@/models/Manifest";
import Maps from "./StreetMaps.vue";
import zeeGeoJson from '@/components/Dashboard/Ecommerce/zee.json';

export default defineComponent({
  name: "ManifestMap",
  components: {
    Maps
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const manifest = ref<Manifest | null>(null);
    const showLines = ref(true);
    const showZEE = ref(true);
    const isFullscreen = ref(false);
    const mapContainer = ref<HTMLElement | null>(null);

  

    const zeeBounds = {
      minLat: 1.033,  // Min Latitude
      maxLat: 6.202,  // Max Latitude
      minLng: 1.033,  // Min Longitude
      maxLng: 5.800   // Max Longitude
    };

    const zeeCenter = {
      lat: 4.63949,
      lng: 1.82135
    };

  

    // const markers = computed(() => {
    //   return [
    //     ...vessels.value.map(v => ({
    //       lat: v.lat,
    //       lng: v.lon,
    //       title: v.name,
    //       description: v.type_specific || v.type,
    //       color: '#007bff',
    //       name: v.name,
    //       mmsi: v.mmsi,
    //       imo: v.imo,
    //       type: v.type,
    //       destination: v.destination,
    //       speed: v.speed,
    //       country_iso: v.country_iso,
    //       eta_utc: v.eta_utc,
    //       heading: v.heading
    //     })),
    //     // specialPoint
    //   ];
    // });

    // const markers = computed(() => {
    //   return [
    //     ...vesselsFromDatabase.value.map(v => ({
    //       lat: v.voyages[0]?.trackings[0]?.latitude,
    //       lng: v.voyages[0]?.trackings[0]?.longitude,
    //       title: v.name,
    //       description: v.type_specific || v.type,
    //       color: '#007bff',
    //       name: v.name,
    //       mmsi: v.mmsi,
    //       imo: v.imo,
    //       type: v.type,
    //       destination: v.destination,
    //       speed: v.speed,
    //       country_iso: v.country_iso,
    //       eta_utc: v.eta_utc,
    //       heading: v.voyages[0]?.trackings[0]?.heading
    //     })),
    //     // specialPoint
    //   ];
    // });

    const markers = computed(() => {
      return [
        ...vessels.value.map(v => ({
          lat: v.lat,
          lng: v.lon,
          title: v.name,
          description: v.type_specific || v.type,
          color: '#007bff',
          name: v.name,
          mmsi: v.mmsi,
          imo: v.imo,
          type: v.type,
          destination: v.destination,
          speed: v.speed,
          country_iso: v.country_iso,
          eta_utc: v.eta_utc,
          heading: v.heading
        })),
        // specialPoint
      ];
    });

    console.log("mon marqueurs", markers);


    const goBack = () => {
      router.back();
    };

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
      if (isFullscreen.value && mapContainer.value) {
        if (mapContainer.value.requestFullscreen) {
          mapContainer.value.requestFullscreen();
        }
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };


    // --- Ajout : récupération des vessels et mapping markers ---
    const vessels = ref<any[]>([]);
    const vesselsFromDatabase = ref<any[]>([]); 



    async function fetchVessels(lon, lat) {
      try {

        ApiService.get(`/vessels/positions`)
        // ApiService.get(`/vessels/datalastic`)
        .then((response) => {
          console.log("la liste des m", response.data.data);
          vesselsFromDatabase.value = response.data.data;
          // console.log("Vessels from DB:", response.data.data.data.vessels);
          // console.log("Vessels from DB:", vesselsFromDatabase.value[0].voyages[0]?.trackings[0]?.latitude);
        })
        .catch((err) => {
          error("Erreur lors de la récupération du manifeste : " + err);
        });



        console.log('Fetching vessels for coordinates:', lat, lon);
        const dateDebut = new Date().toISOString().split('T')[0];
        const dateFin = new Date().toISOString().split('T')[0];
        const url = `https://api.datalastic.com/api/v0/vessel_inradius?api-key=ce33d62e-1614-4c58-93c1-4009bd1cab4f&from=${dateDebut}&to=${dateFin}&lat=${lat}&lon=${lon}&radius=50`;
        // const url = `https://api.datalastic.com/api/v0/vessel_inradius?api-key=3acd2fe6-7428-4e9a-9dd5-44cc6c4fe798&from=${dateDebut}&to=${dateFin}&lat=-25.061581&lon=46.965078&radius=50`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("voici les donnes", data.data.vessels);
        if (data && data.data && Array.isArray(data.data.vessels)) {
          vessels.value = data.data.vessels;
          console.log('Vessels fetched:', vessels.value.length);
        } else {
          vessels.value = [];
        }
      } catch (e) {
        vessels.value = [];
        console.error('Erreur lors de la récupération des vessels:', e);
      }
    }

    // Nouvelle fonction pour initialiser la carte (appelée au montage et lors du changement de zone)
    function initMap(zone = null) {
      let targetZone = zone || zonesScannage[0];
      fetchVessels(targetZone.lng, targetZone.lat);
      // L'écouteur fullscreen ne doit être ajouté qu'une fois
      if (!initMap.fullscreenListenerAdded) {
        document.addEventListener('fullscreenchange', () => {
          if (!document.fullscreenElement) {
            isFullscreen.value = false;
          }
        });
        initMap.fullscreenListenerAdded = true;
      }
    }
    initMap.fullscreenListenerAdded = false;

    // Handler pour le changement de zone
    function onZoneChanged(zone) {
      // zone = { lat, lng, radius }
      initMap(zone);
    }

    // zone de scannage
    const zonesScannage = [
      { lat: 5.507541, lng: 1.627627, radius: 92600 },
      { lat: 4.248415, lng: 1.869447, radius: 92600 },
      { lat: 2.811496, lng: 2.352628, radius: 92600 }
    ]

    onMounted(() => {
      initMap();
    });

    return {
      manifest,
      // mapMarkers,
      markers,
      showLines,
      showZEE,
      zeeBounds,
      zeeCenter,
      goBack,
      format_Date,
      isFullscreen,
      toggleFullscreen,
      mapContainer,
      zeeGeoJson,
      zonesScannage,
      fetchVessels,
      onZoneChanged
    };
  },
});
</script>


<style scoped>
  .badge {
    font-weight: normal;
  }

  .card-head {
    border-radius: 8px;
  }


  .map-wrapper {
    width: 100%;
    transition: all 0.3s ease;
  }

  .fullscreen-map {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: white;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .fullscreen-header {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    flex-shrink: 0;
  }

  .fullscreen-map :deep(.leaflet-container) {
    flex: 1;
    height: 100% !important;
  }

  .p-0 {
    padding: 0 !important;
  }
</style>

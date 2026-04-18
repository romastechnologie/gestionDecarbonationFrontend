<template>
  <div class="row">

    <div class="col-12 d-flex p-0">

      <div class="col-md-7">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
            <div class="card-body d-flex align-items-center" 
              style="background-image: url('./assets/images/img_princ.png'); background-size: contain; background-repeat: no-repeat; background-position: right center; min-height: 190px; width: 100%; position: relative;">
              <div style="flex:1">
                <div class="d-flex align-items-center mb-2">
                  <h5 class="mb-0">Heureux de vous revoir !</h5>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
          <div class="card-body p-0">
            <div class="mb-0 p-3">
              <h5 class="mb-0">Certificats délivrés par mois</h5>
            </div>
            <apexchart
              type="bar"
              height="120"
              :options="certificatChartOptions"
              :series="certificatChartSeries"
            />
          </div>
        </div>
      </div>

    </div>


    <div class="col-12 d-flex p-0">

      <div class="col-md-3">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
          <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <i class="ph ph-leaf fs-30 text-success me-2"></i>
                <h5 class="mb-0">Crédit généré</h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0 me-3 text-success">22</h3>
                <h6 class="mb-0">Contrat</h6>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
          <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <i class="ph ph-certificate fs-30 text-primary me-2"></i>
                <h5 class="mb-0">Certificats émis</h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0 me-2 text-success">56</h3>
                <h6 class="mb-0">Certificats</h6>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
          <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <i class="ph ph-currency-dollar fs-30 text-success me-2"></i>
                <h5 class="mb-0">Revenu générer</h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0 me-2 text-success">15.000.000</h3>
                <h6 class="mb-0">Cette année</h6>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 rounded-2 mb-0 shadow-sm m-3">
          <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <i class="ph ph-leaf fs-30 text-success me-2"></i>
                <h5 class="mb-0">Émissions de CO2</h5>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0 me-2 text-success">1000</h3>
                <h6 class="mb-0">Tonne de CO2</h6>
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
import ApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "ManifestMap",
  components: {
    apexchart: ApexCharts,
    // Maps
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const manifest = ref<Manifest | null>(null);
    const showLines = ref(true);
    const showZEE = ref(true);
    const isFullscreen = ref(false);
    const mapContainer = ref<HTMLElement | null>(null);

  

   

  

   



    const goBack = () => {
      router.back();
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

   
    

    // onMounted(() => {
    //   initMap();
    // });

    // Données fictives pour le graphe des certificats
    const certificatChartSeries = ref([
      {
        name: "Certificats",
        data: [12, 18, 10, 22, 15, 25, 20, 18, 24, 30, 28, 35],
      },
    ]);
    const certificatChartOptions = ref({
      chart: {
        type: "bar",
        height: 220,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
        ],
        labels: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "13px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "13px",
          },
        },
      },
      colors: ["#4ad295"],
      grid: {
        show: true,
        borderColor: "#e9ecef",
        strokeDashArray: 4,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val} certificats`,
        },
      },
    });

    return {
      manifest,
      goBack,
      format_Date,
      isFullscreen,
      mapContainer,
      zeeGeoJson,
      fetchVessels,
      certificatChartSeries,
      certificatChartOptions,
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

<template>
  <div class="row">
    <!-- Loader -->
    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="col-12">
      <div class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ error }}
      </div>
    </div>

    <!-- KPI Cards -->
    <template v-if="!loading && !error && dashboardData">
      <!-- DMPPN -->
      <div class="col-xl-6 col-lg-6 col-xxxl-4 col-sm-6" v-if="dmppnKpi">
        <router-link class="text-decoration-none" :to="dmppnKpi.url">
          <div class="card mb-25 border-0 rounded-0 bg-white expected-earnings-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <span class="d-block mb-6 fs-13 text-uppercase fw-medium text-dark-emphasis">
                {{ dmppnKpi.titre }}
              </span>
              <h4 class="fw-black mb-12 lh-1">
                {{ formatNumber(dmppnKpi.valeur) }} {{ dmppnKpi.unite }}
                <span class="fw-bold text-badge d-inline-block mb-10"
                  :class="'badge ' + getBadgeClass(dmppnKpi.niveau_performance.niveau)">
                  {{ dmppnKpi.niveau_performance.niveau }}
                  <i class="flaticon-star fs-11 lh-1 position-relative top-1 ms-1"></i>
                </span>
              </h4>
              <ul class="ps-0 mb-0 list-unstyled mt-15">
                <li class="text-muted position-relative fw-medium d-flex align-items-center">
                  <span class="badge bg-danger rounded-circle p-1 me-2" style="width: 10px; height: 10px;"></span>
                  Delai Maximum: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppnKpi.maximum) }} jours</span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="badge bg-info rounded-circle p-1 me-2" style="width: 10px; height: 10px;"></span>
                  Delai Moyen: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppnKpi.moyenne) }} jours</span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="badge bg-success rounded-circle p-1 me-2" style="width: 10px; height: 10px;"></span>
                  Delai Minimum: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppnKpi.minimum) }} jours</span>
                </li>
              </ul>
              <div id="dmppnChart" class="chart">
                <apexchart type="radialBar" height="220" :options="dmppnChart" :series="dmppnSeries"></apexchart>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- DMPPM -->
      <div class="col-xl-6 col-lg-6 col-xxxl-4 col-sm-6" v-if="dmppmKpi">
        <router-link class="text-decoration-none" :to="dmppmKpi.url">
          <div class="card mb-25 border-0 rounded-0 bg-white expected-earnings-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <span class="d-block mb-6 fs-13 text-uppercase fw-medium text-dark-emphasis">
                {{ dmppmKpi.titre }}
              </span>
              <h4 class="fw-black mb-12 lh-1">
                {{ formatNumber(dmppmKpi.valeur) }} {{ dmppmKpi.unite }}
                <span class="fw-bold text-badge d-inline-block mb-10"
                  :class="'badge ' + getBadgeClass(dmppmKpi.niveau_performance.niveau)">
                  {{ dmppmKpi.niveau_performance.niveau }}
                  <i class="flaticon-star fs-11 lh-1 position-relative top-1 ms-1"></i>
                </span>
              </h4>
              <ul class=" ps-0 mb-0 list-unstyled mt-15">
                <li class="text-muted position-relative fw-medium d-flex align-items-center">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #88006DFF;"></span>
                  Delai Minimum: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppmKpi.minimum) }} jours</span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #D4F900FF;"></span>
                  Delai Moyen: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppmKpi.moyenne) }} jours</span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #04340EFF;"></span>
                  Delai Maximum: <span class="text-black fw-bold ms-1">{{ formatNumber(dmppmKpi.maximum) }} jours</span>
                </li>
              </ul>
              <div id="dmppmChart" class="chart">
                <apexchart type="donut" height="180" :options="dmppmChart" :series="dmppmSeries"></apexchart>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- CMPPM -->
      <div class="col-xl-6 col-lg-6 col-xxxl-4 col-sm-6" v-if="cmppmKpi">
        <router-link class="text-decoration-none" :to="cmppmKpi.url">
          <div class="card mb-25 border-0 rounded-0 bg-white expected-earnings-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <span class="d-block mb-6 fs-13 text-uppercase fw-medium text-dark-emphasis">
                {{ cmppmKpi.titre }}
              </span>
              <h4 class="fw-black mb-12 lh-1">
                {{ formatCurrency(cmppmKpi.valeur) }}
                <span class="fw-bold text-badge d-inline-block mb-10"
                  :class="'badge ' + getBadgeClass(cmppmKpi.niveau_performance.niveau)">
                  {{ cmppmKpi.niveau_performance.niveau }}
                  <i class="flaticon-star fs-11 lh-1 position-relative top-1 ms-1"></i>
                </span>
              </h4>
              <ul class=" ps-0 mb-0 list-unstyled mt-15">
                <li class="text-muted position-relative fw-medium d-flex align-items-center">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #BD0000FF;"></span>
                  Coût Minimum: <span class="text-black fw-bold ms-1">{{ formatCurrency(cmppmKpi.minimum) }} </span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #D97A05FF;"></span>
                  Coût Moyen: <span class="text-black fw-bold ms-1">{{ formatCurrency(cmppmKpi.moyenne) }} </span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #6FD3F7;"></span>
                  Coût Maximum: <span class="text-black fw-bold ms-1">{{ formatCurrency(cmppmKpi.maximum) }} </span>
                </li>
              </ul>
              <div id="cmppmChart" class="chart">
                <apexchart type="pie" height="180" :options="cmppmChart" :series="cmppmSeries"></apexchart>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- CRME -->
      <div class="col-xl-6 col-lg-6 col-xxxl-4 col-sm-6" v-if="crmeKpi">
        <router-link class="text-decoration-none" :to="crmeKpi.url">
          <div class="card mb-25 border-0 rounded-0 bg-white expected-earnings-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <span class="d-block mb-6 fs-13 text-uppercase fw-medium text-dark-emphasis">
                {{ crmeKpi.titre }}
              </span>
              <h4 class="fw-black mb-12 lh-1">
                {{ formatCurrency(crmeKpi.valeur) }}
                <span class="fw-bold text-badge d-inline-block mb-10"
                  :class="'badge ' + getBadgeClass(crmeKpi.niveau_performance.niveau)">
                  {{ crmeKpi.niveau_performance.niveau }}
                  <i class="flaticon-star fs-11 lh-1 position-relative top-1 ms-1"></i>
                </span>
              </h4>
              <ul class=" ps-0 mb-0 list-unstyled mt-15">
                <li class="text-muted position-relative fw-medium d-flex align-items-center">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #070376FF;"></span>
                  Coût Minimum: <span class="text-black fw-bold ms-1">{{ formatCurrency(crmeKpi.minimum) }} </span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #0dcaf0;"></span>
                  Coût Moyen: <span class="text-black fw-bold ms-1">{{ formatCurrency(crmeKpi.moyenne) }} </span>
                </li>
                <li class="text-muted position-relative fw-medium d-flex align-items-center mt-2">
                  <span class="rounded-circle p-1 me-2" style="width: 10px; height: 10px; background-color: #ffc107;"></span>
                  Coût Maximum: <span class="text-black fw-bold ms-1">{{ formatCurrency(crmeKpi.maximum) }} </span>
                </li>
              </ul>
              <div id="crmeChart" class="chart">
                <apexchart type="radialBar" height="200" :options="crmeChart" :series="crmeSeries"></apexchart>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
  <div class="card mb-25 border-0 rounded-0 bg-white sales-pos-location-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div class="mb-15 mb-sm-0 d-sm-flex align-items-center justify-content-between">
        <div class="title">
          <span class="fw-medium text-muted fs-13 d-block mb-5 text-uppercase">
            Navires opérant sans licence, suspectés de non-conformité et AIS Off
          </span>
        </div>
        <div class="card-select mt-10 mt-sm-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5">
          <span class="fw-medium text-muted me-8">Sélectionner</span>
          <select 
            v-model="selectedPeriode"
            @change="changePeriode"
            class="form-select shadow-none text-black border-0 ps-0 pt-0 pb-0 pe-20 fs-14 fw-medium"
            :disabled="loadingNavires">
            <option value="semaine" class="fw-medium">Par semaine</option>
            <option value="mois" class="fw-medium">Ce mois-ci</option>
            <option value="annee" class="fw-medium" selected>Cette année</option>
          </select>
        </div>
      </div>
      
      <!-- Loader pour le graphique -->
      <div v-if="loadingNavires" class="text-center py-5">
        <div class="spinner-border text-primary spinner-border-sm" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
      
      <div v-else id="weeklySalesChart" class="chart">
        <apexchart type="area" height="375" :options="weeklySalesChart" :series="sales"></apexchart>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";

interface NiveauPerformance {
  niveau: string;
  couleur: string;
  score: number;
}

interface KpiData {
  code: string;
  titre: string;
  valeur: number;
  unite: string;
  minimum: number;
  maximum: number;
  moyenne: number;
  nombre_passages: number;
  niveau_performance: NiveauPerformance;
  url: string;
}

interface DashboardOverview {
  periode: {
    debut: string;
    fin: string;
  };
  kpis: KpiData[];
  statistiques_globales: {
    total_passages_navires: number;
    total_mouvements_marchandises: number;
    total_couts_marchandises: number;
  };
}

interface NaviresSuspectsData {
  periode: string;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export default defineComponent({
  name: "WeeklySales",
  setup() {
    const dashboardData = ref<DashboardOverview | null>(null);
    const naviresData = ref<NaviresSuspectsData | null>(null);
    const loading = ref(false);
    const loadingNavires = ref(false);
    const error = ref("");

    // Computed pour les données des navires suspects
    const sales = computed(() => {
      if (!naviresData.value || !naviresData.value.series) {
        return [
          { name: "AIS Off", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: "Suspects", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: "Sans Licence", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        ];
      }
      return naviresData.value.series;
    });

    // Computed pour les catégories (mois) dynamiques
    const weeklySalesChart = computed(() => ({
      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#dc3545", "#ffc107", "#070376FF"], // Rouge (AIS Off), Jaune (Suspects), Bleu (Sans Licence)
      legend: {
        position: "top",
        fontSize: "14px",
        fontWeight: 500,
        horizontalAlign: "center",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#8E8DA1",
        },
        markers: {
          offsetY: -1,
          offsetX: -4,
          height: 15,
          width: 15,
        },
        itemMargin: {
          horizontal: 10,
        },
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#d9e9ef",
      },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
        y: {
          formatter: function (val: number) {
            return val + " Navire(s)";
          },
        },
      },
      xaxis: {
        categories: naviresData.value?.categories || ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        labels: {
          show: true,
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        tooltip: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#2b2a3f",
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: ["#9C9AB6"],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
    }));

    const expected = ref([50, 35, 45]);

    const expectedEraningsChart = ref({
      chart: {
        height: 150,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#080072FF", "#107A02FF", "#0777A0FF"],
      legend: {
        show: false,
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#9C9AB6",
        },
        markers: {
          offsetX: -2,
          offsetY: 1,
        },
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
    });

    const expectedEraningsChart1 = ref({
      chart: {
        height: 150,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#BD0000FF", "#D97A05FF", "#6FD3F7"],
      legend: {
        show: false,
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#9C9AB6",
        },
        markers: {
          offsetX: -2,
          offsetY: 1,
        },
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
    });

    const expectedEraningsChart2 = ref({
      chart: {
        height: 150,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#88006DFF", "#D4F900FF", "#04340EFF"],
      legend: {
        show: false,
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#9C9AB6",
        },
        markers: {
          offsetX: -2,
          offsetY: 1,
        },
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
    });

    const expectedEraningsChart3 = ref({
      chart: {
        height: 150,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#070376FF", "#0dcaf0", "#ffc107"],
      legend: {
        show: false,
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#9C9AB6",
        },
        markers: {
          offsetX: -2,
          offsetY: 1,
        },
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
    });

    // Charts spécifiques pour DMPPN (Radial Bar)
    const dmppnChart = ref({
      chart: {
        height: 200,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: "bold",
              color: "#070376FF",
              offsetY: 8,
            },
          },
        },
      },
      colors: ["#070376FF"],
      stroke: {
        lineCap: "round",
      },
    });

    // Chart pour DMPPM (Donut classique)
    const dmppmChart = ref({
      chart: {
        height: 180,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#88006DFF", "#D4F900FF", "#04340EFF"],
      legend: {
        show: false,
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
    });

    // Chart pour CMPPM (Pie simple)
    const cmppmChart = ref({
      chart: {
        height: 150,
        type: "pie",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#BD0000FF", "#D97A05FF", "#6FD3F7"],
      legend: {
        show: false,
      },
      stroke: {
        width: 2,
        colors: ["#fff"],
      },
    });

    // Chart pour CRME (Radial Bar multiple)
    const crmeChart = ref({
      chart: {
        height: 200,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "12px",
              color: "#8E8DA1",
              offsetY: 20,
            },
            value: {
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2b2a3f",
              offsetY: -15,
            },
            total: {
              show: true,
              label: "Moy.",
              fontSize: "12px",
              fontWeight: 500,
              color: "#8E8DA1",
            },
          },
        },
      },
      colors: ["#070376FF", "#0dcaf0", "#ffc107"],
      stroke: {
        lineCap: "round",
      },
      legend: {
        show: false,
      },
    });

    // Fonction pour récupérer les données du dashboard
    const fetchDashboardData = async () => {
      loading.value = true;
      error.value = "";
      try {
        const url = ApiService.baseUrlBi + "/kpi/dashboard_overview/";
        const response = await axios.get(url);
        dashboardData.value = response.data;
        console.log("Dashboard data loaded:", dashboardData.value);
      } catch (err: any) {
        error.value = err.message || "Erreur lors du chargement des données";
        console.error("Error loading dashboard data:", err);
      } finally {
        loading.value = false;
      }
    };

    // Fonction pour récupérer les données des navires suspects
    const fetchNaviresSuspectsData = async (periode = "annee") => {
      loadingNavires.value = true;
      try {
        const url = ApiService.baseUrlBi + `/kpi/navires_suspects/?periode=${periode}`;
        const response = await axios.get(url);
        naviresData.value = response.data;
        console.log("Navires suspects data loaded:", naviresData.value);
      } catch (err: any) {
        console.error("Error loading navires suspects data:", err);
        // Données par défaut en cas d'erreur
        naviresData.value = {
          periode: periode,
          categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
          series: [
            { name: "AIS Off", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { name: "Suspects", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { name: "Sans Licence", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          ],
        };
      } finally {
        loadingNavires.value = false;
      }
    };

    // Fonction helper pour obtenir les données d'un KPI par code
    const getKpiByCode = (code: string): KpiData | undefined => {
      return dashboardData.value?.kpis?.find(kpi => kpi.code === code);
    };

    // Computed properties pour les KPIs
    const dmppnKpi = computed(() => getKpiByCode('DMPPN'));
    const dmppmKpi = computed(() => getKpiByCode('DMPPM'));
    const cmppmKpi = computed(() => getKpiByCode('CMPPM'));
    const crmeKpi = computed(() => getKpiByCode('CRME'));

    // Computed properties pour les séries de données des charts
    // DMPPN: RadialBar avec score de performance
    const dmppnSeries = computed(() => {
      if (!dmppnKpi.value) return [75];
      const kpi = dmppnKpi.value;
      return [kpi.niveau_performance.score];
    });

    // DMPPM: Donut avec distribution min/actuel/max
    const dmppmSeries = computed(() => {
      if (!dmppmKpi.value) return [33, 33, 34];
      const kpi = dmppmKpi.value;
      return [
        Math.round((kpi.minimum / kpi.moyenne) * 100),
        Math.round((kpi.valeur / kpi.moyenne) * 100),
        Math.round((kpi.maximum / kpi.moyenne) * 100)
      ];
    });

    // CMPPM: Pie simple avec 3 segments
    const cmppmSeries = computed(() => {
      if (!cmppmKpi.value) return [33, 33, 34];
      const kpi = cmppmKpi.value;
      const total = kpi.minimum + kpi.valeur + kpi.maximum;
      return [
        Math.round((kpi.minimum / total) * 100),
        Math.round((kpi.valeur / total) * 100),
        Math.round((kpi.maximum / total) * 100)
      ];
    });

    // CRME: RadialBar multiple (3 barres)
    const crmeSeries = computed(() => {
      if (!crmeKpi.value) return [40, 60, 80];
      const kpi = crmeKpi.value;
      return [
        Math.round((kpi.minimum / kpi.maximum) * 100),
        Math.round((kpi.valeur / kpi.maximum) * 100),
        100
      ];
    });

    // Fonction pour formater les nombres
    const formatNumber = (value: number, decimals = 2): string => {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    };

    // Fonction pour formater les montants en FCFA
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value) + ' FCFA';
    };

    // Fonction pour obtenir la classe CSS du badge selon le niveau de performance
    const getBadgeClass = (niveau: string): string => {
      const classes: Record<string, string> = {
        'EXCELLENT': 'bg-success',
        'BON': 'bg-info',
        'MOYEN': 'bg-warning',
        'FAIBLE': 'bg-warning',
        'CRITIQUE': 'bg-danger'
      };
      return classes[niveau] || 'bg-secondary';
    };

    // Fonction pour changer la période
    const selectedPeriode = ref("annee");
    const changePeriode = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const periode = target.value;
      selectedPeriode.value = periode;
      fetchNaviresSuspectsData(periode);
    };

    onMounted(() => {
      fetchDashboardData();
      fetchNaviresSuspectsData("annee");
    });

    return {
      sales,
      weeklySalesChart,
      expected,
      expectedEraningsChart,
      expectedEraningsChart1,
      expectedEraningsChart2,
      expectedEraningsChart3,
      dashboardData,
      naviresData,
      loading,
      loadingNavires,
      error,
      getKpiByCode,
      formatNumber,
      formatCurrency,
      getBadgeClass,
      // Computed properties pour les KPIs
      dmppnKpi,
      dmppmKpi,
      cmppmKpi,
      crmeKpi,
      // Computed properties pour les séries de charts
      dmppnSeries,
      dmppmSeries,
      cmppmSeries,
      crmeSeries,
      // Configurations de charts spécifiques
      dmppnChart,
      dmppmChart,
      cmppmChart,
      crmeChart,
      // Gestion période navires suspects
      selectedPeriode,
      changePeriode,
    };
  },
});
</script>
<template>
    <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <!-- Loader -->
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                {{ error }}
            </div>

            <!-- Content -->
            <div v-if="!loading && !error && kpiData">
            <!-- Header -->
            <div class="card border mb-20">
                <div class="card-body p-20">
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h4 class="fw-bold mb-5">{{ kpiData.kpi }}</h4>
                            <p class="text-muted mb-0" v-if="kpiData.periode">
                                Période: {{ kpiData.periode.date_debut }} - {{ kpiData.periode.date_fin }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filtres -->
            <div class="card border filter-card mb-20">
                <div class="card-body p-20">
                    <h5 class="fw-bold mb-15">Filtres</h5>
                    <div class="row g-3">
                        <div class="col-md-3">
                            <label class="form-label">Date Début</label>
                            <input type="date" class="form-control" v-model="filters.dateDebut">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Date Fin</label>
                            <input type="date" class="form-control" v-model="filters.dateFin">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Catégorie</label>
                            <select class="form-select" v-model="filters.categorie">
                                <option :value="null">Toutes</option>
                                <option value="CONTENEURS">Conteneurs</option>
                                <option value="HYDROCARBURES">Hydrocarbures</option>
                                <option value="VRAC_SEC">Vrac sec</option>
                                <option value="PRODUITS_CHIMIQUES">Produits chimiques</option>
                                <option value="PRODUITS_ALIMENTAIRES">Produits alimentaires</option>
                                <option value="MATERIAUX_CONSTRUCTION">Matériaux construction</option>
                                <option value="VEHICULES">Véhicules</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Type Mouvement</label>
                            <select class="form-select" v-model="filters.typeMouvement">
                                <option :value="null">Tous</option>
                                <option value="IMPORTATION">Importation</option>
                                <option value="EXPORTATION">Exportation</option>
                                <option value="TRANSBORDEMENT">Transbordement</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Port</label>
                            <input type="text" class="form-control" v-model="filters.port" placeholder="Code port">
                        </div>
                        <div class="col-md-3 d-flex align-items-end">
                            <button class="btn btn-primary w-100 me-2" @click="applyFilters">
                                <i class="bi bi-search me-1"></i>Filtrer
                            </button>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary btn-sm" @click="resetFilters">
                            <i class="bi bi-x-circle me-1"></i>Réinitialiser
                        </button>
                    </div>
                </div>
            </div>

            <!-- KPI Cards -->
            <div class="row mb-20" v-if="kpiData.cmppm_global">
                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-primary-light rounded">
                                    <i class="bi bi-cash-coin text-primary fs-24"></i>
                                </div>
                                <span class="badge bg-info">Moyen</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ formatCurrency(kpiData.cmppm_global.valeur || 0) }}</h3>
                            <p class="text-muted mb-5">CMPPM Global</p>
                            <small class="text-muted">{{ kpiData.cmppm_global.nombre_mouvements || 0 }} mouvements</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-success-light rounded">
                                    <i class="bi bi-wallet2 text-success fs-24"></i>
                                </div>
                                <span class="badge bg-success">Total</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ formatCurrency(kpiData.cmppm_global.cout_total || 0) }}</h3>
                            <p class="text-muted mb-5">Coût Total</p>
                            <small class="text-success fw-medium">{{ formatNumber(kpiData.cmppm_global.nombre_mouvements || 0) }} mouvements</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-warning-light rounded">
                                    <i class="bi bi-arrow-down-circle text-warning fs-24"></i>
                                </div>
                                <span class="badge bg-warning">Min</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ formatCurrency(kpiData.cmppm_global.cout_min || 0) }}</h3>
                            <p class="text-muted mb-5">Coût Minimum</p>
                            <small class="text-muted">Plus économique</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-danger-light rounded">
                                    <i class="bi bi-arrow-up-circle text-danger fs-24"></i>
                                </div>
                                <span class="badge bg-danger">Max</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ formatCurrency(kpiData.cmppm_global.cout_max || 0) }}</h3>
                            <p class="text-muted mb-5">Coût Maximum</p>
                            <small class="text-muted">Plus coûteux</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Évolution temporelle -->
            <div class="row mb-20">
                <div class="col-lg-8 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Évolution du CMPPM Annuel</h5>
                            <div id="evolutionChart">
                                <apexchart type="line" height="350" :options="evolutionChartOptions"
                                    :series="evolutionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Répartition par Type</h5>
                            <div id="typeMouvementChart">
                                <apexchart type="donut" height="300" :options="typeMouvementChartOptions"
                                    :series="typeMouvementChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Coûts par catégorie -->
            <div class="row mb-20">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">CMPPM par Catégorie</h5>
                            <div id="categorieChart">
                                <apexchart type="bar" height="400" :options="categorieChartOptions"
                                    :series="categorieChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tableau détaillé par catégorie -->
            <div class="mb-20" v-if="kpiData.cmppm_par_categorie?.length">
                <h5 class="fw-bold mb-15">Analyse Détaillée par Catégorie</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th class="text-center">CMPPM Moyen</th>
                                <th class="text-center">Mouvements</th>
                                <th class="text-center">CMPPM Total</th>
                                <th class="text-center">-</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cat in kpiData.cmppm_par_categorie" :key="cat.categorie_marchandise">
                                <td>
                                    <i class="bi bi-box-seam me-2"></i>{{ cat.categorie_marchandise }}
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-primary">{{ formatCurrency(cat.cmppm_moyen) }}</span>
                                </td>
                                <td class="text-center">{{ formatNumber(cat.nombre_mouvements) }}</td>
                                <td class="text-center fw-bold">{{ formatCurrency(cat.cmppm_total) }}</td>
                                <td class="text-center">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Analyse par port -->
            <div class="row mb-20" v-if="kpiData.cmppm_par_port?.length">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Analyse par Port</h5>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Port</th>
                                            <th class="text-center">CMPPM Moyen</th>
                                            <th class="text-center">Mouvements</th>
                                            <th class="text-center">-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="port in kpiData.cmppm_par_port" :key="port.dim_port__code_port">
                                            <td>
                                                <span class="badge bg-secondary">{{ port.dim_port__code_port }}</span>
                                            </td>
                                            <td class="fw-medium">{{ port.dim_port__nom_port }}</td>
                                            <td class="text-center">
                                                <span class="badge bg-info">{{ formatCurrency(port.cmppm_moyen) }}</span>
                                            </td>
                                            <td class="text-center">{{ formatNumber(port.nombre_mouvements) }}</td>
                                            <td class="text-center">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top marchandises - Section commentée car non disponible dans la nouvelle API -->
            <!-- <div class="row mb-20">
                <div class="col-lg-6 mb-20" v-if="kpiData.top_marchandises_cheres?.length">
                    <div class="card border border-danger h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="bi bi-arrow-up-circle text-danger me-2"></i>
                                Marchandises les Plus Chères
                            </h5>
                            <div class="list-group">
                                <div class="list-group-item" v-for="(marc, index) in kpiData.top_marchandises_cheres"
                                    :key="index">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h6 class="mb-5 fw-bold">#{{ index + 1 }} {{ marc.categorie }}</h6>
                                            <p class="mb-5 fs-14">{{ marc.description }}</p>
                                        </div>
                                        <span class="badge bg-danger">{{ formatCurrency(marc.cmppm) }}</span>
                                    </div>
                                    <small class="text-muted d-block">
                                        {{ marc.nombre_mouvements }} mouvements | {{ formatNumber(marc.poids_net_tonnes) }} tonnes
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-20" v-if="kpiData.top_marchandises_economiques?.length">
                    <div class="card border border-success h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="bi bi-arrow-down-circle text-success me-2"></i>
                                Marchandises les Plus Économiques
                            </h5>
                            <div class="list-group">
                                <div class="list-group-item" v-for="(marc, index) in kpiData.top_marchandises_economiques"
                                    :key="index">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 class="mb-5 fw-bold">#{{ index + 1 }} {{ marc.categorie }}</h6>
                                            <p class="mb-5 fs-14">{{ marc.description }}</p>
                                            <small class="text-muted">
                                                {{ marc.nombre_mouvements }} mouvements | {{ formatNumber(marc.poids_net_tonnes) }} tonnes
                                            </small>
                                        </div>
                                        <span class="badge bg-success fs-14">{{ formatCurrency(marc.cmppm) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- Recommandations -->
            <div class="mb-20" v-if="kpiData.recommandations?.length">
                <h5 class="fw-bold mb-15">
                    <i class="bi bi-lightbulb text-warning me-2"></i>
                    Recommandations d'Optimisation des Coûts
                </h5>
                <div class="row">
                    <div class="col-lg-6 mb-15" v-for="(rec, index) in kpiData.recommandations" :key="index">
                        <div class="card h-100" :class="getRecommandationBorderClass(rec.priorite)">
                            <div class="card-body p-20">
                                <div class="mb-10">
                                    <span class="badge" :class="getPrioriteBadgeClass(rec.priorite)">
                                        {{ rec.priorite }}
                                    </span>
                                </div>
                                <h6 class="fw-bold mb-10">{{ rec.titre }}</h6>
                                <p class="mb-10 fs-14">{{ rec.description }}</p>
                                <div class="mb-0" v-if="rec.actions?.length">
                                    <strong class="d-block mb-5">Actions recommandées:</strong>
                                    <ul class="mb-0 ps-3">
                                        <li v-for="(action, i) in rec.actions" :key="i" class="fs-13 mb-2">
                                            {{ action }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statistiques générales - Section commentée car non disponible dans la nouvelle API -->
            <!-- <div class="card border" v-if="kpiData.statistiques">
                <div class="card-body p-20">
                    <h5 class="fw-bold mb-15">Statistiques Générales</h5>
                    <div class="row text-center">
                        <div class="col-md-3">
                            <h3 class="text-primary fw-bold">{{ kpiData.statistiques.nombre_total_mouvements }}</h3>
                            <p class="text-muted mb-0">Total Mouvements</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-info fw-bold">{{ kpiData.statistiques.nombre_categories }}</h3>
                            <p class="text-muted mb-0">Catégories</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-success fw-bold">{{ kpiData.statistiques.nombre_ports }}</h3>
                            <p class="text-muted mb-0">Ports</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-warning fw-bold">{{ formatNumber(kpiData.statistiques.poids_total_tonnes) }}</h3>
                            <p class="text-muted mb-0">Poids Total (tonnes)</p>
                        </div>
                    </div>
                    <div class="row text-center mt-3">
                        <div class="col-md-12">
                            <h4 class="text-secondary fw-bold">{{ formatCurrency(kpiData.statistiques.cout_moyen_par_tonne) }}</h4>
                            <p class="text-muted mb-0">Coût Moyen par Tonne</p>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";

interface CmppmGlobal {
    valeur: number;
    unite: string;
    cout_min: number;
    cout_max: number;
    cout_total: number;
    nombre_mouvements: number;
}

interface CmppmParAnnee {
    annee: number;
    cmppm_moyen: number;
    nombre_mouvements: number;
    cmppm_total: number;
}

interface CmppmParMois {
    annee: number;
    mois: number;
    cmppm_moyen: number;
    nombre_mouvements: number;
}

interface CmppmParCategorie {
    categorie_marchandise: string;
    cmppm_moyen: number;
    nombre_mouvements: number;
    cmppm_total: number;
}

interface CmppmParPort {
    dim_port__code_port: string;
    dim_port__nom_port: string;
    cmppm_moyen: number;
    nombre_mouvements: number;
}

interface CmppmParTypeMouvement {
    type_mouvement: string;
    cmppm_moyen: number;
    nombre_mouvements: number;
}

interface DistributionCouts {
    moins_100k: number;
    "100k_500k": number;
    "500k_1M": number;
    "1M_5M": number;
    plus_5M: number;
}

interface KpiData {
    kpi: string;
    periode: {
        date_debut: string;
        date_fin: string;
    };
    filtres: {
        categorie: string | null;
        type_mouvement: string | null;
        port: string | null;
    };
    cmppm_global: CmppmGlobal;
    cmppm_par_annee: CmppmParAnnee[];
    cmppm_par_mois: CmppmParMois[];
    cmppm_par_categorie: CmppmParCategorie[];
    cmppm_par_port: CmppmParPort[];
    cmppm_par_type_mouvement: CmppmParTypeMouvement[];
    distribution_couts: DistributionCouts;
    recommandations: any[];
}

export default defineComponent({
    name: "CmppmKpi",
    setup() {
        const kpiData = ref<KpiData | null>(null);
        const loading = ref(false);
        const error = ref("");

        const filters = ref({
            dateDebut: getDefaultStartDate(),
            dateFin: getTodayDate(),
            categorie: null as string | null,
            typeMouvement: null as string | null,
            port: null as string | null,
        });

        function getTodayDate(): string {
            return new Date().toISOString().split('T')[0];
        }

        function getDefaultStartDate(): string {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 1);
            return date.toISOString().split('T')[0];
        }

        function formatCurrency(value: number): string {
            return new Intl.NumberFormat('fr-FR', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value) + ' FCFA';
        }

        function formatNumber(value: number): string {
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        }

        // Charts - Evolution
        const evolutionChartSeries = computed(() => {
            if (!kpiData.value?.cmppm_par_annee) return [];
            return [{
                name: 'CMPPM Moyen',
                data: kpiData.value.cmppm_par_annee.map((a: CmppmParAnnee) => a.cmppm_moyen)
            }, {
                name: 'Nombre Mouvements',
                data: kpiData.value.cmppm_par_annee.map((a: CmppmParAnnee) => a.nombre_mouvements)
            }];
        });

        const evolutionChartOptions = computed(() => ({
            chart: {
                type: 'line',
                toolbar: { show: true }
            },
            colors: ['#070376FF', '#0dcaf0'],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: kpiData.value?.cmppm_par_annee?.map((a: any) => a.annee) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                        fontSize: '14px',
                    }
                }
            },
            yaxis: [{
                title: { text: 'CMPPM (FCFA)' },
                labels: {
                    formatter: (value: number) => formatCurrency(value),
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            }, {
                opposite: true,
                title: { text: 'Nombre de mouvements' }
            }],
            legend: {
                position: 'top',
                fontFamily: 'Red Hat Display, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: '#d9e9ef',
            },
            tooltip: {
                y: {
                    formatter: (value: number) => formatCurrency(value)
                }
            }
        }));

        // Type Mouvement Chart
        const typeMouvementChartOptions = computed(() => ({
            chart: {
                type: 'donut',
                height: 300
            },
            labels: kpiData.value?.cmppm_par_type_mouvement?.map((t: CmppmParTypeMouvement) => t.type_mouvement) || [],
            colors: ['#070376FF', '#198754', '#ffc107'],
            legend: {
                position: 'bottom',
                fontFamily: 'Red Hat Display, sans-serif',
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'CMPPM Moyen',
                                fontFamily: 'Red Hat Display, sans-serif',
                            }
                        }
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: (value: number) => formatCurrency(value)
                }
            }
        }));

        const typeMouvementChartSeries = computed(() => {
            return kpiData.value?.cmppm_par_type_mouvement?.map((t: CmppmParTypeMouvement) => t.cmppm_moyen) || [];
        });

        // Categorie Chart
        const categorieChartOptions = computed(() => ({
            chart: {
                type: 'bar',
                height: 400,
                toolbar: { show: true }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val: number) => formatCurrency(val),
                offsetY: -20,
                style: {
                    fontSize: '11px',
                    colors: ['#304758'],
                    fontFamily: 'Red Hat Display, sans-serif',
                }
            },
            xaxis: {
                categories: kpiData.value?.cmppm_par_categorie?.map((c: CmppmParCategorie) => c.categorie_marchandise) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Coût Moyen (FCFA)',
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                },
                labels: {
                    formatter: (value: number) => formatCurrency(value)
                }
            },
            colors: ['#070376FF'],
            tooltip: {
                y: {
                    formatter: (value: number) => formatCurrency(value)
                }
            },
            grid: {
                borderColor: '#d9e9ef',
            }
        }));

        const categorieChartSeries = computed(() => [{
            name: 'CMPPM Moyen',
            data: kpiData.value?.cmppm_par_categorie?.map((c: CmppmParCategorie) => c.cmppm_moyen) || []
        }]);

        const fetchKpiData = async () => {
            loading.value = true;
            error.value = "";
            try {
                let url = ApiService.baseUrlBi + "/kpi/cmppm/";
                const params = new URLSearchParams();

                if (filters.value.dateDebut) params.append('date_debut', filters.value.dateDebut);
                if (filters.value.dateFin) params.append('date_fin', filters.value.dateFin);
                if (filters.value.categorie) params.append('categorie', filters.value.categorie);
                if (filters.value.typeMouvement) params.append('type_mouvement', filters.value.typeMouvement);
                if (filters.value.port) params.append('port', filters.value.port);

                if (params.toString()) url += '?' + params.toString();

                const response = await axios.get(url);
                kpiData.value = response.data;
                console.log("Données des KPI chargées:", kpiData.value);
            } catch (err: any) {
                error.value = err.message || "Erreur lors du chargement des données";
                console.log("Erreur lors du chargement des KPI:", err);
            } finally {
                loading.value = false;
            }
        };

        const applyFilters = () => {
            fetchKpiData();
        };

        const resetFilters = () => {
            filters.value.dateDebut = getDefaultStartDate();
            filters.value.dateFin = getTodayDate();
            filters.value.categorie = null;
            filters.value.typeMouvement = null;
            filters.value.port = null;
            fetchKpiData();
        };

        const getPrioriteBadgeClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                HAUTE: "bg-warning",
                ÉLEVÉE: "bg-warning",
                MOYENNE: "bg-info",
                BASSE: "bg-secondary"
            };
            return classes[priorite] || "bg-secondary";
        };

        const getRecommandationBorderClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "border-danger",
                HAUTE: "border-warning",
                ÉLEVÉE: "border-warning",
                MOYENNE: "border-info",
                BASSE: "border-secondary"
            };
            return classes[priorite] || "";
        };

        onMounted(() => {
            fetchKpiData();
        });

        return {
            kpiData,
            loading,
            error,
            filters,
            evolutionChartSeries,
            evolutionChartOptions,
            typeMouvementChartOptions,
            typeMouvementChartSeries,
            categorieChartOptions,
            categorieChartSeries,
            getTodayDate,
            applyFilters,
            resetFilters,
            formatCurrency,
            formatNumber,
            getPrioriteBadgeClass,
            getRecommandationBorderClass,
        };
    },
});
</script>

<style scoped>
.stats-box {
    transition: all 0.3s ease;
}

.stats-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter-card {
    background-color: #f8f9fa;
}

.icon-box {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-primary-light {
    background-color: rgba(7, 3, 118, 0.1);
}

.bg-warning-light {
    background-color: rgba(255, 193, 7, 0.1);
}

.bg-success-light {
    background-color: rgba(25, 135, 84, 0.1);
}

.bg-danger-light {
    background-color: rgba(220, 53, 69, 0.1);
}

.progress-bar {
    transition: width 0.6s ease;
}

.list-group-item {
    border: none;
    border-bottom: 1px solid #dee2e6;
    padding: 15px;
}

.list-group-item:last-child {
    border-bottom: none;
}

.border-danger {
    border-left: 4px solid #dc3545 !important;
}

.border-warning {
    border-left: 4px solid #ffc107 !important;
}

.border-info {
    border-left: 4px solid #0dcaf0 !important;
}

.border-success {
    border-left: 4px solid #198754 !important;
}

.table-responsive {
    max-height: 600px;
    overflow-y: auto;
}
</style>

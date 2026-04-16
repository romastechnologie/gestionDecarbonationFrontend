<template>
    <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <!-- En-tête -->
            <div class="mb-15 d-sm-flex align-items-center justify-content-between">
                <div class="title">
                    <h4 class="fw-bold mb-10">{{ kpiData?.kpi }} - Délai Moyen de Passage Portuaire des Marchandises</h4>
                    <span class="fw-medium text-muted fs-13 d-block mb-5">
                        Période: {{ kpiData?.periode?.date_debut }} - {{ kpiData?.periode?.date_fin }}
                    </span>
                </div>
                <div v-if="kpiData?.dmppm_global?.niveau_performance" class="d-flex align-items-center gap-10">
                    <span class="badge fs-14 fw-bold"
                        :class="getBadgeClass(kpiData.dmppm_global.niveau_performance.niveau)">
                        {{ kpiData.dmppm_global.niveau_performance.niveau }}
                    </span>
                    <span class="badge bg-secondary fs-14">
                        Score: {{ kpiData.dmppm_global.niveau_performance.score }}%
                    </span>
                </div>
            </div>

            <!-- Filtres -->
            <div class="row mt-20 mb-20">
                <div class="col-lg-12">
                    <div class="filter-card p-20 border rounded bg-light">
                        <div class="row align-items-end">
                            <div class="col-lg-2 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Date de début</label>
                                <input type="date" v-model="filters.dateDebut" class="form-control"
                                    :max="filters.dateFin || getTodayDate()" />
                            </div>
                            <div class="col-lg-2 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Date de fin</label>
                                <input type="date" v-model="filters.dateFin" class="form-control"
                                    :min="filters.dateDebut" :max="getTodayDate()" />
                            </div>
                            <div class="col-lg-2 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Catégorie</label>
                                <select v-model="filters.categorie" class="form-select">
                                    <option :value="null">Toutes</option>
                                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Type mouvement</label>
                                <select v-model="filters.typeMouvement" class="form-select">
                                    <option :value="null">Tous</option>
                                    <option value="IMPORT">IMPORT</option>
                                    <option value="EXPORT">EXPORT</option>
                                    <option value="TRANSBORDEMENT">TRANSBORDEMENT</option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Port</label>
                                <select v-model="filters.port" class="form-select">
                                    <option :value="null">Tous</option>
                                    <option v-for="port in ports" :key="port.dim_port__code_port" :value="port.dim_port__code_port">
                                        {{ port.dim_port__code_port }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <div class="d-flex gap-10">
                                    <button @click="applyFilters" class="btn btn-primary flex-grow-1"
                                        :disabled="loading">
                                        <i class="flaticon-search me-5"></i>
                                        Filtrer
                                    </button>
                                    <button @click="resetFilters" class="btn btn-outline-secondary ms-10" :disabled="loading">
                                        <i class="flaticon-refresh me-5"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- KPI Global -->
            <div class="row mt-20" v-if="kpiData?.dmppm_global">

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20 text-center">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-primary">
                                    <i class="flaticon-clock fs-30 text-primary"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">DMPPM Global</span>
                                    <h3 class="fw-black mb-5">{{ kpiData.dmppm_global.valeur }}
                                        {{ kpiData.dmppm_global.unite }}</h3>

                                    <div class="mt-10 fs-8">
                                        <span class="text-success">Min: {{ kpiData.dmppm_global.delai_min }}j</span> |
                                        <span class="text-danger">Max: {{ kpiData.dmppm_global.delai_max }}j</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-info">
                                    <i class="flaticon-sterile-box fs-30 text-info"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">Marchandises traitées</span>
                                    <h3 class="fw-black mb-5">{{ kpiData.dmppm_global.nombre_marchandises }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20 text-center">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-success">
                                    <i class="flaticon-weight fs-30 text-success"></i>
                                </div>
                                <div class="title ms-15">
                                    <h3 class="fw-black mb-5">{{ formatNumber(kpiData.dmppm_global.volume_total_tonnes)
                                    }}</h3>
                                    <span class="text-muted fs-8">Tonnes traitées</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20" v-if="kpiData?.analyse_retards">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20 ">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-danger">
                                    <i class="flaticon-warning fs-30 text-danger"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-14">Marchandises en retard</span>
                                    <h3 class="fw-black mb-5">{{ kpiData.analyse_retards.nombre_retards }}</h3>
                                    <div class="mt-10">
                                        <span class="badge bg-danger">
                                            {{ kpiData.analyse_retards.taux_retard.toFixed(1) }}% de retard
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Graphique par catégorie -->
            <div class="row mt-30" v-if="kpiData?.dmppm_par_categorie?.length">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">DMPPM par Catégorie</h5>
                            <div id="categorieChart">
                                <apexchart type="bar" height="400" :options="categorieChartOptions"
                                    :series="categorieChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- Graphiques d'évolution -->
            <div class="row mt-30" v-if="kpiData?.dmppm_par_mois?.length">
                <!-- Graphique principal DMPPM -->
                <div class="col-lg-8 mb-20">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Évolution du DMPPM par mois</h5>
                            <div id="dmppmChart">
                                <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graphique circulaire taux de retard -->
                <div class="col-lg-4 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Taux de Retard Global</h5>
                            <div id="retardChart">
                                <apexchart type="donut" height="300" :options="retardChartOptions"
                                    :series="retardChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse par type de mouvement et port -->
            <div class="row mt-30">
                <div class="col-lg-6 mb-20" v-if="kpiData?.dmppm_par_type_mouvement?.length">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Analyse par Type de Mouvement</h5>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th class="text-center">DMPPM</th>
                                            <th class="text-center">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="type in kpiData.dmppm_par_type_mouvement" :key="type.type_mouvement">
                                            <td class="fw-medium">{{ type.type_mouvement }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="getDmppmBadgeClass(type.dmppm)">
                                                    {{ type.dmppm.toFixed(2) }}j
                                                </span>
                                            </td>
                                            <td class="text-center">{{ type.nombre_marchandises }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-20" v-if="kpiData?.dmppm_par_port?.length">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Analyse par Port</h5>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Port</th>
                                            <th class="text-center">DMPPM</th>
                                            <th class="text-center">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="port in kpiData.dmppm_par_port" :key="port.dim_port__code_port">
                                            <td class="fw-medium">{{ port.dim_port__code_port }}</td>
                                            <td>{{ port.dim_port__nom_port }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="getDmppmBadgeClass(port.dmppm)">
                                                    {{ port.dmppm.toFixed(2) }}j
                                                </span>
                                            </td>
                                            <td class="text-center">{{ port.nombre_marchandises }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse par catégorie -->
            <div class="mt-30" v-if="kpiData?.dmppm_par_categorie?.length">
                <h5 class="fw-bold mb-15">Analyse Détaillée par Catégorie de Marchandise</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th class="text-center">DMPPM (jours)</th>
                                <th class="text-center">Nombre</th>
                                <th class="text-center">Taux Retard</th>
                                <th class="text-center">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cat in kpiData.dmppm_par_categorie" :key="cat.categorie_marchandise">
                                <td class="fw-medium">{{ cat.categorie_marchandise }}</td>
                                <td class="text-center">
                                    <span class="badge" :class="getDmppmBadgeClass(cat.dmppm)">
                                        {{ cat.dmppm.toFixed(2) }} jours
                                    </span>
                                </td>
                                <td class="text-center">{{ cat.nombre_marchandises }}</td>
                                <td class="text-center">
                                    <span class="badge" :class="getRetardBadgeClass(cat.taux_retard)">
                                        {{ cat.taux_retard.toFixed(1) }}%
                                    </span>
                                </td>
                                <td class="text-center">
                                    <div class="progress" style="height: 20px;">
                                        <div class="progress-bar" :class="getProgressBarClass(cat.dmppm)"
                                            :style="{ width: getProgressWidth(cat.dmppm) + '%' }">
                                            {{ getProgressWidth(cat.dmppm).toFixed(0) }}%
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Distribution des délais -->
            <div class="row mt-30" v-if="kpiData?.distribution_delais">
                <!-- Cartes de distribution -->
                <div class="col-lg-5 mb-20">
                    <h5 class="fw-bold mb-15">Distribution des Délais</h5>
                    <div class="row">
                        <div class="col-12 mb-15" v-for="(dist, key) in kpiData.distribution_delais" :key="key">
                            <div class="card border">
                                <div class="card-body p-15 d-flex align-items-center justify-content-between">
                                    <span class="fs-14 fw-medium">{{ dist.label }}</span>
                                    <span class="badge bg-primary fs-16">{{ dist.nombre }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graphique de distribution -->
                <div class="col-lg-7 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Répartition des Marchandises par Délai</h5>
                            <div id="distributionChart">
                                <apexchart type="pie" height="350" :options="distributionChartOptions"
                                    :series="distributionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse des retards -->
            <div class="row mt-30" v-if="kpiData?.analyse_retards">
                <div class="col-12">
                    <div class="card border border-danger">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15 text-danger">
                                <i class="flaticon-warning me-10"></i>Analyse des Retards
                            </h5>
                            <div class="row">
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center">
                                        <h4 class="fw-bold text-danger">{{ kpiData.analyse_retards.nombre_retards }}
                                        </h4>
                                        <span class="text-muted">Marchandises en retard</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center">
                                        <h4 class="fw-bold text-danger">{{
                                            kpiData.analyse_retards.taux_retard.toFixed(1)
                                        }}%</h4>
                                        <span class="text-muted">Taux de retard</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center">
                                        <h4 class="fw-bold text-warning">{{
                                            kpiData.analyse_retards.heures_retard_moyen.toFixed(1) }}h</h4>
                                        <span class="text-muted">Retard moyen</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center">
                                        <h4 class="fw-bold text-danger">{{
                                            kpiData.analyse_retards.heures_retard_max.toFixed(1) }}h</h4>
                                        <span class="text-muted">Retard maximum</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recommandations -->
            <div class="mt-30" v-if="kpiData?.recommandations?.length">
                <h5 class="fw-bold mb-15">
                    <i class="flaticon-light-bulb me-10"></i>Recommandations Stratégiques
                </h5>
                <div class="row">
                    <div class="col-lg-12 mb-15" v-for="(recommandation, index) in kpiData.recommandations"
                        :key="index">
                        <div class="card border" :class="getRecommandationBorderClass(recommandation.priorite)">
                            <div class="card-body p-20">
                                <div class="d-flex align-items-center mb-10">
                                    <span class="badge me-10" :class="getPrioriteBadgeClass(recommandation.priorite)">
                                        {{ recommandation.priorite }}
                                    </span>
                                    <span class="badge bg-secondary me-10">
                                        {{ recommandation.type }}
                                    </span>
                                </div>
                                <p class="mb-10 fw-medium">{{ recommandation.message }}</p>
                                <div v-if="recommandation.actions?.length">
                                    <small class="text-muted fw-bold">Actions recommandées:</small>
                                    <ul class="mt-5 mb-0">
                                        <li v-for="(action, idx) in recommandation.actions" :key="idx" class="fs-14">
                                            {{ action }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Indicateur de chargement -->
            <div v-if="loading" class="text-center py-50">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
            </div>

            <!-- Message d'erreur -->
            <div v-if="error" class="alert alert-danger mt-20" role="alert">
                <strong>Erreur:</strong> {{ error }}
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
    score: number;
}

interface DmppmGlobal {
    valeur: number;
    unite: string;
    delai_min: number;
    delai_max: number;
    nombre_marchandises: number;
    volume_total_tonnes: number;
    niveau_performance: NiveauPerformance;
}

interface DmppmParAnnee {
    annee: number;
    dmppm: number;
    nombre_marchandises: number;
    marchandises_en_retard: number;
}

interface DmppmParMois {
    annee: number;
    mois: number;
    mois_nom: string;
    dmppm: number;
    nombre_marchandises: number;
}

interface DmppmParSemaine {
    annee: number;
    semaine: number;
    dmppm: number;
    nombre_marchandises: number;
}

interface AnalyseCategorie {
    categorie_marchandise: string;
    dmppm: number;
    nombre_marchandises: number;
    taux_retard: number;
}

interface AnalyseTypeMouvement {
    type_mouvement: string;
    dmppm: number;
    nombre_marchandises: number;
}

interface AnalysePort {
    dim_port__code_port: string;
    dim_port__nom_port: string;
    dmppm: number;
    nombre_marchandises: number;
}

interface DistributionDelais {
    moins_1j: { nombre: number; label: string };
    "1_3j": { nombre: number; label: string };
    "3_5j": { nombre: number; label: string };
    "5_7j": { nombre: number; label: string };
    plus_7j: { nombre: number; label: string };
}

interface AnalyseRetards {
    nombre_retards: number;
    taux_retard: number;
    heures_retard_moyen: number;
    heures_retard_max: number;
}

interface Recommandation {
    priorite: string;
    type: string;
    message: string;
    actions: string[];
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
    dmppm_global: DmppmGlobal;
    analyse_retards: AnalyseRetards;
    dmppm_par_annee: DmppmParAnnee[];
    dmppm_par_mois: DmppmParMois[];
    dmppm_par_semaine: DmppmParSemaine[];
    dmppm_par_categorie: AnalyseCategorie[];
    dmppm_par_port: AnalysePort[];
    dmppm_par_type_mouvement: AnalyseTypeMouvement[];
    distribution_delais: DistributionDelais;
    recommandations: Recommandation[];
}

export default defineComponent({
    name: "DmppmKpi",
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
            const today = new Date();
            return today.toISOString().split('T')[0];
        }

        function getDefaultStartDate(): string {
            const date = new Date();
            date.setMonth(date.getMonth() - 3);
            return date.toISOString().split('T')[0];
        }

        const categories = computed(() => {
            if (!kpiData.value?.dmppm_par_categorie) return [];
            return kpiData.value.dmppm_par_categorie.map(c => c.categorie_marchandise);
        });

        const ports = computed(() => {
            if (!kpiData.value?.dmppm_par_port) return [];
            return kpiData.value.dmppm_par_port;
        });

        const chartSeries = computed(() => {
            if (!kpiData.value?.dmppm_par_mois) return [];
            return [{
                name: 'DMPPM',
                data: kpiData.value.dmppm_par_mois.map(m => m.dmppm)
            }, {
                name: 'Nombre de marchandises',
                data: kpiData.value.dmppm_par_mois.map(m => m.nombre_marchandises)
            }];
        });

        const chartOptions = computed(() => ({
            chart: {
                type: 'line',
                toolbar: { show: true }
            },
            colors: ['#070376FF', '#dc3545'],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: kpiData.value?.dmppm_par_mois?.map(m => m.mois_nom) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                        fontSize: '14px',
                    }
                }
            },
            yaxis: [{
                title: { text: 'DMPPM (jours)' },
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            }, {
                opposite: true,
                title: { text: 'Nombre de marchandises' }
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
            }
        }));

        // Donut chart for retard rate
        const retardChartOptions = computed(() => ({
            chart: {
                type: 'donut',
                height: 300
            },
            labels: ['En Retard', 'À Temps'],
            colors: ['#dc3545', '#198754'],
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
                                label: 'Taux de Retard',
                                fontFamily: 'Red Hat Display, sans-serif',
                                fontSize: '14px',
                                formatter: () => {
                                    const retards = kpiData.value?.analyse_retards;
                                    if (!retards) return '0%';
                                    return `${retards.taux_retard.toFixed(1)}%`;
                                }
                            }
                        }
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${value} marchandises`
                }
            }
        }));

        const retardChartSeries = computed(() => {
            const retards = kpiData.value?.analyse_retards;
            const global = kpiData.value?.dmppm_global;
            if (!retards || !global) return [0, 0];
            const enRetard = retards.nombre_retards || 0;
            const total = global.nombre_marchandises || 0;
            const aTemps = total - enRetard;
            return [enRetard, aTemps];
        });

        // Bar chart for DMPPM by category
        const categorieChartOptions = computed(() => ({
            chart: {
                type: 'bar',
                height: 400,
                toolbar: {
                    show: true
                }
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
                formatter: (val: number) => `${val.toFixed(1)}j`,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#304758'],
                    fontFamily: 'Red Hat Display, sans-serif',
                }
            },
            xaxis: {
                categories: kpiData.value?.dmppm_par_categorie?.map(c => c.categorie_marchandise) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'DMPPM (jours)',
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            },
            colors: ['#070376FF'],
            tooltip: {
                y: {
                    formatter: (value: number) => `${value.toFixed(2)} jours`
                }
            },
            grid: {
                borderColor: '#d9e9ef',
            }
        }));

        const categorieChartSeries = computed(() => [{
            name: 'DMPPM',
            data: kpiData.value?.dmppm_par_categorie?.map(c => c.dmppm) || []
        }]);

        // Pie chart for distribution
        const distributionChartOptions = computed(() => ({
            chart: {
                type: 'pie',
                height: 350
            },
            labels: Object.values(kpiData.value?.distribution_delais || {}).map((d: any) => d.label),
            colors: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545'],
            legend: {
                position: 'bottom',
                fontFamily: 'Red Hat Display, sans-serif',
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${value} marchandises`
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }));

        const distributionChartSeries = computed(() => {
            return Object.values(kpiData.value?.distribution_delais || {}).map((d: any) => d.nombre);
        });

        const fetchKpiData = async () => {
            loading.value = true;
            error.value = "";
            try {
                let url = ApiService.baseUrlBi + "/kpi/dmppm/";
                const params = new URLSearchParams();

                if (filters.value.dateDebut) params.append('date_debut', filters.value.dateDebut);
                if (filters.value.dateFin) params.append('date_fin', filters.value.dateFin);
                if (filters.value.categorie) params.append('categorie', filters.value.categorie);
                if (filters.value.typeMouvement) params.append('type_mouvement', filters.value.typeMouvement);
                if (filters.value.port) params.append('port', filters.value.port);

                if (params.toString()) url += '?' + params.toString();

                const response = await axios.get(url);
                kpiData.value = response.data;
            } catch (err: any) {
                error.value = err.message || "Erreur lors du chargement des données";
                console.error("Erreur lors du chargement des KPI:", err);
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

        const getBadgeClass = (niveau: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                FAIBLE: "bg-warning",
                MOYEN: "bg-info",
                BON: "bg-success",
                EXCELLENT: "bg-primary"
            };
            return classes[niveau] || "bg-secondary";
        };

        const getDmppmBadgeClass = (dmppm: number) => {
            if (dmppm <= 2) return "bg-success";
            if (dmppm <= 4) return "bg-info";
            if (dmppm <= 5) return "bg-warning";
            return "bg-danger";
        };

        const getRetardBadgeClass = (pourcentage: number) => {
            if (pourcentage === 0) return "bg-success";
            if (pourcentage <= 20) return "bg-info";
            if (pourcentage <= 40) return "bg-warning";
            return "bg-danger";
        };

        const getProgressBarClass = (dmppm: number) => {
            if (dmppm <= 2) return "bg-success";
            if (dmppm <= 4) return "bg-info";
            if (dmppm <= 5) return "bg-warning";
            return "bg-danger";
        };

        const getProgressWidth = (dmppm: number) => {
            const maxDmppm = 7;
            return Math.min(100, Math.max(0, 100 - (dmppm / maxDmppm * 100)));
        };

        const getPrioriteBadgeClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                HAUTE: "bg-danger",
                MOYENNE: "bg-warning",
                BASSE: "bg-info",
            };
            return classes[priorite] || "bg-secondary";
        };

        const getRecommandationBorderClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "border-danger",
                HAUTE: "border-danger",
                MOYEN: "border-warning",
                MOYENNE: "border-warning",
                BASSE: "border-info",
            };
            return classes[priorite] || "";
        };

        const formatNumber = (num: number) => {
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        };

        onMounted(() => {
            fetchKpiData();
        });

        return {
            kpiData,
            loading,
            error,
            filters,
            categories,
            ports,
            chartSeries,
            chartOptions,
            retardChartOptions,
            retardChartSeries,
            categorieChartOptions,
            categorieChartSeries,
            distributionChartOptions,
            distributionChartSeries,
            getTodayDate,
            applyFilters,
            resetFilters,
            getBadgeClass,
            getDmppmBadgeClass,
            getRetardBadgeClass,
            getProgressBarClass,
            getProgressWidth,
            getPrioriteBadgeClass,
            getRecommandationBorderClass,
            formatNumber,
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

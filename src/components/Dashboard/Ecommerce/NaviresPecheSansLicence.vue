<template>
    <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="mb-15 mb-sm-0 d-sm-flex align-items-center justify-content-between">
                <div class="title">
                    <h4 class="fw-bold mb-10">Navires pêche sans licence</h4>
                    <span class="fw-medium text-muted fs-13 d-block mb-5">
                        Période: {{ kpiData?.periode?.debut }} - {{ kpiData?.periode?.fin }}
                        ({{ kpiData?.periode?.duree_jours }} jours)
                    </span>
                </div>
                <div v-if="kpiData?.resume?.interpretation" class="badge fs-14 fw-bold"
                    :class="getBadgeClass(kpiData.resume.interpretation.niveau)">
                    {{ kpiData.resume.interpretation.niveau }}
                </div>
            </div>

            <!-- Filtre de dates -->
            <div class="row mt-20 mb-20">
                <div class="col-lg-12">
                    <div class="filter-card p-20 border rounded bg-light">
                        <div class="row align-items-end">
                            <div class="col-lg-4 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Date de début</label>
                                <input type="date" v-model="filters.dateDebut" class="form-control"
                                    :max="filters.dateFin || getTodayDate()" />
                            </div>
                            <div class="col-lg-4 col-md-6 mb-15 mb-lg-0">
                                <label class="form-label fw-medium mb-10">Date de fin</label>
                                <input type="date" v-model="filters.dateFin" class="form-control"
                                    :min="filters.dateDebut" :max="getTodayDate()" />
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="d-flex gap-10">
                                    <button @click="applyFilters" class="btn btn-primary flex-grow-1"
                                        :disabled="loading || !filters.dateDebut || !filters.dateFin">
                                        <i class="flaticon-search me-5"></i>
                                        Filtrer
                                    </button>
                                    <button @click="resetFilters" class="btn btn-outline-secondary" :disabled="loading">
                                        <i class="flaticon-refresh me-5"></i>
                                        Réinitialiser
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Résumé des KPI -->
            <div class="row mt-20" v-if="kpiData?.resume">
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-xxxl-3 col-sm-3">
                        <div class="card mb-25 border rounded bg-white stats-box ">
                            <div class="card-body pe-10 ps-10 pe-md-25 ps-md-25 pe-lg-15 ps-lg-15 py-3">
                                <div class="d-flex align-items-center">
                                    <div class="icon position-relative rounded-circle text-center text-primary"><i
                                            class="flaticon-sterile-box"></i></div>
                                    <div class="title ms-15"><span
                                            class="d-block mb-7 fs-13 text-uppercase fw-medium text-dark-emphasis">Total
                                            détections</span>
                                        <h4 class="fw-black mb-8 lh-1">{{ kpiData.resume.total_detections }}</h4>
                                        <!-- <span
                                            class="fw-medium text-dark-emphasis">13,456</span><span
                                            class="fw-bold text-success ms-11 text-success">5.5% <i
                                                class="flaticon-up-arrow fs-12 lh-1 position-relative top-1"></i></span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-xxxl-3 col-sm-3">
                        <div class="card mb-25 border rounded bg-white stats-box">
                            <div class="card-body pe-10 ps-10 pe-md-25 ps-md-25 pe-lg-15 ps-lg-15 py-3">
                                <div class="d-flex align-items-center">
                                    <div class="icon position-relative rounded-circle text-center text-danger"><i
                                            class="flaticon-trolley-cart"></i></div>
                                    <div class="title ms-15"><span
                                            class="d-block mb-7 fs-13 text-uppercase fw-medium text-dark-emphasis">Navires uniques
                                            </span>
                                        <h4 class="fw-black mb-8 lh-1">{{ kpiData.resume.navires_uniques }}</h4>
                                        <!-- <span
                                            class="fw-medium text-dark-emphasis">1,103</span><span
                                            class="fw-bold text-success ms-11 text-success">2.5% <i
                                                class="flaticon-up-arrow fs-12 lh-1 position-relative top-1"></i></span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-xxxl-3 col-sm-3">
                        <div class="card mb-25 border rounded bg-white stats-box">
                            <div class="card-body pe-10 ps-10 pe-md-25 ps-md-25 pe-lg-15 ps-lg-15 py-3">
                                <div class="d-flex align-items-center">
                                    <div class="icon position-relative rounded-circle text-center text-info"><i
                                            class="flaticon-card"></i>
                                    </div>
                                    <div class="title ms-15"><span
                                            class="d-block mb-7 fs-13 text-uppercase fw-medium text-dark-emphasis">Zones affectées</span>
                                        <h4 class="fw-black mb-8 lh-1">
                                            <ccc title="$105" class="ccc--converted"
                                                style="font-size: inherit; display: inline; color: inherit;">
                                                {{ kpiData.resume.zones_affectees }}</ccc>
                                        </h4>
                                        <!-- <span class="fw-medium text-dark-emphasis">
                                            <ccc title="$560" class="ccc--converted"
                                                style="font-size: inherit; display: inline; color: inherit;">
                                                €479.25</ccc>
                                        </span><span class="fw-bold text-success ms-11 text-danger">1.5% <i
                                                class="flaticon-down-arrow fs-12 lh-1 position-relative top-1"></i></span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-xxxl-3 col-sm-3">
                        <div class="card mb-25 border rounded bg-white stats-box">
                            <div class="card-body pe-10 ps-10 pe-md-25 ps-md-25 pe-lg-15 ps-lg-15 py-3">
                                <div class="d-flex align-items-center">
                                    <div class="icon position-relative rounded-circle text-center text-success"><i
                                            class="flaticon-sugar-cubes"></i></div>
                                    <div class="title ms-15"><span
                                            class="d-block mb-7 fs-13 text-uppercase fw-medium text-dark-emphasis">
                                            Indicateur sévérité</span>
                                        <h4 class="fw-black mb-8 lh-1">
                                            <ccc title="$12,345" class="ccc--converted"
                                                style="font-size: inherit; display: inline; color: inherit;">{{ kpiData.resume.indicateur_severite }}
                                            </ccc>
                                        </h4>
                                        <!-- <span class="fw-medium text-dark-emphasis">
                                            <ccc title="$10,320" class="ccc--converted"
                                                style="font-size: inherit; display: inline; color: inherit;">€8831.86
                                            </ccc>
                                        </span><span class="fw-bold text-success ms-11 text-success">11.5% <i
                                                class="flaticon-up-arrow fs-12 lh-1 position-relative top-1"></i></span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message d'interprétation -->
            <div v-if="kpiData?.resume?.interpretation" class="alert mt-20"
                :class="getAlertClass(kpiData.resume.interpretation.niveau)" role="alert">
                <h5 class="alert-heading fw-bold">{{ kpiData.resume.interpretation.message }}</h5>
                <p class="mb-0">
                    <strong>Action recommandée:</strong> {{ kpiData.resume.interpretation.action }}
                </p>
            </div>

            <!-- Tableau des navires récidivistes -->
            <div class="mt-30" v-if="kpiData?.navires?.recidivistes?.length">
                <h5 class="fw-bold mb-15">Top 10 Navires Récidivistes</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nom du navire</th>
                                <th>IMO</th>
                                <th>MMSI</th>
                                <th>Pavillon</th>
                                <th class="text-center">Détections</th>
                                <th class="text-center">Risque max</th>
                                <th>Première détection</th>
                                <th>Dernière détection</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="navire in kpiData.navires.recidivistes.slice(0, 10)"
                                :key="navire.dim_navire__mmsi">
                                <td class="fw-medium">{{ navire.dim_navire__nom_navire }}</td>
                                <td>{{ navire.dim_navire__imo_number || 'N/A' }}</td>
                                <td>{{ navire.dim_navire__mmsi }}</td>
                                <td>{{ navire.dim_navire__pavillon }}</td>
                                <td class="text-center">
                                    <span class="badge bg-primary">{{ navire.nombre_detections }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="badge" :class="getRisqueBadgeClass(navire.risque_max)">
                                        {{ navire.risque_max }}
                                    </span>
                                </td>
                                <td>{{ formatDate(navire.premiere_detection) }}</td>
                                <td>{{ formatDate(navire.derniere_detection) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Statistiques par zone -->
            <!-- <div class="row mt-30" v-if="kpiData?.statistiques?.par_zone?.length">
                <div class="col-12">
                    <h5 class="fw-bold mb-15">Statistiques par Zone Maritime</h5>
                </div>
                <div class="col-lg-12" v-for="zone in kpiData.statistiques.par_zone"
                    :key="zone.dim_zone_maritime__code_zone">
                    <div class="card border mb-15">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="fw-bold mb-5">{{ zone.dim_zone_maritime__nom_zone }}</h6>
                                    <span class="text-muted fs-13">{{ zone.dim_zone_maritime__code_zone }}</span>
                                </div>
                                <div class="text-end">
                                    <div class="mb-5">
                                        <span class="fw-bold fs-18">{{ zone.nombre_navires }}</span>
                                        <span class="text-muted fs-13"> navires</span>
                                    </div>
                                    <div>
                                        <span class="fw-bold fs-18">{{ zone.nombre_detections }}</span>
                                        <span class="text-muted fs-13"> détections</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-15 d-flex gap-10">
                                <span class="badge bg-danger">{{ zone.risque_eleve }} risque élevé</span>
                                <span class="badge bg-warning">{{ zone.comportements_suspects }} comportements
                                    suspects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- Recommandations -->
            <!-- <div class="mt-30" v-if="kpiData?.recommandations?.length">
                <h5 class="fw-bold mb-15">Recommandations</h5>
                <div class="row">
                    <div class="col-lg-6 mb-15" v-for="(recommandation, index) in kpiData.recommandations" :key="index">
                        <div class="card border" :class="getRecommandationBorderClass(recommandation.priorite)">
                            <div class="card-body p-20">
                                <div class="d-flex align-items-center mb-10">
                                    <span class="badge me-10" :class="getPrioriteBadgeClass(recommandation.priorite)">
                                        {{ recommandation.priorite }}
                                    </span>
                                    <span class="badge bg-secondary">{{ recommandation.categorie }}</span>
                                </div>
                                <p class="mb-10 fw-medium">{{ recommandation.message }}</p>
                                <div v-if="recommandation.navires">
                                    <small class="text-muted">Navires concernés:</small>
                                    <div class="d-flex flex-wrap gap-5 mt-5">
                                        <span class="badge bg-light text-dark" v-for="navire in recommandation.navires"
                                            :key="navire">
                                            {{ navire }}
                                        </span>
                                    </div>
                                </div>
                                <div v-if="recommandation.pavillons">
                                    <small class="text-muted">Pavillons concernés:</small>
                                    <div class="d-flex flex-wrap gap-5 mt-5">
                                        <span class="badge bg-light text-dark"
                                            v-for="pavillon in recommandation.pavillons" :key="pavillon">
                                            {{ pavillon }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

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
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";

interface Interpretation {
    niveau: string;
    couleur: string;
    message: string;
    action: string;
}

interface Resume {
    total_detections: number;
    navires_uniques: number;
    zones_affectees: number;
    indicateur_severite: number;
    interpretation: Interpretation;
}

interface Periode {
    debut: string;
    fin: string;
    duree_jours: number;
}

interface NavireRecidiviste {
    dim_navire__nom_navire: string;
    dim_navire__imo_number: string | null;
    dim_navire__mmsi: string;
    dim_navire__pavillon: string;
    nombre_detections: number;
    premiere_detection: string;
    derniere_detection: string;
    zones_frequentees: number;
    risque_max: string;
}

interface ZoneStatistique {
    dim_zone_maritime__code_zone: string;
    dim_zone_maritime__nom_zone: string;
    nombre_navires: number;
    nombre_detections: number;
    risque_eleve: number;
    comportements_suspects: number;
}

interface Recommandation {
    priorite: string;
    categorie: string;
    message: string;
    navires?: string[];
    pavillons?: string[];
}

interface KpiData {
    periode: Periode;
    resume: Resume;
    navires: {
        recidivistes: NavireRecidiviste[];
    };
    statistiques: {
        par_zone: ZoneStatistique[];
    };
    recommandations: Recommandation[];
}

export default defineComponent({
    name: "NaviresPecheSansLicence",
    setup() {
        const kpiData = ref<KpiData | null>(null);
        const loading = ref(false);
        const error = ref("");

        // Filtres
        const filters = ref({
            dateDebut: getDefaultStartDate(),
            dateFin: getTodayDate(),
        });

        // Fonction pour obtenir la date d'aujourd'hui au format YYYY-MM-DD
        function getTodayDate(): string {
            const today = new Date();
            return today.toISOString().split('T')[0];
        }

        // Fonction pour obtenir la date par défaut (30 jours en arrière)
        function getDefaultStartDate(): string {
            const date = new Date();
            date.setDate(date.getDate() - 30);
            return date.toISOString().split('T')[0];
        }

        const fetchKpiData = async (dateDebut?: string, dateFin?: string) => {
            loading.value = true;
            error.value = "";
            try {
                // Construire l'URL avec les paramètres de date si fournis
                let url = ApiService.baseUrlBi + "/kpi/navires_peche_sans_licence/";
                const params = new URLSearchParams();

                if (dateDebut) {
                    params.append('date_debut', dateDebut);
                }
                if (dateFin) {
                    params.append('date_fin', dateFin);
                }

                if (params.toString()) {
                    url += '?' + params.toString();
                }

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
            if (filters.value.dateDebut && filters.value.dateFin) {
                fetchKpiData(filters.value.dateDebut, filters.value.dateFin);
            }
        };

        const resetFilters = () => {
            filters.value.dateDebut = getDefaultStartDate();
            filters.value.dateFin = getTodayDate();
            fetchKpiData(filters.value.dateDebut, filters.value.dateFin);
        };

        const getBadgeClass = (niveau: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                ELEVE: "bg-warning",
                MOYEN: "bg-info",
                FAIBLE: "bg-success",
            };
            return classes[niveau] || "bg-secondary";
        };

        const getAlertClass = (niveau: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "alert-danger",
                ELEVE: "alert-warning",
                MOYEN: "alert-info",
                FAIBLE: "alert-success",
            };
            return classes[niveau] || "alert-secondary";
        };

        const getRisqueBadgeClass = (risque: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                ELEVE: "bg-warning",
                MOYEN: "bg-info",
                FAIBLE: "bg-success",
            };
            return classes[risque] || "bg-secondary";
        };

        const getPrioriteBadgeClass = (priorite: string) => {
            const classes: Record<string, string> = {
                HAUTE: "bg-danger",
                MOYENNE: "bg-warning",
                BASSE: "bg-info",
            };
            return classes[priorite] || "bg-secondary";
        };

        const getRecommandationBorderClass = (priorite: string) => {
            const classes: Record<string, string> = {
                HAUTE: "border-danger",
                MOYENNE: "border-warning",
                BASSE: "border-info",
            };
            return classes[priorite] || "";
        };

        const formatDate = (dateString: string) => {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        };

        onMounted(() => {
            fetchKpiData(filters.value.dateDebut, filters.value.dateFin);
        });

        return {
            kpiData,
            loading,
            error,
            filters,
            getTodayDate,
            fetchKpiData,
            applyFilters,
            resetFilters,
            getBadgeClass,
            getAlertClass,
            getRisqueBadgeClass,
            getPrioriteBadgeClass,
            getRecommandationBorderClass,
            formatDate,
        };
    },
});
</script>

<style scoped>
.stats-card {
    transition: all 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.table-responsive {
    max-height: 400px;
    overflow-y: auto;
}

.badge {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
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

.filter-card {
    background-color: #f8f9fa;
    transition: all 0.3s ease;
}

.filter-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-control {
    border-radius: 4px;
    border: 1px solid #dee2e6;
    padding: 0.5rem 0.75rem;
}

.form-control:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn {
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>

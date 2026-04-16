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
                                Période: {{ kpiData.periode.debut }} - {{ kpiData.periode.fin }}
                            </p>
                        </div>
                        <div v-if="kpiData.dmppn_global?.niveau_performance">
                            <span class="badge fs-16 px-20 py-10"
                                :class="getBadgeClass(kpiData.dmppn_global.niveau_performance.niveau)">
                                {{ kpiData.dmppn_global.niveau_performance.niveau }}
                                <span class="ms-2">({{ kpiData.dmppn_global.niveau_performance.score }}%)</span>
                            </span>
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
                        <div class="col-md-2">
                            <label class="form-label">Type Navire</label>
                            <select class="form-select" v-model="filters.typeNavire">
                                <option :value="null">Tous</option>
                                <option value="PECHE">Pêche</option>
                                <option value="CARGO">Cargo</option>
                                <option value="VRAQUIER">Vraquier</option>
                                <option value="PETROLIER">Pétrolier</option>
                                <option value="CONTENEUR">Conteneur</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Port</label>
                            <select class="form-select" v-model="filters.port">
                                <option :value="null">Tous</option>
                                <option value="CIABJ">Abidjan</option>
                                <option value="CISPE">San Pedro</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Type Opération</label>
                            <select class="form-select" v-model="filters.typeOperation">
                                <option :value="null">Tous</option>
                                <option value="IMPORT">Import</option>
                                <option value="EXPORT">Export</option>
                                <option value="TRANSBORDEMENT">Transbordement</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Pavillon</label>
                            <input type="text" class="form-control" v-model="filters.pavillon"
                                placeholder="Ex: CI, FR, SN">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Armateur</label>
                            <input type="text" class="form-control" v-model="filters.armateur"
                                placeholder="Nom de l'armateur">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Jauge Min (TJB)</label>
                            <input type="number" class="form-control" v-model.number="filters.jaugeMin">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Jauge Max (TJB)</label>
                            <input type="number" class="form-control" v-model.number="filters.jaugeMax">
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
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
            <div class="row mb-20" v-if="kpiData.dmppn_global">
                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-primary-light rounded">
                                    <i class="bi bi-clock-history text-primary fs-24"></i>
                                </div>
                                <span class="badge bg-info">Global</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ kpiData.dmppn_global.valeur_jours || 0 }} jours</h3>
                            <p class="text-muted mb-5">DMPPN Global</p>
                            <small class="text-muted">{{ kpiData.dmppn_global.valeur_heures || 0 }} heures</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-warning-light rounded">
                                    <i class="bi bi-water text-warning fs-24"></i>
                                </div>
                                <span class="badge bg-warning">Rade</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ kpiData.dmppn_global.duree_rade_jours || 0 }} jours</h3>
                            <p class="text-muted mb-5">Temps en Rade</p>
                            <small class="text-primary fw-medium">{{ (kpiData.dmppn_global.ratio_rade_pct || 0).toFixed(1) }}%
                                du total</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-success-light rounded">
                                    <i class="bi bi-building text-success fs-24"></i>
                                </div>
                                <span class="badge bg-success">Quai</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ kpiData.dmppn_global.duree_quai_jours || 0 }} jours</h3>
                            <p class="text-muted mb-5">Temps à Quai</p>
                            <small class="text-success fw-medium">{{ (kpiData.dmppn_global.ratio_quai_pct || 0).toFixed(1) }}%
                                du total</small>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-15">
                    <div class="card border stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex justify-content-between align-items-start mb-10">
                                <div class="icon-box bg-info-light rounded">
                                    <i class="bi bi-ship text-info fs-24"></i>
                                </div>
                                <span class="badge bg-secondary">Total</span>
                            </div>
                            <h3 class="fw-bold mb-5">{{ kpiData.dmppn_global.nombre_passages || 0 }}</h3>
                            <p class="text-muted mb-5">Passages</p>
                            <small class="text-muted">Min: {{ kpiData.dmppn_global.duree_min_heures || 0 }}h | Max: {{
                                kpiData.dmppn_global.duree_max_heures || 0 }}h</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Évolution temporelle -->
            <div class="row mb-20">
                <!-- Graphique ligne -->
                <div class="col-lg-8 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Évolution du DMPPN Mensuel</h5>
                            <div id="evolutionChart">
                                <apexchart type="line" height="350" :options="evolutionChartOptions"
                                    :series="evolutionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ratio Rade/Quai -->
                <div class="col-lg-4 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Répartition Rade/Quai</h5>
                            <div id="ratioChart">
                                <apexchart type="donut" height="300" :options="ratioChartOptions"
                                    :series="ratioChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Graphique par type de navire -->
            <div class="row mb-20">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">DMPPN par Type de Navire</h5>
                            <div id="typeNavireChart">
                                <apexchart type="bar" height="400" :options="typeNavireChartOptions"
                                    :series="typeNavireChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse détaillée par type -->
            <div class="mb-20" v-if="kpiData.dmppn_par_type_navire?.length">
                <h5 class="fw-bold mb-15">Analyse Détaillée par Type de Navire</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th class="text-center">DMPPN</th>
                                <th class="text-center">Rade</th>
                                <th class="text-center">Quai</th>
                                <th class="text-center">Ratio Rade</th>
                                <th class="text-center">Passages</th>
                                <th class="text-center">Min-Max (h)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="type in kpiData.dmppn_par_type_navire" :key="type.type_navire">
                                <td class="fw-medium">
                                    <i class="bi bi-ship me-2"></i>{{ type.type_navire }}
                                </td>
                                <td class="text-center">
                                    <span class="badge bg-primary">{{ type.dmppn_jours }} j</span>
                                </td>
                                <td class="text-center">{{ type.duree_rade_jours }} j</td>
                                <td class="text-center">{{ type.duree_quai_jours }} j</td>
                                <td class="text-center">
                                    <div class="progress" style="height: 20px; min-width: 100px;">
                                        <div class="progress-bar bg-warning" :style="{ width: type.ratio_rade_pct + '%' }">
                                            {{ type.ratio_rade_pct.toFixed(1) }}%
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">{{ type.nombre_passages }}</td>
                                <td class="text-center">
                                    <small class="text-muted">{{ type.duree_min_heures }} - {{ type.duree_max_heures
                                        }}</small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Distribution des délais -->
            <div class="row mb-20" v-if="kpiData.distribution_delais">
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

                <div class="col-lg-7 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Répartition des Passages par Délai</h5>
                            <div id="distributionChart">
                                <apexchart type="pie" height="350" :options="distributionChartOptions"
                                    :series="distributionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyses diverses -->
            <div class="row mb-20">
                <!-- Par Port -->
                <div class="col-lg-6 mb-20" v-if="kpiData.analyse_par_port?.length">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Analyse par Port</h5>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Port</th>
                                            <th class="text-center">DMPPN</th>
                                            <th class="text-center">Passages</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="port in kpiData.analyse_par_port" :key="port.code_port">
                                            <td class="fw-medium">{{ port.nom_port }}</td>
                                            <td class="text-center">
                                                <span class="badge bg-info">{{ port.dmppn_jours }} j</span>
                                            </td>
                                            <td class="text-center">{{ port.nombre_passages }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Par Pavillon -->
                <div class="col-lg-6 mb-20" v-if="kpiData.analyse_par_pavillon?.length">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Top 5 Pavillons</h5>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Pavillon</th>
                                            <th class="text-center">DMPPN</th>
                                            <th class="text-center">Passages</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="pav in kpiData.analyse_par_pavillon.slice(0, 5)" :key="pav.pavillon">
                                            <td class="fw-medium">
                                                <span class="badge bg-secondary">{{ pav.pavillon }}</span>
                                            </td>
                                            <td class="text-center">{{ pav.dmppn_jours }} j</td>
                                            <td class="text-center">{{ pav.nombre_passages }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse par classe de jauge -->
            <div class="row mb-20" v-if="kpiData.analyse_par_classe_jauge?.length">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">DMPPN par Classe de Jauge</h5>
                            <div id="jaugeChart">
                                <apexchart type="bar" height="350" :options="jaugeChartOptions"
                                    :series="jaugeChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Goulots d'étranglement -->
            <div class="row mb-20" v-if="kpiData.goulots_etranglement?.length">
                <div class="col-12">
                    <div class="card border border-warning">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="bi bi-exclamation-triangle text-warning me-2"></i>
                                Goulots d'Étranglement Identifiés
                            </h5>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Port</th>
                                            <th class="text-center">Cas de Congestion</th>
                                            <th class="text-center">Durée Rade Moyenne</th>
                                            <th class="text-center">Ratio Rade Moyen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="goulot in kpiData.goulots_etranglement" :key="goulot.code_port">
                                            <td class="fw-medium">{{ goulot.nom_port }}</td>
                                            <td class="text-center">
                                                <span class="badge bg-danger">{{ goulot.nombre_cas }}</span>
                                            </td>
                                            <td class="text-center">{{ goulot.duree_rade_moyenne_jours }} jours</td>
                                            <td class="text-center">
                                                <span class="badge bg-warning">{{ goulot.ratio_rade_moyen_pct.toFixed(1)
                                                    }}%</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Navires -->
            <div class="row mb-20">
                <div class="col-lg-6 mb-20" v-if="kpiData.top_navires_lents?.length">
                    <div class="card border border-danger h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="bi bi-arrow-down-circle text-danger me-2"></i>
                                Top Navires Lents
                            </h5>
                            <div class="list-group">
                                <div class="list-group-item" v-for="(navire, index) in kpiData.top_navires_lents"
                                    :key="navire.imo_number">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 class="mb-5 fw-bold">#{{ index + 1 }} {{ navire.nom_navire }}</h6>
                                            <small class="text-muted">
                                                {{ navire.type_navire }} | IMO: {{ navire.imo_number }} | {{
                                                    navire.nombre_passages }} passage(s)
                                            </small>
                                        </div>
                                        <span class="badge bg-danger fs-14">{{ navire.dmppn_jours }} j</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-20" v-if="kpiData.top_navires_rapides?.length">
                    <div class="card border border-success h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="bi bi-arrow-up-circle text-success me-2"></i>
                                Top Navires Rapides
                            </h5>
                            <div class="list-group">
                                <div class="list-group-item" v-for="(navire, index) in kpiData.top_navires_rapides"
                                    :key="navire.imo_number">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 class="mb-5 fw-bold">#{{ index + 1 }} {{ navire.nom_navire }}</h6>
                                            <small class="text-muted">
                                                {{ navire.type_navire }} | IMO: {{ navire.imo_number }} | {{
                                                    navire.nombre_passages }} passage(s)
                                            </small>
                                        </div>
                                        <span class="badge bg-success fs-14">{{ navire.dmppn_jours }} j</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recommandations -->
            <div class="mb-20" v-if="kpiData.recommandations?.length">
                <h5 class="fw-bold mb-15">
                    <i class="bi bi-lightbulb text-warning me-2"></i>
                    Recommandations d'Amélioration
                </h5>
                <div class="row">
                    <div class="col-lg-6 mb-15" v-for="(rec, index) in kpiData.recommandations" :key="index">
                        <div class="card h-100" :class="getRecommandationBorderClass(rec.priorite)">
                            <div class="card-body p-20">
                                <div class="d-flex justify-content-between align-items-start mb-10">
                                    <span class="badge" :class="getPrioriteBadgeClass(rec.priorite)">
                                        {{ rec.priorite }}
                                    </span>
                                    <span class="badge bg-secondary">{{ rec.categorie }}</span>
                                </div>
                                <h6 class="fw-bold mb-10">{{ rec.probleme }}</h6>
                                <p class="mb-10">
                                    <strong>Action:</strong> {{ rec.action }}
                                </p>
                                <p class="text-success mb-0">
                                    <i class="bi bi-graph-up-arrow me-1"></i>
                                    <strong>Impact:</strong> {{ rec.impact_estime }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statistiques -->
            <div class="card border" v-if="kpiData.statistiques">
                <div class="card-body p-20">
                    <h5 class="fw-bold mb-15">Statistiques Globales</h5>
                    <div class="row text-center">
                        <div class="col-md-3">
                            <h3 class="text-primary fw-bold">{{ kpiData.statistiques.nombre_total_passages }}</h3>
                            <p class="text-muted mb-0">Total Passages</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-info fw-bold">{{ kpiData.statistiques.nombre_types_navire }}</h3>
                            <p class="text-muted mb-0">Types de Navire</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-success fw-bold">{{ kpiData.statistiques.nombre_ports }}</h3>
                            <p class="text-muted mb-0">Ports</p>
                        </div>
                        <div class="col-md-3">
                            <h3 class="text-warning fw-bold">{{ kpiData.statistiques.nombre_pavillons }}</h3>
                            <p class="text-muted mb-0">Pavillons</p>
                        </div>
                    </div>
                </div>
            </div>
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
    couleur: string;
    description: string;
}

interface DmppnGlobal {
    valeur_jours: number;
    valeur_heures: number;
    unite: string;
    duree_rade_jours: number;
    duree_quai_jours: number;
    ratio_rade_pct: number;
    ratio_quai_pct: number;
    duree_min_heures: number;
    duree_max_heures: number;
    nombre_passages: number;
    niveau_performance: NiveauPerformance;
}

interface DmppnParTypeNavire {
    type_navire: string;
    dmppn_jours: number;
    dmppn_heures: number;
    duree_rade_jours: number;
    duree_rade_heures: number;
    duree_quai_jours: number;
    duree_quai_heures: number;
    ratio_rade_pct: number;
    ratio_quai_pct: number;
    nombre_passages: number;
    duree_min_heures: number;
    duree_max_heures: number;
}

interface DmppnParAnnee {
    annee: number;
    dmppn_jours: number;
    duree_rade_jours: number;
    duree_quai_jours: number;
    nombre_passages: number;
}

interface DmppnParMois {
    annee: number;
    mois: number;
    mois_nom: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface DmppnParSemaine {
    annee: number;
    semaine: number;
    dmppn_jours: number;
    nombre_passages: number;
}

interface AnalyseParPort {
    code_port: string;
    nom_port: string;
    dmppn_jours: number;
    duree_rade_jours: number;
    duree_quai_jours: number;
    nombre_passages: number;
}

interface AnalyseParPavillon {
    pavillon: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface AnalyseParArmateur {
    armateur: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface AnalyseParTypeOperation {
    type_operation: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface AnalyseParClasseJauge {
    classe: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface DistributionDelais {
    moins_12h: { nombre: number; label: string };
    "12_24h": { nombre: number; label: string };
    "1_2_jours": { nombre: number; label: string };
    "2_3_jours": { nombre: number; label: string };
    "3_7_jours": { nombre: number; label: string };
    plus_7_jours: { nombre: number; label: string };
}

interface GoulotEtranglement {
    code_port: string;
    nom_port: string;
    nombre_cas: number;
    duree_rade_moyenne_jours: number;
    ratio_rade_moyen_pct: number;
}

interface TopNavire {
    nom_navire: string;
    type_navire: string;
    imo_number: string;
    dmppn_jours: number;
    nombre_passages: number;
}

interface Recommandation {
    priorite: string;
    categorie: string;
    probleme: string;
    action: string;
    impact_estime: string;
}

interface Statistiques {
    nombre_total_passages: number;
    nombre_types_navire: number;
    nombre_ports: number;
    nombre_pavillons: number;
}

interface KpiData {
    kpi: string;
    periode: {
        debut: string;
        fin: string;
    };
    filtres: {
        type_navire: string | null;
        pavillon: string | null;
        port: string | null;
        type_operation: string | null;
        armateur: string | null;
        jauge_min: number | null;
        jauge_max: number | null;
    };
    dmppn_global: DmppnGlobal;
    dmppn_par_type_navire: DmppnParTypeNavire[];
    dmppn_par_annee: DmppnParAnnee[];
    dmppn_par_mois: DmppnParMois[];
    dmppn_par_semaine: DmppnParSemaine[];
    analyse_par_port: AnalyseParPort[];
    analyse_par_pavillon: AnalyseParPavillon[];
    analyse_par_armateur: AnalyseParArmateur[];
    analyse_par_type_operation: AnalyseParTypeOperation[];
    analyse_par_classe_jauge: AnalyseParClasseJauge[];
    distribution_delais: DistributionDelais;
    goulots_etranglement: GoulotEtranglement[];
    top_navires_lents: TopNavire[];
    top_navires_rapides: TopNavire[];
    recommandations: Recommandation[];
    statistiques: Statistiques;
}

export default defineComponent({
    name: "DmppnKpi",
    setup() {
        const kpiData = ref<KpiData | null>(null);
        const loading = ref(false);
        const error = ref("");

        const filters = ref({
            dateDebut: getDefaultStartDate(),
            dateFin: getTodayDate(),
            typeNavire: null as string | null,
            pavillon: null as string | null,
            port: null as string | null,
            typeOperation: null as string | null,
            armateur: null as string | null,
            jaugeMin: null as number | null,
            jaugeMax: null as number | null,
        });

        function getTodayDate(): string {
            return new Date().toISOString().split('T')[0];
        }

        function getDefaultStartDate(): string {
            const date = new Date();
            date.setMonth(date.getMonth() - 3);
            return date.toISOString().split('T')[0];
        }

        // Charts - Evolution
        const evolutionChartSeries = computed(() => {
            if (!kpiData.value?.dmppn_par_mois) return [];
            return [{
                name: 'DMPPN',
                data: kpiData.value.dmppn_par_mois.map(m => m.dmppn_jours)
            }, {
                name: 'Passages',
                data: kpiData.value.dmppn_par_mois.map(m => m.nombre_passages)
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
                categories: kpiData.value?.dmppn_par_mois?.map(m => m.mois_nom) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                        fontSize: '14px',
                    }
                }
            },
            yaxis: [{
                title: { text: 'DMPPN (jours)' },
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            }, {
                opposite: true,
                title: { text: 'Nombre de passages' }
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

        // Ratio Rade/Quai
        const ratioChartOptions = computed(() => ({
            chart: {
                type: 'donut',
                height: 300
            },
            labels: ['Temps en Rade', 'Temps à Quai'],
            colors: ['#ffc107', '#198754'],
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
                                label: 'Répartition',
                                fontFamily: 'Red Hat Display, sans-serif',
                            }
                        }
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${value.toFixed(2)} jours`
                }
            }
        }));

        const ratioChartSeries = computed(() => {
            const global = kpiData.value?.dmppn_global;
            if (!global) return [0, 0];
            return [global.duree_rade_jours, global.duree_quai_jours];
        });

        // Type Navire Chart
        const typeNavireChartOptions = computed(() => ({
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
                formatter: (val: number) => `${val.toFixed(2)}j`,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#304758'],
                    fontFamily: 'Red Hat Display, sans-serif',
                }
            },
            xaxis: {
                categories: kpiData.value?.dmppn_par_type_navire?.map(t => t.type_navire) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'DMPPN (jours)',
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

        const typeNavireChartSeries = computed(() => [{
            name: 'DMPPN',
            data: kpiData.value?.dmppn_par_type_navire?.map(t => t.dmppn_jours) || []
        }]);

        // Distribution Chart
        const distributionChartOptions = computed(() => ({
            chart: {
                type: 'pie',
                height: 350
            },
            labels: Object.values(kpiData.value?.distribution_delais || {}).map((d: any) => d.label),
            colors: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545', '#6c757d'],
            legend: {
                position: 'bottom',
                fontFamily: 'Red Hat Display, sans-serif',
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${value} passages`
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    }
                }
            }]
        }));

        const distributionChartSeries = computed(() => {
            return Object.values(kpiData.value?.distribution_delais || {}).map((d: any) => d.nombre);
        });

        // Jauge Chart
        const jaugeChartOptions = computed(() => ({
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: true }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val: number) => `${val.toFixed(2)}j`,
                offsetX: 30,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Red Hat Display, sans-serif',
                }
            },
            xaxis: {
                categories: kpiData.value?.analyse_par_classe_jauge?.map(j => j.classe) || [],
                title: {
                    text: 'DMPPN (jours)'
                }
            },
            colors: ['#0dcaf0'],
            grid: {
                borderColor: '#d9e9ef',
            }
        }));

        const jaugeChartSeries = computed(() => [{
            name: 'DMPPN',
            data: kpiData.value?.analyse_par_classe_jauge?.map(j => j.dmppn_jours) || []
        }]);

        const fetchKpiData = async () => {
            loading.value = true;
            error.value = "";
            try {
                let url = ApiService.baseUrlBi + "/kpi/dmppn/";
                const params = new URLSearchParams();

                if (filters.value.dateDebut) params.append('date_debut', filters.value.dateDebut);
                if (filters.value.dateFin) params.append('date_fin', filters.value.dateFin);
                if (filters.value.typeNavire) params.append('type_navire', filters.value.typeNavire);
                if (filters.value.pavillon) params.append('pavillon', filters.value.pavillon);
                if (filters.value.port) params.append('port', filters.value.port);
                if (filters.value.typeOperation) params.append('type_operation', filters.value.typeOperation);
                if (filters.value.armateur) params.append('armateur', filters.value.armateur);
                if (filters.value.jaugeMin !== null) params.append('jauge_min', String(filters.value.jaugeMin));
                if (filters.value.jaugeMax !== null) params.append('jauge_max', String(filters.value.jaugeMax));

                if (params.toString()) url += '?' + params.toString();

                const response = await axios.get(url);
                kpiData.value = response.data;
                console.log("Données KPI chargées:", kpiData.value);
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
            filters.value.typeNavire = null;
            filters.value.pavillon = null;
            filters.value.port = null;
            filters.value.typeOperation = null;
            filters.value.armateur = null;
            filters.value.jaugeMin = null;
            filters.value.jaugeMax = null;
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

        const getPrioriteBadgeClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "bg-danger",
                HAUTE: "bg-warning",
                MOYENNE: "bg-info",
                BASSE: "bg-secondary"
            };
            return classes[priorite] || "bg-secondary";
        };

        const getRecommandationBorderClass = (priorite: string) => {
            const classes: Record<string, string> = {
                CRITIQUE: "border-danger",
                HAUTE: "border-warning",
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
            ratioChartOptions,
            ratioChartSeries,
            typeNavireChartOptions,
            typeNavireChartSeries,
            distributionChartOptions,
            distributionChartSeries,
            jaugeChartOptions,
            jaugeChartSeries,
            getTodayDate,
            applyFilters,
            resetFilters,
            getBadgeClass,
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

.bg-info-light {
    background-color: rgba(13, 202, 240, 0.1);
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

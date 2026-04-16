<template>
    <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <!-- En-tête -->
            <div class="mb-15 d-sm-flex align-items-center justify-content-between">
                <div class="title">
                    <h4 class="fw-bold mb-10">{{ kpiData?.kpi }}</h4>
                    <span class="fw-medium text-muted fs-13 d-block mb-5">
                        Période: {{ kpiData?.periode?.date_debut }} - {{ kpiData?.periode?.date_fin }}
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
                                    <button @click="resetFilters" class="btn btn-outline-secondary ms-10"
                                        :disabled="loading">
                                        <i class="flaticon-refresh me-5"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-15">
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="filters.marchandisesEssentielles"
                                        id="essentielles">
                                    <label class="form-check-label fw-medium" for="essentielles">
                                        Marchandises essentielles uniquement
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- KPI Global -->
            <div class="row mt-20" v-if="kpiData?.crme_global">
                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20 text-center">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-primary">
                                    <i class="flaticon-money fs-30 text-primary"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">CRME Moyen</span>
                                    <h3 class="fw-black mb-5">{{ formatCurrency(kpiData.crme_global.valeur) }}</h3>
                                    <div class="mt-10 fs-8">
                                        <span class="text-success">Min: {{ formatCurrency(kpiData.crme_global.cout_min)
                                        }}</span> |
                                        <span class="text-danger">Max: {{ formatCurrency(kpiData.crme_global.cout_max)
                                        }}</span>
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
                                <div class="icon position-relative rounded-circle text-center text-success">
                                    <i class="flaticon-coins fs-30 text-success"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">Coût Total</span>
                                    <h3 class="fw-black mb-5">{{ formatCurrency(kpiData.crme_global.cout_total) }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20 text-center">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-info">
                                    <i class="flaticon-box fs-30 text-info"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">Mouvements</span>
                                    <h3 class="fw-black mb-5">{{ kpiData.crme_global.nombre_mouvements }}</h3>
                                    <div class="mt-10 fs-8">
                                        <span class="text-muted">{{ formatNumber(kpiData.crme_global.poids_total_tonnes)
                                        }} tonnes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 mb-20" v-if="kpiData?.analyse_rentabilite">
                    <div class="card border rounded stats-box h-100">
                        <div class="card-body p-20">
                            <div class="d-flex align-items-center">
                                <div class="icon position-relative rounded-circle text-center text-warning">
                                    <i class="flaticon-percentage fs-30 text-warning"></i>
                                </div>
                                <div class="title ms-15">
                                    <span class="text-muted fs-8">Taux de Marge</span>
                                    <h3 class="fw-black mb-5">{{ kpiData.analyse_rentabilite.taux_marge.toFixed(1) }}%
                                    </h3>
                                    <div class="mt-10">
                                        <span class="badge"
                                            :class="getMargeBadgeClass(kpiData.analyse_rentabilite.taux_marge)">
                                            Marge: {{ formatCurrency(kpiData.analyse_rentabilite.marge_totale) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Graphique d'évolution par mois -->
            <div class="row mt-30" v-if="kpiData?.crme_par_mois?.length">
                <div class="col-lg-8 mb-20">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Évolution du CRME par Mois</h5>
                            <div id="crmeEvolutionChart">
                                <apexchart type="line" height="350" :options="evolutionChartOptions"
                                    :series="evolutionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Distribution des coûts -->
                <div class="col-lg-4 mb-20" v-if="kpiData?.distribution_couts">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">Distribution des Coûts</h5>
                            <div id="distributionChart">
                                <apexchart type="donut" height="300" :options="distributionChartOptions"
                                    :series="distributionChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Graphiques par catégorie et type de mouvement -->
            <div class="row mt-30" v-if="kpiData?.crme_par_categorie?.length">
                <div class="col-lg-6 mb-20">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">CRME par Catégorie</h5>
                            <div id="categorieChart">
                                <apexchart type="bar" height="350" :options="categorieChartOptions"
                                    :series="categorieChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-20" v-if="kpiData?.crme_par_type_mouvement?.length">
                    <div class="card border h-100">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-20">CRME par Type de Mouvement</h5>
                            <div id="typeMouvementChart">
                                <apexchart type="pie" height="350" :options="typeMouvementChartOptions"
                                    :series="typeMouvementChartSeries">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse par catégorie détaillée -->
            <div class="mt-30" v-if="kpiData?.crme_par_categorie?.length">
                <h5 class="fw-bold mb-15">Analyse Détaillée par Catégorie</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th class="text-center">CRME</th>
                                <th class="text-center">Coût Total</th>
                                <th class="text-center">Mouvements</th>
                                <th class="text-center">Poids (tonnes)</th>
                                <th class="text-center">Coût/Tonne</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cat in kpiData.crme_par_categorie" :key="cat.categorie_marchandise">
                                <td class="fw-medium">{{ cat.categorie_marchandise }}</td>
                                <td class="text-center">
                                    <span class="badge" :class="getCrmeBadgeClass(cat.crme_moyen)">
                                        {{ formatCurrency(cat.crme_moyen) }}
                                    </span>
                                </td>
                                <td class="text-center">{{ formatCurrency(cat.crme_total) }}</td>
                                <td class="text-center">{{ cat.nombre_mouvements }}</td>
                                <td class="text-center">{{ formatNumber(cat.poids_total) }}</td>
                                <td class="text-center">
                                    {{ formatCurrency(cat.crme_total / cat.poids_total) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Analyse par port -->
            <div class="row mt-30" v-if="kpiData?.crme_par_port?.length">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">Analyse par Port</h5>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Nom du Port</th>
                                            <th class="text-center">CRME</th>
                                            <th class="text-center">Coût Total</th>
                                            <th class="text-center">Mouvements</th>
                                            <th class="text-center">Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="port in kpiData.crme_par_port" :key="port.dim_port__code_port">
                                            <td class="fw-medium">{{ port.dim_port__code_port }}</td>
                                            <td>{{ port.dim_port__nom_port }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="getCrmeBadgeClass(port.crme_moyen)">
                                                    {{ formatCurrency(port.crme_moyen) }}
                                                </span>
                                            </td>
                                            <td class="text-center">-</td>
                                            <td class="text-center">{{ port.nombre_mouvements }}</td>
                                            <td class="text-center">
                                                <div class="progress" style="height: 20px;">
                                                    <div class="progress-bar" :class="getProgressBarClass(port.crme_moyen)"
                                                        :style="{ width: getProgressWidth(port.crme_moyen) + '%' }">
                                                        {{ getProgressWidth(port.crme_moyen) }}%
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top catégories par CRME -->
            <div class="row mt-30">
                <div class="col-lg-12 mb-20" v-if="kpiData?.top_categories?.length">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="flaticon-up-arrow me-10"></i>Top Catégories par Coût de Revient
                            </h5>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Catégorie</th>
                                            <th class="text-center">CRME Moyen</th>
                                            <th class="text-center">CRME Total</th>
                                            <th class="text-center">Mouvements</th>
                                            <th class="text-center">Poids Total (tonnes)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in kpiData.top_categories" :key="index">
                                            <td><span class="badge bg-primary">{{ index + 1 }}</span></td>
                                            <td class="fw-medium">{{ item.categorie_marchandise }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="getCrmeBadgeClass(item.crme_moyen)">
                                                    {{ formatCurrency(item.crme_moyen) }}
                                                </span>
                                            </td>
                                            <td class="text-center">{{ formatCurrency(item.crme_total) }}</td>
                                            <td class="text-center">{{ item.nombre_mouvements }}</td>
                                            <td class="text-center">{{ formatNumber(item.poids_total) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analyse de rentabilité -->
            <div class="row mt-30" v-if="kpiData?.analyse_rentabilite">
                <div class="col-12">
                    <div class="card border border-success">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15 text-success">
                                <i class="flaticon-chart me-10"></i>Analyse de Rentabilité
                            </h5>
                            <div class="row">
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold text-primary">{{
                                            formatCurrency(kpiData.analyse_rentabilite.cout_revient_total) }}</h5>
                                        <span class="text-muted fs-13">Coût de revient total</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold text-success">{{
                                            formatCurrency(kpiData.analyse_rentabilite.valeur_estimee_totale) }}</h5>
                                        <span class="text-muted fs-13">Valeur estimée totale</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold text-warning">{{
                                            formatCurrency(kpiData.analyse_rentabilite.marge_totale) }}</h5>
                                        <span class="text-muted fs-13">Marge totale</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold" :class="getMargeBadgeClass(kpiData.analyse_rentabilite.taux_marge).replace('bg-', 'text-')">
                                            {{ kpiData.analyse_rentabilite.taux_marge.toFixed(2) }}%
                                        </h5>
                                        <span class="text-muted fs-13">Taux de marge</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Indicateurs clés - Section commentée car non disponible dans la nouvelle API -->
            <!-- <div class="row mt-30" v-if="kpiData?.indicateurs_cles">
                <div class="col-12">
                    <div class="card border">
                        <div class="card-body p-20">
                            <h5 class="fw-bold mb-15">
                                <i class="flaticon-dashboard me-10"></i>Indicateurs Clés de Performance
                            </h5>
                            <div class="row">
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold text-primary">{{
                                            formatCurrency(kpiData.indicateurs_cles.cout_revient_moyen_par_tonne) }}</h5>
                                        <span class="text-muted fs-13">CRME/Tonne</span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold text-success">{{ kpiData.indicateurs_cles.taux_marge_moyen.toFixed(1) }}%</h5>
                                        <span class="text-muted fs-13">Taux marge moyen</span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <span class="badge fs-16" :class="getRentabiliteBadgeClass(kpiData.indicateurs_cles.rentabilite)">
                                            {{ kpiData.indicateurs_cles.rentabilite }}
                                        </span>
                                        <p class="mb-0 mt-10 text-muted fs-13">Rentabilité</p>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <span class="badge fs-16" :class="kpiData.indicateurs_cles.alerte_cout_eleve ? 'bg-danger' : 'bg-success'">
                                            {{ kpiData.indicateurs_cles.alerte_cout_eleve ? 'OUI' : 'NON' }}
                                        </span>
                                        <p class="mb-0 mt-10 text-muted fs-13">Alerte coût élevé</p>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <span class="badge fs-16" :class="kpiData.indicateurs_cles.alerte_marge_faible ? 'bg-danger' : 'bg-success'">
                                            {{ kpiData.indicateurs_cles.alerte_marge_faible ? 'OUI' : 'NON' }}
                                        </span>
                                        <p class="mb-0 mt-10 text-muted fs-13">Alerte marge faible</p>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-6 mb-15">
                                    <div class="text-center p-15 border rounded">
                                        <h5 class="fw-bold">{{ kpiData.indicateurs_cles.categories_a_risque.length }}</h5>
                                        <span class="text-muted fs-13">Catégories à risque</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-15" v-if="kpiData.indicateurs_cles.categories_a_risque.length">
                                <div class="col-12">
                                    <div class="alert alert-warning mb-0">
                                        <strong>Catégories à risque:</strong>
                                        <span v-for="cat in kpiData.indicateurs_cles.categories_a_risque" :key="cat"
                                            class="badge bg-warning text-dark ms-5">
                                            {{ cat }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-10" v-if="kpiData.indicateurs_cles.categories_performantes.length">
                                <div class="col-12">
                                    <div class="alert alert-success mb-0">
                                        <strong>Catégories performantes:</strong>
                                        <span v-for="cat in kpiData.indicateurs_cles.categories_performantes"
                                            :key="cat" class="badge bg-success ms-5">
                                            {{ cat }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- Recommandations -->
            <div class="mt-30" v-if="kpiData?.recommandations?.length">
                <h5 class="fw-bold mb-15">Recommandations Stratégiques</h5>
                <div class="row">
                    <div class="col-lg-12 mb-15" v-for="(recommandation, index) in kpiData.recommandations"
                        :key="index">
                        <div class="card border" :class="getRecommandationBorderClass(recommandation.priorite)">
                            <div class="card-body p-20">
                                <div class="d-flex align-items-center mb-10">
                                    <span class="badge me-10" :class="getPrioriteBadgeClass(recommandation.priorite)">
                                        {{ recommandation.priorite }}
                                    </span>
                                    <h6 class="fw-bold mb-0">{{ recommandation.titre }}</h6>
                                </div>
                                <p class="mb-10">{{ recommandation.description }}</p>

                                <!-- Actions -->
                                <div v-if="recommandation.actions?.length" class="mb-15">
                                    <small class="text-muted fw-bold">Actions recommandées:</small>
                                    <ul class="mt-5">
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

interface CrmeGlobal {
    valeur: number;
    unite: string;
    cout_min: number;
    cout_max: number;
    cout_total: number;
    nombre_mouvements: number;
    poids_total_tonnes: number;
}

interface CrmeParAnnee {
    annee: number;
    crme_moyen: number;
    nombre_mouvements: number;
    crme_total: number;
}

interface CrmeParMois {
    annee: number;
    mois: number;
    crme_moyen: number;
    nombre_mouvements: number;
}

interface CrmeParCategorie {
    categorie_marchandise: string;
    crme_moyen: number;
    nombre_mouvements: number;
    crme_total: number;
    poids_total: number;
}

interface CrmeParTypeMouvement {
    type_mouvement: string;
    crme_moyen: number;
    nombre_mouvements: number;
}

interface CrmeParPort {
    dim_port__code_port: string;
    dim_port__nom_port: string;
    crme_moyen: number;
    nombre_mouvements: number;
}

interface TopCategorie {
    categorie_marchandise: string;
    crme_moyen: number;
    nombre_mouvements: number;
    crme_total: number;
    poids_total: number;
}

interface AnalyseRentabilite {
    cout_revient_total: number;
    valeur_estimee_totale: number;
    marge_totale: number;
    taux_marge: number;
}

interface DistributionCouts {
    moins_100k: number;
    "100k_500k": number;
    "500k_1M": number;
    "1M_5M": number;
    plus_5M: number;
}

interface Recommandation {
    priorite: string;
    titre: string;
    description: string;
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
        essentiel: boolean;
        port: string | null;
    };
    crme_global: CrmeGlobal;
    crme_par_annee: CrmeParAnnee[];
    crme_par_mois: CrmeParMois[];
    crme_par_categorie: CrmeParCategorie[];
    crme_par_port: CrmeParPort[];
    crme_par_type_mouvement: CrmeParTypeMouvement[];
    distribution_couts: DistributionCouts;
    analyse_rentabilite: AnalyseRentabilite;
    top_categories: TopCategorie[];
    recommandations: Recommandation[];
}

export default defineComponent({
    name: "CrmeKpi",
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
            marchandisesEssentielles: false,
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
            if (!kpiData.value?.crme_par_categorie) return [];
            return kpiData.value.crme_par_categorie.map((c: CrmeParCategorie) => c.categorie_marchandise);
        });

        const ports = computed(() => {
            if (!kpiData.value?.crme_par_port) return [];
            return kpiData.value.crme_par_port;
        });

        // Fonction utilitaire pour convertir le numéro de mois en nom
        function getMonthName(month: number): string {
            const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
            return months[month - 1] || '';
        }

        // Chart: Evolution par mois
        const evolutionChartSeries = computed(() => {
            if (!kpiData.value?.crme_par_mois) return [];
            return [{
                name: 'CRME Moyen',
                type: 'line',
                data: kpiData.value.crme_par_mois.map((m: CrmeParMois) => m.crme_moyen)
            }, {
                name: 'Mouvements',
                type: 'column',
                data: kpiData.value.crme_par_mois.map((m: CrmeParMois) => m.nombre_mouvements)
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
                width: [3, 0]
            },
            xaxis: {
                categories: kpiData.value?.crme_par_mois?.map((m: CrmeParMois) => getMonthName(m.mois)) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                        fontSize: '14px',
                    }
                }
            },
            yaxis: [{
                title: { text: 'CRME (FCFA)' },
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
            }
        }));

        // Chart: Distribution des coûts
        const distributionChartSeries = computed(() => {
            if (!kpiData.value?.distribution_couts) return [];
            const dist = kpiData.value.distribution_couts;
            return [
                dist.moins_100k,
                dist["100k_500k"],
                dist["500k_1M"],
                dist["1M_5M"],
                dist.plus_5M
            ];
        });

        const distributionChartOptions = computed(() => ({
            chart: {
                type: 'donut',
                height: 300
            },
            labels: ['< 100k', '100k-500k', '500k-1M', '1M-5M', '> 5M'],
            colors: ['#198754', '#0dcaf0', '#ffc107', '#fd7e14', '#dc3545'],
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
                                label: 'Total',
                                fontFamily: 'Red Hat Display, sans-serif',
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

        // Chart: CRME par catégorie
        const categorieChartSeries = computed(() => [{
            name: 'CRME Moyen',
            data: kpiData.value?.crme_par_categorie?.map((c: CrmeParCategorie) => c.crme_moyen) || []
        }]);

        const categorieChartOptions = computed(() => ({
            chart: {
                type: 'bar',
                height: 350,
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
                categories: kpiData.value?.crme_par_categorie?.map((c: CrmeParCategorie) => c.categorie_marchandise) || [],
                labels: {
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'CRME (FCFA)',
                    style: {
                        fontFamily: 'Red Hat Display, sans-serif',
                    }
                },
                labels: {
                    formatter: (value: number) => formatCurrency(value)
                }
            },
            colors: ['#070376FF'],
            grid: {
                borderColor: '#d9e9ef',
            }
        }));

        // Chart: CRME par type de mouvement
        const typeMouvementChartSeries = computed(() => {
            return kpiData.value?.crme_par_type_mouvement?.map((t: CrmeParTypeMouvement) => t.crme_moyen) || [];
        });

        const typeMouvementChartOptions = computed(() => ({
            chart: {
                type: 'pie',
                height: 350
            },
            labels: kpiData.value?.crme_par_type_mouvement?.map((t: CrmeParTypeMouvement) => t.type_mouvement) || [],
            colors: ['#070376FF', '#0dcaf0', '#ffc107'],
            legend: {
                position: 'bottom',
                fontFamily: 'Red Hat Display, sans-serif',
            },
            tooltip: {
                y: {
                    formatter: (value: number) => formatCurrency(value)
                }
            }
        }));

        const fetchKpiData = async () => {
            loading.value = true;
            error.value = "";
            try {
                let url = ApiService.baseUrlBi + "/kpi/crme/";
                const params = new URLSearchParams();

                if (filters.value.dateDebut) params.append('date_debut', filters.value.dateDebut);
                if (filters.value.dateFin) params.append('date_fin', filters.value.dateFin);
                if (filters.value.categorie) params.append('categorie', filters.value.categorie);
                if (filters.value.typeMouvement) params.append('type_mouvement', filters.value.typeMouvement);
                if (filters.value.port) params.append('port', filters.value.port);
                if (filters.value.marchandisesEssentielles) params.append('marchandises_essentielles_uniquement', 'true');

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
            filters.value.marchandisesEssentielles = false;
            fetchKpiData();
        };

        const formatCurrency = (value: number): string => {
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value) + ' FCFA';
        };

        const formatNumber = (num: number): string => {
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        };

        const getCrmeBadgeClass = (crme: number): string => {
            if (crme <= 100000) return "bg-success";
            if (crme <= 200000) return "bg-info";
            if (crme <= 300000) return "bg-warning";
            return "bg-danger";
        };

        const getMargeBadgeClass = (marge: number): string => {
            if (marge >= 30) return "bg-success";
            if (marge >= 20) return "bg-info";
            if (marge >= 10) return "bg-warning";
            return "bg-danger";
        };

        const getRentabiliteBadgeClass = (rentabilite: string): string => {
            const classes: Record<string, string> = {
                "EXCELLENT": "bg-success",
                "BONNE": "bg-success",
                "MOYENNE": "bg-info",
                "FAIBLE": "bg-warning",
                "MAUVAISE": "bg-danger"
            };
            return classes[rentabilite] || "bg-secondary";
        };

        const getPrioriteBadgeClass = (priorite: string): string => {
            const classes: Record<string, string> = {
                "HAUTE": "bg-danger",
                "MOYENNE": "bg-warning",
                "BASSE": "bg-info",
            };
            return classes[priorite] || "bg-secondary";
        };

        const getRecommandationBorderClass = (priorite: string): string => {
            const classes: Record<string, string> = {
                "HAUTE": "border-danger",
                "MOYENNE": "border-warning",
                "BASSE": "border-info",
            };
            return classes[priorite] || "";
        };

        const getProgressBarClass = (crme: number): string => {
            if (crme <= 100000) return "bg-success";
            if (crme <= 200000) return "bg-info";
            if (crme <= 300000) return "bg-warning";
            return "bg-danger";
        };

        const getProgressWidth = (crme: number): number => {
            const maxCrme = kpiData.value?.crme_global?.cout_max || 500000;
            return Math.min(100, Math.max(0, 100 - (crme / maxCrme * 100)));
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
            evolutionChartSeries,
            evolutionChartOptions,
            distributionChartSeries,
            distributionChartOptions,
            categorieChartSeries,
            categorieChartOptions,
            typeMouvementChartSeries,
            typeMouvementChartOptions,
            getTodayDate,
            applyFilters,
            resetFilters,
            formatCurrency,
            formatNumber,
            getCrmeBadgeClass,
            getMargeBadgeClass,
            getRentabiliteBadgeClass,
            getPrioriteBadgeClass,
            getRecommandationBorderClass,
            getProgressBarClass,
            getProgressWidth,
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

.table-responsive {
    max-height: 600px;
    overflow-y: auto;
}
</style>

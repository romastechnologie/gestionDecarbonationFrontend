<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">

      <div v-if="isLoading" class="text-center py-5">
        <span>Chargement...</span>
      </div>

      <div v-else-if="activity">
        <!-- Header -->
        <div class="d-flex align-items-center justify-content-between mb-20">
          <div>
            <p class="text-muted fs-13 mb-1">Activité</p>
            <h5 class="mb-0">#{{ activity.id.substring(0, 8).toUpperCase() }}</h5>
          </div>
          <div class="d-flex gap-2">
            <span :class="modeBadgeClass">{{ activity.mode }}</span>
            <span :class="statusBadgeClass">{{ activity.status }}</span>
          </div>
        </div>

        <!-- Période -->
        <div class="card border mb-15 p-15">
          <p class="text-uppercase text-muted fs-12 fw-semibold mb-10">Période</p>
          <div class="row">
            <div class="col-md-4">
              <label class="text-muted fs-12">Début</label>
              <p class="fw-semibold">{{ formatDate(activity.periodStart) }}</p>
            </div>
            <div class="col-md-4">
              <label class="text-muted fs-12">Fin</label>
              <p class="fw-semibold">{{ formatDate(activity.periodEnd) }}</p>
            </div>
            <div class="col-md-4">
              <label class="text-muted fs-12">Créée le</label>
              <p class="fw-semibold">{{ formatDate(activity.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Trajet -->
        <div class="card border mb-15 p-15">
          <p class="text-uppercase text-muted fs-12 fw-semibold mb-10">Trajet</p>
          <div class="d-flex align-items-center gap-3">
            <div class="bg-light rounded p-10 flex-fill">
              <p class="text-muted fs-11 mb-1">Source</p>
              <p class="fw-semibold mb-0">{{ activity.installationFrom?.name ?? '—' }}</p>
              <p class="text-muted fs-12 mb-0">{{ activity.installationFrom?.city }}, {{ activity.installationFrom?.countryCode }}</p>
            </div>
            <span class="fs-18">→</span>
            <div class="bg-light rounded p-10 flex-fill">
              <p class="text-muted fs-11 mb-1">Destination</p>
              <p class="fw-semibold mb-0">{{ activity.installationTo?.name ?? '—' }}</p>
              <p class="text-muted fs-12 mb-0">{{ activity.installationTo?.city }}, {{ activity.installationTo?.countryCode }}</p>
            </div>
          </div>
        </div>

        <!-- Transport -->
        <div class="card border mb-15 p-15">
          <p class="text-uppercase text-muted fs-12 fw-semibold mb-10">Transport</p>
          <div class="d-flex align-items-center gap-3" v-if="activity.transportAsset">
            <div class="bg-info bg-opacity-10 rounded p-10" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:20px;">
              {{ activity.mode === 'AIR' ? '✈' : '🚢' }}
            </div>
            <div>
              <p class="fw-semibold mb-0">{{ activity.transportAsset.name }}</p>
              <p class="text-muted fs-12 mb-0">{{ activity.transportAsset.identifier }} · {{ activity.transportAsset.category }}</p>
            </div>
          </div>
          <span v-else class="text-muted fs-13">—</span>
        </div>

        <!-- Données transport -->
        <div class="card border mb-15 p-15">
          <p class="text-uppercase text-muted fs-12 fw-semibold mb-10">Données de transport</p>
          <div class="row">
            <div class="col-md-3"><label class="text-muted fs-12">Masse cargo</label><p class="fw-semibold">{{ activity.cargoMassT != null ? activity.cargoMassT + ' T' : '—' }}</p></div>
            <div class="col-md-3"><label class="text-muted fs-12">Distance</label><p class="fw-semibold">{{ activity.distanceKm != null ? activity.distanceKm + ' km' : '—' }}</p></div>
            <div class="col-md-3"><label class="text-muted fs-12">Type carburant</label><p class="fw-semibold">{{ activity.fuelType ?? '—' }}</p></div>
            <div class="col-md-3"><label class="text-muted fs-12">Masse carburant</label><p class="fw-semibold">{{ activity.fuelMassT != null ? activity.fuelMassT + ''+ activity.fuelMassUnit : '—' }}</p></div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="d-flex gap-2 mt-20">
          <router-link :to="`/editActivity/${activity.id}`" class="btn btn-warning">Modifier</router-link>
          <router-link to="/listActivity" class="btn btn-secondary">Retour</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';
import { error } from '@/utils/utils';

export default defineComponent({
  name: 'DetailActivity',
  setup() {
    const route = useRoute();
    const activity = ref<any>(null);
    const isLoading = ref(true);

    const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('fr-FR') : '—';

    const modeBadgeClass = computed(() => ({
      'badge': true,
      'bg-primary': activity.value?.mode === 'AIR',
      'bg-success': activity.value?.mode === 'MARITIME',
    }));

    const statusBadgeClass = computed(() => ({
      'badge': true,
      'bg-warning text-dark': activity.value?.status === 'PENDING',
      'bg-success': activity.value?.status === 'VALIDATED',
      'bg-danger': activity.value?.status === 'REJECTED',
    }));

    onMounted(async () => {
      try {
        const { data } = await ApiService.get(`/getActivity/${route.params.id}`);
        activity.value = data.data;
      } catch {
        error("Impossible de charger l'activité.");
      } finally {
        isLoading.value = false;
      }
    });

    return { activity, isLoading, formatDate, modeBadgeClass, statusBadgeClass };
  },
});
</script>
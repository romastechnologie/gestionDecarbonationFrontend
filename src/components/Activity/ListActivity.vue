<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/addActivity"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter une activité
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher une activité"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="activities.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Mode
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Statut
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Installation source
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Installation destination
              </th>
              <!-- <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Transport
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Période début
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Période fin
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Cargo (T)
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Distance (Km)
              </th> -->
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, index) in activities" :key="index">

              <!-- Mode -->
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span
                  :class="activity.mode === 'MARITIME'
                    ? 'badge bg-info text-white'
                    : 'badge bg-warning text-white'"
                >
                  {{ activity.mode }}
                </span>
              </td>

              <!-- Statut -->
              <td class="shadow-none lh-1 fw-medium">
                <span
                  :class="{
                    'badge bg-secondary text-white': activity.status === 'PENDING',
                    'badge bg-success text-white':   activity.status === 'VALIDATED',
                    'badge bg-danger text-white':    activity.status === 'REJECTED',
                  }"
                >
                  {{ activity.status }}
                </span>
              </td>

              <!-- Installation source -->
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.installationFrom?.name ?? '—' }}
              </td>

              <!-- Installation destination -->
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.installationTo?.name ?? '—' }}
              </td>

              
              <!-- <td class="shadow-none lh-1 fw-medium">
                {{ activity.transportAsset
                    ? `${activity.transportAsset.name ?? ''} (${activity.transportAsset.identifier})`
                    : '—' }}
              </td> -->

<!--             
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.periodStart ? format_date(activity.periodStart) : '—' }}
              </td>

      
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.periodEnd ? format_date(activity.periodEnd) : '—' }}
              </td>

        
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.cargoMassT ?? '—' }}
              </td>

          
              <td class="shadow-none lh-1 fw-medium">
                {{ activity.distanceKm ?? '—' }}
              </td> -->

              <!-- Actions -->
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <span
                    class="badge text-white bg-primary fs-15 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                    <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link
                        class="dropdown-item d-flex align-items-center"
                        :to="{ name: 'EditActivityPage', params: { id: activity.id } }"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </router-link>
                    </li>
                    <li>
                      
                      <a class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(activity.id, activities, 'deleteActivity', 'une activité')"
                      >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                   <li>
                      <router-link
                        :to="{ name: 'ViewActivityPage', params: { id: activity.id } }"
                        class="dropdown-item d-flex align-items-center"
                      >
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Détails
                      </router-link>
                    </li>
                  </ul>
                </div>
              </td>

            </tr>
          </tbody>
        </table>
        <div v-else class="text-center">
          Aucune activité trouvée.
        </div>
      </div>

      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <PaginationComponent
          :page="page"
          :totalPages="totalPages"
          :totalElements="totalElements"
          :limit="limit"
          @paginate="handlePaginate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ApiService from '@/services/ApiService';
import { format_date, suppression, error } from '@/utils/utils';
import PaginationComponent from '@/components/Utilities/Pagination.vue';

interface Installation {
  id: string;
  name: string;
}

interface TransportAsset {
  id: string;
  name: string | null;
  identifier: string;
}

interface Activity {
  id: string;
  mode: string;
  status: string;
  installationFrom: Installation | null;
  installationTo: Installation | null;
  transportAsset: TransportAsset | null;
  periodStart: string;
  periodEnd: string;
  cargoMassT: number | null;
  distanceKm: number | null;
  fuelType: string | null;
  fuelMassT: number | null;
  createdAt: string;
}

export default defineComponent({
  name: 'ListActivity',
  components: {
    PaginationComponent,
  },
  setup() {
    const activities = ref<Activity[]>([]);
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const getAllActivities = (currentPage = 1, currentLimit = 10, search = '') => {
      return ApiService.get(
        `/getActivities?page=${currentPage}&limit=${currentLimit}`
      )
        .then(({ data }) => {
          activities.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          const message =
            err.response?.data?.message ||
            'Erreur lors de la récupération des activités';
          error(message);
        });
    };

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllActivities(page_, limit_);
    };

    const rechercher = () => {
      page.value = 1;
      getAllActivities(page.value, limit.value, searchTerm.value);
    };

    onMounted(() => {
      getAllActivities();
    });

    return {
      activities,
      format_date,
      suppression,
      searchTerm,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
    };
  },
});
</script>
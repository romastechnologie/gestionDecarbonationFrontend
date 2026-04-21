<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/addTransportAsset"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un transport
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un transport"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="transports.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Type
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Identifiant
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Catégorie
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Type de moteur
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Nom
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Proprio
              </th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date mise en production
              </th>
              <!-- <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date création
              </th> -->
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transport, index) in transports" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span
                  :class="transport.type === 'VESSEL' ? 'badge bg-info text-white' : 'badge bg-warning text-white'"
                >
                  {{ transport.type }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ transport.identifier }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ transport.category ?? '—' }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ transport.typeMoteur ?? '—' }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ transport.name ?? '—' }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ transport.ownerName ?? '—' }}</td>
              <td class="shadow-none lh-1 fw-medium">
                {{ transport.DateMiseProduction ? format_date(transport.DateMiseProduction) : '—' }}
              </td>
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
                        :to="{ name: 'EditTransportAssetPage', params: { id: transport.id } }"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </router-link>
                    </li>
                    <!-- <li>
                      <router-link
                        :to="{ name: 'ViewTransportAssetPage', params: { id: transport.id } }"
                        class="dropdown-item d-flex align-items-center"
                      >
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Détails
                      </router-link>
                    </li> -->
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(transport.id, transports, 'deleteTransport', 'un transport')"
                      >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center">
          Aucun transport trouvé.
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

interface TransportAsset {
  id: string;
  type: string;
  identifier: string;
  category: string | null;
  typeMoteur: string | null;
  DateMiseProduction: Date | null;
  name: string | null;
  ownerName: string | null;
  createdAt: Date;
}

export default defineComponent({
  name: 'ListeTransportAssets',
  components: {
    PaginationComponent,
  },
  setup() {
    const transports = ref<TransportAsset[]>([]);
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const getAllTransports = (currentPage = 1, currentLimit = 10, search = '') => {
      return ApiService.get(
        `/listTransports?page=${currentPage}&limit=${currentLimit}&mot=${search}`
      )
        .then(({ data }) => {
          transports.value = data.data.data;
          console.log('rrrr',transports.value);
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          const message =
            err.response?.data?.message ||
            'Erreur lors de la récupération des transports';
          error(message);
        });
    };

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllTransports(page_, limit_);
    };

    const rechercher = () => {
      page.value = 1;
      getAllTransports(page.value, limit.value, searchTerm.value);
    };

    onMounted(() => {
      getAllTransports();
    });

    return {
      transports,
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
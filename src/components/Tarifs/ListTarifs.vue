<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/addtarifs"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un tarif CO2
        </router-link>
      </div>

      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un tarif"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="tariffs.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Type</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Montant</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Devise</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Valide du</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Valide au</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tariff, index) in tariffs" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span :class="badgeType(tariff.tariffType)">
                  {{ labelType(tariff.tariffType) }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ Number(tariff.amount).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ tariff.currency?.code ?? '—' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ format_date(tariff.validFrom) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ tariff.validTo ? format_date(tariff.validTo) : '—' }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span :class="tariff.isActive ? 'badge bg-success text-white' : 'badge bg-danger text-white'">
                  {{ tariff.isActive ? 'Actif' : 'Inactif' }}
                </span>
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
                        :to="{ name: 'EditTarifsPage', params: { id: tariff.id } }"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </router-link>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center"
                            href="javascript:void(0);"
                            @click="suppression(tariff.id, tariffs, 'deleteCo2Tariff', 'un tarif CO2')"
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
        <div v-else class="text-center">Aucun tarif CO2 trouvé.</div>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
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

interface Currency { id: string; code: string; name: string; }

interface Co2Tariff {
  id: string;
  tariffType: string;
  amount: number;
  currency: Currency | null;
  validFrom: string;
  validTo: string | null;
  isActive: boolean;
  carrier?: string;
  containerTypeCode?: string;
  regionFrom?: { id: string; name: string };
  regionTo?: { id: string; name: string };
}

export default defineComponent({
  name: 'ListCo2Tariff',
  components: { PaginationComponent },
  setup() {
    const tariffs       = ref<Co2Tariff[]>([]);
    const searchTerm    = ref('');
    const page          = ref(1);
    const totalPages    = ref(0);
    const limit         = ref(10);
    const totalElements = ref(0);

    const getAllTariffs = (currentPage = 1, currentLimit = 10, mot = '') => {
      return ApiService.get(`/getCarbonTariffs?page=${currentPage}&limit=${currentLimit}&mot=${mot}`)
        .then(({ data }) => {
          tariffs.value       = data.data.data;
          totalPages.value    = data.data.totalPages;
          limit.value         = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          error(err.response?.data?.message || 'Erreur lors de la récupération des tarifs.');
        });
    };

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllTariffs(page_, limit_, searchTerm.value);
    };

    const rechercher = () => {
      page.value = 1;
      getAllTariffs(page.value, limit.value, searchTerm.value);
    };

    // Badge couleur selon tariffType
    const badgeType = (type: string) => ({
      'badge bg-info text-white':    type === 'CONTAINER',
      'badge bg-warning text-white': type === 'CARBON_PRICE',
      'badge bg-secondary text-white': type === 'BULK',
    });

    const labelType = (type: string) => {
      const map: Record<string, string> = {
        CONTAINER:    'Navire',
        CARBON_PRICE: 'Avion / Autres',
        BULK:         'Vrac',
      };
      return map[type] ?? type;
    };

    onMounted(() => getAllTariffs());

    return {
      tariffs, searchTerm, page, totalPages, limit, totalElements,
      format_date, suppression,
      handlePaginate, rechercher, badgeType, labelType,
    };
  },
});
</script>
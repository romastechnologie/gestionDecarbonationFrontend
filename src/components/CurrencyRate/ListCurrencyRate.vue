<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 text-decoration-none"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddCurrencyRateModal"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un taux
        </a>
      </div>

      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un taux"
          />
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th>Source</th>
              <th>Cible</th>
              <th>Taux</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="listLoading">
              <td colspan="5" class="text-center">
                <div class="spinner-border text-primary"></div>
              </td>
            </tr>

            <tr v-else-if="currencyRates.length === 0">
              <td colspan="5" class="text-center text-muted">
                Aucun taux enregistré.
              </td>
            </tr>

            <tr v-for="(rate, index) in currencyRates" :key="index">
              <td>{{ rate.sourceCurrency.code }}</td>
              <td>{{ rate.targetCurrency.code }}</td>
              <td>{{ rate.rate }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PaginationComponent
        :page="page"
        :totalPages="totalPages"
        :totalElements="totalElements"
        :limit="limit"
        @paginate="handlePaginate"
      />
    </div>
  </div>

  <AddCurrencyRateModal @close="recharger" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import AddCurrencyRateModal from "./AddCurrencyRateModal.vue";
import PaginationComponent from "../../components/Utilities/Pagination.vue";
import ApiService from "../../services/ApiService";
import { error } from "../../utils/utils";

interface Currency {
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface CurrencyRate {
    rate: number;
    sourceCurrency: Currency;
    targetCurrency: Currency;
}

export default defineComponent({
  components: { AddCurrencyRateModal, PaginationComponent },

  setup() {
    const currencyRates = ref<CurrencyRate[]>([]);
    const listLoading = ref(false);
    const searchTerm = ref("");

    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const formatDate = (date: string) =>
      new Date(date).toLocaleDateString("fr-FR");

    const getAllCurrenciesRates = (p = 1, lim = 10, search = "") => {
      listLoading.value = true;

      ApiService.get(`/getCurrenciesRates?page=${p}&limit=${lim}&mot=${search}`)
        .then(({ data }) => {
          currencyRates.value = data.data.data;
          totalPages.value = data.data.totalPages;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response?.data?.message);
        })
        .finally(() => {
          listLoading.value = false;
        });
    };

    const handlePaginate = ({ page_, limit_ }: any) => {
      page.value = page_;
      getAllCurrenciesRates(page_, limit_);
    };

    const rechercher = () => {
      getAllCurrenciesRates(page.value, limit.value, searchTerm.value);
    };

    const recharger = () => {
      rechercher();
    };

    onMounted(() => getAllCurrenciesRates());

    return {
      currencyRates,
      listLoading,
      searchTerm,
      page,
      totalPages,
      totalElements,
      limit,
      formatDate,
      handlePaginate,
      rechercher,
      recharger,
    };
  },
});
</script>

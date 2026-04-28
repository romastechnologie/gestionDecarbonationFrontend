<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <a class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
                    href="#" data-bs-toggle="modal" data-bs-target="#AddCurrencyModal">
                    <i class="flaticon-plus position-relative ms-5 fs-12"></i>
                    Ajouter une devise
                </a>
            </div>
            <div class="d-flex align-items-center">
                <form class="search-box position-relative me-15" @submit.prevent="rechercher">
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black rounded-0 border-0"
                        placeholder="Rechercher une devise" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                        <i class="flaticon-search-interface-symbol"></i>
                    </button>
                </form>
            </div>
        </div>

        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Code
                            </th>
                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nom
                            </th>
                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Créé le
                            </th>
                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Modifié le
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="listLoading">
                            <td colspan="4" class="text-center py-20">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Chargement...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="currencies.length === 0">
                            <td colspan="4" class="text-center py-20 text-muted">
                                Aucune devise enregistrée.
                            </td>
                        </tr>
                        <tr v-for="(currency, index) in currencies" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                <span class="badge bg-dark fw-bold font-monospace fs-13">{{ currency.code }}</span>
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ currency.name }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ formatDate(currency.createdAt) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ formatDate(currency.updatedAt) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
                <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements"
                    :limit="limit" @paginate="handlePaginate" />
            </div>
        </div>
    </div>

    <AddCurrencyModal @close="recharger" />
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    import AddCurrencyModal from "./AddCurrencyModal.vue";
    import ApiService from "../../services/ApiService";
    import { error } from "../../utils/utils";
    import PaginationComponent from "../../components/Utilities/Pagination.vue";

    interface Currency {
        code: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }

    export default defineComponent({
        name: "ListeCurrency",
        components: {
            AddCurrencyModal,
            PaginationComponent,
        },
        setup() {
            const currencies = ref<Currency[]>([]);
            const listLoading = ref(false);
            const searchTerm = ref('');

            const page = ref(1);
            const totalPages = ref(0);
            const limit = ref(10);
            const totalElements = ref(0);

            const formatDate = (date: string) =>
                new Date(date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });

            const getAllCurrencies = (p = 1, lim = 10, search = '') => {
                listLoading.value = true;
                return ApiService.get(`/getCurrencies?page=${p}&limit=${lim}&mot=${search}`)
                    .then(({ data }) => {
                        currencies.value = data.data.data;
                        totalPages.value = data.data.totalPages;
                        limit.value = data.data.limit;
                        totalElements.value = data.data.totalElements;
                    })
                    .catch(({ response }) => {
                        error(response?.data?.message || 'Impossible de charger les devises.');
                    })
                    .finally(() => {
                        listLoading.value = false;
                    });
            };

            const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
                page.value = page_;
                getAllCurrencies(page_, limit_);
            };

            const rechercher = () => {
                getAllCurrencies(page.value, limit.value, searchTerm.value);
            };

            const recharger = () => {
                getAllCurrencies(page.value, limit.value, searchTerm.value);
            };

            onMounted(() => {
                getAllCurrencies();
            });

            return {
                currencies,
                listLoading,
                searchTerm,
                page,
                totalPages,
                limit,
                totalElements,
                formatDate,
                getAllCurrencies,
                handlePaginate,
                rechercher,
                recharger,
            };
        },
    });
</script>
<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <!-- <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/ajouter-vessel"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un vessel
        </router-link> -->
                <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
            </div>
            <div class="d-flex align-items-center">
                <form class="search-box position-relative me-15" @submit.prevent="rechercher">
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black rounded-0 border-0"
                        placeholder="Rechercher un vessel" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                        <i class="flaticon-search-interface-symbol"></i>
                    </button>
                </form>
                <!-- <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button> -->
            </div>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nom
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                IMO
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nom du pays
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Courant d'air moyen
                            </th>

                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Courant d'air max
                            </th>

                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0">
                                ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vessel, index) in vessels" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ vessel.name }}
                            </td>

                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ vessel.imo }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ vessel.country_name }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ vessel.draught_avg }}
                            </td>

                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ vessel.draught_max }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis pe-0">
                                <button type="button" class="btn btn-primary btn-sm" @click.prevent="openModal(vessel)">
                                    <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                                    Détails
                                </button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
                <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
                    @paginate="handlePaginate" />
            </div>
        </div>
    </div>

    <div class="modal fade" id="vesselModal" tabindex="-1" aria-hidden="true" ref="vesselModal">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content shadow-lg border-0">

      <div class="modal-header bg-gradient border-0 py-3">
        <h5 class="modal-title fw-bold mb-1">Information du vessel</h5>
        <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
      </div>

      <div class="modal-body p-4">

        <h6 class="fw-bold text-uppercase small text-muted mb-2">Identification générale</h6>
        <hr class="my-2">

        <div class="row g-3">
          <div class="col-md-3">
            <label class="text-muted small mb-1">Nom</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.name }}</p>
          </div>
          <div class="col-md-3">
            <label class="text-muted small mb-1">IMO</label>
            <p class="fw-semibold mb-0">
              <span class="badge bg-primary-subtle text-primary">{{ selectedVessel?.imo }}</span>
            </p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Pays</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.country_name }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Courant d'air moyen</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.draught_avg }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Courant d'air max</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.draught_max }}</p>
          </div>
        </div>

        <hr class="my-2">

        <div class="row g-3">
          <div class="col-md-3">
            <label class="text-muted small mb-1">Largeur</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.breadth }}</p>
          </div>
          <div class="col-md-3">
            <label class="text-muted small mb-1">Signe d'appel</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.callSign }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Pays ISO</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.country_iso }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Gross tonnage</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.gross_tonnage }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">MMSI</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.mmsi }}</p>
          </div>
        </div>

        <hr class="my-2">

        <div class="row g-3">
          <div class="col-md-3">
            <label class="text-muted small mb-1">Nom AIS</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.name_ais }}</p>
          </div>
          <div class="col-md-3">
            <label class="text-muted small mb-1">Vitesse moyenne</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.speed_avg }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Vitesse max</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.speed_max }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Type</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.type }}</p>
          </div>
          <div class="col-md-2">
            <label class="text-muted small mb-1">Type spécifique</label>
            <p class="fw-semibold mb-0">{{ selectedVessel?.type_specific }}</p>
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="modal-footer bg-light border-0">
        <button type="button" class="btn btn-outline-secondary" @click="closeModal">
          <i class="bi bi-x-circle me-2"></i>Fermer
        </button>
      </div>

    </div>
  </div>
</div>



</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { Vessel } from "@/models/Vessel";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default defineComponent({
    name: "ListeVessel",
    components: {
        PaginationComponent
    },
    setup() {

        onMounted(() => {
            getAllVessels();
        });

        const vessels = ref<Array<Vessel>>([]);
        const vessel = ref<Vessel>();
        const router = useRouter();

        const selectedVessel = ref<any>(null);
        const vesselModal = ref<HTMLElement | null>(null);

        // BEGIN PAGINATE
        const searchTerm = ref('');
        const page = ref(1);
        const totalPages = ref(0);
        const limit = ref(10);
        const totalElements = ref(0);

        const handlePaginate = ({ page_, limit_ }) => {
            try {
                page.value = page_;
                getAllVessels(page_, limit_);
            } catch (error) {
                //
            }
        };

        function rechercher() {
            getAllVessels(page.value, limit.value, searchTerm.value);
        }

        const openModal = (doc: any) => {
            selectedVessel.value = doc;
            const modal = new Modal(vesselModal.value!);
            modal.show();
        };

        const closeModal = () => {
            const modal = Modal.getInstance(vesselModal.value!);
            modal?.hide();
        };


        // END PAGINATE



        function getAllVessels(page = 1, limi = 10, searchTerm = '') {
            return ApiService.get(`/all/vessels?page=${page}&limit=${limi}&mot=${searchTerm}&`)
                .then(({ data }) => {
                    console.log("les donnees", data);
                    vessels.value = data.data.data;
                    totalPages.value = data.data.totalPages;
                    limit.value = data.data.limit;
                    totalElements.value = data.data.totalElements;
                    return data.data;
                })
                .catch(({ response }) => {
                    console.log("NOS ERREURS", response);
                    // error(response.data.message)
                });
        }

        function moddifier(Editvessels: Vessel) {
            vessel.value = Editvessels;
        }

        const deletevessel = (id: number) => {
            ApiService.delete(`/vessels/${id}`)
                .then(({ data }) => {
                    Swal.fire({
                        text: data.message,
                        toast: true,
                        icon: 'success',
                        title: 'General Title',
                        animation: false,
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        heightAuto: false
                    });
                })
                .catch(({ response }) => {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Réssayer à nouveau!",
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn fw-semobold btn-light-danger",
                        },
                    });
                });

            for (let i = 0; i < vessels.value.length; i++) {
                if (vessels.value[i].id === id) {
                    vessels.value.splice(i, 1);
                }
            }
        };

        const privileges = ref<Array<string>>(JwtService.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }

        return {
            vessels,
            checkPermission,
            getAllVessels,
            deletevessel,
            moddifier,
            suppression,
            page,
            totalPages,
            limit,
            totalElements,
            handlePaginate,
            rechercher,
            searchTerm,
            selectedVessel,
            vesselModal,
            openModal,
            closeModal
        };


    },
});
</script>
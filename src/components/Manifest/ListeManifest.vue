<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <!-- <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/ajouter-manifest"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un manifest
        </router-link> -->
                <button
                    class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
                    type="button">
                    Exporter
                    <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
                </button>
            </div>
            <div class="d-flex align-items-center">
                <form class="search-box position-relative me-15" @submit.prevent="rechercher">
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black rounded-0 border-0"
                        placeholder="Rechercher un manifest" />
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
                                Référence Sic
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nom Navire
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Num Imo
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Date d'arrivée
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">

                                Date de dépâts
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">

                                NbrDoc
                            </th>

                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0">
                                ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(manifest, index) in manifests" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ manifest.sicReference }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ manifest.navireNom }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ manifest.navireLloyd }}
                            </td>

                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ format_Date(manifest.eta) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ format_Date(manifest.etd) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ manifest.documents?.length }}
                            </td>


                            <!-- <td class="shadow-none lh-1 fw-medium text-black-emphasis pe-0">
                                <button type="button"
                                    class="btn btn-primary btn-sm "
                                    @click.stop="$router.push({ name: 'ViewManifestPage', params: { id: manifest.id } })">
                                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                                    Détails
                                </button>
                            </td> -->

                            <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                                <div class="dropdown">
                                    <span class="badge text-white bg-primary fs-15 dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Actions
                                        <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                                    </span>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center"
                                                href="javascript:void(0);"
                                                @click.stop="$router.push({ name: 'ViewManifestPage', params: { id: manifest.id } })">
                                                <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                                                Détails
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center"
                                                @click="selectedItemPaiement = manifest.id"
                                                href="#" data-bs-toggle="modal" data-bs-target="#AddPaiementModal">
                                                <i class="flaticon-user lh-1 me-8 position-relative top-1"></i>
                                                Payer la facture
                                            </a>
                                        </li>
                                        <!-- <li v-if="manifest.aEquipage==false">
                                            <a class="dropdown-item d-flex align-items-center"
                                                @click="selectedItem = manifest.id"
                                                href="#" data-bs-toggle="modal" data-bs-target="#AddEquipageModal">
                                                <i class="flaticon-user lh-1 me-8 position-relative top-1"></i>
                                                Ajouter l'équipage
                                            </a>
                                        </li> -->

                                        <!-- <li v-if="manifest.aEquipage==true">
                                            <a class="dropdown-item d-flex align-items-center"
                                                href="#" data-bs-toggle="modal" data-bs-target="#detailEquipageModal">
                                                <i class="flaticon-user lh-1 me-8 position-relative top-1"></i>
                                                Equipage
                                            </a>
                                        </li> -->

                                        <!-- <li v-if="manifest.aEquipage==true">
                                            <a class="dropdown-item d-flex align-items-center"
                                                @click="quitusManifest(manifest.id)"
                                                href="javascript:void(0);" >
                                                <i class="flaticon-list lh-1 me-8 position-relative top-1"></i>
                                                Generer le quitus
                                            </a>
                                        </li> -->
                                    </ul>
                                </div>
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

    <AddEquipageModal :item="selectedItem" :manifestId="manifestId" @saved="fetchEquipages" />
    <detailEquipageModal :item="selectedItem" :manifestId="manifestId" />

    <addPaiementModal :item="selectedItemPaiement" :manifestId="manifestId" @saved="fetchEquipages" />

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { suppression, error, format_Date } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { Manifest } from "@/models/Manifest";
import AddEquipageModal from "@/components/Equipage/AddEquipageModal.vue";
import detailEquipageModal from "@/components/Equipage/DetailEquipageModal.vue";
import { Equipage } from "@/models/Equipage";
import { useRoute } from "vue-router";
import addPaiementModal from "@/components/Manifest/AddPaiement.vue";

export default defineComponent({
    name: "ListeManifest",
    components: {
        PaginationComponent, 
        AddEquipageModal,
        detailEquipageModal,
        addPaiementModal
    },
    setup() {

        onMounted(() => {
            getAllManifests();
        });

        const manifests = ref<Array<Manifest>>([]);
        const manifest = ref<Manifest>();

        // BEGIN PAGINATE
        const searchTerm = ref('');
        const page = ref(1);
        const totalPages = ref(0);
        const limit = ref(10);
        const totalElements = ref(0);
        const selectedItem = ref(0);
        const selectedItemPaiement = ref(0);
        // const manifestId = ref(0);
        const equipages = ref<Array<Equipage>>([]);
        const route = useRoute();
        const manifestId = ref(route.params.manifestId as string);
        

        const handlePaginate = ({ page_, limit_ }) => {
            try {
                page.value = page_;
                getAllManifests(page_, limit_);
            } catch (error) {
                //
            }
        };

        function rechercher() {
            getAllManifests(page.value, limit.value, searchTerm.value);
        }

        // END PAGINATE



        function getAllManifests(page = 1, limi = 10, searchTerm = '') {
            return ApiService.get(`manifest?page=${page}&limit=${limi}&mot=${searchTerm}&`)
                .then(({ data }) => {
                    console.log("les donnees", data);
                    manifests.value = data.data.data;
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

        function moddifier(Editmanifests: Manifest) {
            manifest.value = Editmanifests;
        }

        const deleteManifest = (id: number) => {
            ApiService.delete(`/manifests/${id}`)
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

            for (let i = 0; i < manifests.value.length; i++) {
                if (manifests.value[i].id === id) {
                    manifests.value.splice(i, 1);
                }
            }
        };

        const privileges = ref<Array<string>>(JwtService.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }

        const quitusManifest = (id: number) => {
            console.log("Generer quitus pour le manifest ID:", id);
            
            return ApiService.get(`manifest/${id}/generer-quitus`)
                .then(({ data }) => {
                    console.log("Résultat quitus:", data);
                    Swal.fire({
                        text: data.message || 'Quitus généré avec succès',
                        toast: true,
                        icon: 'success',
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return data.data;
                })
                .catch(({ response }) => {
                    console.error("Erreur génération quitus:", response);
                    Swal.fire({
                        text: response?.data?.message || 'Erreur lors de la génération du quitus',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: "btn fw-semobold btn-light-danger",
                        },
                    });
                });
        };

        const fetchEquipages = () => {
            // ApiService.get(`/equipage/manifest/${manifestId.value}`)
            //     .then(({ data }) => {
            //         console.log("iccciii", data);
            //         equipages.value = data.data;
            //         console.log("equipagesssss", equipages);
            //     })
            //     .catch(({ response }) => {
            //         error(response.data.message);
            //     });
            console.log("fetchEquipages manifestId");
        };

        return {
            manifests,
            checkPermission,
            getAllManifests,
            deleteManifest,
            moddifier,
            suppression,
            page,
            totalPages,
            limit,
            totalElements,
            handlePaginate,
            rechercher,
            searchTerm,
            format_Date,
            selectedItem,
            selectedItemPaiement,
            manifestId,
            fetchEquipages,
            quitusManifest
        };

    },
});
</script>

<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25">
            <div class="d-lg-flex align-items-center justify-content-between mb-3">
                <h4 class="position-relative text-black fw-bold mb-0">Informations générales</h4>
                <router-link to="/liste-manifestes" class="btn btn-primary transition border-0 lh-1 fw-medium">
                    <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
                    Retour
                </router-link>
            </div>

            <div class="row g-3 pt-4 mb-4">
                <div class="col-md-3">
                    <label class="fs-5 mb-1">Sic Reference</label>
                    <p class="fw-semibold mb-0">{{ manifest?.sicReference }}</p>
                </div>

                <div class="col-md-3">
                    <label class="fs-5 mb-1">Nom du navire</label>
                    <p class="fw-semibold mb-0">
                        <span class="badge bg-primary-subtle text-primary">{{ manifest?.navireNom }}</span>
                    </p>
                </div>

                <div class="col-md-2">
                    <label class="fs-5 mb-1">Num Imo</label>
                    <p class="fw-semibold mb-0">{{ manifest?.navireLloyd }}</p>
                </div>

                <div class="col-md-2">
                    <label class="fs-5 mb-1">Date d'arrivée</label>
                    <p class="fw-semibold mb-0">{{ format_date(manifest?.eta) }}</p>
                </div>

                <div class="col-md-2">
                    <label class="fs-5 mb-1">Date de dépâts</label>
                    <p class="fw-semibold mb-0">{{ format_date(manifest?.etd) }}</p>
                </div>
            </div>

            <div class="d-lg-flex align-items-center justify-content-between">
                <div class="d-sm-flex align-items-center mb-3 mb-lg-0">
                    <a class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-sm-0 text-decoration-none"
                        href="#" data-bs-toggle="modal" data-bs-target="#AddEquipageModal">
                        <i class="flaticon-plus position-relative ms-5 fs-12"></i>
                        Ajouter un membre
                    </a>
                </div>

                <!-- <div class="d-flex align-items-center">
                    <form class="search-box position-relative me-15" @submit.prevent="rechercher">
                        <input type="text" name="mot" v-model="searchTerm" @keyup="rechercher"
                            class="form-control shadow-none text-black rounded-0 border-0"
                            placeholder="Rechercher un membre" />
                        <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                            <i class="flaticon-search-interface-symbol"></i>
                        </button>
                    </form>
                </div> -->
            </div>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Numéro d'équipage
                            </th>
                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nom de famille
                            </th>
                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Prénoms
                            </th>
                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Nationalité
                            </th>
                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Date de naissance
                            </th>

                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Lieu de Naissance
                            </th>


                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(equipage, index) in equipages" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.crewNumber }}
                            </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.familyName }}
                            </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.givenNames }}
                            </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.nationality }}
                            </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.dateBirth }}
                            </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ equipage.placeBirth }}
                            </td>
                         
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
                                                href="javascript:void(0);" data-bs-toggle="modal"
                                                data-bs-target="#AddEquipageModal" @click="moddifier(equipage)">
                                                <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                                                Modifier
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center"
                                                href="javascript:void(0);"
                                                @click="suppression(equipage.id, equipages, 'equipages', 'equipage')">
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
            </div>
            <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">

                <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
                    @paginate="handlePaginate" />

            </div>
        </div>
    </div>
    <AddEquipageModal :item="selectedItem" :manifestId="manifestId" @saved="fetchEquipages" />
</template>


<script lang="ts">

import { defineComponent, onMounted, ref, watch, computed } from "vue";
import ApiService from "../../services/ApiService";
import { format_date, suppression, error } from "../../utils/utils";
import axios from 'axios';
import Swal from "sweetalert2";
import PaginationComponent from '../Utilities/Pagination.vue';
import JwtService from "../../services/JwtService";
import { Equipage } from "@/models/Equipage";
import { Manifest } from "@/models/Manifest";
import AddEquipageModal from "./AddEquipageModal.vue";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "ListeEquipage",
    components: {
        AddEquipageModal,
        PaginationComponent
    },
    setup: () => {
        const equipages = ref<Array<Equipage>>([]);
        const equipage = ref<Equipage>();
        const manifest = ref<Manifest | null>(null);
        const addEquipageModalRef = ref<null | HTMLElement>(null);
        const selectedItem = ref(0);

        // BEGIN PAGINATE
        const searchTerm = ref('');
        const page = ref(1);
        const totalPages = ref(0);
        const limit = ref(10);
        const totalElements = ref(0);

        const route = useRoute();
        const manifestId = ref(route.params.manifestId as string);
  
        console.log('Manifest ID:', manifestId.value);

        function getManifest(id: string) {
            return ApiService.get("/manifest", id)
                .then(({ data }) => {
                    console.log("Données manifest:", data.data);
                    manifest.value = data.data;
                })
                .catch(({ response }) => {
                    error(response.data.message);
                });
        }

       const fetchEquipages = () => {
    ApiService.get(`/equipage/manifest/${manifestId.value}`)
        .then(({ data }) => {
            console.log("iccciii", data);
            equipages.value = data.data;
            console.log("equipagesssss", equipages);
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
};



        onMounted(() => {
            if (manifestId.value) {
                getManifest(manifestId.value);
            }
            fetchEquipages();
        });

        function moddifier(EditEquipage: Equipage) {
            equipage.value = EditEquipage;
            selectedItem.value = EditEquipage.id;
        }

        const privileges = ref<Array<string>>(JwtService.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }

        return {
            checkPermission,
            selectedItem,
            equipages,
            manifest,
            suppression,
            moddifier,
            page,
            totalPages,
            limit,
            totalElements,
            searchTerm,
            addEquipageModalRef,
            manifestId,
            format_date,
            getManifest,
            fetchEquipages   
            
        };
    },
});
</script>
<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <form class="search-box position-relative">
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search product"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <div class="d-sm-flex align-items-center">
          <a
            class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#AddElementModal"
          >
            <i class="flaticon-plus position-relative ms-5 fs-12"></i>
            Ajouter un profil
          </a>
          
          <button
            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
            type="button"
          >
            Export
            <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
          </button>
        </div>
      </div>
      <div class="card-body p-15 p-sm-20 p-md-25">
        <div class="table-responsive">
          <table class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  #
                </th>
                <!-- <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  code
                </th> -->
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Libelle
                </th>
                <th
                scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                  Contenu
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(el, index) in elements" :key="index">
                <td class="shadow-none lh-1 fw-medium text-paragraph">
                  {{ el.id }}
                </td>
                <!-- <td class="shadow-none lh-1 fw-medium text-paragraph">
                 {{ el.code }}
                </td> -->
                <td class="shadow-none lh-1 fw-medium text-paragraph">
                 {{ el.libelle }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-paragraph">
                  <div style="display: flex; flex-wrap: wrap;">
                    <span v-for="(pr, index) in el.profilRoles" :key="index" class="badge bg-primary me-2 mb-2"> 
                      {{ pr.role.libelle }}
                    </span>
                  </div>
                </td>
                <td class="shadow-none lh-1 fw-medium text-paragraph">
                 {{ el.description }}
                </td>
                <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              >
              <div class="dropdown">
                  <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Actions
                      <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddElementModal"
                        @click="modification(el)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Modifier
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);" @click="suppression(el.id,elements,'profil','ce profil')"
                      >
                        <i
                          class="flaticon-delete lh-1 me-8 position-relative top-1" 
                        ></i>
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
        <div
          class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
        >
          <p class="mb-0 text-paragraph">
            Showing <span class="fw-bold">10</span> out of
            <span class="fw-bold">134</span> results
          </p>
          <nav class="mt-15 mt-md-0">
            <ul class="pagination mb-0">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <i class="flaticon-chevron-1"></i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link active" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <i class="flaticon-chevron"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <AddProfilModal :item="selectedItem"   @close="recharger"/>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { paginationFields } from '../Utilities/paginationFields';
import { error, suppression } from '../../utils/utils';
import ApiService from "../../services/ApiService";
import  { Profil }  from '../../models/Profil';
import AddProfilModal from './ProfilContent.vue';

  export default defineComponent({
    name: "ListeProfil",
    components: {
        AddProfilModal
    },
    setup: () => {

      const elements = ref<Array<Profil>>([])
        const selectedItem = ref(0);
      const element = ref<Profil>();

     
      function modification(item) {
        element.value = item;
        selectedItem.value = item.id;
      }

      const recharger = () => {
        getAll();
      };
     

      onMounted(() => {
        getAll();
      })

      function getAll(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`profils?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          console.log('result', data.data.data);
          elements.value = data.data.data;
          // totalPages.value = data.data.totalPages;
          // limit.value = data.data.limit;
          // totalElements.value = data.data.totalElements;
          // console.log("yes",data.data.data);
        })
        .catch(({ response }) => {
          error(response.data)
        });
      } 

      return { 
        getAll,
        suppression,
        modification,
        elements,
        recharger,
        selectedItem
      };
    }

  });
  </script>
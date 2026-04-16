<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a 
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddPermissionModal"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter une permission
        </a>
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
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un privelege"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Nom
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Description
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Rôle
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >DATE DE CREATION
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(permission, index) in permissions" :key="index">
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ permission.nom }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ permission.description }}
              </td>
              <td>
                <div >
                  <span  v-for="(rolePermission,index) in permission.rolePermissions" :key="index" class="badge text-bg-primary rounded-pill fs-13 me-5">
                    <span v-if="rolePermission.role">{{ rolePermission.role.description }}</span>
                  </span>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(permission.createdAt)  }}
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
                      <a class="dropdown-item d-flex align-items-center"  href="javascript:void(0);" @click="moddifier(permission)">
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"  ></i>  Modifier
                      </a>
                    </li>
                    <li>
                      <a  class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                         @click="suppression(permission.id,permissions,'permissions',`le permission ${permission.description}`)">  <i class="flaticon-delete lh-1 me-8 position-relative top-1" ></i>
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
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
  <AddPermissionModal
    @get-all-permissions="getAllPermissions"
    :id="idpermission"
    @openmodal="showModalEdite"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddPermissionModal from "./AddPermissionModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "../../utils/utils";
import { useRouter } from "vue-router";
import { PermissionData } from "@/models/Permission";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListePermission",
  components: {
    AddPermissionModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllPermissions();
    });

    const permissions = ref<Array<PermissionData>>([]);
    const idpermission = ref(0);
    // const permission = ref<Permission>();
    const loading = ref<boolean>(false);
    const router = useRouter();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllPermissions(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllPermissions(page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE
      

    onMounted(() => {
      loading.value=false;
      getAllPermissions()
    });


    function getAllPermissions(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/permissions?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          permissions.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(Editpermission:PermissionData) {
      idpermission.value = Editpermission.id;
    }

    function showModalEdite(model){
      showModal(model);
      idpermission.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

const checkPermission = (name) => {
  return privileges.value.includes(name);
}

    return {suppression,
      checkPermission,
     permissions,
      format_date,
      getAllPermissions,
      idpermission,
      moddifier,
      showModalEdite,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher
     };
  },

 
});
</script>
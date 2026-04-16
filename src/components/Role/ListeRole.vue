<!-- <template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link 
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/ajouter-role"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un role
        </router-link>
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15">
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un role"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                #
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Description
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Privilège
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
              >
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                    />
                  </div>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                Nf
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                7454
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                555
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
                <div class="dropdown">
                  <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="flaticon-dots"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1" ></i>
                         Modifier
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1" ></i>
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
          Showing <span class="fw-bold">11</span> out of
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
</template> -->

<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-2 g-xl-3">
    <div class="ol-md-4">
      <div class="card h-md-100">
        <div class="card-title m-15">
          <h2 class="text-center">Ajouter un rôle</h2>
        </div>
        <!--begin::Card body-->
        <div class="card-body d-flex flex-column flex-center">
          <!--begin::Button-->.
          <i class="flaticon-form" style="font-size: 140px; text-align: center;"></i>
          <router-link :to="{ name: 'AddRolePage' }" class="btn  btn-primary btn-active-primary ">
            <span class="fw-bolder"><i class="plus" ></i>Ajouter un rôle</span>
          </router-link>
          <!--begin::Button-->
        </div>
        <!--begin::Card body-->
      </div>
      <!--begin::Card-->
    </div>
    <div class="col-md-4" v-for="(role, index) in roleDatas" :key="index">
      <RoleCard
        :id = "role.id"
        :nom = "role.description"
        :number =  "role.rolePermissions?.length"
        :privileges = "role.rolePermissions"
        @delete="suppression(role.id,roleDatas,'roles','role')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import ApiService from "@/services/ApiService";
import { RoleData } from "@/models/Role";
import RoleCard from "@/components/Role/RoleCard.vue";
import { format_date, suppression, error } from "@/utils/utils";

export default defineComponent({
  name: "ListeRole",
  components: {
    RoleCard,
  },
  setup: () => {
    onMounted(() => {
      getAllAbonnements();
    });

    const roleDatas = ref<Array<RoleData>>([]);

    function getAllAbonnements() {
      return ApiService.get("/roles")
        .then(({ data }) => {
          roleDatas.value = data.data
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    return { roleDatas,format_date,suppression,getAllAbonnements };
  },
});
</script>
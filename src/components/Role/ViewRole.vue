<template>
  <div class="row">

    <div class="col-md-4 col-xxl-4 col-sm-4 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <h4 class="text-black fw-bold mb-10">{{ roleData?.description}}</h4>
          <h5 class="my-15">Key: {{ roleData?.nom }}</h5>
          <p class="my-15">Date de création: {{  format_date(roleData?.createdAt) }}</p>
          <div class="fw-bolder text-gray-600 mb-15">Nombre total de permission ayant ce rôle: {{ roleData?.rolePermissions?.length }}</div>
          <div class="fw-bolder text-gray-600 mb-15">Nombre total d'utilisateur ayant ce rôle: {{ roleData?.users?.length }}</div>
          <router-link :to="{ name: 'EditRolePage', params: { id: roleData?.id } }" class="btn  btn-primary my-15 me-2">
            <i class="flaticon-plus lh-1 me-8 position-relative top-1"></i>Complèter un privilège
          </router-link>
        </div>
      </div>
    </div>

    <!--begin::Content-->
    <div class="col-md-8 col-xxl-8 col-sm-8">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0">Liste des utilisateurs</h5>
            <div class="card-select mt-10 mt-sm-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5">
              <form>
                <div class="input-group">
                  <input type="text" class="form-control shadow-none fw-medium ps-12 pt-8 pb-8 pe-12 letter-spacing" 
                  placeholder="Search">
                  <button class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1" type="button">
                    <i class="flaticon-search-interface-symbol position-relative"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Nom et prénom </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"> Email </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"> Statut </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for ="(user, index) in roleData?.users" :key="index" >
                  <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    {{ getRandomColor()}}
                    <span  :class="`badge text-outline-${color} me-3 fw-bold rounded-circle`">{{ getFirstletre(user.sexe) }}</span>
                    {{ user.nomComplet }}
                  </th>
                  <td class="shadow-none lh-1 fw-medium ">{{ user.email }} </td>
                  <td class="shadow-none lh-1 fw-medium"><span class="badge text-outline-success">Actif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card-header">
      </div>
      <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-title">
            <h4 class="mb-0 h2">Liste des permissions</h4>
          </div>
          <div class="card-body pt-0">
            <!--begin::Permissions-->
            <div class="row">
              <div class="col-6" v-for ="(pri, index) in roleData?.rolePermissions" :key="index">
                <div class="d-flex align-items-center py-2">
                  <div class="col-8"><span class="bullet bg-primary me-3"></span><p class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">{{ pri?.permission?.description }}</p>   </div>
                  <div class="col-4"><span class="bullet bg-primary me-3"></span>
                    <span class="badge text-outline-danger">
                  <a
                    class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                    @click="suppression(pri.id, roleData?.rolePermissions,'rolePermission',`la permission ${pri.permission.nom}`	)" 
                    >
                    <i class="flaticon-delete lh-1 me-8 position-relative top-1" ></i>
                    Supprimer
                  </a>
                  </span>
                </div>
                  
                </div>
              </div>
            </div>
            <!--end::Permissions-->
          </div>
        </div>
      </div>
    </div>
      
  </div>
</template>

<script lang="ts">

import { RoleData, UserRole } from '@/models/Role';
import ApiService from '@/services/ApiService';
import moment from 'moment';
import { defineComponent, onMounted, ref, } from 'vue';
import { useRoute } from 'vue-router';
import { error, suppression } from '@/utils/utils';


export default defineComponent({
  name: "ViewRole",
  components: {
  },

  setup() {
      const route = useRoute();
      const color = ref("");
      let roleData = ref<RoleData>();
      const users = ref<Array<UserRole>>([]);

      function  format_date(value){
         if (value) {
           return moment(String(value)).format('DD-MM-YYYY h:m')
          }
      }
    const colors=["danger","success","secondary","info","primary","warning","dark"]

    function getRandomColor() {
			const randomIndex = Math.floor(Math.random() * colors.length);
			color.value = colors[randomIndex];
		}
    
    // Send login request
    function getRole(id:string) {
      return ApiService.get("/roles",id)
      .then(({ data }) => {
        roleData.value = data.data;
        users.value=data.data.users;
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    } 

    onMounted(() => {
      const id = route.params.id as string;
      getRole(id);
    });

  
    function getFirstletre(value:string){
      return value?.split('')[0];
    }

    return {
      roleData,
      color,
      getFirstletre,
      getRandomColor,
      format_date,
      users,
      suppression
    };
  },
});
</script>
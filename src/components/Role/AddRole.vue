<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="roleForm" @submit="addRole" :validation-schema="roleSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Description <span class="text-danger">*</span>
                </label>
                <Field
                  type="text" 
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ecriver la description"
                  name="description"
                />
                <ErrorMessage name="description" class="text-danger"/>
              </div>
            </div>
          <!-- <div class="mb-7">
            <div class="row ">
              <div class="col-sm-3 mb-5" v-for="(privilege, index) in permissions" :key="index">
           
                  <label class="form-check form-check-sm form-check-custom form-check-solid me-5 mb-5 me-lg-20">
                      <Field class="form-check-input" type="checkbox" :value="privilege.id" name="privileges"/>
                      <span class="form-check-label">{{privilege.description}}</span>
                  </label>
              </div>
            </div>
            <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="privileges" class="text-danger"/>
                  </div>
              </div>
          </div> -->
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
              type="submit"
            >
                Créer un rôle
            </button>
            <router-link to="/liste-roles" 
                class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { Permission, Role } from '@/models/Role';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: "AddRole",
    components: {
    Form,
    Field,
    ErrorMessage,
    //Multiselect
  },

  setup: () => {
    const roleSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom est obligatoire'),
      description: Yup.string().required("La description est obligatoire"),
      // privileges:Yup.array().required('Les privileges sont obligatoires')
    });

    onMounted(() => {
      getAllPermissions()
    });

    const roleForm =  ref(null);
    //const permissions = ref(null);
    const permissionOptions = ref([]);
    const router = useRouter();
    const permissions= ref<Array<Permission>>([]);
    const addRole = async (values,{ resetForm }) => {
      values = values as Role;
      ApiService.post("/roles",values)
      .then(({ data }) => {
        if(data.code == 201) { 
          success(data.message)
          resetForm();
          router.push({ name: "ListeRolePage" });
        }
      }).catch(({ response }) => {
        error(response.message);
      });
    }

    function getAllPermissions() {
      ApiService.get("/permissions")
      .then(({ data }) => {
        permissions.value = data.data;
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    } 

    return { roleSchema, addRole, roleForm, permissions, permissionOptions};
  },
});
</script>
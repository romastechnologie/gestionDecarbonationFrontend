<template>
  <div
    class="modal fade createNewModal"
    id="AddRoleModal"
    tabindex="-1"
    ref="addAddRoleModalRef"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black"></h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
        <h5>Vous êtes sur le point de complèter de (s) rôle (s) à: {{ selectedUser?.nomComplet }}</h5>
        <Form ref="passForm" @submit="addRole" :validation-schema="passSchema">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Rôle <span class="text-danger">*</span>
                </label>
                <Field  name="role"  v-slot="{ field }">
                  <Multiselect
                    :options="roleOptions"
                    mode="tags"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le rôle"
                  />
                </Field>
                <ErrorMessage name="role" class="text-danger"/>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { User } from '@/models/users';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import store from "./ListeUser.vue";

export default {
  name: "AddRoleModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    selectedUser: Object as () => User | undefined,
  },
  setup: (props, { emit }) => {
    const passSchema = Yup.object().shape({
      role: Yup.array().required('Le rôle est obligatoire'),
    });

      const passForm =  ref<User | null>(null);
      const addAddRoleModalRef = ref<null | HTMLElement>(null);
      //const router = useRouter();
      const userForm = ref<User>();
      const route = useRoute();
      const roleOptions = ref([]);

      const addRole = async (values, {resetForm}) => {
        const passData = {
          userId: selectedUser.value?.id,
          roles: values.role,
        };
      ApiService.post("/roles/users/"+passData.userId, passData)
        .then(({ data }) => {
          if (data.code == 200) {
          success(data.message);
          resetForm();
          hideModal(addAddRoleModalRef.value);
          emit('close');
          emit('getAllUsers',data.data);
        }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    // function getUser(id:number) {
    //   ApiService.get("/users/"+id.toString())
    //     .then(({ data }) => {
    //       for (const key in data.data) {
    //         userForm.value?.setFieldValue(key, 
    //         (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
    //       );
    //       }
    //   })
    //   .catch(({ response }) => {
    //     error(response.message);
    //   });
    // }

    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    watch(() => props.selectedUser, (newValue) => {
      selectedUser.value = newValue;
      if(newValue){
        selectedUserId.value = newValue.id;
        fetchRoles(selectedUserId.value);
      }
    });

    onMounted(() => {
      if(route.params.id) {
        // getUser(parseInt(route.params.id as string));
      }
    });

    const fetchRoles = async (userId) => {
      try {
        if (selectedUserId.value) {
          const response = await axios.get(`/resteante/roles/${userId}`);
          const rolesData = response.data.data;
          roleOptions.value = rolesData.map((role) => ({
            value: role.id,
            label: role.nom,
          }));
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des rôles :", error);
      }
    };

    return {passSchema,
      addRole,
      passForm,
      addAddRoleModalRef,
      // getUser
      
      roleOptions,
      selectedUserId,
    };
  },
};
</script>
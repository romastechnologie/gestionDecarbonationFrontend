<template>
  <div
    class="modal fade createNewModal"
    id="AddPermissionModal"
    tabindex="-1"
    ref="addPermissionModalRef"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
        <Form ref="permissionForm" @submit="addPermission" :validation-schema="permissionSchema">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Description <span class="text-danger">*</span>
                </label>
                <Field name="description" cols="30"
                rows="12" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                  <textarea
                    v-model="field.value"
                    class="form-control shadow-none rounded-0 text-black"
                  ></textarea>
                </Field>
                <ErrorMessage name="description" class="text-danger"/>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit">
              {{ btntext }}
            </button>
          </div>
        </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Permission } from '@/models/Permission';

export default {
  name: "AddPermissionModal",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props:{
    id: {
      type: Number,
      required: true,
      default:0
    },
  },
  emits: ["getAllPermissions",'openmodal'],

  setup: (props, { emit }) => {

    const loading = ref<boolean>(false);
    const permissionSchema = Yup.object().shape({
      description: Yup.string().required('La permission est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
    });


    const permissionnew = ref(props.id);
    const permissionForm =  ref<Permission | null>(null);
    const addPermissionModalRef = ref<null | HTMLElement>(null);
    let permissions= ref<Array<Permission>>([]);
    const title = ref('Ajouter une permission');
    const btntext = ref('Ajouter');
    const isupdate=ref(false);
    watch(() => props.id , (newValue) => {   
      if (newValue!=0) {
        getPermission(newValue);
        isupdate.value=true;
      }
      btnTitle();
    });

    const getPermission = async (id: number) => {
      return ApiService.get("/permissions/"+id)
      .then(({ data }) => {
        permissionForm.value?.setFieldValue("id",data.data.id);
        permissionForm.value?.setFieldValue("nom",data.data.nom);
        permissionForm.value?.setFieldValue("description",data.data.description);
        emit('openmodal', addPermissionModalRef.value);
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const btnTitle = async () => {
      if (isupdate.value) {
         title.value = "Modifier la permission";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une permission";
         btntext.value = "Ajouter";
      }
    }

    const addPermission = async (values,{ resetForm }) => {
      values = values as Permission;
      loading.value = false;
      if(isupdate.value) {
        ApiService.put(`/permissions/${values.id}`,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            hideModal(addPermissionModalRef.value);
            isupdate.value=false;
            btnTitle();
            emit("getAllPermissions");
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }else{
        ApiService.post("/permissions",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message)
            resetForm();
            hideModal(addPermissionModalRef.value);
            emit("getAllPermissions");
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
    }; 

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isupdate.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return {permissions, title,btntext, resetValue, permissionSchema, addPermission, permissionForm,addPermissionModalRef,permissionnew };
  },
};
</script>@/models/Permission
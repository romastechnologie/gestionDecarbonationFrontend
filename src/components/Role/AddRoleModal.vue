<template>
    <div
      class="modal fade createNewModal"
      id="AddElementModal"
      tabindex="-1"
      ref="addElementModalRef"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-15 p-md-40">
          <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
            <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
          </div>
          <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <Form ref="elementForm" @submit="addElement" :validation-schema="elementSchema">
                
                <div class="row">

                  <!-- <div class="col-md-5">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Code <span class="text-danger">*</span>
                      </label>
                      <Field name="code" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                      <ErrorMessage name="code" class="text-danger"/>
                  </div>
                  </div> -->

                  <div class="col-md-12">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Libelle <span class="text-danger">*</span>
                      </label>
                      <Field name="libelle" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                      <ErrorMessage name="libelle" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Description <span class="text-danger">*</span>
                    </label>
                    <Field name="description" as="textarea"  cols="30"
                      rows="6" placeholder="Entrer la description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                      <textarea
                        class="form-control shadow-none rounded-0 text-black"
                        v-model="field.value">
                      </textarea>
                    </Field>
                    <ErrorMessage name="description" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                          Privilèges <span class="text-danger">*</span>
                      </label>
                      <Field name="rolePrivileges" v-model="privilegeSelecteds"  v-slot="{ field }">
                          <Multiselect
                          :options="privilegeOptions"
                          :searchable="true"
                          track-by="label"
                          label="label"
                          v-model = "field.value"
                          v-bind = "field"
                          mode="tags"
                          :close-on-select="false"
                          placeholder="Sélectionnez le(s) privilege(s) de ce role"
                          />
                      </Field>
                      <ErrorMessage name="rolePrivileges" class="text-danger"/>
                  </div>
                  </div>

                  

                </div>
                
              
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit">
                {{ btntext }}
              </button>
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
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import ApiService from '../../services/ApiService';
  import * as Yup from 'yup';
  import { Role } from '../../models/Role';
  import { error , success, hideModal } from '../../utils/utils';
import { Privilege } from '@/models/Privilege';
import Multiselect from '@vueform/multiselect';
  
  export default defineComponent({
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
      }
    },
    setup(props, { emit }){

      const elementSchema = Yup.object().shape({
        rolePrivileges: Yup.array().required('Le champ est obligatoire'),
        libelle: Yup.string().required('Le libelle est obligatoire'),
        description: Yup.string().required('La description est obligatoire'),
      });
      
      const elementForm = ref<Role | null>(null);
      const addElementModalRef = ref<null | HTMLElement>(null);
      const sexeSelected = ref(null);
      const privilegeOptions = ref([]);
      const privilegeSelecteds = ref<number[]>([]);
      
      const isUPDATE = ref(false);
      const title = ref("Ajouter un role");
      const btntext = ref('Ajouter');
  
      watch(() => props.item, async (newValue) => {
        await getOne(newValue);
        isUPDATE.value = true;
        btnTitle();
      });
  
      const btnTitle = async () => {
        if (isUPDATE.value) {
           title.value = "Modifier le role";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter un role";
           btntext.value = "Ajouter";
        }
      }
  
      const produitsError = ref(false); 
  
     
      const getOne = async (id: number) => {
        return ApiService.get("/role/"+id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          console.log('donnee', donnees);
          // const categories = donnees.categories;
  
          // let ids: number[] = [];
          // for (const categorie of categories) {
          //   ids.push(categorie.id); 
          // }
          // categories.value= ids;
  
          // defaultSelectedCategories.value = categories.value
          for (const key in donnees) {
            elementForm.value?.setFieldValue(key, 
            (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
            );
            
            if(key == 'roleprivileges'){
              privilegeSelecteds.value = [];
                donnees[key].forEach((p, index) => {
                  (p.privilege.libelle && p.privilege.libelle != null)
                  ? privilegeSelecteds.value.push(p.privilege.id)
                  : '';
                });
            }
           
          }
          emit('openmodal', addElementModalRef.value);
  
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
  
      const addElement = async (values: any, elementForm) => {
        console.log(values);
        values = values as Role;
        if(isUPDATE.value){
          ApiService.put("/role/"+values.id,values)
          .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                elementForm.resetForm();
                hideModal(addElementModalRef.value);
                isUPDATE.value=false;
                btnTitle();
                emit('close');
              }
          })
          .catch(({ response }) => {
              error(response.data.message);
          });
        }else{
          ApiService.post("/role",values)
          .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message);
                elementForm.resetForm();
                hideModal(addElementModalRef.value);
                emit('close');
              }
          })
          .catch(({ response }) => {
              error(response.data.message);
          });
        }
      };
     
  
      onMounted( async () => {
        await fetchPrivileges();
      });

      const fetchPrivileges = async (page = 1, limi = -1, searchTerm = '') => {
        return ApiService.get(`/privileges?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          privilegeOptions.value = data.data.data.map((privilege: Privilege) => {
            return {
              value: privilege.id,
              label: privilege.libelle
            }
          });
        })
        .catch(({ response }) => {
          // error(response.data.message)
        });
      }
  
      const resetValue = () => {
        const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isUPDATE.value=false;
        formFields.forEach(field => {
            field.value = '';
        });
        // privilegeSelecteds.value = [];
        btnTitle()
      };
  
      return { 
        elementSchema,
        privilegeOptions,
        privilegeSelecteds,
        addElementModalRef,
        addElement,
        elementForm,
        title,btntext,
        resetValue,
        produitsError,
        sexeSelected
      };
    },
  });
  </script>
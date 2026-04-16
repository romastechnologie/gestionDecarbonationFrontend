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

                  <div class="col-md-12">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="text-black fw-semibold mb-10">
                      Est Agent ?  
                      <Field name="estAgent" type="checkbox" 
                        v-model="defaultEstAgent" 
                        :value="true"
                        :unchecked-value="false"
                      class="form-check-input shadow-none" />
                    </label>
                      <ErrorMessage name="estAgent" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      nom <span class="text-danger">*</span>
                      </label>
                      <Field name="nom" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                      <ErrorMessage name="nom" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Prenoms <span class="text-danger">*</span>
                      </label>
                      <Field name="prenoms" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                      <ErrorMessage name="prenoms" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Téléphone <span class="text-danger">*</span>
                      </label>
                      <Field name="telephone" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le numero"/>
                      <ErrorMessage name="telephone" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-8">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Email
                      </label>
                      <Field name="email" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mail"/>
                      <ErrorMessage name="email" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                        Sexe <span class="text-danger">*</span>
                      </label>
                      <Field name="sexe" v-model="sexeSelected"  v-slot="{ field }">
                        <Multiselect
                            v-model = "field.value"
                            v-bind = "field"
                            :options="sexeOptions"
                            :searchable="true"
                            placeholder="Selectionner"
                            noResultText= "Aucun enregistrement trouvé"
                            noOptionsText="Tapez au moins deux caractères"/>
                      </Field>
                      <ErrorMessage name="sexe" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Identifiant <span class="text-danger">*</span>
                      </label>
                      <Field name="identifiant" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Identifiant"/>
                      <ErrorMessage name="identifiant" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4" v-if="!isUPDATE">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Mot depasse <span class="text-danger">*</span>
                      </label>
                      <Field name="password" type="password" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mot de passe"/>
                      <ErrorMessage name="password" class="text-danger"/>
                  </div>
                  </div>

                  <div class="col-md-4" v-if="!isUPDATE">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Confirmer Mot de passe <span class="text-danger">*</span>
                      </label>
                      <Field name="cpassword" type="password" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nouveau le mot de passe"/>
                      <ErrorMessage name="cpassword" class="text-danger"/>
                  </div>
                  </div>

                  <div :class="isUPDATE ? 'col-md-8' : 'col-md-12'">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                          Profils <span class="text-danger">*</span>
                      </label>
                      <Field name="profils" v-slot="{ field }">
                          <Multiselect
                          :options="profilOptions"
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
                      <ErrorMessage name="profils" class="text-danger"/>
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
  import { defineComponent, ref, watch, onMounted, computed } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import ApiService from '../../services/ApiService';
  import * as Yup from 'yup';
  import { Utilisateur } from '../../models/Utilisateur';
  import { error , success, hideModal } from '../../utils/utils';
  import Multiselect from '@vueform/multiselect';
  
  export default defineComponent({
      name: "AddClientModal",
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

      const isUPDATE = ref(false);
      const elementSchema = ref<any>(null);
      // const elementSchema = Yup.object().shape({
      //   nom: Yup.string().required('Le nom est obligatoire'),
      //   prenoms: Yup.string().required('Le prenoms est obligatoire'),
      //   telephone: Yup.string().required('Le numero de téléphone est obligatoire'),
      //   // email: Yup.string().required('L\'adresse email est obligatoire'),
      //   sexe: Yup.string().required('La sexe est obligatoire'),
      //   estAgent: Yup.bool().required('Le statut est obligatoire'),
      //   identifiant: Yup.string().required(`L'identifiant est obligatoire`),
      //   // password: Yup.string().required('Le mot de passe est obligatoire'),
      //   // cpassword: Yup.string().required('Le mot de passe est obligatoire'),
      //   profils: Yup.array().required('Le profil est obligatoire'),
      //   password: Yup.string().when('isUPDATE', (isUPDATE, schema) => {
      //     return isUPDATE ? schema.notRequired() : schema.required('Le mot de passe est obligatoire');
      //   }),
      //   cpassword: Yup.string().when('isUPDATE', (isUPDATE, schema) => {
      //     return isUPDATE ? schema.notRequired() : schema.required('Le mot de passe est obligatoire');
      //   })
      //});

      const shemaWithout = Yup.object().shape({
        nom: Yup.string().required('Le nom est obligatoire'),
        prenoms: Yup.string().required('Le prenoms est obligatoire'),
        telephone: Yup.string().required('Le numero de téléphone est obligatoire'),
        // email: Yup.string().required('L\'adresse email est obligatoire'),
        sexe: Yup.string().required('La sexe est obligatoire'),
        estAgent: Yup.bool().required('Le statut est obligatoire'),
        identifiant: Yup.string().required(`L'identifiant est obligatoire`),
        // password: Yup.string().notRequired(),
        // cpassword: Yup.string().notRequired(),
        profils: Yup.array().required('Le profil est obligatoire'),
      });

      const shemaWith = Yup.object().shape({
        nom: Yup.string().required('Le nom est obligatoire'),
        prenoms: Yup.string().required('Le prenoms est obligatoire'),
        telephone: Yup.string().required('Le numero de téléphone est obligatoire'),
        // email: Yup.string().required('L\'adresse email est obligatoire'),
        sexe: Yup.string().required('La sexe est obligatoire'),
        estAgent: Yup.bool().required('Le statut est obligatoire'),
        identifiant: Yup.string().required(`L'identifiant est obligatoire`),
        password: Yup.string().required('Le mot de passe est obligatoire'),
        cpassword: Yup.string().required('Le mot de passe est obligatoire'),
        profils: Yup.array().required('Le profil est obligatoire'),
      });

      
  
      
      const elementForm = ref<Utilisateur | null>(null);
      const addElementModalRef = ref<null | HTMLElement>(null);
      const sexeSelected = ref(null);
      const defaultEstAgent = ref(false);
      const profilOptions = ref([]);

      const toggleEstAgent = () => {
        console.log('yes',defaultEstAgent.value);
       defaultEstAgent.value = !defaultEstAgent.value;
    };

     

      const  sexeOptions =  [
        { value: 'Homme', label: 'Masculin' }, 
        { value: 'Femme', label: 'Feminin'}
      ];
      
      
      const title = ref("Ajouter un utilisateur");
      const btntext = ref('Ajouter');
  
      watch(() => props.item, (newValue) => {
        getOne(newValue);
        isUPDATE.value = true;
        btnTitle();

        if(isUPDATE.value){
          elementSchema.value = shemaWithout;
          console.log("nous sommes ici");
        }else{
          elementSchema.value = shemaWith;
          console.log("nous sommes iciiii");
        }

      });
  
      const btnTitle = async () => {
        if (isUPDATE.value) {
           title.value = "Modifier le utilisateur";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter un utilisateur";
           btntext.value = "Ajouter";
        }
      }
  
      const produitsError = ref(false); 
  
     
      const getOne = async (id: number) => {
        return ApiService.get("/utilisateur/"+id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          console.log("données", donnees);
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
          }
          emit('openmodal', addElementModalRef.value);
  
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
  
      const addElement = async (values: any, elementForm) => {
        console.log(values);
        values = values as Utilisateur;
        if(isUPDATE.value){
          ApiService.put("/utilisateur/"+values.id,values)
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
          values.estAgent = defaultEstAgent.value;
          console.log("yes",values);
          ApiService.post("/utilisateur",values)
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
     
  
      onMounted(() => {
        fectchProfils();
      });

      const fectchProfils = async () => {
        return ApiService.get("/profils?limit=-1&")
        .then(({ data }) => {
          console.log('result', data.data.data);

          profilOptions.value = data.data.data.map((profil: any) => {
            return { 
              value: profil.id, 
              label: profil.libelle 
            }
          });
        })
        .catch(({ response }) => {
          error(response.data)
        });
      }
  
      const resetValue = () => {
        const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isUPDATE.value=false;
        formFields.forEach(field => {
          field.value = '';
        });
        btnTitle()
      };
  
      return { 
        elementSchema,
        addElementModalRef,
        addElement,
        elementForm,
        title,btntext,
        resetValue,
        produitsError,
        sexeOptions,
        sexeSelected,
        defaultEstAgent,
        toggleEstAgent,
        profilOptions,
        isUPDATE
      };
    },
  });
  </script>
<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
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
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="prenom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prénom"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Téléphone <span class="text-danger">*</span>
                  </label>
                  <Field name="telephone" v-model="telephone"  v-slot="{ field }">
                      <vue-tel-input
                        placeholder="Entrer le numéro de téléphone"
                        v-model = "field.value"
                        v-bind = "field"
                        defaultCountry="BJ"
                        mode="international"
                        @validate="validate"
                        class ="shadow-none fs-md-15 text-black py-2">
                      </vue-tel-input>
                    </Field>
                  <ErrorMessage name="telephone" class="text-danger"/>
                  <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Email
                  </label>
                  <Field
                    type="email" 
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer l'email"
                    name="email"
                  />
                  <ErrorMessage name="email" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sexe <span class="text-danger">*</span>
                  </label>
                  <Field  name="sexe"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Masculin', 'Féminin']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le sexe"
                    />
                  </Field>
                  <ErrorMessage name="sexe" class="text-danger"/>
                </div>
              </div>
            <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Rôle <span class="text-danger">*</span>
                </label>
                <Field  name="role"  v-slot="{ field }">
                  <Multiselect
                    :options="roleOptions"
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
            </div> -->
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit">
                 Modifier un utilisateur
              </button>
              <router-link to="/liste-users" 
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
    import Multiselect from '@vueform/multiselect'
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { User } from '@/models/users';
    import { VueTelInput } from 'vue3-tel-input'
    import 'vue3-tel-input/dist/vue3-tel-input.css'
  
  export default defineComponent({
      name: "EditUser",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueTelInput
  },
  
  setup: () => {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone: Yup.string().required('Le numéro téléphone est obligatoire'),
      //password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').notRequired(),
      //role: Yup.number().typeError('Veuillez entrer un nombre').required('Le rôle est obligatoire'),
    });

    const roleOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User>();
    const route = useRoute();
    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();


    function onInput(phone, phoneObject, input) {
      //
    }

    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephone.value = phoneObject.number;
        codepay.value= phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;

      }else{
        telephone.value="";
        codepay.value= "";
        nationalnumlber.value= "";
        numberPhone.value="";
      }
    }

    onMounted(() => {
      fetchRoles();
      passwords.value=password();
      userForm.value?.setFieldValue("password",passwords.value);
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
    });

    function password():string{
      let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
      let CharacterSet = '';
      let password = '';
      let size = 12;
      /* switch (this.strengthLevel) {
        case 12:
            size = 10
            charactersArray = 'a-z,A-Z'.split(',')
            break
        case 24:
            size = 12
            charactersArray = 'a-z,A-Z,0-9'.split(',')
            break
        case 36:
            size = 14
            charactersArray = 'a-z,A-Z,0-9,#'.split(',')
            break
        case 48:
            size = 16
            charactersArray = 'a-z,A-Z,0-9,#'.split(',')
        break
      }*/

      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }

      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }

      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '@$!%*?&#'
      }

      for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      return password
    }
    
    function getUser(id:number) {
      ApiService.get("/users/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editUser = async (values, {resetForm}) => {
      ApiService.put("/users/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeUserPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        const rolesData = response.data.data;
        roleOptions.value = rolesData.map((role) => ({
          value: role.id,
          label: role.nom,
        }));
      } catch (error) {
        //
      }
    };
      return {userForm,
         userSchema,
          editUser,
          roleOptions,
          telephone,
          validPhone,
          validate,
          onInput,
        };
    },
  });
  </script>
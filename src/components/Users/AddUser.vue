<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="userForm" @submit="addUser" :validation-schema="userSchema">
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
                  <Field name="telephone" v-slot="{ field }">
                    <vue-tel-input 
                      placeholder="Entrer le numéro de téléphone" 
                      v-model="telephone" 
                      v-bind="field"
                      defaultCountry="BJ" 
                      mode="international" 
                      @validate="validatePhone($event, 'telephone')"
                      class="shadow-none fs-md-15 text-black py-2">
                    </vue-tel-input>
                  </Field>
                  <div v-if="telephone && !validPhone.telephone" class="text-danger">Veuillez entrer un numéro correct</div>
                  <ErrorMessage name="telephone" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Email <span class="text-danger">*</span>
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
                  <Field name="sexe" v-slot="{ field }">
                    <Multiselect
                    :searchable="true"
                    :options="['Masculin', 'Féminin']"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le sexe"
                    />
                  </Field>
                  <ErrorMessage name="sexe" class="text-danger"/>
                </div>
              </div>
             
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Rôle <span class="text-danger">*</span>
                  </label>
                  <Field name="role" v-slot="{ field }">
                    <Multiselect
                      :options="roleOptions"
                      mode="tags"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model="field.value"
                      v-bind="field"
                      placeholder="Sélectionner le rôle"
                    />
                  </Field>
                  <ErrorMessage name="role" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-10 mb-sm-15 mb-md-17">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mot de passe <span class="text-danger">*</span>
                  </label>
                  <Field name="password" type="text" 
                    class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mot de passe"/>
                  <ErrorMessage name="password" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex align-items-center">
                  <button
                    class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                    type="submit">
                    Créer un utilisateur
                  </button>
                  <router-link to="/liste-users" 
                    class="btn btn-danger transition border-0 lh-1 fw-medium">
                    <i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative">Annuler</span>
                  </router-link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { User } from '@/models/users';
import { VueTelInput } from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';

export default defineComponent({
  name: "AddUser",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
  },
  setup: () => {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required("L'email est obligatoire"),
      sexe: Yup.string().required("Le sexe est obligatoire"),
      nom: Yup.string().required("Le nom est obligatoire"),
      prenom: Yup.string().required("Le prénom est obligatoire"),
      telephone: Yup.string().required("Le numéro de téléphone est obligatoire"),
      password: Yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").required("Le mot de passe est obligatoire"),
      role: Yup.array().min(1, "Le rôle est obligatoire").required("Le rôle est obligatoire"),
    });

    const roleOptions = ref([]);
    const caissesOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User | null>(null);
    const telephone = ref<string>("");
    const validPhone = ref<{ telephone: boolean }>({ telephone: false });

    onMounted(() => {
      fetchRoles();
      passwords.value = password();
      userForm.value?.setFieldValue("password", passwords.value);
    });

    const validatePhone = (phoneObject: any, fieldName: string) => {
      validPhone.value[fieldName] = phoneObject.valid || false;
      if (phoneObject.valid) {
        telephone.value = phoneObject.number;
        userForm.value?.setFieldValue("telephone", phoneObject.number);
      } else {
        telephone.value = "";
        userForm.value?.setFieldValue("telephone", "");
      }
    };

    function password(): string {
      const charactersArray = ['a-z', 'A-Z', '0-9', '#'];
      let CharacterSet = '';
      let password = '';
      const size = 12;

      if (charactersArray.includes('a-z')) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz';
      }
      if (charactersArray.includes('A-Z')) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      if (charactersArray.includes('0-9')) {
        CharacterSet += '0123456789';
      }
      if (charactersArray.includes('#')) {
        CharacterSet += '@$!%*?&#';
      }

      for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
      }
      return password;
    }

    const addUser = async (values, { resetForm }) => {
      console.log('Rôle de l\'utilisateur', values);
      ApiService.post("/users", values)
        .then(({ data }) => {
          if (data.code === 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeUserPage" });
          }
        })
        .catch(({ response }) => {
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
      } catch (err) {
        error('Erreur lors de la récupération des rôles');
      }
    };

    return {
      userForm,
      userSchema,
      addUser,
      roleOptions,
      caissesOptions,
      telephone,
      validPhone,
      validatePhone,
    };
  },
});
</script>
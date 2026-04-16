<template>
  <div class="col-md-8 col-xxl-8 col-sm-8 mb-10">
    <div class="card mb-25 border-0 rounded-0">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <h4 class="text-black fw-bold mb-10">Mes informations</h4>
        <Form ref="userForm"   @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
          <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom
                  </label>
                  <Field name="nom" type="text" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Prénom
                  </label>
                  <Field name="prenom" type="text" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse Mail
                </label>
                <Field name="email" type="email"
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone
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
                  Sexe
                </label>
                <Field  name="sexe"  type="text"  v-slot="{ field }">
                  <Multiselect
                    :searchable = "true"
                    :options = "['Masculin', 'Féminin']"
                    v-model = "field.value"
                    v-bind = "field"
                  />
                </Field>
                  <ErrorMessage name="sexe" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  type="submit" :disabled="!validPhone"
                >
                    Modifier
                </button>
                <router-link to="/tableau_bord" 
                class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Multiselect from '@vueform/multiselect'
import * as Yup from 'yup';
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { User } from '@/models/users';
import JwtService from "@/services/JwtService";
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

export default defineComponent({
  name: "ProfileContent",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
  },
  setup: () => {
    const userSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone: Yup.string().required('Le téléphone est obligatoire'),
      email: Yup.string().notRequired(),
      sexe: Yup.string().required('Le sexe est obligatoire'),
    });

    const userForm = ref<User>();
    const router = useRouter();
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
      if (JwtService.getUser()) {
        getUserOnly(JwtService.getUser());
      }
    });

    function getUserOnly(id: string | null) {
      ApiService.get("/users/" + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(
              key,
              typeof data.data[key] === 'object' && data.data[key] !== null
                ? data.data[key].id
                : data.data[key]
            );
          }
        })
        .catch(({ response }) => {
          error(response.message);
          //router.push({ name: "userForms-liste" });
        });
    }
    
    const editUser = async (values, {resetForm}) => {
      ApiService.put("/users/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "tableauBordPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

    return { userSchema, editUser, userForm,
      telephone,
      validPhone,
      validate,
      onInput, };
  },
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

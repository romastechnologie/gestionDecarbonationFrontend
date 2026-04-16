<template>
    <div class="col-md-4 col-xxl-4 col-sm-4 mb-10">
        <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <h4 class="text-black fw-bold mb-10">Mot de passe</h4>
            <Form ref="userPassForm"   @submit="editUserPass" :validation-schema="userPassSchema" :initial-values="userPassForm">
            <!-- <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                    Ancien mot de passe
                </label>
                <Field name="password" type="password" 
                    class="form-control shadow-none fs-md-15 text-black"/>
                    <ErrorMessage name="password" class="text-danger"/>
                </div>
            </div> -->
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                    Nouveau mot de passe
                </label>
                <Field name="newPassword" type="password" 
                    class="form-control shadow-none fs-md-15 text-black"/>
                    <ErrorMessage name="newPassword" class="text-danger"/>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                    Confirmer le nouveau mot de passe
                </label>
                <Field name="confirmNewPassword" type="password" 
                    class="form-control shadow-none fs-md-15 text-black"/>
                    <ErrorMessage name="confirmNewPassword" class="text-danger"/>
                </div>
            </div>
            <div class="col-md-12">
                <div class="d-flex align-items-center ">
                <button
                    class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                    type="submit"
                >
                    Modifier
                </button>
                <router-link to="/tableau_bord" 
                class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
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
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { error, success } from '@/utils/utils';
  import { useRoute, useRouter } from 'vue-router';
  import { User } from '@/models/users';
  import JwtService from "@/services/JwtService";
import { useAuthStore } from "@/services/auth";

  
  export default defineComponent({
    name: "UpdatePassword",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    setup: () => {
      const userPassSchema = Yup.object().shape({
        newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
        confirmNewPassword: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .oneOf([Yup.ref("newPassword")], "Les champs de mot de passe et de confirmation de mot de passe doivent correspondre")
        .label("Confirmation de mot"),
      });
  
      const userPassForm = ref<User>();
    //   const passwords = ref<string>("");
      const router = useRouter();
    const store = useAuthStore();

      //const route = useRoute();
  
      onMounted(() => {
      if (JwtService.getUser()) {
        getUserOnly(JwtService.getUser());
      }
    //   passwords.value=password();
    });

    function getUserOnly(id: string | null) {
      ApiService.get("/users/" + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userPassForm.value?.setFieldValue(
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
      
    //   function password():string{
    //     let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
    //     let CharacterSet = '';
    //     let password = '';
    //     let size = 12;
    //     /* switch (this.strengthLevel) {
    //       case 12:
    //           size = 10
    //           charactersArray = 'a-z,A-Z'.split(',')
    //           break
    //       case 24:
    //           size = 12
    //           charactersArray = 'a-z,A-Z,0-9'.split(',')
    //           break
    //       case 36:
    //           size = 14
    //           charactersArray = 'a-z,A-Z,0-9,#'.split(',')
    //           break
    //       case 48:
    //           size = 16
    //           charactersArray = 'a-z,A-Z,0-9,#'.split(',')
    //       break
    //     }*/
  
    //     if (charactersArray.indexOf('a-z') >= 0) {
    //       CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
    //     }
  
    //     if (charactersArray.indexOf('A-Z') >= 0) {
    //       CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    //     }
        
    //     if (charactersArray.indexOf('0-9') >= 0) {
    //       CharacterSet += '0123456789'
    //     }
  
    //     if (charactersArray.indexOf('#') >= 0) {
    //       CharacterSet += '@$!%*?&#'
    //     }
  
    //     for (let i = 0; i < size; i++) {
    //       password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
    //     }
  
    //     return password
    //   }
  
      function logout() {
      store.logout()
      if (!store.isAuthenticated) {
        router.push({name:'LoginPage'})
      }
    }
  
      const editUserPass = async (values, {resetForm}) => {
        ApiService.put("/users/password/"+ values.id,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              logout();
              //router.push({ name: "tableauBordPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
        });
      };

      return { userPassSchema, editUserPass, userPassForm};
    },
  });
  </script>
  <style src="@vueform/multiselect/themes/default.css"></style>
  
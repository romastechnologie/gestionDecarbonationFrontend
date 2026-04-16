<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
     <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
             <Form ref="elementForm" @submit="addElement" :validation-schema="elementSchema">
               
                <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                    <div class="row">

                        <div class="col-md-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Coéfficient du Prix de vente
                            </label>
                            <Field name="coefficientPV" type="number" v-model="param"
                            class="form-control shadow-none fs-md-15 text-black"/>
                            <ErrorMessage name="coefficientPV" class="text-danger"/>
                            </div>
                        </div>
    
                        
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex align-items-center ">
                            <button
                                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                                type="submit"
                            >
                                Enregistrer
                            </button>
                            <!-- <router-link to="/Parametres" 
                                class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                                <span class="position-relative"></span>Annuler
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </Form>
     </div>
    </div>
   
   
   </template>
   
   <script lang="ts">
   import { defineComponent, onMounted, reactive, ref, watch } from "vue";
   import { Form, Field, ErrorMessage } from "vee-validate";
   import { error, success, showModal, hideModal, monSwal } from "../../utils/utils";
   import { useRoute, useRouter } from "vue-router";
   import ApiService from "../../services/ApiService";
   import * as Yup from "yup";
   import Swal from "sweetalert2";
   
   export default defineComponent({
     name: "AddParametre",
     components: {
       Form,
       Field,
       ErrorMessage
     },
     
     setup: () => {

        const isUPDATE = ref(false);
        const param = ref(0);

       const elementSchema = Yup.object().shape({
        coefficientPV: Yup.number().required("Le coéfficient est obligatoire"),
       });
       
       
        onMounted(()=> {
            fetcParametre();
        })
   
        
   
        const fetcParametre = async () => {
            try {
                const response = await ApiService.get('/Parametre/1');
                param.value = response.data.data.coefficientPV;
                isUPDATE.value = true;
               
            } catch (error) {
                console.log("error", error);
            }
        };




    

        const addElement = async (values: any, elementForm) => {
            console.log("values", values);

            
            const result = await monSwal(
                "Vous êtes sur le point de mettre à jour le coefficient déterminant le prix de vente. Cela réajustera le prix de vente de vos articles. Êtes-vous sûr ?",
                undefined,
                "btn btn-primary",
                undefined,
                undefined,
            );

            if(result){
                if(isUPDATE.value){
                    ApiService.put("/parametre/"+values.id,values)
                    .then(({ data }) => {
                        if(data.code == 200) { 
                            success(data.message);
                            elementForm.resetForm();
                            isUPDATE.value=false;
                        }
                    })
                    .catch(({ response }) => {
                        error(response.data.message);
                    });
                }else{
                    console.log("form", values);
                    ApiService.post("/parametre",values)
                    .then(({ data }) => {
                        if(data.code == 201) { 
                            success(data.message);
                        }
                    })
                    .catch(({ response }) => {
                        error(response.data.message);
                    });
                }
            }

            // Swal.fire({
            //     text: "Vous êtes sur le point de mettre à jour le coefficient déterminant le prix de vente. Cela réajustera le prix de vente de vos articles. Êtes-vous sûr ?",
            //     icon: "warning",
            //     buttonsStyling: true,
            //     showCancelButton: true,
            //     confirmButtonText: "Modifier",
            //     cancelButtonText: `Annuler`,
            //     heightAuto: false,
            //     customClass: {
            //         confirmButton: "btn btn-primary",
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         if(isUPDATE.value){
            //             ApiService.put("/parametre/"+values.id,values)
            //             .then(({ data }) => {
            //                 if(data.code == 200) { 
            //                     success(data.message);
            //                     elementForm.resetForm();
            //                     isUPDATE.value=false;
            //                 }
            //             })
            //             .catch(({ response }) => {
            //                 error(response.data.message);
            //             });
            //         }else{
            //             console.log("form", values);
            //             ApiService.post("/parametre",values)
            //             .then(({ data }) => {
            //                 if(data.code == 201) { 
            //                     success(data.message);
            //                     // router.push('/ventes');
            //                     // elementForm.resetForm();
            //                 }
            //             })
            //             .catch(({ response }) => {
            //                 error(response.data.message);
            //             });
            //         }
            //     } else if (result.isDenied) {
            //         Swal.fire("La mise à jour a été annulée", "", "info");
            //     }
            // });
            
        };
   
        return { 
            addElement,
            elementSchema,
            param
        };

     },
   });
   </script>
   
   <style scoped>
     table tbody td {
       padding-left: 0px !important;
     }
     .table > :not(caption) > * > * {
        padding-left: 0px !important;
     }
   </style>
   
   
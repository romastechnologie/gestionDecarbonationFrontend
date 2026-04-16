<template>
  <div
    class="modal fade createNewModal"
    id="AddPortARisqueModal"
    tabindex="-1"
    ref="addPortARisqueModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="portARisqueForm" @submit="addPortRisque" :validation-schema="portARisquesSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Région <span class="text-danger">*</span>
                  </label>
                  <Field name="region" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom de la région"/>
                  <ErrorMessage name="region" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   NomPort <span class="text-danger">*</span>
                  </label>
                  <Field name="nomPort" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du Port"/>
                  <ErrorMessage name="nomPort" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Country <span class="text-danger">*</span>
                  </label>
                  <Field name="country" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le country"/>
                  <ErrorMessage name="country" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   UN/Locode <span class="text-danger">*</span>
                  </label>
                  <Field name="un_Locode" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le un/Locode"/>
                  <ErrorMessage name="un_Locode" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Note <span class="text-danger">*</span>
                  </label>
                  <Field name="notes" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la note"/>
                  <ErrorMessage name="notes" class="text-danger"/>
                </div>
              </div>
              
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
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
import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { error , success, hideModal } from '../../utils/utils';
import { PortARisk } from '@/models/PortARisk';

export default defineComponent({
    name: "AddPortARisqueModal",
    components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const portARisquesSchema = Yup.object().shape({
      region: Yup.string().required('La region est obligatoire'),
      nomPort: Yup.string().required("Le nom du port est obligatoire"),
      country: Yup.string().required('Le country est obligatoire'),
      un_Locode: Yup.string().required('Le UN/Locode est obligatoire'),
      notes: Yup.string().required('La note est obligatoire'),
    });

    const portARisqueForm = ref<PortARisk | null>(null);
    const addPortARisqueModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un port à risque");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getPortARisque(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le port à risque";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un port à risque";
         btntext.value = "Ajouter";
      }
    }

    const getPortARisque = async (id: number) => {
      return ApiService.get("/portARisque/"+id)
      .then(({ data }) => {
        const donnees = data.data;
        for (const key in donnees) {
          portARisqueForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addPortARisqueModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addPortRisque = async (values: any, portARisqueForm) => {
      values = values as PortARisk;
      if(isUPDATE.value){
        ApiService.put("/portARisque/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              portARisqueForm.resetForm();
              hideModal(addPortARisqueModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/portARisque",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              portARisqueForm.resetForm();
              hideModal(addPortARisqueModalRef.value);
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { portARisquesSchema,
      addPortARisqueModalRef,
      addPortRisque,
      portARisqueForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/PortARisk
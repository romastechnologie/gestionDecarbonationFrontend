<template>
  <div
    class="modal fade createNewModal"
    id="addHsCodeModal"
    tabindex="-1"
    ref="addHsCodeModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="hsForm" @submit="addHs" :validation-schema="hsSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Product <span class="text-danger">*</span>
                  </label>
                  <Field name="product" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le product"/>
                  <ErrorMessage name="product" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Productfr <span class="text-danger">*</span>
                  </label>
                  <Field name="productfr" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le productfr"/>
                  <ErrorMessage name="productfr" class="text-danger"/>
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
import { HsCode } from '@/models/HsCode';

export default defineComponent({
    name: "addHsModal",
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
    const hsSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      product: Yup.string().required("Le locode est obligatoire"),
      productfr: Yup.string().required('Le codePays est obligatoire'),
    });

    const hsForm = ref<HsCode | null>(null);
    const addHsCodeModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un HS Code");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getHs(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le HS Code";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter le HS Code";
         btntext.value = "Ajouter";
      }
    }

    const getHs = async (id: number) => {
      return ApiService.get("/hscode/"+id)
      .then(({ data }) => {
        const donnees = data.data;
        for (const key in donnees) {
          hsForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addHsCodeModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addHs = async (values: any, hsForm) => {
      values = values as HsCode;
      if(isUPDATE.value){
        ApiService.put("/hscode/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              hsForm.resetForm();
              hideModal(addHsCodeModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/hscode",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              hsForm.resetForm();
              hideModal(addHsCodeModalRef.value);
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

    return { hsSchema,
      addHsCodeModalRef,
      addHs,
      hsForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/HsCode
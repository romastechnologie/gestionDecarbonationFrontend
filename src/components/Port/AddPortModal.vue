<template>
  <div
    class="modal fade createNewModal"
    id="AddPortModal"
    tabindex="-1"
    ref="addPortModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="portForm" @submit="addPort" :validation-schema="portSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du port"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Locode <span class="text-danger">*</span>
                  </label>
                  <Field name="locode" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le locode"/>
                  <ErrorMessage name="locode" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   CodePays <span class="text-danger">*</span>
                  </label>
                  <Field name="codePays" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le locode"/>
                  <ErrorMessage name="codePays" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   CodePort <span class="text-danger">*</span>
                  </label>
                  <Field name="codePort" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code du Port"/>
                  <ErrorMessage name="codePort" class="text-danger"/>
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
import { Port } from '@/models/Port';

export default defineComponent({
    name: "AddPortModal",
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
    const portSchema = Yup.object().shape({
      nom: Yup.string().required('Le libellé est obligatoire'),
      locode: Yup.string().required("Le locode est obligatoire"),
      codePays: Yup.string().required('Le codePays est obligatoire'),
      codePort: Yup.string().required('Le codePort est obligatoire'),
    });

    const portForm = ref<Port | null>(null);
    const addPortModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un port");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getPort(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le port";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un port";
         btntext.value = "Ajouter";
      }
    }

    const getPort = async (id: number) => {
      return ApiService.get("/port/"+id)
      .then(({ data }) => {
        const donnees = data.data;
        for (const key in donnees) {
          portForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addPortModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addPort = async (values: any, portForm) => {
      values = values as Port;
      if(isUPDATE.value){
        ApiService.put("/port/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              portForm.resetForm();
              hideModal(addPortModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/port",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              portForm.resetForm();
              hideModal(addPortModalRef.value);
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

    return { portSchema,
      addPortModalRef,
      addPort,
      portForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/Port
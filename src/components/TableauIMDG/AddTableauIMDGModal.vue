<template>
  <div
    class="modal fade createNewModal"
    id="AddTableauIMDGModal"
    tabindex="-1"
    ref="addTableauIMDGModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="tableauForm" @submit="addTableau" :validation-schema="tableauSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    ClasseIMDG <span class="text-danger">*</span>
                  </label>
                  <Field name="classeIMDG" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la classe IMDG"/>
                  <ErrorMessage name="classeIMDG" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Exemple de Marchandise <span class="text-danger">*</span>
                  </label>
                  <Field name="exempleMarchandise" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'exempleMarchandise"/>
                  <ErrorMessage name="exempleMarchandise" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   Un Number <span class="text-danger">*</span>
                  </label>
                  <Field name="unNumber" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer un number"/>
                  <ErrorMessage name="unNumber" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   CodeHS <span class="text-danger">*</span>
                  </label>
                  <Field name="codeHS" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le codeHS"/>
                  <ErrorMessage name="codeHS" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   MesurePortuaire <span class="text-danger">*</span>
                  </label>
                  <Field name="mesurePortuaire" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la mesure Portuaire"/>
                  <ErrorMessage name="mesurePortuaire" class="text-danger"/>
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
import { TableauImdgPortuaire } from '@/models/TableauImdgPortuaire';

export default defineComponent({
    name: "AddTableauIMDGModal",
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
    const tableauSchema = Yup.object().shape({
      classeIMDG: Yup.string().required('La classe IMDG est obligatoire'),
      exempleMarchandise: Yup.string().required("L'exemple de marchandise est obligatoire"),
      unNumber: Yup.string().required('Un number est obligatoire'),
      codeHS: Yup.string().required('Le codeHS est obligatoire'),
      mesurePortuaire: Yup.string().required('La mésure portuaire est obligatoire'),
    });

    const tableauForm = ref<TableauImdgPortuaire | null>(null);
    const addTabeauIMDGModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un tableau imdg");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTableauImdgPortuaire(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le tableau imdg";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter tableau imdg";
         btntext.value = "Ajouter";
      }
    }

    const getTableauImdgPortuaire = async (id: number) => {
      return ApiService.get("/tableauIMDG/"+id)
      .then(({ data }) => {
        const donnees = data.data;
        for (const key in donnees) {
          tableauForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTabeauIMDGModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addTableau = async (values: any, portForm) => {
      values = values as Port;
      if(isUPDATE.value){
        ApiService.put("/tableauIMDG/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              portForm.resetForm();
              hideModal(addTabeauIMDGModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/tableauIMDG",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              portForm.resetForm();
              hideModal(addTabeauIMDGModalRef.value);
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

    return { tableauSchema,
      addTabeauIMDGModalRef,
      addTableau,
      tableauForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/TableauImdgPortuaire
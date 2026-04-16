<template>
  <div
    class="modal fade createNewModal"
    id="AddAgentConsignataireModal"
    tabindex="-1"
    ref="addAgentConsignataireModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="agentForm" @submit="addAgent" :validation-schema="agentSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Agent Consignataire <span class="text-danger">*</span>
                  </label>
                  <Field name="agentConsignataire" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'agent Consignataire"/>
                  <ErrorMessage name="agentConsignataire" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                   CodeGuce <span class="text-danger">*</span>
                  </label>
                  <Field name="codeGuce" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code Guce"/>
                  <ErrorMessage name="codeGuce" class="text-danger"/>
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
import { CatagorieHsCode } from '@/models/CategorieHsCode';
import { AgentConsignataire } from '@/models/AgentConsignataire';

export default defineComponent({
    name: "addAgentConsignataireModal",
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
    const agentSchema = Yup.object().shape({
      agentConsignataire: Yup.string().required('L\'agent consignataire est obligatoire'),
      codeGuce: Yup.string().required("Le code Gruce est obligatoire"),
    });

    const agentForm = ref<CatagorieHsCode | null>(null);
    const addAgentConsignataireModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un agent consignataire");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getAgentC(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la agent consignataire";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une agent consignataire";
         btntext.value = "Ajouter";
      }
    }

    const getAgentC = async (id: number) => {
      return ApiService.get("/agentC/"+id)
      .then(({ data }) => {
        const donnees = data.data;
        for (const key in donnees) {
          agentForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addAgentConsignataireModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addAgent = async (values: any, agentForm) => {
      values = values as AgentConsignataire;
      if(isUPDATE.value){
        ApiService.put("/agentC/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              agentForm.resetForm();
              hideModal(addAgentConsignataireModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/agentC",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              agentForm.resetForm();
              hideModal(addAgentConsignataireModalRef.value);
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

    return { agentSchema,
      addAgentConsignataireModalRef,
      addAgent,
      agentForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/AgentConsignataire
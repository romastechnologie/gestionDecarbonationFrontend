<template>
  <div class="modal fade" id="AddCurrencyRateModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter un taux de change</h5>
          <button class="btn-close" data-bs-dismiss="modal" @click="resetForm"></button>
        </div>

        <Form ref="rateForm" @submit="addCurrencyRate" :validation-schema="schema">
          <div class="modal-body">

            <div class="mb-3">
              <label>Devise source</label>
              <Multiselect
                v-model="form.sourceCurrencyCode"
                :options="currencies"
                label="code"
                track-by="code"
                valueProp="code"
              />
            </div>

            <div class="mb-3">
              <label>Devise cible</label>
              <Multiselect
                v-model="form.targetCurrencyCode"
                :options="currencies"
                label="code"
                track-by="code"
                valueProp="code"
              />
            </div>

            <div class="mb-3">
              <label>Taux</label>
              <Field name="rate" v-model="form.rate" type="number" class="form-control" />
              <ErrorMessage name="rate" class="text-danger" />
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm">
              Annuler
            </button>
            <button class="btn btn-success" :disabled="isLoading">
              {{ isLoading ? "Enregistrement..." : "Enregistrer" }}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import Multiselect from "@vueform/multiselect";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as Yup from "yup";
  import ApiService from "../../services/ApiService";
  import { success, error } from "../../utils/utils";
  import { Modal } from "bootstrap";

  export default defineComponent({
    components: { Form, Field, ErrorMessage, Multiselect },
    emits: ["close"],

    setup(_, { emit }) {
      const currencies = ref([]);
      const isLoading = ref(false);

      const rateForm = ref<any>(null);
      
      const resetForm = () => {
        rateForm.value?.resetForm();

        form.value = {
          sourceCurrencyCode: "",
          targetCurrencyCode: "",
          rate: null
        };
      };

      const closeModal = () => {
          const modalEl = document.getElementById("AddCurrencyRateModal");
          if (modalEl) {
              const modal = Modal.getInstance(modalEl);
              modal?.hide();
          }
      };

      const form = ref({
        sourceCurrencyCode: "",
        targetCurrencyCode: "",
        rate: null
      });

      const schema = Yup.object({
        rate: Yup.number().required()
      });

      const getCurrencies = () => {
        ApiService.get("/getCurrencies?page=1&limit=100")
          .then(({ data }) => {
            currencies.value = data.data.data;
          });
      };

      const addCurrencyRate = async (values: any) => {
        isLoading.value = true;

        try {
          const response = await ApiService.post("/addCurrencyRate", {
            sourceCurrencyCode: form.value.sourceCurrencyCode,
            targetCurrencyCode: form.value.targetCurrencyCode,
            rate: values.rate
          });

          resetForm();
          closeModal();
          success(response.data.message);
          emit("close");
        } catch (err: any) {
          error(err?.response?.data?.message);
        } finally {
          isLoading.value = false;
        }
      };

      onMounted(() => {
        getCurrencies();
      });

      return {
        currencies,
        form,
        schema,
        isLoading,
        resetForm,
        addCurrencyRate,
      };
    },
  });
</script>
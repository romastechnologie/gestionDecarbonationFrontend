<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="installationForm" @submit="updateInstallation" :validation-schema="installationSchema">
        <div class="row">

          <!-- Nom -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Nom</label>
              <Field name="name" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom" />
              <ErrorMessage name="name" class="text-danger" />
            </div>
          </div>

          <!-- Type -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Type</label>
              <Field name="type" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="typeOptions"
                  v-model="selectedType"
                  v-bind="field"
                  placeholder="Sélectionner le type"
                  @change="onTypeChange"
                />
              </Field>
              <ErrorMessage name="type" class="text-danger" />

              <!-- Champ personnalisé si AUTRES -->
              <div v-if="selectedType === 'AUTRES'" class="mt-10">
                <input
                  type="text"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Précisez le type d'installation"
                  v-model="customTypeValue"
                />
                <span v-if="customTypeError" class="text-danger" style="font-size:13px;">{{ customTypeError }}</span>
              </div>
            </div>
          </div>

          <!-- Pays -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Pays</label>
              <Field name="paysId" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="paysOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le pays"
                />
              </Field>
              <ErrorMessage name="paysId" class="text-danger" />
            </div>
          </div>

          <!-- Ville -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Ville</label>
              <Field name="city" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la ville" />
              <ErrorMessage name="city" class="text-danger" />
            </div>
          </div>

          <!-- Code pays -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Code pays (2 lettres)</label>
              <Field name="countryCode" type="text" maxlength="2" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: FR, BJ, US" />
              <ErrorMessage name="countryCode" class="text-danger" />
            </div>
          </div>

          <!-- Latitude -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Latitude</label>
              <Field name="latitude" type="number" step="0.000001" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 6.352222" />
              <ErrorMessage name="latitude" class="text-danger" />
            </div>
          </div>

          <!-- Longitude -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Longitude</label>
              <Field name="longitude" type="number" step="0.000001" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 2.352222" />
              <ErrorMessage name="longitude" class="text-danger" />
            </div>
          </div>

          <!-- Boutons -->
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Modification...' : "Modifier l'installation" }}
              </button>
              <router-link to="/listInstallation" class="btn btn-danger transition border-0 lh-1 fw-medium">
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
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';

const KNOWN_TYPES = ['PORT', 'AIRPORT', 'USINE', 'ENTREPOT', 'TERMINAL', 'AUTRES'];

export default defineComponent({
  name: 'EditInstallation',
  components: { Form, Field, ErrorMessage, Multiselect },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const installationForm = ref<any>(null);
    const isLoading = ref(false);
    const paysOptions = ref<{ label: string; value: string }[]>([]);

    const typeOptions = [...KNOWN_TYPES];
    const selectedType = ref<string | null>(null);
    const customTypeValue = ref('');
    const customTypeError = ref('');

    const installationSchema = Yup.object().shape({
      name: Yup.string().nullable(),
      type: Yup.string().nullable(),
      paysId: Yup.string().nullable(),
      city: Yup.string().nullable(),
      countryCode: Yup.string().nullable().max(2, 'Maximum 2 caractères'),
      latitude: Yup.number().nullable().typeError('Valeur numérique invalide'),
      longitude: Yup.number().nullable().typeError('Valeur numérique invalide'),
    });

    const onTypeChange = (val: string) => {
        selectedType.value = val;
       
        if (val !== 'AUTRES') {
            customTypeValue.value = '';
        }
        customTypeError.value = '';
    };

    onMounted(async () => {
      const id = route.params.id as string;
      try {
        const [instRes, paysRes] = await Promise.all([
          ApiService.get(`/getInstallation/${id}`),
          ApiService.get('/getPays'),
        ]);

        paysOptions.value = paysRes.data.data.map((p: any) => ({
          label: p.nom,
          value: p.id,
        }));

        const installation = instRes.data.data;
        const currentType = installation.type;

        // Si le type en base n'est pas dans la liste connue → c'est un type custom
        if (currentType && !KNOWN_TYPES.includes(currentType)) {
          selectedType.value = 'AUTRES';
          customTypeValue.value = currentType;
        } else {
          selectedType.value = currentType ?? null;
        }

        installationForm.value?.setValues({
        ...installation,
        paysId: installation.pays?.id ?? null,
        });

      } catch (err) {
        error("Impossible de charger les données de l'installation.");
      }
    });

    const updateInstallation = async (values: any) => {
      const id = route.params.id as string;
      isLoading.value = true;

      // Validation manuelle du champ custom
      if (selectedType.value === 'AUTRES') {
        if (!customTypeValue.value.trim()) {
          customTypeError.value = 'Veuillez préciser le type d\'installation.';
          isLoading.value = false;
          return;
        }
        values.type = customTypeValue.value.trim().toUpperCase();
      }

      try {
        const { data } = await ApiService.put(`/modifierInstallation/${id}`, values);
        if (data.code === 200) {
          success(data.message);
          router.push({ name: 'ListInstallationPage' });
        }
      } catch (err: any) {
        error(err?.response?.data?.message || 'Une erreur est survenue.');
      } finally {
        isLoading.value = false;
      }
    };

    return {
      installationForm, installationSchema,
      typeOptions, paysOptions,
      selectedType, customTypeValue, customTypeError,
      onTypeChange,
      isLoading, updateInstallation,
    };
  },
});
</script>
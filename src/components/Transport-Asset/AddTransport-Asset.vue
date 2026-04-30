<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="transportForm" @submit="addTransportAsset" :validation-schema="transportSchema">
        <div class="row">

          <!-- Type -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type <span class="text-danger">*</span>
              </label>
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
                  placeholder="Précisez le type de transport"
                  v-model="customTypeValue"
                />
                <span v-if="customTypeError" class="text-danger" style="font-size:13px;">{{ customTypeError }}</span>
              </div>
            </div>
          </div>

          <!-- Identifiant -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Identifiant (IMO / Immatriculation) <span class="text-danger">*</span>
              </label>
              <Field name="identifier" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'identifiant" />
              <ErrorMessage name="identifier" class="text-danger" />
            </div>
          </div>

          <!-- Catégorie -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Catégorie</label>
              <Field name="category" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la catégorie" />
              <ErrorMessage name="category" class="text-danger" />
            </div>
          </div>

          <!-- Type de moteur -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Type de moteur</label>
              <Field name="typeMoteur" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le type de moteur" />
              <ErrorMessage name="typeMoteur" class="text-danger" />
            </div>
          </div>

          <!-- Type de carburant -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Type de carburant</label>
              <Field name="fuelType" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="fuelTypeOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le type de carburant"
                />
              </Field>
              <ErrorMessage name="fuelType" class="text-danger" />
            </div>
          </div>

          <!-- Date de mise en production -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Date de mise en production</label>
              <Field name="DateMiseProduction" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="DateMiseProduction" class="text-danger" />
            </div>
          </div>

          <!-- Nom -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Nom du transport</label>
              <Field name="name" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom" />
              <ErrorMessage name="name" class="text-danger" />
            </div>
          </div>

          <!-- Propriétaire -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Nom du propriétaire</label>
              <Field name="ownerName" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du propriétaire" />
              <ErrorMessage name="ownerName" class="text-danger" />
            </div>
          </div>

          <!-- Organisation -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Organisation</label>
              <Multiselect
                :searchable="true"
                :options="organisationOptions"
                v-model="selectedOrganisationId"
                placeholder="Sélectionner une organisation"
                label="label"
                track-by="value"
                :valueProp="'value'"
              />
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
                {{ isLoading ? 'Enregistrement...' : 'Enregistrer le transport' }}
              </button>
              <router-link to="/listTransportAsset" class="btn btn-danger transition border-0 lh-1 fw-medium">
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
import { useRouter } from 'vue-router';
import axios from 'axios';

const KNOWN_TYPES = ['NAVIRE', 'AVION', 'AUTRES'];
const fuelTypeOptions = [
  'Essence',
  'Gazole (Diesel)',
  'Kérosène',
  'GPL (Gaz de Pétrole Liquéfié)',
  'Fioul lourd',
];

export default defineComponent({
  name: 'AddTransportAsset',
  components: { Form, Field, ErrorMessage, Multiselect },
  setup() {
    const router = useRouter();
    const transportForm = ref<any>(null);
    const isLoading = ref(false);

    const typeOptions = [...KNOWN_TYPES];
    const selectedType = ref<string | null>(null);
    const customTypeValue = ref('');
    const customTypeError = ref('');

    // Organisation
    const organisationOptions = ref<{ value: string; label: string }[]>([]);
    const selectedOrganisationId = ref<string | null>(null);

  const loadOrganisations = () => {
  axios.get('http://localhost:3005/api/listOrganisations?page=1&limit=100')
    .then(({ data }) => {
      console.log('Organisations reçues:', data);
      organisationOptions.value = data.data.data.map((org: any) => ({
        value: org.id,
        label: org.name,
      }));
      console.log('Options:', organisationOptions.value);
    })
    .catch((err) => {
      console.error('Erreur:', err);
    });
};
    const transportSchema = Yup.object().shape({
      type: Yup.string().required('Le type est obligatoire'),
      identifier: Yup.string().required("L'identifiant est obligatoire"),
      category: Yup.string().nullable(),
      typeMoteur: Yup.string().nullable(),
      DateMiseProduction: Yup.date().nullable().typeError('La date est invalide'),
      name: Yup.string().nullable(),
      ownerName: Yup.string().nullable(),
      fuelType: Yup.string().nullable(),
    });

    const onTypeChange = (val: string) => {
      selectedType.value = val;
      if (val !== 'AUTRES') customTypeValue.value = '';
      customTypeError.value = '';
    };

    const addTransportAsset = async (values: any) => {
      if (selectedType.value === 'AUTRES') {
        if (!customTypeValue.value.trim()) {
          customTypeError.value = 'Veuillez préciser le type de transport.';
          return;
        }
        values.type = customTypeValue.value.trim().toUpperCase();
      }

      // Ajout de l'organisationId si sélectionnée
      if (selectedOrganisationId.value) {
        values.organisationId = selectedOrganisationId.value;
      }

      isLoading.value = true;
      try {
        const { data } = await ApiService.post('/addTransport', values);
        if (data.code === 201) {
          success(data.message);
          transportForm.value?.resetForm();
          selectedType.value = null;
          customTypeValue.value = '';
          selectedOrganisationId.value = null;
          router.push({ name: 'ListTransportAssetPage' });
        }
      } catch (err: any) {
        error(err?.response?.data?.message || 'Une erreur est survenue.');
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      loadOrganisations();
    });

    return {
      transportForm,
      transportSchema,
      typeOptions,
      selectedType,
      customTypeValue,
      customTypeError,
      isLoading,
      onTypeChange,
      addTransportAsset,
      fuelTypeOptions,
      organisationOptions,
      selectedOrganisationId,
    };
  },
});
</script>
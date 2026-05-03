<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="co2TariffForm" @submit="soumettre" :validation-schema="schema">
        <div class="row">

          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Moyen de transport <span class="text-danger">*</span>
              </label>
              <Field name="transport" v-slot="{ field }">
                <Multiselect
                  :searchable="false"
                  :options="transportOptions"
                  v-model="selectedTransport"
                  v-bind="field"
                  placeholder="Sélectionner le transport"
                  @change="onTransportChange"
                />
              </Field>
              <ErrorMessage name="transport" class="text-danger" />
            </div>
          </div>

          <template v-if="selectedTransport === 'NAVIRE'">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de tarif <span class="text-danger">*</span>
                </label>
                <Field name="tariffType" v-slot="{ field }">
                  <Multiselect
                    :searchable="false"
                    :options="navireTypeOptions"
                    v-model="selectedNavireType"
                    v-bind="field"
                    placeholder="Sélectionner le type de tarif"
                    @change="onNavireTypeChange"
                  />
                </Field>
                <ErrorMessage name="tariffType" class="text-danger" />
              </div>
            </div>
          </template>

          <template v-if="selectedTransport === 'AVION'">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prix tonne carbone <span class="text-danger">*</span>
                </label>
                <Field name="prixCo2" type="number" step="0.0001" min="0"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ex: 85.00" />
                <ErrorMessage name="prixCo2" class="text-danger" />
              </div>
            </div>
          </template>

          <template v-if="selectedTransport === 'NAVIRE' && selectedNavireType === 'BULK'">

            <!-- Catégorie HS -->
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Catégorie de marchandise <span class="text-danger">*</span>
                </label>
                <Field name="categoryId" v-slot="{ field }">
                  <Multiselect
                    :searchable="true"
                    :options="categoryOptions"
                    v-model="selectedCategoryId"
                    v-bind="field"
                    placeholder="Sélectionner la catégorie"
                    label="label"
                    track-by="value"
                    :valueProp="'value'"
                  />
                </Field>
                <ErrorMessage name="categoryId" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Tarif carbone par tonne <span class="text-danger">*</span>
                </label>
                <Field name="amount" type="number" step="0.0001" min="0"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ex: 25.00" />
                <ErrorMessage name="amount" class="text-danger" />
              </div>
            </div>

          </template>

          <template v-if="selectedTransport === 'NAVIRE' && selectedNavireType === 'CONTAINER'">

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Armateur <span class="text-danger">*</span>
                </label>
                <Field name="carrier" type="text"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ex: MSC, MAERSK" />
                <ErrorMessage name="carrier" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Région départ <span class="text-danger">*</span>
                </label>
                <Field name="regionFromId" v-slot="{ field }">
                  <Multiselect
                    :searchable="true"
                    :options="regionOptions"
                    v-model="selectedRegionFromId"
                    v-bind="field"
                    placeholder="Sélectionner la région"
                    label="label"
                    track-by="value"
                    :valueProp="'value'"
                  />
                </Field>
                <ErrorMessage name="regionFromId" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Région arrivée <span class="text-danger">*</span>
                </label>
                <Field name="regionToId" v-slot="{ field }">
                  <Multiselect
                    :searchable="true"
                    :options="regionOptions"
                    v-model="selectedRegionToId"
                    v-bind="field"
                    placeholder="Sélectionner la région"
                    label="label"
                    track-by="value"
                    :valueProp="'value'"
                  />
                </Field>
                <ErrorMessage name="regionToId" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de conteneur <span class="text-danger">*</span>
                </label>
                <Field name="containerTypeCode" v-slot="{ field }">
                  <Multiselect
                    :searchable="true"
                    :options="containerTypeOptions"
                    v-model="selectedContainerType"
                    v-bind="field"
                    placeholder="Sélectionner le type"
                    label="label"
                    track-by="value"
                    :valueProp="'value'"
                    @change="onContainerTypeChange"
                  />
                </Field>
                <ErrorMessage name="containerTypeCode" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Unité de base <span class="text-danger">*</span>
                </label>
                <Field name="baseUnit" v-slot="{ field }">
                  <Multiselect
                    :searchable="false"
                    :options="baseUnitOptions"
                    v-model="selectedBaseUnit"
                    v-bind="field"
                    placeholder="Sélectionner l'unité"
                  />
                </Field>
                <ErrorMessage name="baseUnit" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Tarif carbone par conteneur <span class="text-danger">*</span>
                </label>
                <Field name="amount" type="number" step="0.0001" min="0"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ex: 150.00" />
                <ErrorMessage name="amount" class="text-danger" />
              </div>
            </div>

          </template>

          <template v-if="showCommonFields">
            <div class="col-md-12">
              <div class="d-flex align-items-center">
                <button
                  class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  type="submit"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Enregistrement...' : 'Enregistrer le tarif' }}
                </button>
                <router-link
                  to="/listCo2Tariff"
                  class="btn btn-danger transition border-0 lh-1 fw-medium"
                >
                  <i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative">Annuler</span>
                </router-link>
              </div>
            </div>
          </template>

        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';

interface SelectOption {
  value: string;
  label: string;
}

const CONTAINER_TYPES: { value: string; label: string }[] = [
  { value: '20DRY',  label: "20' Dry" },
  { value: '40DRY',  label: "40' Dry" },
  { value: '40HC',   label: "40' High Cube" },
  { value: '20RF',   label: "20' Reefer" },
  { value: '40RF',   label: "40' Reefer" },
  { value: '20OT',   label: "20' Open Top" },
  { value: '40OT',   label: "40' Open Top" },
  { value: '20FR',   label: "20' Flat Rack" },
  { value: '40FR',   label: "40' Flat Rack" },
  { value: '45HC',   label: "45' High Cube" },
];

const BASE_UNITS = ['TEU', 'FEU', 'Conteneur', 'Unité'];

export default defineComponent({
  name: 'AddCo2Tariff',
  components: { Form, Field, ErrorMessage, Multiselect },
  setup() {
    const router        = useRouter();
    const co2TariffForm = ref<any>(null);
    const isLoading     = ref(false);


    const selectedTransport   = ref<string>('');
    const selectedNavireType  = ref<string>('');

    const selectedRegionFromId  = ref<string>('');
    const selectedRegionToId    = ref<string>('');
    const selectedCategoryId    = ref<string>('');
    const selectedContainerType = ref<string>('');
    const selectedBaseUnit      = ref<string>('');
    const containerTypeLib      = ref<string>('');

    const regionOptions   = ref<SelectOption[]>([]);
    const categoryOptions = ref<SelectOption[]>([]);

    const transportOptions   = ['AVION', 'NAVIRE'];
    const navireTypeOptions  = [
      { value: 'BULK',      label: 'Marchandises en vrac' },
      { value: 'CONTAINER', label: 'Conteneur' },
    ];
    const containerTypeOptions = CONTAINER_TYPES;
    const baseUnitOptions      = BASE_UNITS;

    const showCommonFields = computed(() => {
      if (selectedTransport.value === 'AVION') return true;
      if (selectedTransport.value === 'NAVIRE' && selectedNavireType.value !== '') return true;
      return false;
    });

    const schema = computed(() =>
      Yup.object().shape({
        transport: Yup.string().required('Le moyen de transport est obligatoire'),

        tariffType: Yup.string().when('transport', {
          is: 'NAVIRE',
          then: (s) => s.required('Le type de tarif est obligatoire'),
          otherwise: (s) => s.nullable(),
        }),

        prixCo2: Yup.number().when('transport', {
          is: 'AVION',
          then: (s) => s.required('Le prix carbone est obligatoire').min(0, 'Valeur invalide').typeError('Nombre requis'),
          otherwise: (s) => s.nullable(),
        }),

        amount: Yup.number().when('transport', {
          is: 'NAVIRE',
          then: (s) => s.required('Le montant est obligatoire').min(0, 'Valeur invalide').typeError('Nombre requis'),
          otherwise: (s) => s.nullable(),
        }),

        categoryId: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'BULK',
          then: (s) => s.required('La catégorie est obligatoire'),
          otherwise: (s) => s.nullable(),
        }),

        carrier: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'CONTAINER',
          then: (s) => s.required("L'armateur est obligatoire"),
          otherwise: (s) => s.nullable(),
        }),

        regionFromId: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'CONTAINER',
          then: (s) => s.required('La région de départ est obligatoire'),
          otherwise: (s) => s.nullable(),
        }),

        regionToId: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'CONTAINER',
          then: (s) => s.required("La région d'arrivée est obligatoire"),
          otherwise: (s) => s.nullable(),
        }),

        containerTypeCode: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'CONTAINER',
          then: (s) => s.required('Le type de conteneur est obligatoire'),
          otherwise: (s) => s.nullable(),
        }),

        baseUnit: Yup.string().when(['transport', 'tariffType'], {
          is: (t: string, tt: string) => t === 'NAVIRE' && tt === 'CONTAINER',
          then: (s) => s.required("L'unité de base est obligatoire"),
          otherwise: (s) => s.nullable(),
        }),


      })
    );

    const chargerDonnees = async () => {
      try {
        const [regRes, catRes] = await Promise.all([
          ApiService.get('/api/regions'),
          ApiService.get('/api/all/categorieHs'),
        ]);
        regionOptions.value   = regRes.data.data.map((r: any) => ({ value: r.id, label: r.name }));
        categoryOptions.value = catRes.data.data.map((c: any) => ({
          value: c.id,
          label: `${c.code} — ${c.productfr}`,
        }));
      } catch (e) {
        error('Erreur lors du chargement des données de référence.');
      }
    };

    const onTransportChange = (val: string) => {
      selectedTransport.value   = val;
      selectedNavireType.value  = '';
      selectedRegionFromId.value = '';
      selectedRegionToId.value   = '';
      selectedCategoryId.value   = '';
      selectedContainerType.value = '';
      selectedBaseUnit.value      = '';
      containerTypeLib.value      = '';
      co2TariffForm.value?.resetForm({ values: { transport: val } });
    };

    const onNavireTypeChange = (val: string) => {
      selectedNavireType.value    = val;
      selectedCategoryId.value    = '';
      selectedContainerType.value = '';
      selectedBaseUnit.value      = '';
      containerTypeLib.value      = '';
      co2TariffForm.value?.setFieldValue('tariffType', val);
    };

    const onContainerTypeChange = (val: string) => {
      const found = CONTAINER_TYPES.find((c) => c.value === val);
      containerTypeLib.value = found ? found.label : '';
      co2TariffForm.value?.setFieldValue('containerTypeCode', val);
    };

    const construirePayload = (values: any): Record<string, any> => {
      const base = {};

      if (selectedTransport.value === 'AVION') {
        return { ...base, tariffType: 'CARBON_PRICE', prixCo2: values.prixCo2 };
      }

      if (selectedNavireType.value === 'BULK') {
        return {
          ...base,
          tariffType: 'BULK',
          categoryId: selectedCategoryId.value,
          amount:     values.amount,
        };
      }

      // CONTAINER
      return {
        ...base,
        tariffType:        'CONTAINER',
        carrier:           values.carrier,
        regionFromId:      selectedRegionFromId.value,
        regionToId:        selectedRegionToId.value,
        containerTypeCode: selectedContainerType.value,
        containerTypeLib:  containerTypeLib.value,
        baseUnit:          selectedBaseUnit.value,
        amount:            values.amount,
      };
    };

    const soumettre = async (values: any) => {
      try {
        isLoading.value = true;
        const payload = construirePayload(values);
        const { data } = await ApiService.post('/addCarbonTariff', payload);

        if (data.code === 201) {
          success('Tarif CO2 enregistré avec succès.');
          co2TariffForm.value?.resetForm();
          selectedTransport.value     = '';
          selectedNavireType.value    = '';
          selectedRegionFromId.value  = '';
          selectedRegionToId.value    = '';
          selectedCategoryId.value    = '';
          selectedContainerType.value = '';
          selectedBaseUnit.value      = '';
          containerTypeLib.value      = '';
          router.push({ name: 'ListCo2TariffPage' });
        }
      } catch (err: any) {
        error(err?.response?.data?.message || "Erreur lors de l'enregistrement.");
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(chargerDonnees);

    return {
      co2TariffForm,
      schema,
      isLoading,
      transportOptions,
      navireTypeOptions,
      containerTypeOptions,
      baseUnitOptions,
      selectedTransport,
      selectedNavireType,
      selectedRegionFromId,
      selectedRegionToId,
      selectedCategoryId,
      selectedContainerType,
      selectedBaseUnit,
      containerTypeLib,
      regionOptions,
      categoryOptions,
      showCommonFields,
      onTransportChange,
      onNavireTypeChange,
      onContainerTypeChange,
      soumettre,
    };
  },
});
</script>
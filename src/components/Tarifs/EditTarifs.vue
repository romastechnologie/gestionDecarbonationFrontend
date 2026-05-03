<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">

      <div v-if="isLoadingData" class="text-center py-40">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-10 text-black">Chargement...</p>
      </div>

      <Form v-else ref="co2TariffForm" @submit="soumettre" :validation-schema="schema">
        <div class="row">

          <!-- Type d'engin -->
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type d'engin <span class="text-danger">*</span>
              </label>
              <Field name="enginType" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="enginTypeOptions"
                  v-model="selectedEnginType"
                  v-bind="field"
                  placeholder="Sélectionner le type"
                  @change="onEnginChange"
                />
              </Field>
              <ErrorMessage name="enginType" class="text-danger" />
            </div>
          </div>

          <!-- ══ CHAMPS NAVIRE ══ -->
          <template v-if="selectedEnginType === 'NAVIRE'">

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Armateur <span class="text-danger">*</span>
                </label>
                <Field name="carrier" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: MSC, MAERSK" />
                <ErrorMessage name="carrier" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code type conteneur <span class="text-danger">*</span>
                </label>
                <Field name="containerTypeCode" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 20DRY, 40HC" />
                <ErrorMessage name="containerTypeCode" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Libellé type conteneur</label>
                <Field name="containerTypeLib" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 20' Dry" />
                <ErrorMessage name="containerTypeLib" class="text-danger" />
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
                <label class="d-block text-black fw-semibold mb-10">Unité de base</label>
                <Field name="baseUnit" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: TEU, Conteneur" />
                <ErrorMessage name="baseUnit" class="text-danger" />
              </div>
            </div>

          </template>

          <!-- ══ CHAMPS COMMUNS ══ -->
          <template v-if="selectedEnginType !== ''">

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  {{ selectedEnginType === 'NAVIRE' ? 'Montant par conteneur' : 'Montant par tonne CO2' }}
                  <span class="text-danger">*</span>
                </label>
                <Field name="amount" type="number" step="0.0001" min="0" class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 150.00" />
                <ErrorMessage name="amount" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Devise <span class="text-danger">*</span>
                </label>
                <Field name="currencyId" v-slot="{ field }">
                  <Multiselect
                    :searchable="true"
                    :options="currencyOptions"
                    v-model="selectedCurrencyId"
                    v-bind="field"
                    placeholder="Sélectionner la devise"
                    label="label"
                    track-by="value"
                    :valueProp="'value'"
                  />
                </Field>
                <ErrorMessage name="currencyId" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Valide à partir du <span class="text-danger">*</span>
                </label>
                <Field name="validFrom" type="date" class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="validFrom" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Valide jusqu'au</label>
                <Field name="validTo" type="date" class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="validTo" class="text-danger" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Statut</label>
                <div class="form-check form-switch mt-8">
                  <input v-model="isActive" class="form-check-input" type="checkbox" id="isActive" />
                  <label class="form-check-label text-black" for="isActive">
                    {{ isActive ? 'Actif' : 'Inactif' }}
                  </label>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="d-flex align-items-center">
                <button
                  class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  type="submit"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Enregistrement...' : 'Modifier le tarif' }}
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
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';

interface SelectOption { value: string; label: string; }

export default defineComponent({
  name: 'EditCo2Tariff',
  components: { Form, Field, ErrorMessage, Multiselect },
  setup() {
    const router      = useRouter();
    const route       = useRoute();
    const tariffId    = route.params.id as string;

    const co2TariffForm     = ref<any>(null);
    const isLoading         = ref(false);
    const isLoadingData     = ref(true);
    const isActive          = ref(true);

    const enginTypeOptions      = ['NAVIRE', 'AVION', 'AUTRES'];
    const selectedEnginType     = ref<string>('');
    const selectedRegionFromId  = ref<string>('');
    const selectedRegionToId    = ref<string>('');
    const selectedCurrencyId    = ref<string>('');

    const regionOptions   = ref<SelectOption[]>([]);
    const currencyOptions = ref<SelectOption[]>([]);

    const schema = Yup.object().shape({
      enginType:  Yup.string().required('Le type d\'engin est obligatoire'),
      amount:     Yup.number().required('Le montant est obligatoire').min(0),
      currencyId: Yup.string().required('La devise est obligatoire'),
      validFrom:  Yup.date().required('La date de début est obligatoire').typeError('Date invalide'),
      validTo:    Yup.date().nullable().typeError('Date invalide'),
      carrier: Yup.string().when('enginType', {
        is: 'NAVIRE',
        then: (s) => s.required('L\'armateur est obligatoire'),
        otherwise: (s) => s.nullable(),
      }),
      containerTypeCode: Yup.string().when('enginType', {
        is: 'NAVIRE',
        then: (s) => s.required('Le code type conteneur est obligatoire'),
        otherwise: (s) => s.nullable(),
      }),
      regionFromId: Yup.string().when('enginType', {
        is: 'NAVIRE',
        then: (s) => s.required('La région de départ est obligatoire'),
        otherwise: (s) => s.nullable(),
      }),
      regionToId: Yup.string().when('enginType', {
        is: 'NAVIRE',
        then: (s) => s.required('La région d\'arrivée est obligatoire'),
        otherwise: (s) => s.nullable(),
      }),
      containerTypeLib: Yup.string().nullable(),
      baseUnit:         Yup.string().nullable(),
    });

    // ── Mapping tariffType → enginType ───────────────────────────────────
    const tariffTypeToEngin = (tariffType: string, carrier?: string): string => {
      if (tariffType === 'CONTAINER') return 'NAVIRE';
      if (tariffType === 'CARBON_PRICE') return 'AVION'; // par défaut AVION, l'utilisateur peut changer
      return 'AUTRES';
    };

    const formatDate = (d: string | null) => {
      if (!d) return '';
      return new Date(d).toISOString().split('T')[0];
    };

    // ── Chargement des données de référence + tarif existant ─────────────
    const chargerDonnees = async () => {
      try {
        const [regRes, curRes, tariffRes] = await Promise.all([
          ApiService.get('/getRegions'),
          ApiService.get('/getCurrencies'),
          ApiService.get(`/getCarbonTariff/${tariffId}`),
        ]);

        regionOptions.value   = regRes.data.data.map((r: any) => ({ value: r.id, label: r.name }));
        currencyOptions.value = curRes.data.data.map((c: any) => ({ value: c.id, label: `${c.code} - ${c.name}` }));

        const t = tariffRes.data.data;

        // Déterminer le type d'engin
        selectedEnginType.value   = tariffTypeToEngin(t.tariffType);
        selectedCurrencyId.value  = t.currency?.id ?? '';
        selectedRegionFromId.value = t.regionFrom?.id ?? '';
        selectedRegionToId.value   = t.regionTo?.id ?? '';
        isActive.value             = t.isActive;

        // Pré-remplir le formulaire
        await co2TariffForm.value?.setValues({
          enginType:         selectedEnginType.value,
          amount:            t.amount,
          currencyId:        selectedCurrencyId.value,
          validFrom:         formatDate(t.validFrom),
          validTo:           formatDate(t.validTo),
          carrier:           t.carrier ?? '',
          containerTypeCode: t.containerTypeCode ?? '',
          containerTypeLib:  t.containerTypeLib ?? '',
          baseUnit:          t.baseUnit ?? '',
          regionFromId:      selectedRegionFromId.value,
          regionToId:        selectedRegionToId.value,
        });

      } catch (e) {
        error('Erreur lors du chargement du tarif.');
      } finally {
        isLoadingData.value = false;
      }
    };

    const onEnginChange = (val: string) => {
      selectedEnginType.value    = val;
      selectedRegionFromId.value = '';
      selectedRegionToId.value   = '';
    };

    const construirePayload = (values: any) => {
      const tariffTypeMap: Record<string, string> = {
        NAVIRE: 'CONTAINER',
        AVION:  'CARBON_PRICE',
        AUTRES: 'CARBON_PRICE',
      };

      const payload: Record<string, any> = {
        tariffType:  tariffTypeMap[selectedEnginType.value],
        amount:      values.amount,
        currencyId:  selectedCurrencyId.value,
        validFrom:   values.validFrom,
        validTo:     values.validTo || null,
        isActive:    isActive.value,
      };

      if (selectedEnginType.value === 'NAVIRE') {
        payload.carrier           = values.carrier;
        payload.containerTypeCode = values.containerTypeCode;
        payload.containerTypeLib  = values.containerTypeLib || null;
        payload.baseUnit          = values.baseUnit || null;
        payload.regionFromId      = selectedRegionFromId.value;
        payload.regionToId        = selectedRegionToId.value;
      }

      return payload;
    };

    const soumettre = async (values: any) => {
      try {
        isLoading.value = true;
        const payload = construirePayload(values);
        const { data } = await ApiService.put(`/updateCo2Tariff/${tariffId}`, payload);

        if (data.code === 200) {
          success('Tarif CO2 modifié avec succès.');
          router.push({ name: 'ListCo2TariffPage' });
        }
      } catch (err: any) {
        error(err?.response?.data?.message || 'Erreur lors de la modification.');
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(chargerDonnees);

    return {
      co2TariffForm, schema, isLoading, isLoadingData, isActive,
      enginTypeOptions, selectedEnginType,
      selectedRegionFromId, selectedRegionToId, selectedCurrencyId,
      regionOptions, currencyOptions,
      onEnginChange, soumettre,
    };
  },
});
</script>
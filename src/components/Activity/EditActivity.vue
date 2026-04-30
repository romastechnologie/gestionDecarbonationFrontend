<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="activityForm" @submit="updateActivity" :validation-schema="activitySchema">
        <div class="row">

          <!-- Mode -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Mode <span class="text-danger">*</span>
              </label>
              <Field name="mode" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="modeOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le mode"
                />
              </Field>
              <ErrorMessage name="mode" class="text-danger" />
            </div>
          </div>

          <!-- Statut -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Statut</label>
              <Field name="status" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="statusOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le statut"
                />
              </Field>
              <ErrorMessage name="status" class="text-danger" />
            </div>
          </div>

          <!-- Installation Source -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Installation source</label>
              <Field name="installationFromId" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="installationOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner l'installation source"
                />
              </Field>
              <ErrorMessage name="installationFromId" class="text-danger" />
            </div>
          </div>

          <!-- Installation Destination -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Installation destination</label>
              <Field name="installationToId" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="installationOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner l'installation destination"
                />
              </Field>
              <ErrorMessage name="installationToId" class="text-danger" />
            </div>
          </div>

          <!-- Transport Asset -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Transport asset</label>
              <Field name="transportAssetId" v-slot="{ field }">
                <Multiselect
                  :searchable="true"
                  :options="transportOptions"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le transport"
                />
              </Field>
              <ErrorMessage name="transportAssetId" class="text-danger" />
            </div>
          </div>

          <!-- Manifeste -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Manifeste (Référence SIC)</label>
              <Field
                name="manifestSicReference"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la référence SIC du manifeste"
              />
              <ErrorMessage name="manifestSicReference" class="text-danger" />
            </div>
          </div>

          <!-- Période début -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Période début <span class="text-danger">*</span>
              </label>
              <Field
                name="periodStart"
                type="datetime-local"
                class="form-control shadow-none fs-md-15 text-black"
              />
              <ErrorMessage name="periodStart" class="text-danger" />
            </div>
          </div>

          <!-- Période fin -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Période fin <span class="text-danger">*</span>
              </label>
              <Field
                name="periodEnd"
                type="datetime-local"
                class="form-control shadow-none fs-md-15 text-black"
              />
              <ErrorMessage name="periodEnd" class="text-danger" />
            </div>
          </div>

          <!-- Masse cargo (T) -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Masse cargo (T)</label>
              <Field
                name="cargoMassT"
                type="number"
                step="0.0001"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la masse cargo"
              />
              <ErrorMessage name="cargoMassT" class="text-danger" />
            </div>
          </div>

          <!-- Distance (Km) -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Distance (Km)</label>
              <Field
                name="distanceKm"
                type="number"
                step="0.0001"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la distance"
              />
              <ErrorMessage name="distanceKm" class="text-danger" />
            </div>
          </div>

          <!-- Masse carburant + Unité -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Masse carburant</label>
              <div class="input-group">
                <Field
                  name="fuelMassT"
                  type="number"
                  step="0.0001"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer la masse carburant"
                />
                <Field name="fuelMassUnit" v-slot="{ field }">
                  <select
                    v-bind="field"
                    class="input-group-text bg-white border-start-0 shadow-none fs-md-15 text-black"
                    style="cursor: pointer; min-width: 70px;"
                  >
                    <option value="T">T</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                    <option value="m³">m³</option>
                  </select>
                </Field>
              </div>
              <ErrorMessage name="fuelMassT" class="text-danger" />
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
                {{ isLoading ? 'Modification...' : "Modifier l'activité" }}
              </button>
              <router-link
                to="/listActivity"
                class="btn btn-danger transition border-0 lh-1 fw-medium"
              >
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
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'EditActivity',
  components: { Form, Field, ErrorMessage, Multiselect },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activityForm = ref<any>(null);
    const isLoading = ref(false);

    const modeOptions = ['MARITIME', 'AIR'];
    const statusOptions = ['PENDING', 'VALIDATED', 'REJECTED'];
    const installationOptions = ref<{ label: string; value: string }[]>([]);
    const transportOptions = ref<{ label: string; value: string }[]>([]);
    const activitySchema = Yup.object().shape({
      mode: Yup.string().required('Le mode est obligatoire'),
      status: Yup.string().nullable(),
      installationFromId: Yup.string().nullable(),
      installationToId: Yup.string().nullable(),
      transportAssetId: Yup.string().nullable(),
      manifestSicReference: Yup.string().nullable(), // ← identifiant par sicReference
      periodStart: Yup.date().required('La période de début est obligatoire').typeError('Date invalide'),
      periodEnd: Yup.date()
        .required('La période de fin est obligatoire')
        .typeError('Date invalide')
        .min(Yup.ref('periodStart'), 'La date de fin doit être après la date de début'),
      cargoMassT: Yup.number().nullable().typeError('Valeur numérique invalide'),
      distanceKm: Yup.number().nullable().typeError('Valeur numérique invalide'),
      fuelMassT: Yup.number().nullable().typeError('Valeur numérique invalide'),
      fuelMassUnit: Yup.string().nullable(),
    });

    onMounted(async () => {
      const id = route.params.id as string;
      try {
        const [actRes, instRes, transRes] = await Promise.all([
          ApiService.get(`/getActivity/${id}`),
          ApiService.get('/getInstallations'),
          ApiService.get('/listTransport'),
        ]);

        installationOptions.value = instRes.data.data.data.map((i: any) => ({
          label: i.name,
          value: i.id,
        }));

        transportOptions.value = transRes.data.data.data.map((t: any) => ({
          label: `${t.name} (${t.identifier})`,
          value: t.id,
        }));

        const activity = actRes.data.data;
        await nextTick();
        // Formater les dates pour datetime-local (format: "YYYY-MM-DDTHH:mm")
        const formatForDatetimeLocal = (val: string | null): string => {
          if (!val) return '';
          return new Date(val).toISOString().substring(0, 16); // "2026-04-20T14:30"
        };

        activityForm.value?.setValues({
          ...activity,
          periodStart:        formatForDatetimeLocal(activity.periodStart),
          periodEnd:          formatForDatetimeLocal(activity.periodEnd),
          installationFromId: activity.installationFrom?.id ?? null,
          installationToId:   activity.installationTo?.id   ?? null,
          transportAssetId:   activity.transportAsset?.id   ?? null,
          manifestSicReference: activity.manifest?.sicReference ?? null, // ← sicReference
          fuelMassUnit:       activity.fuelMassUnit ?? 'T',
        });

      } catch (err) {
        error("Impossible de charger les données de l'activité.");
      }
    });

    const updateActivity = async (values: any) => {
      const id = route.params.id as string;
      isLoading.value = true;
      try {
        const payload = Object.fromEntries(
          Object.entries(values).filter(([_, v]) => v !== '' && v !== undefined)
        );

        const formatDatetime = (val: any): string | undefined => {
          if (!val) return undefined;
          if (val instanceof Date) return val.toISOString();
          return new Date(val).toISOString();
        };

        const finalPayload = {
          mode:               payload.mode,
          status:             payload.status,
          periodStart:        formatDatetime(payload.periodStart),
          periodEnd:          formatDatetime(payload.periodEnd),
          cargoMassT:         payload.cargoMassT  ? Number(payload.cargoMassT)  : undefined,
          distanceKm:         payload.distanceKm  ? Number(payload.distanceKm)  : undefined,
          fuelMassT:          payload.fuelMassT   ? Number(payload.fuelMassT)   : undefined,
          fuelMassUnit:       payload.fuelMassUnit ?? undefined,
          installationFromId: payload.installationFromId,
          installationToId:   payload.installationToId,
          transportAssetId:   payload.transportAssetId,
          manifestSicReference: payload.manifestSicReference ?? undefined,
        };

        const { data } = await ApiService.put(`/modifierActivity/${id}`, finalPayload);
        if (data.code === 200) {
          success(data.message);
          router.push({ name: 'ListActivityPage' });
        }
      } catch (err: any) {
        error(err?.response?.data?.message || 'Une erreur est survenue.');
      } finally {
        isLoading.value = false;
      }
    };

    return {
      activityForm,
      activitySchema,
      modeOptions,
      statusOptions,
      installationOptions,
      transportOptions,
      isLoading,
      updateActivity,
    };
  },
});
</script>
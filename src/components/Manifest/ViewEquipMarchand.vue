<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">

          <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mb-4">
            <div class="d-lg-flex align-items-center justify-content-between mb-3">
              <h4 class="position-relative text-primary fw-bold mb-0">Détail du document</h4>
              <!-- <router-link :to="{ name: 'ViewEquipMarchandPage', params: { id: document.id } }" class="btn btn-primary transition border-0 lh-1 fw-medium">
                <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
                Retour
              </router-link> -->

              <!-- <router-link 
                to="/liste-manifestes" 
                class="btn btn-primary transition border-0 lh-1 fw-medium">
                <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
                Retour
              </router-link> -->
              <button
                class="btn btn-primary transition border-0 lh-1 fw-medium"
                @click="goBack"
              >
                <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
                Retour
              </button>

            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">Type</label>
                <p class="fw-semibold mb-0">{{ document?.type }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">Arm</label>

                <p class="fw-semibold mb-0">{{ document?.arm }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Num</label>
                <p class="fw-semibold mb-0">{{ document?.num }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Sic</label>
                <p class="fw-semibold mb-0">{{ document?.sic }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Otc</label>
                <p class="fw-semibold mb-0">{{ document?.etd || 'N/A' }}</p>
              </div>
            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">Refotc</label>
                <p class="fw-semibold mb-0">{{ document?.refotc || 'N/A' }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">Transit</label>

                <p class="fw-semibold mb-0">{{ document?.transit }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">IdAtpTbt</label>
                <p class="fw-semibold mb-0">{{ document?.idAtpTbt || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">RefArmTbt</label>
                <p class="fw-semibold mb-0">{{ document?.refArmTbt || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Pec</label>
                <p class="fw-semibold mb-0">{{ document?.pec || 'N/A' }}</p>
              </div>
            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">PecLib</label>
                <p class="fw-semibold mb-0">{{ document?.pecLib || 'N/A' }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">First</label>
                <p class="fw-semibold mb-0">{{ document?.first }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">FirstLib</label>
                <p class="fw-semibold mb-0">{{ document?.firstLib }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Last</label>
                <p class="fw-semibold mb-0">{{ document?.last }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Last Lib</label>
                <p class="fw-semibold mb-0">{{ document?.lastLib }}</p>
              </div>
            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">Pod</label>
                <p class="fw-semibold mb-0">{{ document?.pod }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">Pod Lib</label>
                <p class="fw-semibold mb-0">{{ document?.podLib }}</p>

              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Last pod</label>
                <p class="fw-semibold mb-0">{{ document?.lastpod }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Fin</label>
                <p class="fw-semibold mb-0">{{ document?.fin }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Fin Lib</label>
                <p class="fw-semibold mb-0">{{ document?.finLib }}</p>
              </div>
            </div>


            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">PaysDest</label>
                <p class="fw-semibold mb-0">{{ document?.paysDest || 'N/A' }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">Pays DestLib</label>

                <p class="fw-semibold mb-0">{{ document?.paysDestLib || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Shipper Code</label>
                <p class="fw-semibold mb-0">{{ document?.shipperCode || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Shipper Type</label>
                <p class="fw-semibold mb-0">{{ document?.shipperType || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Shipper Name</label>
                <p class="fw-semibold mb-0">{{ document?.shipperName || 'N/A' }}</p>
              </div>
            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="text-muted small mb-1">Type Destinataire</label>
                <p class="fw-semibold mb-0">{{ document?.consigneeType || 'N/A' }}</p>
              </div>

              <div class="col-md-3">
                <label class="text-muted small mb-1">Destinataire</label>

                <p class="fw-semibold mb-0">{{ document?.consigneeName || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Code Notification</label>
                <p class="fw-semibold mb-0">{{ document?.notifyCode || 'N/A' }}</p>
              </div>

              <div class="col-md-2">
                <label class="text-muted small mb-1">Notify Type</label>
                <p class="fw-semibold mb-0">{{ document?.notifyType || 'N/A' }}</p>
              </div>


            </div>
          </div>

          <div v-if="equipements.length > 0" class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mb-4">
            <h5 class="fw-bold mb-3 text-primary">Équipements</h5>
            <table class="table table-hover">
              <thead>
                <tr>

                  <th>Lieu</th>
                  <th>Lieu Lib</th>
                  <th>Manut</th>
                  <th>Manut Lib</th>
                  <th>Nb</th>
                  <th>Poids</th>
                  <th>Sic</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(equip, index) in equipements" :key="index">

                  <td>{{ equip.lieu }}</td>
                  <td>{{ equip.lieuLib }}</td>
                  <td>{{ equip.manut }}</td>
                  <td>{{ equip.manutLib }}</td>
                  <td>{{ equip.nb }}</td>
                  <td>{{ equip.poids }}</td>
                  <td>{{ equip.sic }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary" @click="goToEquipDetail(equip)">
                      Voir les détails
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="marchandises.length > 0" class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25">
            <h5 class="fw-bold mb-3 text-primary">Marchandises</h5>
            <table class="table table-hover">
              <thead>
                <tr>

                  <th>Code Lib</th>
                  <th>Code SH</th>
                  <th>ItemNumber</th>
                  <th>Mrn</th>
                  <th>Nb</th>
                  <th>Poids</th>
                  <th>Ref</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(march, index) in marchandises" :key="index">

                  <td>{{ march.codeLib }}</td>
                  <td>{{ march.codeSH }}</td>
                  <td>{{ march.itemNumber }}</td>
                  <td>{{ march.mrn }}</td>
                  <td>{{ march.nb }}</td>
                  <td>{{ march.poids }}</td>
                  <td>{{ march.ref }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary" @click="goToMarchDetail(march)">
                      Voir les détails
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="equipementModal" tabindex="-1" aria-hidden="true" ref="equipementModal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">

        <!-- <div class="modal-header bg-gradient border-0 py-3">
          <div>
            <h5 class="modal-title fw-bold mb-1">Document {{ selectedDocument?.num }}</h5>
            <small class="text-white-50">Détails de la déclaration</small>
          </div>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div> -->

        <div class="modal-body p-4">

          <div class="card border-0 bg-light mb-4">
            <div class="card-body">
              <h6 class="text-primary fw-bold mb-3">
                <i class="bi bi-info-circle me-2"></i>Informations Equipement
              </h6>
              <div class="row g-3">
                <div class="col-md-1">
                  <label class="text-muted small mb-1">Tare</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.tare }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">NB</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.nb }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Code</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.code }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Code Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.codeLib }}</p>
                </div>
                <div class="col-md-1">
                  <label class="text-muted small mb-1">Poids</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.poids }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Sic</label>
                  <p class="fw-semibold mb-0">
                    <span class="badge bg-primary-subtle text-primary">
                      {{ selectedEquipement?.sic || 'N/A' }}
                    </span>
                  </p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Long</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.long || 'N/A' }}</p>
                </div>

              </div>

              <div class="row g-3">
                <div class="col-md-1">
                  <label class="text-muted small mb-1">Vol</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.vol || 'N/A' }}</p>
                </div>

                <div class="col-md-2">
                  <label class="text-muted small mb-1">Manut</label>
                  <p class="fw-semibold mb-0"> {{ selectedEquipement?.manut }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Manut Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.manutLib || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Zone</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.zone || 'N/A' }}</p>
                </div>
                <div class="col-md-1">
                  <label class="text-muted small mb-1">Zone Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.zoneLib || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Lieu</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.lieu || 'N/A' }}</p>
                </div>

                <div class="col-md-2">
                  <label class="text-muted small mb-1">Lieu Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedEquipement?.lieuLib || 'N/A' }}</p>
                </div>

              </div>
            </div>
          </div>


<div v-if="selectedEquipement?.marchandises?.length"
     class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mb-4">

  <h6 class="text-primary fw-bold mb-3">Marchandises</h6>

  <div v-for="(item, index) in selectedEquipement.marchandises"
       :key="index"
       class="mb-3 pb-2 border-bottom">

    <div class="row g-1 mb-2">
      <div class="col-md-2"><p class="fw-bold mb-1">Sic</p><p>{{ item.sic || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Ref</p><p>{{ item.ref || 'N/A' }}</p></div>
      <div class="col-md-2"><p class="fw-bold mb-1">Eqd</p><p>{{ item.eqd || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Nb</p><p>{{ item.nb || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Code</p><p>{{ item.code || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Code Lib</p><p>{{ item.codeLib || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Poids</p><p>{{ item.poids || 'N/A' }}</p></div>
      <div class="col-md-2"><p class="fw-bold mb-1">Poids net</p><p>{{ item.poidsnet || 'N/A' }}</p></div>
    </div>
    <hr>

    <div class="row g-2">
      <div class="col-md-2"><p class="fw-bold mb-1">Marques</p><p>{{ item.marques || 'N/A' }}</p></div>
        <div class="col-md-1"><p class="fw-bold mb-1">ItemNumber</p><p>{{ item.itemNumber || 'N/A' }}</p></div>
      <div class="col-md-2"><p class="fw-bold mb-1">Mrn</p><p>{{ item.mrn || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Code SH</p><p>{{ item.codeSH || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Zone</p><p>{{ item.zone || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Zone Lib</p><p>{{ item.zoneLib || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Lieu</p><p>{{ item.lieu || 'N/A' }}</p></div>
      <div class="col-md-1"><p class="fw-bold mb-1">Lieu Lib</p><p>{{ item.lieuLib || 'N/A' }}</p></div>
    </div>

  </div>
</div>

          <div v-else class="text-center py-3 text-muted">
            <p class="mb-0">Aucune marchandise associée à cet équipement</p>
          </div>

        </div>

        <div class="modal-footer bg-light border-0">
          <button type="button" class="btn btn-outline-secondary" @click="closeModal">
            <i class="bi bi-x-circle me-2"></i>Fermer
          </button>

        </div>

      </div>
    </div>
  </div>

  <div class="modal fade" id="marchandiseModal" tabindex="-1" aria-hidden="true" ref="marchandiseModal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">


        <div class="modal-body p-4">

          <div class="card border-0 bg-light mb-4">
            <div class="card-body">
              <h6 class="text-primary fw-bold mb-3">
                <i class="bi bi-info-circle me-2"></i>Informations Marchandise
              </h6>
              <div class="row g-3">
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Sic</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.sic }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Ref</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.ref }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Eqd</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.eqd || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Nb</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.nb || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Code</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.code }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Code Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.codeLib || 'N/A' }}</p>
                </div>
              </div>

              <div class="row g-3 mt-3">

                <div class="col-md-2">
                  <label class="text-muted small mb-1">Poids</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.poids || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Poids Net</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.poidsnet || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Marques</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.marques || 'N/A' }}</p>
                </div>

                <div class="col-md-2">
                  <label class="text-muted small mb-1">Mrn</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.mrn }}</p>
                </div>

                <div class="col-md-2">
                  <label class="text-muted small mb-1">StatComm</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.statComm }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Item Number</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.itemNumber || 'N/A' }}</p>
                </div>
              </div>

              <div class="row g-3 mt-3">
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Code SH</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.codeSH || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Zone</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.zone || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Zone Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.zoneLib || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Lieu</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.lieu || 'N/A' }}</p>
                </div>
                <div class="col-md-2">
                  <label class="text-muted small mb-1">Lieu Lib</label>
                  <p class="fw-semibold mb-0">{{ selectedMarchandise?.lieuLib || 'N/A' }}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light border-0">
          <button type="button" class="btn btn-outline-secondary" @click="closeModal2">
            <i class="bi bi-x-circle me-2"></i>Fermer
          </button>
        </div>
      </div>
    </div>
  </div>



</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_Date } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";
import { Manifest } from "@/models/Manifest";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "ViewEquipMarchand",
  setup() {
    const route = useRoute();
    const router = useRouter();
    // const document = ref<any>(null);
    const equipements = ref<any[]>([]);
    const marchandises = ref<any[]>([]);
    const document = ref<Document | null>(null);
    const selectedEquipement = ref<any>(null);
    const equipementModal = ref<HTMLElement | null>(null);
    const selectedMarchandise = ref<any>(null);
    const marchandiseModal = ref<HTMLElement | null>(null);

    const equipementModalInstance = ref<any>(null);
    const marchandiseModalInstance = ref<any>(null);

      // const router = useRouter();
    const goBack = () => router.back();


    const getdocumentDetails = (id: string) => {
      ApiService.get("/document", id)
        .then(({ data }) => {
          document.value = data.data;
          equipements.value = data.data.equipements;
          marchandises.value = data.data.marchandises;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const goToEquipDetail = (equip: any) => {
      selectedEquipement.value = equip;
      equipementModalInstance.value.show();
    };


    const goToMarchDetail = (march: any) => {
      selectedMarchandise.value = march;
      marchandiseModalInstance.value.show();
    };

    const closeModal = () => {
      equipementModalInstance.value.hide();
    };

    const closeModal2 = () => {
      marchandiseModalInstance.value.hide();
    };



    onMounted(() => {
      equipementModalInstance.value = new Modal(equipementModal.value!);
      marchandiseModalInstance.value = new Modal(marchandiseModal.value!);

      const id = route.params.id as string;
      getdocumentDetails(id);
    });

    return {
      document,
      equipements,
      marchandises,
      // manifest,
      equipementModal,
      marchandiseModal,
      equipementModalInstance,
      marchandiseModalInstance,
      selectedEquipement,
      selectedMarchandise,
      goToEquipDetail,
      goToMarchDetail,
      closeModal,
      closeModal2,
      format_Date,
      goBack,

    };

  },
});
</script>


<style scoped>
table tbody tr th {
  font-weight: bold;
  font-size: 16px;
}

.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-content {
  border-radius: 0.5rem;
  overflow: hidden;
}


.table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.05);
}

code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}
</style>

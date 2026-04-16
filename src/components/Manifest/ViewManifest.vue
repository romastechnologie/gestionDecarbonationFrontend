<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="  card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25">
            <div class="d-lg-flex align-items-center justify-content-between mb-3">
              <h4 class="position-relative text-black fw-bold mb-0">Informations générales</h4>
              
              <div class="d-flex gap-2">
                <router-link 
                  :to="{ name: 'ListeEquipagePage', params: { manifestId: manifest?.id } }" 
                  class="btn btn-success transition border-0 lh-1 fw-medium">
                  <!-- <i class="flaticon-plus lh-1 me-1 position-relative top-2"></i> -->
                  <!-- Ajouter un membre -->
                  Voir l'équipage 
                </router-link>

                
                <button class="btn btn-warning transition border-0 lh-1 fw-medium" 
                  @click="quitusManifest(manifest.id)"
                  v-if="manifest && !manifest.isGeneratingQuitus"
                  :disabled="isGeneratingQuitus">
                  <span v-if="isGeneratingQuitus" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <i v-else class="flaticon-download lh-1 me-1 position-relative top-2"></i>
                  {{ isGeneratingQuitus ? 'Génération en cours...' : 'Generer le quitus' }}
                </button> 

                <a v-else
                  href="#" 
                  class="btn btn-info transition border-0 lh-1 fw-medium text-white"
                  @click.prevent="downloadElement(manifest.quitusFilePath)">
                  Télécharger le quitus
                </a>

              <div v-if="manifest && manifest.isGeneratingQuitus">
                 <button class="btn btn-warning transition border-0 lh-1 fw-medium" 
                  @click="facture(manifest.id)"
                  v-if="manifest && manifest.factureFilePath == null"
                  >
                  <span v-if="isGeneratingFacture" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <i v-else class="flaticon-invoice lh-1 me-1 position-relative top-2"></i>
                  {{ isGeneratingFacture ? 'Génération en cours...' : 'Generer la facture' }}
                </button> 

                <a v-else
                  href="#" 
                  class="btn btn-info transition border-0 lh-1 fw-medium text-white"
                  @click.prevent="downloadElement(manifest.factureFilePath)">
                  Télécharger la facture
                </a>
              </div>
                
                <router-link 
                  to="/liste-manifestes" 
                  class="btn btn-primary transition border-0 lh-1 fw-medium">
                  <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
                  Retour
                </router-link>
              </div>
            </div>

            <div class="row g-3 pt-4">
              <div class="col-md-3">
                <label class="fs-5 mb-1">Sic Reference</label>
                <p class="fw-semibold mb-0">{{ manifest?.sicReference }}</p>
              </div>

              <div class="col-md-3">
                <label class="fs-5 mb-1">Nom du navire</label>
                <p class="fw-semibold mb-0">
                  <span class="badge bg-primary-subtle text-primary">{{ manifest?.navireNom }}</span>
                </p>
              </div>

              <div class="col-md-2">
                <label class="fs-5 mb-1">Num Imo</label>
                <p class="fw-semibold mb-0">{{ manifest?.navireLloyd }}</p>
              </div>

              <div class="col-md-2">
                <label class="fs-5 mb-1">Date d'arrivée</label>
                <p class="fw-semibold mb-0">{{ format_Date(manifest?.eta) }}</p>
              </div>

              <div class="col-md-2">
                <label class="fs-5 mb-1">Date de dépâts</label>
                <p class="fw-semibold mb-0">{{ format_Date(manifest?.etd) }}</p>
              </div>

              
            </div>
          </div>

          <div class="row mt-4">
            <div v-for="(doc, index) in documents" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div class="card shadow-lg border-0 rounded-3 h-100">
                <div class="card-body d-flex flex-column">
                  <span class="badge bg-info-subtle text-info mb-1 mt-2">
                    {{ 'DOCUMENT : ' + doc.type }}
                  </span>
                  <h5 class="card-title fw-bold text-primary">{{ doc.num }}</h5>
                  <p class="text-muted fw-bold small mb-1">
                    Destinataire : {{ doc.consigneeName }}
                  </p>
                  
                  <p class=" text-muted small mb-3">
                    NbrMarchandises : {{ doc.marchandises.length }}
                  </p>
                  <!-- <a href="#" class="btn btn-sm btn-outline-primary mt-auto" @click.prevent="openModal(doc)">
                    Voir les détails
                  </a> -->

                  <button type="button" class="btn btn-sm btn-outline-primary mt-auto"
                    @click="goToEquipMarchand(doc.id)">
                    Voir les détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";
import { Manifest } from "@/models/Manifest";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ViewManifest",
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const manifest = ref<Manifest | null>(null);
    const documents = ref<any[]>([]);
    const selectedDocument = ref<any>(null);
    const isGeneratingQuitus = ref(false);
    const isGeneratingFacture = ref(false);
    const baseUrl = ref(ApiService.vueInstance.axios.defaults.baseURL?.split('api')[0]);

    function getManifest(id: string) {
      return ApiService.get("/manifest", id)
        .then(({ data }) => {
          console.log("Donnees frontend:", data.data);
          manifest.value = data.data;
          documents.value = data.data.documents;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }
    

     const quitusManifest = (id: number) => {
        console.log("Generer quitus pour le manifest ID:", id);
        isGeneratingQuitus.value = true;
        
        return ApiService.get(`manifest/${id}/generer-quitus`)
        .then(({ data }) => {
            console.log("Résultat quitus:", data);
            Swal.fire({
                text: data.message || 'Quitus généré avec succès',
                toast: true,
                icon: 'success',
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            getManifest(String(id));
            // router.push({ name: 'ViewManifestPage', params: { id: id } });
            return data.data;
        })
        .catch(({ response }) => {
            console.error("Erreur génération quitus:", response);
            Swal.fire({
                text: response?.data?.message || 'Erreur lors de la génération du quitus',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn fw-semobold btn-light-danger",
                },
            });
        })
        .finally(() => {
            isGeneratingQuitus.value = false;
        });
      };

      

      const downloadElement = (filePath: string) => {
        if (!filePath) {
          error("Aucun fichier de quitus disponible pour ce manifeste.");
          return;
        }

        const fullUrl = `${baseUrl.value}${filePath.startsWith('/') ? filePath.substring(1) : filePath}`;
        window.open(fullUrl, '_blank');
      };




      const facture = (id: number) => {
        isGeneratingFacture.value = true;
        
        return ApiService.get(`manifest/${id}/facture`)
        .then(({ data }) => {
            Swal.fire({
                text: data.message || 'Facture générée avec succès',
                toast: true,
                icon: 'success',
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            isGeneratingFacture.value = false;
            getManifest(route.params.id as string);
            return data.data;
        })
        .catch(({ response }) => {
            console.error("Erreur génération facture:", response);
            Swal.fire({
                text: response?.data?.message || 'Erreur lors de la génération de la facture',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: "btn fw-semobold btn-light-danger",
                },
            });
        });
      };

   


   
    const goToEquipMarchand = (id: string) => {
      router.push({ name: 'ViewEquipMarchandPage', params: { id } });
    };

    onMounted(() => {
      const id = route.params.id as string;
      getManifest(id);
    });
    return {
      manifest,
      getManifest,
      format_Date,
      documents,
      selectedDocument,
      goToEquipMarchand,
      quitusManifest,
      isGeneratingQuitus,
      isGeneratingFacture,
      downloadElement,
      facture,
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

  .table td,
  .table th {
    padding: 0.75rem;
    vertical-align: middle;
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

<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/addtarifs"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un tarif CO2
        </router-link>
      </div>

      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un tarif"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="tariffs.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Type</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Montant</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Devise</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Valide du</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Valide au</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tariff, index) in tariffs" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span :class="badgeType(tariff.tariffType)">
                  {{ labelType(tariff.tariffType) }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ Number(tariff.amount).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ tariff.currency?.code ?? '—' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ format_date(tariff.validFrom) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ tariff.validTo ? format_date(tariff.validTo) : '—' }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span :class="tariff.isActive ? 'badge bg-success text-white' : 'badge bg-danger text-white'">
                  {{ tariff.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <span
                    class="badge text-white bg-primary fs-15 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                    <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      
                        <a  class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="ouvrirDetails(tariff)"
                        >
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Détails
                      </a>
                    </li>
                    <li>
                        <router-link
                            class="dropdown-item d-flex align-items-center"
                            :to="{ name: 'EditTarifsPage', params: { id: tariff.id } }"
                        >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Modifier
                        </router-link>
                    </li>
                    <li>
                      
                        <a class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(tariff.id, tariffs, 'deleteCo2Tariff', 'un tarif CO2')"
                        >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center">Aucun tarif CO2 trouvé.</div>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent
          :page="page"
          :totalPages="totalPages"
          :totalElements="totalElements"
          :limit="limit"
          @paginate="handlePaginate"
        />
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="modalDetailsTariff"
    tabindex="-1"
    aria-labelledby="modalDetailsTariffLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 rounded-2">

        <!-- En-tête -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fw-semibold" id="modalDetailsTariffLabel">
            <i class="flaticon-eye me-8"></i>
            Détails du tarif CO2
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Corps -->
        <div class="modal-body p-25" v-if="tariffSelectionne">

          <!-- Badge type + statut -->
          <div class="d-flex align-items-center justify-content-between mb-20">
            <span :class="badgeType(tariffSelectionne.tariffType)" style="font-size:14px;">
              {{ labelType(tariffSelectionne.tariffType) }}
            </span>
            <span :class="tariffSelectionne.isActive ? 'badge bg-success text-white' : 'badge bg-danger text-white'" style="font-size:14px;">
              {{ tariffSelectionne.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </div>

          <!-- Informations générales -->
          <div class="card border mb-15">
            <div class="card-header bg-light fw-semibold text-black py-10 px-15">
              <i class="flaticon-information me-5"></i> Informations générales
            </div>
            <div class="card-body p-15">
              <div class="row">
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Montant</span>
                  <p class="fw-semibold text-black mb-0">
                    {{ Number(tariffSelectionne.amount).toLocaleString('fr-FR', { minimumFractionDigits: 4 }) }}
                    {{ tariffSelectionne.currency?.code ?? '' }}
                  </p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Devise</span>
                  <p class="fw-semibold text-black mb-0">
                    {{ tariffSelectionne.currency?.code ?? '—' }} — {{ tariffSelectionne.currency?.name ?? '—' }}
                  </p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Valide à partir du</span>
                  <p class="fw-semibold text-black mb-0">{{ format_date(tariffSelectionne.validFrom) }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Valide jusqu'au</span>
                  <p class="fw-semibold text-black mb-0">
                    {{ tariffSelectionne.validTo ? format_date(tariffSelectionne.validTo) : '—' }}
                  </p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Créé le</span>
                  <p class="fw-semibold text-black mb-0">{{ format_date(tariffSelectionne.createdAt) }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Mis à jour le</span>
                  <p class="fw-semibold text-black mb-0">{{ format_date(tariffSelectionne.updatedAt) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations NAVIRE uniquement -->
          <div
            v-if="tariffSelectionne.tariffType === 'CONTAINER'"
            class="card border mb-15"
          >
            <div class="card-header bg-light fw-semibold text-black py-10 px-15">
              <i class="flaticon-cargo me-5"></i> Informations navire
            </div>
            <div class="card-body p-15">
              <div class="row">
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Armateur</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.carrier ?? '—' }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Code type conteneur</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.containerTypeCode ?? '—' }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Libellé type conteneur</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.containerTypeLib ?? '—' }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Unité de base</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.baseUnit ?? '—' }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Région départ</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.regionFrom?.name ?? '—' }}</p>
                </div>
                <div class="col-md-6 mb-10">
                  <span class="text-muted fs-13">Région arrivée</span>
                  <p class="fw-semibold text-black mb-0">{{ tariffSelectionne.regionTo?.name ?? '—' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations AVION / AUTRES -->
          <div
            v-if="tariffSelectionne.tariffType === 'CARBON_PRICE'"
            class="card border mb-15"
          >
            <div class="card-header bg-light fw-semibold text-black py-10 px-15">
              <i class="flaticon-airplane me-5"></i> Informations tarif carbone
            </div>
            <div class="card-body p-15">
              <div class="row">
                <div class="col-md-12 mb-10">
                  <span class="text-muted fs-13">Prix par tonne de CO2</span>
                  <p class="fw-semibold text-black mb-0">
                    {{ Number(tariffSelectionne.amount).toLocaleString('fr-FR', { minimumFractionDigits: 4 }) }}
                    {{ tariffSelectionne.currency?.code ?? '' }} / tCO2
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Pied -->
        <!-- Pied -->
        <div class="modal-footer" v-if="tariffSelectionne">
        <router-link
            :to="{ name: 'EditTarifsPage', params: { id: tariffSelectionne.id } }"
            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 rounded-1 fs-md-15 bg-primary text-decoration-none"
        >
            <i class="flaticon-pen me-5"></i> Modifier
        </router-link>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fermer
        </button>
        </div>

        <!-- Pied par défaut si pas de tarif sélectionné -->
        <div class="modal-footer" v-else>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fermer
        </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ApiService from '@/services/ApiService';
import { format_date, suppression, error } from '@/utils/utils';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import { Modal } from 'bootstrap';

interface Currency { id: string; code: string; name: string; }
interface Region   { id: string; name: string; code: string; }

interface Co2Tariff {
  id: string;
  tariffType: string;
  amount: number;
  currency: Currency | null;
  validFrom: string;
  validTo: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  carrier?: string;
  containerTypeCode?: string;
  containerTypeLib?: string;
  baseUnit?: string;
  regionFrom?: Region;
  regionTo?: Region;
}

export default defineComponent({
  name: 'ListCo2Tariff',
  components: { PaginationComponent },
  setup() {
    const tariffs           = ref<Co2Tariff[]>([]);
    const searchTerm        = ref('');
    const page              = ref(1);
    const totalPages        = ref(0);
    const limit             = ref(10);
    const totalElements     = ref(0);
    const tariffSelectionne = ref<Co2Tariff | null>(null);
    const modalRef          = ref<HTMLElement | null>(null);
    let   modalInstance: Modal | null = null;

    const getAllTariffs = (currentPage = 1, currentLimit = 10, mot = '') => {
      return ApiService.get(`/getCarbonTariffs?page=${currentPage}&limit=${currentLimit}&mot=${mot}`)
        .then(({ data }) => {
          tariffs.value       = data.data.data;
          totalPages.value    = data.data.totalPages;
          limit.value         = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          error(err.response?.data?.message || 'Erreur lors de la récupération des tarifs.');
        });
    };

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllTariffs(page_, limit_, searchTerm.value);
    };

    const rechercher = () => {
      page.value = 1;
      getAllTariffs(page.value, limit.value, searchTerm.value);
    };

    const ouvrirDetails = (tariff: Co2Tariff) => {
      tariffSelectionne.value = tariff;
      if (!modalInstance && modalRef.value) {
        modalInstance = new Modal(modalRef.value);
      }
      modalInstance?.show();
    };

    const badgeType = (type: string) => ({
      'badge bg-info text-white':      type === 'CONTAINER',
      'badge bg-warning text-white':   type === 'CARBON_PRICE',
      'badge bg-secondary text-white': type === 'BULK',
    });

    const labelType = (type: string) => {
      const map: Record<string, string> = {
        CONTAINER:    'Navire',
        CARBON_PRICE: 'Avion / Autres',
        BULK:         'Vrac',
      };
      return map[type] ?? type;
    };

    onMounted(() => getAllTariffs());

    return {
      tariffs, searchTerm, page, totalPages, limit, totalElements,
      tariffSelectionne, modalRef,
      format_date, suppression,
      handlePaginate, rechercher,
      ouvrirDetails, badgeType, labelType,
    };
  },
});
</script>
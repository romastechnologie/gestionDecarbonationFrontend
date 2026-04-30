<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/addActivity"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter une activité
        </router-link>

        
          <a
          href="javascript:void(0);"
          @click="telechargerTemplate"
          :class="[
            'default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none',
            isDownloading ? 'bg-secondary' : 'bg-primary'
          ]"
          :style="{ pointerEvents: isDownloading ? 'none' : 'auto' }"
        >
          <i class="flaticon-download position-relative ms-5 fs-12"></i>
          {{ isDownloading ? 'Téléchargement...' : 'Télécharger le template' }}
        </a>

        <label
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-warning fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          style="cursor: pointer;"
        >
          <i class="flaticon-upload position-relative ms-5 fs-12"></i>
          {{ isImporting ? 'Importation...' : 'Importer Excel' }}
          <input type="file" accept=".xlsx,.xls" class="d-none" @change="importerExcel" :disabled="isImporting" />
        </label>
      </div>

      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher une activité"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="activities.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Moyen de Transport</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Installation source</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Installation destination</th>
              <th class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, index) in activities" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span class='badge bg-info text-white'>
                  {{  activity.transportAsset.name}}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span
                  :class="{
                    'badge bg-secondary text-white': activity.status === 'PENDING',
                    'badge bg-success text-white':   activity.status === 'VALIDATED',
                    'badge bg-danger text-white':    activity.status === 'REJECTED',
                  }"
                >
                  {{ activity.status }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ activity.installationFrom?.name ?? '—' }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ activity.installationTo?.name ?? '—' }}</td>
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
                    <li v-if="activity.status === 'PENDING'">
                        <a
                          class="dropdown-item d-flex align-items-center text-success"
                          href="javascript:void(0);"
                          @click="changerStatut(activity.id, 'VALIDATED')"
                        >
                          <i class="flaticon-check lh-1 me-8 position-relative top-1"></i>
                          Valider
                        </a>
                      </li>
                      <li v-if="activity.status === 'PENDING'">
                        <a
                          class="dropdown-item d-flex align-items-center text-danger"
                          href="javascript:void(0);"
                          @click="changerStatut(activity.id, 'REJECTED')"
                        >
                          <i class="flaticon-close lh-1 me-8 position-relative top-1"></i>
                          Rejeter
                        </a>
                      </li>

                      <!-- Les autres actions restent visibles quel que soit le statut -->
                      <li>
                        <router-link
                          class="dropdown-item d-flex align-items-center"
                          :to="{ name: 'EditActivityPage', params: { id: activity.id } }"
                        >
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                          Modifier
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :to="{ name: 'ViewActivityPage', params: { id: activity.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                          Détails
                        </router-link>
                      </li>
                      <li>
                        <a class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          @click="suppression(activity.id, activities, 'deleteActivity', 'une activité')"
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
        <div v-else class="text-center">Aucune activité trouvée.</div>
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ApiService from '@/services/ApiService';
import { format_date, suppression, error, success } from '@/utils/utils';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import ExcelJS from 'exceljs';

interface Installation {
  id: string;
  name: string;
}

interface TransportAsset {
  id: string;
  name: string | null;
  identifier: string;
}

interface Activity {
  id: string;
  status: string;
  installationFrom: Installation | null;
  installationTo: Installation | null;
  transportAsset: TransportAsset | null;
  periodStart: string;
  periodEnd: string;
  cargoMassT: number | null;
  distanceKm: number | null;
  fuelMassT: number | null;
  fuelMassUnit: string | null;
  createdAt: string;
}

export default defineComponent({
  name: 'ListActivity',
  components: { PaginationComponent },
  setup() {
    const activities    = ref<Activity[]>([]);
    const searchTerm    = ref('');
    const page          = ref(1);
    const totalPages    = ref(0);
    const limit         = ref(10);
    const totalElements = ref(0);
    const isImporting   = ref(false);
    const isDownloading = ref(false);

    // ── Chargement de la liste ───────────────────────────────────────────────
    const getAllActivities = (currentPage = 1, currentLimit = 10, searchTerm='') => {
      return ApiService.get(`/getActivities?page=${currentPage}&limit=${currentLimit}&mot=${searchTerm}&`)
        .then(({ data }) => {
          activities.value    = data.data.data;
          totalPages.value    = data.data.totalPages;
          limit.value         = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          error(err.response?.data?.message || 'Erreur lors de la récupération des activités');
        });
    };

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllActivities(page_, limit_);
    };

    const rechercher = () => {
      page.value = 1;
      getAllActivities(page.value, limit.value);
    };

    // ── Changement de statut ─────────────────────────────────────────────────
    const changerStatut = async (id: string, statut: 'VALIDATED' | 'REJECTED') => {
      try {
        const { data } = await ApiService.put(`/modifierActivity/${id}`, { status: statut });
        if (data.code === 200) {
          success(`Activité ${statut === 'VALIDATED' ? 'validée' : 'rejetée'} avec succès.`);
          getAllActivities(page.value, limit.value);
        }
      } catch (err: any) {
        error(err?.response?.data?.message || 'Une erreur est survenue.');
      }
    };

    // ── Téléchargement du template ───────────────────────────────────────────
    const telechargerTemplate = async () => {
      try {
         isDownloading.value = true;

        const [instRes, transRes] = await Promise.all([
          ApiService.get('/getInstallations'),
          ApiService.get('/listTransport'),
        ]);

        const installations = instRes.data.data.data;
        const transports    = transRes.data.data.data;
        const instNames     = installations.map((i: any) => i.name);
        const transNames    = transports.map((t: any) => t.name ?? t.identifier);

        const wb = new ExcelJS.Workbook();

        // ── Feuille cachée _Listes ───────────────────────────────────────────
        const wsListes = wb.addWorksheet('_Listes');
        wsListes.state = 'veryHidden';
        wsListes.getColumn(2).values = ['Installations', ...instNames];
        wsListes.getColumn(3).values = ['Transports', ...transNames];
        wsListes.getColumn(4).values = ['Unités', 'T', 'Kg', 'L', 'm³'];

        // ── Feuille principale Activités ─────────────────────────────────────
        const ws = wb.addWorksheet('Activités');

        // 13 colonnes : date et heure séparées pour les périodes
        ws.columns = [
          { header: 'Date début * (JJ/MM/AAAA)',         key: 'periodStartDate',     width: 24 },
          { header: 'Heure début * (HH:mm)',             key: 'periodStartTime',     width: 20 },
          { header: 'Date fin * (JJ/MM/AAAA)',           key: 'periodEndDate',       width: 24 },
          { header: 'Heure fin * (HH:mm)',               key: 'periodEndTime',       width: 20 },
          { header: 'Nom Installation source',           key: 'installationFromName',width: 30 },
          { header: 'Nom Installation destination',      key: 'installationToName',  width: 30 },
          { header: 'Nom Transport asset',               key: 'transportAssetName',  width: 30 },
          { header: 'Masse cargo (T)',                   key: 'cargoMassT',          width: 18 },
          { header: 'Distance (Km)',                     key: 'distanceKm',          width: 18 },
          { header: 'Masse carburant',                   key: 'fuelMassT',           width: 18 },
          { header: 'Unité masse carburant (T/Kg/L/m³)', key: 'fuelMassUnit',       width: 28 },
        ];

        // Style en-tête
        ws.getRow(1).eachCell(cell => {
          cell.font      = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E75B6' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          cell.border    = {
            top: { style: 'thin' }, bottom: { style: 'thin' },
            left: { style: 'thin' }, right: { style: 'thin' },
          };
        });
        ws.getRow(1).height = 35;

        const nbLignes = 100;
        const nbInst   = instNames.length;
        const nbTrans  = transNames.length;

        for (let rowNum = 2; rowNum <= nbLignes; rowNum++) {

          ws.getCell(`A${rowNum}`).numFmt = 'dd/mm/yyyy';
          ws.getCell(`A${rowNum}`).dataValidation = {
            type: 'date',
            operator: 'greaterThan',
            formulae: [new Date(2000, 0, 1)],
            showErrorMessage: true,
            errorTitle: 'Date invalide',
            error: 'Veuillez saisir une date valide.',
            showInputMessage: true,
            promptTitle: 'Date début',
            prompt: 'Cliquez sur la cellule pour utiliser le calendrier Excel.',
          };

          // ── Colonne C → Heure début ───────────────────────────────────────
          ws.getCell(`B${rowNum}`).numFmt = 'hh:mm';
          ws.getCell(`B${rowNum}`).dataValidation = {
            type: 'decimal',
            operator: 'between',
            formulae: [0, 0.9999],
            showErrorMessage: true,
            errorTitle: 'Heure invalide',
            error: 'Format attendu : HH:mm (ex: 08:30)',
            showInputMessage: true,
            promptTitle: 'Heure début',
            prompt: 'Saisissez l\'heure au format HH:mm (ex: 08:30)',
          };


          // ── Colonne D → Date fin (calendrier natif Excel) ─────────────────
          ws.getCell(`C${rowNum}`).numFmt = 'dd/mm/yyyy';
          ws.getCell(`C${rowNum}`).dataValidation = {
            type: 'date',
            operator: 'greaterThan',
            formulae: [new Date(2000, 0, 1)],
            showErrorMessage: true,
            errorTitle: 'Date invalide',
            error: 'Veuillez saisir une date valide.',
            showInputMessage: true,
            promptTitle: 'Date fin',
            prompt: 'Cliquez sur la cellule pour utiliser le calendrier Excel.',
          };

          // ── Colonne E → Heure fin ─────────────────────────────────────────
          ws.getCell(`D${rowNum}`).numFmt = 'hh:mm';
          ws.getCell(`D${rowNum}`).dataValidation = {
            type: 'decimal',
            operator: 'between',
            formulae: [0, 0.9999],
            showErrorMessage: true,
            errorTitle: 'Heure invalide',
            error: 'Format attendu : HH:mm (ex: 18:00)',
            showInputMessage: true,
            promptTitle: 'Heure fin',
            prompt: 'Saisissez l\'heure au format HH:mm (ex: 18:00)',
          };

          // ── Colonne F → Installation source ───────────────────────────────
          ws.getCell(`E${rowNum}`).dataValidation = {
            type: 'list',
            formulae: [`_Listes!$B$2:$B$${nbInst + 1}`],
            showErrorMessage: true,
            errorTitle: 'Installation invalide',
            error: 'Veuillez choisir une installation dans la liste.',
          };

          // ── Colonne G → Installation destination ──────────────────────────
          ws.getCell(`F${rowNum}`).dataValidation = {
            type: 'list',
            formulae: [`_Listes!$B$2:$B$${nbInst + 1}`],
            showErrorMessage: true,
            errorTitle: 'Installation invalide',
            error: 'Veuillez choisir une installation dans la liste.',
          };

          // ── Colonne H → Transport asset ───────────────────────────────────
          ws.getCell(`G${rowNum}`).dataValidation = {
            type: 'list',
            formulae: [`_Listes!$C$2:$C$${nbTrans + 1}`],
            showErrorMessage: true,
            errorTitle: 'Transport invalide',
            error: 'Veuillez choisir un transport dans la liste.',
          };

          // ── Colonne M → Unité masse carburant ─────────────────────────────
          ws.getCell(`K${rowNum}`).dataValidation = {
            type: 'list',
            formulae: ['_Listes!$D$2:$D$5'],
            showErrorMessage: true,
            errorTitle: 'Unité invalide',
            error: 'Veuillez choisir T, Kg, L ou m³.',
          };

          // Alterner couleur des lignes
          if (rowNum % 2 === 0) {
            ws.getRow(rowNum).eachCell({ includeEmpty: true }, cell => {
              cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F7FC' } };
            });
          }
        }

        // ── Feuille Installations (non modifiable) ───────────────────────────
        const wsInst = wb.addWorksheet('Installations (référence)');
        wsInst.columns = [
          { header: 'Nom de l\'installation', key: 'name', width: 40 },
          { header: 'ID',                     key: 'id',   width: 40 },
        ];
        wsInst.getRow(1).font = { bold: true };
        installations.forEach((i: any) => wsInst.addRow({ name: i.name, id: i.id }));
        await wsInst.protect('Romas@2026!', {
          selectLockedCells: true, selectUnlockedCells: false,
          formatCells: false, formatColumns: false, formatRows: false,
          insertRows: false, insertColumns: false,
          deleteRows: false, deleteColumns: false,
          sort: false, autoFilter: false,
        });

        // ── Feuille Transports (non modifiable) ──────────────────────────────
        const wsTrans = wb.addWorksheet('Transports (référence)');
        wsTrans.columns = [
          { header: 'Nom du transport', key: 'name',       width: 30 },
          { header: 'Identifiant',      key: 'identifier', width: 20 },
          { header: 'ID',               key: 'id',         width: 40 },
        ];
        wsTrans.getRow(1).font = { bold: true };
        transports.forEach((t: any) => wsTrans.addRow({
          name: t.name ?? '', identifier: t.identifier, id: t.id,
        }));
        await wsTrans.protect('Romas@2026!', {
          selectLockedCells: true, selectUnlockedCells: false,
          formatCells: false, formatColumns: false, formatRows: false,
          insertRows: false, insertColumns: false,
          deleteRows: false, deleteColumns: false,
          sort: false, autoFilter: false,
        });

        const buffer = await wb.xlsx.writeBuffer();
        const blob   = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href     = url;
        link.download = 'template_activites.xlsx';
        link.click();
        URL.revokeObjectURL(url);
         success('Template téléchargé avec succès.');
        } catch (err) {
          error('Impossible de générer le template.');
        } finally {
          isDownloading.value = false;
        }
    };

  
    const importerExcel = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input.files?.length) return;

      const file  = input.files[0];
      input.value = '';

      try {
        isImporting.value = true;

        const [instRes, transRes] = await Promise.all([
          ApiService.get('/getInstallations'),
          ApiService.get('/listTransport'),
        ]);

        const installationMap = new Map<string, string>();
        instRes.data.data.data.forEach((i: any) => {
          installationMap.set(i.name.toLowerCase().trim(), i.id);
        });

        const transportMap = new Map<string, string>();
        transRes.data.data.data.forEach((t: any) => {
          if (t.name) transportMap.set(t.name.toLowerCase().trim(), t.id);
          transportMap.set(t.identifier.toLowerCase().trim(), t.id);
        });

        const buffer = await file.arrayBuffer();
        const wb     = new ExcelJS.Workbook();
        await wb.xlsx.load(buffer);

        const ws = wb.getWorksheet('Activités');
        if (!ws) {
          error('Feuille "Activités" introuvable dans le fichier.');
          return;
        }

        // Map en-tête → clé interne (correspond aux 13 nouvelles colonnes)
        const headerToKey: Record<string, string> = {
          'Date début * (JJ/MM/AAAA)':          'periodStartDate',
          'Heure début * (HH:mm)':              'periodStartTime',
          'Date fin * (JJ/MM/AAAA)':            'periodEndDate',
          'Heure fin * (HH:mm)':               'periodEndTime',
          'Nom Installation source':             'installationFromName',
          'Nom Installation destination':        'installationToName',
          'Nom Transport asset':                 'transportAssetName',
          'Masse cargo (T)':                     'cargoMassT',
          'Distance (Km)':                       'distanceKm',
          'Masse carburant':                     'fuelMassT',
          'Unité masse carburant (T/Kg/L/m³)':  'fuelMassUnit',
        };

        const colIndexToKey = new Map<number, string>();
        ws.getRow(1).eachCell((cell, colIndex) => {
          const key = headerToKey[String(cell.value).trim()];
          if (key) colIndexToKey.set(colIndex, key);
        });

        // Fusion date + heure → ISO string
        const fusionnerDateHeure = (date: any, heure: any): string | null => {
          if (!date) return null;

          const dateObj = date instanceof Date ? date : new Date(String(date));
          if (isNaN(dateObj.getTime())) return null;

          const yyyy = dateObj.getFullYear();
          const mm   = String(dateObj.getMonth() + 1).padStart(2, '0');
          const dd   = String(dateObj.getDate()).padStart(2, '0');

          let heureStr = '00:00';
          if (heure !== undefined && heure !== null && heure !== '') {
            if (typeof heure === 'number') {
              // ExcelJS retourne un décimal pour les heures (0.5 = 12:00)
              const totalMinutes = Math.round(heure * 24 * 60);
              const h = Math.floor(totalMinutes / 60);
              const m = totalMinutes % 60;
              heureStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            } else if (heure instanceof Date) {
              heureStr = `${String(heure.getHours()).padStart(2, '0')}:${String(heure.getMinutes()).padStart(2, '0')}`;
            } else {
              heureStr = String(heure).trim();
            }
          }

          const result = new Date(`${yyyy}-${mm}-${dd}T${heureStr}:00`);
          return isNaN(result.getTime()) ? null : result.toISOString();
        };

        const payloads: any[] = [];
        const erreurs: string[] = [];

        ws.eachRow((row, rowIndex) => {
          if (rowIndex === 1) return;

          const obj: any = {};
          row.eachCell({ includeEmpty: false }, (cell, colIndex) => {
            const key = colIndexToKey.get(colIndex);
            if (!key) return;
            const val = cell.value;
            if (val === null || val === undefined || val === '') return;

            if (['cargoMassT', 'distanceKm', 'fuelMassT'].includes(key)) {
              obj[key] = Number(val);
            } else {
              // Pour date et heure on garde la valeur brute (Date ou number)
              obj[key] = val;
            }
          });

          if (Object.keys(obj).length === 0) return;

          // Fusion date + heure
          obj.periodStart = fusionnerDateHeure(obj.periodStartDate, obj.periodStartTime);
          obj.periodEnd   = fusionnerDateHeure(obj.periodEndDate,   obj.periodEndTime);
          delete obj.periodStartDate;
          delete obj.periodStartTime;
          delete obj.periodEndDate;
          delete obj.periodEndTime;

          // Résolution nom → ID
          if (obj.installationFromName) {
            const id = installationMap.get(String(obj.installationFromName).toLowerCase());
            if (!id) { erreurs.push(`Ligne ${rowIndex} : installation source "${obj.installationFromName}" introuvable.`); return; }
            obj.installationFromId = id;
            delete obj.installationFromName;
          }
          if (obj.installationToName) {
            const id = installationMap.get(String(obj.installationToName).toLowerCase());
            if (!id) { erreurs.push(`Ligne ${rowIndex} : installation destination "${obj.installationToName}" introuvable.`); return; }
            obj.installationToId = id;
            delete obj.installationToName;
          }
          if (obj.transportAssetName) {
            const id = transportMap.get(String(obj.transportAssetName).toLowerCase());
            if (!id) { erreurs.push(`Ligne ${rowIndex} : transport "${obj.transportAssetName}" introuvable.`); return; }
            obj.transportAssetId = id;
            delete obj.transportAssetName;
          }

       
          if (obj.fuelMassUnit) obj.fuelMassUnit = String(obj.fuelMassUnit).trim();

          // Validations
          if (!obj.periodStart) { erreurs.push(`Ligne ${rowIndex} : date début invalide ou manquante.`); return; }
          if (!obj.periodEnd)   { erreurs.push(`Ligne ${rowIndex} : date fin invalide ou manquante.`); return; }
          if (new Date(obj.periodEnd) <= new Date(obj.periodStart)) {
            erreurs.push(`Ligne ${rowIndex} : la date de fin doit être après la date de début.`);
            return;
          }

          payloads.push(obj);
        });

        if (erreurs.length) erreurs.forEach(msg => error(msg));
        if (!payloads.length) return;

        let succes = 0;
        for (const payload of payloads) {
          try {
            const { data: res } = await ApiService.post('/addActivity', payload);
            if (res.code === 201) succes++;
          } catch (err: any) {
            error(`Erreur import : ${err?.response?.data?.message || 'inconnue'}`);
          }
        }

        if (succes > 0) {
          success(`${succes} activité(s) importée(s) avec succès.`);
          getAllActivities(page.value, limit.value);
        }

      } catch (err) {
        error('Erreur lors de la lecture du fichier Excel.');
      } finally {
        isImporting.value = false;
      }
    };

    onMounted(() => getAllActivities());

    return {
      activities,
      format_date,
      suppression,
      searchTerm,
      page,
      totalPages,
      limit,
      totalElements,
      isImporting,
      handlePaginate,
      rechercher,
      changerStatut,
      telechargerTemplate,
      importerExcel,
      isDownloading
    };
  },
});
</script>
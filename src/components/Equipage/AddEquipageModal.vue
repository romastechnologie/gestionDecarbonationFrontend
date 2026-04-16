
<template>
  <div
    class="modal fade createNewModal"
    id="AddEquipageModal"
    tabindex="-1"
    ref="addEquipageModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
            <Form ref="equipageForm" @submit="addEquipage" :validation-schema="equipageSchema" enctype="multipart/form-data">
             <div class="row">
            
              <!-- Explication et proposition du fichier XLSX à télécharger pour remplissage -->
              <div class="col-12 mb-3">
                <div class="alert alert-info mb-2">
                  <strong>Procédure :</strong><br>
                  1. Téléchargez le modèle XLSX en cliquant sur le bouton ci-dessous.<br>
                  2. Remplissez le fichier avec les informations demandées pour chaque membre d'équipage.<br>
                  3. Enregistrez le fichier sur votre ordinateur.<br>
                  4. Importez ou transmettez le fichier via l'interface prévue (ou contactez l'administrateur si besoin).
                </div>
                <a
                  v-if="!isShow"
                  :href="xlsxTemplateUrl"
                  download
                  class="btn btn-outline-primary"
                  @click="isShow = true"
                >
                Télécharger le modèle XLSX à remplir
                </a>
              </div>

              <!-- INTERFACE POUR l'importation du fichier XLSX -->
              <div class="col-12 mb-1" v-if="!isShow">
                <div class="card shadow-sm border-0">
                  <div class="card-body d-flex flex-column align-items-center justify-content-center p-4">
                    <label for="xlsx-upload" class="d-flex flex-column align-items-center justify-content-center w-100" style="cursor:pointer;">
                      <span class="mb-2" style="font-size:2rem;color:#0d6efd;">
                        <i class="fas fa-file-excel"></i>
                      </span>
                      <span class="fw-bold mb-1">Importer le fichier XLSX rempli</span>
                      <span class="text-muted mb-2" style="font-size:0.95rem;">Sélectionnez le fichier que vous avez complété pour ajouter plusieurs membres d'équipage en une seule fois.</span>
                      <span class="btn btn-primary px-4 py-2 mt-2">Choisir un fichier</span>
                      <input name="fichier" id="xlsx-upload" type="file" accept=".xlsx" style="display:none;" @change="handleFileChange" />
                      <span v-if="selectedFileName" class="mt-3 text-success fw-semibold">Fichier sélectionné : {{ selectedFileName }}</span>
                    </label>
                  </div>
                </div>
              </div>


              <div v-if="tableRows.length" class="mt-4">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th v-for="(header, idx) in tableHeaders" :key="'header-' + idx">{{ header }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, rIdx) in tableRows" :key="'row-' + rIdx">
                        <td v-for="(cell, cIdx) in row" :key="'cell-' + rIdx + '-' + cIdx">{{ cell }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              


              
            <!-- <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Numéro d'équipage <span class="text-danger">*</span>
                </label>
                <Field name="crewNumber" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le numéro d'équipage"/>
                <ErrorMessage name="crewNumber" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom de famille <span class="text-danger">*</span>
                </label>
                <Field name="familyName" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le familyName"/>
                <ErrorMessage name="familyName" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Prénoms <span class="text-danger">*</span>
                </label>
                <Field name="givenNames" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer les prénoms"/>
                <ErrorMessage name="givenNames" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nationalité <span class="text-danger">*</span>
                </label>
                <Field name="nationality" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationalité"/>
                <ErrorMessage name="nationality" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date de naissance <span class="text-danger">*</span>
                </label>
                <Field name="dateBirth" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date d'anniversaire"/>
                <ErrorMessage name="dateBirth" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Lieu de Naissance <span class="text-danger">*</span>
                </label>
                <Field name="placeBirth" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le lieu de naissance"/>
                <ErrorMessage name="placeBirth" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de Document <span class="text-danger">*</span>
                </label>
                <Field name="documentType" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Type de Document"/>
                <ErrorMessage name="documentType" class="text-danger"/>
              </div>
            </div>
             <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Issue place <span class="text-danger">*</span>
                </label>
                <Field name="documentIssuePlace" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'issue place"/>
                <ErrorMessage name="documentIssuePlace" class="text-danger"/>
              </div>
            </div>

             <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Document Issue Date <span class="text-danger">*</span>
                </label>
                <Field name="documentIssueDate" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le document issue Date"/>
                <ErrorMessage name="documentIssueDate" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date d'expiration du document <span class="text-danger">*</span>
                </label>
                <Field name="documentExpiryDate" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le document issue Date"/>
                <ErrorMessage name="documentExpiryDate" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date d'embarquement <span class="text-danger">*</span>
                </label>
                <Field name="embarkationDate" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entre la date d'embarquement"/>
                <ErrorMessage name="embarkationDate" class="text-danger"/>
              </div>
            </div>
             <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Poste<span class="text-danger">*</span>
                </label>
                <Field  name="rankRating" v-slot="{ field }">
                  <Multiselect
                    :options="postOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le poste"
                  />
                </Field>  
              </div>
              <ErrorMessage name="rankRating" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Port d'embarquement <span class="text-danger">*</span>
                </label>
                <Field name="embarkationPort" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entre le port d'embarquement"/>
                <ErrorMessage name="embarkationPort" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Numéro de document <span class="text-danger">*</span>
                </label>
                <Field name="documentNumber" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entre le numéro de document"/>
                <ErrorMessage name="documentNumber" class="text-danger"/>
              </div>
            </div> -->

            <div class="col-md-12 mt-3" v-if="isShow">
              <div class="d-flex align-items-center">
                <button class="default-btn me-20 transition border-0 fw-medium text-white p-8 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  type="submit">
                    Enregistrer l'équipage
                </button>
                <router-link to="/liste-manifestes" 
                    class=" btn btn-danger transition border-0 lh-1 fw-medium p-10 pe-15">
                    <i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler
                </router-link>
              </div>
            </div>
              </div>
            </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { error , success, hideModal } from '../../utils/utils';
import { useRouter } from 'vue-router';
import { Equipage } from '@/models/Equipage';
import * as XLSX from 'xlsx';
import axios from 'axios';
// import Multiselect from '@vueform/multiselect';

export default defineComponent({
    name: "addEquipageModal",
    components: {
    Form,
    // Field,
    // ErrorMessage,
    // Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    manifestId: {        
    type: String,
    required: true,
    default: '',
  }
  },
  setup(props, { emit }){
      const equipageSchema = Yup.object().shape({
        fichier: Yup.mixed().required('Le fichier est obligatoire')
    // crewNumber: Yup.string().required('Le numéro d\'équipage est obligatoire'),
    // familyName: Yup.string().required('Le nom de famille est obligatoire'),
    // givenNames: Yup.string().required('Les prénoms sont obligatoires'),
    // nationality: Yup.string().required('La nationalité est obligatoire'),
    // dateBirth: Yup.date().required('La date de naissance est obligatoire'),
    // placeBirth: Yup.string().required('Le lieu de naissance est obligatoire'),
    // documentType: Yup.string().required('Le type de document est obligatoire'),
    // documentNumber: Yup.string().required('Le numéro de document est obligatoire'),
    // documentIssuePlace: Yup.string().required('Le lieu de délivrance est obligatoire'),
    // documentIssueDate: Yup.date().required('La date de délivrance est obligatoire'),
    // documentExpiryDate: Yup.date().required('La date d\'expiration est obligatoire'),
    // embarkationDate: Yup.date().required('La date d\'embarquement est obligatoire'),
    // embarkationPort: Yup.string().required('Le port d\'embarquement est obligatoire'),
    // rankRating: Yup.string().required('Le poste est obligatoire'), 
    });
    

    const equipageForm = ref<Equipage | null>(null);
    const postOptions=ref([]);
    const router = useRouter();
    const caValue = ref('');
    const { setFieldValue } = useForm();
    const postss:any = ref(null);
    const addEquipageModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un équipage");
    const btntext = ref('Ajouter');
    const isShow = ref(false);

    const tableRows = ref<any[]>([]);
    const tableHeaders = ref<string[]>([]);
    const manifestId = ref<string | number>('');

    const baseUrl = ref(ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]);

    // const fetchPostes = async () => {
    //   try {
    //     const response = await ApiService.get('/posts');
    //     const postsData = response.data.data.data;
    //     postss.value = postsData;
    //     postOptions.value =  postsData.map((post) => ({
    //       value: post.id,
    //       label: `${post.libelle}`,
    //     }));
    //   } catch (error) {
    //     // 
    //   }
    // };

    watch(() => props.item, (newValue) => {
      console.log("Equipage ID changed:", newValue);
      manifestId.value = newValue;
      // getEquipage(newValue);
      // isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier un membre";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une membre";
         btntext.value = "Ajouter";
      }
    }

    // const getEquipage = async (id: number) => {
    //   return ApiService.get("/equipage/"+id)
    //   .then(({ data }) => {
    //     const donnees = data.data;
    //     for (const key in donnees) {
    //       equipageForm.value?.setFieldValue(key, 
    //       (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
    //       );
    //     }
    //     emit('openmodal', addEquipageModalRef.value);

    //   })
    //   .catch(({ response }) => {
    //     error(response.data.message)
    //   });
    // }

    // const addEquipage = async (values: any, equipageForm) => {
    //   const payload = {
    //     ...values,
    //     manifesteId: props.manifestId   
    //   };
     
    //   console.log("doneeee",payload);
    //   ApiService.post("/equipage", payload)
    //   .then(({ data }) => {
    //       if(data.code == 201) { 
    //         success(data.message);
    //         equipageForm.resetForm();
    //         // emit('close');
    //         emit('saved');
    //         hideModal(addEquipageModalRef.value);

    //       }
    //   })
    //   .catch(({ response }) => {
    //       error(response.data.message);
    //   });

    // };

    const addEquipage = async (values: any, equipageForm) => {
      const formData = new FormData();
      formData.append('fichier', values.fichier); // le fichier
      formData.append('manifesteId', String(manifestId.value));
      // console.log("formData",formData,  props.manifestId);
      try {
        const { data } = await axios.post("/equipage", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (data.code == 201) {
          success(data.message);
          equipageForm.resetForm();
          emit('saved');
          hideModal(addEquipageModalRef.value);
        }
      } catch ( err ) {
        // error(err.response.data.message);
        console.log("err oui", err);
      }
    };

    onMounted(() => {
      console.log("Mounted Equipage Modal");
      console.log("My base url:", baseUrl);
      // console.log("Manifest ID on mount:", props.manifestId);
      // console.log("Item ID on mount:", props.item);
      // fetchPostes();
    });

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    const selectedFileName = ref('');
    // const handleFileChange = (event: Event) => {
    //   const input = event.target as HTMLInputElement;
    //   if (input.files && input.files.length > 0) {
    //     selectedFileName.value = input.files[0].name;
    //   } else {
    //     selectedFileName.value = '';
    //   }
    // };

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        equipageForm.value?.setFieldValue('fichier', file);
        selectedFileName.value = file.name;
        isShow.value = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          if (jsonData.length > 0) {
            tableHeaders.value = jsonData[0] as string[];
            tableRows.value = jsonData.slice(1);
          } else {
            tableHeaders.value = [];
            tableRows.value = [];
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        selectedFileName.value = '';
        tableHeaders.value = [];
        tableRows.value = [];
      }
    };

    return {
      addEquipageModalRef,
      title,btntext,resetValue,
      equipageSchema,
      addEquipage,
      equipageForm,
      postOptions,
      caValue,
      // xlsxTemplateUrl: 'http://localhost:3005/uploads/equipage.xlsx', // Chemin vers le fichier dans public
      xlsxTemplateUrl: baseUrl.value + 'uploads/model_equipage.xlsx',
      
      selectedFileName,
      handleFileChange,
      isShow,
      tableRows,
      tableHeaders
    };
  }, 
});
</script>@/models/Equipage




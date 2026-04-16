
<template>
  <div
    class="modal fade createNewModal"
    id="detailEquipageModal"
    tabindex="-1"
    ref="detailEquipageModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
           
         <div>
            <div v-if="isShow">
                <h5>EQUIPE :</h5>
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
         </div>

        </div>
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
    name: "detailEquipageModal",
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
    });
    

    const equipageForm = ref<Equipage | null>(null);
    const postOptions=ref([]);
    const router = useRouter();
    const caValue = ref('');
    const { setFieldValue } = useForm();
    const postss:any = ref(null);
    const detailEquipageModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Détail de l'équipage");
    const btntext = ref('Ajouter');
    const isShow = ref(true);

    const tableRows = ref<any[]>([]);
    const tableHeaders = ref<string[]>([]);
    const manifestId = ref<string | number>('');


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

    

    onMounted(() => {
      console.log("Mounted Equipage Modal");
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
      detailEquipageModalRef,
      title,btntext,resetValue,
      equipageSchema,
      equipageForm,
      postOptions,
      caValue,
      xlsxTemplateUrl: 'http://localhost:3005/uploads/equipage.xlsx', // Chemin vers le fichier dans public
      selectedFileName,
      handleFileChange,
      isShow,
      tableRows,
      tableHeaders
    };
  },
});
</script>@/models/Equipage




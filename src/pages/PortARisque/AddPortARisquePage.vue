<template>
    <BreadCrumb PageTitle="Ajouter un port à risque" />
    <AddPortARisqueModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddPortARisqueModal from "@/components/PortARisque/AddPortARisqueModal.vue";
  
    export default defineComponent({
      name: "AddPortARisquePage",
      components: {
        BreadCrumb,
        AddPortARisqueModal,
      },
    });
  </script>
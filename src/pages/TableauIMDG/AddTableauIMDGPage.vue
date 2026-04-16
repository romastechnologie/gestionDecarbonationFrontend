<template>
    <BreadCrumb PageTitle="Ajouter un tableau IMDG" />
    <AddTableauIMDGModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddTableauIMDGModal from "@/components/TableauIMDG/AddTableauIMDGModal.vue";
  
    export default defineComponent({
      name: "AddTableauIMDGPage",
      components: {
        BreadCrumb,
        AddTableauIMDGModal,
      },
    });
  </script>
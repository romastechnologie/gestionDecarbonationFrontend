<template>
    <BreadCrumb PageTitle="Ajouter un port" />
    <AddPortModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddPortModal from "@/components/Port/AddPortModal.vue";
  
    export default defineComponent({
      name: "AddPortPage",
      components: {
        BreadCrumb,
        AddPortModal,
      },
    });
  </script>
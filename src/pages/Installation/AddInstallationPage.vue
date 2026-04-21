<template>
    <BreadCrumb PageTitle="Ajouter une Installation" />
    <AddInstallation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddInstallation from "@/components/Installation/AddInstallation.vue";
  
    export default defineComponent({
      name: "AddInstallationPage",
      components: {
        BreadCrumb,
        AddInstallation,
      },
    });
  </script>
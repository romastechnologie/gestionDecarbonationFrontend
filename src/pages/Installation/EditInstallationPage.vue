<template>
    <BreadCrumb PageTitle="Modifier une Installation" />
    <EditInstallation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditInstallation from "@/components/Installation/EditInstallation.vue";
  
    export default defineComponent({
      name: "EditInstalaltionPage",
      components: {
        BreadCrumb,
        EditInstallation,
      },
    });
  </script>
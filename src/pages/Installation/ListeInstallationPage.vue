<template>
    <BreadCrumb PageTitle="Liste des Installations" />
    <ListInstallation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListInstallation from "@/components/Installation/ListInstallation.vue";
  
    export default defineComponent({
      name: "ListInstalallationPage",
      components: {
        BreadCrumb,
        ListInstallation,
      },
    });
  </script>
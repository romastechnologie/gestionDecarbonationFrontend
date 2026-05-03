<template>
    <BreadCrumb PageTitle="Liste des Tarifs" />
    <ListTarifs />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListTarifs from "@/components/Tarifs/ListTarifs.vue";
  
    export default defineComponent({
      name: "ListTarifsPage",
      components: {
        BreadCrumb,
        ListTarifs,
      },
    });
  </script>
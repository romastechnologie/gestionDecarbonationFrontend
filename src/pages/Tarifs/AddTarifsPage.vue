<template>
    <BreadCrumb PageTitle="Ajouter un Tarif" />
    <AddTarifs />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddTarifs from "@/components/Tarifs/AddTarifs.vue";
  
    export default defineComponent({
      name: "AddTarifsPage",
      components: {
        BreadCrumb,
        AddTarifs,
      },
    });
  </script>
<template>
    <BreadCrumb PageTitle="Editer un Tarif" />
    <EditTarifs />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditTarifs from "@/components/Tarifs/EditTarifs.vue";
  
    export default defineComponent({
      name: "EditTarifsPage",
      components: {
        BreadCrumb,
        EditTarifs,
      },
    });
  </script>
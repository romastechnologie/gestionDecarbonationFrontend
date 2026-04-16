<template>
    <BreadCrumb PageTitle="Liste des tableaux IMDG" />
    <ListeTableauIMDG/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeTableauIMDG from "@/components/TableauIMDG/ListeTableauIMDG.vue";

    export default defineComponent({
      name: "ListeTableauIMDGPage",
      components: {
        BreadCrumb,
        ListeTableauIMDG,
      },
    });
  </script>
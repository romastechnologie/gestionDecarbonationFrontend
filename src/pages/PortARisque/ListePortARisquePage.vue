<template>
    <BreadCrumb PageTitle="Liste des ports à risques" />
    <ListePortARisque/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListePortARisque from "@/components/PortARisque/ListePortARisque.vue";

    export default defineComponent({
      name: "ListePortARisquePage",
      components: {
        BreadCrumb,
        ListePortARisque,
      },
    });
  </script>
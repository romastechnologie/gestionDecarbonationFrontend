<template>
    <BreadCrumb PageTitle="Ajouter une activité" />
    <DetailsActivity />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import DetailsActivity from "@/components/Activity/DetailsActivity.vue";
  
    export default defineComponent({
      name: "AddActivityPage",
      components: {
        BreadCrumb,
        DetailsActivity,
      },
    });
  </script>
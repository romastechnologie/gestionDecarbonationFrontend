<template>
    <BreadCrumb PageTitle="Ajouter une activité" />
    <AddActivity />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddActivity from "@/components/Activity/AddActivity.vue";
  
    export default defineComponent({
      name: "AddActivityPage",
      components: {
        BreadCrumb,
        AddActivity,
      },
    });
  </script>
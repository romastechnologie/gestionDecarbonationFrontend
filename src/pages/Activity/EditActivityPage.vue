<template>
    <BreadCrumb PageTitle="Modifier une activité" />
    <EditActivity />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditActivity from "@/components/Activity/EditActivity.vue";
  
    export default defineComponent({
      name: "EditActivityPage",
      components: {
        BreadCrumb,
        EditActivity,
      },
    });
  </script>
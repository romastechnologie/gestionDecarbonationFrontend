<template>
    <BreadCrumb PageTitle="Liste des activités" />
    <ListActivity />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListActivity from "@/components/Activity/ListActivity.vue";
  
    export default defineComponent({
      name: "ListActivityPage",
      components: {
        BreadCrumb,
        ListActivity,
      },
    });
  </script>
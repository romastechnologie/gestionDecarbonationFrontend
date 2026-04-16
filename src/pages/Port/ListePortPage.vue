<template>
    <BreadCrumb PageTitle="Liste des ports" />
    <ListePort/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListePort from "@/components/Port/ListePort.vue";

    export default defineComponent({
      name: "ListePortPage",
      components: {
        BreadCrumb,
        ListePort,
      },
    });
  </script>
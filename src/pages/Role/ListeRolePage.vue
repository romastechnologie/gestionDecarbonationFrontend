<template>
    <BreadCrumb PageTitle="Liste des rôles" />
    <ListeRole/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeRole from "../../components/Role/ListeRole.vue";

    export default defineComponent({
      name: "ListeRolePage",
      components: {
        BreadCrumb,
        ListeRole,
      },
    });
  </script>
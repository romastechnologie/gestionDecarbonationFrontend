<template>
    <BreadCrumb PageTitle="Voir le rôle" />
    <ViewRole />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ViewRole from "../../components/Role/ViewRole.vue";
  
    export default defineComponent({
      name: "ViewRolePage",
      components: {
        BreadCrumb,
        ViewRole,
      },
    });
  </script>
<template>
    <BreadCrumb PageTitle="Liste des permissions" />
    <ListePermission />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListePermission from "../../components/Permission/ListePermission.vue";

  
    export default defineComponent({
      name: "ListePermissionPage",
      components: {
        BreadCrumb,
        ListePermission,
      },
    });
  </script>
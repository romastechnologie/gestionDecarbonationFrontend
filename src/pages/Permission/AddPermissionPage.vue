<template>
    <BreadCrumb PageTitle="Ajouter une permission" />
    <AddPermissionModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddPermissionModal from "../../components/Permission/AddPermissionModal.vue";
  
    export default defineComponent({
      name: "AddPermissionPage",
      components: {
        BreadCrumb,
        AddPermissionModal,
      },
    });
  </script>
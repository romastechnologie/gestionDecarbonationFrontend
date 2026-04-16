<template>
    <BreadCrumb PageTitle="Complèter rôle" />
    <AddRoleModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddRoleModal from "../../components/Users/AddRoleModal.vue";
  
    export default defineComponent({
      name: "AddRolePage",
      components: {
        BreadCrumb,
        AddRoleModal,
      },
    });
  </script>
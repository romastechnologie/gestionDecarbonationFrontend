<template>
    <BreadCrumb PageTitle="Complèter un privilège" />
    <EditRole />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditRole from "../../components/Role/EditRole.vue";
  
    export default defineComponent({
      name: "EditRolePage",
      components: {
        BreadCrumb,
        EditRole,
      },
    });
  </script>
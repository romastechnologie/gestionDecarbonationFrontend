<template>
    <BreadCrumb PageTitle="Modifier le mot de passe d'un utilisateur" />
    <EditUserPassModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditUserPassModal from "../../components/Users/EditUserPassModal.vue";
  
    export default defineComponent({
      name: "EditUserPassPage",
      components: {
        BreadCrumb,
        EditUserPassModal,
      },
    });
  </script>
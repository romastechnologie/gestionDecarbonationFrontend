<template>
    <BreadCrumb PageTitle="Modifier un utilisateur" />
    <EditUser />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditUser from "../../components/Users/EditUser.vue";
  
    export default defineComponent({
      name: "EditUserPage",
      components: {
        BreadCrumb,
        EditUser,
      },
    });
  </script>
<template>
  <BreadCrumb PageTitle="Détails de l'utilisateur" />
  <ViewUser />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import ViewUser from "../../components/Users/ViewUser.vue";

  export default defineComponent({
    name: "ViewUserPage",
    components: {
      BreadCrumb,
      ViewUser,
    },
  });
</script>
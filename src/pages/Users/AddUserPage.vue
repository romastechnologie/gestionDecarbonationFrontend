<template>
  <BreadCrumb PageTitle="Ajouter un utilisateur" />
  <AddUser />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddUser from "../../components/Users/AddUser.vue";

export default defineComponent({
  name: "AddUserPage",
  components: {
    BreadCrumb,
    AddUser,
  },
});
</script>
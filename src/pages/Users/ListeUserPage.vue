<template>
  <BreadCrumb PageTitle="Liste des utilisateurs" />
  <ListeUser />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeUser from "../../components/Users/ListeUser.vue";

export default defineComponent({
  name: "ListeUserPage",
  components: {
    BreadCrumb,
    ListeUser,
  },
});
</script>
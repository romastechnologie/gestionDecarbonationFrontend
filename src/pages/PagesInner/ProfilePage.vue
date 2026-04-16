<template>
  <BreadCrumb PageTitle="Profile" />
  <div class="row">
      <ProfileContent />
      <UpdatePassword />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ProfileContent from "../../components/PagesInner/Profile/ProfileContent.vue";
import UpdatePassword from "../../components/PagesInner/Profile/UpdatePassword.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    BreadCrumb,
    ProfileContent,
    UpdatePassword,
  },
});
</script>
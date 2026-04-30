<template>
  <Inscription />
</template>

<script lang="ts">
import { defineComponent } from "vue";


import Inscription from "@/components/Authentication/Inscription/inscription.vue";

export default defineComponent({
  name: "InscriptionPage",
  components: {
    Inscription,
  },
});
</script>
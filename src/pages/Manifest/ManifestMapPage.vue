<template>
  <BreadCrumb PageTitle="Carte des Positions" />
  <!-- <ManifestMap /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";
// import ManifestMap from "@/components/Manifest/ManifestMap.vue";

export default defineComponent({
  name: "ManifestMapPage",
  components: {
    BreadCrumb,
    // ManifestMap,
  },
});
</script>

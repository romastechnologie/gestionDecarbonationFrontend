<template>
  <div class="row">
    <div class="col-12">
      <DmppmKpi />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DmppmKpi from "../../components/Dashboard/Ecommerce/DmppmKpi.vue";

export default defineComponent({
  name: "DmppmPage",
  components: {
    DmppmKpi,
  },
});
</script>

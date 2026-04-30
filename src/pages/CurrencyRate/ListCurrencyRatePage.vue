<template>
  <BreadCrumb PageTitle="Liste des taux de changes" />
  <ListCurrencyRate />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListCurrencyRate from "@/components/CurrencyRate/ListCurrencyRate.vue";

  export default defineComponent({
    name: "ListCurrencyPage",
    components: {
      BreadCrumb,
      ListCurrencyRate,
    },
  });
</script>
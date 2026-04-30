<template>
  <BreadCrumb PageTitle="Liste des devises" />
  <ListCurrency />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import ListCurrency from "@/components/Currency/ListCurrency.vue";

  export default defineComponent({
    name: "ListCurrencyPage",
    components: {
      BreadCrumb,
      ListCurrency,
    },
  });
</script>
<template>
  <BreadCrumb PageTitle="Ajouter une devise" />
  <AddCurrencyRateModal />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
  import AddCurrencyRateModal from "@/components/CurrencyRate/AddCurrencyRateModal.vue";

  export default defineComponent({
    name: "AddPortPage",
    components: {
      BreadCrumb,
      AddCurrencyRateModal,
    },
  });
</script>
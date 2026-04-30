<template>
  <BreadCrumb PageTitle="Ajouter une devise" />
  <AddCurrencyModal />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddCurrencyModal from "@/components/Currency/AddCurrencyModal.vue";

  export default defineComponent({
    name: "AddPortPage",
    components: {
      BreadCrumb,
      AddCurrencyModal,
    },
  });
</script>
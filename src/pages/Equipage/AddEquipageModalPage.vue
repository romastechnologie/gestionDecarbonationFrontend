<template>
  <BreadCrumb PageTitle="Ajouter un équipage" />
  <AddEquipageModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddEquipageModal from "@/components/Equipage/AddEquipageModal.vue";

export default defineComponent({
  name: "AddEquipageModalPage",
  components: {
    BreadCrumb,
    AddEquipageModal,
  },
});
</script>
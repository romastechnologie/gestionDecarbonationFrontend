<template>
    <BreadCrumb PageTitle="Ajouter un hs Code" />
    <AddHsCodeModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddHsCodeModal from "@/components/HsCode/AddHsCodeModal.vue";

export default defineComponent({
    name: "AddHsCodePage",
    components: {
        BreadCrumb,
        AddHsCodeModal,
    },
});
</script>
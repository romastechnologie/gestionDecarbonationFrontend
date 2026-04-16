<template>
    <BreadCrumb PageTitle="Ajouter un port à risque" />
    <AddCategorieHsCodeModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddCategorieHsCodeModal from "@/components/CategorieHsCode/AddCategorieHsCodeModal.vue";

export default defineComponent({
    name: "AddCategorieHsCodePage",
    components: {
        BreadCrumb,
        AddCategorieHsCodeModal,
    },
});
</script>
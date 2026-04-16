<template>
    <BreadCrumb PageTitle="Liste des catégories Code" />
    <ListeCategorieHsCode />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeCategorieHsCode from "@/components/CategorieHsCode/ListeCategorieHsCode.vue";

export default defineComponent({
    name: "ListeCategorieHsCodePage",
    components: {
        BreadCrumb,
        ListeCategorieHsCode,
    },
});
</script>
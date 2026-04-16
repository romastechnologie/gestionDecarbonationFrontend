<template>
    <BreadCrumb PageTitle="Liste des Hs Code" />
    <ListeHsCode />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeHsCode from "@/components/HsCode/ListeHsCode.vue";

export default defineComponent({
    name: "ListeHsCodePage",
    components: {
        BreadCrumb,
        ListeHsCode,
    },
});
</script>
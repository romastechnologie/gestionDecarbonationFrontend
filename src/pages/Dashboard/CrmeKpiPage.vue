<template>
        <CrmeKpi />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CrmeKpi from "@/components/Dashboard/Ecommerce/CrmeKpi.vue";

export default defineComponent({
    name: "CrmeKpiPage",
    components: {
        CrmeKpi,
    },
});
</script>

<template>
    <div>
        <CmppmKpi />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CmppmKpi from "@/components/Dashboard/Ecommerce/CmppmKpi.vue";

export default defineComponent({
    name: "CmppmPage",
    components: {
        CmppmKpi,
    },
});
</script>

<template>
    <div>
        <DmppnKpi />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DmppnKpi from "@/components/Dashboard/Ecommerce/DmppnKpi.vue";

export default defineComponent({
    name: "DmppnPage",
    components: {
        DmppnKpi,
    },
});
</script>

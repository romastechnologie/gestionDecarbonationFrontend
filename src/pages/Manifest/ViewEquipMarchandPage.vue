<template>
    <BreadCrumb PageTitle="Voir les détails" />
    <ViewEquipMarchand />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ViewEquipMarchand from "@/components/Manifest/ViewEquipMarchand.vue";

    export default defineComponent({
        name: "ViewEquipMarchandPage",
        components: {
            BreadCrumb,
            ViewEquipMarchand,
        },
    });
</script>
<template>
    <BreadCrumb PageTitle="Liste des navires " />
    <ListeVessel />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeVessel from "@/components/Vessel/ListeVessel.vue";

export default defineComponent({
    name: "ListeVesselPage",
    components: {
        BreadCrumb,
        ListeVessel,
    },
});
</script>
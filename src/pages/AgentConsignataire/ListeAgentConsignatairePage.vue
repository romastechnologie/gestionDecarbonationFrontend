<template>
    <BreadCrumb PageTitle="Liste des agents consignataires" />
    <ListeAgentConsignataire />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeAgentConsignataire from "@/components/AgentConsignataire/ListeAgentConsignataire.vue";

export default defineComponent({
    name: "ListeAgentConsignatairePage",
    components: {
        BreadCrumb,
        ListeAgentConsignataire,
    },
});
</script>
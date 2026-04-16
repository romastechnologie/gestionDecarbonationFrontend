<template>
    <BreadCrumb PageTitle="Ajouter un agent consignataire" />
    <AddAgentConsignataireModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddAgentConsignataireModal from "@/components/AgentConsignataire/AddAgentConsignataireModal.vue";

export default defineComponent({
    name: "AddAgentConsignataireModalPage",
    components: {
        BreadCrumb,
        AddAgentConsignataireModal,
    },
});
</script>
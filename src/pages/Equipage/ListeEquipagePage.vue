<template>
    <BreadCrumb PageTitle="Liste des équipages" />
    <ListeEquipage />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListeEquipage from "@/components/Equipage/ListeEquipage.vue";

export default defineComponent({
    name: "ListeEquipagePage",
    components: {
        BreadCrumb,
        ListeEquipage,
    },
});
</script>
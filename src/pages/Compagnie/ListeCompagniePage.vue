<template>
    <BreadCrumb PageTitle="Liste des Compagnies" />
    <ListeCompagnie />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeCompagnie from "@/components/compagnie/ListeCompagnie.vue";

    export default defineComponent({
        name: "ListeCompagniePage",
        components: {
            BreadCrumb,
            ListeCompagnie,
        },
    });
</script>
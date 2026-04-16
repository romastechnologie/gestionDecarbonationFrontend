<template>
    <BreadCrumb PageTitle="Liste des voyages " />
    <ListeManifest />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeManifest from "@/components/Manifest/ListeManifest.vue";

    export default defineComponent({
        name: "ListeManifestPage",
        components: {
            BreadCrumb,
            ListeManifest,
        },
    });
</script>
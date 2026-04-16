<template>
    <BreadCrumb PageTitle="Voir les détails du manifest" />
    <ViewManifest />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ViewManifest from "@/components/Manifest/ViewManifest.vue";

    export default defineComponent({
        name: "ViewManifestPage",
        components: {
            BreadCrumb,
            ViewManifest,
        },
    });
</script>
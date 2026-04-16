<template>
    <BreadCrumb PageTitle="Liste des connaissements " />
    <ListeDocument />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeDocument from "@/components/Document/ListeDocument.vue";

    export default defineComponent({
        name: "ListeDocumentPage",
        components: {
            BreadCrumb,
            ListeDocument,
        },
    });
</script>
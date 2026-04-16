<template>
    <BreadCrumb PageTitle="Liste des Privilèges" />
    <ListePrivilege />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListePrivilege from "../../components/Privilege/ListePrivilege.vue";

    export default defineComponent({
        name: "ListePrivilegePage",
        components: {
            BreadCrumb,
            ListePrivilege,
        },
    });
</script>
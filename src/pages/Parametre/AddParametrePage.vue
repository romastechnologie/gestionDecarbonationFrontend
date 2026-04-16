<template>
    <BreadCrumb PageTitle="Ajout d'un paramètre" />
    <AddParametre />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddParametre from "../../components/Parametre/AddParametre.vue";

    export default defineComponent({
        name: "AddParametrePage",
        components: {
            BreadCrumb,
            AddParametre,
        },
    });
</script>
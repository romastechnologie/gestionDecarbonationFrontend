<template>
    <BreadCrumb PageTitle="Liste des Profils" />
    <ListeProfil />
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeProfil from "../../components/Profil/ListeProfil.vue";

    export default defineComponent({
        name: "ListeProfilPage",
        components: {
            BreadCrumb,
            ListeProfil,
        },
    });
</script>
<template>
    <BreadCrumb PageTitle="Liste des Utilisateurs" />
    <ListeUtilisateur />
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListeUtilisateur from "../../components/Utilisateur/ListeUtilisateur.vue";

    export default defineComponent({
        name: "ListeUtilisateurPage",
        components: {
            BreadCrumb,
            ListeUtilisateur,
        },
    });
</script>
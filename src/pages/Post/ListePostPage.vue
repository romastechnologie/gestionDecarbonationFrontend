<template>
    <BreadCrumb PageTitle="Liste des Postes" />
    <ListePost />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListePost from "@/components/Post/ListePost.vue";

export default defineComponent({
    name: "AddPostPage",
    components: {
        BreadCrumb,
        ListePost,
    },
});
</script>
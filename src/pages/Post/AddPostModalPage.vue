<template>
    <BreadCrumb PageTitle="Ajouter un Post" />
    <AddPostModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddPostModal from "@/components/Post/AddPostModal.vue";

export default defineComponent({
    name: "AddPostPage",
    components: {
        BreadCrumb,
        AddPostModal,
    },
});
</script>
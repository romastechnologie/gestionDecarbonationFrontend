<template>
    <BreadCrumb PageTitle="Ajouter un transport" />
    <EditTransportAsset />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import EditTransportAsset from "@/components/Transport-Asset/EditTransport-Asset.vue";
  
    export default defineComponent({
      name: "EditTransportAssetPage",
      components: {
        BreadCrumb,
        EditTransportAsset,
      },
    });
  </script>
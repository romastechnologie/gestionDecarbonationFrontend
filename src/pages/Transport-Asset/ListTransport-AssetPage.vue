<template>
    <BreadCrumb PageTitle="Liste des transports" />
    <ListTransportAsset/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import ListTransportAsset from "@/components/Transport-Asset/ListTransport-Asset.vue";

    export default defineComponent({
      name: "ListTransportAssetPage",
      components: {
        BreadCrumb,
        ListTransportAsset,
      },
    });
  </script>
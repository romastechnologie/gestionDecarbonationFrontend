<template>
    <BreadCrumb PageTitle="Ajouter un transport" />
    <AddTransportAsset />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import BreadCrumb from "../../components/Common/BreadCrumb.vue";
    import AddTransportAsset from "@/components/Transport-Asset/AddTransport-Asset.vue";
  
    export default defineComponent({
      name: "AddTransportAssetPage",
      components: {
        BreadCrumb,
        AddTransportAsset,
      },
    });
  </script>
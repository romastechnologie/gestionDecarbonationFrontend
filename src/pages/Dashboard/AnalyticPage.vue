<template>
  <BreadCrumb PageTitle="Tableau de bord analytique" />
  <div class="row">
     <div class="col-xxl-12 col-xxxl-12">
      <WeeklySales />
    </div>
    <div class="col-xxl-12 col-xxxl-12">
      <NaviresPecheSansLicence />
    </div>
    <div class="col-xxl-6 col-xxxl-6">
      <ClientPaymentStatus />
    </div>
    <div class="col-xxl-6 col-xxxl-6">
      <WebsiteVisitors />
    </div>
   
  </div>
</template>

<script setup lang="ts">
import WeeklySales from "../../components/Dashboard/Ecommerce/WeeklySales.vue";
import WebsiteVisitors from "../../components/Dashboard/Ecommerce/WebsiteVisitors.vue";
import ClientPaymentStatus from "../../components/Dashboard/CRMSystem/ClientPaymentStatus.vue";
import NaviresPecheSansLicence from "../../components/Dashboard/Ecommerce/NaviresPecheSansLicence.vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";

// All components use defineComponent for proper TypeScript support
</script>
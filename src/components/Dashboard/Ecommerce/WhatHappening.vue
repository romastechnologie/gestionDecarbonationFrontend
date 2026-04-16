<template>
  <div class="card mb-25 border-0 rounded-0 welcome-box">
    <div class="card-body pe-15 pe-sm-20 pe-md-0 pb-0 pt-15 pt-sm-20">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6">
          <div class="title position-relative">
            <h3 class="fw-semibold mb-8">
              Bonjour, <span class="fw-bold">{{ userName ? userName : "" }}!</span>
            </h3>
            <span class="d-block text-black-emphasis fs-md-15 fs-lg-16">
              Nous sommes ravis de vous revoir. <br>
              Prêt à continuer l’aventure ? Explorez, découvrez et atteignez vos objectifs avec nous.
            </span>
          </div>
          <ul class="ps-0 mb-0 mt-3 list-unstyled">
            <!-- <li
              class="d-inline-block text-uppercase fw-medium fs-13 text-black-emphasis position-relative"
            >
              VENTE
              <span class="d-block fw-black lh-1 text-black mt-5 mt-md-10">
                0
              </span>
            </li>
            <li
              class="d-inline-block text-uppercase fw-medium fs-13 text-black-emphasis position-relative"
            >
              ENCAISSEMENT
              <span class="d-block fw-black lh-1 text-black mt-5 mt-md-10">
                0
              </span>
            </li> -->
          </ul>
        </div>
        <div class="col-lg-6 col-md-6 text-center mt-15 mt-md-0">
          <img
            src="../../../assets/images/welcome/mann.png"
            alt="welcome-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAuthStore } from "@/services/auth";
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "WhatHappening",
  setup() {
    const userName = ref("");
    const userEmail = ref("");
    const userPhone = ref("");

    onMounted(() => {

      if(JwtService.getUser()){
        userName.value = JwtService.getUserName()!;
        userEmail.value = JwtService.getUserEmail()! ? JwtService.getUserEmail()! : JwtService.getUserPhone()!;
        userPhone.value = JwtService.getUserPhone()!;
      }
    });

    return {
      userName,
      userEmail,
      userPhone
    };
  }
});
</script>
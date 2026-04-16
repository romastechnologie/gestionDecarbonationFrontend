<template>
  <div class="card border-0 rounded-0 bg-white authentication-card"
    style="margin-top: 20% !important; border-radius:15px !important; width: 500px; max-width: 95%;">
    <div class="card-body letter-spacing" style="padding: 45px 50px !important;">
      <img src="@/assets/images/logo_iacd.png" alt="logo" class="mb-10 d-block mx-auto"
        style="width: 250px; height: auto;">
      <h4 class="text-black fw-bold mb-0 text-center">
        Veuillez vous connecter
      </h4>
      <!-- Messages globaux -->
      <transition name="fade">
        <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-4 rounded-3" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          <div class="fw-medium">{{ globalSuccess }}</div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-4 rounded-3" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <div class="fw-medium">{{ globalError }}</div>
        </div>
      </transition>

      <!-- Formulaire de connexion -->
      <Form @submit="onSubmitLogin" :validation-schema="loginSchema">
        <div class="mb-3">
          <label class="d-block text-black fw-semibold mb-2">Email</label>
          <Field name="email" type="email" class="form-control form-control-lg text-black"
            style="height: 50px; font-size: 1rem;" placeholder="example@email.com" />
          <ErrorMessage name="email" class="text-danger small" />
        </div>
        <div class="mb-3">
          <label class="d-block text-black fw-semibold mb-2">Mot de passe</label>
          <Field name="password" type="password" class="form-control form-control-lg text-black"
            style="height: 50px; font-size: 1rem;" placeholder="Entrez votre mot de passe" />
          <ErrorMessage name="password" class="text-danger small" />
        </div>
        <button type="submit"
          class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 bg-primary d-block w-100 py-3">
          Se connecter
        </button>
      </Form>
    </div>
  </div>

  <!-- MODAL CHANGEMENT MOT DE PASSE (première connexion) -->
  <teleport to="body">
    <div v-if="showChangePasswordForm" class="my-ultimate-otp-modal">
      <div class="my-ultimate-otp-card">
        <div class="header text-center position-relative py-4 bg-light">
          <h5 class="mb-0 fw-bold" style="text-align: center !important;">Première connexion</h5>
          <!-- <p class="text-muted small mt-2 mb-0">Veuillez définir un nouveau mot de passe</p> -->
          <button type="button" class="btn-close position-absolute end-0 top-50 translate-middle-y me-4"
            @click="logoutAndRedirect" aria-label="Fermer"></button>
        </div>

        <div class="body p-4">
          <transition name="fade">
            <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-4 rounded-3" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <div class="fw-medium">{{ globalSuccess }}</div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-4 rounded-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <div class="fw-medium">{{ globalError }}</div>
            </div>
          </transition>

          <Form @submit="handleChangePassword" :validation-schema="changePasswordSchema">
            <div class="mb-4">
              <label class="form-label fw-semibold text-start">Ancien mot de passe</label>
              <Field name="oldPassword" type="password" class="form-control"
                placeholder="Saisissez votre ancien mot de passe" />
              <ErrorMessage name="oldPassword" class="text-danger small" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold text-start">Nouveau mot de passe</label>
              <Field name="newPassword" type="password" class="form-control" placeholder="Minimum 8 caractères" />
              <ErrorMessage name="newPassword" class="text-danger small" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold text-start">Confirmer le nouveau mot de passe</label>
              <Field name="confirm_password" type="password" class="form-control" placeholder="Retaper le nouveau" />
              <ErrorMessage name="confirm_password" class="text-danger small" />
            </div>

            <div class="d-flex gap-3">
              <button type="button" class="btn btn-outline-secondary flex-fill" @click="logoutAndRedirect">
                Annuler
              </button>
              <button type="submit" class="btn btn-primary flex-fill">
                Modifier
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </teleport>

  <teleport to="body">
    <div v-if="showOtpModal" class="my-ultimate-otp-modal">
      <div class="my-ultimate-otp-card">
        <div class="header">
          <h5 class="text-center">Vérification en deux étapes</h5>
          <button type="button" class="btn-close" @click="showOtpModal = false"></button>
        </div>
        <div class="body">
          <p class="text-muted small mb-3">Entrez le code à 6 chiffres reçu par email</p>
          <transition name="fade">
            <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-4 rounded-3" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <div class="fw-medium">{{ globalSuccess }}</div>
            </div>
          </transition>

          <!-- MESSAGE D'ERREUR GLOBAL (auto-disparition) -->
          <transition name="fade">
            <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-4 rounded-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <div class="fw-medium">{{ globalError }}</div>
            </div>
          </transition>
          <input v-model="otp" type="text" inputmode="numeric" maxlength="6"
            class="form-control form-control-lg text-center" @keyup.enter="verifyOtpLogin" autofocus />
        </div>
        <div class="footer">
          <button class="btn btn-outline-secondary" @click="showOtpModal = false">
            Annuler
          </button>
          <button class="btn btn-primary" @click="verifyOtpLogin" :disabled="otp.length !== 6">
            Valider
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { useAuthStore } from '@/services/auth';
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const globalError = ref<string | null>(null);
const globalSuccess = ref<string | null>(null);
const showChangePasswordForm = ref(false);
const showOtpModal = ref(false);
const otp = ref("");
const loginUserId = ref<number | null>(null); // stocke userId renvoyé par le backend

const firstLoginUserId = ref<string | null>(null);
watch(
  () => route.path,
  (path) => {
    if (path === "/login" || path === "/") {
      nextTick(() => {
        const email = document.querySelector('input[name="email"]') as HTMLInputElement;
        const password = document.querySelector('input[name="password"]') as HTMLInputElement;
        if (email) email.value = "";
        if (password) password.value = "";
      });
    }
  },
  { immediate: true }
);
const loginSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});
// Schema : ancien mot de passe obligatoire lors de la première connexion
const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Ancien mot de passe requis"),
  newPassword: Yup.string()
    .min(8, "Minimum 8 caractères")
    .required("Nouveau mot de passe requis"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Les mots de passe ne correspondent pas")
    .required("Confirmation requise"),
});

// Login
const onSubmitLogin = async (values: any) => {
  globalError.value = null;
  globalSuccess.value = null;
  try {
    // const res = await ApiService.post("/loginUser", {
    //   email: values.email.toLowerCase().trim(),
    //   password: values.password,
    // });

    // const data = res.data;
    // if (data.firstLogin === true) {
    //   JwtService.saveToken(data.token);
    //   ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    //   firstLoginUserId.value = data.userId;
    //   showChangePasswordForm.value = true;
    //   globalSuccess.value = "Première connexion détectée. Veuillez changer votre mot de passe.";
    // } else {
    //   JwtService.saveToken(data.token);
    //   ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    //   loginUserId.value = data.user.id;
    //   showOtpModal.value = true;
    //   globalSuccess.value = "Un code de vérification a été envoyé sur votre email";
    //   return;
    // }
    router.push({ name: "tableauBordPage" });
  } catch (err: any) {
    globalError.value = err.response?.data?.message || "Identifiants incorrects";
  }
  // console.log("Login values:", values)
  //            router.push({ name: "tableauBordPage" });
};

// Changement mot de passe
const handleChangePassword = async (values: any) => {
  globalError.value = "";
  try {
    await ApiService.put(`/user/${firstLoginUserId.value}`, {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    globalSuccess.value = "Mot de passe modifié avec succès ! Connectez-vous maintenant avec votre nouveau mot de passe.";
    setTimeout(() => {
      // Nettoyage complet
      JwtService.destroyToken();
      delete ApiService.vueInstance.axios.defaults.headers.common["Authorization"];
      showChangePasswordForm.value = false;
      globalSuccess.value = "";
      globalError.value = "";
      router.push("/login");
    }, 2500); // 2.5 secondes pour lire le message

  } catch (err: any) {
    globalError.value = err.response?.data?.message || "Erreur lors du changement";
  }
};

const logoutAndRedirect = () => {
  JwtService.destroyToken();
  delete ApiService.vueInstance.axios.defaults.headers.common["Authorization"];

  showChangePasswordForm.value = false;
  // On vide les messages
  globalSuccess.value = "";
  globalError.value = "";
  nextTick(() => {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    emailInput?.focus();
  });
};

const verifyOtpLogin = async () => {
  if (!loginUserId.value || otp.value.length !== 6) {
    globalError.value = "Veuillez saisir 6 chiffres";
    return;
  }
  try {
    const response = await ApiService.post("/verifyOtp", {
      userId: loginUserId.value,
      otp: otp.value.trim(),
      purpose: "login"
    });

    if (response.data.code === 200 || response.data.success) {
      const data = response.data.data || response.data;

      // Stockage des tokens
      localStorage.setItem("authToken", data.token || data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken || "");

      // Connexion dans le store
      const authStore = useAuthStore();
      authStore.login(data.user);
      const nomComplet = data.user.nom
        ? `${data.user.nom} ${data.user.prenom || ''}`.trim()
        : data.user.prenom || data.user.email;

      globalSuccess.value = `Connexion réussie ! Bienvenue ${nomComplet} !`;
      showOtpModal.value = false;
      otp.value = "";

      // Redirection
      setTimeout(() => {
        router.push({ name: "tableauBordPage" });
      }, 1500);

    } else {
      globalError.value = response.data.message || "Code OTP incorrect";
      setTimeout(() => {
        router.push({ name: "LoginPage" });
      }, 1500);
    }
  } catch (error: any) {
    globalError.value = error.response?.data?.message || "Code invalide ou expiré";
    console.error("Erreur vérification OTP:", error);
  }

  return {
    verifyOtpLogin,

  }
};

</script>

<style scoped>
/* MODAL QUI MARCHE TOUJOURS – 100% indépendante */
.my-ultimate-otp-modal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.7) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 99999 !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
}

.my-ultimate-otp-card {
    background: white !important;
    border-radius: 16px !important;
    width: 90% !important;
    max-width: 400px !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3) !important;
    overflow: hidden !important;
    animation: pop 0.3s ease-out !important;
}

.my-ultimate-otp-card .header {
    padding: 20px 24px 12px !important;
    display: flex !important;
    justify-content: space-between !important;
    /* align-items: center !important; */
    border-bottom: 1px solid #eee !important;
}

.my-ultimate-otp-card .body {
    padding: 24px !important;
    text-align: center !important;
}

.my-ultimate-otp-card .footer {
    padding: 16px 24px !important;
    display: flex !important;
    /* justify-content: flex-end !important; */
    gap: 25px !important;
    background: #f8f9fa !important;
    border-top: 1px solid #eee !important;
    justify-content: center;
}

@keyframes pop {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
<template>
  <header
    :class="[
      'header-area bg-white text-center text-md-start pt-15 pb-15 ps-15 pe-15 ps-md-20 pe-md-20 pe-lg-30 transition mb-25 position-fixed',
      { sticky: isSticky },
    ]"
    id="header"
  >
    <div class="row align-items-center">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div
          class="header-left-side justify-content-center justify-content-md-start d-flex align-items-center"
        >

          <button
            class="header-burger-menu transition position-relative lh-1 bg-transparent p-0 border-0"
            id="header-burger-menu"
            @click="stateStoreInstance.onChange"
          >
            <i class="flaticon-menu-3"></i>
          </button>

          <!-- <div v-if="caisseOptions.length >0" class="dropdown">
            <button 
              class="btn btn-primary btn-sm dropdown-toggle text-white fs-6" 
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ caisseOptions[0]?.label }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Changer de caisse</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider"></li>   
              <li><a class="dropdown-item" href="#">Separated link</a></li> 
            </ul>
          </div>

          <div  v-else class="text-danger fs-mb-12">
            Aucune caisse ouverte
          </div> -->

          <!-- <button
            class="header-burger-menu transition position-relative lh-1 bg-transparent p-0 border-0"
            id="header-burger-menu"
            @click="stateStoreInstance.onChange"
          >
            <i class="flaticon-menu-3"></i>
          </button>
          <form class="search-box">
            <div class="input-group">
              <input
                type="text"
                class="form-control shadow-none rounded-0 border-0"
                placeholder="Mot clé..."
              />
              <button
                class="default-btn position-relative transition border-0 fw-medium text-white pt-8 pb-8 ps-15 pe-15 pt-md-12 pb-md-12 ps-md-20 pe-md-20"
                type="button"
              >
                Rechercher
                <i
                  class="flaticon-search-interface-symbol position-relative ms-5 top-1"
                ></i>
              </button>
            </div>
          </form> -->
        </div>
      </div>

      <div class="col-xl-8 col-lg-7 col-md-6">
        <div class="header-right-side d-flex align-items-center justify-content-center justify-content-md-end">
          
          <LightDarkSwtichBtn />
<!--           
          <div class="dropdown notification-dropdown">
            <button
              class="dropdown-toggle p-0 position-relative bg-transparent border-0 transition lh-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-bell-2"></i>
              <span
                class="dot-badge position-absolute fw-bold rounded-circle text-white bg-primary d-inline-block"
              >
                3
              </span>
            </button>
            <div
              class="dropdown-menu rounded-0 bg-white border-0 start-auto end-0"
            >
              <div
                class="title d-flex align-items-center justify-content-between"
              >
                <span class="text-black fw-bold"
                  >Notifications <span class="text-muted">(03)</span></span
                >
                <router-link
                  to="/notifications"
                  class="text-decoration-none link-btn transition text-primary fw-medium"
                >
                  Vider
                </router-link>
              </div>
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li class="text-muted position-relative">
                  <div
                    class="icon rounded-circle position-absolute text-center"
                  >
                    <i class="ph-bold ph-chat-centered-dots"></i>
                  </div>
                  <span class="d-block text-black-emphasis"
                    >You have requested to
                    <strong class="fw-semibold">withdrawal</strong></span
                  >
                  2 hrs ago
                  <router-link
                    to="/notifications"
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                  <span
                    class="unread d-inline-block rounded-circle bg-primary position-absolute w-10 h-10"
                  ></span>
                </li>
                <li class="text-muted position-relative">
                  <div
                    class="icon rounded-circle position-absolute text-center"
                  >
                    <i class="ph-bold ph-user-plus"></i>
                  </div>
                  <span class="d-block text-black-emphasis">
                    <strong class="fw-semibold">A new user</strong> added in
                    Adlash
                  </span>
                  3 hrs ago
                  <router-link
                    to="/notifications"
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                  <span
                    class="unread d-inline-block rounded-circle bg-primary position-absolute w-10 h-10"
                  ></span>
                </li>
                <li class="text-muted position-relative">
                  <div
                    class="icon rounded-circle position-absolute text-center"
                  >
                    <i class="ph-bold ph-chat-centered-dots"></i>
                  </div>
                  <span class="d-block text-black-emphasis">
                    You have requested to
                    <strong class="fw-semibold">withdrawal</strong>
                  </span>
                  1 day ago
                  <router-link
                    to="/notifications"
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                </li>
              </ul>
              <div class="text-center dropdown-footer">
                <router-link
                  to="/notifications"
                  class="link-btn text-decoration-none text-primary position-relative d-inline-block transition fw-medium fw-medium"
                >
                  Voir toutes les notifications
                </router-link>
              </div>
            </div>
          </div> -->

          <div class="dropdown profile-dropdown">
            <button
              class="dropdown-toggle text-start fs-14 text-black-emphasis d-flex align-items-center p-0 position-relative bg-transparent border-0 transition lh-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="../../assets/images/admin.jpg"
                class="rounded"
                width="44"
                height="44"
                alt="admin"
              />
              <span class="title d-none d-lg-block ms-10 ms-lg-15">
                <span class="d-block fw-bold mb-5 mb-md-8">{{ userName? userName : "" }}</span>
                <span class="text-body-emphasis fw-semibold fs-13">{{ userEmail? userEmail : ""}}</span>
              </span>
            </button>
            <div
              class="dropdown-menu rounded-0 bg-white border-0 start-auto end-0"
            >
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li
                  class="text-body-secondary fw-semibold transition position-relative"
                >
                  <i class="flaticon-user-2"></i>
                  Mon compte
                  <router-link
                    to="/profile"
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                </li>
                
                <!-- <li
                  class="text-body-secondary fw-semibold transition position-relative"
                >
                  <i class="flaticon-warning"></i>
                  Support
                  <router-link
                    to="/support-desk-card"
                    class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                </li> -->
               
              </ul>
              <button @click="logout()" class="btn btn-sm btn-danger ms-2" ><i class="flaticon-logout mt-2 me-2"></i>Se déconnecter</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LightDarkSwtichBtn from "./LightDarkSwtichBtn.vue";
import stateStore from "../../utils/store";
import { useAuthStore, User } from "@/services/auth";
import router from "@/router";
import JwtService from "@/services/JwtService";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";

export default defineComponent({
  name: "MainHeader",
  components: {
    LightDarkSwtichBtn,
  },
  setup() {
    const stateStoreInstance = stateStore;
    const isSticky = ref(false);
    const store = useAuthStore();
    const user = ref<User>();
    const userName = ref("");
    const userEmail = ref("");
    const userPhone = ref("");

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });


      if(JwtService.getUser()){
        userName.value = JwtService.getUserName()!;
        userEmail.value = JwtService.getUserEmail()! ? JwtService.getUserEmail()! : JwtService.getUserPhone()!;
        userPhone.value = JwtService.getUserPhone()!;
      }
    });

    // const Deconnecion = () => {
    //   store.logout()
    //   router.push("/login");
    // };

    function logout() {
      store.logout()
      if(!store.isAuthenticated) {
        
        router.push({name:'LoginPage'})

      }
    }

    return {
      isSticky,
      stateStoreInstance,
      logout,
      userEmail,
      userName,
      userPhone,
      user
      
    };
  },
});
</script>
<template>
  <div :class="[
    'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
    { active: stateStoreInstance.open },
  ]" id="sidebar-area">
    <div class="logo position-absolute start-0 end-0 top-0 bg-black" style="padding: 20px 20px !important;">
      <router-link to="/Accueil" class="d-flex align-items-center text-white text-decoration-none">
        <center>
          <img src="../../assets/images/logo_light.png" alt="" style="width: 190px !important;">
        </center>
      </router-link>
      <div class="border-bottom" style="padding-top: 15px !important"></div>
      <button class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange">
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <ul class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion" id="sidebarNavAccordion">
        <!-- Section Accueil -->
        <li class="sub-title sidebar-nav-item">
          <span class="d-block text-uppercase fw-medium">IACD Platform</span>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/Accueil" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Tableau de bord</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/analytique" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Analytique</span>
          </router-link>
        </li>
        <li class="sub-title sidebar-nav-item">
          <span class="d-block text-uppercase fw-medium">Gestion des Smri</span>
        </li>
        <!-- <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0" >
          <a href="#"
            class="accordion-button rounded-0 shadow-none bg-transparent d-block"
            data-bs-toggle="collapse"
            data-bs-target="#documents"
            aria-expanded="true"
            aria-controls="sidebarCollapseOne">
            <i class="flaticon-users-group"></i>
            <span class="title">Gestion des Documents</span>
          </a>
          <div
            id="documents"
            class="accordion-collapse collapse "
            data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                 <li class="sidebar-sub-menu-item" >
                  <router-link to="/liste-documents" class="sidebar-sub-menu-link" >
                    Liste de documents
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li> -->
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#compagnies" aria-expanded="true" aria-controls="sidebarCollapseOne">
            <i class="flaticon-sterile-box"></i>
            <span class="title">Gestion des mani</span>
          </a>
          <div id="compagnies" class="accordion-collapse collapse " data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-manifestes" class="sidebar-sub-menu-link">
                    Liste des voyages 
                  </router-link>
                </li>
              </ul>
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-documents" class="sidebar-sub-menu-link">
                    Liste des connaissements 
                  </router-link>
                </li>
              </ul>
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-vessels" class="sidebar-sub-menu-link">
                    Liste des navires 
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>

         <!-- <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#quipages" aria-expanded="true" aria-controls="sidebarCollapseOne">
            <i class="flaticon-sterile-box"></i>
            <span class="title">Gestion des Equipages</span>
          </a>
          <div id="quipages" class="accordion-collapse collapse " data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
             
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/listeEquipage" class="sidebar-sub-menu-link">
                    Liste des équipages
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li> -->


        <!-- Section Paramètres -->
        <li class="sub-title sidebar-nav-item">
          <span class="d-block text-uppercase fw-medium">Paramètres</span>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseOne" aria-expanded="true" aria-controls="sidebarCollapseOne">
            <i class="flaticon-more-1"></i>
            <span class="title">Paramètres</span>
          </a>
          <div id="sidebarCollapseOne" class="accordion-collapse collapse show" data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-ports" class="sidebar-sub-menu-link">
                   Liste des Ports
                  </router-link>
                </li>

                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste_ports_a_risque" class="sidebar-sub-menu-link">
                    Liste des PortsARisques
                  </router-link>
                </li>

                <li class="sidebar-sub-menu-item">
                  <router-link to="/listeTableauIMDG" class="sidebar-sub-menu-link">
                    Liste des Tableau IMDG
                  </router-link>
                </li>

                <li class="sidebar-sub-menu-item">
                  <router-link to="/listeCategorie_hs_Code" class="sidebar-sub-menu-link">
                   Liste des Catégories Hs Code
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/listeHs_Code" class="sidebar-sub-menu-link">
                    Liste des Hs Codes
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/listeAgentC" class="sidebar-sub-menu-link">
                    Liste des Agents Consignataires
                  </router-link>
                </li>

                 <li class="sidebar-sub-menu-item">
                  <router-link to="/listePoste" class="sidebar-sub-menu-link">
                    Liste des Posts
                  </router-link>
                </li>

              </ul>
            </div>
          </div>
        </li>

        <li class="sub-title sidebar-nav-item">
          <span class="d-block text-uppercase fw-medium">Gestion des utilisateurs</span>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#users" aria-expanded="true" aria-controls="sidebarCollapseTwo">
            <i class="flaticon-user-1"></i>
            <span class="title">Utilisateurs</span>
          </a>
          <div id="users" class="accordion-collapse collapse " data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/ajouter-user" class="sidebar-sub-menu-link">
                    Ajouter un utilisateur
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-users" class="sidebar-sub-menu-link">
                    Liste des utilisateurs
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0">
          <a href="#" class="accordion-button rounded-0 shadow-none bg-transparent d-block" data-bs-toggle="collapse"
            data-bs-target="#roles" aria-expanded="true" aria-controls="sidebarCollapseTwo">
            <i class="flaticon-shield"></i>
            <span class="title">Rôles</span>
          </a>
          <div id="roles" class="accordion-collapse collapse " data-bs-parent="#sidebarNavAccordion">
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/ajouter-role" class="sidebar-sub-menu-link">
                    Ajouter un rôle
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/liste-roles" class="sidebar-sub-menu-link">
                    Liste des rôles
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/liste-privileges" class="sidebar-nav-link d-block">
            <i class="flaticon-shield-1"></i>
            <span class="title">Privilèges</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import stateStore from "../../utils/store";
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name: string) => {
      return privileges.value.includes(name);
    };

    const checkParentPermission = (permissions: string[]) => {
      for (const permission of permissions) {
        if (checkPermission(permission)) {
          return true;
        }
      }
      return false;
    };

    return {
      stateStoreInstance,
      checkPermission,
      checkParentPermission,
    };
  },
});
</script>
```
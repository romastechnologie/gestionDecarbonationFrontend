<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/ajouter-user"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un utilisateur
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un utilisateur"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="users.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Nom</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Prenom</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Telephone</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Email</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Sexe</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Caisses affectees</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date creation</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ user.nom }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ user.prenom }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ user.telephone }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ user.email }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ user.sexe }}</td>
              <td class="shadow-none lh-1 fw-medium">
                {{ user.affectations?.length ? user.affectations.map((a: any) => a.caisse.nom).join(', ') : 'Aucune' }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span :class="user.isActive ? 'badge bg-success' : 'badge bg-danger'">
                  {{ user.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ format_date(user.createdAt) }}</td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <span
                    class="badge text-white bg-primary fs-15 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                    <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
  <!-- Modifier mot de passe -->
  <li>
    <a class="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#EditUserPassModal" @click="openEditPassModal(user)">
      <i class="flaticon-lock lh-1 me-8 position-relative top-1"></i>
      Modifier le mot de passe
    </a>
  </li>
  <!-- Modifier infos -->
  <li>
    <router-link class="dropdown-item d-flex align-items-center" :to="{ name: 'EditUserPage', params: { id: user.id } }">
      <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
      Modifier les informations
    </router-link>
  </li>
  <!-- Ajouter un rôle -->
  <li>
    <a class="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#AddRoleModal" @click="openAddRoleModal(user)">
      <i class="flaticon-shield lh-1 me-8 position-relative top-1"></i>
      Ajouter un role
    </a>
  </li>
  <!-- Détails -->
  <li>
    <router-link :to="{ name: 'ViewUserPage', params: { id: user.id } }" class="dropdown-item d-flex align-items-center">
      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
      Details
    </router-link>
  </li>
  <!-- Affecter une caisse -->
  <li>
    <a class="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#AffectationCaisseModal" @click="openAffectationCaisseModal(user)">
      <i class="flaticon-shield lh-1 me-8 position-relative top-1"></i>
      Affecter une caisse
    </a>
  </li>
  <!-- Supprimer -->
  <li>
    <a class="dropdown-item d-flex align-items-center text-danger" href="javascript:void(0);" @click="suppression(user.id, users, 'users', 'un utilisateur')">
      <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
      Supprimer
    </a>
  </li>
  <!-- Statut -->
  <li>
    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="toggleStatut(user)">
      <i class="flaticon-check lh-1 me-8 position-relative top-1"></i>
      {{ user.isActive ? 'Désactiver' : 'Activer' }}
    </a>
  </li>
</ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center py-4 text-muted">Aucun utilisateur trouve.</div>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent
          :page="page"
          :totalPages="totalPages"
          :totalElements="totalElements"
          :limit="limit"
          @paginate="handlePaginate"
        />
      </div>
    </div>
  </div>

  <AffectationCaisseModal @affectee="refreshUsers" :selectedUser="selectedUser" />
  <EditUserPassModal :selectedUser="selectedUser" />
  <AddRoleModal :selectedUser="selectedUser" :selectedUserId="selectedUserId" />

  <!-- ========== MODAL STATUT ========== -->
 
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { format_date, suppression, error } from "@/utils/utils";
import EditUserPassModal from "./EditUserPassModal.vue";
import AddRoleModal from "./AddRoleModal.vue";
import PaginationComponent from "@/components/Utilities/Pagination.vue";
import JwtService from "@/services/JwtService";
import { User } from "@/models/users";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ListeUser",
  components: {
    EditUserPassModal,
    AddRoleModal,
  
    PaginationComponent,
  },
  setup() {
    const users = ref<Array<User>>([]);
    const user = ref<User>();
    const searchTerm = ref("");
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    const getAllUsers = (p = 1, limi = 10, search = "") => {
      return ApiService.get(`/users?page=${p}&limit=${limi}&mot=${search}&`)
        .then(({ data }) => {
          users.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch((err) => {
          error(err.response?.data?.message || "Erreur lors de la recuperation des utilisateurs");
        });
    };


const toggleStatut = (u: User) => {
  const activation = !u.isActive;

  Swal.fire({
    title: activation
      ? "Activer ce compte ?"
      : "Désactiver ce compte ?",
    text: activation
      ? `Voulez-vous vraiment activer le compte de ${u.nom} ${u.prenom} ?`
      : `Voulez-vous vraiment désactiver le compte de ${u.nom} ${u.prenom} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: activation ? "#28a745" : "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: activation ? "Oui, activer" : "Oui, désactiver",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.isConfirmed) {
      ApiService.put(`/users/${u.id}`, { isActive: activation })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: activation ? "Compte activé !" : "Compte désactivé !",
            timer: 1500,
            showConfirmButton: false,
          });
          getAllUsers(page.value, limit.value, searchTerm.value);
        })
        .catch((err) =>
          error(err.response?.data?.message || "Erreur lors du changement de statut")
        );
    }
  });
};
    // ── STATUT ──────────────────────────────────────────────────────────────
    const openStatusModal = (u: User) => {
      selectedUser.value = { ...u };
    };

   const activerCompte = () => {
  if (!selectedUser.value) return;
  ApiService.put(`/users/${selectedUser.value.id}`, { isActive: true })
    .then(() => getAllUsers(page.value, limit.value, searchTerm.value))
    .catch((err) => error(err.response?.data?.message || "Erreur lors de l'activation"));
};

const desactiverCompte = () => {
  if (!selectedUser.value) return;
  ApiService.put(`/users/${selectedUser.value.id}`, { isActive: false })
    .then(() => getAllUsers(page.value, limit.value, searchTerm.value))
    .catch((err) => error(err.response?.data?.message || "Erreur lors de la desactivation"));
};

    // ── AUTRES MODALS ────────────────────────────────────────────────────────
    const openEditPassModal = (u: User) => { selectedUser.value = { ...u }; };
    const openAddRoleModal  = (u: User) => { selectedUser.value = { ...u }; selectedUserId.value = u.id; };
    const openAffectationCaisseModal = (u: User) => { selectedUser.value = { ...u }; };

    const refreshUsers = () => getAllUsers(page.value, limit.value, searchTerm.value);

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      page.value = page_;
      getAllUsers(page_, limit_);
    };

    const rechercher = () => {
      page.value = 1;
      getAllUsers(page.value, limit.value, searchTerm.value);
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());
    const checkPermission = (name: string) => privileges.value.includes(name);

    onMounted(() => getAllUsers());

    return {
      users, user, checkPermission, format_date, suppression,
      selectedUser, selectedUserId,
      openEditPassModal, openAddRoleModal, openAffectationCaisseModal,
      openStatusModal, activerCompte, desactiverCompte,
      page, totalPages, limit, totalElements,
      handlePaginate, searchTerm, rechercher,
      getAllUsers, refreshUsers,
      toggleStatut, 
    };
  },
});
</script>

<style scoped>
.avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #0b4899;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-initials {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.status-box {
  border: 2px solid;
}
.status-active {
  background: #d1e7dd;
  border-color: #28a745;
}
.status-inactive {
  background: #f8d7da;
  border-color: #dc3545;
}
</style>
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
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Prénom
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Téléphone
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Email
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Sexe
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Caisses affectées
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date création
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                {{ user?.nom }}
              </th>
              <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                {{ user?.prenom }}
              </th>
              <td class="shadow-none lh-1 fw-medium">{{ user.telephone }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ user.email }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ user.sexe }}</td>
              <td class="shadow-none lh-1 fw-medium">
                {{ user.affectations?.length ? user.affectations.map(a => a.caisse.nom).join(', ') : 'Aucune' }}
              </td>
              <td class="shadow -none lh-1 fw-medium">{{ format_date(user.createdAt) }}</td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                    <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#EditUserPassModal"
                        @click="openEditPassModal(user)"
                      >
                        <i class="flaticon-lock lh-1 me-8 position-relative top-1"></i>
                        Modifier le mot de passe
                      </a>
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item d-flex align-items-center"
                        :to="{ name: 'EditUserPage', params: { id: user.id } }"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier les informations
                      </router-link>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#AddRoleModal"
                        @click="openAddRoleModal(user)"
                      >
                        <i class="flaticon-shield lh-1 me-8 position-relative top-1"></i>
                        Ajouter un rôle
                      </a>
                    </li>
                    <li>
                      <router-link
                        :to="{ name: 'ViewUserPage', params: { id: user.id } }"
                        class="dropdown-item d-flex align-items-center"
                      >
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Détails
                      </router-link>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#AffectationCaisseModal"
                        @click="openAffectationCaisseModal(user)"
                      >
                        <i class="flaticon-shield lh-1 me-8 position-relative top-1"></i>
                        Affecter une caisse
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(user.id, users, 'users', 'un utilisateur')"
                      >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center">
          Aucun utilisateur trouvé.
        </div>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
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

  const getAllUsers = (page = 1, limi = 10, searchTerm = "") => {
      return ApiService.get(`/users?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          users.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch((err) => {
          const message = err.response?.data?.message || "Erreur lors de la récupération des utilisateurs";
          error(message);
        });
    };
 
    const refreshUsers = () => {
      getAllUsers(page.value, limit.value, searchTerm.value);
    };
 
    const handlePaginate = ({ page_, limit_ }) => {
      page.value = page_;
      getAllUsers(page_, limit_);
    };
 
    const rechercher = () => {
      page.value = 1;
      getAllUsers(page.value, limit.value, searchTerm.value);
    };
 
    const openEditPassModal = (user: User) => {
      selectedUser.value = { ...user };
    };
 
    const openAddRoleModal = (user: User) => {
      selectedUser.value = { ...user };
      selectedUserId.value = user.id;
    };
 
    const openAffectationCaisseModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name: string) => {
      return privileges.value.includes(name);
    };

    onMounted(() => {
      getAllUsers();
    });
 
    return {
      users,
      checkPermission,
      format_date,
      suppression,
      user,
      selectedUser,
      openEditPassModal,
      openAddRoleModal,
      openAffectationCaisseModal,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      selectedUserId,
      getAllUsers,
      refreshUsers,
    };
  },
});
</script>
 
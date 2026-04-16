<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
            <router-link to="/liste-users" 
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative">Retour</span>
            </router-link>
          </div>
          <table class="table">
            <tbody>
              <tr v-if="user?.nomComplet">
                <td>Nom</td>
                <td>{{ user?.nomComplet }}</td>
              </tr>
              <tr v-if="user?.telephone">
                <td>Téléphone</td>
                <td>{{ user?.telephone }}</td>
              </tr>
              <tr v-if="user?.email">
                <td>Email</td>
                <td>{{ user?.email }}</td>
              </tr>
              <tr v-if="user?.sexe">
                <td>Sexe</td>
                <td>{{ user?.sexe }}</td>
              </tr>
              <tr>
                <td>Caisses affectées</td>
                <td>
                  <span v-if="user?.affectations?.length">
                    {{ user.affectations.map(a => a.caisse.nom).join(', ') }}
                  </span>
                  <span v-else>Aucune caisse affectée</span>
                </td>
              </tr>
              <tr>
                <td>Rôle</td>
                <td>
                  <div class="row">
                    <div class="col-6" v-for="(rle, index) in userData?.userRoles" :key="index">
                      <div class="d-flex align-items-center py-2">
                        <div class="col-4">
                          <span class="bullet bg-primary me-3"></span>
                          <p class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">{{ rle?.role?.nom }}</p>
                        </div>
                        <div class="col-2">
                          <span class="badge text-outline-danger">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="javascript:void(0);"
                              @click="suppRole(rle.id)"
                            >
                              <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                              Supprimer
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { User, UserData } from "@/models/users";
import { error, format_date, separateur, format_Date, suppression, success } from "@/utils/utils";

export default defineComponent({
  name: "ViewUser",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref<User | null>(null);
    const userData = ref<UserData | null>(null);
    const reloadData = ref(false);

    const getUser = (id: string) => {
      return ApiService.get(`/users/${id}?includeAffectations=true`)
        .then(({ data }) => {
          console.log('Données utilisateur :', data.data); // Debug
          userData.value = data.data;
          user.value = data.data;
        })
        .catch((err) => {
          const message = err.response?.data?.message || "Erreur lors de la récupération des détails de l'utilisateur";
          error(message);
        });
    };

    const suppRole = (id: number) => {
      ApiService.delete(`/roles/users/${id}`)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            reloadData.value = !reloadData.value;
          }
        })
        .catch((err) => {
          const message = err.response?.data?.message || "Erreur lors de la suppression du rôle";
          error(message);
        });
    };

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getUser(id);
      }
    });

    watch(reloadData, () => {
      const id = route.params.id as string;
      if (id) {
        getUser(id);
      }
    });

    return {
      user,
      userData,
      getUser,
      format_date,
      format_Date,
      separateur,
      suppression,
      suppRole,
      reloadData,
    };
  },
});
</script>
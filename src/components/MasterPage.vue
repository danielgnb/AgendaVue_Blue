<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Minha Agenda</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/contatos" class="nav-link active">Contatos</router-link>
            </li>
          </ul>
          <div class="btn-group ms-auto">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-cog"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item" @click="deleteUser">
                  <i class="fa fa-user-times"></i> Excluir Usuário
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="logout">
                  <i class="fa fa-sign-out"></i> Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { decodeToken } from '@/Services/utils.js';

export default {
  name: 'MasterPage',
  methods: {
    async deleteUser() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token de autenticação não encontrado");
          return;
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken) {
          console.error("Erro ao decodificar o token");
          return;
        }

        const usuarioId = decodedToken.UsuarioId;

        if (!usuarioId) {
          console.error("Usuário não encontrado no token.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await this.$axios.delete(`/api/usuario/${usuarioId}`, config);
        this.logout();
      } catch (error) {
        console.error("Erro ao excluir usuário", error);
        this.errorMessage = "Erro ao excluir usuário";
      }
    },

    logout() {
      localStorage.removeItem("authToken");
      this.$router.push({ name: "login" });
    },
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}

.navbar-nav .nav-link.active {
  font-weight: bold;
  color: #ffffff !important;
}

.dropdown-menu {
  min-width: 180px;
}

.dropdown-item i {
  margin-right: 8px;
}
</style>
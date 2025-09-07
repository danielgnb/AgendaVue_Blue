<template>
  <!-- Master Page com Navbar e conteúdo dinâmico -->
  <div>
    <!-- Navbar -->
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
          <button class="btn btn-danger ms-auto" @click="logout">Sair</button>
        </div>
      </div>
    </nav>

    <!-- Conteúdo Principal -->
    <div class="container mt-4">
      <router-view></router-view> <!-- Este será o conteúdo dinâmico das rotas -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MasterPage',
  methods: {
    // Método para o botão de logout
    logout() {
      // Remover o token do localStorage (ou outro método de logout)
      localStorage.removeItem('authToken');
      // Redirecionar para a página de login
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
/* Estilos do Master Page (personalize conforme necessário) */
.navbar {
  margin-bottom: 20px;
}
</style>

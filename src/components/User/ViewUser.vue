<template>
  <div class="user-details card p-4">
    <h4 class="card-title text-center mb-4">Usuário</h4>
    <div class="mb-2 d-flex">
      <label class="fw-bold">Nome:</label>
      <span class="text-muted ms-2">{{ user.username }}</span>
    </div>
  </div>
</template>

<script>
import { decodeToken } from '@/Services/utils.js';

export default {
  name: 'UserDetails',
  data() {
    return {
      user: {
        username: '',
        email: '',
        telefone: '',
      },
    };
  },
  methods: {
    async fetchUserDetails() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Token de autenticação não encontrado');
          return;
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken) {
          console.error('Erro ao decodificar o token');
          return;
        }

        const usuarioId = decodedToken.UsuarioId;

        if (!usuarioId) {
          console.error('Usuário não encontrado no token.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await this.$axios.get(`/api/usuario/${usuarioId}`, config);

        this.user = response.data;
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário', error);
      }
    },
  },
  mounted() {
    this.fetchUserDetails();
  },
};
</script>

<style scoped>
.user-details {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.fw-bold {
  font-weight: bold;
}

.text-muted {
  color: #6c757d;
}
</style>
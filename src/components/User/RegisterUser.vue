<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Cadastro de Usuário</h5>
            <form @submit.prevent="handleRegister">
              <div class="form-group mb-3">
                <label for="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="form-control"
                  placeholder="Digite seu nome de usuário"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
            </form>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await this.$axios.post('/api/usuario', {
          Username: this.username,
          Password: this.password
        });

        if (response.status === 201) {
          this.$router.push({ name: 'login' });
        }
      } catch (error) {
        this.errorMessage = 'Erro ao cadastrar usuário, tente novamente.';
        console.error('Erro ao registrar usuário', error);
      }
    }
  }
};
</script>


<style scoped>
.card {
  border-radius: 12px;
  border: none;
}

.card-body {
  padding: 2rem;
}

.text-danger {
  font-size: 14px;
}

input.form-control {
  border-radius: 8px;
}

button.btn {
  border-radius: 8px;
}

.container {
  margin-top: 50px;
}
</style>

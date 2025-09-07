<template>
  <div class="container-fluid">
    <div
      class="row justify-content-center align-items-center"
      style="min-height: 100vh; background-color: #f5f5f5;">
      <div class="col-12 col-md-6">
        <div class="card shadow-sm" style="background-color: #ffffff; border-radius: 12px;">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form @submit.prevent="handleLogin">
              <div class="form-group mb-3">
                <label for="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="form-control"
                  placeholder="Digite seu usuário"
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
              <button type="submit" class="btn btn-primary w-100">Entrar</button>
            </form>
            <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
            <div class="text-center mt-3">
              <button @click="goToRegister" class="btn btn-link">Cadastrar-se</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      usernameError: false,
      passwordError: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post('/api/Auth/login', {
          username: this.username,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          this.$router.push({ name: 'contacts' });
        }
      } catch (error) {
        this.errorMessage = 'Credenciais inválidas, tente novamente.';
        console.error('Erro ao realizar login', error);
      }
    },

    goToRegister() {
      this.$router.push({ name: 'registerUser' });
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: none;
  background-color: #ffffff;
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

.row {
  background-color: #f5f5f5;
}
</style>

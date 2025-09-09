<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Editar Contato</h5>
            <form @submit.prevent="updateContact">
              <div class="form-group mb-3">
                <label for="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  v-model="contact.nome"
                  class="form-control"
                  placeholder="Digite o nome"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="contact.email"
                  class="form-control"
                  placeholder="Digite o email"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="telefone">Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  v-model="contact.telefone"
                  v-mask="'(##) #####-####'"
                  class="form-control"
                  placeholder="Digite o telefone"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Salvar Alterações</button>
            </form>
            <ErrorMessage :message="errorMessage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateContact, decryptParameter } from "@/Services/utils.js";
import ErrorMessage from "@/components/Message/ErrorMessage.vue";
import Swal from "sweetalert2";

export default {
  name: 'EditContact',
  components: {
    ErrorMessage
  },
  data() {
    return {
      contact: {
        nome: '',
        email: '',
        telefone: ''
      },
      errorMessage: ''
    };
  },
  async created() {
    try {
      const contactId = decryptParameter(this.$route.params.id);
      const response = await this.$axios.get(`/api/contato/${contactId}`);

      this.contact = response.data;
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do contato.';
      console.error(error);
    }
  },
  methods: {
    async updateContact() {
      try {
        const [isValid, message] = validateContact(this.contact);
        if (!isValid) {
          this.errorMessage = message;
          return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Token de autenticação não encontrado');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await this.$axios.put(`/api/contato/${this.contact.id}`, this.contact, config);
        if (response.status === 200) {
          this.$router.push({ name: 'contacts' });
        }
        
      } catch (error) {
        Swal.fire("Erro", "Não foi possível atualizar o contato. Tente novamente.", "error");
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.card {
  border-radius: 12px;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.text-danger {
  font-size: 14px;
}
</style>
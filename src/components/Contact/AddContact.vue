<template>
  <div class="container mt-5">
    <h2>Criar Novo Contato</h2>
    <form @submit.prevent="saveContact">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input
          id="nome"
          v-model="contact.nome"
          type="text"
          class="form-control"
          placeholder="Digite o nome do contato"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="contact.email"
          type="email"
          class="form-control"
          placeholder="Digite o email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <input
          id="telefone"
          v-model="contact.telefone"
          v-mask="'(##) #####-####'"
          type="text"
          class="form-control"
          placeholder="Digite o telefone"
          required
        />
      </div>

      <button type="submit" class="btn btn-success w-100">Salvar</button>
    </form>
    <ErrorMessage :message="errorMessage" />
  </div>
</template>

<script>
import { validateContact } from "@/Services/utils.js";
import ErrorMessage from "@/components/Message/ErrorMessage.vue";
import Swal from "sweetalert2";

export default {
  name: "AddContact",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      contact: {
        nome: "",
        email: "",
        telefone: "",
      },
      errorMessage: ''
    };
  },
  methods: {
    async saveContact() {
      try {
        const [isValid, message] = validateContact(this.contact);
        if (!isValid) {
          this.errorMessage = message;
          return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token de autenticação não encontrado");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await this.$axios.post("/api/contato", this.contact, config);

        this.$router.push({ name: "contacts" });
      } catch (error) {
        Swal.fire(
          "Erro",
          "Não foi possível salvar o contato. Tente novamente.",
          "error"
        );
      }
    },
  },
};
</script>

<style scoped>
.add-contact {
  margin-top: 20px;
}
</style>

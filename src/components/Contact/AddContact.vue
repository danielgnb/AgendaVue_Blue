<template>
  <div class="container mt-5">
    <h2>Criar Novo Contato</h2>
    <form @submit.prevent="saveContact">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input
          id="nome"
          v-model="contact.Nome"
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
          v-model="contact.Email"
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
          v-model="contact.Telefone"
          v-mask="'(##) #####-####'"
          type="text"
          class="form-control"
          placeholder="Digite o telefone"
          required
        />
      </div>

      <button type="submit" class="btn btn-success w-100">Salvar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddContact",
  data() {
    return {
      contact: {
        Nome: "",
        Email: "",
        Telefone: "",
      },
    };
  },
  methods: {
    async saveContact() {
      try {
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
        console.error("Erro ao salvar o contato", error);
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

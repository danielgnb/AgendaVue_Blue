<template>
  <div class="container mt-5">
    <h2>Lista de Contatos</h2>
    <button @click="addContact" class="btn btn-primary mb-3">
      <i class="bi bi-plus-circle"></i> Adicionar Contato
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.nome }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.telefone }}</td>
          <td>
            <button
              @click="editContact(contact)"
              class="btn btn-warning btn-sm me-2"
            >
              <i class="fa fa-edit"></i> Editar
            </button>
            <button
              @click="deleteContact(contact)"
              class="btn btn-danger btn-sm"
            >
              <i class="fa fa-trash"></i> Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ContactsList",
  data() {
    return {
      contacts: [],
      errorMessage: "",
    };
  },
  methods: {
    decodeToken(token) {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        this.errorMessage = "Token JWT inválido";
        return null;
      }

      let base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");

      const padding =
        base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
      base64 += padding;
      const payload = atob(base64);
      return JSON.parse(payload);
    },

    async fetchContactsByUser() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          this.errorMessage = "Token de autenticação não encontrado";
          return;
        }

        const decodedToken = this.decodeToken(token);
        if (!decodedToken) return;

        const usuarioId = decodedToken.UsuarioId;
        if (!usuarioId) {
          this.errorMessage = "Usuário não encontrado no token.";
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await this.$axios.get(`/api/contato/Usuario/${usuarioId}`, config);

        this.contacts = response.data;
      } catch (error) {
        console.error("Erro ao carregar os contatos", error);
        this.errorMessage = "Erro ao carregar os contatos";
      }
    },

    addContact() {
      this.$router.push({ name: "addContact" });
    },

    editContact(contact) {
      this.$router.push({ name: "editContact", params: { id: contact.id } });
    },

    async deleteContact(contact) {
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

        await this.$axios.delete(`/api/contato/${contact.id}`, config);

        this.fetchContactsByUser();

      } catch (error) {
        console.error("Erro ao excluir o contato", error);
        this.errorMessage = "Erro ao excluir o contato";
      }
    },
  },
  mounted() {
    this.fetchContactsByUser();
  },
};
</script>

<style scoped>
.contacts-list {
  margin-top: 20px;
}
</style>

<template>
  <div class="container mt-5">
    <ViewUser />
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h2>Lista de Contatos</h2>
      </div>
      <div class="col-md-6 text-end">
        <button @click="addContact" class="btn btn-success mb-3">
          <i class="fa fa-user-plus"></i> Adicionar Contato
        </button>
      </div>
    </div>
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
              @click="openDeleteModal(contact)"
              class="btn btn-danger btn-sm"
            >
              <i class="fa fa-trash"></i> Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

<div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Exclusão</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Tem certeza de que deseja excluir este contato?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDelete"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { decodeToken } from "@/Services/utils.js";
import ViewUser from "@/components/User/ViewUser.vue";
import * as bootstrap from 'bootstrap';
import Swal from "sweetalert2";

export default {
  components: { ViewUser },
  name: "ContactsList",
  data() {
    return {
      contacts: [],
      errorMessage: "",
      contactToDelete: null,
    };
  },
  methods: {
    async fetchContactsByUser() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          this.errorMessage = "Token de autenticação não encontrado";
          return;
        }

        const decodedToken = decodeToken(token);
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

        const response = await this.$axios.get(
          `/api/contato/Usuario/${usuarioId}`,
          config
        );

        this.contacts = response.data;
      } catch (error) {
        console.error("Erro ao carregar os contatos", error);
      }
    },

    addContact() {
      this.$router.push({ name: "addContact" });
    },

    editContact(contact) {
      this.$router.push({ name: "editContact", params: { id: contact.id } });
    },

    openDeleteModal(contact) {
      this.contactToDelete = contact;
      const deleteModal = new bootstrap.Modal(
        document.getElementById("confirmDeleteModal")
      );
      deleteModal.show();
    },

    async confirmDelete() {
      if (!this.contactToDelete) return;

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

        await this.$axios.delete(
          `/api/contato/${this.contactToDelete.id}`,
          config
        );

        this.fetchContactsByUser();

        const deleteModal = bootstrap.Modal.getInstance(
          document.getElementById("confirmDeleteModal")
        );
        deleteModal.hide();
      } catch (error) {
        console.error("Erro ao excluir o contato", error);
        Swal.fire("Erro", "Não foi possível excluir o contato. Tente novamente.", "error");
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

.modal-footer {
  display: flex;
  justify-content: space-between;
}
</style>

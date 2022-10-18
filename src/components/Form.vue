<template>
  <div class="container-centro">
    <form @submit.prevent="submit" class="form-group">
      <label class="form-label" for="input-example-1">Nome</label>
      <input
        class="form-input"
        type="text"
        id="input-example-1"
        v-model="formulario.name"
      />
      <label class="form-label" for="input-example-1">Email</label>
      <input
        class="form-input"
        type="text"
        id="input-example-1"
        v-model="formulario.email"
      />
      <label class="form-label" for="input-example-1">Senha</label>
      <input
        class="form-input"
        type="password"
        id="input-example-1"
        v-model="formulario.password"
      />
      <footer class="footer-form">
        <div class="div-button-form">
          <button
            :disabled="disable"
            type="submit"
            class="btn btn-primary btn-cadastrar"
          >
            Cadastrar
          </button>
          <button
            :disabled="!disable"
            type="button"
            @click="update()"
            class="btn btn-primary btn-atualizar"
          >
            Atualizar
          </button>
        </div>
        <div class="input-group input-inline">
          <input
            v-model="searchKey"
            class="form-input"
            type="text"
            placeholder="Digite aqui..."
            v-on:keydown.enter.prevent="searchKey"
          />
          <button @click="search()" type="button" class="btn btn-primary">
            Pesquisar
          </button>
        </div>
      </footer>
    </form>
    <div class="div-table">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of users" :key="user._id" class="active">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="setDataOnInputs(user)" class="btn btn-primary">
                <i class="icon icon-edit"></i>
              </button>
              <button @click="remove(user)" class="btn btn-primary btn-delete">
                <i class="icon icon-delete"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from "../service/UserService";

export default {
  name: "Form",
  data() {
    return {
      formulario: {
        id: null,
        name: null,
        email: null,
        password: null,
      },
      users: [],
      disable: false,
      searchKey: "",
    };
  },
  methods: {
    async findAll() {
      const users = await UserService.findAll();
      this.users = users;
    },

    async submit() {
      if (this.emailExists()) {
        alert("Email já existente");
      } else {
        const user = JSON.stringify(this.formulario);

        await UserService.create(user);
        this.clearInputs();
        this.findAll();
      }
    },
    async remove(user) {
      await UserService.delete(user);
      this.findAll();
    },

    setDataOnInputs(user) {
      this.formulario.id = user._id;
      this.formulario.name = user.name;
      this.formulario.email = user.email;
      this.formulario.password = user.senha;
      this.disable = true;
    },

    clearInputs() {
      this.formulario.id = null;
      this.formulario.name = null;
      this.formulario.email = null;
      this.formulario.password = null;
    },

    async update() {
      const user = JSON.stringify(this.formulario);
      await UserService.update(this.formulario.id, user);

      this.clearInputs();
      this.disable = false;

      await this.findAll();
    },

    search() {
      if (this.searchKey == "") {
        this.findAll();
      } else {
        this.users = this.users.filter(
          (user) =>
            user.name.includes(this.searchKey) ||
            user.email.includes(this.searchKey)
        );
      }
    },

    emailExists() {
      const emailExists = this.users.find(
        (user) => user.email === this.formulario.email
      );
      if (emailExists) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.findAll();
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 20px;
}

.container-centro {
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  width: 35%;
}

.footer-form {
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
}
.btn-cadastrar,
.btn-atualizar {
  background-color: #53389f;
  border-style: none;
}
.btn-cadastrar {
  margin-right: 10px;
}

.btn-delete {
  margin-left: 5px;
}

.div-table {
  margin-top: 20px;
}
</style>

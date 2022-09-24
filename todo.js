var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
    modoAdicionar: false,
    modoEditar: false,
    att: 0,
    input: "",
    criacao: {
      user: "",
      dueTo: null,
      project: "",
      title: "",
    },
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          console.log(tarefasJson);
          this.tasks = tarefasJson;
        });
    },
    excluir(id) {
      console.log(id);
      fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" }).then(
        () => {
          this.getTasks();
        }
      );
    },
    criarNovaTask() {
      if (this.modoAdicionar == false) {
        this.modoAdicionar = true;
      } else {
        this.modoAdicionar = false;
      }
    },
    salvar() {
      fetch(
        `http://localhost:3000/tasks/`,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(this.criacao),
        },
        (this.modoAdicionar = false)
      ).then(() => {
        this.getTasks();
        this.atualizarPagina();
      });
    },
    abrirEditar(id) {
      if (this.modoEditar == false) {
        this.modoEditar = true;
      } else {
        this.modoEditar = false;
        // this.modoEditar = !this.modoEditar;
      }
      fetch(`http://localhost:3000/tasks/${id}`)
        .then((response) => response.json())
        .then((taskJson) => {
          console.log(taskJson);
          this.criacao = taskJson;
        });
    },
    salvarEditar(id) {
      fetch(
        `http://localhost:3000/tasks/${id}`,
        {
          method: "PATCH",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(this.criacao),
        },
        (this.modoEditar = false)
      ).then(() => {
        this.getTasks();
        this.atualizarPagina();
      });
      // this.modoEditar = false;
    },
    atualizarPagina() {
      document.location.reload(true);
    },
  },
  created() {
    console.log("created");
    this.getTasks();
  },
  computed: {
    inputSearch() {
      return this.tasks.filter((elem) =>
        elem.title.toLowerCase().includes(this.input.toLowerCase())
      );
    },
  },
  mounted() {
    console.log("montend");
  },
});

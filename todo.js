var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
    modoAdicionar: false,
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
      fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    },
    criarNovaTask() {
      if (this.modoAdicionar == false) {
        this.modoAdicionar = true;
      } else {
        this.modoAdicionar = false;
      }
    },
    salvar() {
      fetch(`http://localhost:3000/tasks/`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(this.criacao),
      });
    },
  },
  created() {
    console.log("created");
    this.getTasks();
  },
  mounted() {
    console.log("montend");
  },
});

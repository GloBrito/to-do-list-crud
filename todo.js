var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
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
    criar() {
      console.log(123);
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

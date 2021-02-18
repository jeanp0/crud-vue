//backend url
const url = "http://localhost/crud-vue/backend/crud.php";

new Vue({
  el: "#app",

  vuetify: new Vuetify(),

  data: {
    articulos: [],
    dialog: false,
    operacion: "",
    articulo: {
      id: null,
      description: "",
      price: "",
      stock: "",
    },
  },

  created() {
    // una vez creado, se listan los articulos
    this.mostrar();
  },

  methods: {
    validateInputs: function () {
      // return true if article is complete
      isComplete = false;
      if (
        this.articulo.description ||
        this.articulo.price ||
        this.articulo.stock
      ) {
        isComplete = true;
      }
      return isComplete;
    },
    limpiarArticulo: function () {
      this.articulo.description = "";
      this.articulo.price = "";
      this.articulo.stock = "";
    },
    //muestra todos los artículos
    mostrar: function () {
      axios.post(url, { opcion: 1 }).then((response) => {
        this.articulos = response.data;
      });
    },
    crear: function () {
      axios
        .post(url, {
          opcion: 2,
          description: this.articulo.description,
          price: this.articulo.price,
          stock: this.articulo.stock,
        })
        .then(() => {
          this.mostrar();
        });
      this.limpiarArticulo();
    },
    editar: function () {
      axios
        .post(url, {
          opcion: 3,
          id: this.articulo.id,
          description: this.articulo.description,
          price: this.articulo.price,
          stock: this.articulo.stock,
        })
        .then(() => {
          this.mostrar();
        });
    },
    eliminar: function (id) {
      //sweet alert (?)
      Swal.fire({
        text: "¿Está seguro de eliminar el registro?",
        icon: "warning",
        confirmButtonText: "Confirmar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(url, { opcion: 4, id: id }).then(() => {
            this.mostrar();
          });
          Swal.fire("Registro eliminado.", "", "success");
        }
      });
    },
    //botones y formularios
    guardar: function () {
      if (!this.validateInputs()) return;
      if (this.operacion === "crear") {
        this.crear();
      } else if (this.operacion === "editar") {
        this.editar();
      }
      this.dialog = false;
    },
    formNuevo: function () {
      this.dialog = true;
      this.operacion = "crear";
      this.limpiarArticulo();
    },
    formEditar: function (id, description, price, stock) {
      this.articulo.id = id;
      this.articulo.description = description;
      this.articulo.price = price;
      this.articulo.stock = stock;
      this.dialog = true;
      this.operacion = "editar";
    },
  },
});

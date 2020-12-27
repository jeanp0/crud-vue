//backend url
let url = "http://localhost/crud-vue/backend/crud.php"

new Vue({
  el: '#app',

  vuetify: new Vuetify(),

  data: {
    articulos: [],
    dialog: false,
    operacion: '',
    articulo: {
      id: null,
      descripcion: '',
      precio: '',
      stock: ''
    }
  },

  created() {
    this.mostrar()
  },

  methods: {
    limpiarArticulo: function () {
      this.articulo.descripcion = ""
      this.articulo.precio = ""
      this.articulo.stock = ""
    },
    //muestra todos los artículos
    mostrar: function () {
      axios.post(url, { opcion: 1 })
        .then(response => {
          this.articulos = response.data
        })
    },
    crear: function () {
      axios.post(url,
        {
          opcion: 2,
          descripcion: this.articulo.descripcion,
          precio: this.articulo.precio,
          stock: this.articulo.stock
        })
        .then(() => {
          this.mostrar()
        })
      this.limpiarArticulo()
    },
    editar: function () {
      axios.post(url,
        {
          opcion: 3,
          id: this.articulo.id,
          descripcion: this.articulo.descripcion,
          precio: this.articulo.precio,
          stock: this.articulo.stock
        })
        .then(() => {
          this.mostrar()
        })
    },
    eliminar: function (id) {
      //sweet alert (?)
      Swal.fire({
        text: '¿Está seguro de eliminar el registro?',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(url, { opcion: 4, id: id })
            .then(() => {
              this.mostrar();
            })
          Swal.fire('Registro eliminado.', '', 'success')
        } else if (result.isDenied) {
        }
      })
    },
    //botones y formularios
    guardar: function () {
      if (this.operacion === 'crear') {
        this.crear()
      }
      if (this.operacion === 'editar') {
        this.editar()
      }
      this.dialog = false
    },
    formNuevo: function () {
      this.dialog = true
      this.operacion = 'crear'
      this.limpiarArticulo()
    },
    formEditar: function (id, descripcion, precio, stock) {
      this.articulo.id = id
      this.articulo.descripcion = descripcion
      this.articulo.precio = precio
      this.articulo.stock = stock
      this.dialog = true
      this.operacion = 'editar'
    }
  }
})

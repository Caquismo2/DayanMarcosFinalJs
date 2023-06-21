// function verificarEdad() {
//     Swal.fire({ 
//      title: "¿Eres mayor de 18 años?",
//      showCancelButton: true,
//      confirmButtonText: "Si",
//      cancelButtonText: "No",
//       })
//       .then((result) => {
//     if (result.isConfirmed) {
//         Swal.fire({ 
//         title: "Encontra los mejores precios",
//         icon: "success",
//         text: "Bienvenido",
//           });
//         } 
//     else {
//        Swal.fire({ 
//        title: "No puedes entrar!",
//        icon: "error",
//        text: "Tienes que ser mayor de 18 para poder comprar",
//           })
//           .then(() => { verificarEdad();  }); 
//          } });
//          }

// document.addEventListener("DOMContentLoaded", function() {
// verificarEdad();  });
            

let carritoVisible = false;



    
//BOTONES Captura
let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');

// Botones Funcionalidades
for(let i=0;i<botonesEliminarItem.length; i++){
    let button = botonesEliminarItem[i];
    button.addEventListener('click',eliminarItemCarrito);
}

for(let i=0;i<botonesSumarCantidad.length; i++){
    let button = botonesSumarCantidad[i];
    button.addEventListener('click',sumarCantidad);
}

for(let i=0;i<botonesRestarCantidad.length; i++){
    let button = botonesRestarCantidad[i];
    button.addEventListener('click',restarCantidad);
}

for(let i=0; i<botonesAgregarAlCarrito.length;i++){
    let button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', agregarAlCarritoClicked);
}

//COMPRAR O LIMPIAR CARRITO
document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);
document.getElementsByClassName('btn-cerrar')[0].addEventListener('click',limpiarCarrito);


    

// FUNCIONES
function pagarClicked(){
    Swal.fire({
        title: 'Gracias por tu compra. <br> Espero te hayas llevado el Termidor',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });


    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();

}


  

function limpiarCarrito(){
       let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}


//Funcion que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
   

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funcion que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>  `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Restar cantidad del nuevo item
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}


//Aumentar en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

//Funcion que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.children.length === 0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        let items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    const carritoContenedor = document.querySelector('.carrito');
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
  
    Array.from(carritoItems).forEach((item) => {
      const precioElemento = item.querySelector('.carrito-item-precio');
      const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
      const cantidadItem = item.querySelector('.carrito-item-cantidad');
      const cantidad = cantidadItem.value;
      total += precio * cantidad;
    });
  
    total = Math.round(total * 100) / 100;
    const precioTotalElemento = document.querySelector('.carrito-precio-total');
    precioTotalElemento.innerText = '$'+total;
  }




  ///// CONECTAR CON API/JSON 

let botonGin = document.querySelector(".botonGin");
let container = document.querySelector(".container");
let contenidoExpandido = false; 
let contenidoOriginal = null;


const getGin = async () => {
    const response = await fetch("./datos.json");
    const data = await response.json();
    let gin = data;
  
    contenidoOriginal = container.innerHTML;
  
    botonGin.addEventListener("click", () => {
      if (contenidoExpandido) {
        container.innerHTML = contenidoOriginal;
        botonGin.textContent = "Expandir";
        contenidoExpandido = false;
      } else {
        gin.forEach((producto) => {
          let div = document.createElement("div");
          div.innerHTML = `
            <h2 class="letraJson">${producto.nombre}</h2>
            <p>${producto.precio}</p>
          `;
          container.append(div);
        });
        botonGin.textContent = "Contraer";
        contenidoExpandido = true;
        setTimeout(() => {
          container.innerHTML = contenidoOriginal;
          botonGin.textContent = "Expandir";
          contenidoExpandido = true;
        }, 5000); 
      }
    });
  };
  
  getGin();

/* 
document.addEventListener("DOMContentLoaded", function() {
    let submit = document.getElementById("submit");
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let mensaje = document.getElementById("mensaje");

    submit.addEventListener("click", function () {
      sessionStorage.setItem("nombreValue", nombre.value);
      sessionStorage.setItem("emailValue", email.value);
      sessionStorage.setItem("mensajeValue", mensaje.value);
    });

    let nombreValue = sessionStorage.getItem("nombreValue");
    let emailValue = sessionStorage.getItem("emailValue");
    let mensajeValue = sessionStorage.getItem("mensajeValue");



    console.log(nombreValue, emailValue, mensajeValue);
  }); */
  document.addEventListener("DOMContentLoaded", function() {
    let submit = document.getElementById("submit");
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let mensaje = document.getElementById("mensaje");

    submit.addEventListener("click", function (event) {
      event.preventDefault();

      let datos = {
        nombre: nombre.value,
        email: email.value,
        mensaje: mensaje.value
      };

      let datosJSON = JSON.stringify(datos);

      sessionStorage.setItem("datosFormulario", datosJSON);

      Swal.fire({
        title: "Datos para el envio",
        html: `
          <p>Nombre: ${nombre.value}</p>
          <p>Email: ${email.value}</p>
          <p>Mensaje: ${mensaje.value}</p>
        `,
        confirmButtonText: "Cerrar"
      }).then(() => {
        sessionStorage.removeItem("datosFormulario");        
        nombre.value = "";
        email.value = "";
        mensaje.value = "";
      });
    });

    let datosFormulario = sessionStorage.getItem("datosFormulario");
    if (datosFormulario) {
      let datos = JSON.parse(datosFormulario);
      nombre.value = datos.nombre;
      email.value = datos.email;
      mensaje.value = datos.mensaje;
    }
  });

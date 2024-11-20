import { getCrud, deleteCrudAsync, createCrud } from "../servicios/crud.js";

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const inputNombre = document.querySelector("#inputNombre");
const inputApellido = document.querySelector("#inputApellido");
const inputEdad = document.querySelector("#inputEdad");
const inputSexo = document.querySelector("#inputSexo");
const inputFecNac = document.querySelector("#inputFecNac");

const cerrarModalBtn = document.querySelector(".cerrar-modal");
const aceptarModalBtn = document.querySelector(".aceptar-modal");

const buttonRegistar = document.querySelector(".btn-registrar1");

let isEditing = false;

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

cerrarModalBtn.addEventListener("click", () => {
  const modalV = document.querySelector(".modal-delete");
  modalV.close();
});

buttonRegistar.addEventListener("click", () => {
  guardarResgitro();
});

function llenartabla() {
  getCrud()
    .then((results) => {
      results.forEach((persona) => {
        crearFila(persona);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      // Mostrar un mensaje al usuario
      // const errorMessage = document.getElementById("error-message");
      // errorMessage.textContent =
      //   "Se ha producido un error al cargar los datos. Por favor, inténtalo más tarde.";
    });
}

function crearFila(persona) {
  const tableBody = document.querySelector("#tableBody");
  console.log(persona);
  console.log("Se cargó n persona(s)");
  const { ID_CRUD, NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO } = persona;

  const row = document.createElement("tr");
  const tb_id = document.createElement("td");

  tb_id.textContent = `${ID_CRUD}`;
  tb_id.dataset.id = ID_CRUD;

  const tb_nombre = document.createElement("td");
  tb_nombre.textContent = `${NOMBRE}`;

  const tb_apellido = document.createElement("td");
  tb_apellido.textContent = `${APELLIDO}`;

  const tb_edad = document.createElement("td");
  tb_edad.textContent = `${EDAD}`;

  const tb_sexo = document.createElement("td");
  tb_sexo.textContent = `${SEXO}`;

  const tb_fecnac = document.createElement("td");
  tb_fecnac.textContent = `${convertirFecha(FECHA_NACIMIENTO)}`;

  const buttonEditar = document.createElement("button");
  buttonEditar.classList.add("btn-crud");
  buttonEditar.onclick = () => cargarDatosPersonaEditar(persona);

  const buttonEliminar = document.createElement("button");
  buttonEliminar.onclick = () => eliminarRegistro(persona);

  buttonEliminar.classList.add("btn-crud");
  tableBody.appendChild(row);
  row.appendChild(tb_id);
  row.appendChild(tb_nombre);
  row.appendChild(tb_apellido);
  row.appendChild(tb_edad);
  row.appendChild(tb_sexo);
  row.appendChild(tb_fecnac);
  row.appendChild(buttonEditar);
  row.appendChild(buttonEliminar);
  buttonEditar.innerHTML = "<i class='bi bi-pencil-square'></i>";
  buttonEliminar.innerHTML = "<i class='bi bi-trash-fill'></i>";
}

function cargarDatosPersonaEditar(persona) {
  const { ID_CRUD, NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO } = persona;
  inputNombre.value = NOMBRE;
  inputApellido.value = APELLIDO;
  inputEdad.value = EDAD;
  inputSexo.value = SEXO;
  inputFecNac.value = convertirFecha(FECHA_NACIMIENTO);
  isEditing = true;
  let buttonCrud_text = document.querySelector(".btn-registrar1").firstChild;
  buttonCrud_text.data = isEditing ? "Editar" : "Registrar";
  console.log(buttonCrud_text);
  isEditing = false;
}

function eliminarRegistro(persona) {
  const { ID_CRUD, NOMBRE, APELLIDO, EDAD, SEXO, FECHA_NACIMIENTO } = persona;
  const modalV = document.querySelector(".modal-delete");
  modalV.showModal();
  let textModal = document.querySelector(".container-modal-text");
  textModal.innerHTML = `<span><b>ID:</b> ${ID_CRUD}</span><br>
  <span><b>Persona:</b>${NOMBRE} ${APELLIDO}</span><br>
  <span><b>Edad:</b>${SEXO}</span><br>
  <span><b>Fecha de Nacimiento:</b>${convertirFecha(FECHA_NACIMIENTO)}</span>`;
  aceptarModalBtn.addEventListener("click", () => {
    //hacer aqui el crud de elimnacion
    console.log("se elimina el id" + ID_CRUD);
    deleteCrudAsync(String(ID_CRUD));
    limpiarHTML();
    // setTimeout(() => {
    //   llenartabla();
    // }, 10);
    // setTimeout(() => {
    //   modalV.close();
    // }, 0);

    modalV.close();
    llenartabla();
    // en la linea anterior poner un delay
  });
}

function limpiarHTML() {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = "";
}

function convertirFecha(fecha) {
  let parte = fecha.split("T");
  return parte[0];
}

function guardarResgitro() {
  // TODO: SE DEBE VALIDAR LOS CAMPOS
  const inputNombre1 = document.querySelector("#inputNombre").value;
  const inputApellido1 = document.querySelector("#inputApellido").value;
  const inputEdad1 = document.querySelector("#inputEdad").value;
  const inputSexo1 = document.querySelector("#inputSexo").value;
  const inputFecNac1 = document.querySelector("#inputFecNac").value;
  const modalCreate = document.querySelector(".modal-create");

  createCrud(
    inputNombre1,
    inputApellido1,
    inputEdad1,
    inputSexo1,
    inputFecNac1
  );

  modalCreate.showModal();
  setTimeout(() => {
    modalCreate.close();
  }, 650);
  limpiarHTML();
  // setTimeout(() => {
  //   llenartabla();
  // }, 0);
  llenartabla();
}

llenartabla();

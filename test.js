const fecha = document.querySelector("#fecha");
const marca = document.querySelector("#marca");
const proj = document.querySelector("#proj");
const piezas = document.querySelector("#piezas");
const link = document.querySelector("#link");
const lista = document.querySelector("#taskSecc");
const ButtonSend = document.querySelector("#icon");

let listArr = JSON.parse(localStorage.getItem("todo")) || [];

const fechaNav = new Date();
fecha.innerHTML = fechaNav.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function guardoListaEnLocalstorage() {
  const storageData = { tasks: listArr };
  localStorage.setItem("todo", JSON.stringify(storageData));
}

function AddTask(task) {
  const elemento = `<div class=" row align-items-center justify-content-evenly" id="row3">
    <div class="" id="marcaExp">${task.Marca}</div>
    <div class="text-wrap" id="projExp">${task.Proj}</div>
    <div class="" id="piezasExp">${task.Piezas} pzas</div>
    <a class="" id="linkBC" href="${task.link}">
      <img class="" id="iconBC" src="./icon/basecamp_3.png" alt="">
    </a>
    <div class="" id="cambiosExp">Cambios</div>
    <img class="" id="edit" src="./icon/pen.svg"></img>
    <img class="" data="eliminado" id="delete" src="./icon/circle-minus-solid.svg"></img>
  </div>`;

  lista.insertAdjacentHTML("afterbegin", elemento);
}

function cargarLista() {
  lista.innerHTML = "";
  listArr.forEach(function (task) {
    if (!task.eliminado) {
      AddTask(task);
    }
  });
}

function tareaElim(element) {
  const taskElement = element.closest(".row");
  const taskId = Array.from(lista.children).indexOf(taskElement);
  taskElement.remove();
  listArr[taskId].eliminado = true;

  listArr = listArr.filter(task => !task.eliminado);
  localStorage.setItem("todo", JSON.stringify(listArr));
}

ButtonSend.addEventListener("click", () => {
  const marcaVal = marca.value;
  const projVal = proj.value;
  const piezasVal = piezas.value;
  const linkVal = link.value;

  if (marcaVal && projVal && piezasVal && linkVal) {
    const task = {
      Marca: marcaVal,
      Proj: projVal,
      Piezas: piezasVal,
      link: linkVal,
      eliminado: false,
    };

    listArr.push(task);
    AddTask(task);
    guardoListaEnLocalstorage();

    marca.value = "";
    proj.value = "";
    piezas.value = "";
    link.value = "";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const marcaVal = marca.value;
    const projVal = proj.value;
    const piezasVal = piezas.value;
    const linkVal = link.value;

    if (marcaVal && projVal && piezasVal && linkVal) {
      const task = {
        Marca: marcaVal,
        Proj: projVal,
        Piezas: piezasVal,
        link: linkVal,
        eliminado: false,
      };
      listArr.push(task);
      AddTask(task);
      guardoListaEnLocalstorage();

      marca.value = "";
      proj.value = "";
      piezas.value = "";
      link.value = "";
    }
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "eliminado") {
    tareaElim(element);
  }
  guardoListaEnLocalstorage();
});


// Editar

function editMode(taskElement) {
  const marcaElement = taskElement.querySelector("#marcaExp");
  const projElement = taskElement.querySelector("#projExp");
  const piezasElement = taskElement.querySelector("#piezasExp");
  const linkElement = taskElement.querySelector("#linkBC");
  taskElement.classList.add('edit-mode');
  const originalMarcaValue = marcaElement.textContent;
  const originalProjValue = projElement.textContent;
  const originalPiezasValue = piezasElement.textContent.split(" ")[0];
  const originalLinkValue = linkElement.getAttribute("href");

  // Agregar botón "Guardar"
  const saveButton = document.createElement("button");
  saveButton.id = "saveEdit";
  saveButton.textContent = "Guardar";
  saveButton.classList.add("small-button"); // Agrega la clase creada
  taskElement.appendChild(saveButton);

  marcaElement.innerHTML = `<input type="text" class="edit-field" value="${originalMarcaValue}" />`;
  projElement.innerHTML = `<input type="text" class="edit-field" value="${originalProjValue}" />`;
  piezasElement.innerHTML = `<input type="number" class="edit-field" value="${originalPiezasValue}" /> pzas`;
  linkElement.innerHTML = `<input type="text" class="edit-field" value="${originalLinkValue}" />`;

  // Manejar clic en el botón "Guardar"
  saveButton.addEventListener("click", () => {
    const editedMarca = marcaElement.querySelector(".edit-field").value;
    const editedProj = projElement.querySelector(".edit-field").value;
    const editedPiezas = piezasElement.querySelector(".edit-field").value;
    const editedLink = linkElement.querySelector(".edit-field").value;

    const taskId = Array.from(lista.children).indexOf(taskElement);
    listArr[taskId].Marca = editedMarca;
    listArr[taskId].Proj = editedProj;
    listArr[taskId].Piezas = editedPiezas;
    listArr[taskId].link = editedLink;

    // Guardar cambios y actualizar vista
    guardoListaEnLocalstorage();
    cargarLista();

    // Restaurar vista original y eliminar el botón "Guardar"
    marcaElement.innerHTML = editedMarca;
    projElement.innerHTML = editedProj;
    piezasElement.innerHTML = `${editedPiezas} pzas`;
    linkElement.innerHTML = `<a class="" id="linkBC" href="${editedLink}">
      <img class="" id="iconBC" src="./icon/basecamp_3.png" alt="">
    </a>`;
    taskElement.removeChild(saveButton);
  });
}

lista.addEventListener("click", function (event) {
  const element = event.target;

  if (element.id === "edit") {
    const taskElement = element.closest(".row");
    editMode(taskElement);
  } else if (element.id === "cambiosExp") {
    let cambiosCount = parseInt(element.dataset.count || 0);
    cambiosCount++;
    element.textContent = `Cambios ${cambiosCount}`;
    element.dataset.count = cambiosCount;
  }
});

function cargoListaDesdeLocalstorage() {
  const data = localStorage.getItem("todo");
  if (data) {
    listArr = JSON.parse(data).tasks;
    cargarLista();
  }
}

cargoListaDesdeLocalstorage();

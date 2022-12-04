const modal = document.querySelector(".modal-container")
const tbody = document.querySelector("tbody")
const sNome = document.querySelector("#m-nome")
const sPele = document.querySelector("#m-pele")
const sOlho = document.querySelector("#m-olho")
const sAltura = document.querySelector("#m-altura")
const sPeso = document.querySelector("#m-peso")
const sGenero = document.querySelector("#m-genero")
const sPlaneta = document.querySelector("#m-planeta")
const btnSalvar = document.querySelector("#btnSalvar")

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add("active")

  modal.onclick = e => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active")
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sPele.value = itens[index].pele
    sOlho.value = itens[index].olho
    sAltura.value = itens[index].altura
    sPeso.value = itens[index].peso
    sPlaneta.value = itens[index].planeta
    id = index
  } else {
    sNome.value = ""
    sPele.value = ""
    sOlho.value = ""
    sAltura.value = ""
    sPeso.value = ""
    sPlaneta.value = ""
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement("tr")

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.pele}</td>
    <td>${item.olho}</td>
    <td>${item.altura}m</td>
    <td>${item.peso}</td>
    <td>${item.planeta}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == "" || sPele.value == "" || sOlho.value == "" || sAltura.value == "" || sPeso.value == "" || sPlaneta.value == "") {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].pele = sPele.value
    itens[id].olho = sOlho.value
    itens[id].altura = sAltura.value
    itens[id].peso = sPeso.value
    itens[id].planeta = sPlaneta.value
    
  } else {
    itens.push({"nome": sNome.value, "pele": sPele.value, "olho": sOlho.value, "altura": sAltura.value, "peso": sPeso.value, "planeta": sPlaneta.value})
  }

  setItensBD()

  modal.classList.remove("active")
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ""
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? []
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens))

loadItens()
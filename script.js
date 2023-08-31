const fecha = document.querySelector('#fecha')
const marca = document.querySelector('#marca')
const proj = document.querySelector('#proj')
const piezas = document.querySelector('#piezas')
const link = document.querySelector('#link')
const lista = document.querySelector('#taskSecc')
const ButtonSend = document.querySelector('#icon')
const iconoBC = document.querySelector('#iconBC')

let listArr = []

const fechaNav = new Date()
fecha.innerHTML = fechaNav.toLocaleDateString("es-MX",{weekday:'long',month:'long',day:'numeric'})

let linkCorto = ''
link.value.replace(linkCorto)

function AddTask(tarea,eliminado){

    if(eliminado){return}
    const elemento =  `<div class=" row align-items-center justify-content-evenly" id="row3">
                            <div class="" id="marcaExp">${marca.value}</div>
                            <div class="text-wrap" id="projExp">${proj.value}</div>
                            <div class="" id="piezasExp">${piezas.value} pzas</div>
                            <a class=""id="linkBC" href="">${linkCorto}
                                <img class="" id="iconBC"src="./icon/basecamp_3.png" alt="">
                            </a>
                            <div class="" id="cambiosExp">Cambios</div>
                            
                            <img class="" id="edit" src="./icon/pen.svg"></img>
                            <img class= "" data="eliminado" id="delete" src="./icon/circle-minus-solid.svg"></img>
                           
                        </div>`

    lista.insertAdjacentHTML("afterbegin", elemento)
    linkUrl = document.querySelector('#linkBC')
    linkUrl.href = link.value;
}


function tareaElim(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    listArr[element.id].eliminado = true
}

ButtonSend.addEventListener('click', ()=>{
    const marcaVal = marca.value
    const projVal = proj.value
    const piezasVal = piezas.value
    const linkVal = link.value

    if (marcaVal && projVal && piezasVal){
        AddTask(marcaVal && projVal && piezasVal && linkVal)
        listArr.push({
            Marca: marcaVal,
            Proj: projVal,
            Piezas: piezasVal,
            link: linkVal,
            eliminado: false
        }) 
    }
    localStorage.setItem('todo', JSON.stringify(listArr));
    marca.value = ""
    proj.value = ""
    piezas.value = ""
    link.value = ""


    
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const marcaVal = marca.value
        const projVal = proj.value
        const piezasVal = piezas.value
        const linkVal = link.value

        if (marcaVal && projVal && piezasVal){
        AddTask(marcaVal && projVal && piezasVal && linkVal)
        listArr.push({
            Marca: marcaVal,
            Proj: projVal,
            Piezas: piezasVal,
            link: linkVal,
            eliminado: false
        })
        }
        localStorage.setItem('todo', JSON.stringify(listArr));
        marca.value = ""
        proj.value = ""
        piezas.value = ""
        link.value = ""
     

    }
   
    
})

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData==='eliminado'){
        tareaElim(element)
    }
    localStorage.setItem('todo', JSON.stringify(listArr));
   
})

let data = localStorage.getItem('todo')
if(data){
    listArr = JSON.parse(data);
    cargarLista(listArr)
}
function cargarLista(d) {
    d.forEach(function(){
        AddTask(listArr);
    })
    
}


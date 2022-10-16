let inputBusqueda = document.querySelector('#input-search')
let btnSubmit = document.querySelector('#search-btn')
let divResultado = document.querySelector('#resultado')
let divOscuro = document.querySelector('#modoOscuro')
let imageMain = document.querySelector('#image-main')
let navDarkmode = document.querySelector('#nav-darkmode')


    fetch('/data/pokemons.json')
        .then((resp) => resp.json())
        .then((data) => {
            const search = (poke) => {
            return new Promise((resolve,reject) => {
            setTimeout(() => {
                const dataPoke = data.find((e) => e.name === poke)
                dataPoke ? resolve (dataPoke) : reject (
                    Swal.fire('No se encontraron resultados.')
                )
            },3000)
        })
    }

        
    btnSubmit.addEventListener('click', (e) => {
        const value = inputBusqueda.value.toLowerCase()
        e.preventDefault()
        if ( value === '') {
        alert('El buscador esta vacio')
        }else{
        divResultado.innerHTML = `<div class="container">
                                    <div class="loader"></div>
                                  </div>`
            search(value)
                .then((resp) => {
                    divResultado.innerHTML = `
                        <div class="div-pokemon">
                        <img src="${resp.img}" class="img-pokemon" alt="${resp.name}">
                        <img src="${resp.font}" class="font-pokemon" alt="letra-pokemon">
                        <p>Type: ${resp.type}<p>
                        <p>Attack: ${resp.attk}<p>
                        <p>Def: ${resp.def}<p>
                        <p>Age: ${resp.age}<p>
                        </div>
                        `
                    })      
                    .catch(() => {
                        divResultado.innerHTML = `<strong>Busca nuevamente...<strong>`
                        setTimeout(() => {
                        divResultado.innerHTML = ``
                        },5000)
                    })
                } 
            })  
        })


    divOscuro.addEventListener('click', (e) => {
        let element = document.body
        element.classList.toggle('dark-mode')
        e.preventDefault()
        if (divOscuro.innerHTML === 'Dark Mode'){
            divOscuro.innerHTML = 'Light Mode'
                Toastify({
                    text: "Dark Mode Active 🌙",
                    duration: 1200,
                    newWindow: true,
                    gravity: "top", 
                    position: "right", 
                    stopOnFocus: false,
                    style: {
                    background: "linear-gradient(to right, #ddf4, #000)",
                },
                onClick: function(){}
        }).showToast();
        }else{
            divOscuro.innerHTML = 'Dark Mode'
            Toastify({
                text: "Light Mode Active ☀️",
                duration: 1200,
                newWindow: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: false,
                style: {
                    background: "linear-gradient(to right, #ffbd7f, #000)",
                },
                onClick: function(){}
            }).showToast();
        }
    })
    

    imageMain.addEventListener('click', (e) => {
        e.preventDefault()
    })



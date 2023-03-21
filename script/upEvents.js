
let URLapi = "https://mindhub-xj03.onrender.com/api/amazing"


async function traer() {
    let response = await fetch(URLapi);
    datosAPI = await response.json();
console.log(datosAPI)
}

async function iniciar() {
    await traer();



    const eventosFuturos = [];
    const eventosPasados = [];

    const fechaLimite = "2023-03-10";

    for (let i = 0; i < datosAPI.events.length; i++) {
        let evento = datosAPI.events[i];
        let fechaEvento = new Date(evento.date);

        if (fechaEvento > new Date(fechaLimite)) {
            eventosFuturos.push(evento);
        } else {
            eventosPasados.push(evento);
        }
    }



    let categories = [];

    function filtrarCateg(arr) {
        arr.forEach(event => {
            if (!categories.includes(event.category)) {
                categories.push(event.category);
            }
        });
    }
    filtrarCateg(eventosFuturos)



    let categoriesDiv = document.querySelector("#categorias-f");

    function chekCategorias(algo) {
        algo.forEach(category => {
            categoriesDiv.innerHTML += `
    <div class="opciones-form">
        <input type="checkbox" name="${category}" value="${category}">
        <label for="${category}">${category}</label>
    </div>
    `;

        })
    };
    chekCategorias(categories)



    const divEventosFuturos = document.getElementById("up-coming");

    const fragmento = document.createDocumentFragment();



    function imprimir(futuras) {

        futuras.forEach((evento) => {

            let divImagen = document.createElement("div");
            divImagen.classList.add("img-card");

            let img = document.createElement("img");
            img.src = evento.image;
            divImagen.appendChild(img);


            let divTitulo = document.createElement("div");
            divTitulo.classList.add("desc-card");

            let titulo = document.createElement("h3");
            titulo.innerText = evento.name;
            divTitulo.appendChild(titulo);

            let descripcion = document.createElement("p");
            descripcion.innerText = evento.description;
            divTitulo.appendChild(descripcion);

            let divPrice = document.createElement("div");
            divPrice.classList.add("card-footer");
            let parrrafo = document.createElement("p")
            parrrafo.innerText = "price: $" + evento.price;
            let boton = document.createElement("a");
            boton.href = "./Details.html?id=" + evento._id;
            boton.innerText = "Ver mas.."

            divPrice.appendChild(parrrafo)
            divPrice.appendChild(boton)


            let card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("event");

            card.appendChild(divImagen);
            card.appendChild(divTitulo);
            card.appendChild(divPrice);


            fragmento.appendChild(card);


        })
    };






    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {

        checkbox.addEventListener('change', () => {

            const checkedCategories = [];
            checkboxes.forEach((cb) => {
                if (cb.checked) {
                    checkedCategories.push(cb.value);
                }
            });

            const filteredObjects = eventosFuturos.filter((obj) => {
                return checkedCategories.includes(obj.category);
            });

            mostrar(filteredObjects);
        });
    });

    function mostrar(contenido) {
        divEventosFuturos.innerHTML = "";
        if (contenido.length > 0) {
            imprimir(contenido)
        }
        else {
            imprimir(eventosFuturos)
        }
        divEventosFuturos.appendChild(fragmento);
    }
    mostrar(eventosFuturos);

    //--------------------------------------------------------
    const input = document.getElementById("miInputSearch");
    const boton = document.getElementById("miBotonSearch");


    function buscar() {
        divEventosFuturos.innerHTML = "";
        let busqueda = input.value.toLowerCase().trim();
        let resultados = [];
        let categoriasMarcadas = [];

        checkboxes.forEach((cb) => {
            if (cb.checked) {
                categoriasMarcadas.push(cb.value);
            }
        });

        if (categoriasMarcadas.length > 0) {
            for (let i = 0; i < eventosFuturos.length; i++) {
                const objeto = eventosFuturos[i];
                if (
                    (categoriasMarcadas.length === 0 || categoriasMarcadas.includes(objeto.category)) &&
                    (objeto.name.toLowerCase().trim().includes(busqueda) ||
                        objeto.description.toLowerCase().trim().includes(busqueda))
                ) {
                    resultados.push(objeto);
                }
            }
        } else {
            for (let i = 0; i < eventosFuturos.length; i++) {
                const objeto = eventosFuturos[i];
                if (
                    objeto.name.toLowerCase().trim().includes(busqueda) ||
                    objeto.description.toLowerCase().trim().includes(busqueda)
                ) {
                    resultados.push(objeto);
                }
            }
        }
        if (resultados.length === 0) {
            divEventosFuturos.innerHTML = "<p>No se encontraron resultados para su búsqueda. Por favor intente de nuevo.</p>";
        } else {
            mostrar(resultados);

        }
        divEventosFuturos.appendChild(fragmento);
    }

    boton.addEventListener("click", (event) => {
        event.preventDefault();
        buscar();
    });
}
iniciar();

let URLapi = "https://mindhub-xj03.onrender.com/api/amazing"


async function traer() {
    let response = await fetch(URLapi);
    datosAPI = await response.json();

}
async function iniciar() {
    await traer();



    let eventsContainer = document.getElementById('events-container');
    let eventsHtml = '';
    
    function imprimir(array) {
    
        array.forEach((event) => {
            let eventHtml = '<div class="card event">';
            eventHtml += '<div class="img-card">' +
                '<img src = "' + event.image + '" alt = "' + event.name + '" >'
                + '</div>';
    
            eventHtml += '<div class="desc-card">' +
                '<h3>' + event.name + '</h3>' +
                '<p>' + event.description + '</p>' +
                '</div>';
    
            eventHtml += '<div class="card-footer">' +
                '<p>Price: $' + event.price + '</p>' +
                '<a href="./Details.html?id=' + event._id + '">Ver mas..</a>' +
                '</div>';
            eventHtml += '</div>';
    
            eventsHtml += eventHtml;
        });
    }
    
    
    let categories = [];
    
    function filtrarCateg(arr) {
        arr.forEach(event => {
            if (!categories.includes(event.category)) {
                categories.push(event.category);
            }
        });
    }
    filtrarCateg(datosAPI.events)
    
    
    
    let categoriesDiv = document.querySelector("#categorias");
    
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
    
    
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checkedCategories = [];
            checkboxes.forEach((cb) => {
                if (cb.checked) {
                    checkedCategories.push(cb.value);
                }
            });
    
            const filteredObjects = datosAPI.events.filter((obj) => {
                return checkedCategories.includes(obj.category);
            });
    
            mostrar(filteredObjects);
        });
    });
    
    function mostrar(contenido) {
        eventsHtml = '';
        if (contenido.length > 0) {
            imprimir(contenido)
        }
        else {
            imprimir(datosAPI.events)
        }
        eventsContainer.innerHTML = eventsHtml;
    }
    mostrar(datosAPI.events);
    
    
    //----------------------------------------------------------------
    const input = document.getElementById("miInputSearch");
    const boton = document.getElementById("miBotonSearch");
    
    
    function buscar() {
        let busqueda = input.value.toLowerCase().trim();
        let resultados = [];
        let categoriasMarcadas = [];
    
        checkboxes.forEach((cb) => {
            if (cb.checked) {
                categoriasMarcadas.push(cb.value);
            }
        });
    
        if (categoriasMarcadas.length > 0) {
            for (let i = 0; i < datosAPI.events.length; i++) {
                const objeto = datosAPI.events[i];
                if (
                    (categoriasMarcadas.length === 0 || categoriasMarcadas.includes(objeto.category)) &&
                    (objeto.name.toLowerCase().trim().includes(busqueda) ||
                        objeto.description.toLowerCase().trim().includes(busqueda))
                ) {
                    resultados.push(objeto);
                }
            }
        } else {
            for (let i = 0; i < datosAPI.events.length; i++) {
                const objeto = datosAPI.events[i];
                if (
                    objeto.name.toLowerCase().trim().includes(busqueda) ||
                    objeto.description.toLowerCase().trim().includes(busqueda)
                ) {
                    resultados.push(objeto);
                }
            }
        }
        if (resultados.length === 0) {
            eventsContainer.innerHTML = "<p>No se encontraron resultados para su búsqueda. Por favor intente de nuevo.</p>";
        } else {
            mostrar(resultados);
    
        }
    }
    
    boton.addEventListener("click", (event) => {
        event.preventDefault();
        buscar();
    });
    
}

iniciar();




// let eventsContainer = document.getElementById('events-container');
// let eventsHtml = '';

// function imprimir(array) {

//     array.forEach((event) => {
//         let eventHtml = '<div class="card event">';
//         eventHtml += '<div class="img-card">' +
//             '<img src = "' + event.image + '" alt = "' + event.name + '" >'
//             + '</div>';

//         eventHtml += '<div class="desc-card">' +
//             '<h3>' + event.name + '</h3>' +
//             '<p>' + event.description + '</p>' +
//             '</div>';

//         eventHtml += '<div class="card-footer">' +
//             '<p>Price: $' + event.price + '</p>' +
//             '<a href="./Details.html?id=' + event._id + '">Ver mas..</a>' +
//             '</div>';
//         eventHtml += '</div>';

//         eventsHtml += eventHtml;
//     });
// }


// let categories = [];

// function filtrarCateg(arr) {
//     arr.forEach(event => {
//         if (!categories.includes(event.category)) {
//             categories.push(event.category);
//         }
//     });
// }
// filtrarCateg(data.events)



// let categoriesDiv = document.querySelector("#categorias");

// function chekCategorias(algo) {
//     algo.forEach(category => {
//         categoriesDiv.innerHTML += `
//     <div class="opciones-form">
//         <input type="checkbox" name="${category}" value="${category}">
//         <label for="${category}">${category}</label>
//     </div>
//     `;

//     })
// };
// chekCategorias(categories)



// const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('change', () => {
//         const checkedCategories = [];
//         checkboxes.forEach((cb) => {
//             if (cb.checked) {
//                 checkedCategories.push(cb.value);
//             }
//         });

//         const filteredObjects = data.events.filter((obj) => {
//             return checkedCategories.includes(obj.category);
//         });

//         mostrar(filteredObjects);
//     });
// });

// function mostrar(contenido) {
//     eventsHtml = '';
//     if (contenido.length > 0) {
//         imprimir(contenido)
//     }
//     else {
//         imprimir(data.events)
//     }
//     eventsContainer.innerHTML = eventsHtml;
// }
// mostrar(data.events);


// //----------------------------------------------------------------
// const input = document.getElementById("miInputSearch");
// const boton = document.getElementById("miBotonSearch");


// function buscar() {
//     let busqueda = input.value.toLowerCase().trim();
//     let resultados = [];
//     let categoriasMarcadas = [];

//     checkboxes.forEach((cb) => {
//         if (cb.checked) {
//             categoriasMarcadas.push(cb.value);
//         }
//     });

//     if (categoriasMarcadas.length > 0) {
//         for (let i = 0; i < data.events.length; i++) {
//             const objeto = data.events[i];
//             if (
//                 (categoriasMarcadas.length === 0 || categoriasMarcadas.includes(objeto.category)) &&
//                 (objeto.name.toLowerCase().trim().includes(busqueda) ||
//                     objeto.description.toLowerCase().trim().includes(busqueda))
//             ) {
//                 resultados.push(objeto);
//             }
//         }
//     } else {
//         for (let i = 0; i < data.events.length; i++) {
//             const objeto = data.events[i];
//             if (
//                 objeto.name.toLowerCase().trim().includes(busqueda) ||
//                 objeto.description.toLowerCase().trim().includes(busqueda)
//             ) {
//                 resultados.push(objeto);
//             }
//         }
//     }
//     if (resultados.length === 0) {
//         eventsContainer.innerHTML = "<p>No se encontraron resultados para su búsqueda. Por favor intente de nuevo.</p>";
//     } else {
//         mostrar(resultados);

//     }
// }

// boton.addEventListener("click", (event) => {
//     event.preventDefault();
//     buscar();
// });


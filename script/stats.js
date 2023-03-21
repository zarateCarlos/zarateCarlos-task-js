let URLapi = "https://mindhub-xj03.onrender.com/api/amazing"
let contenedor = document.querySelector(".contenedor-stats")

async function traer() {
    let response = await fetch(URLapi);
    datosAPI = await response.json();
    
}


async function iniciar() {
    await traer();



    function capacidades(eventos) {
        let capacidad = eventos.map(evento => evento.capacity);


        let maxCapacidad = Math.max(...capacidad);


        let eventoMaxCapacidad = eventos.find(evento => evento.capacity === maxCapacidad);


        let contenido = `${eventoMaxCapacidad.name}: ${eventoMaxCapacidad.capacity}`;

        document.querySelector('.capacidadMaxima').textContent = contenido;


    }
    capacidades(datosAPI.events)




    function mayorPorcentajeAsistencia(eventos) {
        let eventoMayorPorcentaje;
        let porcentajeMayor = 0;

        eventos.forEach(evento => {

            let asistencia = parseInt(evento.assistance);
            let capacidad = parseInt(evento.capacity);


            let porcentaje = (asistencia / capacidad) * 100;


            if (porcentaje > porcentajeMayor) {
                porcentajeMayor = porcentaje;
                eventoMayorPorcentaje = evento;
            }
        });

        let contenido = `${eventoMayorPorcentaje.name}: ${porcentajeMayor.toFixed(2) + '%'}`;

        document.querySelector('.altoporcentaje').textContent = contenido;



    }

    mayorPorcentajeAsistencia(datosAPI.events);





    function menorPorcentajeAsistencia(eventos) {
        let eventoMenorPorcentaje;
        let porcentajeMenor = 100;

        eventos.forEach(evento => {

            let asistencia = parseInt(evento.assistance);
            let capacidad = parseInt(evento.capacity);


            let porcentaje = (asistencia / capacidad) * 100;


            if (porcentaje < porcentajeMenor) {
                porcentajeMenor = porcentaje;
                eventoMenorPorcentaje = evento;
            }

            let contenido = `${eventoMenorPorcentaje.name}: ${porcentajeMenor.toFixed(2) + '%'}`;

            document.querySelector('.bajoPorcentaje').textContent = contenido;

        });

    }

    menorPorcentajeAsistencia(datosAPI.events);


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




    function obtenerInfoCategorias(eventos) {

        const infoCategorias = {};


        eventos.forEach(evento => {
            const categoria = evento.category;
            const precioEntrada = evento.price;
            const asistencia = evento.assistance ?? evento.estimate
                ;
            const ganancias = precioEntrada * asistencia;
            const capacidad = evento.capacity;


            if (!infoCategorias[categoria]) {
                infoCategorias[categoria] = {
                    ganancias: 0,
                    asistencia: 0,
                    capacidad: 0,
                    asistenciaPorcentaje: 0
                };
            }


            infoCategorias[categoria].ganancias += ganancias;
            infoCategorias[categoria].asistencia += asistencia;
            infoCategorias[categoria].capacidad += capacidad;
        });


        Object.keys(infoCategorias).forEach(categoria => {
            const totalAsistencia = infoCategorias[categoria].asistencia;
            const totalCapacidad = infoCategorias[categoria].capacidad;
            infoCategorias[categoria].asistenciaPorcentaje = (totalAsistencia / totalCapacidad) * 100;
        });


        return infoCategorias;
    }


    const resultado = obtenerInfoCategorias(eventosPasados);

    let resultadoFuturo = obtenerInfoCategorias(eventosFuturos)




    function llenarTabla1(infoCategorias) {
        const tbody1 = document.querySelector('#tbody1');
        tbody1.innerHTML = ''; 
        Object.keys(infoCategorias).forEach(categoria => {
            const fila = `
            <tr>
                <td>${categoria}</td>
                <td>${infoCategorias[categoria].ganancias}</td>
                <td>${infoCategorias[categoria].asistenciaPorcentaje.toFixed(2)}%</td>
            </tr>
            `;
            tbody1.innerHTML += fila;
        });
    }
llenarTabla1(resultadoFuturo)


    function llenarTabla2(infoCategorias) {
        const tbody2 = document.querySelector('#tbody2');
        tbody2.innerHTML = ''; 
        Object.keys(infoCategorias).forEach(categoria => {
            const fila = `
            <tr>
                <td>${categoria}</td>
                <td>${infoCategorias[categoria].ganancias}</td>
                <td>${infoCategorias[categoria].asistenciaPorcentaje.toFixed(2)}%</td>
            </tr>
            `;
            tbody2.innerHTML += fila;
        });
    }
llenarTabla2(resultado)



}

iniciar()



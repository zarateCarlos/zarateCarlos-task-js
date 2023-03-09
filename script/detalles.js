let query = location.search


let parametro = new URLSearchParams(query)



const id = parametro.get("id")



let info = data.events.find(evento => evento._id == id)





let contenedor = document.getElementById("card-detalle")

contenedor.innerHTML = `<div class="img-card-detalle">
<img src="${info.image}" alt="${info.name}">
</div>
<div class="desc-card-detalle">
<h3>${info.name}</h3>
<br>
<p>${info.date}</p>
<br>
<p>${info.description}</p>
<br>
<p>Capacidad: ${info.capacity}</p>
<br>
<p>lugar: ${info.place}</p>
<br>
<p>precio: $${info.price}</p>



</div>
`
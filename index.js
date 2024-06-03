// importando la funcion "savePlatillo" desde el archivo firebase.js 
//tambien importamos la otra funcion "getPlatillos"
import { savePlatillo, getPlatillos, onGetPlatillos, deletePlatillos, getPlatillo, updatePlatillo } from './firebase.js';

const platilloForm = document.getElementById('platilloForm');

const platillosList = document.getElementById('platillos-list');  //conteiner

let editStatus = false; //estado de editar, inicialmente se estara en falso
let id = "";

//evento para Ejecutar cuando la pagina cargue
window.addEventListener('DOMContentLoaded', async () => {
    //guardando lo que me devuelve
    onGetPlatillos((querySnapshot) => {
        //Escuchar cambios en la conexion, con la collection platillos, traer cambios cuando ocurra cambios

        let html = '';
        //solicitud de datos
        querySnapshot.forEach(doc => {
            // console.log(doc.data()); //obj javascript
            const platillo = doc.data(); //objeto/dato guardo
            //cada vez que recorramos un dato, emepzamos a añadir
            html += `
            <div>
                <h4>${platillo.nombre}</h4>
                <p>${platillo.precio}</p>
                <p>${platillo.descripcion}</p>
                <p>${platillo.categoria}</p>
                <p>${platillo.ingredientes}</p>

                <button class="btnEliminar" data-id="${doc.id}" >Eliminar</button>
                <button class="btnEditar" data-id="${doc.id}" >Editar</button>
            </div>
            `;
        });

        platillosList.innerHTML = html;

        //Seleccionamos todos los botones con .clase de la lista de platillos
        const btnsEliminar = platillosList.querySelectorAll('.btnEliminar');

        //por cada boton vamos a añadir un escuha al evento click
        btnsEliminar.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                const confirmation = confirm("¿Estás seguro de que quieres eliminar este platillo?");
                if (confirmation) {
                    // console.log(dataset.id);
                    deletePlatillos(dataset.id);
                }
            })
        })

        const btnsEditar = platillosList.querySelectorAll('.btnEditar');
        btnsEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                // console.log(e.target.dataset.id);

                const doc = await getPlatillo(e.target.dataset.id);
                // console.log(doc.data());
                const platillo = doc.data();

                //si existe id traemos los datos y rllenamos al formulario
                platilloForm['nombre'].value = platillo.nombre;
                platilloForm['precio'].value = platillo.precio;
                platilloForm['descripcion'].value = platillo.descripcion;
                platilloForm['categoria'].value = platillo.categoria;
                platilloForm['ingredientes'].value = platillo.ingredientes;

                //cuando se de click cambiamos el estado del edit a true y guardamos el id
                editStatus = true;
                // id = e.target.dataset.id;
                id = doc.id;

                //cambiando valor o estado del boton
                platilloForm['btn-agregar'].innerText = 'ACTUALIZAR';

            })
        })
    });
});

platilloForm.addEventListener('submit', (e) => {
    e.preventDefault(); //refrescar la pagina = no

    const nombre = platilloForm['nombre']
    const precio = platilloForm['precio']
    const descripcion = platilloForm['descripcion']
    const categoria = platilloForm['categoria']
    const ingredientes = platilloForm['ingredientes']

    // console.log(nombre.value, precio.value, descripcion.value, categoria.value, ingredientes.value)

    //! EDITAR campos
    if (!editStatus) { //si no estamos editando guardamos
        savePlatillo(nombre.value, precio.value, descripcion.value, categoria.value, ingredientes.value);
    } else {
        //si si estamops editando entonces actualizar cambios
        updatePlatillo(id, {
            nombre: nombre.value,
            precio: precio.value,
            descripcion: descripcion.value,
            categoria: categoria.value,
            ingredientes: ingredientes.value
        });
        editStatus = false;
        platilloForm['btn-agregar'].innerText = 'AGREGAR';
    }

    //una vez se guarde el platillo se debe limpiar el formulario
    platilloForm.reset();
})
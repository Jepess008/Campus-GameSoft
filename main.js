/* Inicio manipulacion modales */
const btnAbrirModal1= document.querySelector("#btn-abrir-modal-1");
const btnCerrarModal1= document.querySelector("#btn-cerrar-modal-1");
const modal1= document.querySelector("#modal-gestUser");
const btnAbrirModal2= document.querySelector("#btn-abrir-modal-2");
const btnCerrarModal2= document.querySelector("#btn-cerrar-modal-2");
const modal2= document.querySelector("#modal-signUp");
const btnAbrirModal3= document.querySelector("#btn-abrir-modal-3");
const btnCerrarModal3= document.querySelector("#btn-cerrar-modal-3");
const modal3= document.querySelector("#modal-gestVideoGame");
const btnCerrarModal4= document.querySelector("#btn-cerrar-modal-4");
const modal4= document.querySelector("#modal-compra");


btnAbrirModal1.addEventListener('click',()=>{
    modal1.showModal();
})

btnCerrarModal1.addEventListener('click', ()=>{
    modal1.close();
})

btnAbrirModal2.addEventListener('click',()=>{
    modal2.showModal();
})

btnCerrarModal2.addEventListener('click', ()=>{
    modal2.close();
})

btnAbrirModal3.addEventListener('click',()=>{
    modal3.showModal();
})

btnCerrarModal3.addEventListener('click', ()=>{
    modal3.close();
})

btnCerrarModal4.addEventListener('click',()=>{
    modal4.close();
})



/* Fin de manipulacion modales */

/* Inicio  Gestion de Usuario */
const btnregistrar= document.getElementById("registro");
const inputId= document.getElementById("id");
const inputName= document.getElementById("names");
const inputLastname=document.getElementById("lastname");
const inputPhone= document.getElementById("phones");
const inputEmail= document.getElementById("emails");
const inputDate= document.getElementById("date");
const inputNacionalidad= document.getElementById("nacionalidad");
const form= document.getElementById('form');
const btnModificarUser= document.getElementById('modificarUser');
const btnDelUser= document.getElementById('delUser');
const btnOrdenarPorId= document.getElementById('OrdenarPorId');
const btnOrdenarPorNombre=document.getElementById('OrdenarPorName');
const btnOrdenarPorPuntos=document.getElementById('OrdenarPorPoints');
let usuarios=[];

function AgregarUsuario(){

    form.addEventListener('submit', e=>{
        e.preventDefault()

        let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        
        if(inputId.value.length<6){
            alert("Documento muy corto");         
        }
        if(inputName.value.length<3){
            alert("Nombre muy corto");            
        }
        if(inputLastname.value.length<3){
            alert("Apellido muy corto");

        }
        if(!regexEmail.test(inputEmail.value)){
            alert("Email Invalido");
            
        }
        if(inputPhone.value.length<10 || inputPhone.value.length>10){
            alert("Celular no cumple con las caracteristicas")
            
        }
        if(inputNacionalidad.value.length<4){
            alert("Nacionalidad muy corta");

        }
        
        else{


            /* Falta crear una validacion que me permita impedir que se registre un usuario ya registrado */
            let usuario={
            id: inputId.value,
            name: inputName.value,
            lastname: inputLastname.value,
            email:inputEmail.value,
            phone:inputPhone.value,
            date:inputDate.value,
            nacionality:inputNacionalidad.value,
            points:0

            }

            usuarios.push(usuario);
            console.log(usuarios);
            inputId.value="";
            inputName.value="";
            inputLastname.value="";
            inputEmail.value="";
            inputPhone.value="";
            inputDate.value="";
            inputNacionalidad.value="";
            ActualizarUsuario();
            guardarUsuariosLocalStorage();
            
        };
    });

};

    //Funcion para Ingresar los usuarios a la lista
function ActualizarUsuario(){
    const tableUsuarios= document.getElementById('listUsers');
    tableUsuarios.innerHTML=`
        <tr>
            <th>Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Fecha de Nacimiento</th>
            <th>Nacionalidad</th>
            <th>Puntos</th>
        </tr>
    
    `;
    usuarios.forEach(usuario=>{
        tableUsuarios.innerHTML+=`
            <tr>
                <th>${usuario.id}</th>
                <th>${usuario.name}</th>
                <th>${usuario.lastname}</th>
                <th>${usuario.email}</th>
                <th>${usuario.phone}</th>
                <th>${usuario.date}</th>
                <th>${usuario.nacionality}</th>
                <th>${usuario.points}</th>
            </tr>
        
        `;
    });
}

    //Funcion para Modificar Usuario
function ModificarUsuario() {
    let idMod = prompt("Ingrese el ID a modificar: ");
    const index = usuarios.findIndex(usuario => usuario.id === idMod);

    if (index !== -1) {
        // Menú de opciones para elegir qué campo modificar
        let opcion = prompt(
            "Seleccione el campo a modificar:\n" +
            "1. Nombre\n" +
            "2. Apellido\n" +
            "3. Email\n" +
            "4. Teléfono\n" +
            "5. Nacionalidad"
        );

        // Validar la opción seleccionada
        if (opcion >= '1' && opcion <= '5') {
            // Solicitar el nuevo valor para el campo seleccionado
            let nuevoValor = prompt(`Ingrese el nuevo valor para ${obtenerNombreCampo1(opcion)}:`);

            // Modificar el campo correspondiente del usuario
            usuarios[index][obtenerCampoPorOpcion1(opcion)] = nuevoValor;

            // Actualizar la interfaz y guardar en el localStorage
            ActualizarUsuario();
            guardarUsuariosLocalStorage();
        }
        else {
            alert("Opción no válida");
        }
    }
        else {
        alert("Usuario no encontrado");
    }
}

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerNombreCampo1(opcion) {
    switch (opcion) {
        case '1': return 'Nombre';
        case '2': return 'Apellido';
        case '3': return 'Email';
        case '4': return 'Teléfono';
        case '5': return 'Nacionalidad';
        default: return '';
    }
}

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerCampoPorOpcion1(opcion) {
    switch (opcion) {
        case '1': return 'name';
        case '2': return 'lastname';
        case '3': return 'email';
        case '4': return 'phone';
        case '5': return 'nacionality';
        default: return '';
    }
}
    //Funcion para Eliminar Usuario
function EliminarUsuario() {
    let idEliminar = prompt("Ingrese el ID del usuario a eliminar: ");
    const index = usuarios.findIndex(usuario => usuario.id === idEliminar);

    if (index !== -1) {
       
        let confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${idEliminar}?`);

        if (confirmacion) {
            usuarios.splice(index, 1);
            ActualizarUsuario();
            guardarUsuariosLocalStorage();
            alert("Usuario eliminado exitosamente.");
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("Usuario no encontrado");
    }
}

    //Funciones para Ordenar Usuarios
function OrdenarPorId() {
    usuarios.sort((a, b) => a.id.localeCompare(b.id));
    ActualizarUsuario();
    
};

function OrdenarPorName() {
    usuarios.sort((a, b) => a.name.localeCompare(b.name));
    ActualizarUsuario();
    
};

function OrdenarPorPoints() {
    usuarios.sort((a, b) => a.points.localeCompare(b.points));
    ActualizarUsuario();
    
};

//Funcion para guardar en el LocalStorage

function guardarUsuariosLocalStorage(){
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

//Funcion recuperar los datos cuando se inicie la pagina
window.addEventListener('load', function(){
    const dataUsuarios= localStorage.getItem('usuarios');

    if(dataUsuarios){
        usuarios=JSON.parse(dataUsuarios);

        ActualizarUsuario();
    }
});


btnregistrar.addEventListener('click', AgregarUsuario);
btnModificarUser.addEventListener('click', ModificarUsuario);
btnDelUser.addEventListener('click', EliminarUsuario);
btnOrdenarPorId.addEventListener('click', OrdenarPorId);
btnOrdenarPorNombre.addEventListener('click', OrdenarPorName);
btnOrdenarPorPuntos.addEventListener('click', OrdenarPorPoints);
/* Fin Gestion de Usuario */

/* Inicio Gestion de VideoJuegos*/
const btnAgregarJuego= document.getElementById('ingresar');
const divGames= document.getElementById('games');
let inputPortada= document.getElementById('portada');
let inputNameGame= document.getElementById('nameGame');
let selectTematica= document.getElementById('tematica');
let inputLicencia= document.getElementById('valor');
let inputPuntos= document.getElementById('points');
const btnModificarGame= document.getElementById('modificarGame');
const btnDelGame= document.getElementById('delGame');
const btnOrdenarPorPrecio=document.getElementById('OrdenarPorLicenciaGame');
const btnOrdenarPorNombreGame=document.getElementById('OrdenarPorNameGame');
const btnOrdenarPorPuntosGame=document.getElementById('OrdenarPorPointsGame');

let games=[];

    //Funcion para agregar juegos
function AgregarGame(){
    if(inputPortada.value =="" || inputNameGame.value=="" || selectTematica.value=="" || inputLicencia.value=="" || inputPuntos.value==""){
        alert("Campos vacios, complete los campos solicitados")
    }

    else{
        function CodigoGame(){
            return Math.random().toString(36).substr(2,9);
        };

        let game={
            idGame: CodigoGame(),
            portadaGame: inputPortada.value,
            nameGame: inputNameGame.value,
            tematicaGame: selectTematica.value,
            licencia: inputLicencia.value,
            puntos: inputPuntos.value
        };

        games.push(game);
        console.log(games);
        inputPortada.value="";
        inputNameGame.value="";
        selectTematica.value="";
        inputLicencia.value="";
        inputPuntos.value="";

        ActualizarVideoGame();
        guardarJuegosLocalStorage();
    }

    
};


function ActualizarVideoGame(){
    divGames.innerHTML="";
    var cont=0;
    games.forEach(function(x){
        const ficha= document.createElement('div');
        ficha.classList= 'ficha';
        divGames.appendChild(ficha);
        const img= document.createElement('img');
        img.src=x.portadaGame;
        ficha.appendChild(img);
        const titulo= document.createElement('h4');
        titulo.textContent=x.nameGame;
        ficha.appendChild(titulo);
        const tema= document.createElement('p');
        tema.textContent=x.tematicaGame;
        ficha.appendChild(tema);
        const otorga=document.createElement('p');
        otorga.textContent='Puntos:   '+ x.puntos;
        ficha.appendChild(otorga);
        const precio= document.createElement('p');
        precio.textContent= 'Valor:      $  ' + x.licencia;
        ficha.appendChild(precio);
        const idJuego= document.createElement('p');
        idJuego.textContent='Codigo: ' +x.idGame;
        ficha.appendChild(idJuego);
        let button= document.createElement('button');
        button.id='btn-comprar';
        button.classList='btn-compra';
        button.textContent= 'Comprar';
        button.addEventListener('click',function(){
            modal4.showModal();
        })

        ficha.appendChild(button);
        cont++;

    });

    guardarJuegosLocalStorage();
}

function guardarJuegosLocalStorage(){
    localStorage.setItem('games' , JSON.stringify(games));

};

window.addEventListener('load', function(){
    const juegosGuardados= localStorage.getItem('games');

    if(juegosGuardados){
        games=JSON.parse(juegosGuardados);

        ActualizarVideoGame();
    }
});


    //Funcion para Modificar datos del Juego
function ModificarGame() {
    let idModGame = prompt("Ingrese el ID a modificar: ");
    const index = games.findIndex(game => game.idGame === idModGame);

    if (index !== -1) {
        // Menú de opciones para elegir qué campo modificar
        let opcion = prompt(
            "Seleccione el campo a modificar:\n" +
            "1. Nombre\n" +
            "2. Tematica\n" +
            "3. Licencia\n" +
            "4. Puntos\n" +
            "5. Portada"
        );

        // Validar la opción seleccionada
        if (opcion >= '1' && opcion <= '5') {
            // Solicitar el nuevo valor para el campo seleccionado
            let nuevoValor = prompt(`Ingrese el nuevo valor para ${obtenerNombreCampo(opcion)}:`);

            // Modificar el campo correspondiente del usuario
            games[index][obtenerCampoPorOpcion(opcion)] = nuevoValor;

            // Actualizar la interfaz y guardar en el localStorage
            ActualizarVideoGame();
            guardarJuegosLocalStorage();
        }
        else {
            alert("Opción no válida");
        }
    }

    else {
        alert("Juego no encontrado");
    }
}

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerNombreCampo(opcion) {
    switch (opcion) {
        case '1': return 'Nombre';
        case '2': return 'Tematica';
        case '3': return 'Licencia';
        case '4': return 'Puntos';
        case '5': return 'Portada';
        default: return '';
    }
}

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerCampoPorOpcion(opcion) {
    switch (opcion) {
        case '1': return 'nameGame';
        case '2': return 'tematicaGame';
        case '3': return 'licencia';
        case '4': return 'puntos';
        case '5': return 'portadaGame';
        default: return '';
    }
}

function EliminarGame() {
    let idEliminarGame = prompt("Ingrese el ID del Juego a eliminar: ");
    const index = games.findIndex(game => game.idGame === idEliminarGame);

    if (index !== -1) {
       
        let confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${idEliminarGame}?`);

        if (confirmacion) {
            games.splice(index, 1);
            ActualizarVideoGame();
            guardarJuegosLocalStorage();
            alert("Juego eliminado exitosamente.");
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("Juego no encontrado");
    }
};

    //Funciones para Ordenar Games
    function OrdenarPorLicencia() {
        games.sort((a, b) => a.licencia.localeCompare(b.licencia));
        ActualizarVideoGame();
        
    };
    
    function OrdenarPorNameGame() {
        games.sort((a, b) => a.nameGame.localeCompare(b.nameGame));
        ActualizarVideoGame();
        
    };
    
    function OrdenarPorPoints() {
        games.sort((a, b) => a.puntos.localeCompare(b.puntos));
        ActualizarVideoGame();
        
    };


console.log(games);
console.log(usuarios);
btnAgregarJuego.addEventListener('click', AgregarGame);
btnModificarGame.addEventListener('click', ModificarGame);
btnDelGame.addEventListener('click', EliminarGame);
btnOrdenarPorNombreGame.addEventListener('click', OrdenarPorNameGame);
btnOrdenarPorPuntosGame.addEventListener('click', OrdenarPorPoints);
btnOrdenarPorPrecio.addEventListener('click',OrdenarPorLicencia);

/* Fin Gestion de VideoJuegos */

/* Inicio Gestion de Compras*/

const btnCotizar= document.getElementById('cotizar');
const inputIdCliente= document.getElementById('idCliente');
const inputIdJuego= document.getElementById('idJuego');
const divfacturacion= document.getElementById("facturacion");
const btnFinalizarCompra= document.getElementById("recibo");


function Compra(){
    let idBuscarCliente = inputIdCliente.value;
    const index = usuarios.findIndex(usuario => usuario.id === idBuscarCliente);
    let idBuscarJuego= inputIdJuego.value;
    const index2 = games.findIndex(game => game.idGame === idBuscarJuego);

    if (index !== -1 && index2 !==-1)  {        

        const modal5= document.querySelector("#modal-factura");
        
        divfacturacion.innerHTML="";
        usuarios.forEach(function(x){
            if(x.id==idBuscarCliente){
                const documento= document.createElement('p');
                documento.textContent="Documento: " + x.id;
                divfacturacion.appendChild(documento);
                const nombre= document.createElement('p');
                nombre.textContent="Nombre: " + x.name;
                divfacturacion.appendChild(nombre);
                const apellido= document.createElement('p');
                apellido.textContent= "Apellido: " + x.lastname;
                divfacturacion.appendChild(apellido);
                const correo= document.createElement('p');
                correo.textContent="Correo: " + x.email;
                divfacturacion.appendChild(correo);
                games.forEach(function(y){
                    if(y.idGame==idBuscarJuego){
                        const juego=document.createElement('p');
                        juego.textContent= "Id del Juego: " + y.idGame;
                        divfacturacion.appendChild(juego);
                        const nameGame= document.createElement('p');
                        nameGame.textContent="Nombre del Juego: " + y.nameGame;
                        divfacturacion.appendChild(nameGame);
                        const point= document.createElement('p');
                        point.textContent="Puntos que otorga: " +y.puntos;
                        divfacturacion.appendChild(point);
                        const costo= document.createElement('p');
                        costo.textContent= "El valor de la licencia es: " + "$" +" " + y.licencia;
                        divfacturacion.appendChild(costo);
                        const impuesto= 0.04;
                        let valorImpuesto= document.createElement('p');
                        valorImpuesto.textContent= "El valor del Impuesto es: " + "$" +" " + y.licencia*impuesto;
                        divfacturacion.appendChild(valorImpuesto);
                        const iva= 0.16
                        const valorIva= document.createElement('p');
                        valorIva.textContent="El valor del Iva es: " + "$" +" " + (parseInt(y.licencia )+ parseInt(y.licencia*impuesto))*iva;
                        divfacturacion.appendChild(valorIva);
                        const total= document.createElement('p');
                        total.textContent="El valor total de su compra es: "  + "$" +" " + ((((parseInt(y.licencia )+ parseInt(y.licencia*impuesto))*iva)+ parseInt(y.licencia)) + parseInt(y.licencia*impuesto ));
                        divfacturacion.appendChild(total)
                        x.points=x.points+ parseInt(y.puntos)/2;
                        ActualizarUsuario();
                        guardarUsuariosLocalStorage();

                    }
                })
                
            }
        })
        
        btnCotizar.addEventListener('click',()=>{
            modal5.showModal();
        })

        btnFinalizarCompra.addEventListener('click',()=>{
            modal5.close();
        })
    }

    else if( index ==-1){
        alert("No se Encontro el Usuario en la base de datos, por favor registrelo para poder comprar")
    }

    else{
        alert("No se encontro el id del Juego, verifique y vuelva a intentar")
    }
};

btnCotizar.addEventListener('click', Compra);


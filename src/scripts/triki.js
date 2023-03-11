/*Acceder a un elemento dentro del documento html que llame a este codigo*/ 
const triki=document.getElementById('triki');

/*la siguiente matriz contiene los valores por defecto del tablero de juego*/
let posiciones=[
    ['','',''],
    ['','',''],
    ['','','']
];


/*esta variable define quien debe jugar luego*/
let turno=false;
/*esta variable es un contador que sirve para saber cuando se produce un empate*/
let contador_turnos=0;
/*Estas variables cuantan cuantos intentos hizo cada jugador*/
let intentos_jugador1=0;
let intentos_jugador2=0;

/*accedemos a la ventana y verificamos que el contenido del dominio cargue correctamente*/
window.addEventListener('DOMContentLoaded',()=>{
   triki.innerHTML=dibujarTablero(posiciones);
   const casillas=document.querySelectorAll('.columna');
   casillas.forEach((casilla)=>{
    casilla.addEventListener('click',()=>{
        let fila=casilla.getAttribute('fila');
        let columna=casilla.getAttribute('columna');
        turno=cambioDeTurno(turno);



        
    })
   })
});

/*esta funcion dibuja el tablero*/
function dibujarTablero(arreglo){

    /*el tablero inicia como string porque vamos a inyectar etiquetas html al cargar la pagina*/
    let tablero='';

    /*estas dos variables le dicen que posicion tiene cada casilla del tablero*/
    let n_fila=0;
    let n_columna=0;

    /*recorre el tablero dibujandolo y poniendo en cada casilla el valor almacenado en cada posicion*/ 
    arreglo.map((fila)=>{
        tablero+=`<div class="fila">`;
        fila.map((columna)=>{
            tablero+=`<button class="columna" 
                            fila="${n_fila}" 
                            columna="${n_columna}">
                            ${columna}
                    </button>`
            n_columna++;
        })
        tablero+=`</div>`
        n_fila++;
        n_columna=0
    })

    return tablero;
}

/*cambia el turno*/ 
function cambioDeTurno(turno){
    return !turno;
}

/*muestra una respuesta segun corresponda el turno*/


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

/*almacena el resultado del partido*/ 
let resultado='';

/*accedemos a la ventana y verificamos que el contenido del dominio cargue correctamente*/
window.addEventListener('DOMContentLoaded',()=>{
    triki.innerHTML=dibujarTablero(posiciones);
    const casillas=document.querySelectorAll('.columna');
    

    casillas.forEach((casilla)=>{
        casilla.addEventListener('click',()=>{
        
            /*posición de la casilla*/
            let fila=casilla.getAttribute('fila');
            let columna=casilla.getAttribute('columna');

            /*Ficha en la casilla, solo puede tomar el valor x y el valor o*/
            let simbolo=selecionarCasilla(posiciones[fila][columna],turno);

            /*dibuja el simbolo en la casilla*/
            casilla.value=simbolo;

            /*turno actual*/
            turno=cambioDeTurno(turno);
            if(simbolo==posiciones[fila][columna]){
                /*repite el turno*/
                turno=cambioDeTurno(turno);
            }else{
                contador_turnos++;
                posiciones[fila][columna]=simbolo;
                if(simbolo=='x'){
                    intentos_jugador1++;
                }else{
                    intentos_jugador2++;
                }
                resultado=verificarResultado(contador_turnos,resultado,posiciones);
                if(resultado!=''){
                    
                    if(resultado=='victoria'){
                        if(turno){
                            alertaVictoria(resultado,+intentos_jugador1,'Jugador 1');
                        }else{
                            alertaVictoria(resultado,+intentos_jugador2,'Jugador 2');
                        }
                    }
                    if(resultado=='empate'){
                       alertaEmpate(resultado,intentos_jugador1,intentos_jugador2);
                    }
                }
            } 

        })

   })
  
});

/*recarga la ventana*/
function reiniciar(){
    window.location.reload();
}

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
            tablero+=`<input type="button" 
                            class="columna" 
                            fila="${n_fila}" 
                            columna="${n_columna}"
                            value="${columna}">
                            `
            n_columna++;
        })
        tablero+=`</div>`
        n_fila++;
        n_columna=0
    })

    return tablero;
}

/*esta funcion muestra una alerta con el resultado cuando los jugadores empatan*/ 
function alertaEmpate(resultado,jugador_1,jugador_2){
    alert(resultado+'\n Jugador 1: '+jugador_1+' Intentos \n Jugador 2: '+jugador_2);
    reiniciar();
}
/*esta funcion muestra una alerta con el resultado cuando un jugador gana*/ 
function alertaVictoria(resultado,intentos,jugador) {
    alert(resultado+' '+jugador+'\n intentos: '+intentos);
    reiniciar();
}

/*esta funcion dibuja el resultado cuando uno de los jugadores gana*/

/*cambia el turno*/ 
function cambioDeTurno(turno){
    return !turno;
}

/*muestra una respuesta segun corresponda el turno*/
function selecionarCasilla(simbolo,turno){
    if(simbolo==''){
        /*x para player 1 y o para player 2*/
        if(!turno){
            return 'x';
        }else{
            return 'o';
        }
    }else{
        alert('Casilla ocupada vuelva a elegir');
        return simbolo;
    }
}

/*verifica si los jugadores empataron*/
function verificarResultado(contador_turnos,resultado,arreglo){
    if(contador_turnos==9&&resultado!='victoria'){
        return 'empate'
    }else{
        resultado=verificarFilas(arreglo);
        if(resultado=='victoria'){
            return resultado;
        }
        resultado=verificarColumnas(arreglo);
        if(resultado=='victoria'){
            return resultado;
        }
        resultado=verificarDiagonal(arreglo);
        if(resultado=='victoria'){
            return resultado;
        }
        resultado=verificarDiagonalInversa(arreglo);
        if(resultado=='victoria'){
            return resultado;
        }
    }
    return '';
}

/*verifica si el jugador actual puso tres laterales seguidos*/
function verificarFilas(arreglo){
    /* guarda el valor de la posición anterior*/
    let anterior='';

    /*cuenta cuantas laterales coloco un mismo jugador*/
    let contador_lateral=0;

    /*almacena el simbolo que se esta verificando*/
    let simbolo='';

    for (let fila = 0; fila < arreglo.length; fila++) {
        
        for (let columna = 0; columna < arreglo.length; columna++) {
            
            simbolo=arreglo[fila][columna];

            if (columna==0) {
                if (simbolo!='') {
                    anterior=simbolo;
                    contador_lateral++;
                }
            }else{
                if (simbolo!='') {
                    
                    if(anterior==simbolo){
                        contador_lateral++;
                    }else{
                        contador_lateral=0;
                    }
                    
                }
            }
            if(contador_lateral==3){
                return 'victoria';
            } 
        }
       contador_lateral=0;
    }
    return '';
}

/*verifica si el jugador actual puso 3 verticales seguidos*/ 
function verificarColumnas(arreglo) {
        /* guarda el valor de la posición anterior*/
        let anterior='';

        /*cuenta cuantas verticales coloco un mismo jugador*/
        let contador_vertical=0;
    
        /*almacena el simbolo que se esta verificando*/
        let simbolo='';
    
        for (let columna = 0; columna < arreglo.length; columna++) {
            
            for (let fila = 0; fila < arreglo.length; fila++) {
                
                simbolo=arreglo[fila][columna];
    
                if (fila==0) {
                    if (simbolo!='') {
                        anterior=simbolo;
                        contador_vertical++;
                    }
                }else{
                    if (simbolo!='') {
                        
                        if(anterior==simbolo){
                            contador_vertical++;
                        }else{
                            contador_vertical=0;
                        }
                        
                    }
                }
                if(contador_vertical==3){
                    return 'victoria';
                } 
            }
            contador_vertical=0;
        }
        return '';
}

/*verificar diagonal superior izquierda a inferior derecha*/ 
function verificarDiagonal(arreglo) {
    /* guarda el valor de la posición anterior*/
    let anterior='';

    /*cuenta cuantas diagonales coloco un mismo jugador*/
    let contador_diagonal=0;
    
    /*almacena el simbolo que se esta verificando*/
    let simbolo='';

    for (let posicion = 0; posicion < arreglo.length; posicion++) {
        
        simbolo=arreglo[posicion][posicion];
        if(posicion==0){
            if(simbolo!=''){
                anterior=simbolo;
                contador_diagonal++;
            }
        }else{
            if(simbolo!=''){
                if(simbolo==anterior){
                    contador_diagonal++;
                }else{
                    contador_diagonal=0;
                }
            }
        }
        if(contador_diagonal==3){
            return 'victoria';
        }
    }
    return '';

}

/*verificar diagonal superior derecha a inferior izquierda*/ 
function verificarDiagonalInversa(arreglo){
    /* guarda el valor de la posición anterior*/
    let anterior='';

    /*cuenta cuantas diagonales coloco un mismo jugador*/
    let contador_diagonal=0;
    
    /*almacena el simbolo que se esta verificando*/
    let simbolo='';

    /*almacena el tamaño del arreglo*/ 
    let tamaño=arreglo.length;

    /*se mueve en la direccion contraria a posicion*/ 
    let posicion_inversa=0;

    for (let posicion = tamaño-1; posicion>=0; posicion--) {
        
        simbolo=arreglo[posicion_inversa][posicion];
       
        if(posicion_inversa==0){
            if(simbolo!=''){
                anterior=simbolo;
                contador_diagonal++;
            }
        }else{
            if(simbolo!=''){
                if(simbolo==anterior){
                    contador_diagonal++;
                }else{
                    contador_diagonal=0;
                }
            }
        }
        if (contador_diagonal==3) {
            return 'victoria';
        }
        posicion_inversa++;   
    }
    return '';
}
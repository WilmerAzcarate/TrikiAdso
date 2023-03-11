const triki=document.getElementById('triki');

let positions=[
    ['white','white','white'],
    ['white','white','white'],
    ['white','white','white']
];

let turn=false;
let cTurnos=0;
let IntentosRojo=0;
let IntentosAzul=0;

window.addEventListener('DOMContentLoaded',()=>{
   triki.innerHTML=draw(positions);
   const btn_col=triki.querySelectorAll('.col');
   btn_col.forEach((btn)=>{
    btn.addEventListener('click',()=>{

        let row=btn.getAttribute('fila');
        let col=btn.getAttribute('columna');
        turn=setTurn(turn);

        if(color=='white'){
           color=positions[row][col];
        }
        color=chosePosition(color,turn);
        if(color==positions[row][col]){
            turn=setTurn(turn);
            if(cTurnos>0){
                cTurnos--;
            }
        }else{
            cTurnos++;
            positions[row][col]=color;
            if(color=='red'){
                IntentosRojo++;
            }else if(color=='blue'){
                IntentosAzul++;
            }
            btn.setAttribute('style',`background-color: ${positions[row][col]};`);
            if(cTurnos==9){
                alert('Empate entre Blue y Red');
            }else if (checkRows(positions)!=undefined) {
                if(color=='red'){
                    alert(checkRows(positions)+' para '+color+' intentos: '+IntentosRojo);
                }else if(color=='blue'){
                    alert(checkRows(positions)+' para '+color+' intentos: '+IntentosRojo);
                }
            }else if (checkCols(positions)!=undefined) {
                if(color=='red'){
                    alert(checkCols(positions)+' para '+color+' intentos: '+IntentosRojo);
                }else if(color=='blue'){
                    alert(checkCols(positions)+' para '+color+' intentos: '+IntentosRojo);
                }
            }else if(diagonal(positions)!=undefined){
                if(color=='red'){
                    alert(diagonal(positions)+' para '+color+' intentos: '+IntentosRojo);
                }else if(color=='blue'){
                    alert(diagonal(positions)+' para '+color+' intentos: '+IntentosRojo);
                }
            }else if(diagonalInversa(positions)!=undefined){
                if(color=='red'){
                    alert(diagonalInversa(positions)+' para '+color+' intentos: '+IntentosRojo);
                }else if(color=='blue'){
                    alert(diagonalInversa(positions)+' para '+color+' intentos: '+IntentosRojo);
                }
            }
            
        }
    })
   });
});

function draw(array){
    let drawed='';
    let fila=0;
    let columna=0;
    array.map(function(row){
        drawed+='<div class="row">';
        row.map(function(col){
            drawed+=`<button class="col" fila='${fila}' columna='${columna}' background-color='${col}'></button>`;
            columna++;
        });
        drawed+='</div>'
        fila++;
        columna=0;
    });
    return drawed;
}

function setTurn(turn){
    return !turn;
}

function chosePosition(color,turn){
    if (color=='white') {
        if (turn) {
            return 'red';
        } else {
            return 'blue';
        }
    } else {
        alert('Casilla ocupada,vuelva a elegir');
        return color;
    }
}

function checkRows(array){

    let before='white';
    let count=0;
    let color='white';

    for (let row = 0; row < array.length; row++) {
        
        for (let col = 0; col < array.length; col++) {
            
            color=array[row][col];
            if (col==0) {
                
                if (color!='white') {
                    
                    before=color;
                    count++;

                }

            } else {

                if (color!='white') {
                    if (before==color) {
                    
                        count++;
    
                    } else {
                        
                        count=0;
    
                    }
                }
                
            }
            if(count==3){
                return 'victoria';
            }
        
        }
        count=0;
        
    }
}

function checkCols(array){
    
    let before='white';
    let count=0;
    let color='white';

    for (let col = 0; col < array.length; col++) {
        
        for (let row = 0; row < array.length; row++) {
            
            color=array[row][col];
            if (row==0) {
                
                if (color!='white') {
                    
                    before=color;
                    count++;

                }

            } else {

                if (color!='white') {
                    if (before==color) {
                    
                        count++;
    
                    } else {
                        
                        count=0;
    
                    }
                }
                
            }
            if(count==3){
                return 'victoria';
            }    
        } 
        count=0;
    }
    

}

function diagonal(array){
    let before='white';
    let count=0;
    let color='white';
    for (let position = 0; position < array.length; position++) {
        
        color=array[position][position];
        if (position==0) {
            
            if(color!='white'){
                before=color;
                count++
            }

        } else {

            if(color!='white'){

                if (color==before) {

                    count++;
                    
                } else {

                    count=0;
                    
                }

            }
            
        }
        if (count==3) {
            return 'victoria';
        }
        
    }
}

function diagonalInversa(array){
    let color='white';
    let inversa=0;
    let tamaño=array.length;
    let count=0;
    let before='white';

    for (let position = tamaño-1; position>=0; position--) {
        
        color=array[inversa][position];
        if (inversa==0) {
            
            if(color!='white'){
                before=color;
                count++
            }

        } else {

            if(color!='white'){

                if (color==before) {

                    count++;
                    
                } else {

                    count=0;
                    
                }

            }
            
        }
        if (count==3) {
            return 'victoria';
        }
        inversa++;

    }
}
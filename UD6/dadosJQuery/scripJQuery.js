"use strict";
let partida;
//Nos aseguramos de que se cargan todos los elementos del DOM
class Juego{
    dados=[];
    puntos;
    cuenta=0;
    inicio;
    dado;
    constructor(){
        this.dados=[];
        this.puntos=0;
        this.cuenta=0;
        this.inicio=false;
        //Puede tomar 3 posibles valores: 2 (los dos dados están habilitados), 1/0 el dado que queda habilitado.
        this.dado=2;
    }
};

document.addEventListener("DOMContentLoaded",()=>{
    $(".comenzar").on("click",iniciarJuego);
    $(".reiniciar").on("click",reiniciar);
})

const iniciarJuego=()=>{
    partida=new Juego();
    partida.inicio=true;
    prepararPantalla();
    cargarDados();
    $(".comenzar").attr("disabled","true");
}

const prepararPantalla=()=>{
    //Se crea la etiqueta y la caja de texto para mostrar los puntos
    $("#panel-numDados").append("<label>Puntos</label>").append("<input id=txtPuntos></input>");
    //Se les añade la clase classpunt a estos elementos.
    //Se lo añado ahora que el panel aún no tiene más descendiente
    $("#txtPuntos").attr("value","0");
    $("#panel-numDados *").addClass("claspunt");
    //Creamos la tabla y una capa para los botones de LANZAR y PLANTARSE
    $("#panel-numDados").append("<table></table>").append("<div></div>");
    $("#panel-numDados").find("table").append("<tr></tr>");
    $("#panel-numDados").find("table>tr").append("<td></td>").append("<td></td>");
    //Creamos una capa donde se va a crear el botón de Lanzar y posteriormente
    //el de Plantarse
    $("#panel-numDados").find("div").attr("id","capaBoton").append("<input></input>");
    //se busca el input que es descendiente directo del div que está dentro del panel, o sea,
    //el botón Lanzar y le configuro varios atributos.
    $("#panel-numDados").find("div>input").attr("id","btnJugar").attr("type","button").attr("value","Lanzar");
    $("#btnJugar").addClass("btn btn-warning btn-lg").on("click",lanzarDado);
};

const cargarDados=()=>{
    for (let index = 0; index < 6; index++) {
        partida.dados[index]=`assets/imagenes/dado${index+1}.png`;
        console.log(partida.dados[index]);
    }
};

const lanzarDado=(dado)=>{
    //Elegimos aleatoriamente un número entre 0 y 5 para lanzar el dado
    let tirada=0;
    if (partida.dado==2){//Los dos dados están activos
        console.log("Estoy lanzando los dos dados");
        for (let i = 0; i < 2; i++) {
            let num=Math.round(Math.random()*5);
            //console.log(`${partida.dados[num]}`);

            $("td:eq("+i+")").empty();
            $("td:eq("+i+")").append("<img>");
            $("td:eq("+i+")").find("img").attr("src",`${partida.dados[num]}`).attr("id",i);
            tirada+=num+1;
        }
        partida.puntos+=tirada;
        $("#txtPuntos").attr("value",partida.puntos);
    }else{//
        console.log("Dado activo "+partida.dado);
        console.log("Solo lanzo un dado");
        let num=Math.round(Math.random()*5);
        console.log(`sale el dado ${num+1}`);
        console.log(`${partida.dados[num]}`);

        $("td:eq("+partida.dado+")").empty();
        $("td:eq("+partida.dado+")").append("<img>");
        $("td:eq("+partida.dado+")").find("img").attr("src",`${partida.dados[num]}`).attr("id",partida.dado);
        tirada+=num+1;
        partida.puntos+=tirada;
        $("#txtPuntos").attr("value",partida.puntos);
    }
    comprobarPuntos();
};

const comprobarPuntos=(valor)=>{
    if (partida.puntos>=15 && partida.puntos<21){
        mensaje(`Ha conseguido ${partida.puntos} puntos. Puede plantarse y sumar esa puntuación en su cuenta o seguir jugando deshabilitando un dado`,"warning");
        //Se muestra el mensaje
        console.log("Ha conseguido 17 puntos. Puede plantarse y sumar esa puntuación en su cuenta o seguir jugando deshabilitando un dado");
        //Se crea el botón para plantarse
        console.log($("#btnPlantarse"));
        if($("#btnPlantarse").length==0){
            $("#capaBoton").append("<input>");
            $("#capaBoton").find("input:eq(1)").attr("value","Plantarse").attr("id","btnPlantarse").attr("type","button");
            $("#capaBoton").find("input:eq(1)").addClass("btn btn-lg");
            $("#btnPlantarse").on("click",plantarse);
        }
        if(partida.dado==2){
            $("#btnJugar").attr("disabled","disabled");
            $("td>img").on("click",desactivarDado);
        }
       
    }else if (partida.puntos==21){
        mensaje("¡¡Enhorabuena!! Ha conseguido 21 puntos y ha ganado la partida. Suma 100 puntos en su cuenta.","success");
        console.log("Has ganado");
        partida.cuenta+=100;
        setTimeout(()=>{
            nuevaJugada();
          },3000)

    }else if(partida.puntos>21){
        mensaje(`Ha conseguido ${partida.puntos} puntos. Ha perdido la partida. Se sumará 0 puntos en su cuenta`,"error");
        console.log("Has perdido");
        setTimeout(()=>{
            nuevaJugada();
          },3000)
    } 
};

 const plantarse=()=>{
    mensaje("Te has plantado. Sumas "+$("#txtPuntos").attr("value")+". Nueva Jugada","success");
    partida.cuenta+=partida.puntos;
    partida.puntos=0;
    $("#btnJugar").removeAttr("disabled");
    console.log("Puntos en cuenta: "+partida.cuenta);
    setTimeout(()=>{
        nuevaJugada();
      },3000)
 };

 const nuevaJugada=()=>{
    //Se reinician los puntos parciales
    partida.puntos=0;
    partida.dado=2;
    //Se elimina el botón de plantarse
    $("#btnPlantarse").remove();
    $("#txtPuntos").attr("value",partida.puntos);
    $("td").empty();
 };


 const desactivarDado=(e)=>{
    console.log($(e.target).attr("id"));
    $(e.target).attr("id")==0?partida.dado=1:partida.dado=0;
    console.log(partida.dado);
    $(e.target).attr("disabled","disabled").css("opacity",0.5);
    $("td>img").off("click",desactivarDado);
    $("#btnJugar").removeAttr("disabled");
    $("#btnPlantarse").remove();  
 };

 const mensaje=(texto, icono)=>{
    Swal.fire({
      position: 'bottom-end',
      icon:icono,
      title: texto,
      showConfirmButton: false,
      timer: 2500,
      position:'center'
    })
  };

  const reiniciar=()=>{
    mensaje(`Ha conseguido un total de ${partida.cuenta} puntos.`,"success");
    $("#panel-numDados").empty();
    $(".comenzar").removeAttr("disabled");
  };
"use strict"

let contRojo=0, contAzul=0
$(()=>{
    //Gestión de los elementos arrastrables
    rojoDraggable()
    azulDraggable()
    //Gestión de las áreas donde se pueden soltar los elementos arrastrables.
    rojoDroppable();
    azulDroppable()

})

//draggable es el proceso de hacer click en un elemento y arrastrarlo hasta que se suelta el click.
const rojoDraggable=()=>{
    //A todos los elementos de la clase .rojo (cuadritos rojos)
    $(".rojo").draggable({
        //limitar el arrastre al elemento con id "principal". Fuera de los límites de este elemento
        //no se puede extender el arrastre.
        containment:"#principal",

        //helper es el elemento que se mostrará durante el arrastre.
        //con clone, en lugar de arrastrar el elemento directamente, crea una copia que será lo que se arrastrará
        helper:"clone", 

        //Establece la opacidad del helper.
        opacity:0.35,

        //Sólo permite hacer el arrastre en horizontal
        //axis:"x",

        //Sólo permite hacer el arrastre en vertical
        //axis:"y",

        //Cuando se suelta, se muestra una animación para volver a la posición inicial
        revert:true, 
        
        //Tiempo que dura la animavión de revert
        revertDuration:2000,

        //START: función que se ejecuta cuando empieza el arrastre
        //Recibe dos parámetros: 
        //- event: objeto de tipo event.
        //- ui: información sobre el objeto que se está arrastrando
        //      - helper: un objeto jquery con el elemento que se está arrastrando.
        //      - position: objeto {top,left} con la posición del objeto que se está arrastrando. ES la posición css
        //      - offset: objeto con la posición inicial del objeto {top,left}
        start: ((event, ui)=>{
            console.log('comienza draggable'+" Posicición inicial: "+ui.offset.top+"-"+ui.offset.left);
        }),

        //DRAG: Función que se ejecuta en cada movimiento de arrastre.
        //los parámetros de entradas son igual que en START.
        //En este caso, position se puede utilizar para controlar la posición final, por ejemplo.
        drag: ((event, ui)=>{
            console.log('El objeto está siendo arrastrado');
        }),

        //STOP: Función que se ejecuta cuando acaba el arrastre (cuando se suelta el click)
        //Mismos parámetros que START.
        stop: ((event, ui)=>{
            console.log('Fin del draggable');
        })
    })

}

const azulDraggable=()=>{
    $(".azul").draggable({
        //limitar el arrastre
        containment:"#principal",
        revert:true //retorna a la posición actual

    })
}

//DROPABBLE CREA UN DESTINO PARA LOS ELEMENTOS QUE SE ESTÁN ARRASTRANDO.
const rojoDroppable=function(){
    //Se crea una zona destino (droppable, donde se pueden soltar los elementos draggeables)
    $("#contRojo").droppable({
       classes:{
        //Hace que el objeto adopte la clase ui-state-hover (framework jquery ui) cuando un objeto
        //draggable admitido por este droppable, entra dentro de sus límites (que es cuando la clase estructural 
        //ui-droppable-hover se añade al objeto droppable)
        "ui-droppable-hover": "ui-state-hover"
       },
       
       //Sólo aceptará objetos de la clase .rojo.
       accept:".rojo", // solamente acepta los objetos cuya clase es rojo

       //Ejecuta la función cuando se suelta el elemento...
       drop: function(event, ui){ //event.target es el objeto donde se realiza el drop (contenedor), ui es el objeto que se suelta (caja roja)
            //...en este caso, se añade el elemento draggable como hijo del elemento droppable.
            //target es una propiedad del objeto event que representa el objeto que lanza el evento, en este caso
            //el objeto droppable.
            $(event.target).append(ui.draggable);
        
        //establecer las nuevas coordenadas del objeto que se ha arrastrado (porque lo que se había movido era
        //el helper)
            //localizamos el último descendiente de tipo div del elemento droppable (que es el objeto que 
            //acabamos de añadir (el objeto draggable)), y le cambio su posición para ubicarlo a dónde
            //hemos soltado el helper.
            $(this).find("div:last").css({
                top:ui.position.top,
                left:ui.position.left
            });
            
            //Como el objeto draggable está creado, podemos actuar sobre él  para lo que necesitemos
            //mediante una QUERY.

            //En esta query, quitar el atributo revert al objeto que se arrastra para que no vuelva 
            //a su sitio ya que ha llegado a su destino.
            $(ui.draggable).draggable("option", "revert", false);

            //quitar el draggable al cuadrado evitando así que pueda arrastrarse de nuevo.
            $(ui.draggable).draggable("disable");
            
            //Actualizamos el contador con el número de objetos que se han arrastrado
            $(this).find("span").html(`Arrastra aquí elementos rojos<br><b>Contador= ${++contRojo}</b>`);

       },
       
       //El evento OVER: dispara la función cuando un objeto draggable admitido entra en el objeto
       //droppable.
       over:function(){
        $(this).find("span").text("Suelta el objeto rojo")
       },

       //El evento OUT: dispara la función cuando un objeto draggable admitido sale del objeto
       //droppable.
       out:function(){
        $(this).find("span").text("Arrastra aquí elementos rojos")
       }

    })

}

const azulDroppable=function(){
    $("#contAzul").droppable({
        classes:{
         "ui-droppable-hover": "ui-state-hover"
        },
        accept:".azul", // solamente acepta los objetos cuya clase es azul
        drop: function(event, ui){ //event es el objeto donde se realiza el drop (contenedor), ui es el objeto que se suelta (caja roja)
         $(event.target).append(ui.draggable);
        
         //establecer las nuevas coordenadas
         $(this).find("div:last").css({
            top:ui.position.top,
            left:ui.position.left
        }); 
        
         //quitar el atributo revert al objeto que se arrastra
         $(ui.draggable).draggable("option", "revert", false);
         
         //quitar el draggable al cuadrado,es decir, ya no se podrá volver a arrastrar.
         $(ui.draggable).draggable("disable");
        
         //Actualizamos el contador con el número de objetos que se han arrastrado
         $(this).find("span").html(`Arrastra aquí elementos azules<br><b>Contador= ${++contAzul}</b>`);
 
        },

        over:function(){
         $(this).find("span").text("Suelta el objeto azul")
        },
        out:function(){
         $(this).find("span").text("Arrastra aquí elementos azul")
        }
    })
}
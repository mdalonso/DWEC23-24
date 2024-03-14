"use strict";
//Selección de información dentro de una tabla utilizando
//la extensión SELECT.

 $(()=>{
    mostrarTabla();
 })


const mostrarTabla=()=>{
    //el objeto datos servirá para pasar los parámetros al servidor.
    let datos={
        perro:""
    }

    //Se crea el objeto DATATABLES que envuelve a la tabla html
    $(".table").DataTable({
        //Se cargan los datos en la tabla utilizando la opción ajax (ver el ejemplo anterior)
            "ajax": {
                url: "php/mostrar.php",
                type: "GET",
                data: datos,
                dataType: "json"
            },
            
            columns: [
                //Esta columna se introduce con el style:os
               /*  {
                    "defaultContent":'',
                    orderable:false,
                    className:'select-checkbox',
                },  */
                
            //Se realiza la correspondencia entre datos y columnas.
            {
                "data": "chip",
                
            },
            {
                "data": "nombre"
            },
            {
                "data": "raza"
                
            },
            {
                "data": "fechaNac",
                //La tabla no se podrá ordenar por esta columna
                orderable:false
            }
            
        ],
       
        
       
        pagingType: "full_numbers", //muestra los botones de first y last
        
        //FORMAS DE SELECCIONAR FILAS:
        //1º FORMA: Utilizando la extensión SELECT


        //Se puede configurar también el tipo de selección. Si sólo ponemos select a true
        //se realizará una selección simple de fila.

        select:true,

        //Select puede recibir varias opciones que permiten modificar la forma en la que se 
        //aplica la selección.
        //STYLE: Permite establecer si la selección es simple, múltiple o de otro tipo. Por defecto es OS.
        // - simple: Selección simple de items.
        // - multi: Permite seleccionar varios items
        // - multi+shift: Permite seleccionar un rango de items adyacentes
        // - os: Permite realizar selecciones tal y como se permite en la plataforma que se
        //          está ejecutando.

        /*   select:{
             style:'multi+shift'
          }, */
        
        //ITEMS: Permite establecer el elemento seleccionable. Por defecto es fila pero
        //Se pueden seleccionar celdas (cell) o columnas (column) de forma independiente
        /*   "select":{
              items:'cell' //row
          }, */
        
        //SELECTOR: Determina el elemento que va a recibir el evento por el que se selecciona el item.
        //      En este ejemplo se está utilizando la columna (td) que es primer hijo.
        //      Podemos introducir una nueva columna de tipo checkbox en el HTML para que refleje
        //      ahí la selección.
        //Para probar esto tenemos que descomentar las líneas 34 y 43 del documento html
        /*   "select":{
            style:'os',
            selector:'td:first-child',
            style:'multi'
           
        },   */
        
        //Dentro de la opción language del método DataTabla se pueden configurar mensajes asociados a
        //la extensión SELECT.
        "language":{
            url:'../../assets/librerias/DataTables/es-ES.json',
           //La opción Select asociada a LANGUAGE puede utilizar la opción ROWS para definir mensajes
           //en función del número de filas seleccionadas.
           //(También existen las opciones CELLS y COLUMNS para el caso de que la opción ITEM se haya
           //establecido a esas unidades de selección)

            select:{
                rows:{
                    //_ (obligatorio): establece un mensaje asociado al acto de seleccionar
                    //                  El número de filas está contenido en el parámetro %d (es un parámetro
                    //                  interno de la opción rows)
                    //Número: Se puede especificar un número de manera que cuando %d coincida con ese número
                    //              se puede personalizar el mensaje
                    _:'Ha seleccionado %d filas',
                    0:'Haga click en una fila para seleccionarla',
                    1:'solo 1 fila sleccionada'
                }
            }
        }
        
    })  
   
}
"use strict"
//Este ejemplo es una muestra de cómo dar formato a una tabla utilizando la librería DATATABLES en el caso de que 
//la tabla html ya esté construída y con datos cargados

//Evento ready de JQuery
$(()=>{
    mostrarTabla();
   
     document.querySelector(".recargar").addEventListener('click', ()=>{
         mostrarTabla();
     })
})

//En JS nativo
/* document.addEventListener("DOMContentLoaded", ()=>{
    mostrarTabla();
    // document.querySelector(".recargar").addEventListener('click', ()=>{
    //     mostrarTabla();
    // })
}) */
//Vamos a utilizar una función Async/Await para manejar el asincronismo que puede producirse entre la consulta al
//servidor y el tratamiento de la respuesta.
const mostrarTabla=async()=>{
    //fetch
    try {
        //Recordamos: fetch es un método global nativo de JS que se basa en promesas.
        //Devuelve un objeto de tipo PROMISE que se resuelve en un objeto response.
        //Recordamos que el tratamiento de los datos devuelto por fetch se realizaba en dos pasos:
        //- En primer lugar, procesamos el objeto response.
        //- En segundo lugar, procesamos los datos envueltos en ese objeto response.

        //La constante response va a contener el objeto RESPONSE en el que se resuelve la promesa generada por fetch.
       const response=await fetch("https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json");
       //La constante data va a contener los datos devueltos por el servidor que esta vez están en formato json, por ello
       //utilizamos el método json() del objeto response.
       const data=await response.json();

       //data contiene una colección de 52 objetos JS.
       console.log(data);

       //Hacemos el tratamiento de los datos (rellenar la tabla).
       //Recorremos la colección
       data.forEach(element => {
            //crear las filas
            console.log(element);
            //Por cada elemento de la colección de datos creamos una fila que contiene dos columnas, 
            //una por cada campo del objeto.
            //Selector: descendiente de tipo tbody (etiqueta html) del elemento de la clase .table
            $('.table tbody').append(`<tr><td>${element.id}</td><td>${element.nm}</td></tr>`)
       });

       //establecer la selección de filas

       //Cada vez que hacemos click en una fila podemos seleccionar/deseleccionar esa fila, para ello
       //a las filas seleccionadas les aignaremos una clase cuando se haga click.
       //Selector: elemento de tipo tr que es descendiente de un elemento de tipo tbody que a su vez es descendiente
       //de un objeto de la clase .table
       //(HAY EXTENSIONES DE LA LIBRERÍA QUE FACILITAN TAREAS COMO ESTA Y QUE VEREMOS EN EL SIGUIENTE EJEMPLO)
       $('.table tbody tr').on('click', function(){
        //toggleClass asigna la clase selected si no la tiene asignada y si ya la tiene se la quita.
        $(this).toggleClass("selected");
        })

    //configurar la tabla con la librería dataTables

        //El método Datatable devuelve un objeto DataTables que puede ser configurado atendiendo a diferentes propiedades
        //que mejoran el comportamiento y la apariencia de una tabla.
        //Como se aplica sobre una tabla, hay que localizar en primer lugar la tabla sobre la que se quiere aplicar utilizando
        //un selector.
        //En este caso el selector localiza la tabla utilizando una clase.
       $('.table').DataTable({
        //LANGUAGE: Permite configurar características de idioma.
        //Estas características se pueden pasar como un objeto JS donde se pueden configurar individualmente
        //todas las propiedades referentes al lenguaje o bien mediante un objeto JSON (hay plugins para ello consistentes
        //en el objeto JSON adecuado al idioma que necesites, que es lo más fácil y lo más habitual)
        language:{
            //Para configurar el idioma a través de un archivo json hay que utilizar la propiedad url para 
            //indicar la ruta relativa del archivo.
            url:'../../assets/librerias/DataTables/es-Es.json'
        },

        //COLUMNDEFS: Permite asignar características específicas a cada columna de forma individual.
        //Estas características se pasan en forma de objeto JS.
        //En este ejemplo se utilizan dos de las características aplicables a las columnas:
        // - className: asigna una clase a la columna.
        // - targets (requerido): Indica la columna a la que se le va a aplicar las características. 
        //      Formas de especificar la columna:
        //      - Número +: número de columna desde la primera contando desde 0
        //      - Número -: número de columna desde la última hacia atrás
        //      - Selector CSS
        //      - _all: todas las columnas

        columnDefs:[
            {
                //En este ejemplo se asigna la coase dt-center a todas las columnas de la tabla.
                "className": "dt-center", "targets":"_all"
            }
        ],

        //PAGINGTYPE: Configura el tipo de paginación de la tabla y la forma en que se va a navegar
        //por esas páginas.
        pagingType:'simple', //muestra los botones First y last

        //DESTROY: permite destruir el objeto DATATABLES para poder crear otro sobre la misma tabla html
        destroy:true
        
    });
    
    } catch (error) {
        console.log(error);
    }
}



"use strict"
document.addEventListener("DOMContentLoaded", ()=>{
    
//Otra forma de acceder a los elementos a través de su class name.
//GETELEMENTSBYCLASSNAME --> Devuelve una colección con todos los elementos del documento HTML que utilizan
//una determinada clase para configurar su apariencia
//(puede recibir varias clases separadas por un espacio)

//header: contiene una colección con todos los elementos que tinene la clase header. 
//Esa colección tiene un único elemento que es <header></header>
const header=document.getElementsByClassName("header");

//hero: contiene una colección con todos los elementos que tinene la clase hero
//Esa colección tiene un único elemento que es un <div>
const hero=document.getElementsByClassName("hero");
console.log(header);
console.log(hero);


//Si las clases existen más de una vez
//contenedor: contiene una colección con todos los elementos que tinene la clase contenedor
//En este caso es una colección de 4 elementos
    const contenedores=document.getElementsByClassName("contenedor");
    console.log(contenedores);

//CHILDNODES-----------------------
    //Todos elementos del document tienen una propiedad childNodes que contiene una colección
    // con todos sus nodos hijos.
    //Si el elemento no tiene hijos, childNodes devuelve UNDEFINED.
    
    //En este caso, el primer elemento de contenedores, que se corresponde con <header></header> que está en el <body></body>
    //Tiene 8 nodos hijos: (hay que tener en cuenta que cada intro para saltar de línea
    //al escribir código dentro del html se considera un nodo de tipo text que contiene un \n)
    console.log(contenedores[0].childNodes);
    console.log(contenedores[0].childNodes.length);

//CHILDREN---------------------
    //Es una propiedad que contiene una colección con todos los hijos que son NODOS de tipo element 
    //(los text y los comentarios no son nodos de tipo element)
    //RECORDATORIO: los nodos de tipo element son aquellos de los que pueden salir otros nodos.
    
    //En este caso, el contenedor tiene 2 children: EL DIV Y EL NAV (el resto son texto y comentarios)
    console.log(contenedores[0].children);
    console.log(contenedores[0].children.length);
    
    //Como children es una colección, puede acceder a cada uno de sus elementos por su índice.
    //En este caso estamos accediendo al DIV.
    console.log(contenedores[0].children[0]);
    //y en este caso estamos accediendo al NAV
    console.log(contenedores[0].children[1]);

    //Como es un nodo de tipo element, también puede tener sus propios hijos
    //En este caso, children es una colección de 4 elementos que son enlaces <a></a>
    console.log(contenedores[0].children[1].children);
    console.log(contenedores[0].children[1].children[1]);


    //Si a getElementsByClassName le pasamos una clase que no existe

     const noExiste=document.getElementsByClassName("noExiste");
     //devuelve una colección vacía, no un undefined
     console.log(noExiste);
})

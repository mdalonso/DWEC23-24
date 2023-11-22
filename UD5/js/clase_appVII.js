"use strict"
//CREAR OBJETOS DENTRO DEL DOM******************************
/**El DOM permite manipular el árbol añadiendo y eliminando nodos en tiempo de ejecución.
//Hay que recordar que el DOM sólo funciona bien cuando todos los elementos HTML están correctamente cargados
//ya que sólo así nos aseguramos de que el navegador ha construido el árbol asociado al documento.
//Por eso, siempre que vayamos a manipular el documento con el DOM hay que hacerlo asociado al evento
//DOMContentLoaded.*/

//MEDIANTE ESTE EJEMPLO VAMOS A CREAR UNA NUEVA CARD SIMILAR A LAS QUE HAY YA HAY ENEL DOCUMENTO
//PARA ELLO HABRÁ QUE CREAR EN PRIMER LUGAR LOS OBJETOS INDEPENDIENTES Y AGRUPARLOS EN UN CONTENEDOR.
//Esto nos va a permitir introducir distintos métodos del objeto Node.

document.addEventListener("DOMContentLoaded", ()=>{


//CREATELEMENT---------------
//permite crear nodos de tipo ELEMENT (RECORDATORIO: Pueden contener otros nodos).
//Recibe como parámetro el tag que establece el tipo de elemento que se está creando


//En este caso estamos creando 3 nodos de tipo elemento en este caso son <p></p>.
 //Esto está creando tres nuevos nodos de tipo element en el document.
const parrafo1=document.createElement("p");
const parrafo2=document.createElement("p");
const parrafo3=document.createElement("p");

//A estos nodos se les pueden añadir las clases CSS que van a determinar su aspecto.
//Para ello utilizamos su propiedad classList (si es compatible con el navegador).
//como classList es una colección, dispone del método add.
//Aquí le estamos añadiendo dos clases a parrafo1
parrafo1.classList.add("categoria", "concierto");
parrafo2.classList.add("titulo");
parrafo3.classList.add("precio");

// //añadir texto
//Los nodos <p> </p> están creados pero no tienen ningún texto que mostrar

//1ª forma añadir texto--> PROPIEDAD TEXTCONTENT del nodo, a la que podemos asignarle un valor
parrafo1.textContent="Salidas";

//2º forma de añadir texto-->
//Crear un nodo de tipo text y añadiéndolo como hijo de un nodo de tipo element.
//CREATETEXTNODE--> crea un nodo de tipo text.
const textoParrafo2=document.createTextNode("Visita startlight en bici");
//APPENDCHILD-->Lo añadimos como hijo al nodo element que necesitemos, en este caaso el parrafo2
//AppendChild añade el nodo al final del último hijo
parrafo2.appendChild(textoParrafo2);
parrafo3.textContent="35€ por persona";

//Ahora vamos a crear un contenedor para los tres párrafos (será de tipo div, que permite agrupar elementos)
const div=document.createElement("div");
//Se establece su class para configurar su aspecto
div.classList.add("info");

//Añadimos los párrafos como hijos del contenedor
div.appendChild(parrafo1);
div.appendChild(parrafo2);
div.appendChild(parrafo3);
//console.log(div);

//Creamos un nodo para contener la imagen. SErá de tipo <img>
const imagen=document.createElement("img");

//SETATTRIBUTE -->Permite establecer atributos para los nodos.
//Set atribute recibe dos cadenas, la primera es el nombre del atributo y la segunda es el valor del atributo
//Así, para establecer la imagen, utilizamos el atributo src del objeto img, poniendo la ruta correspondiente

imagen.setAttribute("src", "../assets/img/hacer4.jpg")


//Creamos un contenedor para la tarjeta=imagen+contenedor de párrafos.
//será un nodo de tipo element <div></div>
const divPadre=document.createElement("div");
//Le especificamos la clase para definir su aspecto
divPadre.classList.add("card");

//añadimos tanto la imagen como la capa que contiene los párrafos como hijos de este nuevo contenedor
//añadimos la imagen a la clase padre
 divPadre.appendChild(imagen);
//añadirmos el div que contiene los párrafos
divPadre.appendChild(div);
 console.log(divPadre);
//añadir el divPadre al div cuya clase es contenedor-cards

//Una vez creada la tarjeta, hay que añadirla al contenedor principal.
//QUERYSELECTOR--> Permite localizar elementos del document utilizando su selector CSS.
//RECORDATORIO: Un selector CSS es el elemento que indica al navegador qué elementos HTML se seleccionan
//para aplicarles la regla CSS. Una clase CSS es un selector
//QuerySelector realiza una búsqueda en profundidad pre-orden por todo el documento buscando aquellos
//nodos que cumplen con alguno de los selectores (no tiene que cumplir con los dos) y se para
//al localizar el primero que encuentra.
//cuando se añade un hijo con appendChild, se añade al final.****************
document.querySelector('.hacer .contenedor-cards').appendChild(divPadre)

//CAMBIAR LA POSICIÓN DE INSERCIÓN
        //Si queremos cambiar el orden donde se inserta el nuevo elemento podemos hacerlo localizando el hijo
        //delante del cual queremos hacer la inserción y después utilizar INSERTBEFORE
        //En este caso vamos a insertarlo el primero.
        //Localizamos la primera card mediante la colección children del contenedor.
        //Como queremos ubicarlo el primero de todos, localizamos el children[0]
        //también podemos hacerlo con firstChild.

//const nodoPrimerHijo=document.querySelector('.hacer .contenedor-cards').children[0];
const nodoPrimerHijo=document.querySelector('.hacer .contenedor-cards').firstChild;
//utilizamos insertBefore para insertarlo delante.
//insertBefore recibe dos parámetros. El primero es el nodo que se quiere insertar y el segundo
//el nodo de referencia.
//document.querySelector('.hacer .contenedor-cards').insertBefore(divPadre,nodoPrimerHijo )

})


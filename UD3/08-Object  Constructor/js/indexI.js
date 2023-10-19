"use strict"; 
//declaraciones

//clase constructor para poder instanciar objetos definidos por el usuario.
/**
 * 
 * @param {String} nom : Valor por defecto del nombre del electrodoméstico.
 * @param {Number} precio : Precio por defecto
 * @param {String} color : color por defecto
 * Mediante FUNCTION definimos un constructor recibe como parámetros los valores a los que se van a inicializar las propiedades.
 * Siempre hay que definir las propiedades haciendo referencia a THIS.
 */

//clase constructor
function Electro (nom, precio, color){
    //las propiedades
    this.nombre=nom;
    this.precio=precio;
    this.color=color;
    this.disponible=true;
    this.id=0
    //métodos 
    //Se define un método que convierte el objeto en una cadena de forma personalizada.
    this.toString=function(){
        return `El electrodomestico es ${this.nombre} y el precio es ${this.precio} y tienen el color ${this.color}`;
    }

}

//Creamos una instancia del objeto para ver cómo funciona la herencia en javascript.
let electroprueba=new Electro("lavavajillas",320,"rojo");
//Cuando pongo electroprueba. puedo acceder a las propiedades y métodos de su prototipo, que es el constructor Electro()
//PEro también puedo acceder a otras propiedades y métodos que no están implementados en este prototipo
//por ejemplo, valueOf(). Y funciona perfectamente.
//Esto es porque se asciende por la cadena de prototipo (El prototipo de Electro es OBJECT, donde hay una 
//implementación de valueOf())
console.log(electroprueba.valueOf());

//Objet.getPrototypeOf nos permite conocer el prototipo de cualquier objeto.
console.log(Object.getPrototypeOf(electroprueba));

//PROTOTYPE: Mediante la propiedad Prototype se puede añadir más funcionalidad a un objeto fuera de la definición
//de su constructor
//Además sirve para implementar la herencia en javascript.

//crear nuevos métodos
//prototype
Electro.prototype.mostrarMasInfor=()=>{
    return `Podemos añadir más funcinalidad fuera de la clase base`;
}

//************HERENCIA EN JAVASCRIPT
//Definimos un nuevo constructor el cual hereda propiedades y objetos del constructor Electro definido anteriormente
function DispElec(nom,precio,color,disco,ram){
    //crear el constructor
    //La siguiente línea invoca al constructor ELECTRO mediante el método call.
    //Call recibe como primer parámetro el objeto para el que se realiza la llamada, en este caso this (DispElec)
    //y después el valor de los propios parámetros del constructor.
    Electro.call(this, nom, precio,color); //propiedades de la clase base
    //Además incorpora dos nuevas propiedades y una redefinición de toString distinta de la que se definió en Electro
    //Los objetos instanciados con DispElec harán uso de un toString distinto al de Electro.
    this.disco=disco;
    this.ram=ram;
    this.toString=function(){
        return `El cacharro es ${this.nombre} y el precio es ${this.precio} y tienen el color ${this.color}\n El disco duro es de ${this.disco} y la memoria es de ${ram}`;
    }
}
//Inicialmente, la nueva clase no hereda las propiedades y los objetos definidos dentro de PROTOTYPE
//sino únicamente los que están en su definición directa.
//PAra que se hereden estos métodos hay que utilizar el método Object.create()
//pasar los prototype de la clase base a la clase hija
//Con la siguiente instrucción estamos diciendo que el objeto prototype de DispElec sea el mismo que el de Electro
//pasándole así sus métodos y propiedades heredables.
//Estos métodos no están definidos dentro del nuevo Constructor sino que para hacer uso de ellos habrá que
//recorrer la cadena de prototipos hacia arriba hasta encontrar una implementación.
DispElec.prototype=Object.create(Electro.prototype);

//creamos tres objetos utilizando los constructores definidos.
const frigo=new Electro("Frigo", 200,'red');
const horno=new Electro("Horno", 300,'blue');
const portatil=new DispElec("HP", 700, "white", "500Gb", '12Gb')

//Vemos que portatil, que es una instancia de DispElec, utiliza el toStrig redefinido en su constructor y no el heredado de Electro
console.log(portatil.toString());

console.log(frigo, horno);
console.log(frigo.toString());
console.log(horno.toString());

//Ambos objetos creados a través de Constructores distintos, pueden hacer uso del método mostrarMasInfor()
//Si no hubiera asignado a DispElec el prototipo de Electro esto no sería posible.
console.log(frigo.mostrarMasInfor());
console.log(horno.mostrarMasInfor());

console.log(portatil);
console.log(portatil.toString());
console.log(portatil.mostrarMasInfor());

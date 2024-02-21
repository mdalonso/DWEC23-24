"use strict";
/**Sin promesas */

/**con este ejemplo vamos a comprobar lo que ocurre en una situación asíncrona
 * 1º se mostrará por consola el texto "Estoy"
 * 2º aunque hay una llamada a la función aprender(), como esta tiene programado un retardo de 2 segundos, no se imprimirá
 *      nada en consola inmediatamente. El proceso no se detiene, por lo que inmediatamente se imprime el tercer mensaje.
 * 3º Lo que necesitamos es que el último CONSOLE.LOG se ejecute después de que la función aprender haya terminado. 
 * Vamos a ver cómo resolver estos con promesas en los ejemplos siguientes.
 */

//la función aprender recibe un texto como parámetro de entrada y este texto se imprime por consola pasados 2 segundos.
 const aprender = (texto) => {
   setTimeout(() => {
     console.log(texto);
   }, 2000);
 };

 console.log("Estoy");
 aprender("aprendiendo");
 console.log("a utilizar PROMESAS");



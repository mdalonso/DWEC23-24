"use strict";

import Participante from "./participante.js";
//Crear clase Jurado que hereda de Participante
export default class Jurado extends Participante {
  #profesion;
  #genero;
  constructor(nombre, edad, profesion, genero) {
    super(nombre, edad);
    this.#profesion = profesion;
    this.#genero = genero;
  }

  //getter y setter de profesion
  get profesion() {
    return this.#profesion;
  }
  set profesion(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, la profesión  debe ser un string";
    } else if (valor.length < 5) {
      throw "Error, la profesión  debe tener como mínimo 5 car";
    } else {
      this.#profesion = valor;
    }
  }
  //getter y setter de genero
  get genero() {
    return this.#genero;
  }
  set genero(valor) {
    const aGenero = ["h", "m", "l", "g", "t", "b", "i", "q", "a", "+"];
//1- MÉTODO FILTER: EXTRAER ELEMENTOS QUE CUMPLEN UNA DETERMINADA CONDICIÓN
    //El método FILTER aplica una función a cada elemento del array. ESta función immplementa una condición.
    //Se devuelve un array con los elementos que cumplen la condición
    //Esa función recibe como parámetro el elemento del array sobre el que se aplica la función.
    //También puede recibir como segundo parámetro el índice del elemento y como tercer argumento el array en sí mismo.    
/**También se podía utilizar por ejemplo el método SOME que devuelve true si encuentra algún elemento que
 * cumpla con una condición. O find, indexOf, includes (ver ArraysMethod-->appI.js y appIII.js) o cualquier
 * método que me localice un elemento dentro del array
 */
    const resultado = aGenero.filter((letra) => letra == valor.toLowerCase());
    if (resultado.length == 0) {
      //no hay coincidencia
      throw "Error, el género no es correcto";
    } else {
      this.#genero = valor.toLowerCase();
    }
  }
  toString() {
    return `<tr><td><b>Nombre:</b>${this.nombre}</td><td><b>Edad:</b>${this.edad}</td><td><b>Profesión:</b>${this.#profesion}</td><td><b>Género:</b>${this.#genero}</td></tr>`;
  }
}

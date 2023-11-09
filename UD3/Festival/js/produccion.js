"use strict";
//Crear clase Producción
export default class Produccion {
  #titulo;
  #nacionalidad;
  #genero;
  #anio;

  constructor(titulo, nacion, genero, anio) {
    this.#titulo = titulo;
    this.#nacionalidad = nacion;
    this.#genero = genero;
    this.#anio = anio;
  }
  //getter y setter de título
  get titulo() {
    return this.#titulo;
  }
  set titulo(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, el nombre debe ser un string";
    }else{
      this.#titulo=valor;
    }
  }

  //getter y setter de nacionalidad
  get nacionalidad() {
    return this.#nacionalidad;
  }
  set nacionalidad(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, la nacionalidad debe ser un string";
    } else {
      this.#nacionalidad = valor;
    }
  }
  //getter y setter de genero
  get genero() {
    return this.#genero;
  }
  set genero(valor) {
    //******Habría que comprobar si fuera una cadena y si no lo es, lanzar una excepción.
    //Como el valor es una cadena (array de caracteres, se puede acceder a cada carácter por su índice).
    //Método de array Slice devuelve una porción del array. Si sólo recibe un parámetro, devuelve el array
    //a partir de ese índice. (Ver Array-->appIV.js)
    this.#genero = valor[0].toUpperCase() + valor.slice(1).toLowerCase();
    //¿De qué otra forma se puede hacer? Se puede hacer recorriendo el array con un ForEach y aplicar la
    //función que convierta cada caracter independiente en mayúscula o minúscula según corresponda (Array-->appII.js)
    //otra opción es hacer un for recorriendo el array y aplicando los cambios correspondientes según el índice.
  }
  //getter y setter de anio 
  get anio() {
    return this.#anio;
  }
  set anio(valor) {
    if (typeof valor!="number"){
      throw ('El año debe ser numérico');
    }else if(valor<1999){
      throw ('Sólo se admiten producciones desde 1999');
    }else{
      this.#anio=valor;
    }
    
  }

  toString() {
    return `<tr><td><b>Título:</b>${this.#titulo}</td><td><b>Nacionalidad:</b>${this.#nacionalidad}</td><td><b>Género:</b>${this.#genero}</td><td><b>Año:</b>${this.#anio}</td></tr>`;
  }
}

"use strict";
//Crear clase Participante para representar a los distintos asistentes al festival
export default class Participante {
  #nombre;
  #edad;

  constructor(nombre, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
  }
  //getter y setter de nombre
  get nombre() {
    return this.#nombre;
  }
  set nombre(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, el nombre debe ser un string";
    } else if (valor.length < 3) {
      //si es menos de 3 caracteres
      this.#nombre = "...";
    }else{
        this.#nombre=valor;
    }
  }
  //getter y setter de nombre
  get edad() {
    return this.#edad;
  }
  set edad(valor) {
    if (typeof valor != "number") {
      //debe ser un string
      throw "Error, la edad debe ser un número";
    } else if (valor < 18) {
      //si es menos de 3 caracteres
      this.#edad = 18;
    }else{
        this.#edad=valor;
    }
  }
  toString() {
    return `<tr><td colspan=2><b>Nombre:</b>${this.#nombre}</td><td colspan=2><b>Edad:</b>${this.#edad}</td></tr>`;
  }
}

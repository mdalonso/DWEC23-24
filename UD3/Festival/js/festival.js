"use strict";
//Crear clase Festival, donde se guardará los datos del festival
export default class Festival {
  #nombre;
  #ciudad;
  #edicion;
  #descripcion;
  #aProducciones;
  #aParticipantes;

  constructor(nombre,ciudad,edicion,descrip) {
    this.#nombre = nombre;
    this.#ciudad = ciudad;
    this.#edicion = edicion;
    this.#descripcion = descrip;
    this.#aProducciones=[]; //array que guardará los objetos de producción
    this.#aParticipantes=[[],[]]; //array que guardará los objetos de participantes y jurados
  }
  //getter y setter de nombre
  get nombre() {
    return this.#nombre;
  }
  set nombre(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, el nombre debe ser un string";
    }else if(valor.length==0){
      throw "Error, el nombre no puede estar vacío";
    }else if(valor.length<3){
      throw "Error, el nombre no tener menos de 3 caracteres";
    }else{
      this.#nombre=valor;
    }
  }

  //getter y setter de ciudad
  get ciudad() {
    return this.#ciudad;
  }
  set ciudad(valor) {
    if (typeof valor != "string") {
      //debe ser un string
      throw "Error, la ciudad debe ser un string";
    } else if (valor.length==0){//También se podría comparar con la cadena vacía ""
      throw "Error, la ciudad no puede estar vacío";
    }else{
      this.#ciudad = valor;
    }
  }
  //getter y setter de edición
  get edicion() {
    return this.#edicion;
  }
  set edicion(valor) {
    if(typeof valor!="number"){
      throw ('La edición debe ser numérica');
    }else if ( valor<0){
      throw ('La edición no puede ser negativa');
    }else{
      this.#edicion=valor
    }
   
  }
  //getter y setter de descripción
  get descripcion() {
    return this.#descripcion;
  }
  set descripcion(valor) {
    if (valor.length>300){
      throw ('La descripción debe tener menos de 300 caracteres');
    }else{
      this.#descripcion=valor;
    }
    
  }
  get aProducciones(){
    return this.#aProducciones;
  }
  get aParticipantes(){
    return this.#aParticipantes;
  }
  //Los arrays no tienen setter porque los elementos se van a introducir de uno en uno.

  introducirProduccion(produccion){
    //Insertar la producción en el array
    //comprueba si la producción que se quiere insertar existe en el array suponiendo que el título es clave
    const resultado=this.#aProducciones.filter(produc=>produc.titulo==produccion.titulo);
    if (resultado.length==0){//no existe
      this.#aProducciones.push(produccion);
      return true;
    }else{
      return false;
    }
  }
  eliminarProduccion(titulo){
    //comprueba si la producción que se quiere insertar existe en el array suponiendo que el título es clave
    //Se localiza el elemento a través de findIndex que devuelve el índice donde se encuentra el elemento.
    const resultado=this.#aProducciones.findIndex(produc=>produc.titulo==titulo);
    if (resultado!=-1){// Existe
      //Elimina el elemento en la posición devuelta
      this.#aProducciones.slice(resultado,1);
      return true;
    }else{
      return false;
    }
  }
  anadirParticipantes(objeto, indice){
   //Otra forma es comprobar en este método de qué tipo es el objeto utilizando instanceOf
   //y en base a eso establecer en qué array debe de insertar el objeto.
    if (indice ==0 ){ //se añade un participante
      this.#aParticipantes[0].push(objeto)
    }else{
      this.#aParticipantes[1].push(objeto) //añade un jurado
    }
  }
  toString() {
    return `<tr><td colspan=4><h1><center>Festival: ${this.#nombre}</h1></center></td></tr><tr><td colspan=2><b>Ciudad:</b> ${this.#ciudad}</td><td colspan=2><b>Edición:</b> ${this.#edicion}</td></tr><tr><td colspan=4><h3>Descripción:</h3> ${this.#descripcion}</td></tr>`;
  }
}

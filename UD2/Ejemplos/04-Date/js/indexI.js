"use strict"; //Obligatorio declarar variables y constantes


let fechaHoy=new Date();
let fechaMilis=new Date(454545454);
let fechaCadena=new Date('01/12/2023');
let diasResta;

document.write(`La fecha de hoy es ${fechaHoy}`);
document.write(`<br>La fecha parámetros milisegundos ${fechaMilis}`);
document.write(`<br>La fecha parámetros cadena ${fechaCadena}`);
document.write(`<br>El mes ${fechaHoy.getMonth()+1} el día ${fechaHoy.getDate()} del año ${fechaHoy.getFullYear()}`);

//mostrar la fecha con diferentes formatos
document.write(`<br>La fecha de hoy con formato local ${fechaHoy.toLocaleDateString()}`);
document.write(`<br>La fecha de hoy con formato  ${fechaHoy.toLocaleString()}`);
document.write(`<br>La fecha de hoy con formato II ${fechaHoy.toDateString()}`);//formato universal
document.write(`<br>La hora con formato local ${fechaHoy.toLocaleTimeString()}`);

//operaciones con fecha; Sumar 20 días a la fecha actual

fechaHoy.setDate(fechaHoy.getDate()+20);
document.write(`<br>La fecha futura es: ${fechaHoy.toLocaleDateString()}`)

//restar dos fechas
diasResta=fechaHoy-new Date();
//Mostrar días
document.write(`<br>La fecha restada es: ${Math.round(diasResta/1000/60/60/24)} días`);


"use strict"
//Uso de express-validator

//Se importan las funciones que se utilizarán de express-validator.
//(no necesitamos utilizar toda la funcionalidad de la extensión)

import{check, validationResult} from 'express-validator'

//validacion contiene un array de funciones de middleware
//(cada llamada a check constituye una función de middleware)
export const validacion =[
  //Se comprueba que el campo nameCliente (ver el controlador addCliente) contenga un valor (no
  //sea undefined), no sea la cadena vacía y tenga una longitud de entre 5 y 40 caracteres.
  //Si no se cumple alguna de las reglas se enviará el mensaje especificado con withMessage.
  check ('nameCliente').exists().notEmpty().isLength({min:5, max:40}).withMessage('El nombre del Cliente no puede estar vacío y debe tener una longitud entre 5 y 40 caracteres'),

  //Se comprueba que el campo tlfnoCliente (ver el controlador addCliente) contenga un valor (no
  //sea undefined), no sea la cadena vacía, tenga una longitud de 9 caracteres y sea un valor numérico (no contenga valores
  //de texto)
  //Si no se cumple alguna de las reglas se enviará el mensaje especificado con withMessage.
  check ('tlfnoCliente').exists().notEmpty().isLength({min:9, max:9}).isNumeric().withMessage('El tlfno del cliente debe ser númerico y debe tener 12 caracteres'),

  //Se comprueba que el campo emailCliente (ver el controlador addCliente) contenga un valor (no
  //sea undefined) y que su formato responda a una dirección de correo válida.
  //Si no se cumple alguna de las reglas se enviará el mensaje especificado con withMessage.
  check ('emailCliente').exists().isEmail().withMessage("El email debe tener formato de email "),

  //Se comprueba que el campo empresaCliente (ver el controlador addCliente) contenga un valor (no
  //sea undefined), no sea la cadena vacía y que su formato sea una cadena que empiece por una
  //letra en mayúscula seguida de cualquier caracter alfanumérico o el separador de palabras y tenga
  //una longitud de entre 4 y 49 caracteres
  //Si no se cumple alguna de las reglas se enviará el mensaje especificado con withMessage.
    check ('empresaCliente').exists().notEmpty().matches(/^[A-Z][a-zA-Z0-9\s.]{4,49}$/).withMessage("El nombre de la empresa no puede contener caracteres especiales"),
    
  //Creamos una nueva función de middleware para comprobar si se ha producido algún error de validación.
  //Una función de middleware tiene acceso a los objetos request, response y next (siguiente función de middleware)
  //aunque estos parámetros no se especifiquen. En este caso, como sí necesitamos hacer uso de ellos, los pasamos
  //explícitamente.
    (req, res,next)=>{
      //La constante errores recibe un objeto Result que contiene el resultado de la validación
      //mediante llamada a la función validationResult. 
      //validationResult recibe como parámetro de entrada el objeto request
        const errors = validationResult(req);
        //Si el objeto Result NO está vacío es porque se ha producido algún error en la validación.
        if (!errors.isEmpty()) {
          //En ese caso, devolveremos un código de error y un objeto JSON con la lista de errores, a la cual
          //accedemos mediante la función array() del objeto Result.
          return res.status(400).json({ errors: errors.array() });
        } else {
          //Si no se ha producido ningún error en la validación, se pasa a la siguiente función de middleware, que
          //como podemos comprobar en el router, es el controlador correspondiente.
            next();
          }

    }
]

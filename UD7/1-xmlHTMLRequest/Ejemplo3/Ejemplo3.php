<?php
    //***************************************************** */
    //PHP: $_REQUEST es un array que contiene los parámetros de la solicitud. Los parámetros
    //constituyen un conjunto de pares clave-valor y puede accederse a ellos a través
    //de su clave.
    //En este caso, el script PHP requiere 2 parámetros:
    //- valor: una cadena con el método que se ha utilizado en la solicitud (POST O GET)
    //- nombre: una cadena con un nombre de usuario.
    //****************************************************** */
    //Si el parámetro valor (método que se va a utilizar) es POST...
    if($_REQUEST['valor']=='POST'){
        //...se muestra un mensaje utilizando el valor asociado al parámetro nombre.
    	echo "Hola ".$_REQUEST['nombre']. " ha pulsado el botón POST";
    }else{//..si no es POST, es GET y se muestra un mensaje utilizando el valor asociado al parámetro nombre
    	echo "Hola " .$_REQUEST['nombre']." ha pulsado el botón GET";
    }
?>
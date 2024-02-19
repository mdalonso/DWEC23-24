<?php

if ($_REQUEST['ca'] == 'Andalucia') {

    $capitales = array('Almeria', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla');
}
if ($_REQUEST['ca'] == 'Castilla La Mancha') {
    $capitales = array('Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo');
}
if ($_REQUEST['ca'] == 'Extremadura') {
    $capitales = array('Badajoz', 'Caceres');
}
//Tengo que decirle al objeto jqXHR en algún momento que lo que se está mandando es un json.
//puedo hacerlo en el php mediante la cabecera o bien en el JS mediante la opción dataType del método ajax()
// header('Content-type: application/json; charset=utf-8');
echo json_encode($capitales);
exit();
?>

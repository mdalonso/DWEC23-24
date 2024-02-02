<?php
//Este script php devuelve un archivo xml con las provincias de la comunidad autónoma
//que recibe como parámetro. Ese parámetro se llama "ca"

//Se crea un array con las provincias de la comunidad autónoma que se pasa como parámetro
if ($_REQUEST['ca']=='Andalucia')
{
  $capitales=array('Almeria','Cádiz','Córdoba','Granada','Huelva','Jaén', 'Málaga','Sevilla');
}
if ($_REQUEST['ca']=='Castilla La Mancha')
{
  $capitales=array('Albacete','Ciudad Real', 'Cuenca', 'Guadalajara','Toledo');
}
if ($_REQUEST['ca']=='Extremadura')
{
  $capitales=array('Badajoz', 'Caceres');
}

//Se crea un texto xml con las provincias almacenadas en el array.
$xml="<?xml version=\"1.0\"?>\n";
//. es el operador de concatenación. Se va creando el archivo xml en una variable, línea a línea
$xml.="<regiones>\n";
//El text xml incluye una línea por cada capital como hijos de un objeto <regiones></regiones>
for($f=0;$f<count($capitales);$f++)
{
  $xml.="<capital>".$capitales[$f]."</capital>\n";
}
$xml.="</regiones>\n";
//se indica al script que lo que se devuelve es texto plano en formato xml mediante una
//cabecera de respuesta HTTP.
header('Content-Type: text/xml');
//echo devuelve el texto xml
echo $xml;
?>

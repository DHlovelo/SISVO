<?php
// conexion.php - Conexión simple a la base de datos MySQL (SISVOV)
$host = "localhost";
$usuario = "root";
$password = "";
$base_datos = "sisvov_db";

$conexion = mysqli_connect($host, $usuario, $password, $base_datos);

if (!$conexion) {
    die("Error al conectar con la base de datos: " . mysqli_connect_error());
}

// Establecer conjunto de caracteres
mysqli_set_charset($conexion, "utf8");
?>

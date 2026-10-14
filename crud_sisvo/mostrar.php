<?php
    require_once __DIR__ . "/../config/sisvo_conexion.php";
$sql = "SELECT * FROM nuevo_usu";
$stmt = $conexion -> prepare($sql);
$stmt-> execute();

$estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
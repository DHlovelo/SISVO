<?php
// Activar visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/../config/sisvo_conexion.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit("Acceso no válido al formulario.");
}

try {
    // Captura segura de datos del formulario
    $nombre   = $_POST["nombre"] ?? '';
    $ci       = $_POST["ci"] ?? '';
    $phone    = $_POST["phone"] ?? '';
    $correo   = $_POST["email"] ?? '';
    $fena     = $_POST["fena"] ?? '';
    $password = $_POST["password"] ?? '';

    // Validar que no estén vacíos
    if (empty($nombre) || empty($ci) || empty($phone) || empty($correo) || empty($fena) || empty($password)) {
        die("Error: Todos los campos son obligatorios. <a href='cuenta_nueva.php'>Volver</a>");
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);    

    // Consulta SQL adaptada a tu tabla 'nuevo_usu'
    $sql = "INSERT INTO nuevo_usu (CI_usu, nombre_c_usu, telefono, correo, fecha_nacimiento, contrasena)
            VALUES (:ci, :nombre, :phone, :correo, :fena, :password)";

    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ":ci"       => $ci,
        ":nombre"   => $nombre,
        ":phone"    => $phone,
        ":correo"   => $correo,
        ":fena"     => $fena,
        ":password" => $passwordHash
    ]);

    echo "¡Cuenta creada y guardada exitosamente! <a href='cuenta_nueva.php'>Registrar otro usuario</a>";

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo "Error: El carnet (CI) o el correo electrónico ya se encuentran registrados. <a href='cuenta_nueva.php'>Intentar de nuevo</a>";
    } else {
        echo "Error de base de datos: " . $e->getMessage();
    }
}
?>
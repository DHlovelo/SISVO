<?php
/**
 * correo/mailer.php - Envío de correos para SISVO (PHPMailer + SMTP)
 *
 * Uso desde cualquier archivo PHP del proyecto:
 *   require_once __DIR__ . "/../correo/mailer.php";
 *   enviarCorreo("alguien@correo.com", "Nombre", "Asunto", "<p>Hola</p>");
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Busca "vendor" dentro de SISVO-main o una carpeta más arriba (sisvov/)
$rutasAutoload = [
    __DIR__ . "/../vendor/autoload.php",
    __DIR__ . "/../../vendor/autoload.php",
];
$autoloadEncontrado = false;
foreach ($rutasAutoload as $ruta) {
    if (file_exists($ruta)) {
        require_once $ruta;
        $autoloadEncontrado = true;
        break;
    }
}
if (!$autoloadEncontrado) {
    error_log("[SISVO mail] No se encontró vendor/autoload.php (¿falta composer require phpmailer/phpmailer?)");
}

/**
 * Envía un correo. Devuelve true si se envió, false si falló
 * (el detalle del error queda en el log de PHP, no se muestra al usuario).
 */
function enviarCorreo(
    string $destinatario,
    string $nombreDestino,
    string $asunto,
    string $cuerpoHtml,
    ?string $cuerpoTexto = null
): bool {
    if (!class_exists(PHPMailer::class)) {
        return false;
    }

    $cfg  = require __DIR__ . "/config_correo.php";
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $cfg['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $cfg['usuario'];
        $mail->Password   = $cfg['password'];
        $mail->SMTPSecure = $cfg['cifrado'];
        $mail->Port       = $cfg['puerto'];
        $mail->SMTPDebug  = $cfg['debug'] ?? 0;
        $mail->CharSet    = "UTF-8";

        $mail->setFrom($cfg['remitente_correo'], $cfg['remitente_nombre']);
        $mail->addAddress($destinatario, $nombreDestino);

        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body    = $cuerpoHtml;
        $mail->AltBody = $cuerpoTexto ?? trim(strip_tags($cuerpoHtml));

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("[SISVO mail] " . $mail->ErrorInfo);
        return false;
    }
}

/**
 * Plantilla HTML del correo de bienvenida.
 */
function plantillaBienvenida(string $nombre): string
{
    $nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');

    return "
    <div style='font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e5e5e5;border-radius:10px'>
        <h2 style='color:#2b4c7e;margin-top:0'>¡Bienvenido a SISVO, {$nombre}!</h2>
        <p>Tu cuenta fue creada correctamente.</p>
        <p>Ya puedes hacer el test vocacional, descubrir tu perfil y explorar
           instituciones y becas disponibles.</p>
        <p style='color:#888;font-size:12px;margin-bottom:0'>
           Si no creaste esta cuenta, ignora este mensaje.
        </p>
    </div>";
}
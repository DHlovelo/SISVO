<?php


if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) {
    http_response_code(403);
    exit("Solo disponible en localhost.");
}

require_once __DIR__ . "/mailer.php";

$to = $_GET['to'] ?? '';
if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
    exit("Agrega ?to=tucorreo@gmail.com al final de la dirección.");
}

$ok = enviarCorreo($to, "Prueba", "Prueba SISVO", plantillaBienvenida("Prueba"));

echo $ok
    ? "✅ Correo enviado a " . htmlspecialchars($to) . ". Revisa tu bandeja (y spam)."
    : "❌ No se pudo enviar. Pon 'debug' => 2 en correo/config_correo.php y vuelve a abrir esta página.";

<?php
/**
 * Datos del correo que ENVÍA los mensajes. Cambia solo las 3 líneas marcadas con  <-- CAMBIAR
 *
 * Para Gmail necesitas una "Contraseña de aplicación" (NO tu contraseña normal):
 *   https://myaccount.google.com/apppasswords
 *
 * IMPORTANTE: no subas este archivo a GitHub con tu contraseña real escrita.
 */
return [
    'host'             => 'smtp.gmail.com',
    'puerto'           => 587,
    'cifrado'          => 'tls',
    'usuario'          => 'sisvovpruebas@gmail.com',      // <-- CAMBIAR (tu Gmail)
    'password'         => 'qnwnuemdvpikfwwq',         // <-- CAMBIAR (clave de 16 letras, sin espacios)
    'remitente_correo' => 'sisvovpruebas@gmail.com',      // <-- CAMBIAR (el mismo Gmail)
    'remitente_nombre' => 'SISVO',
    'debug'            => 0,   // pon 2 si algo falla, para ver el motivo
];
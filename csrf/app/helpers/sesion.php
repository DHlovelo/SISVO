<?php

if (!defined('SESION_INACTIVIDAD')) {
    define('SESION_INACTIVIDAD', 1800);
}

if (!function_exists('es_https')) {
    function es_https(): bool
    {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['SERVER_PORT'] ?? '') == 443);
    }
}

if (!function_exists('iniciar_sesion_segura')) {
    function iniciar_sesion_segura(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }
        ini_set('session.use_strict_mode', '1');   
        ini_set('session.use_only_cookies', '1'); 
        ini_set('session.use_trans_sid', '0');

        session_name('SISVOVSESSID');
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => (base_uri() ?: '') . '/',
            'httponly' => true,       
            'samesite' => 'Lax',      
            'secure'   => es_https(), 
        ]);
        session_start();

        $ahora = time();
        if (isset($_SESSION['ultima_actividad']) && ($ahora - $_SESSION['ultima_actividad']) > SESION_INACTIVIDAD) {
            session_unset();
            session_regenerate_id(true);
            if (function_exists('flash')) {
                flash('error', 'Tu sesión expiró por inactividad. Ingresa de nuevo.');
            }
        }
        $_SESSION['ultima_actividad'] = $ahora;
    }
}

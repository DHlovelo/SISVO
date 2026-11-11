<?php

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_field(): string{
    return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') . '">';
}

function csrf_meta(): string{
    return '<meta name="csrf-token" content="' . htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') . '">';
}

function csrf_valido(): bool{
    $guardado = $_SESSION['csrf_token'] ?? '';
    $recibido = $_POST['csrf_token'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');

    return is_string($guardado) && is_string($recibido)
        && $guardado !== '' && $recibido !== ''
        && hash_equals($guardado, $recibido);
}

function csrf_exigir(): void{
    if (!csrf_valido()) {
        http_response_code(403);
        exit('Solicitud no válida (token de seguridad incorrecto o vencido). Vuelve atrás, recarga la página e inténtalo de nuevo.');
    }
}

function csrf_rotar(): void{
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

?>
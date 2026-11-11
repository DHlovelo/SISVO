<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once __DIR__ . '/../app/helpers.php';
require_once __DIR__ . '/../app/helpers/sesion.php';
require_once __DIR__ . '/../app/helpers/csrf.php';

iniciar_sesion_segura();

$routes = require __DIR__ . '/../routes/web.php';

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = str_replace('/public', '', dirname($_SERVER['SCRIPT_NAME']));
if ($basePath !== '/' && strpos($path, $basePath) === 0) {
    $path = substr($path, strlen($basePath));
}
if ($path === '' || $path === false) $path = '/';

foreach ($routes as $r) {
    if ($r['method'] === $method && $r['path'] === $path) {

        if ($method === 'POST') {
            csrf_exigir();
        }

        [$controller, $action] = explode('@', $r['target']);
        require_once __DIR__ . '/../app/Controllers/' . $controller . '.php';
        $c = new $controller();
        $c->$action();
        exit;
    }
}

http_response_code(404);
echo "404 - Página no encontrada";


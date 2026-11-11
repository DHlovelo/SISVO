<?php
function require_login() {
    if (empty($_SESSION['usuario'])) {
        header("Location: " . url('login'));
        exit();
    }
}

?>

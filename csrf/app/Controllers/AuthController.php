<?php
class AuthController
{
    public function login()
    {
        require __DIR__ . '/../../views/auth/login.php';
    }

    public function authenticate()
    {
        
        header("Location: " . url('test'));
        exit();
    }

    public function registro()
    {
        require __DIR__ . '/../../views/auth/registro.php';
    }

    public function store()
    {
        
        header("Location: " . url('login'));
        exit();
    }

    public function logout()
    {
        session_destroy();
        header("Location: " . url('login'));
        exit();
    }
}

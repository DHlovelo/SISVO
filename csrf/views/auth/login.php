<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión - SISVOV</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= asset('css/usuario.css') ?>">
</head>
<body>

    <div class="welcome-text">
        <h2 style="font-family: 'Times New Roman', Times, serif;">bienvenido a <br><i>SISVOV</i></h2>
        <p>Descubre tu verdadera vocacion</p>
    </div>

    <div class="register-box">
        <h3>Iniciar sesión</h3>

        <form action="<?= url('login') ?>" method="POST">
            <?= csrf_field() ?>

            <div class="input-group">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="@" required>
            </div>

            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required>
            </div>

            <button type="submit" class="register-btn"><span>ingresar</span></button>
        </form>

        <div class="login-footer">
            <p>no tienes una cuenta aun? <a href="<?= url('registro') ?>">crea aqui</a></p>
        </div>
    </div>

    <?php if (!empty($_SESSION['error'])): ?>
        <div class="alert alert-danger mt-3"><?= htmlspecialchars($_SESSION['error']) ?></div>
        <?php unset($_SESSION['error']); ?>
    <?php endif; ?>

</body>
</html>

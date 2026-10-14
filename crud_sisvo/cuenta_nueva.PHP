<?php
// Incluimos la conexión desde la  conexion/ usando la ruta relativa
require_once __DIR__ . "/../config/sisvo_conexion.php";

$sql = "SELECT * FROM nuevo_usu";
$resultado = $conexion->query($sql);
$usuarios = $resultado->fetchAll(PDO::FETCH_ASSOC); 
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISVO - Crear Cuenta</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Subimos un nivel para encontrar la carpeta css/ -->
    <link rel="stylesheet" href="../css/nuevo_usu.css">
</head>
<body>

    <div class="welcome-text">
        <h2>SISVO</h2>
        <p>Crea tu cuenta para poder descubrir tu verdadera vocacion</p>
    </div>

    <div class="register-box">
        <h3>Crear Cuenta</h3>
        
        <!-- Apunta a insertar.php que está en la misma carpeta crud_sisvo -->
        <form action="insertar.php" method="POST">
            <div class="form-grid">

                <div class="input-group full-width">
                    <label for="nombre">Nombre completo</label>
                    <input type="text" id="nombre" name="nombre" placeholder="nombres y apellidos" required>
                </div>

                <div class="input-group">
                    <label for="ci">Cedula de Identidad</label>
                    <input type="text" id="ci" name="ci" placeholder="CI" required>
                </div>

                <div class="input-group">
                    <label for="phone">Telefono</label>
                    <input type="tel" id="phone" name="phone" placeholder="telf" required>
                </div>

                <div class="input-group full-width">
                    <label for="email">Correo electronico</label>
                    <input type="email" id="email" name="email" placeholder="@" required>
                </div>

                <div class="input-group">
                    <label for="fena">Fecha de nacimiento</label>
                    <input type="date" id="fena" name="fena" required>
                </div>

                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>

            </div>
            
            <!-- Botón adaptado para enviar el formulario manteniendo intacto tu CSS -->
            <button type="submit" class="register-btn">
                <a href="#" onclick="event.preventDefault(); this.closest('form').submit();">Registrarse</a>
            </button>
        </form>
        
        <div class="login-footer">
            <p>ya tienes una cuenta? <a href="#">Inicia aquí</a></p>
        </div>
    </div>

    <!-- Sección de la lista de usuarios (siguiendo el patrón del CRUD de la escuela) -->
    <div style="width: 80%; max-width: 900px; margin: 40px auto; background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h3 style="margin-bottom: 15px; color: #333;">Lista de Usuarios Registrados</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: #f4f6f8; color: #333;">
                    <th>Cédula (CI)</th>
                    <th>Nombre Completo</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Fecha de Nacimiento</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($usuarios)): ?>
                    <?php foreach ($usuarios as $usuario): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($usuario["CI_usu"]); ?></td>
                            <td><?php echo htmlspecialchars($usuario["nombre_c_usu"]); ?></td>
                            <td><?php echo htmlspecialchars($usuario["telefono"]); ?></td>
                            <td><?php echo htmlspecialchars($usuario["correo"]); ?></td>
                            <td><?php echo htmlspecialchars($usuario["fecha_nacimiento"]); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5" style="text-align: center; color: #777;">No hay usuarios registrados.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

</body>
</html>
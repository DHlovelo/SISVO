-- Base de Datos SISVOV (Segundo Semestre Web)
CREATE DATABASE IF NOT EXISTS sisvov_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sisvov_db;

-- Tabla de Instituciones
CREATE TABLE IF NOT EXISTS instituciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    sigla VARCHAR(30) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    url_oficial VARCHAR(255) NOT NULL
);

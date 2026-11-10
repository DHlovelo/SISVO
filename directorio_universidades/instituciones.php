<?php
include("conexion.php");

// Consulta para verificar o listar instituciones desde la base de datos si se requiere
$sql = "SELECT * FROM instituciones ORDER BY tipo ASC";
$resultado = mysqli_query($conexion, $sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SISVOV - Directorio Académico Completo La Paz y El Alto</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos_directorio.css">
</head>
<body>

    <!-- Menú de navegación principal -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.php">SISVOV</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavegacion">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menuNavegacion">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="usuario.php">Registro</a></li>
                    <li class="nav-item"><a class="nav-link" href="test.php">Test Vocacional</a></li>
                    <li class="nav-item"><a class="nav-link active" href="instituciones.php">Directorio</a></li>
                    <li class="nav-item"><a class="nav-link" href="resultado.php">Resultados</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container py-4">
        
        <div class="text-center mb-4">
            <h1 class="h3 fw-bold text-dark">Directorio Completo de Educación Superior y Técnica</h1>
            <p class="text-muted">Universidades, Institutos Tecnológicos, Comerciales y Academias con sede en La Paz y El Alto.</p>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>Institución Educativa</th>
                                <th>Tipo / Nivel</th>
                                <th>Sede / Ubicación</th>
                                <th class="text-center">Enlace Directo</th>
                            </tr>
                        </thead>
                        <tbody>

                            <!-- 1. UNIVERSIDADES PÚBLICAS Y PRIVADAS -->
                            <tr class="table-light">
                                <td colspan="4" class="fw-bold text-primary border-bottom border-primary">
                                    1. UNIVERSIDADES PÚBLICAS Y PRIVADAS
                                </td>
                            </tr>
                            <tr>
                                <td><strong>UMSA</strong> - Universidad Mayor de San Andrés</td>
                                <td><span class="badge bg-primary">Pública / Autónoma</span></td>
                                <td>Monoblock, Sopocachi, Miraflores (La Paz)</td>
                                <td class="text-center"><a href="https://www.umsa.bo" target="_blank" class="btn btn-sm btn-primary">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UPEA</strong> - Universidad Pública de El Alto</td>
                                <td><span class="badge bg-primary">Pública / Autónoma</span></td>
                                <td>Villa Esperanza (El Alto)</td>
                                <td class="text-center"><a href="https://www.upea.bo" target="_blank" class="btn btn-sm btn-primary">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UCB</strong> - Universidad Católica Boliviana "San Pablo"</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Obrajes / Calacoto (La Paz)</td>
                                <td class="text-center"><a href="https://www.ucb.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UNIVALLE</strong> - Universidad del Valle</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Miraflores / Calacoto (La Paz)</td>
                                <td class="text-center"><a href="https://www.univalle.edu" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UNIFRANZ</strong> - Universidad Franz Tamayo</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Landaeta (La Paz) / San Martín (El Alto)</td>
                                <td class="text-center"><a href="https://unifranz.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>EMI</strong> - Escuela Militar de Ingeniería</td>
                                <td><span class="badge bg-success">Privada / Militar</span></td>
                                <td>Alto Irpavi / Av. Arce (La Paz)</td>
                                <td class="text-center"><a href="https://www.emi.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UPB</strong> - Universidad Privada Boliviana</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Achocalla (La Paz)</td>
                                <td class="text-center"><a href="https://www.upb.edu" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>USB</strong> - Universidad Salesiana de Bolivia</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Achachicala (La Paz)</td>
                                <td class="text-center"><a href="https://www.salesiana.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ULP</strong> - Universidad La Salle</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Bajo Llojeta (La Paz)</td>
                                <td class="text-center"><a href="https://www.ulasalle.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>UDABOL</strong> - Universidad Aquino de Bolivia</td>
                                <td><span class="badge bg-success">Privada</span></td>
                                <td>Sopocachi (La Paz)</td>
                                <td class="text-center"><a href="https://www.udabol.edu.bo" target="_blank" class="btn btn-sm btn-success">Sitio Oficial &rarr;</a></td>
                            </tr>

                            <!-- 2. INSTITUTOS TÉCNICOS Y TECNOLÓGICOS -->
                            <tr class="table-light">
                                <td colspan="4" class="fw-bold text-warning text-dark border-bottom border-warning">
                                    2. INSTITUTOS TÉCNICOS Y TECNOLÓGICOS (PÚBLICOS Y PRIVADOS)
                                </td>
                            </tr>
                            <tr>
                                <td><strong>INCOS La Paz</strong> - Instituto Comercial Superior</td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Técnico Sup.</span></td>
                                <td>Av. Montes (La Paz)</td>
                                <td class="text-center"><a href="https://incoslapaz.edu.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>INCOS El Alto</strong> - Instituto Comercial Superior</td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Técnico Sup.</span></td>
                                <td>Zona Central (El Alto)</td>
                                <td class="text-center"><a href="https://incoselalto.edu.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ITS Pedro Domingo Murillo</strong></td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Tecnológico</span></td>
                                <td>Achachicala (La Paz)</td>
                                <td class="text-center"><a href="https://www.itspdm.edu.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>INFOCAL La Paz / El Alto</strong></td>
                                <td><span class="badge bg-warning text-dark">Convenio / Técnico</span></td>
                                <td>Miraflores (La Paz) / Villa Adela (El Alto)</td>
                                <td class="text-center"><a href="https://infocal-lapaz.edu.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ITSA</strong> - Instituto Tecnológico Ayacucho</td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Tecnológico</span></td>
                                <td>Plaza San Francisco (La Paz)</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ITSA El Alto</strong> - Instituto Tecnológico Brasil Bolivia</td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Tecnológico</span></td>
                                <td>Ciudad Satélite (El Alto)</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ITSA Puerto de Mejillones</strong></td>
                                <td><span class="badge bg-warning text-dark">Fiscal / Tecnológico</span></td>
                                <td>Ciudad Satélite (El Alto)</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-warning text-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>INSTITUTO ATENEA</strong></td>
                                <td><span class="badge bg-secondary">Privado / Técnico Sup.</span></td>
                                <td>Sopocachi (La Paz)</td>
                                <td class="text-center"><a href="https://atenea.edu.bo" target="_blank" class="btn btn-sm btn-secondary">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>CATEC La Paz</strong> - Centro de Formación Técnica</td>
                                <td><span class="badge bg-secondary">Privado / Técnico Sup.</span></td>
                                <td>Zona Central (La Paz)</td>
                                <td class="text-center"><a href="https://catec.edu.bo" target="_blank" class="btn btn-sm btn-secondary">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>INSTITUTO AIG</strong> - Academia de Informática y Gastronomía</td>
                                <td><span class="badge bg-secondary">Privado / Técnico</span></td>
                                <td>El Alto / La Paz</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-secondary">Sitio Oficial &rarr;</a></td>
                            </tr>

                            <!-- 3. ACADEMIAS Y ESCUELAS ESPECIALIZADAS -->
                            <tr class="table-light">
                                <td colspan="4" class="fw-bold text-danger border-bottom border-danger">
                                    3. ACADEMIAS Y ESCUELAS DE FORMACIÓN ESPECIALIZADA
                                </td>
                            </tr>
                            <tr>
                                <td><strong>ESFM Simón Bolívar</strong> (Escuela de Maestros)</td>
                                <td><span class="badge bg-danger">Normalista / Docencia</span></td>
                                <td>Alto Obrajes (La Paz)</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-danger">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ESFM Tecnológico FE Y ALEGRÍA</strong></td>
                                <td><span class="badge bg-danger">Convenio / Docencia</span></td>
                                <td>El Alto / La Paz</td>
                                <td class="text-center"><a href="https://feyalegria.org.bo" target="_blank" class="btn btn-sm btn-danger">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ANAPOL</strong> - Academia Nacional de Policías</td>
                                <td><span class="badge bg-dark">Policial / Formación</span></td>
                                <td>Bajo Següencoma (La Paz)</td>
                                <td class="text-center"><a href="https://anapol.edu.bo" target="_blank" class="btn btn-sm btn-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>COLMIL</strong> - Colegio Militar del Ejército</td>
                                <td><span class="badge bg-dark">Militar / Formación</span></td>
                                <td>Irpavi (La Paz)</td>
                                <td class="text-center"><a href="https://colmil.edu.bo" target="_blank" class="btn btn-sm btn-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>EMSE</strong> - Escuela Militar de Música del Ejército</td>
                                <td><span class="badge bg-dark">Militar / Música</span></td>
                                <td>Viacha / La Paz</td>
                                <td class="text-center"><a href="https://ejercito.bo" target="_blank" class="btn btn-sm btn-dark">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>Conservatorio Plurinacional de Música</strong></td>
                                <td><span class="badge bg-danger">Academia de Música</span></td>
                                <td>Calle Reyes Ortiz (La Paz)</td>
                                <td class="text-center"><a href="https://conservatorio.edu.bo" target="_blank" class="btn btn-sm btn-danger">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>ANBA</strong> - Academia Nacional de Bellas Artes</td>
                                <td><span class="badge bg-danger">Artes Plásticas</span></td>
                                <td>Calle Rosendo Gutiérrez (La Paz)</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-danger">Sitio Oficial &rarr;</a></td>
                            </tr>
                            <tr>
                                <td><strong>Escuela Boliviana Intercultural de Danza (EBID)</strong></td>
                                <td><span class="badge bg-danger">Arte y Danza</span></td>
                                <td>La Paz</td>
                                <td class="text-center"><a href="https://minedu.gob.bo" target="_blank" class="btn btn-sm btn-danger">Sitio Oficial &rarr;</a></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <!-- Pie de página -->
    <footer class="bg-dark text-white text-center py-3 mt-4">
        <p class="mb-0 small">SISVOV - Proyecto de Programación Web I &copy; 2026</p>
    </footer>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php
include_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $objeto = new Conexion();
    // Conexion::Conectar()
    $conexion = $objeto->Conectar();

    $_POST = json_decode(file_get_contents("php://input"), true);

    function permisos()
    {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Credentials: true');
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
            exit(0);
        }
    }

    permisos();

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
    $id = (isset($_POST['id'])) ? $_POST['id'] : '';
    $description = (isset($_POST['description'])) ? $_POST['description'] : '';
    $price = (isset($_POST['price'])) ? $_POST['price'] : '';
    $stock = (isset($_POST['stock'])) ? $_POST['stock'] : '';

    switch ($opcion) {
        case 1:
            $consulta = "SELECT id, description, price, stock FROM articulos";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2:
            $consulta = "INSERT INTO articulos (description, price, stock) VALUES('$description', '$price', '$stock') ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            break;
        case 3:
            $consulta = "UPDATE articulos SET description='$description', price='$price', stock='$stock' WHERE id='$id' ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 4:
            $consulta = "DELETE FROM articulos WHERE id='$id' ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            break;
        default:
            break;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    $conexion = NULL;
} else {
    exit();
}

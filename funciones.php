<?php
require_once '_dbcupones.php';
require_once 'database.php';
require_once '_dbgastos.php';
require_once '_dbtanda.php';

 if ($_POST) {
     switch ($_POST["accion"]) {
        case 'insertarRegistro':
            insertarRegistro();
        break;
        case 'validarCupon':
            validarCupon();
        break;
        case 'insertarEnTabla':
            insertarEnTabla();
        break;
        default:
            # code...
            break;
     }
 }
    function insertarRegistro(){
        global $db;
        global $mysqli;
        extract($_POST);
        $UserName=json_decode($UserName);
        $UserLastname=json_decode($UserLastname);
        $UserPassword=json_decode($UserPassword);
        $UserEmail=json_decode($UserEmail);
        $UserPhone=json_decode($UserPhone);
        $PlanId=json_decode($PlanId);

        $UserCreated= strftime("%y-%m-%d %H:%M:%S");
        $UserSerial = rand(111111, 999999);
        $respuesta = [];
        $UserName = $_POST['UserName'];
        $UserLastname = $_POST['UserLastname'];
        $UserPassword = $_POST['UserPassword'];
        $UserEmail = $_POST['UserEmail'];
        $UserPhone = $_POST['UserPhone'];
        $PlanId = $_POST['PlanId'];

        if (empty($UserName) && empty($UserLastname) && empty($UserPassword) && empty($UserSerial) && empty($UserEmail) && empty($UserPhone) && empty($PlanId)) {
             $respuesta["status"] = 0;

        }else{

            $db->insert("User",[
                 "UserName" => $UserName,
                 "UserLastname" => $UserLastname,
                 "UserPassword" => $UserPassword,
                 "UserSerial" => $UserSerial,
                 "UserEmail" => $UserEmail,
                 "UserPhone" => $UserPhone,
                 "UserCreated" => $UserCreated,
                 "UserStatus" => 0,
                 "UserEnable" => 0,
                 "PlanId" => $PlanId,
                 "LevelId" => 0
             ]);
             $respuesta["status"] = 1;

        }
        echo json_encode($respuesta);
}

function validarCupon(){
    global $db;
    extract($_POST);
    $consulta = $db->select('Coupon','*',['CouponCode'=>$codigo]);
    $respuesta = [];
    if($consulta){
        $respuesta = $consulta;
        $respuesta[0]["status"] = 1;
    } else {
        $respuesta[0]["status"] = 0;
    }
    echo json_encode($respuesta);
}

function insertarEnTabla(){
    extract($_POST);
    if($whereTo == 'gastos'){
        global $dbms;
        $dbms->insert('usuarios',[
            "nombre_usr" => $UserName.' '.$UserLastname,
            "password_usr" => $UserPassword,
            "key_usr" => $UserSerial,
            "correo_usr" => $UserEmail,
            "status_usr" => 0,
            "id_plan" => $PlanId,
            "fecha_alta" => $fechaAlta,
            "fecha_baja" => $fechaBaja,
            "id_niv" => 1
        ]);
        $respuesta["status"] = 1;
    } else if($whereTo == 'damda'){
        global $dbt;
        $dbt->insert("User",[
            "UserName" => $UserName,
            "UserLastname" => $UserLastname,
            "UserPassword" => $UserPassword,
            "UserSerial" => $UserSerial,
            "UserEmail" => $UserEmail,
            "UserPhone" => $UserPhone,
            "UserCreated" => $UserCreated,
            "UserStatus" => 0,
            "UserEnable" => 0,
            "PlanId" => $PlanId,
            "LevelId" => 0
        ]);
        $respuesta['status'] = 1;
    } else {
        $respuesta['status'] = 0;
    }
    echo json_encode($respuesta);
}
?>
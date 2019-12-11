<?php
require_once '_dbcupones.php';
require_once 'database.php';

 if ($_POST) {
     switch ($_POST["accion"]) {
        case 'insertarRegistro':
            insertarRegistro();
        break;
        case 'validarCupon':
            validarCupon();
        break;
        case 'login':
            login();
        break;
        case 'couponToUser':
            couponToUser();
        break;
        // case 'insertarEnTabla':
        //     insertarEnTabla();
        // break;
        default:
            # code...
            break;
     }
 }
    function insertarRegistro(){
        global $db;
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

        if (empty($UserName) || empty($UserLastname) || empty($UserPassword) || empty($UserSerial) || empty($UserEmail) || empty($UserPhone) || empty($PlanId)) {
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
    global $dbcupones;
    extract($_POST);
    $consulta = $dbcupones->select('Coupon','*',['CouponCode'=>$codigo]);
    $respuesta = [];
    if($consulta){
        $respuesta = $consulta;
        $respuesta[0]["status"] = 1;
    } else {
        $respuesta[0]["status"] = 0;
    }
    echo json_encode($respuesta);
}

function login(){
    global $db;
    extract($_POST);
    $consulta = $db->get('User','*',['UserEmail'=>$UserEmail, 'UserPassword'=>$UserPassword]);
    $respuesta = [];
    if($consulta){
        $respuesta = $consulta;
        $respuesta["status"] = 1;
    } else {
        $respuesta["status"] = 0;
    }
    echo json_encode($respuesta);
}

function couponToUser(){
    global $db;
    extract($_POST);
    $respuesta = [];
    $consulta = $db->insert('CouponsWithUsers', [
        'UserSerial'=>$UserSerial,
        'CouponCode'=>$CouponCode
    ]);
    if($consulta){
        $respuesta["status"] = 1;
    } else {
        $respuesta["status"] = 0;
    }
    echo json_encode($respuesta);
}

?>
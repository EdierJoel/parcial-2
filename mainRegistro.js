$(document).ready(function() {
  var obj = {};

  $('#enviar').click(function(){
    obj = {
      accion: 'validarCupon'
    };
    let codigo = $('input[name=codigo]').val();
    let plan = $('select[name=plan] option:selected').val();
    let empresa = $('select[name=empresa] option:selected').val();
    if (
      codigo == '' ||
      plan == '' ||
      empresa == ''
    ){
      $('#mensajeFormularioCupones').text('Ingrese datos válidos');
    } else {
      obj['codigo'] = codigo;
      obj['plan'] = plan;
      obj['empresa'] = empresa;
      // IQK04YEW
      $('#mensajeFormularioCupones').text('');
      console.log(obj);
      $.post('funciones.php', obj, function(r){
        if(r[0].status == 0){
          $('#mensajeFormularioCupones').text('El código ingresado no existe.');
        } else if(r[0].status == 1){
          $('#mensajeFormularioCupones').text('El código ingresado sí existe.');
          let fecha_inicio = r[0]['CouponStart_Date'];
          let fecha_fin = r[0]['CouponEnd_Date'];
          let fecha_hoy = new Date();
          let fi = fecha_inicio.split('-').join('/');
          let ff = fecha_fin.split('-').join('/');
          let hoy = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
          // console.log(fi, ff, hoy);
          // console.log(hoy > fi && hoy < ff);
          if(r[0]['CouponPlatform'].includes(empresa) && (hoy >= fi && hoy <= ff)){
            let emp = null;
            if(empresa == 'T'){
              emp = 'Tanda';
            } else if(empresa == 'G'){
              emp = 'Gasto'
            } else if (empresa == 'C'){
              emp = 'Cañones'
            }
            $('#mensajeFormularioCupones').text('Cupón válido para '+ emp);
          } else if(!(hoy >= fi && hoy <= ff)){
            $('#mensajeFormularioCupones').text('El código ingresado ha expirado!');
          }else{
            $('#mensajeFormularioCupones').text('El código ingresado no es válido para la aplicación elegida.');
          }
        }
      }, "JSON");
    }
  });

  $("#btnRegistrar").click(function() {
    obj = {
      accion: "insertarRegistro"
    };
  
  });

  $("#btnRegistrar").click(function() {
    obj["UserName"] = $("#UserName").val();
    obj["UserLastname"] = $("#UserLastname").val();
    obj["UserPassword"] = $("#UserPassword").val();
    obj["UserEmail"] = $("#UserEmail").val();
    obj["UserPhone"] = $("#UserPhone").val();
    obj["PlanId"] = $("#PlanId").val();

    switch (obj.accion) {
      case "insertarRegistro":
        $.post(
          "funciones.php",
          obj,
          function(respuesta) {
            if (respuesta.status == 0) {
            } else if (respuesta.status == 1) {
              location.reload();
            } else {
              errorAlert();
            }
          },
          "JSON"
        );
        break;
      default:
        break;
    }
  });

  $('#btnRegistrarDamda').click(function(){
    let fecha_hoy = new Date();
    let hoy = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
    obj['accion'] = 'insertarEnTabla';
    obj['whereTo'] = 'damda';
    obj['UserName'] = $('#UserNameDamda').val();
    obj['UserLastname'] = $('#UserLastnameDamda').val();
    obj['UserPassword'] = $('#UserPasswordDamda').val();
    obj['UserEmail'] = $('#UserEmailDamda').val();
    obj['UserPhone'] = $('#UserPhoneDamda').val();
    obj['UserCreated'] = hoy;
    obj['PlanId'] = $('#PlanIdDamda option:selected').val();
    String.random = function(lenght){
      let random13chars = function(){
        return Math.random().toString(16).substring(2,15);
      }
      let loops = Math.ceil(lenght/13);
      return new Array(loops).fill(random13chars).reduce((string, func)=>{
        return string + func()
      }, '').substring(0, lenght);
    }
    obj['UserSerial'] = String.random(6);
    $.post('funciones.php',obj,function(r){
      if(r.status == 1){
        $('#mensajeDamda').text('Solicitud enviada correctamente!');
        $('#formDamda')[0].reset();
      } else {
        $('#mensajeDamda').text('error.');
      }
    }, "JSON");
  });

  $('#btnRegistrarGastos').click(function(){
    let fecha_hoy = new Date();
    let hoy = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
    obj['accion'] = 'insertarEnTabla';
    obj['whereTo'] = 'gastos';
    obj['UserName'] = $('#UserNameGastos').val();
    obj['UserLastname'] = $('#UserLastnameGastos').val();
    obj['UserPassword'] = $('#UserPasswordGastos').val();
    obj['UserEmail'] = $('#UserEmailGastos').val();
    obj['UserPhone'] = $('#UserPhoneGastos').val();
    obj['PlanId'] = $('#PlanIdGastos option:selected').val();
    obj['fechaAlta'] = hoy;
    String.random = function(lenght){
      let random13chars = function(){
        return Math.random().toString(16).substring(2,15);
      }
      let loops = Math.ceil(lenght/13);
      return new Array(loops).fill(random13chars).reduce((string, func)=>{
        return string + func()
      }, '').substring(0, lenght);
    }
    // console.log(String.random(10));
    obj['UserSerial'] = String.random(10);
    let vigencia = fecha_hoy.setDate(fecha_hoy.getDate() + 15);
    vigencia = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
    obj['fechaBaja'] = vigencia;
    $.post('funciones.php',obj,function(r){
      if(r.status == 1){
        $('#mensajeGastos').text('Solicitud enviada correctamente!');
        $('#formGastos')[0].reset();
      } else {
        $('#mensajeGastos').text('error.');
      }
    }, "JSON");
  });

  $("#btn-cancel").click(function() {
    $("#myBtn").show();
  });
});
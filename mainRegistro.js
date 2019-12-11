$(document).ready(function() {
  var obj = {};
  $('#modallogin-registrolink').click(function(e){
    e.preventDefault();
    $('#modallogin-form').hide();
    $('#modallogin-registro').show();
    $('#modallogin-title, #modallogin-submit').text('Registrarse');
    $('#modallogin-submit').attr('data-check', 'registro');
  });
  $('#modallogin-loginlink').click(function(e){
    e.preventDefault();
    $('#modallogin-form').show();
    $('#modallogin-registro').hide();
    $('#modallogin-title, #modallogin-submit').text('Canjear cupón');
    $('#modallogin-submit').attr('data-check', 'login');
  });
  $('#modallogin-submit').on("click", function(){
    let what = $(this).data('check');
    console.log(what);
    let obj = {};
    switch(what){
      case 'registro':
        obj = {};
        obj["accion"] = 'insertarRegistro';
        obj["UserName"] = $("#UserNameModalLogin").val();
        obj["UserLastname"] = $("#UserLastnameModalLogin").val();
        obj["UserPassword"] = $("#UserPasswordModalLogin").val();
        obj["UserEmail"] = $("#UserEmailModalLogin").val();
        obj["UserPhone"] = $("#UserPhoneModalLogin").val();
        obj["PlanId"] = $("#PlanIdModalLogin option:selected").val();
        let fecha_hoy = new Date();
        let hoy = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
        obj["UserCreated"] = hoy;
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
        $.post("funciones.php", obj, function(r){
          if(r.status == 1){
            $('#showmessage').html('<span class="text-success">Se ha registrado correctamente.</span>');
            $('#modallogin-registro')[0].reset();
            if(typeof Cookies.get('cuponSet') !== "undefined"){
              Cookies.remove('cuponSet');
            }
            if(typeof Cookies.get('userSerialForCoupon') !== "undefined"){
              Cookies.remove('userSerialForCoupon');
            }
          } else {
            $('#showmessage').html('<span class="text-danger">Ha ocurrido algo inesperado. Intente nuevamente.</span>');
          }
        }, "JSON");
        break;
      case 'login':
        obj = {};
        let u = $('#UserEmailLogin').val();
        let p = $('#UserPasswordLogin').val();
        obj = {
          accion: 'login',
          UserEmail: u,
          UserPassword: p
        };
        $.post('funciones.php', obj, function(r){
          Cookies.set('userSerialForCoupon', r.UserSerial);
          if(r.status == 1){
            if(typeof Cookies.get('cuponSet') === 'undefined' || typeof Cookies.get('userSerialForCoupon') === 'undefined'){
              $('#showmessage').html('<span class="text-danger">Ocurrió un error. Actualice la página e intente nuevamente.</span>');
            } else {
              obj = {};
              obj = {
                accion: 'couponToUser',
                UserSerial: Cookies.get('userSerialForCoupon'),
                CouponCode: Cookies.get('cuponSet')
              }
              $.post('funciones.php', obj, function(res){
                if(res.status == 0){
                  $('#showmessage').html('<span class="text-danger">No se pudo agregar tu cupón. Intenta nuevamente.</span>');
                } else {
                  $('#showmessage').html('<span class="text-success">El cupón se agregó a tu cuenta.</span>');
                  Cookies.remove('userSerialForCoupon');
                  Cookies.remove('cuponSet');
                  $('#modallogin-form')[0].reset();
                }
              }, "JSON");
            }
          } else {
            $('#showmessage').html('<span class="text-danger">No se encontró la cuenta ingresada.</span>');
          }
        }, "JSON");
          break;
        default:
          break;
    }
  });
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
      $('#mensajeFormularioCupones').text('');
      // console.log(obj);
      $.post('funciones.php', obj, function(r){
        if(r[0].status == 0){
          $('#mensajeFormularioCupones').text('El código ingresado no existe.');
        } else if(r[0].status == 1){
          Cookies.set('cuponSet', r[0]['CouponCode']);
          $('#mensajeFormularioCupones').text('El código ingresado sí existe.');
          let fecha_inicio = r[0]['CouponStart_Date'];
          let fecha_fin = r[0]['CouponEnd_Date'];
          let fecha_hoy = new Date();
          let fi = fecha_inicio.split('-').join('/');
          let ff = fecha_fin.split('-').join('/');
          let hoy = fecha_hoy.getFullYear() + '/' + (fecha_hoy.getMonth() + 1) + '/' + fecha_hoy.getDate();
          let comienzo = new Date(fi);
          let expiracion = new Date(ff);
          let today = new Date(hoy);
          // console.log(fi, ff, hoy);
          // console.log(hoy > fi && hoy < ff);
          // console.log(comienzo, expiracion, today);
          // console.log(today >= comienzo && today <= expiracion);
          if(r[0]['CouponPlatform'].includes(empresa) && r[0]['CouponPlan'].includes(plan) && (today >= comienzo && today <= expiracion)){
            let emp = null;
            if(empresa == 'T'){
              emp = 'Tanda';
            } else if(empresa == 'G'){
              emp = 'Gasto'
            } else if (empresa == 'C'){
              emp = 'Cañones'
            }
            $('#mensajeFormularioCupones').text('Cupón válido para '+ emp);
            $('#modallogin').modal('show');
            $('#modallogin').on('hidden.bs.modal', function(){
              $('#formularioValidarCupon')[0].reset();
            });
          } else if(!(today >= comienzo && today <= expiracion)){
            $('#mensajeFormularioCupones').text('El código ingresado ha expirado!');
          }else{
            $('#mensajeFormularioCupones').text('El código ingresado no es válido para la aplicación o el plan elegido.');
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
    obj['accion'] = 'insertarRegistro';
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
    obj['accion'] = 'insertarRegistro';
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
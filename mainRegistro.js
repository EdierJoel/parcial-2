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

  $("#myBtn").click(function() {
    obj = {
      accion: "insertarRegistro"
    };
    // $("#myBtn").hide();
    // $("#myModal")[0].reset();
    $("#btnRegistrar").text("Unete");
  });

  $("#btnRegistrar").click(function() {
    obj["UserName"] = $("#UserName").val();
    obj["UserLastname"] = $("#UserLastname").val();
    obj["UserPassword"] = $("#UserPassword").val();
    obj["UserEmail"] = $("#UserEmail").val();
    obj["UserPhone"] = $("#UserPhone").val();
    obj["PlanId"] = $("#PlanId").val();

    // obj.push("UserName", UserName);
    // obj.push("UserLastname", UserLastname);
    // obj.push("UserPassword", UserPassword);
    // obj.push("UserEmail", UserEmail);
    // obj.push("UserPhone", UserPhone);
    // obj.push("PlanId", PlanId);

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

  $("#btn-cancel").click(function() {
    $("#myBtn").show();
  });
});


$(function(){

  init();
  
});

var procidure;
function init(){

    $("#btnEnviar").on("click", function(){
        agregarLugar();
    });
    $("#btnRegistro").on("click", function(){
        registroUsuario();
    });
    $("#btnLogin").on("click", function(){
        login();
    });
}

function verificarLogin(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=session";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogin","jsonp");
}

window.onload = verificarLogin();



function registroUsuario(){
    var nombre, email, contrasena;
    email = campoEmail.value;
    var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(pattern.test(email)){ 
        nombre = campoNombre.value;
        contrasena = campoContrasena.value;
        pattern=/^([a-zA-Z0-9_.-])/;
        if(pattern.test(nombre) && pattern.test(contrasena)){
            var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
            var params = "nombreServicio=registro&nombre="+nombre+"&email="+email+"&contrasenna="+contrasena;
            callService(urlService, params, 'exito' , 'jsonp');
        }else{
            alert("usuario o contraseña invalido intente de nuevo");
        }
    }else{ 
        alert("email invalido intente de nuevo"); 
    } 
}

function login () {
	var email, contrasena;
	email = inputEmail.value;
	contrasena = inputPassword.value;
	var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
	var params = "nombreServicio=login&email="+email+"&contrasenna="+contrasena;
    callService(urlService, params, 'procesoIncio', 'jsonp');
}

function callService(urlService, params, cb, dataT){
    $.ajax({
        dataType: 'jsonp',
        url: urlService,
        data:params,
        type: "GET",
        crossDomain: true, 
            jsonpCallback:cb, //'jpCallback',
            succes: function(r) {
                alert(r);
            //console.log+(r);
        }, error: function(e, xhr) {
            console.log(e);
        }});
}

function prueba(){
}

function exito(data){
    if(data == "false"){
        alert("Este email ya esta registrado");
    }else{
        alert("se ha registrado exitosamente")
    }
}

function procesoIncio(data){
    if(data[0]!=false){
        window.top.location.href = 'Inicio.html';
        alert("Bienvenido de vuelta "+data[0].nombre);
    }else{
        alert("usuario o contraseña incorrecta");
    }

}
/*
 * 
 * @param {type} data
 * @returns {undefined}
 * para llamar
        var url,params;
        url = "http://guiarte.uni.me/MedellinInteractiva/servicios/ServicioUsuario.php";
        params = "nombreServicio=session";
        callService(url,params,'log','jsonp');
        */
        function log(data){
            console.log(data);
            alert("hola");
        }
        function procesoLogin(data){
            if(data[0]!=-1){
               window.top.location.href = 'Inicio.html';
           }
       }
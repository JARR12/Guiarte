window.onload = verificarLogin();

function verificarLogin(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=session";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogin","jsonp");
}

$(function(){
  
  init();
  
});

function init(){

    $("#logOut").on("click", function(){
        salirSesion();
    });
    $("#busquedaAvanzada").on("click", function(){
        busquedaAvanzada();
    });
}

function  salirSesion(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=salirSesion";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogout","jsonp");
}

function busquedaAvanzada(){
    var campoPalabra , tipo, ubicacion;
    campoPalabra = campoClave.value;
    if (campoPalabra.charAt(campoPalabra.length-1) == "s" || campoPalabra.charAt(campoPalabra.length-1) == "S"){
        campoPalabra = campoPalabra.slice(0, -1);
        if(campoPalabra.charAt(campoPalabra.length-1) == "e" || campoPalabra.charAt(campoPalabra.length-1) == "E"){
            campoPalabra = campoPalabra.slice(0, -1);
        }
    }
    tipo = parseInt(campoTipo.value);
    ubicacion = null;//parseInt(campoUbicacion.value);
    
     urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
     params = "nombreServicio=avanzado&criterio="+campoPalabra+"&tipo="+tipo+"&zona="+ubicacion+"&caracteristicas= ";
     callService(urlService, params, "cargarBuscados", "json"); 
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

function procesoLogin(data){
    if(data[0]==-1){
         window.top.location.href = 'index.html';
    }else{
        //busqueda aqui
    }
}

function procesoLogout(data){
    console.log(data);
    window.top.location.href = 'Ultimos.html';
}

function cargarBuscados(data){
    console.log(data);
    
   var collapse = 0;
     data.forEach(function(name){
        var str = '<div class="accordion" id="accordion'+name.id+'">';
        str += '<div class="accordion-group">';
        str += '<div class="accordion-heading">';
        str += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+collapse+'">';
        str += name.nombre;
        str += '</a></div>';
        str += '<div id="collapse'+collapse+'" class="accordion-body collapse ">';
        str += '<div class="accordion-inner">';
        str += '<a href="#" class="btn btn-info" OnClick="cargarLugar('+name.id+');"">Informacion</a>';
        str += '<a href="#" class="btn">Eliminar</a>';
        str += '</div></div></div>';
        $('.lugares').append(str);
        collapse+=1;
  });
}

function cargarLugar(id){
    window.top.location.href = 'PaginaLugar.html?'+id;
}

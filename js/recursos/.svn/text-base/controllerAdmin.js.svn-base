
$(function(){
  
  init();
  
});

var usuarion;
window.onload = verificarLogin();

function verificarLogin(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=session";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogin","jsonp");
}


function init(){
    $("#logOut").on("click", function(){
                salirSesion();
    });
    $("#btnEnviar").on("click", function(){
                agregarLugar();
    });
}

function  salirSesion(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=salirSesion";
    callService(urlService,params,"procesoLogout","jsonp");
}

function agregarLugar(){
  var nombre, direccion, urlimg, descripcion, tags , telefono,tipo;
  nombre = campoNombre.value;
  telefono = parseInt( campoTelefono.value);
  direccion = campoDireccion.value;
  urlimg = campoImagen.value;;
  descripcion = campoDescripcion.value;
  tipo = parseInt(campoTipo.value);
  tags = campoTags.value;
  urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
  params = {nombreServicio: 'insertar', nombre: nombre, direccion: direccion, imagen: urlimg, descripcion: descripcion, tel: telefono, tipo: tipo, tags: tags, id: usuarion};
  callService(urlService, params, "exito", "json"); 
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
        usuarion = data[0];
        urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
        params = "nombreServicio=usuario&id="+data[0];
         callService(urlService, params, "cargarPrevios", "json"); 
    }
}

function procesoLogout(data){
    console.log(data);
    window.top.location.href = 'index.html';
}

function cargarPrevios(data){
  //  console.log(data[0].nombre);
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
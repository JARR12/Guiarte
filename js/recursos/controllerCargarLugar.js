$(function() {

    init();

});

window.onload = verificarLogin();

var lugar;
var  usuario;

function verificarLogin() {
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var params = "nombreServicio=session";//params = {nombreServicio: 'session'};
    callService(urlService, params, "procesoLogin", "jsonp");
}

function init() {
    $("#tnEnviar").on("click", function() {
        agregarEvento();
    });
    $("#btnAgregarComentario").on("click",function(){
        agregarComentario();
    });
}

function agregarEvento() {
    var nombre, fechaI, fechaF, telefono, urlimg, descripcion, tags;
    nombre = CampoNombre.value;
    fechaI = campoFechaInicio.value;
    fechaF = campoFechaFin.value;
    telefono = campoTelefono.value;
    urlimg = campoImagen1.value;
    descripcion = campoDescripcion.value;
    tags = campoTags.value;

    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioEvento.php";
    var params = "nombreServicio=insertar&lugar=" + lugar + "&nombre=" + nombre + "&inicio=" + fechaI + "&fin=" + fechaF + "&img=" + urlimg + "&descripcion=" + descripcion + "&tags=" + tags;
    callService(urlService, params, "ingresado", "jsonp");
}

function agregarComentario(){
    var  nota, comentario;
    nota = campoNota.value;
    comentario = campoComentario.value;
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioCalificacion.php";
    var params = "nombreServicio=agregar&lugar="+lugar+"&usuario="+usuario+"&nota="+nota+"&comentario="+comentario;
    callService(urlService, params, "ingresado", "jsonp");
}

function callService(urlService, params, cb, dataT) {

    $.ajax({
        dataType: dataT,
        url: urlService,
        data: params,
        type: "GET",
        crossDomain: true,
        jsonpCallback: cb, //'jpCallback',
        succes: function(r) {
            alert(r);
            //console.log+(r);
        }, error: function(e, xhr) {
            console.log(e);
        }});
}

function procesoLogin(data) {
    if (data[0] == -1) {
        window.top.location.href = 'index.html';
    } else {
        usuario = data[0];
        lugar = location.search.substr(1);
        var id = location.search.substr(1);
        var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
        var params = "nombreServicio=id&id=" + id;
        callService(urlService, params, "cargarLugar", "jsonp");
        //var capa = document.getElementById("parrafoDir");
        //capa.innerHTML = "Contenido para la capa"

    }
}

function cargarLugar(data) {
    var c = document.getElementById("parrafoDir");
    c.innerHTML = data[0].direccion;
    c = document.getElementById("nombreLugar");
    c.innerHTML = data[0].nombre;
    c = document.getElementById("parrafoTel");
    c.innerHTML = data[0].telefono;
    c = document.getElementById("parrafoDesc");
    c.innerHTML = data[0].descripcion;
    c = document.getElementById("parrafoCat");
    switch (data[0].id_tipo) {
        case "1":
            c.innerHTML = "Restaurante";
            break;
        case "2":
            c.innerHTML = "Bar";
            break;
        case "3":
            c.innerHTML = "Cine";
            break;
        case "4":
            c.innerHTML = "Teatro";
            break;
        case "5":
            c.innerHTML = "Parque";
            break;
        case "6":
            c.innerHTML = "Museo";
            break;
        case "7":
            c.innerHTML = "Centro Comercial";
            break;
    }
    c = document.getElementById("tiutloasd");
    c.innerHTML = '<i class="icon-star icon-white"></i>' + data[0].nombre;
    urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
    params = "nombreServicio=imagen&id=" + data[0].id;
    callService(urlService, params, "cargarImage", "jsonp");
}

function cargarImage(data) {
    data[0].forEach(function(name) {
        var str = '<div class="item"> <img src=' + '"' + name.url + '"' + ' alt=""></div> ';
        $('.carousel-inner').append(str);
    });
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioEvento.php";
    var params = "nombreServicio=lugar&lugar=" + lugar;
    callService(urlService, params, "cargarEventos", "jsonp");
}

function cargarEventos(data) {
    data.forEach(function(name) {
        var str = '<div class="accordion-heading">';
        str += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + name.id + '">';
        str += name.nombre + ' </a> </div>';
        str += '<div id="collapse' + name.id + '" class="accordion-body collapse">';
        str += '<div class="accordion-inner">';
        str += '<a href="#' + name.id + '" role="button" class="btn btn-info" data-toggle="modal">Informacion</a>';
        str += '<div id="' + name.id + '" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        str += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
        str += '<div class="modal-body"> <form id="form">';
        str += '<h3>' + name.nombre + '</h3> <hr>';
        str += '<div class="span5"> <div class="span4"> <h3>Imagenes</h3> <hr>';
        str += '<div id="myCarousel'+name.id+'" class="carousel slide"> <div class="carousel-inner">';
        // hay q cambiar para q no cargue lo de abajo si no las imagenes
        //str += '<div class="item active"> <img src="img/360x270.png"> </div> <div class="item"> <img src="img/360x270.png"> </div> <div class="item"> <img src="img/360x270.png"> </div> </div>';
        str += '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div><!-- /.carousel --> </div>';
        str += '<div class="span4">'
        str += '<h3>Informacion</h3><hr><br>';
        str += '<h4>Fecha Inico</h4> <p id="parrafoFechaI">' + name.fecha_inicio + '</p> <br>';
        str += '<h4>Fecha Fin</h4> <p id="parrafoFechaF">' + name.fecha_fin + '</p> <br>';
        str += '<h4>Descripcion</h4> <p  id="parrafoDescE" align="justify">' + name.descripcion + '</p> <hr> </div> </div>';
        
        $('.accordion-group').append(str);
    });
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioEvento.php";
    var params = "nombreServicio=imagenPorLugar&id=" + lugar;
    callService(urlService, params, "cargarImagenesEventos", "jsonp");
}

function cargarImagenesEventos(data){
    
    data.forEach(function(name) {
        var str = '<div class="item"> <img src="'+name.url+'"> </div> ';
        var c = document.getElementById("myCarousel"+name.id);
        c.innerHTML += str;
    });
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioCalificacion.php";
    var params = "nombreServicio=buscarComentario&lugar=" + lugar;
    callService(urlService, params, "cargarComentarios", "jsonp");
}

function cargarComentarios(data){
    console.log(data);
    var str = "";
    data.forEach(function(name) {
        str += '<div class="thumbnails"> <div class="thumbnail"> <div class="pull-right">';
        str += '<h2><small>Calificacion</small></h2><h5> '+name.nota+'  </h5>  </div>';
        str += '<h1> <small>'+name.nombre+'</small>  </h1>';
        str += '<p> '+name.comentario+' </p> </div> </div> <br>'
    });
    c = document.getElementById("comentarios");
    c.innerHTML = str;
}

function ingresado(data) {
    console.log(data[0]);
}
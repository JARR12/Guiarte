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
}

function  salirSesion(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=salirSesion";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogout","jsonp");
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

function callServicei(urlService, params, cb, dataT){
    
    $.ajax({
            dataType: 'jsonp',
            url: urlService,
            data:params,
            type: "GET",
            crossDomain: true, 
            jsonpCallback:function(r) {
                
                cargarImage(r);
            //console.log+(r);
        }, //'jpCallback',
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
        urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
        params = "nombreServicio=destacados";
        callService(urlService, params, "cargarPrevios", "json");
    }
}

function procesoLogout(data){
    console.log(data);
    window.top.location.href = 'index.html';
}

function cargarPrevios(data){
    data.forEach(function(name){
        var str = ' <li class= "span3">';
        str += ' <div class= "thumbnail">';
        str += ' <img id ='+name.id+' src='+name.url+'>';
        str += ' <div class="caption">';
        str += ' <h4>'+name.nombre+'</h4>';
        str += ' <p>'+name.descripcion+'</p>';
        str += '<a href="#" class="btn btn-info" OnClick="cargarLugar('+name.id+');"">Informacion</a>';
        str += ' </div> </div>';
        $('.thumbnails').append(str);
        urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioLugar.php";
        params = "nombreServicio=imagen&id="+name.id;
    });
}

 function cargarLugar(id){
    console.log("entra");
    window.top.location.href = 'PaginaLugar.html?'+id;
}


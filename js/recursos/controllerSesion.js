window.onload = verificarLogin();

function verificarLogin(){
    var urlService = "http://guiarte.tk/MedellinInteractiva/servicios/ServicioUsuario.php";
    var  params = "nombreServicio=session";//params = {nombreServicio: 'session'};
    callService(urlService,params,"procesoLogin","jsonp");
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
    console.log(data);
    if(data[0]==-1){
         window.top.location.href = 'index.html';
    }
}
getOrar();

$("#save_orar").click(function(){
    var luni = $("#start_luni").val() + "-" + $("#end_luni").val();
    var marti = $("#start_marti").val() + "-" + $("#end_marti").val();
    var miercuri = $("#start_miercuri").val() + "-" + $("#end_miercuri").val();
    var joi = $("#start_joi").val() + "-" + $("#end_joi").val();
    var vineri = $("#start_vineri").val() + "-" + $("#end_vineri").val();
    var sambata = $("#start_sambata").val() + "-" + $("#end_sambata").val();
    var duminica = $("#start_duminica").val() + "-" + $("#end_duminica").val();

    var patchDoc =  { "luni": luni,
                      "marti": marti,
                      "miercuri": miercuri,
                      "joi": joi,
                      "vineri": vineri,
                      "sambata": sambata,
                      "duminica": duminica
                    } ;
    console.log(JSON.stringify(patchDoc));
    $.ajax({
    contentType: "application/json",
    data: JSON.stringify(patchDoc),
    dataType: "json",
    method: "PATCH",
    url: "https://radiant-beyond-44987.herokuapp.com/orar/5c012fa7a909321da86edd37",
    success: function(){
      
        // if true (1)
        
           setTimeout(function(){
                location.reload(); 
           }, 0); 
        
     }
    });
});

function getOrar(){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/orar/venue/" + localStorage.getItem('venue_id'),
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data){
            console.log("orar->>>" + JSON.stringify(data));
            var start_luni = data.luni.split('-')[0];
            var end_luni = data.luni.split("-")[1];
            $("#start_luni").val(start_luni);
            $("#end_luni").val(end_luni);
            var start_marti = data.marti.split('-')[0];
            var end_marti = data.marti.split("-")[1];
            $("#start_marti").val(start_marti);
            $("#end_marti").val(end_marti);
            var start_miercuri = data.miercuri.split('-')[0];
            var end_miercuri = data.miercuri.split("-")[1];
            $("#start_miercuri").val(start_miercuri);
            $("#end_miercuri").val(end_miercuri);
            var start_joi = data.joi.split('-')[0];
            var end_joi = data.joi.split("-")[1];
            $("#start_joi").val(start_joi);
            $("#end_joi").val(end_joi);
            var start_vineri = data.vineri.split('-')[0];
            var end_vineri = data.vineri.split("-")[1];
            $("#start_vineri").val(start_vineri);
            $("#end_vineri").val(end_vineri);
            var start_sambata = data.sambata.split('-')[0];
            var end_sambata = data.sambata.split("-")[1];
            $("#start_sambata").val(start_sambata);
            $("#end_sambata").val(end_sambata);
            var start_duminica = data.duminica.split('-')[0];
            var end_duminica = data.duminica.split("-")[1];
            $("#start_duminica").val(start_duminica);
            $("#end_duminica").val(end_duminica);
            
        }
    });
    }
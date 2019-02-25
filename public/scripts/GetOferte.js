var perioada = 0;
var bautura = 0;
function getPerioada(id){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/perioada/"+id,
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (well){
            console.log("perioada->>>" + JSON.stringify(well));
            perioada = well;
            
        }
    });
}

function getBauturaOfertata(id){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/bautura/"+id,
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (well){
            console.log("perioada->>>" + JSON.stringify(well));
            bautura = well;
            
        }
    });
}

$.ajax(
    {
         type: "GET",
         url: "https://radiant-beyond-44987.herokuapp.com/oferta/5c012fa7a909321da86edd37",
         data: "{}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         cache: false,
         success: function (data) {
            bautura = data;
            console.log(data);

			$.each(data, function (key, value) {

                getPerioada(value.perioada);  
                getBauturaOfertata(value.bautura_id);              
                $( document ).ajaxComplete(function( event, request, settings ) {
                    console.log("cica fkdsfs");
                    if((perioada != 0) && (bautura != 0)){
                    $("#oferteTable tbody").append("<tr class='oferta' id='oferta'>"+"<td>"+value.nume+"</td>"
                                
                                 +"<td>"+value.numar_bauturi+"</td>"
                                 +"<td>"+bautura.nume+"</td>"
                                 +"<td>"+value.tip_oferta+"</td>"
                                //  +"<td><td>"+perioada.zile+"</td><td>"+perioada.ora_inceput+" "+perioada.ora_sfarsit+"</td></td>"
                                 +"<td><td>"+perioada.zile+"</td><td>"+perioada.ora_inceput+" "+perioada.ora_sfarsit+"</td></td>"
                                 +"</tr>" );
                                 if(value.active == true){
                                    $("#oferta").append("<td><button class='deactivate_offer'>Dezactiveaza</button></td>");
                                 }else{
                                    $("#oferta").append("<td><button class='activate_offer'>Activeaza</button></td>");
                                 }
                                 $("#oferta").attr("id", "");

                                    
                                  var modal = document.getElementById('editModal');

                                 // Get the button that opens the modal
                                 var btnEdit = document.getElementsByClassName("editButton");
                                 var btnActivate = document.getElementsByClassName("activate_offer");
                                 var btnDeactivate = document.getElementsByClassName("deactivate_offer");
                                 var offers = document.getElementsByClassName("oferta");
                                 
                                 $.each(btnActivate, function(index, value){
                                     btnActivate[index].onclick = function(){
                                        var result = confirm("Want to activate the offer?");
                                        if (result) {
                                            $.ajax({
                                                contentType: "application/json",
                                                data: [],
                                                dataType: "json",
                                                method: "PATCH",
                                                url: "https://radiant-beyond-44987.herokuapp.com/oferta/activeazaOferta/"+bautura[index]._id,
                                               
                                                success : function(customer) {
                                                    location.reload();
                                                    console.log("Activare cu succes");
                                                    
                                                },
                                                error : function(e) {
                                                    alert("Error!")
                                                    console.log("ERROR: ", e);
                                                }
                                            });
                                        }
                                     }
                                 });                                        
                                 $.each(offers, function(another_index){
                                 $.each(btnDeactivate, function(index, value){
                                    btnDeactivate[index].onclick = function(){
                                        console.log(another_index);
                                       var result = confirm("Want to deactivate the offer?");
                                       if (result) {
                                           $.ajax({
                                               contentType: "application/json",
                                               data: [],
                                               dataType: "json",
                                               method: "PATCH",
                                               url: "https://radiant-beyond-44987.herokuapp.com/oferta/dezactiveazaOferta/"+bautura[another_index]._id,
                                              
                                               success : function(customer) {
                                                console.log("https://radiant-beyond-44987.herokuapp.com/oferta/dezactiveazaOferta/"+bautura[another_index]._id);
                                                   console.log("Dezactivare cu succes");
                                                   
                                               },
                                               error : function(e) {
                                                   alert("Error!")
                                                   console.log("ERROR: ", e);
                                               }
                                           });
                                       }
                                    }
                                });
                            }); 

                            perioada = 0; bautura = 0;
             } 
            });
                  

                                });

                            }
                        })
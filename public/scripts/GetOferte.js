var perioade = new Array();
var bauturi = new Array();
function getPerioade(){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/perioada",
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (well){
            
            perioade = well;
            
        }
    });
}

function getBauturi(){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/bautura",
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (well){
            // console.log("bauturi" + JSON.stringify(well));
            bauturi = well;
            
        }
    });
}
getPerioade();
getBauturi();

function searchBautura(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i]._id === nameKey) {
            console.log("fra here" + myArray[i].nume);
            return myArray[i].nume;
        }
    }
}

function searchPerioada(nameKey, myArray){
    
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i]._id === nameKey) {
            var perioadaCautata = {zile: myArray[i].zile, ora_inceput: myArray[i].ora_inceput, ora_sfarsit: myArray[i].ora_sfarsit};
            return perioadaCautata;
        }
    }
}  

$.ajax(
    {
         type: "GET",
        //  url: "https://radiant-beyond-44987.herokuapp.com/oferta/" + localStorage.getItem('venue_id'),
         url: "https://radiant-beyond-44987.herokuapp.com/oferta/5c012fa7a909321da86edd37",

         data: "{}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         cache: false,
         success: function (data) {
            bautura = data;
            console.log(data);
           
    $( document ).ajaxComplete(function( event, request, settings ) {
        if((perioade!=0) && (bauturi!=0)){
			$.each(data, function (key, value) {
               
                    console.log(value.nume+ " " +value.tip_oferta);

                    $("#oferteTable tbody").append("<tr class='oferta' id='oferta'>"+"<td>"+value.nume+"</td>"
                                
                                 +"<td>"+value.numar_bauturi+"</td>"
                                 +"<td>"+searchBautura(value.bautura_id, bauturi)+"</td>"
                                 +"<td>"+value.tip_oferta+"</td>"
                                //  +"<td><td>"+perioada.zile+"</td><td>"+perioada.ora_inceput+" "+perioada.ora_sfarsit+"</td></td>"
                                //  +"<td><td>"+searchPerioada(value.perioada, perioade).zile+"</td><td>"+searchPerioada(value.perioada, perioade).ora_inceput+" "+searchPerioada(value.perioada, perioade).ora_sfarsit+"</td></td>"
                                 +"<td ><table><tbody><tr><td>Luni,Marti,Miercuri,Joi,Vineri</td></tr><tr><td>09:00-12:00</td></tr></tbody></table></td>"
                                 +"</tr>" );
                                 if(value.active == true){
                                    $("#oferta").append("<td><button class='deactivate_offer btn btn-danger'>Dezactiveaza</button></td>");
                                 }else{
                                    $("#oferta").append("<td><button class='activate_offer btn btn-success'>Activeaza</button></td>");
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
                                                    
                                                    console.log(bautura[index]._id);
                                                    location.reload();
                                                    
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
                                                   location.reload();
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
             
                  

                                
                            })
                            bauturi = 0; perioade = 0;
                        }
                              });
                            }
                        })
                       
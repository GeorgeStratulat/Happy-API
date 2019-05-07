

var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");


// When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }



var session = "ceva";
var session_send = "altceva";
function getVenueId(formData){
    $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "https://radiant-beyond-44987.herokuapp.com/admin_venue/login",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(customer) {
                console.log(JSON.stringify(customer) );
                // req.session.venue_id = customer.venue_id;
                session = customer.venue_id;
                session_send = session;
                window.location.href="https://happy-admin-da582.firebaseapp.com/index.html";
                // return session;
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
}

function sendVenueId(formData){
    console.log(formData);
    var post = {"session": formData}
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "https://happy-admin-da582.firebaseapp.com/login",
        data : JSON.stringify(post),
        dataType : 'text',
        success : function(customer) {
            console.log(JSON.stringify(customer));
            // console.log(customer);
            // obj = JSON.parse(customer);
            // console.log(obj.venue_id);
            // console.log(JSON.stringify(customer) );
            // req.session.venue_id = customer.venue_id;
            // window.localStorage.setItem("venue_id", customer.venue_id);
            // console.log(window.localStorage.getItem("venue_id"));
            window.location = "https://happy-admin-da582.firebaseapp.com/index.html";
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}


$("#login_button").click(function(){
    var formData = {
        username: $("#username_input").val(),
        password: $("#password_input").val()
    };
    // var session = getVenueId(formData);
    // console.log(session);
    
     getVenueId(formData);
    //  $( document ).ajaxComplete(function( event, request, settings ) {
    //     if(session!=0){
    //     console.log(session);
    //     sendVenueId(session);
    //     session = 0;
    // }
    //     });

    

    
    console.log("still in the login");
    // console.log(session);
});
global_venue_id = session;

// $.ajax({
//   type: "GET",
//   url:"https://happy-admin-da582.firebaseapp.com/getVenueId",
//   data:"{}",
//   contentType: "application/json; charset=utf-8",
//   dataType: "json",
//   cache: false,
//   success: function (data){
//       console.log(data.venue_id);
//       global_venue_id = data.venue_id;
//       localStorage.setItem('venue_id', data.venue_id);
//       //////
      
      $(document).ready(function() {
        jQuery.support.cors = true;
        var bautura = [];
    
        
    
       
        $("#addImagineVenue").click(function(){
            console.log($("#uploadImagineVenueUrl").val());
            var patchDoc =  { "imagineAdaugata": $("#uploadImagineVenueUrl").val()} ;
            console.log(JSON.stringify(patchDoc));
            $.ajax({
            contentType: "application/json",
            data: JSON.stringify(patchDoc),
            dataType: "json",
            method: "PATCH",
            url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/addImagine",
            success: function(){
              
                // if true (1)
                
                   setTimeout(function(){
                        location.reload(); 
                   }, 0); 
                
             }
            });
    });
    
        
    
        $('#editImagineFile').on("change", function() {
    
            var $files = $(this).get(0).files;
        
            if ($files.length) {
        
              // Reject big files
              if ($files[0].size > $(this).data("max-size") * 1024) {
                console.log("Please select a smaller file");
                return false;
              }
        
              // Begin file upload
              console.log("Uploading file to Imgur..");
        
              // Replace ctrlq with your own API key
              var apiUrl = 'https://api.imgur.com/3/image';
              var apiKey = '16086a74217d3c0';
        
              var settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                  Authorization: 'Client-ID ' + apiKey,
                  Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
              };
        
              var formData = new FormData();
              formData.append("image", $files[0]);
              settings.data = formData;
        
              // Response contains stringified JSON
              // Image URL available at response.data.link
              $.ajax(settings).done(function(response) {
                var obj = JSON.parse(response);
                console.log(obj.data.link);
                $('#editImagineFileUrl').val(obj.data.link);
                
              });
        
            }
          });
    
          $('#uploadImagineVenue').on("change", function() {
    
            var $files = $(this).get(0).files;
        
            if ($files.length) {
        
              // Reject big files
              if ($files[0].size > $(this).data("max-size") * 1024) {
                console.log("Please select a smaller file");
                return false;
              }
        
              // Begin file upload
              console.log("Uploading file to Imgur..");
        
              // Replace ctrlq with your own API key
              var apiUrl = 'https://api.imgur.com/3/image';
              var apiKey = '16086a74217d3c0';
        
              var settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                  Authorization: 'Client-ID ' + apiKey,
                  Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
              };
        
              var formData = new FormData();
              formData.append("image", $files[0]);
              settings.data = formData;
        
              // Response contains stringified JSON
              // Image URL available at response.data.link
              $.ajax(settings).done(function(response) {
                var obj = JSON.parse(response);
                console.log(obj.data.link);
                $("#uploadImagineVenueUrl").val(obj.data.link);
                console.log($("#uploadImagineVenueUrl").val());
                
                
              });
        
            }
          });
    
          $('#uploadImagineBautura').on("change", function() {
    
            var $files = $(this).get(0).files;
        
            if ($files.length) {
        
              // Reject big files
              if ($files[0].size > $(this).data("max-size") * 1024) {
                console.log("Please select a smaller file");
                return false;
              }
        
              // Begin file upload
              console.log("Uploading file to Imgur..");
        
              // Replace ctrlq with your own API key
              var apiUrl = 'https://api.imgur.com/3/image';
              var apiKey = '16086a74217d3c0';
        
              var settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                  Authorization: 'Client-ID ' + apiKey,
                  Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
              };
        
              var formData = new FormData();
              formData.append("image", $files[0]);
              settings.data = formData;
        
              // Response contains stringified JSON
              // Image URL available at response.data.link
              $.ajax(settings).done(function(response) {
                var obj = JSON.parse(response);
                console.log(obj.data.link);
                $("#uploadImagineBauturaUrl").val(obj.data.link);
                console.log($("#uploadImagineBauturaUrl").val());
                
              });
        
            }
          });
    
        $.ajax({
            type: "GET",
            url:"https://radiant-beyond-44987.herokuapp.com/venue/" + session,
            // url:"https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37",

            data:"{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data){
                console.log(data);
                $("#numeVenue").text(data.nume);
                $("#locatieVenue").text(data.locatie);
                $("#detalii").text(data.detalii);
                // console.log("--imagini->>" + data.imagine);
                // data.imagine.forEach(function(img){
                //     console.log(img);
                //     $("#imagini-sortable").append("<li class='ui-state-default'><image class='img-responsive' style='width: 20em; height: 20em;' id='imagineBautura' src=''> </image>"+
                //     "<button class='btn btn-danger deleteImagineVenue' >Sterge</button></li>");
                //     $("#imagineBautura").attr("src", img);
                //     $("#imagineBautura").attr("id", img);
                //     var buttonDeleteImageVenue = document.getElementsByClassName("deleteImagineVenue");
                //     $.each(buttonDeleteImageVenue, function(index, value){
                //         buttonDeleteImageVenue[index].onclick = function(){
                //             var result = confirm("Want to delete?");
                //             if(result){
                //                 // $.ajax({
                //                 //     url: ""
                //                 // })
                //                 console.log("smthttt");
                //             }
                //         }
                //     })
    
                // })
            }
        });
    
    
    
        $.ajax(
        {
             type: "GET",
            //  url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/bautura",
            url: "https://radiant-beyond-44987.herokuapp.com/venue/"+session+"/bautura",
             data: "{}",
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             cache: false,
             success: function (data) {
                bautura = data;
                console.log(data);
    
          $.each(data, function (key, value) {
                      
                      
                      $("#bauturiTable tbody").append("<tr>"+"<td>"+value.nume+"</td>"
                                    
                                     +"<td><image id='imagine' src='' style='height:5 em; width: 5em'></image</td>"
                                     +"<td><button class='editButton'>Edit</button></td>"
                                     +"<td><button class='deleteButton'>Sterge</button></td>"+"</tr>" );
                                        console.log(value.imagine);
                                        $('#imagine').attr('src', value.imagine);
                                        $('#imagine').attr('id', value.imagine);
    
                                        
                                      var modal = document.getElementById('editModal');
    
                                     // Get the button that opens the modal
                                     var btnEdit = document.getElementsByClassName("editButton");
                                     var btnDelete = document.getElementsByClassName("deleteButton");
                                     
                                     $.each(btnDelete, function(index, value){
                                         btnDelete[index].onclick = function(){
                                            var result = confirm("Want to delete?");
                                            if (result) {
                                                $.ajax({
                                                    url: "https://radiant-beyond-44987.herokuapp.com/bautura/"+bautura[index]._id,
                                                    type: 'DELETE',
                                                    success : function(customer) {
                                                        
                                                        console.log("delete cu succes");
                                                        location.reload();
                                                        
                                                    },
                                                    error : function(e) {
                                                        alert("Error!")
                                                        console.log("ERROR: ", e);
                                                    }
                                                });
                                            }
                                         }
                                     })
                                     // When the user clicks the button, open the modal 
                                     $.each(btnEdit, function(index, value){
                                         
                                        btnEdit[index].onclick = function() {
                                            modal.style.display = "block";
                                            console.log(index);
                                            console.log(bautura[index]._id);
                                            $("#id").val(bautura[index]._id)
                                            $("#numeEdit").val(bautura[index].nume);
                                            $("#imagineEdit").val(bautura[index].imagine);
                                            $("#imagineBautura").attr("src", bautura[index].imagine);
                                            $("#closeEditBautura").click(function(){
                                               $('#editModal').hide();
                                            })
    
                                            $("#saveBautura").click(function(){
                                                console.log($("#editImagineFileUrl").val());
                                                var patchDoc =  { "imagine": $("#editImagineFileUrl").val()} ;
                                                console.log(JSON.stringify(patchDoc));
                                                console.log(bautura[index]._id);
                                                $.ajax({
                                                contentType: "application/json",
                                                data: JSON.stringify(patchDoc),
                                                dataType: "json",
                                                method: "PATCH",
                                                url: "https://radiant-beyond-44987.herokuapp.com/bautura/" + bautura[index]._id + "/imagine"
                                                });
                                            })
    
                                    }
    
                                    });
    
                                    });
    
                                }
                            });


                            var imagini = new Array();
getImagini();

function getImagini(){
    console.log("url de luat imagini "+ localStorage.getItem('venue_id'));
    var url_imagini = "https://radiant-beyond-44987.herokuapp.com/venue/"+session+"/imagini";
    // var url_imagini = "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/imagini";

$.ajax({
    type: "GET",
    // url:"https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/imagini",
    url: url_imagini,
    // url:"https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/imagini",

    data:"{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
    success: function (data){
        console.log("imagini->>> "+url_imagini);
        imagini = data;
        data.forEach(function(img){
            console.log(img);
            $("#imagini-sortable").append("<li  id='li_id' class='ui-state-default'><image class='img-responsive' style='width: 30em; height: 20em;' id='imagineBautura' src=''> </image>"+
            "<button  class='btn btn-danger deleteImagineVenue' >Sterge</button></li>");
            // $("#imagini-sortable").append("<li id='li_id' class='ui-state-default'><image class='img-responsive' style='width: 20em; height: 20em;' id='imagineBautura' src=''> </image>"+
            // "<button class='btn btn-danger deleteImagineVenue' >Sterge</button></li>");
            $("#li_id").attr("id", img._id);
            $("#imagineBautura").attr("src", img.url);
            $("#imagineBautura").attr("id", img.url);
            var buttonDeleteImageVenue = document.getElementsByClassName("deleteImagineVenue");
            $.each(buttonDeleteImageVenue, function(index, value){
                buttonDeleteImageVenue[index].onclick = function(){
                    var result = confirm("Want to delete?");
                    if(result){
                        $.ajax({
                            url: "https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/deleteImagine/"+data[index]._id,
                            type: 'DELETE',
                            success : function(customer) {
                                
                                console.log("delete cu succes");
                                location.reload();
                                
                            },
                            error : function(e) {
                                alert("Error!")
                                console.log("ERROR: ", e);
                            }
                        });
                        console.log("smthttt");
                    }
                }
            })

        })
    }
});
}


$( document ).ajaxComplete(function( event, request, settings ) {

$("#salveaza_ordine_imagini").click(function(){
    console.log("merge butonu de save");
        saveChanges();
    });     
});

function saveChanges(){
    //ceva cu ordonare.....
    // imagini.forEach(function(img){
    //     console.log("pozitia este-> " + );
    // });
    console.log("imagini->>>"+JSON.stringify(imagini));
    $.each(imagini, function(key, value){
        console.log(value._id);
        var patchDoc =  { "order": $('#' + value._id).index()} ;
        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(patchDoc),
            dataType: "json",
            method: "PATCH",
            url: "https://radiant-beyond-44987.herokuapp.com/imagine_venue/"+ value._id +"/ordoneaza",
           
            success : function(customer) {
                
                console.log("https://radiant-beyond-44987.herokuapp.com/imagine_venue/"+ value._id +"/ordoneaza");                
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    })
}

$(function() {
	$( "#imagini-sortable" ).sortable({
        update: function(event, ui) { 
            console.log('update: '+ui.item.index())
        },
        start: function(event, ui) { 
            console.log('start: ' + ui.item.index())
        }
    });
	$( "#imagini-sortable" ).disableSelection();
});

//OFERTE 

$("#btnAddOferta").click(function(){
    $("#addOfertaModal").show();
    $("#closeAddOfertaModal").click(function(){
        $("#addOfertaModal").hide();
    })
    $.ajax(
        {
             type: "GET",
             url: "https://radiant-beyond-44987.herokuapp.com/venue/"+session+"/bautura",
             data: "{}",
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             cache: false,
             success: function (data) {
                bautura = data;
                console.log(data);
    
                $.each(data, function (key, value) {
                      
                      
                      $("#BauturaOfertaAdd").append("<option id='optiune'>"+value.nume+"</option>" );
                                $('#optiune').val(value._id);
                                $('#optiune').attr('id', value.imagine);
                                    });
    
                                }
                            });

                $("#addOfertaButton").click(function(){
                var checked_days = [];
                $.each($(".check-day:checked"), function(){            
                checked_days.push($(this).val());
                });
                var ora_inceput = new Date($("#data_inceput").val() + " " + $("#ora_inceput").val());
                var ora_sfarsit = new Date($("#data_sfarsit").val() + " " + $("#ora_sfarsit").val());
                var formData = {
                    nume : $("#numeOfertaAdd").val(),
                    locatie_id : localStorage.getItem('venue_id'),
                    numar_bauturi: $("#numarBauturiOfertaAdd").val(),
                    bautura_id: $("#BauturaOfertaAdd option:selected").val(),
                    // imagine: $("#BauturaOfertaAdd option:selected").attr('id'),
                    tip_oferta: $("#TipOfertaAdd").val(),
                    zile: checked_days,
                    ora_inceput: ora_inceput,
                    ora_sfarsit: ora_sfarsit,
                    data_inceput: $("#data_inceput").val(),
                    data_sfarsit: $("#data_sfarsit").val()
                        }
                    addOferta(formData);
                                // console.log("esti prost");
                })

                function addOferta(formData){
                    console.log(formData);
                    $.ajax({
                        type : "POST",
                        contentType : "application/json",
                        url : "https://radiant-beyond-44987.herokuapp.com/oferta/"+localStorage.getItem('venue_id')+"/addOferta",
                        data : JSON.stringify(formData),
                        dataType : 'json',
                        success : function(customer) {
                            console.log(JSON.stringify(customer) );
                        },
                        error : function(e) {
                            alert("Error!")
                            console.log("ERROR: ", e);
                        }
                    });
                }
})


var perioade = 1;
var oferte = new Array();
function getPerioade(){
    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/perioada",
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (well){
            
            perioade = 1;
            
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
         url: "https://radiant-beyond-44987.herokuapp.com/oferta/" + session,
        //  url: "https://radiant-beyond-44987.herokuapp.com/oferta/5c012fa7a909321da86edd37",

         data: "{}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         cache: false,
         success: function (data) {
            oferte = data;
            console.log(data);
           
    $( document ).ajaxComplete(function( event, request, settings ) {
        if((perioade!=0) && (bauturi!=0)){
			$.each(data, function (key, value) {
               
                    console.log(value.nume+ " " +value.tip_oferta);

                    $("#oferteTable").append("<tr class='oferta' id='oferta'>"+"<td>"+value.nume+"</td>"
                                
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
                                 
                                //  $.each(oferte, function(another_index, _valoare){

                                 $.each(btnActivate, function(index, value){
                                     btnActivate[index].onclick = function(){
                                        console.log(key);
                                        var result = confirm("Want to activate the offer?");
                                        if (result) {
                                            $.ajax({
                                                contentType: "application/json",
                                                data: [],
                                                dataType: "json",
                                                method: "PATCH",
                                                url: "https://radiant-beyond-44987.herokuapp.com/oferta/activeazaOferta/"+data[key]._id,
                                               
                                                success : function(customer) {
                                                    
                                                    console.log(data[key]._id);
                                                    // location.reload();
                                                    
                                                },
                                                error : function(e) {
                                                    alert("Error!")
                                                    console.log("ERROR: ", e);
                                                }
                                            });
                                        }
                                     }
                                 });                                        
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
                                               url: "https://radiant-beyond-44987.herokuapp.com/oferta/dezactiveazaOferta/"+oferte[index]._id,
                                              
                                               success : function(customer) {
                                                   location.reload();
                                                console.log("https://radiant-beyond-44987.herokuapp.com/oferta/dezactiveazaOferta/"+oferte[index]._id);
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
                            // }); 
             
                  

                                
                            })
                            bauturi = 0; perioade = 0;
                        }
                              });
                            }
                        })
                       

//ORAR 

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
    url: "https://radiant-beyond-44987.herokuapp.com/orar/"+localStorage.getItem('venue_id'),
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

    //ADD DRINK

    $('#btnAddBautura').click(function(){
		$('#addBauturaModal').show();
	});
	$('#closeAddBauturaModal').click(function(){
		$('#addBauturaModal').hide();
	});

	
	// SUBMIT FORM
	$("#addBauturaButton").click(function() {
		// Prevent the form from submitting via the browser.
		var formData = {
    		nume : $("#numeBauturaAdd").val(),
			imagine : $("#uploadImagineBauturaUrl").val(),
			locatie: localStorage.getItem('venue_id')
    	}
		addBautura(formData);
		console.log("se apasa");
	});
	
	function addBautura(formData){
		bauturaAdaugatId = 0;
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "https://radiant-beyond-44987.herokuapp.com/bautura/addBautura",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				
				console.log(JSON.stringify(customer.BauturaAdaugat._id) );
				bauturaAdaugatId = customer.BauturaAdaugat._id;
				ajaxPost(bauturaAdaugatId);
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
	}
    
    function ajaxPost(idBautura){
    	
		// PREPARE FORM DATA
    	
    	
    	// DO POST
		

		var patchDoc =  { "bautura_id": idBautura} ;
        console.log(JSON.stringify(patchDoc));
        $.ajax({
        contentType: "application/json",
        data: JSON.stringify(patchDoc),
        dataType: "json",
        method: "PATCH",
        url: "https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/addBautura",
        success: function(){
          
            // if true (1)
            
               setTimeout(function(){
                    location.reload(); 
               }, 0); 
            
         }
        });
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#nume").val("");
        $("#tip").val("");
        $("#cantitate").val("");
        $("#locatie").val("");
        $("#imagine").val("");
    }

    //EDIT LOCATIE

    
$('#editLocatie').click(function(){
    $('#locatieModal').show();
    $('#pac-input').val($('#locatieVenue').val());
    $('#closeEditLocatie').click(function(){
      $('#locatieModal').hide();
      // $('#editLocatie').unbind();
    })

       $('#saveEditLocatieButton').click(function(){
        console.log($('#pac-input').val());
        var patchDoc =  { "locatie": $("#pac-input").val()} ;
            console.log(JSON.stringify(patchDoc));
            $.ajax({
            contentType: "application/json",
            data: JSON.stringify(patchDoc),
            dataType: "json",
            method: "PATCH",
            url: "https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/locatie",
            success: function(){
              
              // if true (1)
                 setTimeout(function(){// wait for 5 secs(2)
                      location.reload(); // then reload the page.(3)
                 }, 0); 
              
           }
            });
       });

        });
        
        function initAutocomplete() {
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -33.8688, lng: 151.2195},
              zoom: 13,
              mapTypeId: 'roadmap'
            });
    
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
    
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();
    
              if (places.length == 0) {
                return;
              }
    
              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];
    
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
    
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
    
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
          }
          

          // EDIT DETALII

          $('#editDetaliiButton').click(function(){
            $('#detalii').prop('readonly', false);
            $("#editDetaliiButton span").text("Save");
        
                $('#editDetaliiButton').click(function(){
                    console.log($('#detalii').val());
                    var patchDoc =  { "detalii": $("#detalii").val()} ;
                    console.log(JSON.stringify(patchDoc));
                    $.ajax({
                    contentType: "application/json",
                    data: JSON.stringify(patchDoc),
                    dataType: "json",
                    method: "PATCH",
                    url: "https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/descriere"
                    });
                    
                    $("#editDetaliiButton span").text("Edit");
        
                    
                    $('#editDetaliiButton').unbind();
                    $('#detalii').prop('readonly', true);
        
                })
        });


                        });
    

//       //////
//   }
// });


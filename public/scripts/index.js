

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
        url : "http://127.0.0.1:8000/login",
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
            window.location = "http://localhost:8000/index";
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
     $( document ).ajaxComplete(function( event, request, settings ) {
        if(session!=0){
        console.log(session);
        sendVenueId(session);
        session = 0;
    }
        });

    

    
    console.log("still in the login");
    // console.log(session);
});
global_venue_id = "0";

$.ajax({
  type: "GET",
  url:"http://127.0.0.1:8000/getVenueId",
  data:"{}",
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  cache: false,
  success: function (data){
      console.log(data.venue_id);
      global_venue_id = data.venue_id;
      localStorage.setItem('venue_id', data.venue_id);
      //////
      
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
            // url:"https://radiant-beyond-44987.herokuapp.com/venue/" + global_venue_id,
            url:"https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37",

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
             url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/bautura",
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
                                            $("#closeEdit").click(function(){
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
    var url_imagini = "https://radiant-beyond-44987.herokuapp.com/venue/"+localStorage.getItem('venue_id')+"/imagini";
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
                            url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/deleteImagine/"+data[index]._id,
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
         url: "https://radiant-beyond-44987.herokuapp.com/oferta/" + localStorage.getItem('venue_id'),
        //  url: "https://radiant-beyond-44987.herokuapp.com/oferta/5c012fa7a909321da86edd37",

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
                       

                        });
    

      //////
  }
});


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
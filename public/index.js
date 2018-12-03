

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

$(document).ready(function() {
    jQuery.support.cors = true;
    var bautura = [];
    $.ajax({
        type: "GET",
        url:"http://127.0.0.1:4000/venue/5bf6f6a2bb7a60001617ef69",
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data){
            console.log(data);
            $("#numeVenue").text(data.nume);
            $("#locatieVenue").text(data.locatie);
            $("#descriereVenue").text(data.detalii);
        }
    });

    $.ajax(
    {
         type: "GET",
         url: "http://127.0.0.1:4000/bautura",
         data: "{}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         cache: false,
         success: function (data) {
			 console.log(data);
            bautura = data;
            console.log(bautura);
			$.each(data, function (key, value) {
                  
                  
                  $("table tbody").append("<tr>"+"<td>"+value.nume+"</td>"
                                 +"<td>"+value.cantitate+"</td>"
                                 +"<td>"+value.tip+"</td>"
                                 +"<td>"+value.locatie+"</td>"
                                 +"<td><a href='"+value.imagine+"'>Click pt imagine</a></td>"
                                 +"<td><button class='editButton'>Edit</button></td>"
                                 +"<td><button class='deleteButton'>Sterge</button></td>"+"</tr>" )


                                  var modal = document.getElementById('editModal');

                                 // Get the button that opens the modal
                                 var btnEdit = document.getElementsByClassName("editButton");
                                 var btnDelete = document.getElementsByClassName("deleteButton");
                                 
                                 $.each(btnDelete, function(index, value){
                                     btnDelete[index].onclick = function(){
                                        var result = confirm("Want to delete?");
                                        if (result) {
                                            $.ajax({
                                                url: "http://127.0.0.1:4000/bautura/"+bautura[index]._id,
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
                                        $("#cantitateEdit").val(bautura[index].cantitate);
                                        $("#tipEdit").val(bautura[index].tip);
                                        $("#locatieEdit").val(bautura[index].locatie);
                                        $("#imagineEdit").val(bautura[index].imagine);

                                        $("#EditBauturaForm").submit(function(event){
                                        event.preventDefault();
                                        ajaxUpdate();
                                        });

                                        function ajaxUpdate(){
                                                    var formData = {
                                                    nume : $("#numeEdit").val(),
                                                    cantitate :  $("#cantitateEdit").val(),
                                                    tip: $("#tipEdit").val(),
                                                    locatie: $("#locatieEdit").val(),
                                                    imagine: $("#imagineEdit").val()
                                                }

                                                $.ajax({
                                                            type : "PUT",
                                                            contentType : "application/json",
                                                            url : "http://127.0.0.1:4000/bautura/"+bautura[index]._id,
                                                            
                                                            data : JSON.stringify(formData),
                                                            dataType : 'json',
                                                            success : function(customer) {
                                                                console.log(formData);
                                                                console.log("put cu succes");
                                                                $("#postResultDiv").html("<p>" + 
                                                                    "Post Successfully! <br>" +
                                                                    "--->" + JSON.stringify(customer)+ "</p>"); 
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

                            }
                        })
                    });
                                
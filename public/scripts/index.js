

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

    $('input[type=file]').on("change", function() {

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
            console.log(response);
          });
    
        }
      });

    $.ajax({
        type: "GET",
        url:"https://radiant-beyond-44987.herokuapp.com/venue",
        data:"{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data){
            console.log(data);
            $("#numeVenue").text(data[0].nume);
            $("#locatieVenue").text(data[0].locatie);
        }
    });

    $.ajax(
    {
         type: "GET",
         url: "https://radiant-beyond-44987.herokuapp.com/bautura",
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
                                 +"<td>"+value.tip+"</td>"
                                 +"<td>"+value.locatie+"</td>"
                                 +"<td><a href='"+value.imagine+"'>Click pt imagine</a></td>"
                                 +"<td><button class='editButton'>Edit</button></td>"
                                 +"<td><button class='deleteButton'>Sterge</button></td>"+"</tr>" );


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
                                                            url : "https://radiant-beyond-44987.herokuapp.com/bautura/"+bautura[index]._id,
                                                            
                                                            data : JSON.stringify(formData),
                                                            dataType : 'json',
                                                            success : function(customer) {
                                                                console.log(formData);
                                                                console.log("put cu succes");
                                                                $("#postResultDiv").html("<p>" + 
                                                                    "Post Successfully! <br>" +
                                                                    "--->" + JSON.stringify(customer)+ "</p>"); 
                                                                    modal.style.display = "none";
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

                                });

                            }
                        })
                    });
                                
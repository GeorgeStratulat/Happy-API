

        var btnEditLocatie = document.getElementById("editLocatie");
        jQuery.support.cors = true;

        btnEditLocatie.onclick = function(){
           {
               var formData = {locatie:$("#locatieEdit").val()}
              var x = document.getElementById("locatieVenue");
              if (x.contentEditable == "false") {
                  x.contentEditable = "true";
                    $("#editLocatie").html("Disable content");
                } else {
                $.ajax({
                    type: "PATCH",
                    contentType: "application/json",
                    crossDomain: true,
                    url:"https://radiant-beyond-44987.herokuapp.com/venue/5bf6f6a2bb7a60001617ef69/"+$("#locatieVenue").val(),
                    data: JSON.stringify(formData),
                    dataType: "json",
                    success : function(customer) {
                        console.log("put cu succes");
                        $("#postResultDiv").html("<p>" + 
                            "Post Successfully! <br>" +
                            "--->" + JSON.stringify(customer)+ "</p>"); 
                    },
                    error : function(e) {
                        alert("Error!")
                        console.log("ERROR: ", e);
                    }

                })

                  x.contentEditable = "false";
                  btnEditLocatie.innerHTML = "Enable content of p to be editable!";
              }
          }
        }

          
          


        var btnEditDescriere = document.getElementById("editDescriere");
        jQuery.support.cors = true;

        btnEditDescriere.onclick = function(){
           {
               var formData = {detalii:$("#descriereEdit").val()}
              var x = document.getElementById("descriereVenue");
              console.log(x);
              if (x.contentEditable == "false") {
                  x.contentEditable = "true";
                    $("#editDescriere").html("Disable content");
                } else {
                $.ajax({
                    type: "PATCH",
                    contentType: "application/json",
                    crossDomain: true,
                    url:"http://127.0.0.1:4000/venue/5bf6f6a2bb7a60001617ef69/descriere/"+$('#descriereVenue').html(),
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

          
          
$.ajax({
    type: "GET",
    url:"https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/imagini",
    data:"{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
    success: function (data){
        console.log("imagini->>>" + data);
        data.forEach(function(img){
            console.log(img);
            $("#imagini-sortable").append("<li class='ui-state-default'><image class='img-responsive' style='width: 20em; height: 20em;' id='imagineBautura' src=''> </image>"+
            "<button class='btn btn-danger deleteImagineVenue' >Sterge</button></li>");
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
                                // location.reload();
                                
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
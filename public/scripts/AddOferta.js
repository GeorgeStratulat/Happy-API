$("#btnAddOferta").click(function(){
        $("#addOfertaModal").show();
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
                          
                          
                          $("#BauturaOfertaAdd").append("<option id='optiune'>"+value.nume+"</option>" );
                                    $('#optiune').val(value._id);
                                    $('#optiune').attr('id', 'alt_id');
                                        });
        
                                    }
                                });

                    $("#addOfertaButton").click(function(){
                    var checked_days = [];
                    $.each($(".check-day:checked"), function(){            
                    checked_days.push($(this).val());
                    });
                    var formData = {
                        nume : $("#numeOfertaAdd").val(),
                        locatie_id : "5c012fa7a909321da86edd37",
                        numar_bauturi: $("#numarBauturiOfertaAdd").val(),
                        bautura_id: $("#BauturaOfertaAdd option:selected").val(),
                        tip_oferta: $("#TipOfertaAdd").val(),
                        zile: checked_days,
                        ora_inceput: $("#ora_inceput").val(),
                        ora_sfarsit: $("#ora_sfarsit").val()
                            }
                        addOferta(formData);
                                    // console.log("esti prost");
                    })

                    function addOferta(formData){
                        console.log(formData);
                        $.ajax({
                            type : "POST",
                            contentType : "application/json",
                            url : "https://radiant-beyond-44987.herokuapp.com/oferta/5c012fa7a909321da86edd37/addOferta",
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

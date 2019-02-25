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
            url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/descriere"
            });
            
            $("#editDetaliiButton span").text("Edit");

            
            $('#editDetaliiButton').unbind();
            $('#detalii').prop('readonly', true);

        })
});
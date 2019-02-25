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
			locatie: "5c012fa7a909321da86edd37"
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
        url: "https://radiant-beyond-44987.herokuapp.com/venue/5c012fa7a909321da86edd37/addBautura",
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

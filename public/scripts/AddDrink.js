$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#AddBauturaForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		nume : $("#nume").val(),
            cantitate :  $("#cantitate").val(),
            tip : $("#tip").val(),
            locatie : $("#locatie").val(),
            imagine : $("#imagine").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "https://radiant-beyond-44987.herokuapp.com/bautura/addBautura",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				$("#postResultDiv").html("<p>" + 
					"Post Successfully! <br>" +
					"--->" + JSON.stringify(customer)+ "</p>"); 
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
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
})
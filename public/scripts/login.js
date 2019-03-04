var session = "ceva";
var session_send = "altceva";
function getVenueId(formData){
    $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "https://radiant-beyond-44987.herokuapp.com/admin_venue/login",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(customer) {
                console.log(JSON.stringify(customer) );
                // req.session.venue_id = customer.venue_id;
                session = customer.venue_id;
                session_send = session;
                // return session;
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
}

function sendVenueId(formData){
    console.log(formData);
    var post = {"session": formData}
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "http://127.0.0.1:8000/login",
        data : JSON.stringify(post),
        dataType : 'text',
        success : function(customer) {
            console.log(JSON.stringify(customer));
            // console.log(customer);
            // obj = JSON.parse(customer);
            // console.log(obj.venue_id);
            // console.log(JSON.stringify(customer) );
            // req.session.venue_id = customer.venue_id;
            // window.localStorage.setItem("venue_id", customer.venue_id);
            // console.log(window.localStorage.getItem("venue_id"));
            window.location = "http://localhost:8000/index";
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}


$("#login_button").click(function(){
    var formData = {
        username: $("#username_input").val(),
        password: $("#password_input").val()
    };
    // var session = getVenueId(formData);
    // console.log(session);
    
     getVenueId(formData);
     $( document ).ajaxComplete(function( event, request, settings ) {
        if(session!=0){
        console.log(session);
        sendVenueId(session);
        session = 0;
    }
        });

    

    
    console.log("still in the login");
    // console.log(session);
});
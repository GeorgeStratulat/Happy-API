var session = "ceva";
var session_send = "altceva";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });


  
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
        url : "https://happy-admin-da582.firebaseapp.com/login",
        data : JSON.stringify(post),
        dataType : 'text',
        success : function(customer) {
            console.log(JSON.stringify(customer));
           
            window.location = "https://happy-admin-da582.firebaseapp.com/index.html";
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

    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error " + errorMessage);
      });
    // var session = getVenueId(formData);
    // console.log(session);
    
    //  getVenueId(formData);
    //  $( document ).ajaxComplete(function( event, request, settings ) {
    //     if(session!=0){
    //     console.log(session);
    //     sendVenueId(session);
    //     session = 0;
    // }
    //     });

    

    
    // console.log(session);
});
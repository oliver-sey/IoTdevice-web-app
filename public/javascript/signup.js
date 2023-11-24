let requestBody = {
    email: "",
    password: ""
}

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    // call the function that will add all the click handlers
    // we put this in a function because it didn't seem to add the handlers
    // if we did it outside a function
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers()
})

// **** put all your adding click handlers in here!!!
// this gets called when the document is ready
function addClickHandlers() {
    console.log("in the addClickHandlers function")
    
    // when you click 'Sign up' button on the login screen, call logIn()
    $("#submit").click((event) => {
        event.preventDefault()
        signUp()
    })
}

function setRequestBody() {
    requestBody.email = $("#email").val()
    requestBody.password = $("#password").val()
    console.log("requestBody", requestBody)
}

function signUp() {
    console.log("In the signUp() function")
    setRequestBody()
    $.ajax({
        url: "/users/create", 
        method: "POST",
        data: JSON.stringify(requestBody),
        contentType: "application/json",
        dataType: "json"
     })
     .always(function(data) {
        console.log("result", data)
        window.location.assign("signin.html")
        alert("Sign up Success! Now please Sign in")
     })
     .done(function(data) {
        console.log("signUp success", data);
     });
}
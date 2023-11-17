
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
    
    // when you click 'Sign in' button on the login screen, call logIn()
    $("#signin").click(logIn)
}


function setRequestBody() {
    requestBody.email = $("#floatingInput").val()
    requestBody.password = $("#floatingPassword").val()
}

function logIn() {
    console.log("In the logIn() function")
    //setRequestBody()
    console.log("hostname", window.location.pathname)
    // $.ajax({
    //     url: "/user", 
    //     method: "GET",
    //     data: requestBody,
    //     dataType: "json"
    //  })
    //  .done(function(data) {
    //     console.log("Login Success", data);
    //  });
}
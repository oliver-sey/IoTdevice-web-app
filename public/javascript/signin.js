
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
    $("#signin").click((event) => {
        event.preventDefault()
        logIn()
    })
}


function setRequestBody() {
    requestBody.email = $("#floatingInput").val()
    requestBody.password = $("#floatingPassword").val()
    console.log("requestBody", requestBody)
}

function logIn() {
    console.log("In the logIn() function")
    setRequestBody()
    $.ajax({
        // hard coded for testing. CHANGE HERE LATER!!! DELETE: http://localhost:3000
        url: "/users/user", 
        method: "POST",
        data: JSON.stringify(requestBody),
        contentType: "application/json",
        dataType: "json"
     })
     .done(function(data) {
        console.log("response data", data)
        localStorage.setItem("userName", data.userName)
        localStorage.setItem("email", data.email)
        localStorage.setItem("password", data.password)
        localStorage.setItem("jwt", data.jwt)
        window.location.assign("LoggedInPage.html")
        alert("Login Success")
     })
     .fail(function(err) {
        alert("Login Fail")
     })
}
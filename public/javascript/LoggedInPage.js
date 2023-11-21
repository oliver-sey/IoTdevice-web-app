let requestBody = {
    email: "",
    password: ""
}

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers()
})


function addClickHandlers() {
    console.log("in the addClickHandlers function")
    setRequestBody()
    $.ajax({
        url: "/users/user", 
        method: "GET",
        data: requestBody,
        contentType: "application/json",
        dataType: "json"
     })
     .done(function(data) {
        console.log("Success", data)
        $('#useremail').text(data.email)
     })
     .fail(function(err) {
        alert("Login Fail")
     });
}

function setRequestBody() {
    requestBody.email = localStorage.getItem('email')
    requestBody.password = localStorage.getItem('password')
    console.log("requestBody", requestBody)
}
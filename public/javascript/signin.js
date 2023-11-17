
let requestBody = {
    email: "",
    password: ""
}

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
})

$("#signin").click(() => {
    console.log("hostname", window.location.pathname)
})


function setRequestBody() {
    requestBody.email = $("#floatingInput").val()
    requestBody.password = $("#floatingPassword").val()
}

function logIn() {
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
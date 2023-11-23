let requestBody = {
    email: "",
    password: ""
}

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    $.ajax({
        url: `/device/mydevices?email=${localStorage.getItem('email')}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json"
    })
    .done(function(res) {
        console.log("my devices", res, res.length)
        //ex https://api.thingspeak.com/channels/2349152/charts/1?api_key=MPQACWXEJVYHLC7K
        for (let i in res) {
            $('#deviceStart').append(`<p id="${i}">Device ${i + 1}  ${res[i].deviceName}</p>`)
        }
    })
     .fail(function(err) {
        console.log("my devices err", err)
     })
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
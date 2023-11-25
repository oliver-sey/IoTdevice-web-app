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
        for (let i = 0; i < res.length; i++) {
            $('#deviceStart').append(`<p id="${i}">Device ${i + 1} ${res[i].deviceName}<a href="./device.html?deviceName=${res[i].deviceName}">View this device</a></p>`)
        }
    })
     .fail(function(err) {
        $('#deviceStart').text("You have no device yet!")
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

     $('#logOut').click(logOut)
}

function setRequestBody() {
    requestBody.email = localStorage.getItem('email')
    requestBody.password = localStorage.getItem('password')
    console.log("requestBody", requestBody)
}

function logOut() {//after logout, clear local storage
    localStorage.clear()
    alert("You have successfully log out!")
}
let device = {
    email: "",
    deviceName: "",
    channelID: "",
    readAPI_Key: "",
    register_Date: ""
}

$(document).ready(()=>{
    if (!localStorage.getItem('jwt')) {//check if user logged in yet
        alert('Please log in first...')
        window.location.assign("signin.html")
    }
    console.log("hostname", window.location.hostname)
    // call the function that will add all the click handlers
    // we put this in a function because it didn't seem to add the handlers
    // if we did it outside a function
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers()
})

function addClickHandlers() {
    console.log("in the addClickHandlers function")
    //register button click listener
    $('#register').click(registerDevice)
}

function registerDevice() {
    console.log("registerDevice()")
    setRequestBody()
    $.ajax({
        url: `https://api.thingspeak.com/channels/${device.channelID}/feeds.json?api_key=${device.readAPI_Key}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json"
    })
    .done(function(data) {
        console.log("get device data", data)
        $.ajax({
            url: '/device/register',
            method: "POST",
            data: JSON.stringify(device),
            contentType: "application/json",
            dataType: "json",
            headers: {"x-access-token" : localStorage.getItem('jwt')}
        })
        .done(function(res) {
            console.log("backend res", res)
            window.location.assign("LoggedInPage.html")
            alert("register device success, redirect to your home page")
        })
        .fail(function(err) {
            console.log("backend err", err)
            alert("Register Fail")
        })
     })
     .fail(function(err) {
        alert("Register Device Fail! (your device is not register on Particle Website or your webhook is not setup yet)")
     })
}

function setRequestBody() {
    device.email = localStorage.getItem('email')
    device.deviceName = $("#deviceName").val()
    device.channelID = $("#channelID").val()
    device.readAPI_Key = $("#readAPI_Key").val()
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    device.register_Date = dateTime
    console.log("device content", device)
}
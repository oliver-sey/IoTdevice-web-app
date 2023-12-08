// Define a 'device' object to be used as the request body for device-related operations
let device = {
    email: "",
    deviceName: "",
    channelID: "",
    readAPI_Key: "",
    register_Date: ""
}

$(document).ready(() => {
    // Check if the user is logged in by verifying the presence of a JWT token in local storage
    if (!localStorage.getItem('jwt')) {
        alert('Please log in first...') // Alert the user if not logged in
        window.location.assign("signin.html") // Redirect to the sign-in page
    }
    console.log("hostname", window.location.hostname)

    // Call a function to add click handlers, necessary for proper dynamic behavior
    console.log("Document is ready, calling addClickHandlers()")
    addClickHandlers()
})

// Function to add event handlers for user interactions
function addClickHandlers() {
    console.log("in the addClickHandlers function")
    // Add click event listener to the 'register' button
    $('#register').click(registerDevice)
}

// Function to handle the device registration process
function registerDevice() {
    console.log("registerDevice()")
    setRequestBody() // Set the request body with the user input

    // AJAX call to verify the device's existence and setup on ThingSpeak
    $.ajax({
        url: `https://api.thingspeak.com/channels/${device.channelID}/feeds.json?api_key=${device.readAPI_Key}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json"
    })
    .done(function(data) {
        console.log("get device data", data)

        // If the device is verified, register it in the backend database
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
            window.location.assign("LoggedInPage.html") // Redirect to home page after successful registration
            alert("register device success, redirect to your home page")
        })
        .fail(function(err) {
            console.log("backend err", err)
            alert("Register Fail") // Alert for registration failure
        })
     })
     .fail(function(err) {
        // Alert for failure in verifying the device on ThingSpeak
        alert("Register Device Fail! (your device is not register on Particle Website or your webhook is not setup yet)")
     })
}

// Function to set the request body with user input and current date-time
function setRequestBody() {
    device.email = localStorage.getItem('email') // Get user email from local storage
    device.deviceName = $("#deviceName").val() // Get device name from input field
    device.channelID = $("#channelID").val() // Get channel ID from input field
    device.readAPI_Key = $("#readAPI_Key").val() // Get API key from input field

    // Generate current date and time for registration timestamp
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    device.register_Date = dateTime // Set the registration date and time

    console.log("device content", device) // Log the content of the 'device' object for debugging
}

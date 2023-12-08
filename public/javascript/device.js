$(document).ready(() => {
    // Log the current hostname to the console for debugging purposes
    console.log("hostname", window.location.hostname);

    // Parse the query string from the URL
    const queryString = window.location.search;
    // Create an object to easily access URL parameters
    const urlParams = new URLSearchParams(queryString);

    // AJAX request to fetch device details based on the device name from URL parameters
    $.ajax({
        url: `/device/mydevices?deviceName=${urlParams.get('deviceName')}`, // Construct URL with device name query parameter
        method: "GET", // Use GET method for the request
        contentType: "application/json", // Set the content type of the request to JSON
        dataType: "json", // Expect a JSON response
        headers: {"x-access-token" : localStorage.getItem('jwt')} // Include JWT token in the request header for authorization
    })
    .done(function (res) {
        // Log the response when the AJAX request is successful
        console.log("device res", res);
    })
    .fail(function(err) {
        // Log any errors if the AJAX request fails
        console.log("get device err", err);
    })
})

// Note: The HTML comment below provides an example of how to create a link to view a device's details on ThingSpeak.
//<a href="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}">View this device</a>

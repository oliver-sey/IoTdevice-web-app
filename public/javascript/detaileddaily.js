$(document).ready(() => {
    // Check if the user is logged in by looking for a JSON Web Token (JWT) in localStorage
    if (!localStorage.getItem('jwt')) {
        alert('Please log in first...') // Alert the user to log in
        window.location.assign("signin.html") // Redirect to the sign-in page
    }
    console.log("hostname", window.location.hostname) // Log the hostname for debugging purposes

    // Event listener for changes to the date input field
    $('#date').change(() => {
        $('#firstDiv').nextAll().remove() // Remove all elements after the first div if the date changes

        console.log("date", $('#date').val()) // Log the selected date for debugging

        // AJAX request to get all devices associated with the user
        $.ajax({
            url: `/device/mydevices?email=${localStorage.getItem('email')}`, // API endpoint with user's email as a query parameter
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {"x-access-token" : localStorage.getItem('jwt')} // Include the JWT in the request header
        })
        .done(function(res) {
            console.log("my devices", res, res.length) // Log the response containing the devices

            // Loop through each device and display it
            for (let i = 0; i < res.length; i++) {
                // Append a div with device information and embedded ThingSpeak charts
                $('#firstDiv').after(`<div><p>Device ${i+1}: ${res[i].deviceName}</p><iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}&end=${$('#date').val()}&title=Your_HeartRate_At:${$('#date').val()}&results=50&yaxis=Heart_Rate(BPM)&xaxis=Time"></iframe> <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/2?api_key=${res[i].readAPI_Key}&yaxis=Blood_Oxygen_Saturation(BOS)&results=1000&min=90&yaxismin=0&xaxis=Time&end=${$('#date').val()}&title=Blood_Oxygen_Saturation_At:${$('#date').val()}&results=50"></iframe></div>`)
            }
        })
        .fail(function(err) {
            $('#deviceStart').text("You have no device yet!") // Display an error message if the request fails
            console.log("my devices err", err) // Log the error for debugging
        })
    })
})

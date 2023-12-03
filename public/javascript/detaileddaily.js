$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    $('#date').change(() => {
        $('#firstDiv').nextAll().remove()
        console.log("date", $('#date').val())
        $.ajax({
            url: `/device/mydevices?email=${localStorage.getItem('email')}`,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {"x-access-token" : localStorage.getItem('jwt')}
        })
        .done(function(res) {
            console.log("my devices", res, res.length)
            //ex https://api.thingspeak.com/channels/2349152/charts/1?api_key=MPQACWXEJVYHLC7K
            for (let i = 0; i < res.length; i++) {
                $('#firstDiv').after(`<div><p>Device ${i+1}: ${res[i].deviceName}</p><iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}&end=${$('#date').val()}&title=Your_HeartRate_At:${$('#date').val()}&results=30"></div>`)
                //<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/250296/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=50&type=line&update=15">
            }
        })
         .fail(function(err) {
            $('#deviceStart').text("You have no device yet!")
            console.log("my devices err", err)
         })
     })
})


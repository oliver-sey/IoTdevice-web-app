$(document).ready(()=>{
    if (!localStorage.getItem('jwt')) {//check if user logged in yet
        alert('Please log in first...')
        window.location.assign("signin.html")
    }
    console.log("hostname", window.location.hostname)
    $('#date').change(() => {// date change even listener
        $('#firstDiv').nextAll().remove()//if date change, remove all ealier devices
        console.log("date", $('#date').val())
        $.ajax({//ajax call to get all devices
            url: `/device/mydevices?email=${localStorage.getItem('email')}`,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            headers: {"x-access-token" : localStorage.getItem('jwt')}
        })
        .done(function(res) {
            console.log("my devices", res, res.length)
            //ex https://api.thingspeak.com/channels/2349152/charts/1?api_key=MPQACWXEJVYHLC7K
            for (let i = 0; i < res.length; i++) {//display all user devices in detailed daily view
                $('#firstDiv').after(`<div><p>Device ${i+1}: ${res[i].deviceName}</p><iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}&end=${$('#date').val()}&title=Your_HeartRate_At:${$('#date').val()}&results=50&yaxis=Heart_Rate(BPM)&xaxis=Time"></iframe> <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/2?api_key=${res[i].readAPI_Key}&yaxis=Blood_Oxygen_Saturation(BOS)&results=1000&min=90&yaxismin=0&xaxis=Time&end=${$('#date').val()}&title=Blood_Oxygen_Saturation_At:${$('#date').val()}&results=50"></iframe></div>`)
                //<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/250296/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=50&type=line&update=15">
            }
        })
         .fail(function(err) {
            $('#deviceStart').text("You have no device yet!")
            console.log("my devices err", err)
         })
     })
})


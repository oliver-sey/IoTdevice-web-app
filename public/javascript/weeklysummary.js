$(document).ready(()=>{
    if (!localStorage.getItem('jwt')) {//check if user logged in yet
        alert('Please log in first...')
        window.location.assign("signin.html")
    }

    console.log("hostname", window.location.hostname)
    $.ajax({//ajax for getting devices data
        url: `/device/mydevices?email=${localStorage.getItem('email')}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {"x-access-token" : localStorage.getItem('jwt')}//token check
    })
    .done(function(res) {//if success, display all device data
        console.log("my devices", res, res.length)
        //ex https://api.thingspeak.com/channels/2349152/charts/1?api_key=MPQACWXEJVYHLC7K
        for (let i = 0; i < res.length; i++) {
            $(`#div${i}`).after(`<div id="div${i+1}"><p>Device ${i+1}: ${res[i].deviceName}</p><iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}&title=Heart_Rate&days=7&yaxis=Heart_Rate(BPM)&results=1000"></iframe> <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/2?api_key=${res[i].readAPI_Key}&title=Blood_Oxygen_Saturation&days=7&yaxis=Blood_Oxygen_Saturation(BOS)&results=1000"></iframe></div>`)
            //<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/250296/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=50&type=line&update=15">
        }
    })
     .fail(function(err) {//if fail, let user know they do not have a device yet
        $('#deviceStart').text("You have no device yet!")
        console.log("my devices err", err)
     })
     
})

$(document).ready(()=>{
    console.log("hostname", window.location.hostname)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    $.ajax({
        url: `/device/mydevices?deviceName=${urlParams.get('deviceName')}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {"x-access-token" : localStorage.getItem('jwt')}
    })
    .done(function (res) {
        console.log("device res", res)
        
    })
    .fail(function(err) {
        console.log("get device err", err)
    })
})

//<a href="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}">View this device</a>
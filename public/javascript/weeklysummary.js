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
            $(`#div${i}`).after(`<div id="div${i+1}"><p id="device"><b>Device ${i+1}: ${res[i].deviceName}</b></p><iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/1?api_key=${res[i].readAPI_Key}&title=Heart_Rate_VS_Time&yaxis=Heart_Rate(BPM)&min=65&yaxismin=0&results=50&xaxis=Time"></iframe> <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://api.thingspeak.com/channels/${res[i].channelID}/charts/2?api_key=${res[i].readAPI_Key}&title=Blood_Oxygen_Saturation_VS_Time&days=7&yaxis=Blood_Oxygen_Saturation(BOS)&results=1000&min=90&yaxismin=0&xaxis=Time"></iframe></div>`)

            //ajax for getting average heart rate and blood oxygen saturation
            $.ajax({
                url: `https://api.thingspeak.com/channels/${res[i].channelID}/feeds.json?api_key=${res[i].readAPI_Key}&max=100&min60`,
                method: 'GET',
                contentType: "application/json",
                dataType: "json",
            })
            .done((res) => {
                console.log("average", res.feeds)
                let maxHR = 0
                let minHR = 65
                let maxBOS = 0
                let minBOS = 100
                for (let data of res.feeds) {
                    if(data.field1 > maxHR && data.field1 !== null)
                        maxHR = data.field1

                    if(data.fieldf1 < minHR && data.field1 !== null)
                        minHR = data.field1

                    if(data.field2 > maxBOS && data.field2 !== null)
                        maxBOS = data.field2

                    if(data.field2 < minBOS && data.field2 !== null)
                        minBOS = data.field2
                }
                
                $(`#div${i + 1}`).after(`<p><b>MAX Heart_Rate: </b>${maxHR}(bpm)<br> <b>MIN Heart_Rate: </b>${minHR}(bpm) <br> <b>MAX Blood_Oxygen_Saturation: </b>${maxBOS}% <br> <b>MIN Blood_Oxygen_Saturation:  </b>${minBOS}%</p>`)
            })
            .fail((err) => {
                console.log("average fail", err)
            })

            //ajax call for getting max and min data for heart rate and blood oxygen saturation
            $.ajax({
                url: `https://api.thingspeak.com/channels/${res[i].channelID}/feeds.json?results=3&api_key=${res[i].readAPI_Key}&average=10`,
                method: 'GET',
                contentType: "application/json",
                dataType: "json",
            })
            .done((res) => {
                console.log("average", res)
                $(`#div${i + 1}`).after(`<p><b>Average Heart_Rate: </b>${res.feeds[1].field1}(bpm) <br> <b>Average Blood_Oxygen_Saturation: </b>${res.feeds[0].field2}%</p>`)
            })
            .fail((err) => {
                console.log("average fail", err)
            })
            //<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/250296/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=50&type=line&update=15">
        }
    })
     .fail(function(err) {//if fail, let user know they do not have a device yet
        $('#deviceStart').text("You have no device yet!")
        console.log("my devices err", err)
     })
     
})
let requestBody = {
    email: "",
    password: ""
}

$(document).ready(()=>{
    if (!localStorage.getItem('jwt')) {//check if user logged in yet
        alert('Please log in first...')
        window.location.assign("signin.html")
    }

    console.log("hostname", window.location.hostname)
    $.ajax({//ajax call to get all user devices
        url: `/device/mydevices?email=${localStorage.getItem('email')}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {"x-access-token" : localStorage.getItem('jwt')}
    })
    .done(function(res) {
        console.log("my devices", res, res.length)
        //ex https://api.thingspeak.com/channels/2349152/charts/1?api_key=MPQACWXEJVYHLC7K
        for (let i = 0; i < res.length; i++) {//display all user devices in a table
            $(`#r${i}`).after(`<tr id="r${i + 1}"> <td>${i + 1}</td> <td>${res[i].deviceName}</td> <td>${res[i].register_Date}</td>  <td><button id="btn${i + 1}">delete</button></td></tr>`)

            $(`#btn${i + 1}`).click(() => {//event listener for ajax call to delete a device and reload the page after deleted
                $.ajax({//
                    url: "/device/delete",
                    method: "DELETE",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({deviceName: res[i].deviceName}),
                    headers: {"x-access-token" : localStorage.getItem('jwt')}
                })
                .done((data) => {
                    console.log("delete success", data)
                    alert("Delete this device?")
                    location.reload();
                })
                .fail((err) => {
                    console.log("delete fail", err)
                    alert("Delete fail")
                })
            })
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
    $('#userName').text(localStorage.getItem('userName'))//set user name as userName
    //setRequestBody()
    // $.ajax({
    //     url: "/users/user", 
    //     method: "POST",
    //     data: JSON.stringify(requestBody),
    //     contentType: "application/json",
    //     dataType: "json"
    //  })
    //  .done(function(data) {
    //     console.log("Success", data)
    //     $('#useremail').text(data.userName)
    //  })
    //  .fail(function(err) {
    //     alert("Login Fail")
    //  });

     $('#newDevice').click(function(param) {//redirect to register device page
        window.location.assign("registerDevice.html")
     })
     $('#logOut').click(logOut)//log out and redirect to log in page
}

function setRequestBody() {//set request body
    requestBody.email = localStorage.getItem('email')
    requestBody.password = localStorage.getItem('password')
    console.log("LoggedIn requestBody", requestBody)
}

function logOut() {//after logout, clear local storage
    localStorage.clear()
    window.location.assign("signin.html")
    alert("You have successfully log out!")
}

// loads a navbar into the desired page.
// make sure you have the following linked into that page inorder for the navbar to work:

// this goes in the head tag:
// <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
// this goes in the body tag
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
//<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

function loadNavbar() {
    //the code below adds the navbar to our target html page
    document.getElementById('navbar-placeholder').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
            <a class="navbar-brand" href="LoggedInPage.html">
            <img src="/images/heart-stethoscope-no-bg.svg" width="30" height="30"class="d-inline-block align-top" alt="" style="margin-right:4%;">Heartrate Helper
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="./LoggedInPage.html">Your Devices</a>
                    </li>

                    <!-- dropdown for detailed daily and weekly -->
                    <li>
                        <div class="btn-group">
                        <button type="button" class="btn btn-primary-outline dropdown-toggle nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            View Your Data
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="./weeklysummary.html">Weekly Summary</a>
                            <a class="dropdown-item" href="./detaileddaily.html">Detailed Daily</a>
                            <!-- <div class="dropdown-divider"></div> -->
                            <!-- <a class="dropdown-item" href="#">Separated link</a> -->
                        </div>
                        </div>
                    </li>


                    <!-- <li class="nav-item">
                        <a class="nav-link" href="./weeklysummary.html">Weekly Summary</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./detaileddaily.html">Detailed Daily</a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" href="./index.html">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./references.html">References</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./accountsettings.html">Account Settings</a>
                    </li>
                    <li class = "nav-item">
                    <button type="button" class="btn btn-secondary logout-link" href="./signin.html">
                        Logout
                    </button>
                        <!-- <a class="nav-link logout-link" href="./signin.html">Logout</a> -->
                    </li>
                </ul>
            </div>
        </nav>
    `;
        // add logout function listener
        document.querySelector('.logout-link').addEventListener('click', function(event) {
            logOut();
        });
}

//this is a function that the navbar can call that supports logging out
function logOut() {
    localStorage.clear();
    alert("You have successfully logged out!");
    window.location.href = './signin.html';
}

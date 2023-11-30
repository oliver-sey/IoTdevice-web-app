// loads a navbar into the desired page.
// make sure you have the following linked into that page inorder for the navbar to work:

// this goes in the head tag:
// <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
// this goes in the body tag
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
//<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

function loadNavbar() {
    document.getElementById('navbar-placeholder').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Heartrate Helper</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="./weeklysummary.html">Weekly Summary</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./detaileddaily.html">Detailed Daily</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./index.html">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./accountsettings.html">Account Settings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./references.html">References</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
}

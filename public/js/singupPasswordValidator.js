document.getElementById("submit").addEventListener('click', function() {
    let formErrors = document.getElementById("formErrors")
    formErrors.innerHTML = '';
    formErrors.style.display = 'none';

    let name =  document.getElementById("fullName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmpassword = document.getElementById("passwordConfirm");
    let errors = []


    console.log(name.value)
    console.log(email.value)
    console.log(password.value)
    // perform checks
    if (name.value.length < 1) {
        errors.push("Missing full name.")
        name.classList.add('error');
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(email.value)){
        errors.push("Invalid or missing email address.")
        email.classList.add('error');
    }

    if( 10 > password.value.length || password.value.length > 20) {
        errors.push("Password must be between 10 and 20 characters.")
        password.classList.add('error');
    }
    
    if(!/[a-z]/.test(password.value)) {
        errors.push("Password must contain at least one lowercase character.");
        password.classList.add('error');
    }

    if(!/[A-Z]/.test(password.value)) {
        errors.push("Password must contain at least one uppercase  character.");
        password.classList.add('error');
    }

    if(!/[0-9]/.test(password.value)) {
        errors.push("Password must contain at least one digit.");
        password.classList.add('error');
    }

    if (password.value != confirmpassword.value) {
        errors.push("Password and confirmation password don't match.")
        confirmpassword.classList.add('error');
    }
    
    if (errors.length>0) {
        formErrors.innerHTML = '<ul><li>'+ errors.join('</li><li>') + '</li></ul>';
        formErrors.style.display = 'block'
    }

});
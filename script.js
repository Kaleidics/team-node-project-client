'use strict'
// ============== MODAL CONTROLS  =========================
function toggleOnSignUp() {
    $('#signUpBtn').on('click', function(event) {
        $('#signup-Modal').addClass('unhide');
    });
}

function toggleOffSignUp() {
    $('.closeBtn').on('click', function(event) {
        $('#signup-Modal').removeClass('unhide');
    });
}

function toggleOnLogin() {
    $('#loginBtn').on('click', function(event) {
        $('#login-Modal').addClass('unhide');
    });
}

function toggleOffLogin() {
    $('.closeBtn').on('click', function(event) {
        $('#login-Modal').removeClass('unhide');
    });
}
//==========================================================//

// =================  AUTH AJAX  ========================

function SignUp() {
    const url = 'http://localhost:8080/api/users/register';

    const username = $('#usernameS').val();
    const password = $('#passwordS').val();

    const signupCreds = {
        username: username,
        password: password
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(signupCreds),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('signup success', response);
        //if response success trigger login modal
        if (response.status === 201){
            $('#signup-Modal').removeClass('unhide');
            $('#login-Modal').addClass('unhide');
        }
    })
    .catch(err => console.log(err));
}

function login() {
    const url = 'http://localhost:8080/api/auth/login';

    const username = $('#usernameL').val();
    const password = $('#passwordL').val();

    const loginCreds = {
        username: username,
        password: password
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginCreds),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('login success', response);
        const {authToken} = response;
        console.log(authToken);
        //store jwt
        localStorage.setItem('localtoken', authToken);
    })
    .catch(err => console.log(err));
}
// =========================================================//

//================== AUTH FORM LISTENERS =======================

function submitSignUp() {
    $('#signup-submit').on('submit', (event) => {
        event.preventDefault();
        console.log('clicked');
        SignUp();
    });
}

function submitLogin() {
    $('#login-submit').on('submit', (event) => {
        event.preventDefault();
        console.log('clicked');
        login();
    });
}
//==========================================================//








function documentReady() {
//MODAL CONTROLS
    toggleOnSignUp();
    toggleOffSignUp();
    toggleOnLogin();
    toggleOffLogin();
//AUTH FORM LISTENERS
    submitSignUp();
    submitLogin();
}

$(documentReady);
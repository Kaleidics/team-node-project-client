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
    .then(response => {
        if (localStorage.getItem('localtoken')){
            $('#login-Modal').removeClass('unhide');
            $('#post-nav').removeClass('hidden');
            $('#pre-nav').addClass('hidden');
        }
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

// ==================  SIMULATE STATES =====================
//loads different navbars depending if jwt is in local storage
function pseudoState() {
    console.log('using pseudostate');
    $(window).on('load', (event) => {
        if (localStorage.getItem('localtoken')) {
            console.log('triggered');
            $('#post-nav').toggleClass('hidden');
            $('#pre-nav').toggleClass('hidden');
        }
    })

}

function logout() {
    $('#logoutBtn').on('click', (event) => {
        console.log('logged out');
        localStorage.removeItem('localtoken');
        $('#post-nav').toggleClass('hidden');
        $('#pre-nav').toggleClass('hidden');
    })
}
// =========================================================//




function documentReady() {
//SIMULATE STATES
    pseudoState();
    logout();
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
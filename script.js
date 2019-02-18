'use strict'

function toggleOnSignUp() {
    $('#signUpBtn').on('click', function(event) {
        event.stopPropagation();
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
        event.stopPropagation();
        $('#login-Modal').addClass('unhide');
    });
}

function toggleOffLogin() {
    $('.closeBtn').on('click', function(event) {
        $('#login-Modal').removeClass('unhide');
    });
}

function documentReady() {
    toggleOnSignUp();
    toggleOffSignUp();
    toggleOnLogin();
    toggleOffLogin();
}

$(documentReady);
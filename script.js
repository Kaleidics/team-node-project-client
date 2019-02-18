'use strict'

function toggleOnSignUp() {
    $('#modalBtn').on('click', function (event) {
        $('#simpleModal').addClass('unhide');
    });
}

function toggleOffSignUp() {
    $('.closeBtn').on('click', function (event) {
        $('#simpleModal').removeClass('unhide');
    });
}

function documentReady() {
    toggleOnSignUp();
    toggleOffSignUp();
}

$(documentReady);
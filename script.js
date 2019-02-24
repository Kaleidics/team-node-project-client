'use strict'
const sport = 'basketball';

// ============== MODAL CONTROLS  =========================
function toggleOnSignUp() {
    $('#signUpBtn').on('click', function(event) {
        $('#signup-Modal').addClass('unhide');
        $('#login-Modal').removeClass('unhide');
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
        $('#signup-Modal').removeClass('unhide');
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
    .then(response => {
        console.log('signup triggered');
        //if response success trigger login modal
        if (response.status === 201){
            $('#signup-Modal').removeClass('unhide');
            $('#login-Modal').addClass('unhide');
        }
        //if fail any signup requirements trigger error message
        else {
            return response.json()
            .then(response => {
                console.log(response);
                alert(`${response.location} ${response.message}`);
            })
            .catch(err => console.log(err));
        }
        return response.json();
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
        const authToken = response.authtoken;
        const userid = response.userid;
        console.log(authToken);
        //store jwt
        localStorage.setItem('localtoken', authToken);
        localStorage.setItem('currentUser', userid);
    })
    .then(response => {
        if (localStorage.getItem('localtoken')){
            $('#login-Modal').removeClass('unhide');
            $('#post-nav').removeClass('hidden');
            $('#pre-nav').addClass('hidden');
            console.log('logged in');
        }
    })
    .catch(err => console.log(err));
}
// =========================================================//
//================== AJAX EVENT LISTENERS  ==================
//for making a new post the form button
function registerCreate() {
    $('.createTeamForm').on('submit', (event) => {
        event.preventDefault();
        console.log('attempted the post request');
        if(localStorage.getItem('localtoken') === null) {
            alert('Login to make a post!');
            return;
        }
        else {
            console.log('logged in, attempting to post server');
            createTeam();
        }
    });
}

function registerFind() {
    $('#findBtn').on('click', (event) => {
        viewPosts();
    });
}

function registerProfile() {
    $('#profileBtn').on('click', (event) => {
        viewProfile();
    })
}


//============================================================//
//==================  TEAM ROUTES AJAX  =========================
//new post
function createTeam() {
    const url = 'http://localhost:8080/api/teams/';

    const localtoken = localStorage.getItem('localtoken');
    const title = $('#titleCreate').val();
    const membersLimit = $('#playerLimitCreate').val();
    const description = $('#descriptionCreate').val();
    const lat = $('#latCreate').val();
    const long = $('#longCreate').val();

    const newPost = {
        sport: sport,
        title: title,
        membersLimit: membersLimit,
        description: description,
        location: {
            lat: lat,
            long: long 
        }
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localtoken}`
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err));
}

function viewPosts() {
    const url = 'http://localhost:8080/api/teams/';

    return fetch(url)
    .then(res => res.json())
    .then(response => {
        console.log('find triggered');
        console.log(response);
        populatePosts(response);
    })
    .catch(err => console.log(err));
}

function viewProfile() {
    const base = 'http://localhost:8080/api/teams/';
    const localtoken = localStorage.getItem('localtoken');
    const currentUserId = localStorage.getItem('currentUser');
    const url = base + currentUserId;
    console.log(url);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localtoken}`
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('find triggered');
        console.log(response);
        populateProfile(response);
    })
    .catch(err => console.log(err));
}










//==============================================================//
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
    // $(window).on('load', (event) => {
        console.log('level 1 trigger');
        if (localStorage.getItem('localtoken')) {
            console.log('triggered');
            $('#post-nav').addClass('unhidden');
            $('#pre-nav').addClass('hidden');
        }

    // })

}

function logout() {
    $('#logoutBtn').on('click', (event) => {
        console.log('logged out');
        localStorage.removeItem('localtoken');
        localStorage.removeItem('currentUser');
        location.reload();
        // $('#post-nav').toggleClass('hidden');
        // $('#pre-nav').toggleClass('hidden');
    })
}
// =========================================================//

//==================== SCROLL CONTROLS =====================

function registerArrow() {
    $(".fas").on("click", () => {
        $("html").animate({
            scrollTop: 2000
        }, 500)
    });
    $(window).on('scroll', () => {
        $('.fas').addClass('hidden');
    });
}

// =========================================================//

//==================== POPULATE FIND VIEW =====================

function populateProfile(arr) {
    let items = ``;

    for (let i = 0; i < arr.length; i++) {
        const { title, sport, members, membersLimit, description, _id } = arr[i];
        const { lat, long } = arr[i].location;

        items = items.concat(`
            <div id="${_id}" class="post-item">
                <div class="post-item-list">
                    <ul>
                        <li><h4>${title}<h4></li>
                        <li>${sport}</li>
                        <li>${membersLimit}</li>
                        <li>${members}</li>
                        <li><p>${description}</p></li>
                        <li>${lat},${long}</li>
                    </ul>
                </div>
            </div>
        `);
    }
    $('#ownPosts').append(items);
}

function populatePosts(arr) {
    let items = ``;

    for (let i = 0; i < arr.length; i++) {
        const { title, sport, members, membersLimit, description, _id } = arr[i];
        const { lat, long } = arr[i].location;

        items = items.concat(`
            <div id="${_id}" class="post-item">
                <div class="post-item-list">
                    <ul>
                        <li><h4>${title}<h4></li>
                        <li>${sport}</li>
                        <li>${membersLimit}</li>
                        <li>${members}</li>
                        <li><p>${description}</p></li>
                        <li>${lat},${long}</li>
                    </ul>
                </div>
            </div>
        `);
        console.log('before initMap', lat, long, _id);
    }
    $('#view-container').html(items);

}


// =========================================================//

//==================== UPDATE and DELTE =====================



// =========================================================//

function documentReady() {
//SIMULATE STATES
    pseudoState();
    logout();
    //SCROLL CONTROLS
    registerArrow();
//MODAL CONTROLS
    toggleOnSignUp();
    toggleOffSignUp();
    toggleOnLogin();
    toggleOffLogin();
//AUTH FORM LISTENERS
    submitSignUp();
    submitLogin();
//MAKE POST FOR CREATE A POST
    registerCreate();
    registerFind();
    registerProfile();
}

$(documentReady);
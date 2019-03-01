'use strict';

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
            console.log('find profile triggered');
            console.log(response);
            populateProfile(response);
        })
        .catch(err => console.log(err));
}

function populateProfile(arr) {
    let items = ``;

    for (let i = 0; i < arr.length; i++) {
        const { title, sport, members, membersLimit, description, _id, address, rules } = arr[i];
        const { creator, joiners } = arr[i].members;
        const { lat, long } = arr[i].location;

        items = items.concat(`
            <div id="${_id}" class="post-item">
                <div class="post-item-list">
                    <ul>
                        <li class="preTitle"><h3>${title}</h3></li>
                        <li class="preRules">Rules: ${rules}</li>
                        <li class="preMax">Looking for: ${membersLimit} players</li>
                        <li class="preDes">Description: <div>${description}</div></li>
                        <li class="preAdd">Location: <address>${address}</address></li>
                    </ul>
                </div>
            </div>
        `);
    }
    $('#ownPosts').html(items);
}
function modalizePostProfile(arr) {
    const { title, sport, members, membersLimit, description, _id, address, rules } = arr;
    let { creator, joiners } = arr.members;
    const { lat, long } = arr.location;
    console.log('creator is:', creator);
    creator = creator.username;
    console.log('creator.username is:', creator);

    $('#post-container').append(`
    <div id="signup-Modal" class="modal unhide">
            <div class="class modal-content">
                <a href="#" class="closeBtn"><span class="cSpan">&times</span></a>
                <div id="${_id}" class="modal-pop">
                <div>
                    <ul class="postUl">
                        <li><h3>${title}</h3></li>
                        <li>Host: ${creator}</li>
                        <li>Rules: ${rules}</li>
                        <li>Looking for: ${membersLimit} players</li>
                        <li>Current players: ${creator} ${joiners}</li>
                        <li>Description: <p>${description}</p></li>
                        <li>Location: <address>${address}</address></li>
                        <div id='map' class="map-style"></div>
                        <li><button class="update">Update</button></li>
                        <li><button class="delete">Delete</button></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    `)
    var location = { lat: lat, lng: long };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15,
            center: location,
            streetViewControl: false,
            mapTypeControl: false
        });
    var marker = new google.maps.Marker({ position: location, map: map });
    $('.modal-content').niceScroll({
        cursorcolor: "#ffa500",
        cursoropacitymin: 0.8,
        background: "#bbb",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30
    });
}

function documentReady() {
    viewProfile();
}

$(documentReady);
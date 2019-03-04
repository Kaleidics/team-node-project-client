'use strict';

function registerCreate() {
    $('.createTeamForm').on('submit', (event) => {
        event.preventDefault();
        console.log('attempted the post request');
        if (localStorage.getItem('localtoken') === null) {
            alert('Login to make a post!');
            return;
        }
        else {
            console.log('logged in, attempting to post server');
            createTeam();
        }
    });
}

function createTeam() {
    const url = 'http://localhost:8080/api/teams/';

    const localtoken = localStorage.getItem('localtoken');
    const title = $('#titleCreate').val();
    const membersLimit = $('#playerLimitCreate').val();
    const description = $('#descriptionCreate').val();
    const rules = $('#rulesCreate').val();
    const address = $('#search-input').val();
    console.log('attempted new post', address);


    const googleQuery = address.replace(/\s/g, '+');
    console.log(googleQuery);
    const geocodeBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const geoKey = '&key=AIzaSyCVE0EVrFMwT7F0tBXuStCz7mpfmrO_Hd4';
    const geocodeUrl = geocodeBase + googleQuery + geoKey;

    fetch(geocodeUrl)
        .then(res => res.json())
        .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            const newPost = {
                sport: sport,
                rules: rules,
                title: title,
                membersLimit: membersLimit,
                description: description,
                address: address,
                location: {
                    lat: lat,
                    long: lng
                }
            }
            return newPost;
        })
        .then(response => {
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify(response),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localtoken}`
                }
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    $('.createLegend').html('Success. See your post in Find Game');
                    $('.clear').val('');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7009, lng: -73.9880 },
        zoom: 11
    });
    var input = document.getElementById('search-input');
    

    var autocomplete = new google.maps.places.Autocomplete(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(16);

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}


function documentReady() {
    // mapsSearch();
    registerCreate();
    initMap();
}

$(documentReady);
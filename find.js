'use strict';

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


function documentReady() {
    viewPosts();
}

$(documentReady);
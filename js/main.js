var me = "test";
(function () {

    document.getElementById('login-button').addEventListener('click', function () {

        var client_id = '721b580742bb441b9af117b1ad7b72d7'; // Your client id
        var redirect_uri = 'https://www.google.com'; // Your redirect uri

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        window.location = url;

    }, false);
})();

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

$(document).ready(function () {
    getUserStuff();
});

function getUserStuff(delay) {
    var spotifyApi = new SpotifyWebApi();
    var accessToken = "BQA89HXNuJI0QxND22vCR6wbwalAgTiFSEdoWK1nKVcUFSVN-aa6WLvWr_LpB4VLujh7zNyF6EiLeVZLaxYyIQr5pqLOOICdaBX95iJ_ht7AMgk6OvvGjkAUbunnyKk6eKCAQ40vh7OIOUWWK3XjmDXA2RxL6ItfRiK0xg"
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists()
        .then(function (data) {

            parsePlaylists(spotifyApi, data);
        }, function (err) {
            console.error(err);
        });
}

function parsePlaylists(spotifyApi, data) {
    var playlist_ids = [];
    data.items.forEach(function (entry) {
        playlist_ids.push(entry.id);
    });
    
    getTracks(spotifyApi, playlist_ids, 1000);
}

function getTracks(spotifyApi, playlist_ids, delay) {
    spotifyApi.getMe().then(function (data) {
        me = data.id; //vincentwsong
        console.log(me);
    });
    setTimeout(function () {
    }, 2000);
    var track_ids = [];

    for (var i = 0; i < playlist_ids.length; i++) {

        spotifyApi.getPlaylistTracks(me, playlist_ids[i]).then(function (tracks) {

            for (var j = 0; j < tracks.items.length; j++) {

                //FIXME: 
                // console.log(tracks.items[j].track);

                // Doesn't work for some reason
                track_ids.push({
                    id: tracks.items[j].track.uri
                });
            }

        });
    }

    setTimeout(function () {
        if (track_ids.length == 0)
            getTracks(spotifyApi, playlist_ids, delay + 1000);
        else
            console.log(track_ids);
    }, delay);



    var date = $(".datepicker").val();

    console.log(date);


}
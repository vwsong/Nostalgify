var me = "test";
var accessKey = "NA";
$(document).ready(function () {
    $(".parent").hide().fadeIn(500);
    $("#fadeTwo").hide().fadeIn(1500);
    if (window.location.hash) {
        accessKey = window.location.hash.substr(1).split("&")[0].split("=")[1];
        console.log("itworks");
        $('.pickDateDiv').css("visibility", "visible");
    }

    getUserStuff();
});
(function () {

    document.getElementById('login-button').addEventListener('click', function () {

        var client_id = '9d8a65e5d4e847478736a41953d7ac1d'; // Your client id
        var redirect_uri = 'https://vwsong.github.io/Nostalgify/'; // Your redirect uri
        var scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += (scopes ? '&scope=' + encodeURIComponent(scopes) : '');
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        window.location = url;

    }, false);
})();

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

function getUserStuff(delay) {
    accessKey = window.location.hash.substr(1).split("&")[0].split("=")[1];
    var spotifyApi = new SpotifyWebApi();
    var accessToken = accessKey;
    console.log(accessToken);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists({limit:100, offset: 0})
        .then(function (data) {
            parsePlaylists(spotifyApi, data);
        }, function (err) {
            console.error(err);
        });
}

function parsePlaylists(spotifyApi, data) {
    var playlist_ids = [];
    data.items.forEach(function (entry) {
        playlist_ids.push(entry);
    });
    
    getTracks(spotifyApi, playlist_ids, 6000);

}

function getTracks(spotifyApi, playlist_ids, delay) {
    console.log(playlist_ids);
    spotifyApi.getMe().then(function (data) {
        me = data.id; //vincentwsong
        console.log(me);
    });

    if (me == "test")
        return;

    var input_date = new Date($(".datepicker").val());
    var track_ids = [];

    for (var i = 0; i < playlist_ids.length; i++) {
        console.log(playlist_ids[i].name);
        spotifyApi.getPlaylistTracks(me, playlist_ids[i].id).then(function (tracks) {
            
            for (var j = 0; j < tracks.items.length; j++) {
                var track_date = new Date(tracks.items[j].added_at.split("T")[0]);
                if(track_ids.length < 100){
                }
                if (Math.abs(input_date - track_date) < 604800000) {
                    console.log(input_date - track_date);
                    track_ids.push(tracks.items[j].track.uri); 
                }
            }
        });
    }
    
    setTimeout(function () {
        if (track_ids.length == 0) {
            getTracks(spotifyApi, playlist_ids, delay + 1000);
            return;
        } else
            console.log(track_ids);

        createPlaylist(spotifyApi, track_ids);

    }, delay);
}

function createPlaylist(spotifyApi, track_ids) {
    var playlist_id;

    spotifyApi.createPlaylist(me, {
            name: "A"
        })
        .then(function (data) {
            console.log("data", data);
            playlist_id = data.id;
        });

    setTimeout(function () {
        spotifyApi.addTracksToPlaylist(me, playlist_id, track_ids, {});
        console.log("completed");
    }, 3000);
}
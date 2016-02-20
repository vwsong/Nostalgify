var me = "test";
(function () {

    document.getElementById('login-button').addEventListener('click', function () {

        var client_id = '721b580742bb441b9af117b1ad7b72d7'; // Your client id
        var redirect_uri = 'https://www.google.com'; // Your redirect uri
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

$(document).ready(function () {
    getUserStuff();
});

function getUserStuff(delay) {
    var spotifyApi = new SpotifyWebApi();
    var accessToken = "BQDbnjQXvEo9et2_92WdUKptlCeL94MZoGZkMKKUrToWQpFPFk61qKOcLXhFCSdPeezAAhOBagHT-_mZSgnDY1tRaR9kMJTDlFR_CzHQBEkHytZIsPkxPBL8-smqetSI-4dJpWrzV7Y8gBhqm9Sq2M0gPj14j0HJIAC2Oy97haDgc-mnCbjmhM73d34wN4irm77x2UBrCV_mpHZ-Vlwk1PlQZ3ccUzErssMaR0YVPy7EjZmOoRwJS3lIkg";
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

    if (me == "test")
    	return;

    var input_date = new Date($(".datepicker").val());
    var track_ids = [];

    for (var i = 0; i < playlist_ids.length; i++) {

        spotifyApi.getPlaylistTracks(me, playlist_ids[i]).then(function (tracks) {

            for (var j = 0; j < tracks.items.length; j++) 
            {
            	 var track_date = new Date(tracks.items[j].added_at.split("T")[0]);

                if (Math.abs(input_date - track_date) < 604800000)
                {
	                track_ids.push( tracks.items[j].track.uri );
	            }
            }
        });
    }

    setTimeout(function () {
        if (track_ids.length == 0)
        {
            getTracks(spotifyApi, playlist_ids, delay + 1000);
            return;
        }
        else
            console.log(track_ids);

        createPlaylist(spotifyApi, track_ids);

    }, delay);
}

function createPlaylist(spotifyApi, track_ids)
{
	console.log(track_ids);
	var playlist_id;

    spotifyApi.createPlaylist(me, {name: "A"})
    .then(function(data) {
    	console.log("data", data);
    	playlist_id = data.id;
    });

    setTimeout(function() {
    	spotifyApi.addTracksToPlaylist(me, playlist_id, track_ids, {});
    	console.log("completed");
    }, 1000);
}
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

//BQDBlgb2DBBHZk91CGe3bmODWdzVyI2ABOBjcLmK1JAkTI1mzdgIAxiOJWq8sChpGeWje66jyafU3QaPfuMcAD_jr8J2IhSAC1ojF3MdMj16Fp_ERQnXoaVxZfeNwGExoP-zhavv44o45XkWGA
$(document).ready(function () {
    getUserStuff();
});

function getUserStuff() {
    var spotifyApi = new SpotifyWebApi();
    var accessToken = "BQBeKT9aDsJW3_ydtqXXDqL2Zor6NRW6ODOW3v-QxMnJLi6gyEts_V2CVsNGYIUTSOy0cHNTq7ndEhJKG-azJ08stG_lVuSYHkq4dRXd_2f0xjVgTY1z5RZdjsdW-iuv6of3H3WNIXHjtQ"
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists("allenplay", {
            limit: 30,
            offset: 0
        })
        .then(function (data) {
            parsePlaylists(spotifyApi, data);
        }, function (err) {
            console.error(err);
        });
}

function parsePlaylists(spotifyApi, data)
{
	var playlist_ids = [];

	data.items.forEach(function(entry) {
		playlist_ids.push(entry.id);
	});

	getTracks(spotifyApi, playlist_ids, 1000);
}

function getTracks(spotifyApi, playlist_ids, delay)
{
	var track_ids = [];

	for (var i = 0; i < playlist_ids.length; i++)
	{

		spotifyApi.getPlaylistTracks("allenplay", playlist_ids[i]).then(function (tracks) {

			for (var j = 0; j < tracks.items.length; j++)
			{

				//FIXME: 
				// console.log(tracks.items[j].track);

				// Doesn't work for some reason
				track_ids.push({id: tracks.items[j].track.uri});
			}

		});
	}

	setTimeout(function() 
		{ 
			if (track_ids.length == 0)
				getTracks(spotifyApi, playlist_ids, delay + 1000);
			else
				console.log(track_ids); 
		}, delay);

	

	var date = $(".datepicker").val();

	console.log(date);

	
}

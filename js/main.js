(function () {

    document.getElementById('login-button').addEventListener('click', function () {

        var client_id = '9d8a65e5d4e847478736a41953d7ac1d'; // Your client id
        var redirect_uri = 'https://www.google.com'; // Your redirect uri

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        window.location = url;

    }, false);
})();

//BQDBlgb2DBBHZk91CGe3bmODWdzVyI2ABOBjcLmK1JAkTI1mzdgIAxiOJWq8sChpGeWje66jyafU3QaPfuMcAD_jr8J2IhSAC1ojF3MdMj16Fp_ERQnXoaVxZfeNwGExoP-zhavv44o45XkWGA
function getUserStuff() {
    var spotifyApi = new SpotifyWebApi();
    var accessToken = "BQDBlgb2DBBHZk91CGe3bmODWdzVyI2ABOBjcLmK1JAkTI1mzdgIAxiOJWq8sChpGeWje66jyafU3QaPfuMcAD_jr8J2IhSAC1ojF3MdMj16Fp_ERQnXoaVxZfeNwGExoP-zhavv44o45XkWGA" 
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists()
        .then(function (data) {
            console.log('User playlists', data);
        }, function (err) {
            console.error(err);
        });
}
(function() {

          document.getElementById('login-button').addEventListener('click', function() {

            var client_id = '9d8a65e5d4e847478736a41953d7ac1d'; // Your client id
            var redirect_uri = 'https://www.google.com'; // Your redirect uri

            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            window.location = url;
            
          }, false);
        }
      )();
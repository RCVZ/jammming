const clientId = '7234ae8b9cac4739b9af4f2806d43c7c';
let userAccesToken;

const Spotify = {
  getAccesToken() {
    if(typeof userAccesToken !== 'undefined') {
      return userAccesToken;
    }

    const accessTokenPara = window.location.href.match(/access_token=([^&]*)/);
    const expiresInPara = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenPara && expiresInPara) {
      userAccesToken = accessTokenPara[1];
      const expiresIn = Number(expiresInPara[1]);
      window.setTimeout(() => userAccesToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccesToken;
    } else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/&scope=playlist-modify-public%20playlist-modify-private&response_type=token`;
      window.location = authorizeUrl;
    }
  },

  async search(searchTerm){
    const access = Spotify.getAccesToken();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.artists[0].name,
          songname: track.name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    }
    catch(error) {
      console.log(error);
    }
  },

  async sendPlayList(playListName, playListUris) {
    const access = Spotify.getAccesToken();
    const authorization = {Authorization: `Bearer ${access}`};

    let userId = '';

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: authorization
      });

      if(response.ok) {
        const jsonResponse = await response.json();
        userId = jsonResponse.id;

        try {
          const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: authorization,
            method: 'POST',
            body: JSON.stringify({name: playListName})
          });

          if(response.ok) {
            const jsonResponse = await response.json();
            const playListId = jsonResponse.id;

            try {
              const response = await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, {
                headers: authorization,
                method: 'POST',
                body: JSON.stringify({uris:playListUris})
              });
              if(response.ok){
                return
              }

            } catch(error) {
              console.log(error);
            }
          }
        }
        catch(error) {
          console.log(error);
        }
      }
    }
    catch(error) {
      console.log(error);
    }
  }
};


export default Spotify;

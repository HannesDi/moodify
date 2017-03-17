// app code goes here
// matrix.init()....
//
// have fun
// var Spotify = require('spotify-web-api-js');
// var spotifyApi = new Spotify();
// token = spotifyApi.getAccessToken();
// spotifyApi.setAccessToken(token);

var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'

});


var demographicsPromise = matrix.service('demographics').start();

demographicsPromise.then(function(demographicsData) {
  var emotion = demographicsData.demographics.emotion;
  console.log(emotion);

  var emotions = {"HAPPY": "yellow", "SAD": "red", "CONFUSED": "blue", "ANGRY": "green", "CALM": "white", "SURPRISED": "purple", "DISGUST": "brown"};
  matrix.led(emotions[emotion]).render();
});

var totalink=0;
spotifyApi.searchPlaylists("happy", {
  country: 'BR',
  limit: 10
}, function (err, data) {

  if(err) return console.log(err);

  var playlists = data.body.playlists.items;
  var playlist_index = Math.floor((Math.random() * 10));
  var j=playlists[playlist_index].uri;
  var res=j;
  for (i=0;i<j.length;i++){
      res = res.replace(":", "/");
  }
  var link =  res.slice(7,res.length);
  totalink= "https://play.spotify.com" + link;

});

matrix.send({playlist: totalink});

var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.post('/submit', function (req, res, next) {
  

  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: { term: req.body.song, locale: 'en-US', offset: '0', limit: '5' },
    headers: {
      'X-RapidAPI-Key': '580d3795aemshf513a11640c96d6p1182cdjsnbfb65a32b4a2',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };


  axios.request(options).then(function (response) {
    var song_uri = response.data.tracks.hits[0].track.hub.actions[1].uri;
    var image = response.data.tracks.hits[0].track.share.image;
    var avatar = response.data.tracks.hits[0].track.share.avatar;
    var songname = response.data.tracks.hits[0].track.title
    var artist = response.data.tracks.hits[0].track.subtitle
    // endpoint for the pic of singer
    res.render("songs_list", {a:song_uri, b: image, c: avatar, d: songname, e: artist})
  })
 
  
})

module.exports = router;

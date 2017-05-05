var express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())

var file_textdata = require('./favs.json');

app.get('/', function (req, res) 
{
// __dirname: directory name of current module 
	res.sendFile( __dirname+ "/" + "index.html" ); 
})
app.get('/alltweets', function(req, res) {
    var result = [];
    for (var index in file_textdata) {
        var tweet = file_textdata[index];
        result.push({
            created_at: tweet.created_at,
            id: file_textdata[index].id,
            tweeted_text: file_textdata[index].text
        });
    }
    res.send(result);
});
app.get('/allusers', function (req, res) 
{
	var result = [];
    for (var index in file_textdata) {
        var tweet = file_textdata[index];
        result.push({
            user_id: tweet.user.id,
            user_name: tweet.user.name,
        });
    }
    res.send(result);
})
app.get('/links', function (req, res) 
{
	
	var result = [];
    for (var index in file_textdata) {
        var tweet = file_textdata[index];

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

        result.push({
			tweet_id:tweet.id,
            url: tweet.text.match(regex),
            
        });
    }
    res.send(result);

})
app.get('/details', function (req, res) 
{
	
	var tweetid = req.param('tweet_id');
	
	var result = [];
    for (var index in file_textdata) {
        var tweet = file_textdata[index];

		if(tweet.id==tweetid)
		{
        result.push({
            created_at: tweet.created_at,
            id: tweetid,
			text:tweet.text,
        });
		}
    }
    res.send(result);
})
app.get('/process_get_details_about_twitter_user', function (req, res) 
{
	var username = req.param('user_name');
	console.log(username);
	var result = [];
    for (var index in file_textdata) {
        var tweet = file_textdata[index];

		if(tweet.user.screen_name==username)
		{
        result.push({
            user_id: tweet.user.id,
            name:tweet.user.screen_name,
			location:tweet.user.location,
			description:tweet.user.description,
        });
		}
    }
    res.send(result);
})
var server = app.listen(8081, function () 
{ 
	var host = server.address().address
	var port = server.address().port
	console.log("listening at http://localhost:"+server.address().port) 
})
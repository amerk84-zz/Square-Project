//must add for jquery commands to work
$ = require('jquery');

var n = 0;
var tweets;
var idNum = "0";
var lastCall = "no";
var username = "justinbieber";
var _url = 'https://api.twitter.com/1/statuses/user_timeline/'+username+'.json?callback=?&count=200';
var allData=[]; //find out what variable type this should be

//make initial tweet request
$.ajax({
    async:false,
    url: _url,
    dataType: 'json',
    success: cb
});

function cb(data){
	//console.log("checkpoint - 1");
	//we know we are at a user's last tweet when the returned data array's length is one
	if(data.length == 1) {
		//console.log("checkpoint - 1.5");
		pullTweets();
		return;
	}
	//console.log("checkpoint - 2");
	
	//pull out tweet ID from the last tweet returned in the call
    idNum = data[data.length-1].id.toString();

	//remove first tweet, which is a duplicate of the last tweet from the previous request, only after first request
	if(_url.indexOf("max_id") != -1) data.shift();
	
	//add contents of data to the allData array
	allData = allData.concat(data);
	if(allData.length < 1000){
		_url = 'https://api.twitter.com/1/statuses/user_timeline/'+username+'.json?callback=?&count=200&max_id='+idNum;
		$.ajax({
	        async:false,
	        url: _url,
	        dataType: 'json',
	        success: cb
	    });
		//console.log("checkpoint - 3");
	}
	else{
		//console.log("checkpoint - 4");
		pullTweets();
	}
}

function pullTweets(){
	//console.log("checkpoint - 5");
	var len = (allData.length > 1000) ? 1000 : allData.length;
    for(var i=0;i<len;i++){
        tweets += " "+ allData[i].text;
	}
    var words = parseTweets();
    //print final word count to the console
    console.log("\nThe words that "+username+" has tweeted the most are:\n");
    var iWordsCount = words.length;
    for (var i=0; i<iWordsCount; i++) {
        var word = words[i];
        if(word.freq > 0) console.log(word.freq, word.text);
    }
    //console.log('\n' + username+" has tweeted " +len+ " times");
}

function parseTweets(){
	//console.log("checkpoint - 6");
    //put words into an array, removing links, hashtags, and mentions as well as any random characters
    var sWords = tweets.toLowerCase().trim().replace(/[#]+[A-Za-z0-9-_]+/g,'').replace(/[@]+[A-Za-z0-9-_]+/g,'').replace(/[+$~\`%-_,;:|."?!*{}”“]/g,'').split(/[\s\/]+/g).sort();
	//remove words that contain "http"
	for (var i=sWords.length-1; i>=0; i--) {
	    if (sWords[i].indexOf("http") != -1) {
	        sWords.splice(i, 1);
	    }
	}
    //save the word count before removing duplicates
    var iWordsCount = sWords.length;
    // array of words to ignore
    var ignores = ["gt","lt","amp","sp"];
    ignores = (function(){
        var o = {};
        var iCount = ignores.length;
        for (var i=0;i<iCount;i++){
            o[ignores[i]] = true;
        }
        return o;
    }());
	//object to store the words in
    var counts = {};
    for (var i=0; i<iWordsCount; i++) {
        var sWord = sWords[i];
        if (!ignores[sWord]) {
            counts[sWord] = counts[sWord] || 0;
            counts[sWord]++;
        }
    }
    //create an array that will contain the objects with words and their frequency
	//and the populate that array with each word and its corresponding frequency
    var wordArray = [];
    for (sWord in counts) {
        wordArray.push({
            text: sWord,
            freq: counts[sWord]
        });
    }
    //sort array by descending frequency
    return wordArray.sort(function(a,b){
        return (a.freq > b.freq) ? -1 : ((a.freq < b.freq) ? 1 : 0);
    });
}
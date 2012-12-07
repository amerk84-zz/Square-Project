//must add for jquery commands to work
$ = require('jquery');

var n = 0;
var i = 0;
var idNum = "0";
var twit;
var _url = 'https://api.twitter.com/1/statuses/user_timeline/willyferrell.json?callback=?&count=200';
var allData=[]; //find out what variable type this should be

while(n < 1000){
    if(n>0) _url = 'https://api.twitter.com/1/statuses/user_timeline/willyferrell.json?callback=?&count=200&max_id='+idNum;
    console.log(_url);
    
    $.ajax({
        async:false,
        url: _url,
        dataType: 'json',
        success: function(data){
            twit = data;
            console.log(_url);
        }
    });
    
    n += twit.length;
    console.log(n);
    var j = twit.length;
    idNum = twit[j-1].id.toString();
    console.log(idNum);
    i++;
}


/*
var words = (function(){
    //put words into an array, removing links, hashtags, and mentions as well as any random characters
    var sWords = tweets.toLowerCase().trim().replace(/[#]+[A-Za-z0-9-_]+/g,'').replace(/[@]+[A-Za-z0-9-_]+/g,'').replace(/[+$~\`%-_,;:|."?!*{}”“]/g,'').split(/[\s\/]+/g).sort();
    //save the word count before removing duplicates
    var iWordsCount = sWords.length;
        
    // array of words to ignore
    var ignores = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if',"rt","gt","lt","amp","sp"];
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
}());
    
//print final word count to the console
console.log("The words that "+username+" has tweeted the most are:");
var iWordsCount = words.length;
for (var i=0; i<iWordsCount; i++) {
    var word = words[i];
    if(word.freq > 1) console.log(word.freq, word.text);
}
console.log(username+" has tweeted " +data.length+ " times");
*/
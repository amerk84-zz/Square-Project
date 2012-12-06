var username = prompt("What is the username");

var _url = 'https://api.twitter.com/1/statuses/user_timeline/'+username+'.json?callback=?&count=1000';
$.getJSON(_url,function(data){
    var tweets = "";
    for(var i=0,len=data.length;i<len;i++){
        tweets = tweets +" "+ data[i].text;
    }
    
    var words = (function(){
        //put words into an array, removing links, hashtags, and mentions as well as any random characters
        var sWords = tweets.toLowerCase().trim().replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,'').replace(/[#]+[A-Za-z0-9-_]+/g,'').replace(/[@]+[A-Za-z0-9-_]+/g,'').replace(/[,;:.?!*]/g,'').split(/[\s\/]+/g).sort();
        //save the word count before removing duplicates
        var iWordsCount = sWords.length;
        
        // array of words to ignore
        var ignore = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if',"rt"];
        ignore = (function(){
            var o = {}; // object prop checking > in array checking
            var iCount = ignore.length;
            for (var i=0;i<iCount;i++){
                o[ignore[i]] = true;
            }
            return o;
        }());
        
        var counts = {};
        for (var i=0; i<iWordsCount; i++) {
            var sWord = sWords[i];
            if (!ignore[sWord]) {
                counts[sWord] = counts[sWord] || 0;
                counts[sWord]++;
            }
        }
        
        //create an array that will contain the objects with words and their frequency
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
    var iWordsCount = words.length;
    for (var i=0; i<iWordsCount; i++) {
        var word = words[i];
        if(word.freq > 2) console.log(word.freq, word.text);
    }
    console.log(username+" has tweeted " +data.length+ " times");
});
let wordClock;
$(document).ready(function(){
    
    // Make text in wordclock unselectable
    const letters = $(".letter");
    let letter;
    for(letter of letters) {
        Utility.disableSelection(letter);
    }

    WordClock.start();
    //WordClock.debugMode = true;
});
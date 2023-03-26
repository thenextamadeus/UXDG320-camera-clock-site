class WordClock {
    static interval;
    static #debug = false;

    static set debugMode(enabled) {
        console.log("debugMode(" + enabled + ")");
        this.#debug = enabled;

        if(enabled) {
            this.stop();
            window.addEventListener('mousemove', this.debug_handleMouseMove);
        } else {
            window.removeEventListener('mousemove', this.debug_handleMouseMove);
            this.start();
        }
    }

    static get debugMode() {
        return this.#debug;
    }

    static debug_handleMouseMove(event) {
        let dateObject = new Date();

        // Set hours and minutes 
        const xRatio = event.offsetX / window.innerWidth;
        const yRatio = event.offsetY / window.innerHeight;

        dateObject.setHours(Math.floor(24 * xRatio));
        dateObject.setMinutes(Math.floor(60 * yRatio));

        WordClock.updateWords(dateObject);
    }

    static updateWords(dateObject = null) {
        WordClock.clearWords();

        if(dateObject === null) {
            dateObject = new Date();
        }
        
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();
        
        if(seconds == 0) {
            setup(); // This is the setup function in sketch.js
        }
        
        $(".minutes").addClass("letter_on");
        // Count minutes past or to hour (change at half hour)
        if(minutes == 0) {
            if(!(hours == 0 || hours == 12 || hours == 24))
            {
                $(".minutes").removeClass("letter_on");
                $(".minute").removeClass("letter_on");
                $(".oclock").addClass("letter_on");
            }
        } else if(minutes > 30) {
            minutes = 60 - minutes;
            hours += 1;
            $(".to").addClass("letter_on");
        } else {
            $(".past").addClass("letter_on");
        }
        if(minutes == 1) {
            $(".minutes").removeClass("letter_on");
            $(".minute").addClass("letter_on");
        }

        
        switch(hours)
        {
            case 0:
            case 24:
                // MINUTES (PAST | TO) MIDNIGHT
                $(".midnight").addClass("letter_on");
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 23:
            case 24: // Just in case
                // MINUTES (PAST | TO) XXX IN THE NIGHT
                $(".in_the").addClass("letter_on");
                $(".night").addClass("letter_on");
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                // MINUTES (PAST | TO) XXX IN THE MORNIGN
                $(".in_the").addClass("letter_on");
                $(".morning").addClass("letter_on");
                break;
            case 12:
                // MINUTES (PAST | TO) NOON
                $(".noon").addClass("letter_on");
                break;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                // MINUTES (PAST | TO) XXX IN THE AFTERNOON
                $(".in_the").addClass("letter_on");
                $(".afternoon").addClass("letter_on");
                break;
            case 19:
            case 20:
            case 21:
            case 22:
                // MINUTES (PAST | TO) XXX IN THE EVENING
                $(".in_the").addClass("letter_on");
                $(".evening").addClass("letter_on");
                break;
        }

        
        switch(minutes) {
            case 0:
                $(".minutes").removeClass("letter_on");
                break;
            case 1:
                $(".mOne").addClass("letter_on");
                break;
            case 2:
                $(".mTwo").addClass("letter_on");
                break;
            case 3:
                $(".mThree").addClass("letter_on");
                break;
            case 4:
                $(".mFour").addClass("letter_on");
                break;
            case 5:
                $(".mFive").addClass("letter_on");
                break;
            case 6:
                $(".mSix").addClass("letter_on");
                break;
            case 7:
                $(".mSeven").addClass("letter_on");
                break;
            case 8:
                $(".mEight").addClass("letter_on");
                break;
            case 9:
                $(".mNine").addClass("letter_on");
                break;
            case 10:
                $(".mTen").addClass("letter_on");
                break;
            case 11:
                $(".mEleven").addClass("letter_on");
                break;
            case 12:
                $(".twelve").addClass("letter_on");
                break;
            case 13:
                $(".thirteen").addClass("letter_on");
                break;
            case 14:
                $(".fourteen").addClass("letter_on");
                break;
            case 15:
                $(".fifteen").addClass("letter_on");
                break;
            case 16:
                $(".sixteen").addClass("letter_on");
                break;
            case 17:
                $(".seventeen").addClass("letter_on");
                break;
            case 18:
                $(".eighteen").addClass("letter_on");
                break;
            case 19:
                $(".nineteen").addClass("letter_on");
                break;
            case 20:
                $(".twenty").addClass("letter_on");
                break;
            case 21:
                $(".twenty").addClass("letter_on");
                $(".mOne").addClass("letter_on");
                break;
            case 22:
                $(".twenty").addClass("letter_on");
                $(".mTwo").addClass("letter_on");
                break;
            case 23:
                $(".twenty").addClass("letter_on");
                $(".mThree").addClass("letter_on");
                break;
            case 24:
                $(".twenty").addClass("letter_on");
                $(".mFour").addClass("letter_on");
                break;
            case 25:
                $(".twenty").addClass("letter_on");
                $(".mFive").addClass("letter_on");
                break;
            case 26:
                $(".twenty").addClass("letter_on");
                $(".mSix").addClass("letter_on");
                break;
            case 27:
                $(".twenty").addClass("letter_on");
                $(".mSeven").addClass("letter_on");
                break;
            case 28:
                $(".twenty").addClass("letter_on");
                $(".mEight").addClass("letter_on");
                break;
            case 29:
                $(".twenty").addClass("letter_on");
                $(".mNine").addClass("letter_on");
                break;
            case 30:
                $(".thirty").addClass("letter_on");
                break;
        }

        switch(hours%12) {
            case 0:
            case 12:
                // Either noon or midnight, using specific words for them
                break;
            case 1:
                $(".one").addClass("letter_on");
                break;
            case 2:
                $(".two").addClass("letter_on");
                break;
            case 3:
                $(".three").addClass("letter_on");
                break;
            case 4:
                $(".four").addClass("letter_on");
                break;
            case 5:
                $(".five").addClass("letter_on");
                break;
            case 6:
                $(".six").addClass("letter_on");
                break;
            case 7:
                $(".seven").addClass("letter_on");
                break;
            case 8:
                $(".eight").addClass("letter_on");
                break;
            case 9:
                $(".nine").addClass("letter_on");
                break;
            case 10:
                $(".ten").addClass("letter_on");
                break;
            case 11:
                $(".eleven").addClass("letter_on");
                break;
        }
        $(".its").addClass("letter_on");
    }

    static clearWords() {
        $(".item").removeClass("letter_on");
    }

    static start() {
        WordClock.interval = setInterval(WordClock.updateWords, 1000);
    }

    static stop() {
        clearInterval(WordClock.interval);
    }
}
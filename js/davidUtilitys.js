/******************************************************************************
*                                                                             *
*                   Davids Useful Utilitys for Javascript                     *
*                                                                             *
******************************************************************************/


// Range of ints between min and max (includes min and max in output)
var RandomRange = function(min, max) {
    var min = min || 0;
    var max = max || 1;

    if(min >= max) {
        return false;
    }

    while(true) {
        var result = Math.floor(Math.random() * max) + 1;
        if(result >= min) {
            return result;
        }
    }

};

// Random int from 1 to max
var RandomInt = function(max) {
    var max = max || 2;
    return Math.floor(Math.random() * max) + 1;
};

// Random value from an array
var RandomChoice = function(array) {
    return array[RandomInt(array.length) - 1];
}

// Sequence of numbers appearing from start to stop. Includes start and stop in sequence
var genSeq = function(start, stop, step=1) {
    var seq = []
    for(i = start; i <= stop; i += step) {
        seq.push(i);
    }
    return seq;
}

// functions to get the co-ords for parts of the canvas

// top left with percent MARGIN
var coOrds = function() {
    var topLeftX = WIDTH * MARGIN;
    var topLeftY = HEIGHT * MARGIN;

    return {topLeftX: topLeftX, topLeftY: topLeftY};
}

// used to calculate the number of pixels dependant on line number
var line = function(lineNumber, fontSize) {
    return (lineNumber * fontSize) + (NEWLINESPACE * (lineNumber - 1));
}

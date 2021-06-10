"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Chamber = void 0;
var Chamber = /** @class */ (function () {
    function Chamber(initialPosition) {
        this.init = initialPosition;
        Chamber.validCharacters = ["L", "R", "."];
        Chamber.initalArray = initialPosition.split("");
        for (var i = 0; i < Chamber.initalArray.length; i++) {
            if (!Chamber.validCharacters.some(function (a) { return a === Chamber.initalArray[i]; })) {
                throw new Error("Invalid character detected");
            }
        }
        if (this.init.length < 1 || this.init.length > 50) {
            throw new Error("Invalid string length");
        }
    }
    Chamber.prototype.animate = function (speed) {
        if (speed < 1 || speed > 10 || !speed) {
            throw new Error("Invalid speed value");
        }
        //Function assumes maximum iterations - intended
        function determineTime(array) {
            for (var i = 0; i < array.length; i++) {
                if (array.some(function (a) { return a === "L"; }) || array.some(function (a) { return a === "R"; })) {
                    return Math.floor(Chamber.initalArray.length / speed + 1);
                }
                else
                    return 1;
            }
        }
        var positionOutput = [];
        var leftPositionalArray = [];
        var rightPositionalArray = [];
        var currentArray = Chamber.initalArray;
        //Regex that converts string to "X","." output
        function outputArray(array) {
            var convertToString = array.map(function (a) { return a.replace(/[LR]/g, "X"); }).join("");
            positionOutput.push(convertToString);
        }
        //Sets initial array positions
        function setPositionalArray(input) {
            for (var i = 0; i < input.length; i++) {
                if (input[i] === "L") {
                    leftPositionalArray.push(i);
                }
                if (input[i] === "R") {
                    rightPositionalArray.push(i);
                }
            }
        }
        //Changes positions according to the speed,
        //filters out bad indicies
        function shiftArray(input, speed) {
            leftPositionalArray = leftPositionalArray
                .map(function (a) { return a - speed; })
                .filter(function (a) { return a >= 0; });
            rightPositionalArray = rightPositionalArray
                .map(function (a) { return a + speed; })
                .filter(function (a) { return a < input.length; });
        }
        //Changes the array to the L and R characters
        function updateArray(input) {
            for (var j = 0; j < leftPositionalArray.length; j++) {
                input.splice(leftPositionalArray[j], 1, "L");
            }
            for (var j = 0; j < rightPositionalArray.length; j++) {
                input.splice(rightPositionalArray[j], 1, "R");
            }
        }
        //Reinstates characters with dot that were evacuated
        function replaceArray(input) {
            var resetArray = __spreadArray([], new Array(currentArray.length)).map(function () { return "."; });
            currentArray = [];
            currentArray = resetArray;
        }
        //Main loop for each interval of time, applies all functions
        for (var i = 0; i < determineTime(Chamber.initalArray); i++) {
            if (i === 0) {
                setPositionalArray(currentArray);
            }
            updateArray(currentArray);
            outputArray(currentArray);
            shiftArray(currentArray, speed);
            if (currentArray.every(function (a) { return a === "."; })) {
                break;
            }
            replaceArray(currentArray);
        }
        console.log(positionOutput);
        return positionOutput;
    };
    return Chamber;
}());
exports.Chamber = Chamber;
new Chamber("L......").animate(2);

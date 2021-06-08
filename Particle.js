"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamber = void 0;
class Chamber {
    constructor(initialPosition) {
        this.init = initialPosition;
        Chamber.validCharacters = ["L", "R", "."];
        Chamber.initalArray = initialPosition.split("");
        for (var i = 0; i < Chamber.initalArray.length; i++) {
            if (!Chamber.validCharacters.some((a) => a === Chamber.initalArray[i])) {
                throw new Error("Invalid character detected");
            }
        }
        if (this.init.length < 1 || this.init.length > 50) {
            throw new Error("Invalid string length");
        }
    }
    animate(speed) {
        if (speed < 1 || speed > 10 || !speed) {
            throw new Error("Invalid speed value");
        }
        //Function assumes maximum iterations - intended
        function determineTime(array) {
            for (var i = 0; i < array.length; i++) {
                if (array.some((a) => a === "L") || array.some((a) => a === "R")) {
                    return Math.floor(Chamber.initalArray.length / speed + 1);
                }
                else
                    return 1;
            }
        }
        let positionOutput = [];
        let leftPositionalArray = [];
        let rightPositionalArray = [];
        let testArray = Chamber.initalArray;
        //Regex that converts string to "X","." output
        function outPutArray(array) {
            let okay = array.map((a) => a.replace(/[LR]/g, "X")).join("");
            positionOutput.push(okay);
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
        //Changes positions accoridng to the speed
        function shiftArray(input, speed) {
            leftPositionalArray = leftPositionalArray
                .map((a) => a - speed)
                .filter((a) => a >= 0 && a < input.length);
            rightPositionalArray = rightPositionalArray
                .map((a) => a + speed)
                .filter((a) => a < input.length);
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
            let resetArray = [...new Array(testArray.length)].map((a) => ".");
            testArray = [];
            testArray = resetArray;
        }
        //Main loop for each interval of time, applys all functions
        for (var i = 0; i < determineTime(Chamber.initalArray); i++) {
            if (i === 0) {
                setPositionalArray(testArray);
            }
            updateArray(testArray);
            outPutArray(testArray);
            shiftArray(testArray, speed);
            replaceArray(testArray);
        }
        //console.log(positionOutput) for visuals!
        return positionOutput;
    }
}
exports.Chamber = Chamber;
// new Chamber("R...L..R").animate(1);
//# sourceMappingURL=Particle.js.map
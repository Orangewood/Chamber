export class Chamber {
  init: string;
  static validCharacters: string[];
  static initalArray: string[];

  constructor(initialPosition: string) {
    this.init = initialPosition;
    Chamber.validCharacters = ["L", "R", "."];
    Chamber.initalArray = initialPosition.split("");

    for (var i = 0; i < Chamber.initalArray.length; i++) {
      if (
        !Chamber.validCharacters.some(
          (a: string) => a === Chamber.initalArray[i]
        )
      ) {
        throw new Error("Invalid character detected");
      }
    }

    if (this.init.length < 1 || this.init.length > 50) {
      throw new Error("Invalid string length");
    }
  }

  public animate(speed: number): string[] {
    if (speed < 1 || speed > 10 || !speed) {
      throw new Error("Invalid speed value");
    }

    //Function assumes maximum iterations - intended
    function determineTime(array: string[]): number {
      for (var i = 0; i < array.length; i++) {
        if (array.some((a) => a === "L") || array.some((a) => a === "R")) {
          return Math.floor(Chamber.initalArray.length / speed + 1);
        } else return 1;
      }
    }

    let positionOutput: string[] = [];
    let leftPositionalArray: number[] = [];
    let rightPositionalArray: number[] = [];
    let currentArray = Chamber.initalArray;

    //Regex that converts string to "X","." output
    function outPutArray(array: string[]) {
      let okay = array.map((a) => a.replace(/[LR]/g, "X")).join("");
      positionOutput.push(okay);
    }
    //Sets initial array positions
    function setPositionalArray(input: string[]) {
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
    function shiftArray(input: string[], speed: number) {
      leftPositionalArray = leftPositionalArray
        .map((a) => a - speed)
        .filter((a) => a >= 0 && a < input.length);
      rightPositionalArray = rightPositionalArray
        .map((a) => a + speed)
        .filter((a) => a < input.length);
    }
    //Changes the array to the L and R characters
    function updateArray(input: string[]) {
      for (var j = 0; j < leftPositionalArray.length; j++) {
        input.splice(leftPositionalArray[j], 1, "L");
      }
      for (var j = 0; j < rightPositionalArray.length; j++) {
        input.splice(rightPositionalArray[j], 1, "R");
      }
    }
    //Reinstates characters with dot that were evacuated
    function replaceArray(input: string[]) {
      let resetArray: string[] = [...new Array(currentArray.length)].map(
        () => "."
      );
      currentArray = [];
      currentArray = resetArray;
    }
    //Main loop for each interval of time, applys all functions
    for (var i = 0; i < determineTime(Chamber.initalArray); i++) {
      if (i === 0) {
        setPositionalArray(currentArray);
      }
      updateArray(currentArray);
      outPutArray(currentArray);
      shiftArray(currentArray, speed);
      replaceArray(currentArray);
    }
    //console.log(positionOutput) for visuals!
    return positionOutput;
  }
}

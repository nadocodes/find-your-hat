const prompt = require("prompt-sync")({ sigint: true });
var colors = require("colors");

colors.enable();

const hat = "^".green;
const hole = "O".red;
const fieldCharacter = "░".blue;
const pathCharacter = "*".magenta;

class Field {
  constructor(field) {
    this.field = field;
  }
  playGame() {
    let x = 0;
    let y = 0;
    let playing = true;
    while (playing) {
      this.print();
      let move = prompt('Which way? "u=↑, r=→, d=↓, l=←" ').toUpperCase();
      if (move === "U") {
        y--; // move up one row
      } else if (move === "D") {
        y++; // move down one row
      } else if (move === "L") {
        x--; // move left one column
      } else if (move === "R") {
        x++; // move right one column
      } else {
        console.log("Invalid move!");
      }
      console.clear() // clear the console
      if (
        y < 0 ||
        y >= this.field.length ||
        x < 0 ||
        x >= this.field[0].length
      ) {
        console.log("YOU ARE OUTSIDE!"); // went outside the field
        playing = false;
      } else if (this.field[y][x] === hole) {
        // fell down a hole
        console.log("Game Over! You fell down a hole!");
        playing = false; // game over
      } else if (this.field[y][x] === hat) {
        // found the hat
        console.log("You Win!");
        playing = false; // game over
      } else {
        this.field[y][x] = pathCharacter; // show character on field
      }
    }
  }
  print() {
    // print the field
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }
  static generateField(height, width, percentage) {
    // generate random field to play on
    let field = []; // array to hold the field
    for (let i = 0; i < height; i++) {
      let row = []; // array to hold each row
      for (let j = 0; j < width; j++) {
        let randomNum = Math.random();
        if (randomNum < percentage) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      field.push(row); // add the row to the field
    }
    field[0][0] = pathCharacter; // start at the top left
    field[height - 1][width - 1] = hat; // end at the bottom right
    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, 0.2)); // create a new field

myField.playGame(); // play the game

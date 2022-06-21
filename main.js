const prompt = require('prompt-sync')({sigint: true});
const Field = require('./class');
console.log(' ');
console.log('WELCOME to Find Your Hat!');
console.log('The aim is to make your way through the field to Find Your Hat...');
console.log(' ');
console.log('In order to move through the field:');
console.log("1. Press 'r': Move to the right");
console.log("2. Press 'l': Move to the left");
console.log("3. Press 'u': Move up");
console.log("4. Press 'd': Move down");
console.log('And one more thing... be aware of the holes!');
console.log(' ');
console.log('***** USE CTRL+C TO EXIT THE PROGRAM *****');
console.log('***** IF THE INPUT OF THE NUMBER OF ROWS AND COLUMNS IS NOT A NUMBER, BOTH ARE SET TO 5 *****');
console.log(' ');

let result = ' ';
let instance;
let widthChoice = prompt('How many COLUMNS greater than 3? ');
let heightChoice = prompt('How many ROWS greater than 3? ');

instance = new Field(Number(widthChoice),Number(heightChoice));
instance.print();


while(result != 'hat' || result != 'hole') {
    let userMove = prompt('Which way?: ');
    userMove = instance.move(userMove);

    if(userMove === 'hat') {
        console.log(" Yay, you found your hat!");
        result = 'hat';
        console.log(' ');
        console.log('GAME OVER');
        console.log('Restarting game...');
        console.log(' ');
        instance = new Field(Number(widthChoice),Number(heightChoice));
        instance.print();
    } else if(userMove === 'hole') {
        console.log("You fell into a hole... at least you won't sunburn without your hat inside there");
        result = 'hole';
        console.log(' ');
        console.log('GAME OVER');
        console.log('Restarting game...');
        console.log(' ');
        instance = new Field(Number(widthChoice),Number(heightChoice));
        instance.print();
    }
}
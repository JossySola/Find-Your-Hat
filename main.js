const prompt = require('prompt-sync')({sigint: true});
const Field = require('./class');

console.log('WELCOME to Find Your Hat!');
console.log('The aim is to make your way through the field to Find Your Hat...');
console.log('In order to move through the field:');
console.log("1. Press 'r': Move to the right");
console.log("2. Press 'l': Move to the left");
console.log("3. Press 'u': Move up");
console.log("4. Press 'd': Move down");
console.log('And one more thing... be aware of the holes!');
console.log('***** USE CTRL+C TO EXIT THE PROGRAM *****');

let result = ' ';
let instance = new Field(8,6);
instance.print();


while(result != 'hat' || result != 'hole') {
    let userMove = prompt('Which way?: ');
    userMove = instance.move(userMove);

    if(userMove === 'hat') {
        console.log(" Yay, you found your hat!");
        result = 'hat';
        return;
    } else if(userMove === 'hole') {
        console.log("You fell into a hole... at least you won't sunburn without your hat inside there");
        result = 'hole';
        return;
    }
}
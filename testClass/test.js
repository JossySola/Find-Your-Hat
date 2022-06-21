const assert = require('assert');

// CLASS TO TEST
class Field {
    constructor(width, height) {
        !width || typeof width != 'number' ? width = 5 : width;
        !height || typeof height != 'number' ? height = 5 : height;
        this.width = width;
        this.height = height;
        this.field = [];
        this.range = this.width * this.height;
        this.hatLikelihood = this.range * 0.15;
        this.holeLikelihood = this.range * 0.35;
        this.existHat = false;
        for(let x = 0; x < height; x++) {
            this.field.push([]);
            for(let y = 0; y < width; y++) {
                const rand = Math.floor(Math.random()*this.range);
                if(this.field[x][y] === this.field[0][0]) {
                    this.field[x].push('*');
                } else if(rand < this.hatLikelihood && this.field[x][y] != this.field[0][0] && !this.existHat) {
                    this.field[x].push('^');
                    this.existHat = true;
                } else {
                    this.field[x].push('░');
                }
            }
        }
        this.x = 0;
        this.y = 0;
    }

    print() {
        for(let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(' '));
        }
    }

    move(key) {
        // Get index according to coordinate
        //      Conditional: field limitations
        switch(key) {
            case 'd':
                this.field[this.y+1][this.x] ? this.y++ : this.y;
            break;

            case 'u':
                this.field[this.y-1][this.x] ? this.y-- : this.y;
            break;

            case 'l':
                this.field[this.y][this.x-1] ? this.x-- : this.x;
            break;

            case 'r':
                this.field[this.y][this.x+1] ? this.x++ : this.x;
            break;

            default:
                console.log('The input is not a valid command.');
                return '';
        }
        // Get random value symbol
        const rand = Math.floor(Math.random()*this.range);
        const sym = rand < this.holeLikelihood ? 'O' : '*';

        // Change field symbol at index as long as the index is not already an asterisk
        if(this.field[this.y][this.x] === '^') {
           //this.print();
            return 'hat';
        } else if(this.field[this.y][this.x] === '*') {
            //this.print();
            return 'asterisk';
        } else {
            this.field[this.y][this.x] = sym;
            //this.print();
            return this.field[this.y][this.x] === 'O' ? 'hole' : 'asterisk';
        }
    }
};
// ************************ TEST ************************
describe('class Field', function() {
    it('accepts a Width and a Height value', function () {
        // SETUP
        const exWidth = 6;
        const exHeight = 6;
        // EXERCISE
        const example = new Field(exWidth,exHeight);
        const result = example.width === exWidth && example.height === exHeight;
        // VERIFY
        assert.ok(result)

    })
    it('returns a Field instance', function () {
        // SETUP
        const expectedResult = true;
        const example = new Field();
        // EXERCISE
        const result = example instanceof Field;
        // VERIFY
        assert.strictEqual(result, expectedResult);
    })

    describe('Field Instance', function() {
        describe('Constructor()', function() {
            it('sets Width to 5 in case it is not provided', function() {
                // SETUP
                const example = new Field(false,3);
                // EXERCISE
                const result = example.width === 5;
                // VERIFY
                assert.ok(result);
            })
            it('sets Height to 5 in case it is not provided', function() {
                // SETUP
                const example = new Field(3,NaN);
                // EXERCISE
                const result = example.height === 5;
                // VERIFY
                assert.ok(result);
            })
            it('populates this.field according to the Width and Height stored', function() {
                // SETUP
                const example = new Field(5,7);
                function checkColumns(array) {
                    for(let i = 0; i < array.length; i++) {
                        if(array[i].length === example.width) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                function checkRows(array) {
                    if(array.length === example.height) {
                        return true;
                    } else {
                        return false;
                    }
                }
                // EXERCISE
                const result = checkColumns(example.field) && checkRows(example.field);
                // VERIFY
                assert.ok(result);
            })
            it('this.field has one hat placed randomly', function() {
                // SETUP
                const example = new Field(3,4);

                function checkSymbols(array) {
                    let hatAmount = 0;
                    for(let i = 0; i < array.length; i++) {
                        if(array[i].length > 1) {
                            for(let j = 0; j < array[i].length; j++) {
                                if(array[i][j] === '^') hatAmount++;
                            }
                        }
                    }
                    return hatAmount === 1 ? true : false;
                }
                // EXERCISE
                const result = checkSymbols(example.field);
                // VERIFY
                assert.ok(result);
            })
            it('places the user coordinate in the upper left as a start', function() {
                // SETUP
                const example = new Field(5,6);
                // EXERCISE
                const coordinateIndex = example.field[0][0];
                const coordinateSym = '*';
                const firstCoordinate = example.field[example.y][example.x];
                const result = coordinateIndex === coordinateSym && coordinateIndex === firstCoordinate;
                // VERIFY
                assert.ok(result);
            })
        })

        describe('.print()', function() {
            it('logs this.field to the console', function() {
                // SETUP
                const example = new Field(6,4);
                // EXERCISE
                //example.print()
                //console.log(example.coordinate[0]);
                const result = example.print;
                // VERIFY
                assert.ok(result); // In this case I don't know how to verify a console.log through code
            })
        })

        describe('.move(key)', function() {
            it('sums coordinate X if the letter r is used', function() {
                // SETUP
                const example = new Field();
                const expected = 1;

                // EXERCISE
                example.move('r');
                const result = example.x;

                // VERIFY
                assert.ok(result === expected);
            })
            it('decreases coordinate X if the letter l is used', function() {
                // SETUP
                const example = new Field();
                example.x++
                const expected = 0;

                // EXERCISE
                example.move('l');
                const result = example.x;

                // VERIFY
                assert.ok(result === expected);
            })
            it('sums coordinate Y if the letter d is used', function() {
                // SETUP
                const example = new Field();
                const expected = 1;

                // EXERCISE
                example.move('d');
                const result = example.y;

                // VERIFY
                assert.ok(result === expected);
            })
            it('decreases coordinate Y if the letter u is used', function() {
                // SETUP
                const example = new Field();
                example.y++
                const expected = 0;

                // EXERCISE
                example.move('u');
                const result = example.y;

                // VERIFY
                assert.ok(result === expected);
            })
            it('returns "hat" and prints the field when the coordinates locate the symbol ^', function() {
                // SETUP 
                const example = new Field();
                example.field[0][1] = '^';

                // EXERCISE
                const result = example.move('r');

                // VERIFY
                assert.ok(result === 'hat');
            })
            it('returns "asterisk" and prints the field when the coordinates locate the symbol *', function() {
                // SETUP 
                const example = new Field();
                example.x = 1;
                example.y = 0;

                // EXERCISE
                const result = example.move('l');

                // VERIFY
                assert.ok(result === 'asterisk');
            })
            it('returns the path traveled naming the symbols while randomly picking the symbol', function() {
                // SETUP 
                const example = new Field();

                // EXERCISE
                const right = example.move('r');
                const down = example.move('d');
                const down2 = example.move('d');
                const right2 = example.move('r');

                // VERIFY
                assert.ok(right && right2 && down && down2);
            })
        })
    })
})
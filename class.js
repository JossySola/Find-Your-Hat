module.exports = class Field {
    constructor(width, height) {
        !width || typeof width !== 'number' || width < 3 ? width = 5 : width;
        !height || typeof height !== 'number' || height < 3 ? height = 5 : height;
        this.width = width;
        this.height = height;
        this.field = [];
        this.range = this.width * this.height;
        this.hatLikelihood = this.range * 0.15;
        this.holeLikelihood = this.range * 0.2;
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
                if(this.field[this.y-1] == undefined) {
                    return this.y = 0;
                } else if(this.field[this.y-1][this.x]) {
                    this.y--;
                } else {
                    this.y = this.y;
                }
                //this.field[this.y-1][this.x] ? this.y-- : this.y;
            break;

            case 'l':
                this.field[this.y][this.x-1] ? this.x-- : this.x;
            break;

            case 'r':
                this.field[this.y][this.x+1] ? this.x++ : this.x;
            break;

            default:
                console.log('The input is not a valid command.');
                return ' ';
        }
        // Get random value symbol
        const rand = Math.floor(Math.random()*this.range);
        const sym = rand < this.holeLikelihood ? 'O' : '*';

        // Change field symbol at index as long as the index is not already an asterisk
        if(this.field[this.y][this.x] === '^') {
            this.print();
            return 'hat';
        } else if(this.field[this.y][this.x] === '*') {
            this.print();
            return 'asterisk';
        } else {
            this.field[this.y][this.x] = sym;
            this.print();
            return this.field[this.y][this.x] === 'O' ? 'hole' : 'asterisk';
        }
    }
};
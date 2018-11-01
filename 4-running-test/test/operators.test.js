const { add, square } = require('../utils/operators');


describe('operators', () => {
    describe('add', () => {
        it('should add two numbers', () => {
            const val = add(1, 2);

            if(val !== 3){
                throw new Error(`Expected 3, but got ${val}`);
            }
        });
    });

    describe('square', () => {
        it('should square a number', () => {
            const val = square(3);

            if(val !== 9){
                throw new Error(`Expected 9, but got ${val}`);
            }
        });
    });
});
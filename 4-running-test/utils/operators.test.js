const expect = require('expect');

const { add, square, setName, asyncAdd } = require('../utils/operators');


describe('operators', () => {
    describe('add', () => {
        it('should add two numbers', () => {
            const val = add(1, 2);

            expect(val).toBe(3).toBeA('number');
        });
    });

    describe('square', () => {
        it('should square return a number', () => {
            const val = square(3);

            expect(val).toBe(9).toBeA('number');
        });
    });

    describe('add async', () => {
        it('should add two numbers', (done) => {

            asyncAdd( 4, 4, (result) => {
                expect(result).toBe(8).toBeA('number');
                done();
            })
        });
    });

});

describe('some random tests', () => {

    it('Should verify first and last name are set', () => {
        const user = setName({age: 22, lastName: "Roberto", firstName: "Mussso"}, "Alberto Guazo");

        expect(user).toBeA('object').toExclude({lastName: "Roberto", firstName: "Mussso"});

        expect(user).toInclude({lastName: "Guazo"});
        
        expect(user).toInclude({firstName: "Alberto"});

    });

    it('should expect some values', () => {
        //expect(12).toNotBe(12); 
        expect({name: "actis"}).toNotEqual({name: "Actis"});
        expect([1,2,4]).toExclude(3);

        expect({name: "actis", location: "pepe", age: 26}).toExclude({age: 22});
    });
    
});
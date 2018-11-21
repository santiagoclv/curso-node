const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App.js', () => {

    const db = {
        saveUser: expect.createSpy()
    }

    app.__set__('db', db);

    it('should call the spy correctly', () => {

        const spy = expect.createSpy()
        
        spy('Roro', 25);

        expect(spy).toHaveBeenCalledWith('Roro', 25);

    });

    it('should call saveUser with user object', () => {

        const email = "mercedez@sasaaa.ar";
        const pass = "12231233";
        
        app.singUp(email, pass);

        expect(db.saveUser).toHaveBeenCalledWith(email, pass);
        
    });


    
});
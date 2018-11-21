const request = require('supertest');
const expect = require('expect');

const server = require('./server').server;

describe('server.js', () => {
    it('should return hello world response', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .expect('Hello World!')
            .end(done);
    });
    
    it('should return status 404 and an object with an error message response', (done) => {
        request(server)
            .get('/hi')
            .expect(404)
            .expect( (res) => {
                expect(res.body).toInclude({
                    error: 'Page not found.'
                });
            })
            .end(done);
    }); 
});
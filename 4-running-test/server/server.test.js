const request = require('supertest');
const server = require('./server').server;

describe('Testing Server Requests', () => {
    it('should return hello world response', (done) => {
        request(server)
            .get('/')
            .expect('Hello World!')
            .end(done);
    });    
});
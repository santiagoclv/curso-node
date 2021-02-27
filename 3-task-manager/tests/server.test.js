const request = require('supertest');
const { Types: { ObjectId } } = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require("../src/app");
const User = require("../src/modules/user");

const user_one = {
    name: "Martin",
    age: 4,
    email: "martin@gm.com",
    password: "martin123"
};

const user_two = {
    _id: new ObjectId(),
    name: "Santiago",
    age: 3,
    email: "santi@gm.com",
    password: "santi123",
};

beforeEach( async () => {
    await User.deleteMany();
    await new User(user_two).save();
});

test("Should sing up new user", async () => {
    const response = await request(app).post('/users').send(user_one);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
        name: user_one.name,
        email: user_one.email,
        age: user_one.age,
    });
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();
});

test("Should login existing user", async () => {
    const response = await request(app).post('/users/login').send(user_two);
    const user = await User.findById(user_two._id);

    expect(response.body.token).toBe(user.tokens[0].token);
    expect(response.status).toBe(200);
});

test("Should not login nonexisting user", async () => {
    const response = await request(app).post('/users/login').send(user_one);

    expect(response.status).toBe(401);
});

test("Should get auth user", async () => {
    const { body: { token }} = await request(app).post('/users/login').send(user_two);
    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}` )
        .send();

    expect(response.status).toBe(200);
    expect(response.body.age).toBe(3);
});

test("Should not get user without auth", async () => {
    const response = await request(app)
        .get('/users/me')
        .send();

    expect(response.status).toBe(401);
});

test("Should delete account for user", async () => {
    const { body: { token }} = await request(app).post('/users/login').send(user_two);
    
    const deleteResponse = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${token}` )
        .send();

    const deleteUserResponse = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}` )
        .send();
    
    const user = await User.findById(user_two._id);

    expect(user).toBeNull();
    
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.age).toBe(3);
    
    expect(deleteUserResponse.status).toBe(401);
});

test("Should not delete account for user without auth", async () => {
    const deleteResponse = await request(app)
        .delete('/users/me')
        .send();
    
    expect(deleteResponse.status).toBe(401);
});


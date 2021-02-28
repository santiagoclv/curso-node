const request = require('supertest');
const app = require("../src/app");
const Task = require("../src/modules/task");

const { user_two, setupDatabase, task_user_one, task_user_two } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up new user", async () => {
    const { body: { token }} = await request(app).post('/users/login').send(user_two);

    const new_task = {
        description: "Test desc",
        completed: false
    }

    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}` )
        .send(new_task);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(new_task);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test("Should get tasks only from auth user", async () => {
    const { body: { token }} = await request(app).post('/users/login').send(user_two);

    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}` )
        .send();
    
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(task_user_two.length);
});

test("Should not delete tasks from other users", async () => {
    const { body: { token }} = await request(app).post('/users/login').send(user_two);

    const response = await request(app)
        .delete('/tasks/' + task_user_one[0]._id)
        .set('Authorization', `Bearer ${token}` )
        .send();
    
    expect(response.status).toBe(404);
    
    const task = await Task.findById(task_user_one[0]._id);
    expect(task).not.toBeNull();
    expect(task.description).toBe(task_user_one[0].description);
});
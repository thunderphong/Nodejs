const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../config/test.env')});
const request = require('supertest');

const app = require('../src/app');

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'PhuongTran',
        email: 'thunderphuongss@gmail.com',
        password: '07102464024a!'
    }).expect(201)
})
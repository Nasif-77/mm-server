const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { tokenVerify } = require('../utils/jwttoken')
const requestWithSupertest = supertest(app)


 jest.mock( '../utils/jwttoken', () => {
     return{
         tokenVerify: jest.fn((req, res, next) => {
             next()
         })
     } 
 })


describe('course Endpoints', () => {

const courseId = '64a0086c66a5706ae78ad520'
const course = {
name:"game Developing",
description:"game developement good course"
}


    test('POST /api/admin/courses will respond with status 201', async () => {
      
    const response = await requestWithSupertest.post('/api/admin/courses').send(course)

        expect(response.status).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('status', 'succss');
        expect(response.body).toHaveProperty('message', 'Successfully created a course.');
        expect(response.body).toHaveProperty('data');
      });


    test('GET one course /api/admin/courses/:id will response with status 200', async () => {
        const response = await requestWithSupertest.get(`/api/admin/courses/${courseId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully fetched a data');
        expect(response.body).toHaveProperty('data');
    })


    test('GET /courses will response with status 200', async () => {

        const response = await requestWithSupertest.get('/api/admin/courses')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully fetched all the courses detail.');
        expect(response.body).toHaveProperty('data');
    })



    test('PUT /courses/:id will  response with 200', async () => {
        const courseUpdate = {
            name:"MERN Developing",
            description:"MERN developement good course"
            }

        const response = await requestWithSupertest.put(`/api/admin/courses/${courseId}`).send(courseUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully updated the course details.');
        expect(response.body).toHaveProperty('data');
    })

    test('DELETE /courses/:id will response with 201', async () => {
        const response = await requestWithSupertest.delete(`/api/admin/courses/${courseId}`)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', "Successfully deleted the course.");
        expect(response.body).toHaveProperty('data');
    })

 afterAll(async()=>{
    await mongoose.connection.close()
 })
})
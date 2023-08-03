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

describe('batch Endpoints', () => {
const batchId = '64a0067d34b46fcce3a75178'
const batch = {
    title: "batchAslam",
    course: "MERN",
    students:["shihad,nasif"]
}


    test('POST /api/admin/batches will respond with status 201', async () => {
      
    const response = await requestWithSupertest.post('/api/admin/batches').send(batch)

        expect(response.status).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully created a batch.');
        expect(response.body).toHaveProperty('data');
      });


    test('GET one batches /api/admin/batches/:id will response with status 200', async () => {
        const response = await requestWithSupertest.get(`/api/admin/batches/${batchId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Succesfully fetched single batch');
        expect(response.body).toHaveProperty('data');
    })


    test('GET /batch will response with status 200', async () => {

        const response = await requestWithSupertest.get('/api/admin/batches')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully fetched all data');
        expect(response.body).toHaveProperty('data');
    })



    test('PUT /batches/:id will  response with 200', async () => {
        const batchUpdate = {
            title: "batch 001",
            course: "python",
            students:["shihad11,nasif11"]
        }

        const response = await requestWithSupertest.put(`/api/admin/batches/${batchId}`).send(batchUpdate)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully updated the batch');
        expect(response.body).toHaveProperty('data');
    })

    test('DELETE /batches/:id will response with 201', async () => {
        const response = await requestWithSupertest.delete(`/api/admin/batches/${batchId}`)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', "Succesfully batch Deleted");
        expect(response.body).toHaveProperty('data');
    })

 afterAll(async()=>{
    await mongoose.connection.close()
 })
})
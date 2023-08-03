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

describe('Inquery Endpoints', () => {
const inqueryId = '64a00c24c54e87dba8d55f79'
const inquery = {
    name: "Shaheedul Aslam",
    address: "Mongo Company",
    phone: "1234567890",
    email: "mongo@gmail.com",
    nextFollowUp:"04 july 2023"  
}


    test('POST /api/admin/inquiries will respond with status 201', async () => {
      
    const response = await requestWithSupertest.post('/api/admin/inquiries').send(inquery)

        expect(response.status).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully created a inquiry');
        expect(response.body).toHaveProperty('data');
      });


    test('GET one inquery /inquery/:id will response with status 200', async () => {
        const response = await requestWithSupertest.get(`/api/admin/inquiries/${inqueryId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully fetched the inquiry details');
        expect(response.body).toHaveProperty('data');
    })


    test('GET /inquery will response with status 200', async () => {

        const response = await requestWithSupertest.get('/api/admin/inquiries')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully fetched all the inquiries detail');
        expect(response.body).toHaveProperty('data');
    })



    test('PUT /inquery/:id will  response with 200', async () => {
        const inqueryUpdate = {
            name: "Aslam",
            address: "BridgeonCompany",
            phone: "9876543298",
            email: "aslam@gmail.com",
            nextFollowUp:"07 july 2023"  
        }

        const response = await requestWithSupertest.put(`/api/admin/inquiries/${inqueryId}`).send(inqueryUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully updated the Inquiry detail');
        expect(response.body).toHaveProperty('data');
    })

    test('DELETE /inquey/:id will response with 201', async () => {
        const response = await requestWithSupertest.delete(`/api/admin/inquiries/${inqueryId}`)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', "Successfully deleted an Inquiry");
        expect(response.body).toHaveProperty('data');
    })

 afterAll(async()=>{
    await mongoose.connection.close()
 })
})
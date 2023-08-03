const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { tokenVerify } = require('../utils/jwttoken')
const requestWithSupertest = supertest(app)


jest.mock( '../utils/jwttoken', () => {
    return{
        tokenVerify: jest.fn((req, res, next) => {
            next()
        })
    } 
})


describe('staff Endpoints', (done) => {

const userId = '6488685d11aaa996102cc1f6'
const staff = {
    name:"viswa",
    email:"viswa@gmail.com",
    password:"viswa3000",
    role:"staff",
    permissions:["students","fees"]
}


    test('POST /api/admin/staffs will respond with status 201', async () => {
      
    const response = await requestWithSupertest.post('/api/admin/staffs').send(staff)
      console.log(response.status);

        expect(response.status).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Successfully New Staff Created');
        expect(response.body).toHaveProperty('data');
      });


    it('GET one staff /staffs/:id will response with status 200', async () => {
        const response = await requestWithSupertest.get(`/api/admin/staffs/${userId}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Fetched a statff data');
        expect(response.body).toHaveProperty('data');

    })


    test('GET /staff will response with status 200', async () => {

        const response = await requestWithSupertest.get('/api/admin/staffs')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'All Staffs Fetched Successfully');
        expect(response.body).toHaveProperty('data');
    })



    test('PUT /staffs/:id will  response with 200', async () => {
        const staffsUpdate = {
            name:"viswa",
            email:"viswa@gmail.com",
            password:"viswa3000",
            role:"stafff",
            permissions:["attendance","fees"]
        }

        const response = await requestWithSupertest.put(`/api/admin/staffs/${userId}`).send(staffsUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'staff were updated');
        expect(response.body).toHaveProperty('data');
    })

    test('DELETE /staffs/:id will response with 201', async () => {
        const response = await requestWithSupertest.delete(`/api/admin/staffs/${userId}`)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', "Staff has deleted successfully");
        expect(response.body).toHaveProperty('data');
    })
    
    afterAll(async()=>{
        await mongoose.connection.close()
     })
    
})
// const app = require('../app')
// const supertest = require('supertest')
// const mongoose = require('mongoose')
//  const jwt = require('jsonwebtoken')

// const requestWithSupertest = supertest(app)

// describe('fees Endpoints', () => {

// const fees = {
//     title:"rent",
//     type:0,
//     amount:2000
// }


// let token;


// beforeEach(() => {
//     // Generate a JWT token for testing
//     const secret =process.env.SECRET_KEY ; 
//     const payload = { userId: "64956b3c49d5fa069bcd0330" };
//     token = jwt.sign(payload, secret);
//   });


    // test('POST /api/admin/fees will respond with status 201', async () => {
      
    // const response = await requestWithSupertest.post('/api/admin/fees').send(fees)
    //      .set('Authorization', `Bearer ${token}`);
    //   console.log(response.status);

    //     expect(response.status).toBe(201);
    //     expect(response.type).toMatch(/json/);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Successfully created a fees structure');
    //     expect(response.body).toHaveProperty('data');
    //   });


    // test('GET /fees will response with status 200', async () => {

    //     const response = await requestWithSupertest.get('/api/admin/fees')
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Successfully fetched all the fees structures');
    //     expect(response.body).toHaveProperty('data');
    // })



    // test('PUT /fees/:id will  response with 200', async () => {
    //     const feesUpdate = {
    //         title:"spacerent",
    //         type:0,
    //         amount:2000
    //     }

    //     const response = await requestWithSupertest.put(`/api/admin/fees/6495b0f43ea694f8b431967f`).send(feesUpdate)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201)
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Succesfully Updated the fees details');
    //     expect(response.body).toHaveProperty('data');
    // })

    // test('DELETE /fees/:id will response with 201', async () => {
    //     const response = await requestWithSupertest.delete(`/api/admin/fees/6495b0f43ea694f8b431967f`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Successfully deleted the fees");
    //     expect(response.body).toHaveProperty('data');
    // })




    // test('GET /fees/collections will response with 201', async () => {
    //     const response = await requestWithSupertest.get(`/api/admin/fees/collections`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Successfully fetched all student fees collections");
    //     expect(response.body).toHaveProperty('data');
    // })



//   test('POST /fees/student/:id will response with 201', async () => {
//          const response = await requestWithSupertest.post(`/api/admin/fees/student/647f5865ab822c45c2132d1c`)
//           .set('Authorization', `Bearer ${token}`);

//          expect(response.status).toBe(201);
//          expect(response.body).toHaveProperty('status', 'success');
//          expect(response.body).toHaveProperty('message', "Successfully created a fees payment history");
//          expect(response.body).toHaveProperty('data');
//      })



    // test('PUT /fees/student/:id will response with 201', async () => {
    //     const response = await requestWithSupertest.put(`/api/admin/fees/student/647f5865ab822c45c2132d1c`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Successfully updated the fees payment history");
    //     expect(response.body).toHaveProperty('data');
    // })


    // test('PATCH /fees/student/:id will response with 201', async () => {
    //     const response = await requestWithSupertest.patch(`/api/admin/fees/student/647f5865ab822c45c2132d1c`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Successfully added the fee structure to the student");
    //     expect(response.body).toHaveProperty('data');
    // })


    // test('DELETE /fees/student/:id will response with 201', async () => {
    //     const response = await requestWithSupertest.patch(`/api/admin/fees/student/647f5865ab822c45c2132d1c`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Successfully deleted the student fees payment history");
    //     expect(response.body).toHaveProperty('data');
    // })


//  afterAll(async()=>{
//     await mongoose.connection.close()
//  })
// })
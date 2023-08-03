// const app = require('../app')
// const supertest = require('supertest')
// const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

// const requestWithSupertest = supertest(app)

// describe('students Endpoints', () => {

//     const students = {
//         name: 'John Doe',
//         address: '123 Main St',
//         phone: 1234567890,
//         email: 'john@example.com',
//         course: 'Mern Stack',
//         guardian: {
//           relationship: 'Parent',
//           name: 'Jane Doe',
//           phone: 9876543210,
//         },
//         image: '2023-06-23T11-25-13.820Z-Screenshot 2023-06-13 135104',
//       };


// let token;


// beforeEach(() => {
//     // Generate a JWT token for testing
//     const secret =process.env.SECRET_KEY ; 
//     const payload = { userId: "64956b3c49d5fa069bcd0330" };
//     token = jwt.sign(payload, secret);
//   });


    // test('POST /api/admin/students will respond with status 201', async () => {
      
    // const response = await requestWithSupertest.post('/api/admin/students').send(students)
    // .set('Authorization', `Bearer ${token}`);
    //     expect(response.status).toBe(201);
    //     expect(response.type).toMatch(/json/);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Successfully created student');
    //     expect(response.body).toHaveProperty('data');
    //   });


    // test('GET one students /api/admin/students/:id will response with status 200', async () => {
    //     const response = await requestWithSupertest.get(`/api/admin/students/6495783a148d41056573f5b3`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Fetched a student data');
    //     expect(response.body).toHaveProperty('data');
    // })


    // test('GET /api/admin/students will response with status 200', async () => {

    //     const response = await requestWithSupertest.get('/api/admin/students')
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Fetched all the Students data');
    //     expect(response.body).toHaveProperty('data');
    // })



    // test('PUT /students/:id will  response with 200', async () => {
    //     const students = {
    //         name:"shihad",
    //         address:"kochi",
    //         phone:123489323,
    //         email:"shihad@gmail.com"
    //     }

    //     const response = await requestWithSupertest.put(`/api/admin/students/6495783a148d41056573f5b3`).send(courseUpdate)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', 'Student data Succesfully updated');
    //     expect(response.body).toHaveProperty('data');
    // })

    // test('DELETE /students/:id will response with 201', async () => {
    //     const response = await requestWithSupertest.delete(`/api/admin/students/6495783a148d41056573f5b3`)
    //      .set('Authorization', `Bearer ${token}`);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('status', 'success');
    //     expect(response.body).toHaveProperty('message', "Student deleted successfully");
    //     expect(response.body).toHaveProperty('data');
    // })

//  afterAll(async()=>{
//     await mongoose.connection.close()
//  })
// })
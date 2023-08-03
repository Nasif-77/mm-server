const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')


const request = supertest(app)


describe('users endpoint',(done)=>{

    it('POST /api/admin/login should return a success message with token', async () => {
        const response = request.post('/api/admin/login')
          .send({ email: 'bridgeontraining@gmail.com', password: 'bridgeon123' })
          .set('Content-Type', 'application/json')
          .then((response)=>{
            expect(response.status).toEqual(200);
            expect(response.type).toMatch(/json/);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('message', 'Admin successfully logined');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toBeTruthy();

            done()
          }) 

      });

})
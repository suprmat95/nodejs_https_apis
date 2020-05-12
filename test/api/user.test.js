const chai = require('chai');
const chaiHttp = require('chai-http');
const app =  require('../../app');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const Str = require('@supercharge/strings');
chai.use(chaiHttp);

describe('User post', function ()  {
    it('Posting users with diffent name', function (done) {
       chai.request(app)
           .post('/users')
           .send({
               name: Str.random(15),
               password: "password"
           })
           .end((err, res) =>{
               if(err){
                   console.log('Error: '+ err);
               }
               console.log('Text ' + res.text); // outputs normal-looking response
               expect(res).to.have.status(200);
               expect(res.type,'application/json');
               done();
           })
    });
    it('Posting users with same name, testing the check on user name', function (done) {
        chai.request(app)
            .post('/users')
            .send({
                name: "name",
                password: "password"
            })
            .send({
                name: "name",
                password: "password"
            })
            .end((err, res) =>{
                if(err){
                    console.log('Error: '+ err);
                }
                console.log('Text ' + res.text); // outputs normal-looking response
                expect(res).to.have.status(403);
                expect(res.type,'application/json');
                done();
            })
    });


});

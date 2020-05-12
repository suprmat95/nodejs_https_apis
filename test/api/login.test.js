const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const Str = require('@supercharge/strings');
chai.use(chaiHttp);

describe('Login test', function () {
    let randomName = Str.random(15)
    it('Create a user and then login', function (done) {
        chai.request(app)
            .post('/users')
            .send({
                name: randomName,
                password: "password"
            })
            .end((err, res) => {
                if (err) {
                    console.log('Error creation new user:  ' + err);
                } else {
                    chai.request(app)
                        .get('/auth/login')
                        .send({
                            name: randomName,
                            password: "password"
                        })
                        .end((err, res) => {
                            if (err) {
                                console.log('Error Login: ' + err);
                            } else {
                                console.log('Text ' + res.text); // outputs normal-looking response
                                expect(res).to.have.status(200);
                                expect(res.type, 'application/json');
                                done();
                            }
                        })
                }


            })
    });
    it('Create a user and then try to login but with a worng password', function (done) {
        chai.request(app)
            .post('/users')
            .send({
                name: randomName,
                password: "password"
            })
            .end((err, res) => {
                if (err) {
                    console.log('Error creation new user:  ' + err);
                } else {
                    chai.request(app)
                        .get('/auth/login')
                        .send({
                            name: randomName,
                            password: "password1"
                        })
                        .end((err, res) => {
                            if (err) {
                                console.log('Error Login: ' + err);
                            } else {
                                console.log('Text ' + res.text); // outputs normal-looking response
                                expect(res).to.have.status(400);
                                expect(res.type, 'application/json');
                                done();
                            }
                        })
                }


            })
    });
    it('User not present in db', function (done) {
        chai.request(app)
            .get('/auth/login')
            .send({
                name: randomName+"user",
                password: "passwor"
            })
            .end((err, res) => {
                if (err) {
                    console.log('Error Login: ' + err);
                } else {
                    console.log('Text ' + res.text); // outputs normal-looking response
                    expect(res).to.have.status(403);
                    expect(res.type, 'application/json');
                    done();
                }
            })

    });
});

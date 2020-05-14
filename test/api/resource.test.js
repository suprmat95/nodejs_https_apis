const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const Str = require('@supercharge/strings');
chai.use(chaiHttp);
let cuid = require('cuid');

describe('[Test resource creation]', function () {
    let randomName = Str.random(15);
    it('1. Creating a resource. Before create a user, then login and create a resource', function (done) {
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
                                console.log('Response ' + res.text); // outputs normal-looking response
                                chai.request(app)
                                    .post('/auth/resource')
                                    .auth(res.body.token, {type: "bearer"})
                                    .send({data: [{field3: "example"}]})
                                    .end((err, res) => {
                                        if (err) {
                                            console.log('Error posting resource: ' + err);
                                        } else {
                                            expect(res).to.have.status(200);
                                            expect(res.type, 'application/json');
                                            done();
                                        }
                                    });

                            }
                        })
                }


            })
    });

    it('2. Creating a resource error test. Trying to create two resource with the same id', function (done) {

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
                    let token = res.body.token
                    chai.request(app)
                        .post('/auth/resource')
                        .auth(token, {type: "bearer"})
                        .send({id: "id1", data: [{field3: "example"}]})
                        .end((err, res) => {
                            if (err) {
                                console.log('Error posting resource: ' + err);
                            } else {
                                chai.request(app)
                                    .post('/auth/resource')
                                    .auth(token, {type: "bearer"})
                                    .send({id: "id1", data: [{field3: "example"}]})
                                    .end((err, res) => {
                                        if (err) {
                                            console.log('Error posting resource: ' + err);
                                        } else {
                                            console.log('Response ' + res.text); // outputs normal-looking response
                                            expect(res).to.have.status(500);
                                            expect(res.type, 'application/json');
                                            done();
                                        }
                                    });
                            }
                        });

                }
            })
    });

    it('3. Creating a resource error test. Trying create a resource with a token not correct', function (done) {
        chai.request(app)
            .post('/auth/resource')
            .auth('tokennotcorrect', {type: "bearer"})
            .send({data: [{field3: "example"}]})
            .end((err, res) => {
                if (err) {
                    console.log('Error posting resource: ' + err);
                } else {
                    console.log('Response ' + res.text); // outputs normal-looking response
                    expect(res).to.have.status(400);
                    expect(res.type, 'application/json');
                    done();
                }
            });

    })
});

describe('[Test get one resource]', function () {
    let randomName = Str.random(15);
    let randomid = cuid();

    it('1.Get one resource. Create a user, then login and get a resource by id', function (done) {

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
                                let token = res.body.token
                                chai.request(app)
                                    .post('/auth/resource')
                                    .auth(token, {type: "bearer"})
                                    .send({id: randomid, data: [{field3: "example"}]})
                                    .end((err, res) => {
                                        if (err) {
                                            console.log('Error posting resource: ' + err);
                                        } else {

                                            chai.request(app)
                                                .get('/auth/resource/' + randomid)
                                                .auth(token, {type: "bearer"})
                                                .end((err, res) => {
                                                    if (err) {
                                                        console.log('Error get resource: ' + err);
                                                    } else {
                                                        console.log('Response ' + res.text); // outputs normal-looking response
                                                        expect(res).to.have.status(200);
                                                        expect(res.type, 'application/json');
                                                        done();
                                                    }
                                                });
                                        }
                                    });
                            }
                        })
                }

            })
    });

    it('2.Get a resource error test. Try getting a resource with id not correct', function (done) {

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
                    let token = res.body.token
                    chai.request(app)
                        .get('/auth/resource/' + cuid())
                        .auth(token, {type: "bearer"})
                        .end((err, res) => {
                            if (err) {
                                console.log('Error get resource: ' + err);
                            } else {
                                console.log('Response ' + res.text); // outputs normal-looking response
                                expect(res).to.have.status(404);
                                expect(res.type, 'application/json');
                                done();
                            }
                        });

                }
            })
    });
});

describe('[Resource updating one test]', function () {
    let randomName = Str.random(15);
    let randomid = cuid();

    it('1.Update a resource. Create a user, then login and update a resource by id', function (done) {

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
                                let token = res.body.token;
                                chai.request(app)
                                    .post('/auth/resource')
                                    .auth(token, {type: "bearer"})
                                    .send({id: randomid, data: [{field3: "example"}]})
                                    .end((err, res) => {
                                        if (err) {
                                            console.log('Error posting resource: ' + err);
                                        } else {

                                            chai.request(app)
                                                .put('/auth/resource/' + randomid)
                                                .auth(token, {type: "bearer"})
                                                .send({id: randomid, data: [{field2: "example2"}]})
                                                .end((err, res) => {
                                                    if (err) {
                                                        console.log('Error get resource: ' + err);
                                                    } else {
                                                        console.log('Response ' + res.text); // outputs normal-looking response
                                                        expect(res).to.have.status(200);
                                                        expect(res.type, 'application/json');
                                                        done();
                                                    }
                                                });
                                        }
                                    });
                            }
                        })
                }

            })
    });

    it('2.Update a resource error test. Try to update a resource with id not correct', function (done) {

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
                    let token = res.body.token
                    chai.request(app)
                        .put('/auth/resource/' + cuid())
                        .auth(token, {type: "bearer"})
                        .send({data: [{field2: "example2"}]})
                        .end((err, res) => {
                            if (err) {
                                console.log('Error get resource: ' + err);
                            } else {
                                console.log('Response ' + res.text); // outputs normal-looking response
                                expect(res).to.have.status(404);
                                expect(res.type, 'application/json');
                                done();
                            }
                        });
                }
            })


    })
});


describe('[Resource deleting one test]', function () {
    let randomName = Str.random(15);
    let randomid = cuid();

    it('1. Resource deleting. Creating a user, then login and creating a resource and deleting it', function (done) {

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
                                let token = res.body.token;
                                chai.request(app)
                                    .post('/auth/resource')
                                    .auth(token, {type: "bearer"})
                                    .send({id: randomid, data: [{field3: "example"}]})
                                    .end((err, res) => {
                                        if (err) {
                                            console.log('Error posting resource: ' + err);
                                        } else {

                                            chai.request(app)
                                                .delete('/auth/resource/' + randomid)
                                                .auth(token, {type: "bearer"})
                                                .end((err, res) => {
                                                    if (err) {
                                                        console.log('Error get resource: ' + err);
                                                    } else {
                                                        console.log('Response ' + res.text); // outputs normal-looking response
                                                        expect(res).to.have.status(200);
                                                        expect(res.type, 'application/json');
                                                        done();
                                                    }
                                                });
                                        }
                                    });
                            }
                        })
                }

            })
    });

    it('2. Resource deleting error test. Try to delete a resource with id not correct', function (done) {

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
                    let token = res.body.token;
                    chai.request(app)
                        .delete('/auth/resource/' + cuid())
                        .auth(token, {type: "bearer"})
                        .end((err, res) => {
                            if (err) {
                                console.log('Error get resource: ' + err);
                            } else {
                                console.log('Response ' + res.text); // outputs normal-looking response
                                expect(res).to.have.status(404);
                                expect(res.type, 'application/json');
                                done();
                            }
                        });
                }
            })


    })
});

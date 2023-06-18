const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

let email

afterAll(async () => {
    try {
        await User.destroy({
            where: {}
        })
    } catch (error) {
        console.log(error);
    }
})

describe("POST /user/register", () => {
    it("should response 201", (done) => {
        request(app)
        .post("/user/register")
        .send({
            email: "admin@mail.com",
            password: "123456",
            username: "admin"
        })
        .expect(201)
        .end((err, res) => {
            if(err) {
                done(err)
            }
            email = res.body.email
            console.log(res.body, "<<resbody register");
            expect(typeof res.body).toEqual("object")
            expect(res.body.data).toHaveProperty("id")
            expect(res.body.data).toHaveProperty("email")
            expect(res.body.data).toHaveProperty("username")
            expect(res.body.data.email).toEqual("admin@mail.com")
            done()
        })
    })

    it("should response error login 500", (done) => {
        request(app)
        .post("/user/register")
        .send({
            email: "admin@mail.com",
            password: "123456",
            username: "admin"
        })
        .expect(500)
        .end((err,res) => {
           done()
        })
    })
})

describe("POST /user/login", () => {

    it("should response 201 login", (done) => {
        request(app)
        .post("/user/login")
        .send({
            email: "admin@mail.com",
            password: "123456",
        })
        .expect(201)
        .end((err,res) => {
            if(err) {
                done(err)
            }
            console.log(res.body, "<<resbody login");
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("token")
            done()
        })
    })

    it("should response 401 error login", (done) => {
        request(app)
        .post("/user/login")
        .send({
            email: "salah@mail.com",
            passsword: "123456"
        })
        .expect(401)
        .end((err,res) => {
            if(err) {
                done(err)
            }
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("message")
            expect(res.body.name).toEqual("User Login error")
            done()
        })
    })
})

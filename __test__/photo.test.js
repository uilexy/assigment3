const request = require("supertest")
const app = require("../app")
const { generateToken } = require("../helpers/jwt")
const { User, Photo } = require("../models")

let token
let UserId
let photoId

beforeAll(async () => {
    try {
        const user = await User.create({
            email: "admin@mail.com",
            password: "123456",
            username: "admin"
        })

        token = generateToken({
            id: user.id,
            email: user.email,
            username: user.username
        })

        const photo = await Photo.create({
            title: "admin",
            caption: "admin",
            image_url: "http://admin",
        })

        id = user.id
        photoId = photo.id
        console.log(id, "<< USER ID ");
        console.log(photoId, "<<PHOTO ID")
    } catch (error) {
        console.log(error);
    }
})

afterAll(async () => {
    try {
        await User.destroy({
            where: {}
        })
    } catch (error) {
        console.log(error);
    }
})

describe("POST /photo/", () => {
    it("should response 200 created photo", (done) => {
        request(app)
        .post("/photo/")
        .send({
            title: "admin",
            caption: "admin",
            image_url: "http://admin",
            UserId: id
        })
        .set({
            token: token
        })
        .expect(200)
        .end((err,res) => {
            if(err) {
                done(err)
            }
            expect(typeof res.body).toEqual("object")
            expect(res.body.Photo).toHaveProperty("id")
            expect(res.body.Photo).toHaveProperty("title")
            expect(res.body.Photo).toHaveProperty("caption")
            expect(res.body.Photo).toHaveProperty("image_url")
            done()
        })
    })
    
    it("should response 401 authentication", (done) => {
        request(app)
        .post("/photo/")
        .send({
            title: "a",
            caption: "a",
            image_url: "http://a",
            UserId: id
        })
        .expect(401)
        .end((err,res) => {
            if(err) {
                done(err)
            }

            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            expect(res.body.message).toEqual("Token not provided!")
            done()
        })
    })
})

describe("GET /photo/", () => {
    it("response success getAllPhoto 200", (done) => {
        request(app)
        .get("/photo/")
        .set({
            token: token
        })
        .expect(200)
        .end((err,res) => {
            if(err) {
                done(err)
            }

            expect(typeof res.body).toEqual("object")
            expect(res.body[0]).toHaveProperty("id")
            expect(res.body[0]).toHaveProperty("title")
            expect(res.body[0]).toHaveProperty("caption")
            expect(res.body[0]).toHaveProperty("image_url")
            expect(res.body[0]).toHaveProperty("UserId")
            done()
        })
    })

    it("response error authentication 401", (done) => {
        request(app)
        .get("/photo/")
        .expect(401)
        .end((err, res) => {
            if(err) {
                done(err)
            }

            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("code")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.code).toEqual("number")
            expect(typeof res.body.message).toEqual("string")
            expect(res.body.code).toEqual(401)
            expect(res.body.message).toEqual("Token not provided!")
            done()
        })
    })
})

describe("GET /photo/:id", () => {
    it("response succes getPhotoById 200", (done) => {
        request(app)
        .get(`/photo/${photoId}`)
        .set({
            token: token
        })
        .expect(200)
        .end((err, res) => {
            if(err) {
                done(err)
            }
            console.log(res.body, "res body photo by id");
            expect(typeof res.body).toEqual("object")
            expect(res.body.Photo).toHaveProperty("id")
            expect(res.body.Photo).toHaveProperty("title")
            expect(res.body.Photo).toHaveProperty("caption")
            expect(res.body.Photo).toHaveProperty("image_url")
            expect(res.body.Photo).toHaveProperty("UserId")
            done()
        })
    })

    it("should response error getPhotoById 404", (done) => {
        request(app)
        .get(`/photo/${photoId + 66}`)
        .set({
            token: token
        })
        .expect(401)
        .end((err,res) => {
            if(err) {
                done(err)
            }
            console.log(res.body, "RESBODY PHOTO BY ID");
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            expect(res.body.message).toEqual("Data not found")
            done()
        })
    })
})
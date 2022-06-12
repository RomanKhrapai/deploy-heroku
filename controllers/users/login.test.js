const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { User } = require("../../models/user");
const login = require("./login");

const app = express();
app.use(express.json());
app.get("/api/users/login", login);
const server = app.listen(process.env.PORT || 3000);

describe("Test User login", () => {
    beforeAll(() => {
        () => server;

        const mockUser = {
            _id: "629f1433a4fdf7dbd3d1f5e1",
            email: "1@email.com",
            password:
                "$2b$10$QsmYehz5P4twCUJPxewo3u3c37U7k1iHlptNgg/.rqlOJFiCwyw/y",
            subscription: "starter",
            token: null,
            avatarURL: "avatars\\587f42de-7eec-43bc-8cce-f47da641cc34.jpg",

            comparePassword: jest.fn(() => true),
        };

        const mockToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTExZmE2NTkwOTI3ZTJjMjI5ZjNkMyIsImlhdCI6MTY1NDAyMjk0NiwiZXhwIjoxNjU0MDI2NTQ2fQ.46_JxCOsBS8QvquzR_nLVSVm5RuxnvcbS-EpMMtRRBY";

        jest.spyOn(User, "findOne").mockImplementationOnce(() => mockUser);
        jest.spyOn(jwt, "sign").mockImplementationOnce(() => mockToken);
        jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(
            async () => {
                return { ...mockUser, token: mockToken };
            }
        );
    });
    afterAll(() => server.close());

    it("Return status 200 with correct data", async () => {
        const res = await request(app).get("/api/users/login").send({
            email: "1@email.com",
            password: "111111",
        });
        expect(res.status).toBe(200);
    });

    it("Checking if the token field exists", async () => {
        const res = await request(app).get("/api/users/login").send({
            email: "1@email.com",
            password: "111111",
        });
        expect(res.body.data.token).toBeDefined();
    });

    it("Checking if the user object exists", async () => {
        const res = await request(app).get("/api/users/login").send({
            email: "1@email.com",
            password: "111111",
        });
        expect(res.body.data.user).toHaveProperty("email");
        expect(res.body.data.user).toHaveProperty("subscription");
        expect(typeof res.body.data.user.email).toBe("string");
        expect(typeof res.body.data.user.subscription).toBe("string");
    });
});

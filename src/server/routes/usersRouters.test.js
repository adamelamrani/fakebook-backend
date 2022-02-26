const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectDatabase = require("../../db");
const User = require("../../db/models/User");
const app = require("..");

let newUserOne;
let password;
let dataBase;

beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const mongoUrl = dataBase.getUri();
  await connectDatabase(mongoUrl);
});

beforeEach(async () => {
  password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);

  jest.mock("../../db/models/User");
  jest.resetAllMocks();

  newUserOne = await User.create({
    name: "adam",
    surname: "el amrani",
    birthdate: "1991-07-10",
    username: "adelamco",
    email: "adam@gmail.com",
    password: hashedPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await dataBase.stop();
});

describe("Given a /user/login endpoint", () => {
  describe("When it receives post method and a valid username and password", () => {
    test("Then it should return status 200", async () => {
      const user = { username: newUserOne.username, password: "123456" };
      const { body } = await request(app)
        .post("/user/login")
        .send(user)
        .expect(200);
      expect(body).toHaveProperty("token");
    });
  });

  describe("When the received method is invalid", () => {
    test("Then it should return status 404", async () => {
      const user = { username: newUserOne.username, password: "123456" };
      await request(app).get("/user/login").send(user).expect(404);
    });
  });
});

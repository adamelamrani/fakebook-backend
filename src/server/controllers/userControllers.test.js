require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../db/models/User");
const login = require("./userControllers");
const connectDatabase = require("../../db");

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

describe("Given a login userController function", () => {
  describe("When it receives a valid username and password", () => {
    test("Then it should call res.json method with a token", async () => {
      const req = {
        body: { username: newUserOne.username, password },
      };
      const res = { json: jest.fn() };

      User.findOne = jest.fn().mockResolvedValue(newUserOne);
      await login(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When the user exists, but the password is wrong", () => {
    test("Then it should call next, res.json method with status 400 and an error message", async () => {
      password = "wrongpassword";
      const req = {
        body: { username: newUserOne.username, password },
      };
      const error = new Error("Something went wrong");
      const next = jest.fn().mockReturnValue(error.message);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne = jest.fn().mockResolvedValue(newUserOne);
      await login(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When the username doesn't exists", () => {
    test("Then it should call res status and res.json with an error", async () => {
      const userName = "wrongusername";
      const req = { body: { username: userName, password } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error("Something went wrong");
      const next = jest.fn().mockReturnValue(error.message);

      User.findOne = jest.fn().mockResolvedValue(req.body);
      await login(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

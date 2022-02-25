const { notFound, generalError } = require("./errors");

describe("Given a notFound middleware function", () => {
  describe("When an error occurs", () => {
    test("Then it should return status 404 and a message 'Resource not found'", () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(404), json: jest.fn() };

      const error = { error: true, message: "Resource not found" };
      const status = 404;

      notFound(req, res);

      expect(res.json).toHaveBeenLastCalledWith(error);
      expect(res.status).toHaveBeenLastCalledWith(status);
    });
  });
});

describe("Given a generalError middleware function", () => {
  describe("When an error occurs", () => {
    test("Then it should return status 500 and a message 'General error'", () => {
      const req = {};
      const err = {};
      const res = { status: jest.fn().mockReturnThis(500), json: jest.fn() };
      const error = { error: true, message: "General error" };
      const status = 500;

      generalError(err, req, res);

      expect(res.json).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});

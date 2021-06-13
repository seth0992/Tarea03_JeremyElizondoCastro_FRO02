const app = require("./index");
const request = require("supertest");
const axios = request("axios");

jest.mock("axios");

describe("server/rutas", () => {
  it("rutas maneja /", async () => {
    const respuesta = await request(app).get("/");
    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.text).toBe("<h1>Hola mundo!</h1>");
  });
});

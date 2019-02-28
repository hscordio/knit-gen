import { Hello } from "../src/api/hello";
import { Container, Scope, HttpServer } from "@msiviero/knit";
import { Service } from "../src/service/service";
import supertest = require("supertest");


describe("Http server custom instance", () => {

  const container = new Container()
    .register(Hello, Scope.Singleton)
    .register(Service, Scope.Singleton);

  const httpServer = new HttpServer(container)
    .api(Hello);

  beforeAll(() => httpServer.start(0));
  afterAll(() => httpServer.stop());

  it("should register endpoint and serve requests", async () => {

    const response = await supertest(httpServer.app.server)
      .get("/hello")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(response.text).toEqual(JSON.stringify({ hello: "world" }));
  });
});
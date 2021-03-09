// import { Request, Response } from "express";
import app from "../index";

import supertest from "supertest";
const api = supertest(app);

describe("Expect a 200 status code from request", () => {
  test("get 200 status code and json response ", async () => {
    await api
      .get("/forms/frontier/applications")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

// describe("Google", () => {
//   beforeAll(async () => {
//     await page.goto("https://google.com");
//   });

//   it('should be titled "Google"', async () => {
//     await expect(page.title()).resolves.toMatch("Google");
//   });
// });

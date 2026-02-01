import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to register", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Golden Paws Cat Rescue",
      email: "adoptions@goldenpawscats.org",
      password: "1234567",
      phone: "+14155559877",
      street: "780 Valencia Street",
      city: "San Francisco",
      state: "CA",
    });

    expect(response.statusCode).toEqual(201);
  });
});

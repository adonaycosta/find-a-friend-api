import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.js";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org-tests.js";

describe("Search Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to list pet by city", async () => {
    const { austinOrg, austinoOrgAuthToken, sanFranciscoOrg, sanFranciscoOrgAuthToken } =
      await createAndAuthenticateOrg(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${sanFranciscoOrgAuthToken}`)
      .send({
        name: "Bob",
        age: "SENIOR",
        size: "LARGE",
        specie: "CAT",
        orgId: sanFranciscoOrg.id,
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${sanFranciscoOrgAuthToken}`)
      .send({
        name: "Charles",
        age: "SENIOR",
        size: "MEDIUM",
        specie: "CAT",
        orgId: sanFranciscoOrg.id,
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${austinoOrgAuthToken}`)
      .send({
        name: "Alice",
        age: "ADULT",
        size: "SMALL",
        specie: "CAT",
        orgId: austinOrg.id,
      });

    const response = await request(app.server)
      .get(`/pets`)
      .query({
        city: "San Francisco",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Bob" }),
        expect.objectContaining({ name: "Charles" }),
      ]),
    );

    expect(response.body.pets).toEqual(
      expect.not.arrayContaining([expect.objectContaining({ name: "Alice" })]),
    );
  });
});

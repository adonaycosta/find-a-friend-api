import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "@/lib/prisma.js";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const sanFranciscoOrg = await prisma.org.create({
    data: {
      name: "Golden Paws Cat Rescue",
      email: "adoptionss@goldenpawscats.org",
      password_hash: await hash("1234567", 6),
      phone: "+14155559877",
      street: "780 Valencia Street",
      city: "san francisco",
      state: "CA",
    },
  });

  const austinOrg = await prisma.org.create({
    data: {
      name: "Austin Pets Shelter",
      email: "austin@petshelter.org",
      password_hash: await hash("1234567", 6),
      phone: "+15125551234",
      street: "123 Congress Ave",
      city: "austin",
      state: "TX",
    },
  });

  const sanFranciscoOrgAuthResponse = await request(app.server).post("/sessions").send({
    email: "adoptionss@goldenpawscats.org",
    password: "1234567",
  });

  const austinOrgAuthResponse = await request(app.server).post("/sessions").send({
    email: "austin@petshelter.org",
    password: "1234567",
  });

  const { token: sanFranciscoOrgAuthToken } = sanFranciscoOrgAuthResponse.body;
  const { token: austinoOrgAuthToken } = austinOrgAuthResponse.body;

  return {
    sanFranciscoOrgAuthToken,
    sanFranciscoOrg,
    austinOrg,
    austinoOrgAuthToken,
  };
}

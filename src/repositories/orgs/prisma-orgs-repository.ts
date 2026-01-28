import type { Org, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import type { OrgsRepository } from "./orgs-repository.js";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  findManyByCity(city: string): Promise<Org[]> {
    throw new Error("Method not implemented.");
  }
}

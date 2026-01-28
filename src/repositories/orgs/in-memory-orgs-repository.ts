import { randomUUID } from "node:crypto";
import type { Org, Prisma } from "@prisma/client";
import type { OrgsRepository } from "./orgs-repository.js";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.orgs.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findManyByCity(city: string) {
    const orgs = this.orgs.filter((org) => org.city.toLowerCase() === city.toLowerCase());

    return orgs;
  }
}

import type { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import type { OrgsRepository } from "@/repositories/orgs/orgs-repository.js";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error.js";

export interface createOrgsServiceRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  city: string;
  state: string;
}

export interface createOrgsServiceResponse {
  org: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    street,
    city,
    state,
  }: createOrgsServiceRequest): Promise<createOrgsServiceResponse> {
    const emailAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      phone,
      street,
      city,
      state,
    });

    return {
      org,
    };
  }
}

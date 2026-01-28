import type { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import type { OrgsRepository } from "@/repositories/orgs/orgs-repository.js";
import { InvalidCredentialsError } from "../errors/invalid-credentials-erros.js";

interface authenticateServiceRequest {
  email: string;
  password: string;
}

interface authenticateServiceResponse {
  org: Org;
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: authenticateServiceRequest): Promise<authenticateServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, org.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}

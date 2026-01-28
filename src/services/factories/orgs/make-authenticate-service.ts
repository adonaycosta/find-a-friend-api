import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository.js";
import { AuthenticateService } from "../../orgs/authenticate-service.js";

export function MakeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateService = new AuthenticateService(orgsRepository);

  return authenticateService;
}

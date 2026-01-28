import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository.js";
import { CreateOrgService } from "../../orgs/create-org-service.js";

export function MakeRegisterService() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerService = new CreateOrgService(orgsRepository);

  return registerService;
}

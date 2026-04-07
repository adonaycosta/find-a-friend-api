import type { OrgsRepository } from "@/repositories/orgs/orgs-repository.js";
import type { PetsRepository } from "@/repositories/pets/pets-repository.js";
import { buildWhatsAppLinkUrl } from "@/utils/build-whatsapp-link-url.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

export interface getPetAdoptionContactServiceRequest {
  id: string;
}

export interface getPetAdoptionContactServiceResponse {
  whatsAppLink: string;
}

export class GetPetAdoptionContactService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    id,
  }: getPetAdoptionContactServiceRequest): Promise<getPetAdoptionContactServiceResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const org = await this.orgsRepository.findById(pet.orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const whatsAppLink = buildWhatsAppLinkUrl({
      phone: org.phone,
      petName: pet.name,
    });

    return {
      whatsAppLink,
    };
  }
}

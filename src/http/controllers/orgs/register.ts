import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { EmailAlreadyExistsError } from "@/services/errors/email-already-exists-error.js";
import { MakeRegisterService } from "@/services/factories/orgs/make-register-service.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(7),
    phone: z
      .string()
      .min(10)
      .transform((phone) => phone.replace(/\D/g, ""))
      .refine((phone) => /^[1-9]\d{11,14}$/.test(phone), {
        error: "Invalid WhatsApp number. Use country code + area code + number: 5511999999999.",
      }),
    street: z.string(),
    city: z.string(),
    state: z.string(),
  });

  const { name, email, password, phone, street, city, state } = registerOrgBodySchema.parse(
    request.body,
  );

  try {
    const createOrgService = MakeRegisterService();

    await createOrgService.execute({
      name,
      email,
      password,
      phone,
      street,
      city,
      state,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
  }

  return reply.status(201).send();
}

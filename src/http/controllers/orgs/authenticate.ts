import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-erros.js";
import { MakeAuthenticateService } from "@/services/factories/orgs/make-authenticate-service.js";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(7),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = MakeAuthenticateService();

    const { org } = await authenticateService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    );
    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}

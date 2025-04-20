import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzLsc5BzvQi+wgsxHfwM3uDS/A5EWIo2QI55pbQpYYdzthq/Ag/CYPFDgzcIhZEfoD60K/IlRM3KAZ6wVMgobDB48J+VwlSTAQA8mV6Zrc/bGOFdH4sJaIHn9GPd0gB9wDzDska/2OcHY/15Vt02jtrGk7YV6+tSv6PHDQvs/cHflSSVxEerQqCwLxlMyE8kNq0uWdUoVZ7E7aIRIqBUTYmscR6bKkkf55if03WAC3KvX3ad7jJANVOguT/U8SGvmN1m7PGFvLILutN+RzskOjLyEHy9BoGQVscpnCIgQylpfZ2z99mxlQ3ZLp7kz5AnyYFf0/xUWEaSOOa83kA/ZMwIDAQAB
jQIDAQAB
-----END PUBLIC KEY-----
`;

export async function keycloakAuthMiddleware(
  req: any,
  res: any,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token não fornecido ou formato inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica se o token foi gerado pelo keycloak
    const payload = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

    req.user = payload;
    next();
  } catch (error: any) {
    console.error("Erro na verificação do token:", error);
    return res.status(401).json({
      error: "Token inválido",
      details: error.message,
    });
  }
}

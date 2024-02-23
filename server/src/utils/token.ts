import jwt, { SignOptions } from "jsonwebtoken";

// Define the type for the secret
const JWT_Secret: string = process.env.JWT_SECRET || "secret";

export const createToken = (email: string): string => {
  if (!JWT_Secret) {
    throw new Error("JWT Secret is not defined");
  }

  // Define options for token signing
  const signOptions: SignOptions = { expiresIn: "1h" };

  const token = jwt.sign({ email }, JWT_Secret, signOptions);

  return token;
};

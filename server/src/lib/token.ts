import jwt, { SignOptions } from "jsonwebtoken";

type JwtPayload = {
  email: string
}
// Define the type for the secret
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

export const createToken = (email: string): string => {
  try {
    const payload: JwtPayload = { email };
    const signOptions: SignOptions = { expiresIn: "1h" };
    const token: string = jwt.sign(payload, JWT_SECRET, signOptions);

    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};

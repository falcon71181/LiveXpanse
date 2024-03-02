type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginFormData = Omit<RegisterFormData, "confirmPassword" | "username">;

export type { RegisterFormData, LoginFormData };

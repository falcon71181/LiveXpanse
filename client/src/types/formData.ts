type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginFormData = Omit<RegisterFormData, "confirmPassword" | "username">;

type UpdateFormData = {
  updatedUsername: string;
  updatedEmail: string;
  currentPassword: string;
  updatedPassword: string;
  updatedConfirmPassword: string;
}

export type { RegisterFormData, LoginFormData, UpdateFormData };

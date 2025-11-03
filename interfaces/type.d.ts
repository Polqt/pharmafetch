interface CreateUserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface SignInParams {
  email: string;
  password: string;
}

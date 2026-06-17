type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export function login(data: LoginData) {
  return {
    token: "token-fake",
    user: {
      id: 1,
      name: "Usuário Teste",
      email: data.email,
    },
  };
}

export function register(data: RegisterData) {
  return {
    token: "token-fake",
    user: {
      id: 1,
      name: data.name,
      email: data.email,
    },
  };
}

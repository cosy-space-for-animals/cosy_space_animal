export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type UserSafe = {
  id: number;
  nome: string | null;
  login: string;
};

export type SignupInput = {
  nome?: string | null;
  login: string;
  senha: string;
};

export type LoginInput = {
  login: string;
  senha: string; 
};

export type JwtPayload = {
  sub: number;      
  login: string;     
  iat?: number;
  exp?: number;
};

import { prisma } from '../config/prisma';

export const userService = {
  async createUser(data: {
    nome?: string | null;
    login: string;
    senhaHash: string;
  }) {
    const now = new Date();
    return prisma.usuarios.create({
      data: {
        nome: data.nome ?? null,
        login: data.login,
        senha: data.senhaHash,
        criado_em: now,
        alterado_em: now,
      },
      select: { id: true, nome: true, login: true },
    });
  },

  async findByLogin(login: string) {
    return prisma.usuarios.findUnique({
      where: { login },
    });
  },

  async touchAlteradoEm(id: number) {
    return prisma.usuarios.update({
      where: { id },
      data: { alterado_em: new Date() },
      select: { id: true },
    });
  },
};

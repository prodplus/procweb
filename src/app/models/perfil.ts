export class Perfil {
  id: number;
  role: string;
  descricao: string;

  constructor(id: number, role: string, descricao: string) {
    this.id = id;
    this.role = role;
    this.descricao = descricao;
  }
}

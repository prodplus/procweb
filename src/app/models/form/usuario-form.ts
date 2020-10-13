export class UsuarioForm {
  id: number;
  nome: string;
  email: string;
  password: string;
  perfil: string;

  constructor(
    id: number,
    nome: string,
    email: string,
    password: string,
    perfil: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.perfil = perfil;
  }
}

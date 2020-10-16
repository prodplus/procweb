import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faEdit,
  faToggleOff,
  faToggleOn,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Page } from 'src/app/models/auxiliares/page';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { UsuarioDto } from 'src/app/models/dto/usuario-dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { mensagemPadrao, trataOperacao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  isLoading = false;
  page: Page<UsuarioDto>;
  idUsuario: number;
  pagina = 1;
  ativos = true;
  iToggleOn = faToggleOn;
  iToggleOff = faToggleOff;
  iEdit = faEdit;
  iTrash = faTrash;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];
  }

  private recarregar(ativos: boolean, pagina: number) {
    this.usuarioService.listarAtivos(ativos, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  mudaPagina(pagina: number) {
    this.isLoading = true;
    this.recarregar(this.ativos, pagina);
  }

  alterarAtivos() {
    this.isLoading = true;
    this.ativos = !this.ativos;
    this.pagina = 1;
    this.recarregar(this.ativos, this.pagina);
  }

  trataPerfil(perfil: string): string {
    switch (perfil) {
      case 'ROLE_ADMIN':
        return 'aministrador';
      case 'ROLE_USER':
        return 'usuário';
      default:
        return 'usuário';
    }
  }

  chamaModal(id: number, op: string) {
    this.idUsuario = id;
    let operacao = trataOperacao(op, 'o usuário');
    this.modal.open(
      mensagemPadrao(null, 'warning', 'Atenção!', operacao),
      op,
      true
    );
  }

  confirmouModal(resp: RespModal) {
    if (resp.emissao) {
      resp.tipo === 'e'
        ? this.excluir(this.idUsuario)
        : resp.tipo === 'a'
        ? this.desativar(this.idUsuario, true)
        : resp.tipo === 'd'
        ? this.desativar(this.idUsuario, false)
        : this.modal.open(
            mensagemPadrao(null, 'danger', 'Erro!', 'Opção inválida!'),
            '',
            false
          );
    }
  }

  private excluir(id: number) {
    this.isLoading = true;
    this.usuarioService.excluir(id).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      complete: () => {
        this.isLoading = false;
        this.pagina = 1;
        this.recarregar(this.ativos, this.pagina);
      },
    });
  }

  private desativar(id: number, ativar: boolean) {
    this.isLoading = true;
    this.usuarioService.ativar(id, ativar).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      complete: () => {
        this.isLoading = false;
        this.pagina = 1;
        this.recarregar(this.ativos, this.pagina);
      },
    });
  }
}

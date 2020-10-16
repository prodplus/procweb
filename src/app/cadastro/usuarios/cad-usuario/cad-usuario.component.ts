import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDto } from 'src/app/models/dto/usuario-dto';
import { UsuarioForm } from 'src/app/models/form/usuario-form';
import { Perfil } from 'src/app/models/perfil';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MustMatch } from 'src/app/utils/must-match';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css'],
})
export class CadUsuarioComponent implements OnInit, AfterViewInit {
  isLoading = false;
  form: FormGroup;
  perfis: Perfil[];
  idUsuario: number;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;
  @ViewChild('input', { static: false })
  input: ElementRef<HTMLInputElement>;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getPerfis().subscribe((p) => (this.perfis = p));

    this.form = this.builder.group(
      {
        nome: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email],
          this.usuarioService.checkEmailTaken(this.idUsuario),
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        confirma: ['', [Validators.required]],
        perfil: ['ROLE_USER', [Validators.required]],
      },
      { validators: MustMatch('password', 'confirma') }
    );

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const usuario: UsuarioDto = this.route.snapshot.data['usuario'];
        this.carregaForm(usuario);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  private carregaForm(usuario: UsuarioDto) {
    this.idUsuario = usuario.id;
    this.form.patchValue({
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    });
  }

  private carregaUsuario(): UsuarioForm {
    return new UsuarioForm(
      this.idUsuario ? this.idUsuario : null,
      this.form.get('nome').value.toUpperCase(),
      this.form.get('email').value,
      this.form.get('password').value,
      this.form.get('perfil').value
    );
  }

  salvar() {
    this.isLoading = true;
    if (!this.idUsuario) {
      this.usuarioService.salvar(this.carregaUsuario()).subscribe({
        error: (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/cadastro/usuarios']);
        },
      });
    } else {
      this.usuarioService
        .atualizar(this.idUsuario, this.carregaUsuario())
        .subscribe({
          error: (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          complete: () => {
            this.isLoading = false;
            this.router.navigate(['/cadastro/usuarios']);
          },
        });
    }
  }
}

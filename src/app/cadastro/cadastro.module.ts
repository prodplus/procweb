import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadUsuarioComponent } from './usuarios/cad-usuario/cad-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [ListaUsuariosComponent, CadUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule,
    NgxViacepModule,
    NgxMaskModule,
    NgbModule,
    CadastroRoutingModule,
  ],
})
export class CadastroModule {}

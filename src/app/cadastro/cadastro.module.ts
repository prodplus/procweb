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
import { CadConsumidorComponent } from './consumidores/cad-consumidor/cad-consumidor.component';
import { ListaConsumidoresComponent } from './consumidores/lista-consumidores/lista-consumidores.component';
import { CadFornecedorComponent } from './fornecedores/cad-fornecedor/cad-fornecedor.component';
import { ListaFornecedoresComponent } from './fornecedores/lista-fornecedores/lista-fornecedores.component';
import { CadUsuarioComponent } from './usuarios/cad-usuario/cad-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ListaProcessosComponent } from './processos/lista-processos/lista-processos.component';
import { CadProcessoComponent } from './processos/cad-processo/cad-processo.component';

@NgModule({
  declarations: [
    ListaUsuariosComponent,
    CadUsuarioComponent,
    ListaConsumidoresComponent,
    CadConsumidorComponent,
    ListaFornecedoresComponent,
    CadFornecedorComponent,
    ListaProcessosComponent,
    CadProcessoComponent,
  ],
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

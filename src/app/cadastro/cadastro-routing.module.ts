import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { CadAtendimentoResolver } from '../resources/cad-atendimento.resolver';
import { CadConsumidorResolver } from '../resources/cad-consumidor.resolver';
import { CadFornecedorResolver } from '../resources/cad-fornecedor.resolver';
import { CadProcessoResolver } from '../resources/cad-processo.resolver';
import { CadUsuarioResolver } from '../resources/cad-usuario.resolver';
import { ListaAtendimentosResolver } from '../resources/lista-atendimentos.resolver';
import { ListaConsumidoresResolver } from '../resources/lista-consumidores.resolver';
import { ListaFornecedoresResolver } from '../resources/lista-fornecedores.resolver';
import { ListaProcessosResolver } from '../resources/lista-processos.resolver';
import { ListaUsuariosResolver } from '../resources/lista-usuarios.resolver';
import { CadAtendimentoComponent } from './atendimentos/cad-atendimento/cad-atendimento.component';
import { ListaAtendimentosComponent } from './atendimentos/lista-atendimentos/lista-atendimentos.component';
import { CadConsumidorComponent } from './consumidores/cad-consumidor/cad-consumidor.component';
import { ListaConsumidoresComponent } from './consumidores/lista-consumidores/lista-consumidores.component';
import { CadFornecedorComponent } from './fornecedores/cad-fornecedor/cad-fornecedor.component';
import { ListaFornecedoresComponent } from './fornecedores/lista-fornecedores/lista-fornecedores.component';
import { CadProcessoComponent } from './processos/cad-processo/cad-processo.component';
import { ListaProcessosComponent } from './processos/lista-processos/lista-processos.component';
import { CadUsuarioComponent } from './usuarios/cad-usuario/cad-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            component: ListaUsuariosComponent,
            resolve: { page: ListaUsuariosResolver },
          },
          {
            path: 'novo',
            children: [
              { path: '', component: CadUsuarioComponent },
              {
                path: ':id',
                component: CadUsuarioComponent,
                resolve: { usuario: CadUsuarioResolver },
              },
            ],
          },
        ],
      },
      {
        path: 'consumidores',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ListaConsumidoresComponent,
            resolve: { page: ListaConsumidoresResolver },
          },
          {
            path: 'novo',
            children: [
              { path: '', component: CadConsumidorComponent },
              {
                path: ':id',
                component: CadConsumidorComponent,
                resolve: { consumidor: CadConsumidorResolver },
              },
            ],
          },
        ],
      },
      {
        path: 'fornecedores',
        children: [
          {
            path: '',
            component: ListaFornecedoresComponent,
            resolve: { page: ListaFornecedoresResolver },
          },
          {
            path: 'novo',
            children: [
              { path: '', component: CadFornecedorComponent },
              {
                path: ':id',
                component: CadFornecedorComponent,
                resolve: { fornecedor: CadFornecedorResolver },
              },
            ],
          },
        ],
      },
      {
        path: 'processos',
        children: [
          {
            path: '',
            component: ListaProcessosComponent,
            resolve: { page: ListaProcessosResolver },
          },
          {
            path: 'novo',
            children: [
              { path: '', component: CadProcessoComponent },
              {
                path: ':id',
                component: CadProcessoComponent,
                resolve: { processo: CadProcessoResolver },
              },
            ],
          },
        ],
      },
      {
        path: 'atendimentos',
        children: [
          {
            path: '',
            component: ListaAtendimentosComponent,
            resolve: { page: ListaAtendimentosResolver },
          },
          {
            path: 'novo',
            children: [
              { path: '', component: CadAtendimentoComponent },
              {
                path: ':id',
                component: CadAtendimentoComponent,
                resolve: { atendimento: CadAtendimentoResolver },
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}

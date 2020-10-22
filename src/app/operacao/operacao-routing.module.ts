import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { CadProcessoResolver } from '../resources/cad-processo.resolver';
import { NotConsumidorResolver } from '../resources/not-consumidor.resolver';
import { NotFornecedorResolver } from '../resources/not-fornecedor.resolver';
import { PorNotConsumidorComponent } from './consumidor/por-not-consumidor/por-not-consumidor.component';
import { NotFornecedorComponent } from './fornecedor/not-fornecedor/not-fornecedor.component';
import { PorNotFornecedorComponent } from './fornecedor/por-not-fornecedor/por-not-fornecedor.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'not-fornecedor',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PorNotFornecedorComponent,
            resolve: { processos: NotFornecedorResolver },
          },
          {
            path: ':id',
            component: NotFornecedorComponent,
            resolve: { processo: CadProcessoResolver },
          },
        ],
      },
      {
        path: 'not-consumidor',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PorNotConsumidorComponent,
            resolve: { processos: NotConsumidorResolver },
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
export class OperacaoRoutingModule {}

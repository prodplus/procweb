import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { AudienciaResolver } from '../resources/audiencia.resolver';
import { CadProcessoResolver } from '../resources/cad-processo.resolver';
import { NotConsumidorResolver } from '../resources/not-consumidor.resolver';
import { NotFornecedorResolver } from '../resources/not-fornecedor.resolver';
import { PrazoResolver } from '../resources/prazo.resolver';
import { PorAudienciaComponent } from './audiencia/por-audiencia/por-audiencia.component';
import { PorNotConsumidorComponent } from './consumidor/por-not-consumidor/por-not-consumidor.component';
import { NotFornecedorComponent } from './fornecedor/not-fornecedor/not-fornecedor.component';
import { PorNotFornecedorComponent } from './fornecedor/por-not-fornecedor/por-not-fornecedor.component';
import { PorPrazoComponent } from './prazo/por-prazo/por-prazo.component';

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
      {
        path: 'prazo',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PorPrazoComponent,
            resolve: { processos: PrazoResolver },
          },
        ],
      },
      {
        path: 'audiencia',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PorAudienciaComponent,
            resolve: { processos: AudienciaResolver },
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

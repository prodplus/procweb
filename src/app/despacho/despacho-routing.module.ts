import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { CadProcessoResolver } from '../resources/cad-processo.resolver';
import { NovosResolver } from '../resources/novos.resolver';
import { MarcaAudienciaComponent } from './marca-audiencia/marca-audiencia.component';
import { NovoDespachoComponent } from './novo-despacho/novo-despacho.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'novos',
        component: NovoDespachoComponent,
        resolve: { processos: NovosResolver },
      },
      {
        path: 'audiencias',
        children: [
          {
            path: ':id',
            component: MarcaAudienciaComponent,
            resolve: { processo: CadProcessoResolver },
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
export class DespachoRoutingModule {}

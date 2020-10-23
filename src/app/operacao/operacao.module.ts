import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { NotFornecedorComponent } from './fornecedor/not-fornecedor/not-fornecedor.component';
import { PorNotFornecedorComponent } from './fornecedor/por-not-fornecedor/por-not-fornecedor.component';
import { OperacaoRoutingModule } from './operacao-routing.module';
import { PorNotConsumidorComponent } from './consumidor/por-not-consumidor/por-not-consumidor.component';
import { PorPrazoComponent } from './prazo/por-prazo/por-prazo.component';
import { PorAudienciaComponent } from './audiencia/por-audiencia/por-audiencia.component';

@NgModule({
  declarations: [PorNotFornecedorComponent, NotFornecedorComponent, PorNotConsumidorComponent, PorPrazoComponent, PorAudienciaComponent],
  imports: [
    CommonModule,
    SharedModule,
    OperacaoRoutingModule,
    FontAwesomeModule,
    NgxMaskModule,
  ],
})
export class OperacaoModule {}

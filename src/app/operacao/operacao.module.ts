import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { PorAudienciaComponent } from './audiencia/por-audiencia/por-audiencia.component';
import { PorNotConsumidorComponent } from './consumidor/por-not-consumidor/por-not-consumidor.component';
import { NotFornecedorComponent } from './fornecedor/not-fornecedor/not-fornecedor.component';
import { PorNotFornecedorComponent } from './fornecedor/por-not-fornecedor/por-not-fornecedor.component';
import { OperacaoRoutingModule } from './operacao-routing.module';
import { PorPrazoComponent } from './prazo/por-prazo/por-prazo.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    PorNotFornecedorComponent,
    NotFornecedorComponent,
    PorNotConsumidorComponent,
    PorPrazoComponent,
    PorAudienciaComponent,
    RankingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OperacaoRoutingModule,
    FontAwesomeModule,
    NgxMaskModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OperacaoModule {}

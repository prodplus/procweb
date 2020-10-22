import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { NotFornecedorComponent } from './fornecedor/not-fornecedor/not-fornecedor.component';
import { PorNotFornecedorComponent } from './fornecedor/por-not-fornecedor/por-not-fornecedor.component';
import { OperacaoRoutingModule } from './operacao-routing.module';

@NgModule({
  declarations: [PorNotFornecedorComponent, NotFornecedorComponent],
  imports: [
    CommonModule,
    SharedModule,
    OperacaoRoutingModule,
    FontAwesomeModule,
    NgxMaskModule,
  ],
})
export class OperacaoModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { DespachoRoutingModule } from './despacho-routing.module';
import { MarcaAudienciaComponent } from './marca-audiencia/marca-audiencia.component';
import { NovoDespachoComponent } from './novo-despacho/novo-despacho.component';

@NgModule({
  declarations: [NovoDespachoComponent, MarcaAudienciaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DespachoRoutingModule,
  ],
})
export class DespachoModule {}

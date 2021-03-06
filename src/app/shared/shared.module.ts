import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { BotaoAtivarComponent } from './botao-ativar/botao-ativar.component';
import { BotaoCancelarComponent } from './botao-cancelar/botao-cancelar.component';
import { BotaoHomeComponent } from './botao-home/botao-home.component';
import { BotaoNovoComponent } from './botao-novo/botao-novo.component';
import { CadEnderecoComponent } from './cad-endereco/cad-endereco.component';
import { CadFonesComponent } from './cad-fones/cad-fones.component';
import { CadMovimentoComponent } from './cad-movimento/cad-movimento.component';
import { ControleAtComponent } from './controle-at/controle-at.component';
import { ModalComponent } from './modal/modal.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SelecConsComponent } from './selec-cons/selec-cons.component';
import { SelecFornComponent } from './selec-forn/selec-forn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  declarations: [
    BotaoCancelarComponent,
    BotaoHomeComponent,
    BotaoNovoComponent,
    CadEnderecoComponent,
    CadMovimentoComponent,
    ModalComponent,
    PaginadorComponent,
    SearchInputComponent,
    SelecConsComponent,
    SelecFornComponent,
    SpinnerComponent,
    TituloComponent,
    ControleAtComponent,
    BotaoAtivarComponent,
    CadFonesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgxViacepModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule,
  ],
  exports: [
    BotaoCancelarComponent,
    BotaoHomeComponent,
    BotaoNovoComponent,
    CadEnderecoComponent,
    CadMovimentoComponent,
    ModalComponent,
    PaginadorComponent,
    SearchInputComponent,
    SelecConsComponent,
    SelecFornComponent,
    SpinnerComponent,
    TituloComponent,
    BotaoAtivarComponent,
    ControleAtComponent,
    CadFonesComponent,
  ],
})
export class SharedModule {}

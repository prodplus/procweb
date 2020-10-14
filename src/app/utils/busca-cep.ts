import { FormGroup } from '@angular/forms';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';

export function buscaCep(form: FormGroup, cepService: NgxViacepService) {
  const cep = form.get('cep').value;

  if (cep && cep.length == 8) {
    form.get('logradouro').setValue('...');
    form.get('numero').setValue('');
    form.get('complemento').setValue('');
    form.get('bairro').setValue('...');
    form.get('municipio').setValue('...');
    form.get('uf').setValue(null);

    cepService
      .buscarPorCep(cep)
      .then((e: Endereco) => {
        form.get('logradouro').setValue(e.logradouro);
        form.get('bairro').setValue(e.bairro);
        form.get('municipio').setValue(e.localidade);
        form.get('uf').setValue(e.uf);
      })
      .catch((err: ErroCep) => {
        alert(err.message);
        form.get('logradouro').setValue('');
        form.get('numero').setValue('');
        form.get('complemento').setValue('');
        form.get('bairro').setValue('');
        form.get('municipio').setValue('');
        form.get('uf').setValue(null);
      });
  }
}

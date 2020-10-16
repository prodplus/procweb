import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { CadUsuarioResolver } from '../resources/cad-usuario.resolver';
import { ListaUsuariosResolver } from '../resources/lista-usuarios.resolver';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

// Pessoas
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditUserResolver } from './user/edit-user/edit-user.resolver';

// Pedidos
import { AddPedidoComponent } from './pedido/add-pedido/add-pedido.component';
import { ListPedidoComponent } from './pedido/list-pedido/list-pedido.component';
import { EditPedidoComponent } from './pedido/edit-pedido/edit-pedido.component';
import { EditPedidoResolver } from './pedido/edit-pedido/edit-pedido.resolver';

// Pessoas
import { AddPessoaFisicaComponent } from './pessoa/add-pessoa/add-pessoa.component';
import { ListPessoaFisicaComponent } from './pessoa/list-pessoa/list-pessoa.component';
import { EditPessoaFisicaComponent } from './pessoa/edit-pessoa/edit-pessoa.component';
import { EditPessoaFisicaResolver } from './pessoa/edit-pessoa/edit-pessoa.resolver';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login', component: LoginComponent, canActivate: [AppComponent],
    runGuardsAndResolvers: 'always'
  },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-users', component: ListUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent, resolve: { data: EditUserResolver } },

  { path: 'add-pedido', component: AddPedidoComponent },
  { path: 'list-pedidos', component: ListPedidoComponent },
  { path: 'edit-pedido/:id', component: EditPedidoComponent, resolve: { data: EditPedidoResolver } },

  { path: 'add-pessoa', component: AddPessoaFisicaComponent },
  { path: 'list-pessoas', component: ListPessoaFisicaComponent },
  { path: 'edit-pessoa/:id', component: EditPessoaFisicaComponent, resolve: { data: EditPessoaFisicaResolver } }
];

export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });

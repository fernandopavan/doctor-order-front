import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './core/error-interceptor';
import { AuthInterceptorProvider } from './core/auth-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, DateAdapter
} from '@angular/material';

import { MedicoService } from './service/medico.service';
import { PedidoService } from './service/pedido.service';
import { PessoaFisicaService } from './service/pessoa-fisica.service';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';

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

import { MAT_DATE_LOCALE } from '@angular/material';
import { CustomDateAdapter } from './custom.date.adapter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    AddUserComponent,
    EditUserComponent,
    ListUserComponent,

    AddPedidoComponent,
    EditPedidoComponent,
    ListPedidoComponent,

    AddPessoaFisicaComponent,
    EditPessoaFisicaComponent,
    ListPessoaFisicaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
  ],
  providers: [
    AuthService,
    StorageService,
    MedicoService,
    PedidoService,
    PessoaFisicaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    EditUserResolver,
    EditPedidoResolver,
    EditPessoaFisicaResolver,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

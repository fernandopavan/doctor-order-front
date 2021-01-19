import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { PedidoService } from '../../service/pedido.service';
import { PessoaFisicaService } from '../../service/pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';
import { StorageService } from '../../service/storage.service';

import { PessoaFisica } from '../../model/pessoaFisica';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class AddPedidoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public pessoaService: PessoaFisicaService,
    private pedidoService: PedidoService,
    public storage: StorageService) { }

  pessoas: PessoaFisica[] = [];
  
  userLogado = this.storage.getLocalUser();

  minDate = new Date(1900, 1, 1);
  date: any;
  
  addForm: FormGroup;

  validationMessages = {
    pessoaFisica: [
      { type: 'required', message: 'Pessoa fisica é obrigatório.' }
    ],
    exames: [
      { type: 'required', message: 'Exame(s) é obrigatório.' },
      { type: 'maxlength', message: 'Exame(s) deve possuir entre 3 e 300 caracteres.' }
    ]
  };

  ngOnInit() {
    this.createForm();
    this.getPessoas();
  }

  onSubmit() {
    this.addForm.value.dataValidade = new Date(this.addForm.value.dataValidade).toISOString().slice(0, 10);
    this.pedidoService.create(this.addForm.value)
      .subscribe(data => {
        this.resetFields();
        Swal.fire('Sucesso!', 'Pedido criado', 'success');
        this.router.navigate(['list-pedidos']);
      });
  }

  getPessoas(): void {
    this.pessoaService.findByName("").subscribe(response => {
      this.pessoas = response;
    });
  }

  back() {
    this.router.navigate(['/list-pedidos']);
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      pessoaFisica: ['', Validators.required],
      exames: ['', Validators.required],
      dataValidade: ['']
    });
  }

  resetFields() {
    this.addForm = this.formBuilder.group({
      pessoaFisica: new FormControl('', Validators.required),
      exames: new FormControl('', Validators.required),
      dataValidade: new FormControl('')
    });
  }

}

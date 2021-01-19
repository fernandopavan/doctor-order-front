import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { PessoaFisicaService } from '../../service/pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class AddPessoaFisicaComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private pessoaFisicaService: PessoaFisicaService) { }

  addForm: FormGroup;
  
  minDate = new Date(1900, 1, 1);
  date: any;

  validationMessages = {
    nome: [
      { type: 'required', message: 'Nome é obrigatório.' },
      { type: 'maxlength', message: 'Descrição deve possuir entre 3 e 120 caracteres.' }
    ],
    nomeMae: [
      { type: 'required', message: 'Nome da mãe é obrigatório.' },
      { type: 'maxlength', message: 'O nome da mãe deve ter entre 3 e 120 caracteres' }
    ],
    sexo: [
      { type: 'required', message: 'Sexo é obrigatório.' }
    ],
    telefone: [
      { type: 'maxlength', message: 'O telefone deve ter entre 3 e 20 caracteres.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' }
    ],
    cpf: [
      { type: 'required', message: 'CPF é obrigatório.' }
    ],
    rg: [
      { type: 'maxlength', message: 'O RG deve ter entre 3 e 20 caracteres.' }
    ],
    endereco: [
      { type: 'required', message: 'Endereço é obrigatório.' },
      { type: 'maxlength', message: 'O endereço deve ter entre 3 e 120 caracteres' }
    ]
  };

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.addForm.value.dataNascimento = new Date(this.addForm.value.dataNascimento).toISOString().slice(0, 10);
    this.pessoaFisicaService.create(this.addForm.value)
      .subscribe(data => {
        this.resetFields();
        Swal.fire('Sucesso!', 'Pessoa fisica criada', 'success');
        this.router.navigate(['list-pessoas']);
      });
  }

  back() {
    this.router.navigate(['/list-pessoas']);
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      nome: ['', Validators.required],
      nomeMae: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: [''],
      telefone: [''],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: [''],
      endereco: ['', Validators.required]
    });
  }

  resetFields() {
    this.addForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      nomeMae: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      dataNascimento: new FormControl(''),
      telefone: new FormControl(''),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      rg: new FormControl(''),
      endereco: new FormControl('', Validators.required)
    });
  }

}

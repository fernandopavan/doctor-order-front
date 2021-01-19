import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { first } from 'rxjs/operators';
import { PessoaFisica} from '../../model/pessoaFisica';
import { PessoaFisicaService } from '../../service/pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss'],
    providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class EditPessoaFisicaComponent implements OnInit {

  pessoa: PessoaFisica;
  editForm: FormGroup;

  minDate = new Date(1900, 1, 1);
  date: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pessoaService: PessoaFisicaService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.pessoa = data;
        this.pessoa.id = data.id;
        this.createForm();
      }
    });
  }

  createForm() {
    const sexo = this.pessoa.sexo === 'MASCULINO' ? '0' : '1';

    this.editForm = this.formBuilder.group({
      id: [this.pessoa.id],
      nome: [this.pessoa.nome, Validators.required],
      nomeMae: [this.pessoa.nomeMae, Validators.required],
      dataNascimento: [this.pessoa.dataNascimento],
      sexo: [sexo, Validators.required],
      telefone: [this.pessoa.telefone],
      email: [this.pessoa.email, Validators.required],
      cpf: [this.pessoa.cpf, Validators.required],
      rg: [this.pessoa.rg],
      endereco: [this.pessoa.endereco, Validators.required]
    });
  }

  onSubmit() {
    this.editForm.value.dataNascimento = new Date(this.editForm.value.dataNascimento).toISOString().slice(0, 10);
    this.pessoaService.update(this.editForm.value)
      .pipe(first())
      .subscribe(response => {
        Swal.fire('Sucesso!', 'Pessoa fisica atualizada', 'success');
        this.router.navigate(['list-pessoas']);
      },
        error => { });
  }

  delete() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apague!'
    }).then((result) => {
      if (result.value) {
        this.pessoaService.delete(this.pessoa.id)
          .subscribe(
            response => {
              this.router.navigate(['/list-pessoas']);
              Swal.fire('Sucesso!', 'Pessoa fisica removida', 'success');
            },
            err => {
              Swal.fire('Erro!', err, 'error');
            }
          );
      }
    });

  }

  cancel() {
    this.router.navigate(['/list-pessoas']);
  }
}

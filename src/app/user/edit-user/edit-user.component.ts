import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { first } from 'rxjs/operators';
import { Medico } from '../../model/medico';
import { MedicoService } from '../../service/medico.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
    providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class EditUserComponent implements OnInit {

  medico: Medico;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  validationMessages = {
    nome: [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    numeroConselho: [
      { type: 'required', message: ' Nº do conselho obrigatório.' }
    ],
    estadoConselho: [
      { type: 'required', message: 'Estado do conselho obrigatório.' }
    ],
    tipoConselho: [
      { type: 'required', message: 'Tipo do conselho obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
    ],
    perfis: [
      { type: 'required', message: 'É obrigatório selecionar um tipo de perfil.' },
    ]
  };

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.medico = data;
        this.medico.id = data.id;
        this.createForm();
      }
    });
  }

  createForm() {
    let perfis = this.medico.perfis.includes('ADMIN') ? ['0'] : ['1'];
    if (this.medico.perfis.includes('ADMIN') && this.medico.perfis.includes('MEDICO')) {
      perfis = ['0', '1'];
    }

    this.editForm = this.formBuilder.group({
      id: [this.medico.id],
      nome: [this.medico.nome, Validators.required],
      numeroConselho: [this.medico.numeroConselho, Validators.required],
      estadoConselho: [this.medico.estadoConselho, Validators.required],
      tipoConselho: [this.medico.tipoConselho, Validators.required],
      email: [this.medico.email, Validators.required],
      senha: [{ value: '***', disabled: true }],
      perfis: [perfis, Validators.required]
    });
  }

  onSubmit() {
    this.editForm.value.senha = this.medico.senha;
    this.medicoService.update(this.editForm.value)
      .pipe(first())
      .subscribe(response => {
        Swal.fire('Sucesso!', 'Médico atualizado', 'success');
        this.router.navigate(['list-users']);
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
        this.medicoService.delete(this.medico.id)
          .subscribe(
            response => {
              this.router.navigate(['/list-users']);
              Swal.fire('Sucesso!', 'Médico removido', 'success');
            },
            err => {
              Swal.fire('Erro!', err, 'error');
            }
          );
      }
    });

  }

  cancel() {
    this.router.navigate(['/list-users']);
  }
}

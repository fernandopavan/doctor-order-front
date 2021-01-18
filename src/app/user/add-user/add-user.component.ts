import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { MedicoService } from '../../service/medico.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class AddUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private medicoService: MedicoService) { }

  addForm: FormGroup;

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
    senha: [
      { type: 'required', message: 'Senha é obrigatória.' },
    ],
    perfis: [
      { type: 'required', message: 'É obrigatório selecionar um tipo de perfil.' },
    ]
  };

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.medicoService.create(this.addForm.value)
      .subscribe(data => {
        this.resetFields();
        Swal.fire('Sucesso!', 'Médico criado', 'success');
        this.router.navigate(['list-users']);
      });
  }

  back() {
    this.router.navigate(['/list-users']);
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroConselho: ['', Validators.required],
      estadoConselho: ['', Validators.required],
      tipoConselho: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      perfis: ['', Validators.required]
    });
  }

  resetFields() {
    this.addForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      numeroConselho: new FormControl('', Validators.required),
      estadoConselho: new FormControl('', Validators.required),
      tipoConselho: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      perfis: new FormControl('', Validators.required),
    });
  }

}

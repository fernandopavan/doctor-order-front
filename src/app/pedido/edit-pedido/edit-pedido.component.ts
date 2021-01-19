import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { first } from 'rxjs/operators';
import { Pedido } from '../../model/pedido';
import { PedidoService } from '../../service/pedido.service';
import { PessoaFisicaService } from '../../service/pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

import { PessoaFisica} from '../../model/pessoaFisica';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class EditPedidoComponent implements OnInit {

  pedido: Pedido;
  editForm: FormGroup; 

  minDate = new Date(1900, 1, 1);
  date: any;

  pessoas: PessoaFisica[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    public pessoaService: PessoaFisicaService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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
    this.getPessoas();

    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.pedido = data;
        this.pedido.id = data.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      id: [this.pedido.id],
      pessoaFisica: [this.pedido.pessoaFisica, Validators.required],
      exames: [this.pedido.exames, Validators.required],
      dataValidade: [this.pedido.dataValidade]
    });
  }

  onSubmit() {
    this.editForm.value.dataValidade = new Date(this.editForm.value.dataValidade).toISOString().slice(0, 10);
    this.pedidoService.update(this.editForm.value)
      .pipe(first())
      .subscribe(response => {
        Swal.fire('Sucesso!', 'Pedido atualizado', 'success');
        this.router.navigate(['list-pedidos']);
      },
        error => { });
  }

  getPessoas(): void {
    this.pessoaService.findByName("").subscribe(response => {
       this.pessoas = response;
    });
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
        this.pedidoService.delete(this.pedido.id)
          .subscribe(
            response => {
              this.router.navigate(['/list-pedidos']);
              Swal.fire('Sucesso!', 'Pedido removido', 'success');
            },
            err => {
              Swal.fire('Erro!', err, 'error');
            }
          );
      }
    });

  }

  cancel() {
    this.router.navigate(['/list-pedidos']);
  }
  
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
}

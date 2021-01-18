import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../../model/medico';
import { MedicoService } from '../../service/medico.service';
import { MedicoPage } from 'src/app/model/medicoPage';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  searchValue = '';
  medicos: Medico[] = [];
  pageMedico: MedicoPage;
  selectedPage = 0;

  constructor(
    private router: Router,
    private medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.getPageMedico(0);
  }

  viewDetails(item) {
    this.router.navigate(['/edit-user/' + item.id]);
  }

  add() {
    this.router.navigate(['/add-user']);
  }

  searchByName() {
    // let value = this.searchValue.toLowerCase();
    if (this.searchValue == null) {
      this.ngOnInit();
      return;
    }

    this.medicoService.findByName(this.searchValue)
      .subscribe(result => {
        this.medicos = result;
      });
  }

  getPageMedico(page: number): void {
    this.medicoService.findAll(page)
      .subscribe(response => {
        this.pageMedico = response;
        this.medicos = response.content;
      });
  }

  onSelect(page: number): void {
    this.selectedPage = page;
    this.getPageMedico(page);
  }

}

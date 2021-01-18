import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaFisica} from '../../model/pessoaFisica';
import { PessoaFisicaService } from '../../service/pessoa-fisica.service';
import { PessoaFisicaPage } from 'src/app/model/pessoaFisicaPage';

@Component({
  selector: 'app-list-pessoa',
  templateUrl: './list-pessoa.component.html',
  styleUrls: ['./list-pessoa.component.scss']
})
export class ListPessoaFisicaComponent implements OnInit {

  searchValue = '';
  pessoas: PessoaFisica[] = [];
  pagePessoaFisica: PessoaFisicaPage;
  selectedPage = 0;

  constructor(
    private router: Router,
    private pessoaService: PessoaFisicaService
  ) { }

  ngOnInit() {
    this.getPagePessoaFisica(0);
  }

  viewDetails(item) {
    this.router.navigate(['/edit-pessoa/' + item.id]);
  }

  add() {
    this.router.navigate(['/add-pessoa']);
  }

  searchBy() {
    if (this.searchValue == null) {
      this.ngOnInit();
      return;
    }

    this.pessoaService.findByName(this.searchValue)
      .subscribe(result => {
        this.pessoas = result;
      });
  }

  getPagePessoaFisica(page: number): void {
    this.pessoaService.findAll(page)
      .subscribe(response => {
        this.pagePessoaFisica = response;
        this.pessoas = response.content;
      });
  }

  onSelect(page: number): void {
    this.selectedPage = page;
    this.getPagePessoaFisica(page);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPessoaComponent } from './edit-pessoa.component';

describe('EditPessoaComponent', () => {
  let component: EditPessoaComponent;
  let fixture: ComponentFixture<EditPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

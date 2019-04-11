import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMateriasComponent } from './cadastrar-materias.component';

describe('CadastrarMateriasComponent', () => {
  let component: CadastrarMateriasComponent;
  let fixture: ComponentFixture<CadastrarMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

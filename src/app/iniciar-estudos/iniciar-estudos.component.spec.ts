import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarEstudosComponent } from './iniciar-estudos.component';

describe('IniciarEstudosComponent', () => {
  let component: IniciarEstudosComponent;
  let fixture: ComponentFixture<IniciarEstudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarEstudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarEstudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

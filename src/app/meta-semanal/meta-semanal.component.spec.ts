import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaSemanalComponent } from './meta-semanal.component';

describe('MetaSemanalComponent', () => {
  let component: MetaSemanalComponent;
  let fixture: ComponentFixture<MetaSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

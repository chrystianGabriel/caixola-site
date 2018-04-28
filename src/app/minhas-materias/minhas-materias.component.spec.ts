import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMateriasComponent } from './minhas-materias.component';

describe('MinhasMateriasComponent', () => {
  let component: MinhasMateriasComponent;
  let fixture: ComponentFixture<MinhasMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMetasComponent } from './minhas-metas.component';

describe('MinhasMetasComponent', () => {
  let component: MinhasMetasComponent;
  let fixture: ComponentFixture<MinhasMetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisondhoteFormComponent } from './maisondhote-form.component';

describe('MaisondhoteFormComponent', () => {
  let component: MaisondhoteFormComponent;
  let fixture: ComponentFixture<MaisondhoteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaisondhoteFormComponent]
    });
    fixture = TestBed.createComponent(MaisondhoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteFormComponent } from './disponibilite-form.component';

describe('DisponibiliteFormComponent', () => {
  let component: DisponibiliteFormComponent;
  let fixture: ComponentFixture<DisponibiliteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibiliteFormComponent]
    });
    fixture = TestBed.createComponent(DisponibiliteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

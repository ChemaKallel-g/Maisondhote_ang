import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisondhotelistComponent } from './Maisondhotelist.component';

describe('MaisondhotelistComponent', () => {
  let component: MaisondhotelistComponent;
  let fixture: ComponentFixture<MaisondhotelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaisondhotelistComponent]
    });
    fixture = TestBed.createComponent(MaisondhotelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

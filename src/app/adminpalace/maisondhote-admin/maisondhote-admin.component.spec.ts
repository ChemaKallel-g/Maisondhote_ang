import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaisondhoteAdminComponent } from './maisondhote-admin.component';


describe('MaisondhoteAdminComponent', () => {
  let component: MaisondhoteAdminComponent;
  let fixture: ComponentFixture<MaisondhoteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaisondhoteAdminComponent]
    });
    fixture = TestBed.createComponent(MaisondhoteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

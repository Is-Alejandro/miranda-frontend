import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPasajeroComponent } from './datos-pasajero.component';

describe('DatosPasajeroComponent', () => {
  let component: DatosPasajeroComponent;
  let fixture: ComponentFixture<DatosPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPasajeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

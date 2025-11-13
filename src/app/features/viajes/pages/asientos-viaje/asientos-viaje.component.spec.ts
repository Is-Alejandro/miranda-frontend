import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosViajeComponent } from './asientos-viaje.component';

describe('AsientosViajeComponent', () => {
  let component: AsientosViajeComponent;
  let fixture: ComponentFixture<AsientosViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsientosViajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsientosViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

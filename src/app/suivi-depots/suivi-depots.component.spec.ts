import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviDepotsComponent } from './suivi-depots.component';

describe('SuiviDepotsComponent', () => {
  let component: SuiviDepotsComponent;
  let fixture: ComponentFixture<SuiviDepotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuiviDepotsComponent]
    });
    fixture = TestBed.createComponent(SuiviDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

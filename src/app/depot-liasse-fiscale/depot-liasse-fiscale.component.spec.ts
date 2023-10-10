import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotLiasseFiscaleComponent } from './depot-liasse-fiscale.component';

describe('DepotLiasseFiscaleComponent', () => {
  let component: DepotLiasseFiscaleComponent;
  let fixture: ComponentFixture<DepotLiasseFiscaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepotLiasseFiscaleComponent]
    });
    fixture = TestBed.createComponent(DepotLiasseFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

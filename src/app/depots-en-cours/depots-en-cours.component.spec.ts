import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotsEnCoursComponent } from './depots-en-cours.component';

describe('DepotsEnCoursComponent', () => {
  let component: DepotsEnCoursComponent;
  let fixture: ComponentFixture<DepotsEnCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepotsEnCoursComponent]
    });
    fixture = TestBed.createComponent(DepotsEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

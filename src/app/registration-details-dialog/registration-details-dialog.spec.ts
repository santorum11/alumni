import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDetailsDialog } from './registration-details-dialog';

describe('RegistrationDetailsDialog', () => {
  let component: RegistrationDetailsDialog;
  let fixture: ComponentFixture<RegistrationDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationDetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

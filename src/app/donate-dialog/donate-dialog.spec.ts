import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateDialog } from './donate-dialog';

describe('DonateDialog', () => {
  let component: DonateDialog;
  let fixture: ComponentFixture<DonateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

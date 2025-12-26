import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenJubilee } from './golden-jubilee';

describe('GoldenJubilee', () => {
  let component: GoldenJubilee;
  let fixture: ComponentFixture<GoldenJubilee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldenJubilee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldenJubilee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

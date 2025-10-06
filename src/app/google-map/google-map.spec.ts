import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMap } from './google-map';

describe('GoogleMap', () => {
  let component: GoogleMap;
  let fixture: ComponentFixture<GoogleMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

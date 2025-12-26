import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniDirectory } from './alumni-directory';

describe('AlumniDirectory', () => {
  let component: AlumniDirectory;
  let fixture: ComponentFixture<AlumniDirectory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumniDirectory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumniDirectory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

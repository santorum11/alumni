import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogForum } from './blog-forum';

describe('BlogForum', () => {
  let component: BlogForum;
  let fixture: ComponentFixture<BlogForum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogForum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogForum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

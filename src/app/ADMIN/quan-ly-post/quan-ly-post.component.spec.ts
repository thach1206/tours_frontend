import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyPostComponent } from './quan-ly-post.component';

describe('QuanLyPostComponent', () => {
  let component: QuanLyPostComponent;
  let fixture: ComponentFixture<QuanLyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

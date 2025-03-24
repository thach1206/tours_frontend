import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyKhuyenMaiComponent } from './quan-ly-khuyen-mai.component';

describe('QuanLyKhuyenMaiComponent', () => {
  let component: QuanLyKhuyenMaiComponent;
  let fixture: ComponentFixture<QuanLyKhuyenMaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyKhuyenMaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyKhuyenMaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

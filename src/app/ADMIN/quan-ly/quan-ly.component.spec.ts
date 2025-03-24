import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyComponent } from './quan-ly.component';

describe('QuanLyComponent', () => {
  let component: QuanLyComponent;
  let fixture: ComponentFixture<QuanLyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

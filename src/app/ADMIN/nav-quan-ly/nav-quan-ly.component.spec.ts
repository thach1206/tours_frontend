import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavQuanLyComponent } from './nav-quan-ly.component';

describe('NavQuanLyComponent', () => {
  let component: NavQuanLyComponent;
  let fixture: ComponentFixture<NavQuanLyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavQuanLyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavQuanLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

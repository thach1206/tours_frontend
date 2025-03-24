import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-quan-ly',
  templateUrl: './nav-quan-ly.component.html',
  styleUrl: './nav-quan-ly.component.css'
})
export class NavQuanLyComponent {
  @Output() activeMenuChange = new EventEmitter<string>();

  changeActiveMenu(menu: string): void {
    localStorage.removeItem('ACTIVE_NAV_MENU');
    localStorage.setItem('ACTIVE_NAV_MENU', this.ACTIVE);
    this.activeMenuChange.emit(menu);
  }
  ACTIVE: string = '';

  activeMenu(currentIndex: number) {
    switch (currentIndex) {
      case 2: {
        this.ACTIVE = 'TOUR';
        break;
      }
      case 3: {
        this.ACTIVE = 'POST';
        break;
      }
      case 4: {
        this.ACTIVE = 'VOUCHER';
        break;
      }
      default: this.ACTIVE = 'MONEY';
    }

    this.changeActiveMenu(this.ACTIVE);

  }

}

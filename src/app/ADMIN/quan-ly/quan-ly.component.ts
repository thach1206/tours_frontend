import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quan-ly',
  templateUrl: './quan-ly.component.html',
  styleUrl: './quan-ly.component.css'
})

export class QuanLyComponent implements OnInit {
  ACTIVE: string = 'MONEY';



  ngOnInit(): void {
    this.onActiveMenuChange(this.ACTIVE);
  }

  onActiveMenuChange(newMenu: string): void {
    this.ACTIVE = newMenu;

  }
}
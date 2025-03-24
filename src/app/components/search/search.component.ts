import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  place: string = '';
  dateStart: string = '';
  dateEnd: string = '';
  @Output() searchEvent = new EventEmitter<{ place: string, dateStart: string, dateEnd: string }>();

  doSearch() {
    this.searchEvent.emit({
      place: this.place,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd
    });

    this.scrollToTourSection();
  }

  scrollToTourSection() {
    const element = document.getElementById('tourSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
